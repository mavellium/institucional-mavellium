import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../../lib/constants";
import { DocHero } from "./_components/DocHero";
import { DocStack } from "./_components/DocStack";
import { DocArchitecture } from "./_components/DocArchitecture";
import { DocSdk } from "./_components/DocSdk";
import { DocPipeline } from "./_components/DocPipeline";

export const metadata: Metadata = {
  title: "Janus CMS — Documentação Técnica | Mavellium",
  description:
    "Janus CMS é um sistema de gestão de conteúdo headless multi-tenant desenvolvido pela Mavellium. Stack: Next.js 16, Prisma 7, PostgreSQL JSONB, Sharp AVIF, BunnyCDN. API REST pública com ISR nativo.",
  alternates: { canonical: "https://mavellium.com.br/docs/janus-cms" },
  openGraph: {
    type: "website",
    title: "Janus CMS — Documentação Técnica | Mavellium",
    description:
      "Documentação técnica do Janus CMS: arquitetura headless, API REST, SDK TypeScript, pipeline de renderização e otimização para LLMs.",
    url: "https://mavellium.com.br/docs/janus-cms",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Janus CMS",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Content Management System",
  operatingSystem: "Web",
  url: "https://mavellium.com.br/docs/janus-cms",
  creator: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  programmingLanguage: ["TypeScript", "JavaScript"],
  runtimePlatform: "Node.js",
  softwareRequirements: "Next.js 16, PostgreSQL, Node.js",
  softwareVersion: "1.0",
  license: "Proprietário",
  inLanguage: "pt-BR",
  featureList: [
    "Multi-tenant com isolamento por Company",
    "API REST headless com cache ISR (s-maxage=60)",
    "Dual-model schemaData + contentData por página",
    "Conversão automática de imagens para AVIF via Sharp",
    "Integração nativa com BunnyCDN",
    "Autenticação JWT via NextAuth v5",
    "Editor de schema visual com Monaco Editor",
    "Editor de texto rico com Tiptap",
    "Blog integrado por projeto",
    "Galeria de contribuições (Guest Mode)",
    "RBAC granular por permissão, módulo e tier",
    "Soft delete com trilha de auditoria",
    "ISR com revalidatePath por rota",
  ],
  description:
    "Janus CMS é um sistema de gestão de conteúdo headless multi-tenant desenvolvido pela Mavellium, construído nativamente sobre Next.js App Router, TypeScript e PostgreSQL JSONB. Serve conteúdo via API REST pública com Cache-Control s-maxage=60, converte imagens automaticamente para AVIF via Sharp e integra ISR do Next.js para entrega abaixo de 100ms de TTFB via Vercel Edge Network.",
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
      name: "Documentação",
      item: "https://mavellium.com.br/docs",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Janus CMS",
      item: "https://mavellium.com.br/docs/janus-cms",
    },
  ],
};

export default function JanusCmsDocsPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Vi a documentação do Janus CMS e quero saber mais sobre como implementá-lo no meu projeto."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
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
            <span className="text-zinc-500">Documentação</span>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-[#00D26A]">Janus CMS</span>
          </div>
        </nav>

        {/* Document body */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <DocHero />
          <DocStack />
          <DocArchitecture />
          <DocSdk />
          <DocPipeline />

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
              O Janus CMS é desenvolvido e mantido pela Mavellium. Entre em
              contato para avaliar a adoção no seu stack Next.js.
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
        </article>
      </main>

      <Footer />
    </>
  );
}
