import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../../lib/constants";
import { SdkHero } from "./_components/SdkHero";
import { SdkInstall } from "./_components/SdkInstall";
import { SdkInit } from "./_components/SdkInit";
import { SdkBlog } from "./_components/SdkBlog";
import { SdkPage } from "./_components/SdkPage";
import { SdkUtils } from "./_components/SdkUtils";
import { SdkErrors } from "./_components/SdkErrors";

export const metadata: Metadata = {
  title: "janus-sdk — SDK TypeScript para o Janus CMS | Mavellium",
  description:
    "janus-sdk é o cliente TypeScript oficial para a API pública do Janus CMS. Framework-agnostic, ESM + CJS, fetch nativa. Guia completo de instalação e uso em Next.js, Astro e Node.js.",
  alternates: { canonical: "https://mavellium.com.br/docs/janus-sdk" },
  openGraph: {
    type: "website",
    title: "janus-sdk — SDK TypeScript para o Janus CMS | Mavellium",
    description:
      "Guia completo do janus-sdk: instalação via npm, workspace ou pnpm link, inicialização, métodos de blog, páginas headless, utilitários e tratamento de erros tipados.",
    url: "https://mavellium.com.br/docs/janus-sdk",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "janus-sdk",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Node.js ≥ 18, Browsers, Deno, Bun",
  url: "https://mavellium.com.br/docs/janus-sdk",
  creator: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  programmingLanguage: ["TypeScript", "JavaScript"],
  runtimePlatform: "Node.js",
  softwareVersion: "0.1.0",
  license: "MIT",
  inLanguage: "pt-BR",
  featureList: [
    "Framework-agnostic (Next.js, Astro, Node.js puro, Bun, Deno)",
    "Dual output ESM + CJS via tsup",
    "Fetch API nativa — sem dependências",
    "Tipos TypeScript completos exportados",
    "JanusAPIError com status e url",
    "Métodos de blog: getPosts, getPost, getPostSlugs, getRelatedPosts, getCategories",
    "Página headless: getPage via /api/v1/content/:tenant/:slug",
    "Utilitários: processHtmlBody, getCategoryColor, formatDate",
  ],
  description:
    "janus-sdk é o cliente TypeScript oficial para a API pública do Janus CMS. Agnóstico de framework, exporta ESM e CommonJS, usa fetch nativa (Node ≥ 18) e oferece erros tipados com JanusAPIError.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início",        item: "https://mavellium.com.br" },
    { "@type": "ListItem", position: 2, name: "Documentação",  item: "https://mavellium.com.br/docs" },
    { "@type": "ListItem", position: 3, name: "janus-sdk",     item: "https://mavellium.com.br/docs/janus-sdk" },
  ],
};

export default function JanusSdkDocsPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Vi a documentação do janus-sdk e quero saber mais sobre como integrá-lo ao meu projeto."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
            <Link
              href="/docs/janus-cms"
              className="hover:text-zinc-800 transition-colors"
            >
              Documentação
            </Link>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-[#00D26A]">janus-sdk</span>
          </div>
        </nav>

        {/* Document body */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <SdkHero />
          <SdkInstall />
          <SdkInit />
          <SdkBlog />
          <SdkPage />
          <SdkUtils />
          <SdkErrors />

          {/* CTA final */}
          <section
            aria-labelledby="cta-heading"
            className="mt-16 p-8 rounded-md bg-gradient-to-br from-[#00D26A]/[0.05] to-zinc-50 border border-[#00D26A]/20"
          >
            <h2
              id="cta-heading"
              className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2"
            >
              Quer o Janus CMS no seu projeto?
            </h2>
            <p className="text-zinc-600 font-light mb-6 text-sm leading-relaxed">
              O janus-sdk é desenvolvido e mantido pela Mavellium como parte do
              ecossistema Janus. Entre em contato para avaliar a adoção no seu
              stack.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
              >
                Falar com Especialista
              </a>
              <Link
                href="/docs/janus-cms"
                className="inline-flex items-center gap-2 border border-zinc-300 hover:border-zinc-500 text-zinc-700 font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-colors duration-300"
              >
                Ver docs do Janus CMS
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
