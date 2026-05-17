import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, Package } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Documentação Técnica | Mavellium",
  description:
    "Documentação técnica dos produtos Mavellium: Janus CMS headless multi-tenant e janus-sdk, o cliente TypeScript oficial para consumo da API pública do Janus.",
  alternates: { canonical: "https://mavellium.com.br/docs" },
  openGraph: {
    type: "website",
    title: "Documentação Técnica | Mavellium",
    description:
      "Guias técnicos completos do ecossistema Mavellium: Janus CMS e janus-sdk.",
    url: "https://mavellium.com.br/docs",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início",       item: "https://mavellium.com.br" },
    { "@type": "ListItem", position: 2, name: "Documentação", item: "https://mavellium.com.br/docs" },
  ],
};

const DOCS = [
  {
    href: "/docs/janus-cms",
    icon: BookOpen,
    label: "CMS",
    name: "Janus CMS",
    tagline: "Sistema de gestão de conteúdo headless multi-tenant",
    description:
      "Arquitetura, stack técnico, API REST pública, pipeline de renderização, RBAC granular e integração com BunnyCDN.",
    badges: ["Next.js 16", "Prisma 7", "PostgreSQL", "AVIF", "ISR"],
    version: "1.0",
    license: "Proprietário",
  },
  {
    href: "/docs/janus-sdk",
    icon: Package,
    label: "SDK",
    name: "janus-sdk",
    tagline: "Cliente TypeScript oficial para a API do Janus",
    description:
      "Instalação, inicialização, métodos de blog, páginas headless, utilitários e tratamento de erros tipados com JanusAPIError.",
    badges: ["TypeScript", "ESM + CJS", "Fetch nativa", "Framework-agnostic"],
    version: "0.1.0",
    license: "MIT",
  },
];

export default function DocsPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Estava vendo a documentação da Mavellium e quero saber mais sobre o ecossistema Janus."
  );

  return (
    <>
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
            <span className="text-[#00D26A]">Documentação</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Hero */}
          <header className="mb-14">
            <div className="inline-flex items-center gap-2 bg-[#00D26A]/10 border border-[#00D26A]/20 rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D26A]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A]">
                Ecossistema Mavellium
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">
              Documentação
            </h1>
            <p className="text-zinc-500 font-light text-base leading-relaxed max-w-2xl">
              Guias técnicos completos dos produtos desenvolvidos e mantidos pela
              Mavellium. Escolha o documento que melhor corresponde ao que você
              precisa implementar.
            </p>
          </header>

          {/* Doc cards */}
          <div className="grid gap-6 sm:grid-cols-2 mb-16">
            {DOCS.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group block border border-zinc-200 rounded-md p-6 hover:border-[#00D26A]/40 hover:shadow-[0_0_20px_rgba(0,210,106,0.06)] transition-all duration-300"
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-[#00D26A]/10 border border-[#00D26A]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00D26A]/15 transition-colors">
                        <Icon className="size-4 text-[#00D26A]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          {doc.label}
                        </p>
                        <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 leading-none">
                          {doc.name}
                        </h2>
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-zinc-300 flex-shrink-0 mt-1 group-hover:text-[#00D26A] transition-colors" />
                  </div>

                  {/* Tagline */}
                  <p className="text-zinc-700 font-medium text-sm mb-2">
                    {doc.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-500 font-light text-xs leading-relaxed mb-5">
                    {doc.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {doc.badges.map((b) => (
                      <span
                        key={b}
                        className="bg-zinc-100 text-zinc-600 text-[10px] font-mono px-2 py-0.5 rounded"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-t border-zinc-100 pt-4">
                    <span>v{doc.version}</span>
                    <span className="w-px h-3 bg-zinc-200" />
                    <span>{doc.license}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <section
            aria-labelledby="cta-heading"
            className="p-8 rounded-md bg-gradient-to-br from-[#00D26A]/[0.05] to-zinc-50 border border-[#00D26A]/20"
          >
            <h2
              id="cta-heading"
              className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2"
            >
              Quer o ecossistema Janus no seu projeto?
            </h2>
            <p className="text-zinc-600 font-light mb-6 text-sm leading-relaxed">
              O Janus CMS e o janus-sdk são desenvolvidos e mantidos pela
              Mavellium. Entre em contato para avaliar a adoção no seu stack.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
            >
              Falar com Especialista
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
