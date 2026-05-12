// src/lib/blog-api.ts
// CMS API client — adapts the external CMS responses to the shapes consumed by components.

// ─── Environment ────────────────────────────────────────────────────────────

const API_URL = process.env.BLOG_API_URL ?? "";
const SUBTYPE_ID = process.env.BLOG_SUBTYPE_ID ?? "";

function isConfigured(): boolean {
  return Boolean(API_URL && SUBTYPE_ID);
}

function postsUrl(params?: Record<string, string>) {
  const base = `${API_URL}/api/${SUBTYPE_ID}/blog/posts`;
  if (!params) return base;
  const qs = new URLSearchParams(params).toString();
  return `${base}?${qs}`;
}

// ─── Raw CMS types ───────────────────────────────────────────────────────────

export interface CmsAuthor {
  id: string;
  name: string;
}

export interface CmsCategory {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
}

export interface CmsTag {
  tag: { id: string; name: string; slug: string };
}

export interface CmsPost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  image?: string;
  body: string;
  excerpt?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  readingTime?: number;
  authorId?: string;
  author?: CmsAuthor;
  authorName?: string;
  categoryId?: string;
  category?: CmsCategory;
  tags?: CmsTag[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsPostsResponse {
  posts: CmsPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ─── Normalized Post type (consumed by components) ───────────────────────────

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: { id: string; name: string; slug: string };
  coverImage: string;
  publishedAt: string;
  readingTimeMinutes: number;
  author: { name: string; avatarInitials: string; avatarColor: string };
  htmlBody: string;
  featured: boolean;
  tags: Array<{ name: string; slug: string }>;
}

// ─── Category colour palette (deterministic by name) ─────────────────────────

const PALETTE = [
  { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
  { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
] as const;

export function getCategoryColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % PALETTE.length;
  }
  return PALETTE[Math.abs(hash)];
}

// ─── Heading utilities (for ToC) ─────────────────────────────────────────────

function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Parses `<h2>` and `<h3>` tags from an HTML string, injects unique `id`
 * attributes, and returns both the processed HTML and a headings list for ToC.
 */
export function processHtmlBody(html: string): {
  processedHtml: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  const idCount: Record<string, number> = {};

  const processedHtml = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi,
    (_, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag[1]) as 2 | 3;
      // Strip nested tags to get plain text
      const text = inner.replace(/<[^>]+>/g, "").trim();
      let id = slugifyText(text);
      // Ensure uniqueness
      if (idCount[id] !== undefined) {
        idCount[id]++;
        id = `${id}-${idCount[id]}`;
      } else {
        idCount[id] = 0;
      }
      headings.push({ id, text, level });
      // Remove existing id attr then inject ours
      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, "");
      return `<${tag}${cleanAttrs} id="${id}">${inner}</${tag}>`;
    }
  );

  return { processedHtml, headings };
}

// ─── Author utilities ────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-blue-600", "bg-purple-600", "bg-emerald-600",
  "bg-orange-500", "bg-rose-600", "bg-indigo-600",
];

function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[Math.abs(h)];
}

function avatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── Date formatting ─────────────────────────────────────────────────────────

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

// ─── Adapter: CmsPost → Post ─────────────────────────────────────────────────

function cmsToPost(p: CmsPost): Post {
  const authorName =
    p.author?.name ?? p.authorName ?? "Equipe Mavellium";

  const categoryName = p.category?.name ?? "Geral";
  const categorySlug = p.category?.slug ?? slugifyText(categoryName);
  const categoryId = p.category?.id ?? p.categoryId ?? "";

  return {
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    description: p.excerpt ?? p.subtitle ?? p.title,
    category: { id: categoryId, name: categoryName, slug: categorySlug },
    coverImage: p.image ?? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1280",
    publishedAt: p.publishedAt ?? p.createdAt,
    readingTimeMinutes: p.readingTime ?? 5,
    author: {
      name: authorName,
      avatarInitials: avatarInitials(authorName),
      avatarColor: avatarColor(authorName),
    },
    htmlBody: p.body,
    featured: p.featured,
    tags: (p.tags ?? []).map((t) => ({ name: t.tag.name, slug: t.tag.slug })),
  };
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function fetchPosts(opts?: {
  categoryId?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Post[]> {
  if (!isConfigured()) return [];

  const params: Record<string, string> = {
    status: "PUBLISHED",
    limit: String(opts?.limit ?? 50),
  };
  if (opts?.categoryId) params.categoryId = opts.categoryId;
  if (opts?.featured !== undefined) params.featured = String(opts.featured);

  const data = await fetchJson<CmsPostsResponse>(postsUrl(params));
  return (data?.posts ?? []).map(cmsToPost);
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (!isConfigured()) return null;

  // API doesn't expose a /posts/[slug] endpoint, so we filter from the list.
  const data = await fetchJson<CmsPostsResponse>(
    postsUrl({ status: "PUBLISHED", limit: "100" })
  );
  const match = data?.posts.find((p) => p.slug === slug);
  return match ? cmsToPost(match) : null;
}

export async function fetchAllSlugs(): Promise<string[]> {
  if (!isConfigured()) return [];
  const data = await fetchJson<CmsPostsResponse>(
    postsUrl({ status: "PUBLISHED", limit: "100" })
  );
  return (data?.posts ?? []).map((p) => p.slug);
}

export async function fetchRelatedPosts(
  categoryId: string,
  excludeSlug: string
): Promise<Post[]> {
  if (!isConfigured()) return [];
  const data = await fetchJson<CmsPostsResponse>(
    postsUrl({ status: "PUBLISHED", categoryId, limit: "10" })
  );
  return (data?.posts ?? [])
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 3)
    .map(cmsToPost);
}

export async function fetchCategories(): Promise<CmsCategory[]> {
  if (!isConfigured()) return [];
  const data = await fetchJson<CmsCategory[]>(
    `${API_URL}/api/${SUBTYPE_ID}/blog/categories`
  );
  return data ?? [];
}
