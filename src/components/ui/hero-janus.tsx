"use client";

import { useJanusBlock } from "@/src/hooks/useJanusBlock";
import {
  HeroSection,
  HeroSlide,
} from "@/src/components/ui/hero-section-with-smooth-bg-shader";
import heroSlidesData from "@/src/JSON/heroData.json";

const FALLBACK = heroSlidesData as HeroSlide[];

interface HeroProps {
  initialData?: { slides: HeroSlide[] } | null;
}

export function Hero({ initialData }: HeroProps = {}) {
  const { data: janusData } = useJanusBlock<{ slides: HeroSlide[] }>(
    "home",
    "hero-section-mavellium"
  );

  const source = initialData ?? janusData;
  const slides =
    source?.slides && source.slides.length > 0 ? source.slides : FALLBACK;

  return <HeroSection slides={slides} />;
}
