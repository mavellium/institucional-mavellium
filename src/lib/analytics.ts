// doc/conversao.md seção 1 — única forma de disparar evento no projeto.
// Nenhuma string de evento solta fora daqui (ver AnalyticsEvent).
import posthog from "posthog-js";

export type PageType =
  | "home"
  | "blog_post"
  | "blog_index"
  | "solucoes"
  | "cases"
  | "quem_somos"
  | "docs"
  | "eventos"
  | "outro";

export function getPageType(pathname: string): PageType {
  if (pathname === "/") return "home";
  if (pathname === "/blog") return "blog_index";
  if (pathname.startsWith("/blog/")) return "blog_post";
  if (pathname.startsWith("/solucoes")) return "solucoes";
  if (pathname.startsWith("/cases")) return "cases";
  if (pathname.startsWith("/quem-somos")) return "quem_somos";
  if (pathname.startsWith("/docs")) return "docs";
  if (pathname.startsWith("/eventos")) return "eventos";
  return "outro";
}

// Contrato completo definido em doc/conversao.md seção 2.
export type AnalyticsEvent =
  | "conv_raio_x_cta_click"
  | "conv_raio_x_form_start"
  | "conv_raio_x_form_submit"
  | "conv_whatsapp_click"
  | "conv_plano_cta_click"
  | "conv_contato_email_click"
  | "artigo_scroll_50"
  | "artigo_scroll_90"
  | "artigo_leitura_completa"
  | "nav_blog_para_site"
  | "secao_planos_visivel";

const DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

function globalProps() {
  const pathname = window.location.pathname;
  return { page_path: pathname, page_type: getPageType(pathname) };
}

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  try {
    if (typeof window === "undefined") return;
    const payload = { ...globalProps(), ...props };

    if (process.env.NODE_ENV !== "production") {
      if (DEBUG) console.log("[analytics]", event, payload);
      return;
    }
    posthog.capture(event, payload);
  } catch {
    // tracking nunca pode quebrar a UI
  }
}

// doc/conversao.md seção 2.2 — eventos de scroll disparam uma vez por sessão
// por slug. Set em memória do módulo (não localStorage).
const firedOnce = new Set<string>();

export function trackOnce(key: string, event: AnalyticsEvent, props?: Record<string, unknown>) {
  if (firedOnce.has(key)) return;
  firedOnce.add(key);
  track(event, props);
}

// Dispara o evento certo a partir do destino de um CTA genérico (header,
// footer, CTA final do Janus). Cliques em wa.me não passam por aqui — já são
// capturados globalmente pelo listener em PostHogProvider.tsx.
export function trackCtaClick(destination: string, ctaText: string, ctaLocation: string) {
  if (destination.includes("#diagnostico")) {
    track("conv_raio_x_cta_click", {
      cta_text: ctaText,
      destination,
      cta_location: ctaLocation,
    });
    return;
  }
  if (destination.startsWith("mailto:")) {
    track("conv_contato_email_click", { cta_location: ctaLocation });
  }
}

export function identify(email: string, traits?: Record<string, unknown>) {
  try {
    if (typeof window === "undefined") return;
    posthog.identify(email, traits);
  } catch {
    // tracking nunca pode quebrar a UI
  }
}
