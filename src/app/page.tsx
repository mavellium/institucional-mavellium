export const revalidate = 60;

import Image from "next/image";
import { Header } from "../components/Header";

function SlideWithText({ image, title, description, imageAlt }: { image: string; title: string; description: string; imageAlt: string }) {
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
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="text-white/80 text-base md:text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
import { Hero } from "../components/ui/hero-janus";
import { Gallery4 } from "../components/ui/gallery4";
import { Footer } from "../components/ui/footer";
import HoverPreview from "../components/ui/hover-preview";
import Pricing from "../components/ui/pricing-section";
import { Carousel } from "../components/ui/carousel-companys";
import SelectCards from "../components/ui/select-cards";
import Benefits from "../components/ui/benefits";
import {
  QuemSomosJanus,
  FaqJanus,
  SolucoesJanus,
  ManifestoJanus,
  CtaFinalJanus,
} from "../components/ui/janus-home-sections";
import { GalleryGridBlock } from "../components/ui/sections-gallery";
import { Plan, PricingSection } from "../components/ui/pricing-details";
import { getWhatsappUrl } from "../lib/constants";
import { FitecLeadsGallery } from "../components/ui/FitecLeadsGallery";
import { fetchFitecLeads } from "@/src/lib/fitec-api";
import { fetchCmsPosts } from "@/src/lib/blog-api";

export default async function Home() {

  const cmsPosts = await fetchCmsPosts({ limit: 3 });
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

  const slidesMetodologia = [
    <SlideWithText
      key="1"
      image="/imagem-1.webp"
      title="1. Imersão e Briefing"
      imageAlt="Reunião de imersão e briefing — equipe Mavellium alinhando metas de performance e arquitetura GEO com o cliente"
      description="Sentamos com você para entender a fundo a sua dor, o seu modelo de negócio e o que você espera de resultado."
    />,
    <SlideWithText
      key="2"
      image="/imagem-2.webp"
      title="2. Análise de Viabilidade"
      imageAlt="Análise de viabilidade técnica — seleção de stack Next.js SSG e infraestrutura headless para otimização de TTFB e LCP"
      description="Nossa equipe técnica seleciona as melhores tecnologias atuais para resolver a sua demanda com o melhor custo-benefício."
    />,
    <SlideWithText
      key="3"
      image="/imagem-3.webp"
      title="3. Cronograma de Entregas"
      imageAlt="Cronograma iterativo de entregas — planejamento de projeto web com marcos de Core Web Vitals por fase"
      description="O projeto é fatiado em etapas. Criamos um calendário transparente para que você acompanhe visualmente o progresso."
    />,
    <SlideWithText
      key="4"
      image="/imagem-4.webp"
      title="4. Desenvolvimento"
      imageAlt="Desenvolvimento com Next.js SSG e Janus CMS — implementação de site institucional com foco em performance e GEO"
      description="Você tem visão total do andamento do projeto, validando e acompanhando cada fase concluída pela nossa equipe."
    />,
    <SlideWithText
      key="5"
      image="/imagem-5.webp"
      title="5. Entrega Final"
      imageAlt="Entrega final do projeto Mavellium — site institucional com PageSpeed Score otimizado e HTML semântico para crawlers de LLMs"
      description="O projeto só é finalizado quando atinge os nossos rigorosos padrões de excelência e a sua total satisfação."
    />,
  ];

  const PLANS: Plan[] = [
    {
      name: 'Landing Pages',
      info: 'Páginas desenvolvidas com um único objetivo: transformar visitantes em clientes reais.',
      label: 'Alta Conversão',
      features: [
        { text: 'Design livre de distrações' },
        { text: 'Copywriting Estratégico', tooltip: 'Textos focados em conversão e gatilhos mentais.' },
        { text: 'Integração com CRM/Email' },
        { text: 'Otimização de Velocidade' },
        { text: 'Maximização de anúncios' },
      ],
      btn: {
        text: 'Acelerar Vendas',
        // Mensagem focada em Landing Pages e conversão
        href: getWhatsappUrl("Olá! Gostaria de saber mais sobre o desenvolvimento de uma Landing Page de Alta Conversão para escalar minhas vendas."),
      },
    },
    {
      highlighted: true,
      name: 'Site Inteligente',
      info: 'A sede digital oficial da sua empresa, estruturada para transmitir credibilidade 24h por dia.',
      label: 'Autoridade Digital',
      features: [
        { text: 'Design Exclusivo e Responsivo' },
        { text: 'Painel de Gestão de Conteúdo (CMS)' },
        { text: 'SEO Técnico Otimizado', tooltip: 'Estrutura pronta para rankear no Google.' },
        { text: 'Animações Premium' },
        { text: 'Arquitetura Escalável' },
        { text: 'Posicionamento global da marca' },
      ],
      btn: {
        text: 'Construir Autoridade',
        // Mensagem focada em Institucional e posicionamento
        href: getWhatsappUrl("Olá, equipe Mavellium! Quero construir a Autoridade Digital da minha empresa com um Site Inteligente de alto padrão."),
      },
    },
    {
      name: 'Automação & IA',
      info: 'Agentes autônomos impulsionados por Inteligência Artificial para operar seu negócio.',
      label: 'Operação 24/7',
      features: [
        { text: 'Agente Comercial 24/7' },
        { text: 'Integração via WhatsApp/Site' },
        { text: 'Qualificação de Leads com IA' },
        { text: 'Processamento de Dados Contábeis' },
        { text: 'Redução de Custos Operacionais', tooltip: 'Automatiza tarefas que consumiriam horas da sua equipe.' },
        { text: 'Atendimento instantâneo' },
      ],
      btn: {
        text: 'Automatizar Operação',
        // Mensagem focada em eficiência e Inteligência Artificial
        href: getWhatsappUrl("Olá! Vi no site sobre as soluções de Automação e Inteligência Artificial e gostaria de entender como aplicar na minha operação."),
      },
    },
  ];

  const fitecLeads = await fetchFitecLeads();

  return (
    <>
      <Header
        logo={"/logo-mavellium-header.svg"}
        logoAlt={"Mavellium - Tecnologia e Inovação"}
        links={[
          { name: "Início", href: "/" },
          { name: "Quem Somos", href: "/quem-somos" },
          { name: "Soluções", href: "/solucoes" },
          { name: "Cases", href: "/cases" },
          { name: "Metodologia", href: "/#metodologia" },
          { name: "Blog", href: "/blog" },
          { name: "Docs", href: "/docs" },
          { name: "Eventos", href: "/eventos" },
        ]}
        ctaLink={getWhatsappUrl("Olá! Estava navegando no site da Mavellium e gostaria de falar com um especialista.")}
        ctaText={"Falar com Especialista"}
      />
      <Hero />
      <Pricing />
      <div id="metodologia">
        <Carousel
          slides={slidesMetodologia}
          options={{ loop: false, align: "start" }}
          title="Nossa Metodologia"
          description="Transparência e previsibilidade. Você nunca fica no escuro: nosso processo de ponta a ponta é dividido em 5 passos claros."
        />
      </div>
      <SelectCards />
      <QuemSomosJanus />
      <Benefits />
      <ManifestoJanus />
      <SolucoesJanus />
      <GalleryGridBlock />
      <PricingSection
        plans={PLANS}
        heading="Modelos de Projeto"
        description="Desenhados cirurgicamente para a realidade do seu negócio. Do planejamento estratégico ao código final, sem terceirização cega."
      />
      <CtaFinalJanus />
      <HoverPreview />
      <FaqJanus />
      <Gallery4  {...blogData}
        cta={{
          label: "Acessar Todos os Artigos",
          href: "/blog",
        }}
      />
      {/* <ZoomParallax
        title="Meu Título Dinâmico"
        titleClassName="text-4xl md:text-7xl font-black text-white drop-shadow-lg"
        images={images} /> */}
      {/* <RadialOrbitalTimeline
        title="Minha Timeline Interativa"
        description="Uma jornada visual através dos principais marcos do projeto, com conexões dinâmicas e energia pulsante"
        timelineData={timelineData} /> */}
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
