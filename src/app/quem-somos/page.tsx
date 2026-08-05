import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { RaioXCTA } from "../../components/ui/raio-x-cta";
import { NAV_LINKS } from "../../lib/constants";
import {
  IntroJanus,
  TrajetoriaJanus,
  FoundersJanus,
} from "../../components/ui/janus-quemsomos-sections";
import type { QuemSomosSchema } from "../../components/ui/janus-quemsomos-sections";
import { fetchJanusPageSchema } from "@/src/lib/janus-server";

export const revalidate = 60;

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

export default async function QuemSomosPage() {
  const quemSomosData = await fetchJanusPageSchema<QuemSomosSchema>(
    "quem-somos"
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
        ctaLink="/#diagnostico"
        ctaText="Solicitar Raio-X"
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

        <IntroJanus initialData={quemSomosData ?? undefined} />

        <TrajetoriaJanus initialData={quemSomosData ?? undefined} />

        <article className="max-w-4xl mx-auto px-6 pb-12">
          <FoundersJanus initialData={quemSomosData ?? undefined} />

          <RaioXCTA variant="destaque" location="quem_somos" />
        </article>
      </main>

      <Footer />
    </>
  );
}
