"use client";

import { useJanusBlock } from "@/src/hooks/useJanusBlock";
import VerticalTabs from "@/src/components/ui/vertical-tabs";
import ImmersiveFAQ from "@/src/components/ui/project-showcase";
import FlippingCardDemo from "@/src/components/ui/autonomous-agents";
import Demo from "@/src/components/ui/imagem";
import FinalCtaSection from "@/src/components/ui/cta-final";

import type { VerticalTabsProps } from "@/src/components/ui/vertical-tabs";
import type { FAQItem } from "@/src/components/ui/project-showcase";
import type { JanusCard } from "@/src/components/ui/autonomous-agents";
import type { MediaContent } from "@/src/components/ui/imagem";
import type { FinalCtaData } from "@/src/components/ui/cta-final";

// ── Sobre / Quem Somos ──────────────────────────────────────────────────────
interface SobreBlock {
  services: VerticalTabsProps["services"];
}

export function QuemSomosJanus({ initialData }: { initialData?: unknown }) {
  const { data: janusData } = useJanusBlock<SobreBlock>("home", "sobre-mavellium");
  const data = (initialData as SobreBlock | undefined) ?? janusData;
  return <VerticalTabs services={data?.services} />;
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
interface FaqBlock {
  items: FAQItem[];
}

export function FaqJanus({ initialData }: { initialData?: unknown }) {
  const { data: janusData } = useJanusBlock<FaqBlock>("home", "faq-mavellium");
  const data = (initialData as FaqBlock | undefined) ?? janusData;
  return <ImmersiveFAQ items={data?.items} />;
}

// ── Soluções (Flipping Cards) ─────────────────────────────────────────────────
interface SolucoesBlock {
  title?: string;
  description?: string;
  cards: JanusCard[];
}

export function SolucoesJanus({ initialData }: { initialData?: unknown }) {
  const { data: janusData } = useJanusBlock<SolucoesBlock>("home", "solucoes-mavellium");
  const data = (initialData as SolucoesBlock | undefined) ?? janusData;
  return (
    <FlippingCardDemo
      title={data?.title}
      description={data?.description}
      cards={data?.cards}
    />
  );
}

// ── Manifesto ─────────────────────────────────────────────────────────────────
export function ManifestoJanus({ initialData }: { initialData?: unknown }) {
  const { data: janusData } = useJanusBlock<MediaContent>("home", "manifesto-mavellium");
  const data = (initialData as MediaContent | undefined) ?? janusData;
  return <Demo content={data ?? undefined} />;
}

// ── CTA Final ─────────────────────────────────────────────────────────────────
export function CtaFinalJanus({ initialData }: { initialData?: unknown }) {
  const { data: janusData } = useJanusBlock<FinalCtaData>("home", "cta-final-mavellium");
  const data = (initialData as FinalCtaData | undefined) ?? janusData;
  if (!data) return null;
  return <FinalCtaSection data={data} />;
}
