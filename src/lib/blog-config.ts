// ─── Blog site-wide config — sourced from Janus when available ───────────────
//
// fetchBlogSiteConfig() tries GET /blog/config on the Janus project endpoint.
// Until Janus exposes that route, the call fails silently and defaults are used.
// Shape this file to match what Janus returns when the endpoint goes live.

import { fetchJson } from "./blog-fetch";

const API_URL = process.env.BLOG_API_URL ?? "";
const COMPANY_SLUG = process.env.BLOG_SUBTYPE_ID ?? "";
const PROJECT_ID = process.env.BLOG_PROJECT_ID ?? "";

export type SharePlatform = "linkedin" | "twitter" | "whatsapp" | "copy";

export interface BlogCtaConfig {
  title: string;
  description: string;
  buttonText: string;
  // When set in Janus, overrides the default WhatsApp fallback URL
  buttonUrl?: string;
}

export interface BlogShareConfig {
  label: string;
  platforms: SharePlatform[];
}

export interface BlogSiteConfig {
  cta: BlogCtaConfig;
  share: BlogShareConfig;
}

const DEFAULTS: BlogSiteConfig = {
  cta: {
    title: "Quer implementar isso no seu negócio?",
    description:
      "Converse com nossa equipe de especialistas e descubra como aplicar essas estratégias na realidade da sua empresa.",
    buttonText: "Falar com Especialista",
    // buttonUrl falls back to the WhatsApp link generated per-article in page.tsx
  },
  share: {
    label: "Compartilhar artigo",
    platforms: ["linkedin", "twitter", "whatsapp", "copy"],
  },
};

interface JanusBlogConfigResponse {
  success: boolean;
  config: {
    cta?: Partial<BlogCtaConfig>;
    share?: Partial<BlogShareConfig>;
  };
}

export async function fetchBlogSiteConfig(): Promise<BlogSiteConfig> {
  if (!API_URL || !COMPANY_SLUG || !PROJECT_ID) return DEFAULTS;

  const url = `${API_URL}/api/${COMPANY_SLUG}/${PROJECT_ID}/blog/config`;
  const data = await fetchJson<JanusBlogConfigResponse>(url);

  if (!data?.success || !data.config) return DEFAULTS;

  return {
    cta: { ...DEFAULTS.cta, ...(data.config.cta ?? {}) },
    share: { ...DEFAULTS.share, ...(data.config.share ?? {}) },
  };
}
