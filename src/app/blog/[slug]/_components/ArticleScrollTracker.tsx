"use client";

// doc/conversao.md seção 2.2 — só monta em /blog/[slug], então "eventos de
// scroll só em rotas de artigo" é garantido por onde este componente é usado,
// não por lógica de rota aqui dentro.
import { useEffect, useRef } from "react";
import { trackOnce } from "@/src/lib/analytics";

const LEITURA_COMPLETA_SEGUNDOS = 45;

interface ArticleScrollTrackerProps {
  slug: string;
  titulo: string;
}

export function ArticleScrollTracker({ slug, titulo }: ArticleScrollTrackerProps) {
  const scrolled90Ref = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const startedAt = Date.now();
    let ticking = false;

    function elapsedSeconds() {
      return Math.round((Date.now() - startedAt) / 1000);
    }

    function maybeFireLeituraCompleta() {
      if (completedRef.current || !scrolled90Ref.current) return;
      if (elapsedSeconds() < LEITURA_COMPLETA_SEGUNDOS) return;
      completedRef.current = true;
      trackOnce(`artigo_leitura_completa:${slug}`, "artigo_leitura_completa", {
        slug,
        titulo,
        tempo_segundos: elapsedSeconds(),
      });
    }

    function checkScroll() {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;

      if (pct >= 50) {
        trackOnce(`artigo_scroll_50:${slug}`, "artigo_scroll_50", { slug, titulo });
      }
      if (pct >= 90) {
        trackOnce(`artigo_scroll_90:${slug}`, "artigo_scroll_90", { slug, titulo });
        scrolled90Ref.current = true;
        maybeFireLeituraCompleta();
      }
    }

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkScroll);
    }

    const completaTimer = setTimeout(maybeFireLeituraCompleta, LEITURA_COMPLETA_SEGUNDOS * 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(completaTimer);
    };
  }, [slug, titulo]);

  return null;
}
