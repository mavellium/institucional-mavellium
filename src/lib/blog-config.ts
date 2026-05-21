// ─── Blog site-wide config — sourced from Janus CMS ─────────────────────────
//
// Two Janus content endpoints drive this:
//   CTA   → /api/v1/content/mavellium-main/blogcta
//   Share → /api/v1/content/mavellium-main/blogcompartilhamento

import { fetchJson } from "./blog-fetch";

const JANUS_BASE = process.env.BLOG_API_URL ?? "https://januscms.com.br";
const COMPANY_SLUG = process.env.BLOG_SUBTYPE_ID ?? "mavellium-main";

export type SharePlatform = "linkedin" | "twitter" | "whatsapp" | "copy";

export interface BlogCtaConfig {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl?: string;
  // When set, overrides the per-article generated WhatsApp URL
  whatsappUrl?: string;
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
  },
  share: {
    label: "Compartilhar artigo",
    platforms: ["linkedin", "twitter", "whatsapp", "copy"],
  },
};

// ─── Janus response shapes ────────────────────────────────────────────────────

interface JanusCtaResponse {
  slug: string;
  schema: {
    config: {
      title?: string;
      description?: string;
      buttonText?: string;
      buttonUrl?: string | null;
    };
    whatsappUrl?: string;
  };
}

interface JanusShareResponse {
  slug: string;
  schema: Array<{
    config: {
      label?: string;
      platforms?: string[];
    };
  }>;
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

export async function fetchBlogSiteConfig(): Promise<BlogSiteConfig> {
  const ctaUrl = `${JANUS_BASE}/api/v1/content/${COMPANY_SLUG}/blogcta`;
  const shareUrl = `${JANUS_BASE}/api/v1/content/${COMPANY_SLUG}/blogcompartilhamento`;

  const [ctaData, shareData] = await Promise.all([
    fetchJson<JanusCtaResponse>(ctaUrl),
    fetchJson<JanusShareResponse>(shareUrl),
  ]);

  // ── CTA ──
  const ctaConfig = ctaData?.schema?.config ?? {};
  const cta: BlogCtaConfig = {
    title: ctaConfig.title ?? DEFAULTS.cta.title,
    description: ctaConfig.description ?? DEFAULTS.cta.description,
    buttonText: ctaConfig.buttonText ?? DEFAULTS.cta.buttonText,
    buttonUrl: ctaConfig.buttonUrl ?? undefined,
    whatsappUrl: ctaData?.schema?.whatsappUrl ?? undefined,
  };

  // ── Share ──
  const shareConfig = shareData?.schema?.[0]?.config ?? {};
  const rawPlatforms = shareConfig.platforms ?? [];
  const validPlatforms = rawPlatforms.filter((p): p is SharePlatform =>
    ["linkedin", "twitter", "whatsapp", "copy"].includes(p)
  );
  const share: BlogShareConfig = {
    label: shareConfig.label ?? DEFAULTS.share.label,
    platforms: validPlatforms.length > 0 ? validPlatforms : DEFAULTS.share.platforms,
  };

  return { cta, share };
}
