// ─── Janus Local JSON Cache ───────────────────────────────────────────────────
//
// Persists all Janus CMS data to src/data/janus-content.json so pages never
// make HTTP calls to Janus during user navigation.
//
// Refreshed exclusively by:
//   1. The /api/revalidate webhook (called by Janus on publish/update)
//   2. src/instrumentation.ts on server start if cache is missing
//
// All fetch functions in blog-api.ts, blog-config.ts, fitec-api.ts, and
// janus-server.ts read from this cache first and fall back to HTTP only when
// the cache file is absent (e.g. first deploy before the first webhook).

import fs from "fs";
import path from "path";
import type { CmsPost, JanusPost, JanusCategory } from "./blog-api";
import type { BlogSiteConfig, SharePlatform } from "./blog-config";
import type { FitecLead } from "./fitec-api";

// ─── File path ────────────────────────────────────────────────────────────────

const CACHE_DIR = path.join(process.cwd(), "src", "data");
const CACHE_FILE = path.join(CACHE_DIR, "janus-content.json");

// ─── Cache shape ──────────────────────────────────────────────────────────────

export interface JanusContentCache {
  updatedAt: string;
  blog: {
    posts: CmsPost[];
    config: BlogSiteConfig;
  };
  fitecLeads: FitecLead[];
  pageBlocks: Record<string, Record<string, unknown> | null>;
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export function readJanusCache(): JanusContentCache | null {
  try {
    const raw = fs.readFileSync(CACHE_FILE, "utf-8");
    return JSON.parse(raw) as JanusContentCache;
  } catch {
    return null;
  }
}

export function cacheExists(): boolean {
  try {
    fs.accessSync(CACHE_FILE, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

// ─── Env vars (self-contained — no imports from blog-api / blog-config) ───────

const API_URL = process.env.BLOG_API_URL ?? "https://januscms.com.br";
const COMPANY = process.env.BLOG_SUBTYPE_ID ?? "mavellium-main";
const PROJECT = process.env.BLOG_PROJECT_ID ?? "";
const JANUS_URL = process.env.NEXT_PUBLIC_JANUS_URL ?? "";
const JANUS_TENANT = process.env.NEXT_PUBLIC_JANUS_TENANT ?? "";

const BLOG_BASE = `${API_URL}/api/${COMPANY}/${PROJECT}/blog`;

// ─── Raw HTTP fetch (cache: no-store so webhook always gets fresh data) ────────

async function rawFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ─── Janus response shapes (self-contained copies) ────────────────────────────

interface JanusListResponse {
  success: boolean;
  posts: JanusPost[];
}

interface JanusSingleResponse {
  success: boolean;
  post: JanusPost;
}

interface JanusCtaResponse {
  schema: {
    config: { title?: string; description?: string; buttonText?: string; buttonUrl?: string | null };
    whatsappUrl?: string;
  };
}

interface JanusShareResponse {
  schema: Array<{ config: { label?: string; platforms?: string[] } }>;
}

interface CmsGuestsResponse {
  ok: boolean;
  data: Array<{
    id: string;
    name: string;
    createdAt: string;
    posts: Array<{ id?: string; imageUrl?: string; message?: string }>;
  }>;
}

interface JanusBlocksResponse {
  schema: { content: Record<string, unknown> };
}

// ─── Transformers (internalized copies from blog-api.ts / fitec-api.ts) ───────

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1280";

function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function pickCategory(p: JanusPost): JanusCategory | undefined {
  const list = p.categories ?? [];
  return (list.find((c) => c.category.parentId) ?? list[0])?.category;
}

function toCmsPost(p: JanusPost): CmsPost {
  const cat = pickCategory(p);
  return {
    id: p.id,
    slug: p.slug ?? p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.subtitle ?? p.seoDescription ?? p.title,
    category: cat?.name ?? "Geral",
    categorySlug: cat?.slug ?? "geral",
    coverImage: p.coverImageUrl || FALLBACK_IMAGE,
    publishedAt: p.publishedAt ?? p.createdAt ?? "",
    readingTimeMinutes: p.readingTime ?? (p.body?.trim() ? estimateReadingTime(p.body) : null),
    authorName: p.authorName,
    authorImageUrl: p.authorImageUrl,
    body: p.body ?? "",
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    ctaTitle: p.ctaTitle,
    ctaDescription: p.ctaDescription,
    ctaButtonText: p.ctaButtonText,
    ctaButtonUrl: p.ctaButtonUrl,
    tags: (p.tags ?? []).map((t) => ({ name: t.tag.name, slug: t.tag.slug })),
  };
}

const VALID_PLATFORMS = new Set(["linkedin", "twitter", "whatsapp", "copy"]);

const CONFIG_DEFAULTS: BlogSiteConfig = {
  cta: {
    title: "Quer implementar isso no seu negócio?",
    description:
      "Converse com nossa equipe de especialistas e descubra como aplicar essas estratégias na realidade da sua empresa.",
    buttonText: "Falar com Especialista",
  },
  share: {
    label: "Compartilhar artigo",
    platforms: ["linkedin", "twitter", "whatsapp", "copy"],
  },
};

// ─── Refresh ──────────────────────────────────────────────────────────────────

export async function refreshJanusCache(): Promise<void> {
  if (!PROJECT) {
    console.warn("[janus-cache] BLOG_PROJECT_ID not set — skipping refresh");
    return;
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });

  // ── Phase 1: parallel fetches (list + configs + leads + page blocks) ────────
  const [listData, ctaData, shareData, guestsData, homeBlocks] = await Promise.all([
    rawFetch<JanusListResponse>(`${BLOG_BASE}?limit=100`),
    rawFetch<JanusCtaResponse>(`${API_URL}/api/v1/content/${COMPANY}/blogcta`),
    rawFetch<JanusShareResponse>(`${API_URL}/api/v1/content/${COMPANY}/blogcompartilhamento`),
    rawFetch<CmsGuestsResponse>(`${API_URL}/api/v1/admin/guests`),
    JANUS_URL && JANUS_TENANT
      ? rawFetch<JanusBlocksResponse>(`${JANUS_URL}/api/v1/content/${JANUS_TENANT}/home`)
      : Promise.resolve(null),
  ]);

  // ── Phase 2: fetch each post individually to get body ───────────────────────
  const slugs = (listData?.posts ?? []).map((p) => p.slug ?? p.id);
  const fullPostResponses = await Promise.all(
    slugs.map((slug) => rawFetch<JanusSingleResponse>(`${BLOG_BASE}/${slug}`))
  );
  const posts: CmsPost[] = fullPostResponses
    .map((r) => (r?.post ? toCmsPost(r.post) : null))
    .filter((p): p is CmsPost => p !== null);

  // ── Phase 3: normalize blog config ──────────────────────────────────────────
  const ctaCfg = ctaData?.schema?.config ?? {};
  const shareCfg = shareData?.schema?.[0]?.config ?? {};
  const rawPlatforms = (shareCfg.platforms ?? []).filter((p): p is SharePlatform =>
    VALID_PLATFORMS.has(p)
  );
  const config: BlogSiteConfig = {
    cta: {
      title: ctaCfg.title ?? CONFIG_DEFAULTS.cta.title,
      description: ctaCfg.description ?? CONFIG_DEFAULTS.cta.description,
      buttonText: ctaCfg.buttonText ?? CONFIG_DEFAULTS.cta.buttonText,
      buttonUrl: ctaCfg.buttonUrl ?? undefined,
      whatsappUrl: ctaData?.schema?.whatsappUrl ?? undefined,
    },
    share: {
      label: shareCfg.label ?? CONFIG_DEFAULTS.share.label,
      platforms: rawPlatforms.length > 0 ? rawPlatforms : CONFIG_DEFAULTS.share.platforms,
    },
  };

  // ── Phase 4: normalize FITEC leads ──────────────────────────────────────────
  const fitecLeads: FitecLead[] = [];
  if (guestsData?.ok && Array.isArray(guestsData.data)) {
    const sorted = [...guestsData.data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    for (const guest of sorted) {
      const name = guest.name?.trim() || "Visitante FITEC";
      for (const post of guest.posts ?? []) {
        fitecLeads.push({
          id: post.id ?? guest.id,
          name,
          text: post.message ?? null,
          image: post.imageUrl ?? FALLBACK_IMAGE,
        });
      }
    }
  }

  // ── Phase 5: assemble and write atomically ───────────────────────────────────

  // Stale fallback: if any section came back empty from Janus (network error,
  // 5xx, timeout), preserve the last known good data from the existing cache
  // instead of overwriting it with zeros and breaking the site.
  const existingCache = readJanusCache();
  const safePosts     = posts.length > 0       ? posts       : (existingCache?.blog?.posts   ?? []);
  const safeLeads     = fitecLeads.length > 0  ? fitecLeads  : (existingCache?.fitecLeads    ?? []);
  const safeHome      = homeBlocks?.schema?.content ?? existingCache?.pageBlocks?.home ?? null;

  if (posts.length === 0 && (existingCache?.blog?.posts?.length ?? 0) > 0) {
    console.warn(
      `[janus-cache] Janus retornou 0 posts — mantendo ${existingCache!.blog.posts.length} posts do cache anterior`
    );
  }

  const cache: JanusContentCache = {
    updatedAt: new Date().toISOString(),
    blog: { posts: safePosts, config },
    fitecLeads: safeLeads,
    pageBlocks: { home: safeHome },
  };

  const tmp = CACHE_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(cache, null, 2), "utf-8");
  fs.renameSync(tmp, CACHE_FILE);

  console.log(
    `[janus-cache] refreshed — ${posts.length} posts, ${fitecLeads.length} fitec leads`
  );
}
