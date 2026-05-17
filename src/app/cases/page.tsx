import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Cases de Sucesso | Mavellium",
  description:
    "Casos de estudo técnicos da Mavellium: benchmarks de performance, arquitetura Next.js SSG vs WordPress, GEO e análise de Core Web Vitals para sites institucionais e landing pages.",
  alternates: { canonical: "https://mavellium.com.br/cases" },
  openGraph: {
    type: "website",
    title: "Cases de Sucesso | Mavellium",
    description:
      "Estudos de caso técnicos com métricas reais: TTFB, PageSpeed Score, Core Web Vitals e impacto de GEO em projetos Next.js SSG + Janus CMS.",
    url: "https://mavellium.com.br/cases",
  },
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cases de Sucesso Mavellium",
  url: "https://mavellium.com.br/cases",
  description:
    "Coleção de estudos de caso técnicos da Mavellium sobre performance web, arquitetura Next.js SSG, GEO e Core Web Vitals.",
  publisher: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Casos de estudo técnicos Mavellium",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "WordPress vs Arquitetura Mavellium: Benchmark de Performance",
        url: "https://mavellium.com.br/cases/performance-arquitetura",
        description:
          "Comparação técnica de TTFB, LCP, INP, CLS e PageSpeed Score entre WordPress tradicional e a stack Next.js SSG + Janus CMS. Redução de 96% no TTFB (1.100ms → 45ms) e aumento de 36 para 69 no PageSpeed Score mobile.",
      },
    ],
  },
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
  ],
};

interface CaseStudy {
  slug: string;
  name: string;
  category: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  tags: string[];
  datePublished: string;
  comingSoon?: boolean;
}

const CASES: CaseStudy[] = [
  {
    slug: "performance-arquitetura",
    name: "WordPress vs Arquitetura Mavellium: Benchmark de Performance",
    category: "Caso de Estudo · Performance",
    description:
      "Comparação técnica de TTFB, LCP, INP, CLS e PageSpeed Score entre WordPress tradicional e a stack Next.js SSG + Janus CMS da Mavellium. Redução de 96% no TTFB e aumento de 36 para 69 no PageSpeed Score mobile.",
    metrics: [
      { label: "TTFB", value: "−96%" },
      { label: "PageSpeed", value: "36 → 69" },
      { label: "Payload", value: "−80%" },
    ],
    tags: ["Core Web Vitals", "Next.js SSG", "GEO", "Benchmark"],
    datePublished: "maio de 2026",
  },
  {
    slug: "tegbe",
    name: "Projeto Tegbe — Site Institucional",
    category: "Caso de Estudo · Cliente",
    description:
      "Estudo de caso sobre o desenvolvimento do projeto Tegbe com a stack Mavellium. Arquitetura Next.js SSG + Janus CMS, métricas de performance e resultados de GEO em ambiente de produção.",
    metrics: [],
    tags: ["Next.js SSG", "Janus CMS", "GEO"],
    datePublished: "",
    comingSoon: true,
  },
];

function ActiveCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/cases/${study.slug}`} className="group block">
      <article className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#00D26A]/40 hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] border border-[#00D26A]/30 rounded-full px-2.5 py-0.5 bg-[#00D26A]/5">
                {study.category}
              </span>
              {study.datePublished && (
                <span className="text-[10px] text-zinc-400 font-light">
                  {study.datePublished}
                </span>
              )}
            </div>

            <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 group-hover:text-[#00D26A] transition-colors mb-3 leading-snug">
              {study.name}
            </h2>

            <p className="text-sm text-zinc-600 font-light leading-relaxed mb-4">
              {study.description}
            </p>

            {study.metrics.length > 0 && (
              <dl className="grid grid-cols-3 gap-3 mb-4">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded border border-zinc-100 bg-zinc-50 p-3"
                  >
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                      {m.label}
                    </dt>
                    <dd className="text-base font-black text-[#00D26A] font-mono">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-500 px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 self-center sm:self-start">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#00D26A] group-hover:gap-2 transition-all">
              Ver caso
              <ChevronRight className="size-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ComingSoonCard({ study }: { study: CaseStudy }) {
  return (
    <article className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm opacity-55 cursor-default">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 rounded-full px-2.5 py-0.5 bg-zinc-50">
              Em breve
            </span>
          </div>

          <h2 className="text-lg font-extrabold tracking-tight text-zinc-500 mb-3 leading-snug">
            {study.name}
          </h2>

          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4">
            {study.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-400 px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CasesPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Vi os cases da Mavellium e quero entender como vocês podem melhorar a performance e o GEO do meu site."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
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
            <span className="text-[#00D26A]">Cases</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-10 pb-10 border-b border-zinc-200">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] border border-[#00D26A]/30 rounded-full px-3 py-1 bg-[#00D26A]/5">
                Cases · Estudos de Caso Técnicos
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4 leading-tight">
              Cases de Sucesso
            </h1>

            <p className="text-base text-zinc-600 font-light leading-relaxed max-w-2xl">
              Os casos de estudo da Mavellium documentam resultados técnicos mensuráveis
              obtidos em projetos reais: benchmarks de Core Web Vitals, comparações de stack,
              impacto de GEO e análise de comportamento de usuário via GA4 e Microsoft Clarity.
              Cada estudo segue a metodologia Answer-First — métricas explícitas, metodologia
              reproduzível e conclusões citáveis por modelos de linguagem.
            </p>
          </header>

          <ul className="space-y-6" role="list">
            {CASES.map((study) => (
              <li key={study.slug}>
                {study.comingSoon ? (
                  <ComingSoonCard study={study} />
                ) : (
                  <ActiveCard study={study} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
