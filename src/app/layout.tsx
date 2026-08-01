import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { HashScroller } from "../components/HashScroller";
import { JanusScriptManager } from "../components/cms/JanusScriptManager";
import { PostHogProvider } from "../components/PostHogProvider";
import { WhatsappFloatButton } from "../components/ui/whatsapp-float-button";

// Configuração da fonte Satoshi via next/font/local
const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Black.woff2",
      weight: "900", // Ótimo para os títulos de impacto
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mavellium.com.br"),
  title: "Mavellium | GEO — Visibilidade da sua marca nas respostas de IA",
  description: "A Mavellium é especialista em GEO (Generative Engine Optimization): fazemos sua marca ser encontrada, compreendida e recomendada por ChatGPT, Gemini, Perplexity e Claude. Diagnóstico Raio-X, IAG Score™ e metodologia própria.",
  keywords: ["Mavellium", "GEO", "AEO", "Generative Engine Optimization", "Answer Engine Optimization", "IAG Score", "Visibilidade em IA", "ChatGPT", "Perplexity", "Tecnologia B2B"],
  twitter: {
    card: "summary_large_image",
    site: "@mavellium",
    creator: "@mavellium",
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://mavellium.com.br/#organization",
      name: "Mavellium",
      legalName: "Mavellium LTDA",
      taxID: "64.117.742/0001-84",
      foundingDate: "2022",
      slogan: "Tecnologia, Sites e IA para empresas brasileiras",
      url: "https://mavellium.com.br",
      logo: {
        "@type": "ImageObject",
        url: "https://mavellium.com.br/logo-mavellium-header.svg",
        caption: "Mavellium",
      },
      image: "https://mavellium.com.br/opengraph-image.png",
      description:
        "A Mavellium é uma empresa de AI Visibility Infrastructure especializada em GEO (Generative Engine Optimization): estruturamos dados, entidades e conteúdo para que grandes modelos de linguagem (ChatGPT, Gemini, Perplexity, Claude) reconheçam, entendam e recomendem marcas B2B. Metodologia própria em quatro etapas — Raio-X, Arquitetura Semântica, Autoridade Algorítmica e Observabilidade Contínua — medida pelo IAG Score™.",
      telephone: "+55-14-99177-9502",
      email: "contato@mavellium.com.br",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Garça",
        addressRegion: "SP",
        postalCode: "17400-000",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -22.2119,
        longitude: -49.6542,
      },
      sameAs: [
        "https://www.instagram.com/mavellium/",
        "https://www.linkedin.com/company/mavellium",
      ],
      founder: [
        { "@type": "Person", name: "Vinícius Tavares Mota" },
        { "@type": "Person", name: "Luan dos Santos" },
        { "@type": "Person", name: "Márcio Piva Junior" },
      ],
      knowsAbout: [
        "GEO — Generative Engine Optimization",
        "AEO — Answer Engine Optimization",
        "IAG Score™ — Índice de Autoridade Gerativa",
        "Generative Share of Voice (G-SOV)",
        "Metodologia Raio-X de Citabilidade Multi-LLM",
        "Dados Estruturados e Schema Markup (JSON-LD)",
        "Next.js SSG",
        "Janus CMS",
      ],
      areaServed: {
        "@type": "Country",
        name: "Brasil",
        sameAs: "https://www.wikidata.org/wiki/Q155",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Planos de GEO — Mavellium",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Presença",
            description:
              "Para sair da invisibilidade. Diagnóstico + estruturação inicial para a marca começar a aparecer nas respostas de IA.",
            itemOffered: { "@id": "https://mavellium.com.br/#service-geo" },
          },
          {
            "@type": "Offer",
            name: "Autoridade",
            description:
              "Para virar fonte citada. Produção de conteúdo e construção de autoridade para a IA recomendar a marca de forma consistente.",
            itemOffered: { "@id": "https://mavellium.com.br/#service-geo" },
          },
          {
            "@type": "Offer",
            name: "Dominância",
            description:
              "Para liderar a categoria. Operação completa de visibilidade, ocupando o espaço das respostas de IA à frente dos concorrentes.",
            itemOffered: { "@id": "https://mavellium.com.br/#service-geo" },
          },
          {
            "@type": "Offer",
            name: "Enterprise",
            description:
              "Sob consulta. Escopo personalizado para operações multi-marca, multi-região ou com necessidades específicas.",
            itemOffered: { "@id": "https://mavellium.com.br/#service-geo" },
          },
        ],
      },
    },
    {
      "@type": "Service",
      "@id": "https://mavellium.com.br/#service-geo",
      name: "GEO — Generative Engine Optimization",
      description:
        "Otimização semântica para motores de busca generativos (ChatGPT, Perplexity, Google Gemini, Claude). Diagnóstico de citabilidade multi-LLM, dados estruturados (JSON-LD), autoridade algorítmica e observabilidade contínua via IAG Score™ e G-SOV (Generative Share of Voice).",
      serviceType: "GEO / AEO",
      provider: { "@id": "https://mavellium.com.br/#organization" },
      areaServed: { "@type": "Country", name: "Brasil" },
    },
    {
      "@type": "WebSite",
      "@id": "https://mavellium.com.br/#website",
      url: "https://mavellium.com.br",
      name: "Mavellium",
      description: "Tecnologia, Sites e IA para empresas brasileiras.",
      publisher: { "@id": "https://mavellium.com.br/#organization" },
      inLanguage: "pt-BR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://mavellium.com.br/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${satoshi.variable} h-full antialiased scroll-smooth scroll-pt-24`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TNLKRFV3');`,
          }}
        />
        <JanusScriptManager
          siteId="d113005c-7cbb-4881-8a8d-e2f09f45a8ce"
          apiBase="https://januscms.com.br"
        />
      </head>
      <body className={`min-h-full flex flex-col ${satoshi.variable} font-satoshi bg-[#050505] text-white`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TNLKRFV3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <HashScroller />
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <WhatsappFloatButton />
      </body>
    </html>
  );
}