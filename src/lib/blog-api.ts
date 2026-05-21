import { fetchJson } from "./blog-fetch";

const API_URL = process.env.BLOG_API_URL ?? "";
const COMPANY_SLUG = process.env.BLOG_SUBTYPE_ID ?? "";
const PROJECT_ID = process.env.BLOG_PROJECT_ID ?? "";

function isConfigured(): boolean {
  return Boolean(API_URL && COMPANY_SLUG && PROJECT_ID);
}

function blogUrl(params?: Record<string, string>): string {
  const base = `${API_URL}/api/${COMPANY_SLUG}/${PROJECT_ID}/blog`;
  if (!params) return base;
  return `${base}?${new URLSearchParams(params)}`;
}

// ─── Types matching Janus response ───────────────────────────────────────────

export interface JanusCategory {
  id: string;
  name: string;
  slug?: string;
  parentId?: string | null;
}

export interface JanusTag {
  tag: { id: string; name: string; slug: string };
}

export interface JanusPost {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  publishedAt?: string;
  createdAt?: string;
  body: string;
  authorName: string;
  authorImageUrl?: string;
  coverImageUrl?: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // CTA overrides — Janus custom fields per post
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  // Janus returns categories as an array of junction objects
  categories?: Array<{ category: JanusCategory }>;
  tags: JanusTag[];
  project: { id: string; name: string };
}

interface JanusResponse {
  success: boolean;
  company: string;
  posts: JanusPost[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

interface JanusSingleResponse {
  success: boolean;
  post: JanusPost;
}

// ─── Normalized post consumed by blog pages ───────────────────────────────────

export interface CmsPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  categorySlug: string;
  coverImage: string;
  publishedAt: string;
  readingTimeMinutes: number | null;
  authorName: string;
  authorImageUrl?: string;
  body: string;
  seoTitle?: string;
  seoDescription?: string;
  // Per-post CTA overrides from Janus custom fields
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  tags: Array<{ name: string; slug: string }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1280";

function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Janus returns categories ordered parent → child; pick the leaf (most specific).
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
    coverImage: p.coverImageUrl ?? FALLBACK_IMAGE,
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

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchCmsPosts(opts?: {
  limit?: number;
  page?: number;
}): Promise<CmsPost[]> {
  if (!isConfigured()) return [];
  const params: Record<string, string> = {
    limit: String(opts?.limit ?? 50),
    page: String(opts?.page ?? 1),
  };
  const data = await fetchJson<JanusResponse>(blogUrl(params));
  return (data?.posts ?? []).map(toCmsPost);
}

export async function fetchCmsPostBySlug(slug: string): Promise<CmsPost | null> {
  if (!isConfigured()) return null;
  const data = await fetchJson<JanusSingleResponse>(`${blogUrl()}/${slug}`);
  return data?.post ? toCmsPost(data.post) : null;
}

export async function fetchCmsAllSlugs(): Promise<string[]> {
  if (!isConfigured()) return [];
  const data = await fetchJson<JanusResponse>(blogUrl({ limit: "100" }));
  return (data?.posts ?? []).map((p) => p.slug ?? p.id);
}

export async function fetchCmsRelatedPosts(
  categorySlug: string,
  excludeSlug: string,
): Promise<CmsPost[]> {
  if (!isConfigured()) return [];
  const data = await fetchJson<JanusResponse>(blogUrl({ limit: "100" }));
  return (data?.posts ?? [])
    .filter((p) => (pickCategory(p)?.slug ?? "geral") === categorySlug && (p.slug ?? p.id) !== excludeSlug)
    .slice(0, 3)
    .map(toCmsPost);
}
