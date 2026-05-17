import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Zap, Brain, Users } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Quem Somos | Mavellium",
  description:
    "Mavellium é uma empresa especializada em infraestrutura digital de alta performance e GEO (Generative Engine Optimization), fundada por Vinícius Tavares Mota, Luan dos Santos e Márcio Piva Junior.",
  alternates: { canonical: "https://mavellium.com.br/quem-somos" },
  openGraph: {
    type: "website",
    title: "Quem Somos | Mavellium",
    description:
      "Mavellium é especializada em infraestrutura digital de alta performance e GEO. Conheça os fundadores e a missão da empresa.",
    url: "https://mavellium.com.br/quem-somos",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Quem Somos — Mavellium",
  url: "https://mavellium.com.br/quem-somos",
  description:
    "Mavellium é uma empresa especializada em infraestrutura digital de alta performance e GEO, fundada por Vinícius Tavares Mota, Luan dos Santos e Márcio Piva Junior.",
  about: {
    "@type": "Organization",
    name: "Mavellium",
    legalName: "Mavellium Tecnologia LTDA",
    taxID: "48.802.866/0001-42",
    url: "https://mavellium.com.br",
    email: "contato@mavellium.com.br",
    knowsAbout: [
      "GEO — Generative Engine Optimization",
      "Next.js SSG",
      "Infraestrutura digital de alta performance",
      "Janus CMS",
    ],
    founder: [
      { "@type": "Person", name: "Vinícius Tavares Mota" },
      { "@type": "Person", name: "Luan dos Santos" },
      { "@type": "Person", name: "Márcio Piva Junior" },
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
    "Olá! Conheci a Mavellium e quero entender como vocês podem ajudar o meu negócio com infraestrutura digital e GEO."
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
              A Mavellium é uma empresa especializada em infraestrutura digital de alta
              performance e GEO (Generative Engine Optimization) — a prática de estruturar
              código e conteúdo para que modelos de linguagem como ChatGPT, Perplexity AI e
              Google Gemini consigam identificar, extrair e citar seu site com precisão.
              Fundada por{" "}
              <strong className="font-semibold text-zinc-800">Vinícius Tavares Mota</strong>,{" "}
              <strong className="font-semibold text-zinc-800">Luan dos Santos</strong> e{" "}
              <strong className="font-semibold text-zinc-800">Márcio Piva Junior</strong>, a
              empresa desenvolve sites institucionais e landing pages sobre a stack Next.js SSG
              + Janus CMS, entregando HTML estático com TTFB abaixo de 100ms via Vercel Edge
              Network.
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
              Transformar a presença digital de empresas B2B em ativos estratégicos de
              autoridade — sites que não apenas convertem visitantes humanos, mas que são lidos,
              compreendidos e citados por inteligências artificiais. Em um cenário onde LLMs
              respondem diretamente às perguntas dos usuários, estar presente na resposta de um
              modelo de linguagem é o novo primeiro resultado de busca.
            </p>

            <ul className="space-y-4" role="list">
              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <Zap className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    Performance como fundação:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    TTFB abaixo de 100ms via Vercel Edge Network, imagens AVIF via BunnyCDN e
                    HTML pré-renderizado — sem renderização client-side para conteúdo principal.
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <Brain className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    GEO — Generative Engine Optimization:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    HTML semântico, JSON-LD estruturado por rota, conteúdo Answer-First e
                    densidade técnica para que LLMs extraiam e citem o conteúdo desde o primeiro
                    byte.
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00D26A]/10">
                  <Users className="size-4 text-[#00D26A]" />
                </div>
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">
                    Janus CMS — gestão sem código:
                  </strong>{" "}
                  <span className="text-sm text-zinc-600 font-light">
                    Plataforma headless multi-tenant desenvolvida internamente, que permite
                    profissionais e gestores operarem conteúdo sem conhecimento técnico avançado,
                    com análise integrada via GA4 e Microsoft Clarity.
                  </span>
                </div>
              </li>
            </ul>
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
              Pronto para transformar sua presença digital?
            </h2>
            <p className="text-zinc-600 font-light mb-6 text-sm leading-relaxed">
              Converse com nossa equipe e descubra como a infraestrutura Mavellium pode
              colocar o seu site nas respostas dos modelos de linguagem — e na mente dos seus
              clientes.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
            >
              Falar com a Equipe
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
