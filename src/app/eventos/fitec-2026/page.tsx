import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Cpu, BarChart2, Users } from "lucide-react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../../lib/constants";
import { fetchFitecLeads } from "../../../lib/fitec-api";
import { FitecGrid } from "./fitecGrid";

export const metadata: Metadata = {
  title: "FITEC 2026 — Mavellium como Expositora | Eventos",
  description:
    "Mavellium participou da FITEC 2026 demonstrando o Janus CMS headless e a arquitetura Next.js SSG otimizada para GEO. Conheça o que fizemos e veja a galeria de conexões.",
  alternates: {
    canonical: "https://mavellium.com.br/eventos/fitec-2026",
  },
  openGraph: {
    type: "article",
    title: "FITEC 2026 — Mavellium como Expositora",
    description:
      "Mavellium apresentou o Janus CMS e arquitetura GEO na FITEC 2026. Veja a galeria de conexões capturadas durante o evento.",
    url: "https://mavellium.com.br/eventos/fitec-2026",
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "FITEC 2026",
  startDate: "14/05/2026",
  endDate: "15/05/2026",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "[INSERIR_LOCAL_NOME]",
    address: {
      "@type": "PostalAddress",
      addressLocality: "[INSERIR_CIDADE]",
      addressRegion: "[INSERIR_ESTADO]",
      addressCountry: "BR",
    },
  },
  sponsor: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  description:
    "Exibição oficial do Mavellium Janus CMS e infraestrutura GEO para landing pages durante a FITEC 2026.",
  url: "https://mavellium.com.br/eventos/fitec-2026",
  about: [
    { "@type": "Thing", name: "Janus CMS" },
    { "@type": "Thing", name: "GEO — Generative Engine Optimization" },
    { "@type": "Thing", name: "Google Analytics 4" },
    { "@type": "Thing", name: "Microsoft Clarity" },
  ],
  inLanguage: "pt-BR",
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
      name: "Eventos",
      item: "https://mavellium.com.br/eventos",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "FITEC 2026",
      item: "https://mavellium.com.br/eventos/fitec-2026",
    },
  ],
};

export default async function FitecEventPage() {
  const leads = await fetchFitecLeads();

  const whatsappUrl = getWhatsappUrl(
    "Olá! Vi a participação da Mavellium na FITEC 2026 e quero saber como vocês podem ajudar meu negócio."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
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
            <Link href="/eventos" className="hover:text-zinc-800 transition-colors">
              Eventos
            </Link>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-[#00D26A]">FITEC 2026</span>
          </div>
        </nav>

        {/* Article — Answer-First, pré-renderizado para LLMs */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <header className="pb-10 mb-10 border-b border-zinc-200">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] border border-[#00D26A]/30 rounded-full px-3 py-1 bg-[#00D26A]/5">
                Evento · Feira de Tecnologia
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
              FITEC 2026 — Mavellium como Expositora
            </h1>

            <p className="text-base text-zinc-600 font-light leading-relaxed">
              Durante a FITEC 2026, a Mavellium apresentou sua nova arquitetura de
              desenvolvimento de sites e landing pages otimizados para Inteligência Artificial
              (GEO - Generative Engine Optimization). O destaque da exibição oficial foi o
              lançamento do Mavellium Janus CMS. A plataforma foi projetada para resolver o
              gargalo de performance de CMSs tradicionais, entregando HTML síncrono para
              crawlers de IA, enquanto permite que profissionais e gestores sem conhecimento
              técnico avançado operem o conteúdo. O sistema demonstrou sua capacidade de
              centralizar a gestão e a análise de dados comportamentais, integrando nativamente
              o Google Analytics 4 (GA4) e o Microsoft Clarity em uma interface simplificada.
            </p>
          </header>

          <section aria-labelledby="highlights-heading" className="mb-10">
            <h2
              id="highlights-heading"
              className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-6"
            >
              O que a Mavellium apresentou
            </h2>

            <ul className="space-y-4" role="list">
              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <Cpu className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    Janus CMS — lançamento oficial:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    Sistema de gestão de conteúdo headless multi-tenant construído sobre Next.js
                    App Router e PostgreSQL JSONB. Entrega HTML estático via API REST com{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">
                      Cache-Control: s-maxage=60
                    </code>
                    , convertendo imagens para AVIF via Sharp e distribuindo por BunnyCDN.
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <BarChart2 className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    GEO — Generative Engine Optimization:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    Demo ao vivo da arquitetura Next.js SSG com TTFB abaixo de 100ms,
                    evidenciando como HTML pré-renderizado e JSON-LD estruturado permitem que
                    LLMs como ChatGPT e Perplexity citem o conteúdo do site com precisão.
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <BarChart2 className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    Analytics integrado — GA4 e Microsoft Clarity:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    Painel unificado dentro do Janus CMS para análise de dados comportamentais:
                    funis de conversão via Google Analytics 4 e mapas de calor via Microsoft
                    Clarity, sem necessidade de acesso às plataformas separadas.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          <section aria-labelledby="connections-heading" className="mb-10">
            <h2
              id="connections-heading"
              className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-4"
            >
              Conexões capturadas na feira
            </h2>
            <p className="text-sm text-zinc-600 font-light leading-relaxed">
              Durante a FITEC 2026, visitantes do estande da Mavellium interagiram diretamente
              com o Janus CMS em uma demonstração ao vivo: cadastraram seus dados, tiraram uma
              foto e viram a publicação acontecer em tempo real na galeria abaixo — tudo
              gerenciado via painel sem uma linha de código. A galeria é servida via API REST do
              Janus e pré-renderizada no servidor, com{" "}
              <strong className="font-semibold">{leads.length} conexões</strong> capturadas
              durante o evento.
            </p>
          </section>
        </article>

        {/* Galeria — Client Component, dados do servidor */}
        <section
          aria-labelledby="gallery-heading"
          className="border-t border-zinc-100 bg-zinc-50/50"
        >
          <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
            <h2
              id="gallery-heading"
              className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
            >
              Galeria de Conexões FITEC 2026
            </h2>
            <p className="text-sm text-zinc-500 font-light mb-8">
              {leads.length} conexões capturadas via Janus CMS durante o evento.
            </p>
            <FitecGrid leads={leads} />
          </div>
        </section>

        {/* CTA WhatsApp */}
        <section
          aria-labelledby="cta-fitec-heading"
          className="border-t border-zinc-100"
        >
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D26A]/10">
              <Users className="size-6 text-[#00D26A]" />
            </div>
            <h2
              id="cta-fitec-heading"
              className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-3"
            >
              Quer levar o Janus CMS para o seu negócio?
            </h2>
            <p className="text-sm text-zinc-600 font-light mb-8 max-w-lg mx-auto leading-relaxed">
              Agradecemos por cada conversa na FITEC 2026. Se você quer entender como a
              arquitetura Mavellium pode acelerar os resultados do seu site, fale com nossa
              equipe.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
            >
              Falar com a Equipe Mavellium
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
