import type { Metadata } from "next";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { GeoHero } from "./_components/GeoHero";
import { GeoProblems } from "./_components/GeoProblems";
import { GeoSolution } from "./_components/GeoSolution";
import { GeoFaq } from "./_components/GeoFaq";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "GEO — Generative Engine Optimization | Mavellium",
  description:
    "GEO é a prática de estruturar conteúdo para ser lido e citado por LLMs como ChatGPT, Perplexity e Gemini. Entenda os pilares, por que WordPress falha e como o Janus CMS resolve.",
  alternates: { canonical: "https://mavellium.com.br/geo" },
  openGraph: {
    type: "website",
    title: "GEO — Generative Engine Optimization | Mavellium",
    description:
      "GEO é a prática de estruturar conteúdo para ser lido e citado por LLMs como ChatGPT, Perplexity e Gemini.",
    url: "https://mavellium.com.br/geo",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  provider: {
    "@id": "https://mavellium.com.br/#organization",
  },
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é GEO — Generative Engine Optimization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GEO (Generative Engine Optimization) é a prática de estruturar conteúdo digital para que modelos de linguagem de grande escala (LLMs) como ChatGPT, Perplexity e Gemini consigam identificar, extrair e citar esse conteúdo com precisão e autoridade. Diferente do SEO tradicional, o GEO não prioriza palavras-chave para algoritmos de ranking; prioriza clareza semântica, densidade técnica e marcação estruturada para máquinas generativas.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é a diferença entre GEO e SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO (Search Engine Optimization) é otimizado para algoritmos de indexação como o Google Crawl — foca em palavras-chave, backlinks e autoridade de domínio. GEO é otimizado para modelos de linguagem generativa — foca em formato Answer-First (resposta direta no início de cada seção), HTML semântico limpo, Schema Markup (JSON-LD) e tempo de resposta do servidor abaixo de 100ms. Um site pode ter SEO excelente e GEO fraco se o conteúdo for ambíguo ou o HTML for poluído.",
      },
    },
    {
      "@type": "Question",
      name: "Quais são os quatro pilares do GEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Os quatro pilares do GEO são: (1) HTML Semântico — uso correto de tags como article, section, h1-h3, abbr e dfn para que o LLM compreenda hierarquia e contexto; (2) Schema Markup (JSON-LD) — mapeamento de entidades como Organization, FAQPage, BreadcrumbList e HowTo que permite ao LLM identificar o tipo de conteúdo sem ambiguidade; (3) Formato Answer-First — cada seção começa com a resposta direta à pergunta implícita, eliminando o delay semântico que faz LLMs descartarem conteúdo; (4) Densidade Técnica — conteúdo com profundidade real, números e evidências concretas, que LLMs selecionam preferencialmente para citação.",
      },
    },
    {
      "@type": "Question",
      name: "Por que o WordPress falha para GEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordPress falha no GEO por quatro razões técnicas estruturais: (1) Bloat de plugins — cada plugin adiciona requisições HTTP, resultando em TTFB médio acima de 3 segundos; LLMs como o Perplexity têm timeout entre 2-5s e fazem fallback para fontes mais rápidas; (2) HTML sujo gerado por editores WYSIWYG — o Gutenberg e construtores como Elementor geram divs aninhadas, estilos inline e atributos desnecessários que degradam a parsabilidade semântica do LLM; (3) JavaScript excessivo — themes WordPress carregam em média 847kb de JavaScript; conteúdo que só existe após execução de JS client-side pode ser invisível para parsers síncronos de LLMs; (4) Arquitetura monolítica — impossibilita cache granular por rota ou CDN por componente, significando que cada requisição reconstrói o HTML no servidor PHP.",
      },
    },
    {
      "@type": "Question",
      name: "O que é um CMS headless e por que é superior para GEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um CMS headless separa a camada de conteúdo (backend/API) da camada de apresentação (frontend). Para o GEO isso é decisivo porque: o frontend pode ser construído em Next.js com SSG (Static Site Generation) ou SSR (Server-Side Rendering), entregando HTML completo na primeira resposta em menos de 100ms; o conteúdo é armazenado como dados estruturados puros, sem lógica de apresentação embutida; cada rota pode ter seu próprio Schema Markup (JSON-LD) gerado dinamicamente; e o CDN pode fazer cache de cada página individualmente, garantindo latência global mínima.",
      },
    },
    {
      "@type": "Question",
      name: "Como o Janus CMS da Mavellium foi projetado para GEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Janus CMS é o sistema de gestão de conteúdo headless desenvolvido pela Mavellium especificamente para a stack Next.js + React. Para GEO, o Janus oferece: estrutura de dados tipada que mapeia diretamente para JSON-LD sem transformação manual; geração automática de Schema Markup por tipo de rota (artigo, FAQ, produto, organização); API com resposta média abaixo de 50ms, compatível com o ISR (Incremental Static Regeneration) do Next.js; HTML limpo e semântico gerado no servidor, sem scripts de terceiros ou estilos inline; e controle granular de cabeçalhos HTTP para cache máximo no Vercel Edge Network.",
      },
    },
    {
      "@type": "Question",
      name: "Quais Core Web Vitals são relevantes para GEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para GEO, os três indicadores mais relevantes são: (1) Time to First Byte (TTFB) — abaixo de 200ms garante que LLMs recebam o conteúdo antes do timeout; a Mavellium alcança menos de 100ms com Next.js SSG + Vercel Edge; (2) Largest Contentful Paint (LCP) — abaixo de 1.2s indica que o conteúdo principal está disponível rapidamente para parsing; (3) Cumulative Layout Shift (CLS) — próximo de zero garante que o HTML final seja idêntico ao HTML inicial, evitando discrepâncias de conteúdo entre o que o LLM lê e o que o usuário vê.",
      },
    },
    {
      "@type": "Question",
      name: "Como implementar GEO no meu site hoje?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para implementar GEO imediatamente, siga estas etapas: (1) Auditoria de HTML — remova divs desnecessárias e substitua por tags semânticas como article, section e aside; (2) Implante Schema Markup JSON-LD — comece com Organization, FAQPage e BreadcrumbList nas rotas principais; (3) Adote o formato Answer-First — reescreva cada seção para que o primeiro parágrafo já responda à pergunta principal; (4) Meça o TTFB — use Vercel Analytics ou PageSpeed Insights; se estiver acima de 300ms, migre para SSG ou ISR; (5) Considere migrar para Next.js — o retorno sobre GEO é mensurável em semanas porque LLMs indexam conteúdo continuamente, não apenas durante crawls programados.",
      },
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@id": "https://mavellium.com.br/#organization",
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
      name: "GEO — Generative Engine Optimization",
      item: "https://mavellium.com.br/geo",
    },
  ],
};

export default function GeoPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Quero implementar GEO no meu site com Next.js e Janus CMS."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header
        logo="/logo-mavellium-header.svg"
        logoAlt="Mavellium"
        links={NAV_LINKS}
        ctaLink={whatsappUrl}
        ctaText="Falar com Especialista"
      />

      <main className="bg-[#050505] pt-24">
        <GeoHero />
        <GeoProblems />
        <GeoSolution />
        <GeoFaq />
      </main>

      <Footer />
    </>
  );
}
