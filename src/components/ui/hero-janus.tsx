"use client";

import { useJanusBlock } from "@/src/hooks/useJanusBlock";
import {
  HeroSection,
  HeroSlide,
} from "@/src/components/ui/hero-section-with-smooth-bg-shader";
import heroSlidesData from "@/src/JSON/heroData.json";

const FALLBACK = heroSlidesData as HeroSlide[];

/**
 * Busca os slides do Janus CMS e renderiza o HeroSection.
 * Enquanto carrega usa o fallback estático (heroData.json).
 * Alterações no Janus aparecem no próximo F5 — sem deploy.
 */
export function Hero() {
  const { data } = useJanusBlock<{ slides: HeroSlide[] }>(
    "home",
    "hero-section-mavellium"
  );

  const slides =
    data?.slides && data.slides.length > 0 ? data.slides : FALLBACK;

  return <HeroSection slides={slides} />;
}
