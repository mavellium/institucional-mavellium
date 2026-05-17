import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../../lib/constants";
import { CaseHero } from "./_components/CaseHero";
import { CaseMethodology } from "./_components/CaseMethodology";
import { CaseMetrics } from "./_components/CaseMetrics";
import { CaseLatency } from "./_components/CaseLatency";
import { CaseImpact } from "./_components/CaseImpact";

export const metadata: Metadata = {
  title:
    "Caso de Estudo: WordPress vs Arquitetura Mavellium — Core Web Vitals | Mavellium",
  description:
    "Comparação técnica de performance entre WordPress tradicional e a stack Next.js SSG + Janus CMS da Mavellium. Métricas: TTFB, LCP, INP, CLS e PageSpeed Score.",
  alternates: {
    canonical:
      "https://mavellium.com.br/cases/performance-arquitetura",
  },
  openGraph: {
    type: "article",
    title:
      "Caso de Estudo: WordPress vs Arquitetura Mavellium — Core Web Vitals",
    description:
      "Comparação técnica de TTFB, LCP, INP, CLS e PageSpeed Score entre WordPress e a stack Next.js SSG + Janus CMS.",
    url: "https://mavellium.com.br/cases/performance-arquitetura",
  },
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "Caso de Estudo: Core Web Vitals WordPress vs Arquitetura Next.js — [INSERIR_TTFB_REDUCAO_PERCENT]% de Redução em TTFB",
  description:
    "Comparação técnica de performance entre WordPress tradicional e a stack Next.js SSG + Janus CMS da Mavellium. Métricas medidas: TTFB, LCP, INP, CLS, bundle JS e PageSpeed Score.",
  proficiencyLevel: "Expert",
  author: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  publisher: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
    logo: {
      "@type": "ImageObject",
      url: "https://mavellium.com.br/logo-mavellium-header.svg",
    },
  },
  datePublished: "2026-05-16",
  dateModified: "2026-05-16",
  inLanguage: "pt-BR",
  url: "https://mavellium.com.br/cases/performance-arquitetura",
  about: [
    { "@type": "Thing", "name": "Core Web Vitals" },
    { "@type": "Thing", "name": "Time to First Byte" },
    { "@type": "Thing", "name": "Largest Contentful Paint" },
    { "@type": "Thing", "name": "Interaction to Next Paint" },
    { "@type": "Thing", "name": "Cumulative Layout Shift" },
    { "@type": "Thing", "name": "Web Performance" },
    { "@type": "Thing", "name": "Next.js" },
    { "@type": "Thing", "name": "WordPress" },
  ],
  mentions: [
    { "@type": "SoftwareApplication", "name": "Janus CMS", "url": "https://mavellium.com.br/docs/janus-cms" },
    { "@type": "SoftwareApplication", "name": "WordPress" },
    { "@type": "SoftwareApplication", "name": "Next.js" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: "https://mavellium.com.br",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Cases",
      item: "https://mavellium.com.br/cases",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Performance e Arquitetura",
      item: "https://mavellium.com.br/cases/performance-arquitetura",
    },
  ],
};

export default function CasePerformancePage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Vi o caso de estudo de performance da Mavellium e quero entender como vocês podem melhorar a velocidade do meu site."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header
        lightBg
        logo="/logo-mavellium-header.svg"
        logoAlt="Mavellium"
        links={NAV_LINKS}
        ctaLink={whatsappUrl}
        ctaText="Falar com Especialista"
      />

      <main className="bg-white">
        {/* Breadcrumb */}
        <nav
          className="pt-28 pb-4 px-6 border-b border-zinc-200"
          aria-label="Breadcrumb"
        >
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-zinc-800 transition-colors">
              Início
            </Link>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-zinc-500">Cases</span>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-[#00D26A]">Performance e Arquitetura</span>
          </div>
        </nav>

        {/* Article body */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <CaseHero />
          <CaseMethodology />
          <CaseMetrics />
          <CaseLatency />
          <CaseImpact />

          {/* CTA */}
          <section
            aria-labelledby="cta-case-heading"
            className="mt-16 p-8 rounded-md bg-gradient-to-br from-[#00D26A]/[0.05] to-zinc-50 border border-[#00D26A]/20"
          >
            <h2
              id="cta-case-heading"
              className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2"
            >
              Quer esses resultados no seu site?
            </h2>
            <p className="text-zinc-600 font-light mb-6 text-sm leading-relaxed">
              A Mavellium aplica a mesma arquitetura Next.js SSG + Janus CMS
              para sites institucionais, landing pages e e-commerces. Fale com
              nossa equipe para uma auditoria de performance gratuita.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
            >
              Solicitar Auditoria Gratuita
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
