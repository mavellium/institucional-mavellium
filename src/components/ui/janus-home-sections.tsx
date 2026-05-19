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

export function QuemSomosJanus() {
  const { data } = useJanusBlock<SobreBlock>("home", "sobre-mavellium");
  return <VerticalTabs services={data?.services} />;
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
interface FaqBlock {
  items: FAQItem[];
}

export function FaqJanus() {
  const { data } = useJanusBlock<FaqBlock>("home", "faq-mavellium");
  return <ImmersiveFAQ items={data?.items} />;
}

// ── Soluções (Flipping Cards) ─────────────────────────────────────────────────
interface SolucoesBlock {
  title?: string;
  description?: string;
  cards: JanusCard[];
}

export function SolucoesJanus() {
  const { data } = useJanusBlock<SolucoesBlock>("home", "solucoes-mavellium");
  return (
    <FlippingCardDemo
      title={data?.title}
      description={data?.description}
      cards={data?.cards}
    />
  );
}

// ── Manifesto ─────────────────────────────────────────────────────────────────
export function ManifestoJanus() {
  const { data } = useJanusBlock<MediaContent>("home", "manifesto-mavellium");
  return <Demo content={data ?? undefined} />;
}

// ── CTA Final ─────────────────────────────────────────────────────────────────
const DEFAULT_CTA: FinalCtaData = {
  text: {
    headline: "Pronto para Construir",
    highlight: "o Próximo Nível?",
    description:
      "Transforme sua visão em um ecossistema digital de alta performance. Vamos conversar sobre o seu projeto.",
  },
  theme: {
    gradient_start: "#00D26A",
    gradient_end: "#00b35a",
    button_bg: "#050505",
  },
  calls_to_action: {
    primary: {
      label: "Falar com a Equipe",
      href: "https://wa.me/5514998001008",
      icon: "logos:whatsapp-icon",
    },
    secondary: {
      label: "Ver Portfólio",
      href: "/portfolio",
      icon: "lucide:folder-open",
    },
  },
};

export function CtaFinalJanus() {
  const { data } = useJanusBlock<FinalCtaData>("home", "cta-final-mavellium");
  return <FinalCtaSection data={data ?? DEFAULT_CTA} />;
}
