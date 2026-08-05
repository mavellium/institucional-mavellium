export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  alternates: { canonical: "https://mavellium.com.br" },
};

function SlideWithText({ image, title, subtitle, description, imageAlt }: { image: string; title: string; subtitle?: string; description: string; imageAlt: string }) {
  return (
    <div className="relative h-[400px] md:h-[480px] w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] group border border-black/5 shadow-lg">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-8 md:p-12 h-full">
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-[#00D26A] text-sm md:text-base italic font-medium mb-3">{subtitle}</p>
        )}
        <p className="text-white/80 text-base md:text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
import dynamic from "next/dynamic";
import { Hero } from "../components/ui/hero-janus";
import { Footer } from "../components/ui/footer";
import { Carousel } from "../components/ui/carousel-companys";
import { CaseTegbeSection } from "../components/ui/case-tegbe-section";
import { MetricsCounters } from "../components/ui/metrics-counters";
import { SeoAeoGeoComparison } from "../components/ui/seo-aeo-geo-comparison";
import { IagScoreSection } from "../components/ui/iag-score-section";
import { FounderSection } from "../components/ui/founder-section";
import { QualificationFormSection } from "../components/ui/qualification-form";
import { PricingSection } from "../components/ui/pricing-details";
import { PLANS_GEO } from "../lib/plans-data";
import { NAV_LINKS } from "../lib/constants";

const Gallery4        = dynamic(() => import("../components/ui/gallery4").then((m) => ({ default: m.Gallery4 })));
const FitecLeadsGallery = dynamic(() => import("../components/ui/FitecLeadsGallery").then((m) => ({ default: m.FitecLeadsGallery })));
const FaqJanus        = dynamic(() => import("../components/ui/janus-home-sections").then((m) => ({ default: m.FaqJanus })));
const SolucoesJanus   = dynamic(() => import("../components/ui/janus-home-sections").then((m) => ({ default: m.SolucoesJanus })));
const ManifestoJanus  = dynamic(() => import("../components/ui/janus-home-sections").then((m) => ({ default: m.ManifestoJanus })));
const CtaFinalJanus   = dynamic(() => import("../components/ui/janus-home-sections").then((m) => ({ default: m.CtaFinalJanus })));

import { fetchFitecLeads } from "@/src/lib/fitec-api";
import { fetchCmsPosts } from "@/src/lib/blog-api";
import { fetchJanusBlocks } from "@/src/lib/janus-server";

export default async function Home() {

  const [cmsPosts, janusHome, fitecLeads] = await Promise.all([
    fetchCmsPosts({ limit: 3 }),
    fetchJanusBlocks("home"),
    fetchFitecLeads(),
  ]);

  const faqItems = (
    (janusHome?.["faq-mavellium"] as { items?: Array<{ question?: string; answer?: string }> } | null)?.items ?? []
  ).filter((item): item is { question: string; answer: string } => Boolean(item.question?.trim() && item.answer?.trim()));
  const faqSchema = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;
  const insightsItems = cmsPosts.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    href: `/blog/${p.slug}`,
    image: p.coverImage,
  }));

  const blogData = {
    title: "Mavellium Insights",
    description: "Artigos, tendências e análises profundas sobre como a tecnologia e o design impactam o faturamento da sua empresa.",
    items: insightsItems,
  };

  // Reposicionamento GEO/AEO (doc/reposicionamento.md item 2.1) — copy pronto,
  // literal. Arco: diagnosticar → arquitetar → autoridade → observar.
  const slidesMetodologia = [
    <SlideWithText
      key="1"
      image="/imagem-1.webp"
      title="Etapa 1 — Raio-X"
      subtitle="Diagnóstico de Citabilidade Multi-LLM."
      imageAlt="Raio-X — diagnóstico de citabilidade multi-LLM da marca em ChatGPT, Gemini, Perplexity e Claude"
      description="Mapeamos como sua marca aparece hoje nas respostas de ChatGPT, Gemini, Perplexity e Claude para as perguntas críticas do seu setor — e quantas vezes a IA recomenda o concorrente no seu lugar."
    />,
    <SlideWithText
      key="2"
      image="/imagem-2.webp"
      title="Etapa 2 — Arquitetura Semântica"
      subtitle="Estruturação de dados, entidades e schema."
      imageAlt="Arquitetura Semântica — estruturação de dados, entidades e schema JSON-LD legíveis por máquina"
      description="Reescrevemos a base técnica do seu site na linguagem que os modelos leem: dados estruturados (JSON-LD), entidades consistentes e HTML legível por máquina. É o que transforma seu site em fonte que a IA consegue interpretar."
    />,
    <SlideWithText
      key="3"
      image="/imagem-3.webp"
      title="Etapa 3 — Autoridade Algorítmica"
      subtitle="Information gain e distribuição."
      imageAlt="Autoridade Algorítmica — produção de conteúdo citado pela IA como fonte e distribuição nos lugares que os modelos consultam"
      description="Produzimos conteúdo que a IA cita como fonte e construímos presença nos lugares que os modelos consultam para gerar respostas. Deixar de ser encontrado para passar a ser recomendado."
    />,
    <SlideWithText
      key="4"
      image="/imagem-4.webp"
      title="Etapa 4 — Observabilidade Contínua"
      subtitle="Monitoramento e IAG Score ao longo do tempo, via Janus."
      imageAlt="Observabilidade Contínua — painel Janus de monitoramento de visibilidade em IA e IAG Score ao longo do tempo"
      description="Nosso painel acompanha sua visibilidade e a dos concorrentes em tempo real, ajustando a estratégia conforme os modelos de IA evoluem. Visibilidade em IA não é entrega única — é operação contínua."
    />,
  ];

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header
        logo={"/logo-mavellium-header.svg"}
        logoAlt={"Mavellium - Tecnologia e Inovação"}
        links={NAV_LINKS}
        ctaLink="/#diagnostico"
        ctaText={"Solicitar Raio-X"}
      />
      <Hero initialData={janusHome?.["hero-section-mavellium"] as never} />
      <MetricsCounters />
      <ManifestoJanus initialData={janusHome?.["manifesto-mavellium"]} />
      <SeoAeoGeoComparison />
      <Carousel
        slides={slidesMetodologia}
        options={{ loop: false, align: "start" }}
        title="Nossa Metodologia"
        description="Da invisibilidade à recomendação por IA, em quatro etapas mensuráveis."
      />
      <div id="solucoes">
        <SolucoesJanus initialData={janusHome?.["solucoes-mavellium"]} />
      </div>
      <CaseTegbeSection />
      <PricingSection
        plans={PLANS_GEO}
        heading="Planos"
        description="Da invisibilidade à liderança de categoria — escolha onde sua marca precisa chegar."
      />
      <IagScoreSection />
      <FounderSection />
      <FaqJanus initialData={janusHome?.["faq-mavellium"]} />
      <Gallery4  {...blogData}
        cta={{
          label: "Acessar Todos os Artigos",
          href: "/blog",
        }}
      />
      <CtaFinalJanus initialData={janusHome?.["cta-final-mavellium"]} />
      <QualificationFormSection />
      {fitecLeads.length > 0 && (
        <FitecLeadsGallery
          title="Conexões FITEC 2026"
          description="Pessoas incríveis que conhecemos na feira, gerenciadas via Janus CMS."
          items={fitecLeads.map(lead => ({ ...lead, text: lead.text ?? undefined }))}
        />
      )}
      <Footer />
    </>
  );
}
