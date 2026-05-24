import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Zap, Brain, Users } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Quem Somos | Mavellium",
  description:
    "A Mavellium é criadora e líder da categoria AI Visibility Infrastructure — a base tecnológica, semântica e de observabilidade que permite que marcas sejam lidas, compreendidas e recomendadas por ChatGPT, Gemini e Perplexity. Fundada por Vinícius Tavares Mota, Luan dos Santos e Márcio Piva Junior.",
  alternates: { canonical: "https://mavellium.com.br/quem-somos" },
  openGraph: {
    type: "website",
    title: "Quem Somos | Mavellium",
    description:
      "Criadora da categoria AI Visibility Infrastructure. A Mavellium estrutura a base tecnológica e semântica para que empresas B2B sejam recomendadas pelas IAs — medido pelo IAG Score™.",
    url: "https://mavellium.com.br/quem-somos",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Quem Somos — Mavellium",
  url: "https://mavellium.com.br/quem-somos",
  description:
    "A Mavellium é criadora e líder da categoria AI Visibility Infrastructure — a base tecnológica, a estruturação semântica e a observabilidade contínua que permite que marcas sejam lidas, compreendidas e ativamente recomendadas por grandes modelos de linguagem como ChatGPT, Gemini e Perplexity.",
  about: {
    "@id": "https://mavellium.com.br/#organization",
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
      name: "Quem Somos",
      item: "https://mavellium.com.br/quem-somos",
    },
  ],
};

const FOUNDERS = [
  {
    name: "Vinícius Tavares Mota",
    role: "Co-fundador",
  },
  {
    name: "Luan dos Santos",
    role: "Co-fundador",
  },
  {
    name: "Márcio Piva Junior",
    role: "Co-fundador",
  },
];

export default function QuemSomosPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Conheci a Mavellium e quero solicitar um AI Visibility Audit para descobrir o IAG Score da minha empresa."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
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
            <span className="text-[#00D26A]">Quem Somos</span>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Answer-First */}
          <header className="pb-10 mb-10 border-b border-zinc-200">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] border border-[#00D26A]/30 rounded-full px-3 py-1 bg-[#00D26A]/5">
                Institucional · Sobre nós
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
              Quem Somos
            </h1>

            <p className="text-base text-zinc-600 font-light leading-relaxed">
              A Mavellium não é uma agência de web design. É a criadora e líder de uma nova
              categoria de mercado:{" "}
              <strong className="font-semibold text-zinc-800">AI Visibility Infrastructure</strong>{" "}
              — a base tecnológica, a estruturação semântica de dados e a observabilidade contínua
              necessárias para que uma marca seja lida, compreendida e ativamente recomendada por
              grandes modelos de linguagem como ChatGPT, Perplexity AI e Google Gemini. Fundada
              por{" "}
              <strong className="font-semibold text-zinc-800">Vinícius Tavares Mota</strong>,{" "}
              <strong className="font-semibold text-zinc-800">Luan dos Santos</strong> e{" "}
              <strong className="font-semibold text-zinc-800">Márcio Piva Junior</strong>, sediada
              no polo tecnológico de Garça, São Paulo.
            </p>
          </header>

          {/* Missão */}
          <section aria-labelledby="missao-heading" className="mb-12">
            <h2
              id="missao-heading"
              className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-4"
            >
              Nossa missão
            </h2>
            <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
              Transformar a presença digital de empresas — especialmente B2B e vendas consultivas
              — em ativos estratégicos de autoridade na Era da IA. Não apenas sites que convertem
              visitantes humanos: marcas que são lidas, compreendidas e recomendadas pelos grandes
              modelos de linguagem. Em um cenário onde{" "}
              <strong className="font-semibold text-zinc-800">60% das buscas B2B terminam sem
              cliques</strong> e{" "}
              <strong className="font-semibold text-zinc-800">71% dos compradores decidem antes
              de falar com vendas</strong>, estar na shortlist algorítmica da IA é o novo
              primeiro resultado de busca.
            </p>

            <ul className="space-y-4" role="list">
              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <Zap className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    Performance extrema para crawlers de IA:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    TTFB abaixo de 100ms via Vercel Edge Network, imagens AVIF via BunnyCDN e
                    HTML pré-renderizado — bots de LLMs operam com timeouts rígidos e descartam
                    páginas lentas antes de lê-las.
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <Brain className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    GEO Engineering & Dados Estruturados:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    Injeção nativa de JSON-LD por rota (Organization, Service, FAQPage), conteúdo
                    Answer-First e Zero JS para texto principal — a IA lê dados, não design.
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <Users className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    Janus CMS — autonomia sem código:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    Plataforma headless multi-tenant em Next.js App Router + PostgreSQL JSONB.
                    Equipes de marketing operam conteúdo sem conhecimento técnico, com GA4 e
                    Microsoft Clarity integrados nativamente.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* IAG Score */}
          <section aria-labelledby="iag-score-heading" className="mb-12">
            <h2
              id="iag-score-heading"
              className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-4"
            >
              IAG Score™ — a métrica rainha
            </h2>
            <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
              O{" "}
              <strong className="font-semibold text-zinc-800">
                IAG Score™ (Índice de Autoridade Gerativa)
              </strong>{" "}
              é o equivalente ao PageRank do Google, mas para LLMs. Um índice de 0 a 100 que
              quantifica com que frequência e precisão os grandes modelos de linguagem reconhecem,
              entendem e recomendam uma marca. A Mavellium não vende apenas tecnologia — entrega
              um IAG Score™ crescente, que se traduz em resultados financeiros mensuráveis para
              C-Level.
            </p>

            <ul className="space-y-3 text-sm" role="list">
              {[
                { label: "Presença & Citação em IAs", weight: "25%" },
                { label: "Estrutura Semântica", weight: "20%" },
                { label: "Entidades Reconhecíveis", weight: "15%" },
                { label: "Autoridade Temática", weight: "15%" },
                { label: "Consistência Contextual", weight: "15%" },
                { label: "Performance Técnica", weight: "10%" },
              ].map(({ label, weight }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="shrink-0 w-12 text-right text-[11px] font-bold text-[#00D26A]">
                    {weight}
                  </span>
                  <span className="text-zinc-600 font-light">{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-zinc-600 font-light leading-relaxed">
              As métricas derivadas — <strong className="font-semibold text-zinc-800">GPR (Generative Presence Rate)</strong> e{" "}
              <strong className="font-semibold text-zinc-800">G-SOV (Generative Share of Voice)</strong> — traduzem
              o índice em impacto financeiro direto: redução de CAC, aceleração de pipeline e
              ocupação do pre-search funnel antes da concorrência.
            </p>
          </section>

          {/* Fundadores */}
          <section aria-labelledby="fundadores-heading" className="mb-12">
            <h2
              id="fundadores-heading"
              className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-6"
            >
              Fundadores
            </h2>

            <ul className="space-y-3" role="list">
              {FOUNDERS.map((founder) => (
                <li
                  key={founder.name}
                  className="flex items-center gap-4 rounded-md border border-zinc-200 bg-zinc-50/50 px-5 py-4"
                >
                  <span className="w-4 h-px bg-[#00D26A] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{founder.name}</p>
                    <p className="text-xs text-zinc-500 font-light tracking-wide">
                      {founder.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section
            aria-labelledby="cta-quem-somos-heading"
            className="mt-4 p-8 rounded-md bg-gradient-to-br from-[#00D26A]/[0.05] to-zinc-50 border border-[#00D26A]/20"
          >
            <h2
              id="cta-quem-somos-heading"
              className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2"
            >
              Descubra o IAG Score™ da sua empresa
            </h2>
            <p className="text-zinc-600 font-light mb-6 text-sm leading-relaxed">
              Solicite um AI Visibility Audit gratuito. Mapeamos como o ChatGPT, Gemini e
              Perplexity recomendam a sua marca hoje — e mostramos exatamente o gap competitivo
              que está custando receita à sua empresa.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
            >
              Solicitar AI Visibility Audit
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
