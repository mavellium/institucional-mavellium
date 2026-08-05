"use client";

// doc/conversao.md seção 2.2 — dispara quando o leitor sai do artigo por
// qualquer link interno que NÃO seja outro artigo do blog (link pra outro
// /blog/[slug] fica de fora de propósito — é coberto pela seção "Artigos
// relacionados", não é "navegação pro site").
import { useEffect } from "react";
import { track } from "@/src/lib/analytics";

const OTHER_ARTICLE_RE = /^\/blog\/[^/]+/;

interface BlogNavTrackerProps {
  slug: string;
}

export function BlogNavTracker({ slug }: BlogNavTrackerProps) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      const href = anchor?.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      // só links internos — externos (WhatsApp, mailto, redes sociais) ficam
      // de fora, já cobertos pelos próprios eventos de conversão
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (OTHER_ARTICLE_RE.test(url.pathname)) return;

      track("nav_blog_para_site", { slug_origem: slug, destino: url.pathname });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [slug]);

  return null;
}
