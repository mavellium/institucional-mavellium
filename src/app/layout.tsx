import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { HashScroller } from "../components/HashScroller";
import { JanusScriptManager } from "../components/cms/JanusScriptManager";
import { PostHogProvider } from "../components/PostHogProvider";

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
  title: "Mavellium | Tecnologia, Sites e Inteligência Artificial",
  description: "Desenvolvimento de soluções inteligentes, sites institucionais de alta conversão e automação com Inteligência Artificial para escalar o seu negócio no ambiente digital.",
  keywords: ["Mavellium", "Inteligência Artificial", "Criação de Sites", "Automação", "Landing Pages", "Tecnologia B2B", "GEO", "Generative Engine Optimization"],
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
        "A Mavellium resolve três problemas de negócio: invisibilidade digital de empresas B2B, baixa conversão de visitantes em clientes e operações comerciais limitadas ao horário de trabalho. Desenvolvemos sites institucionais, landing pages de alta conversão e agentes de IA que operam 24 horas para gerar resultados reais.",
      telephone: "+55-14-99177-9502",
      email: "contato@mavellium.com.br",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "",
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
        "Sites Institucionais de Alta Performance",
        "Landing Pages de Alta Conversão",
        "Agentes de Inteligência Artificial",
        "Automação Comercial",
        "GEO — Generative Engine Optimization",
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
        name: "Soluções Mavellium",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sites & Landing Pages de Alta Performance",
              description:
                "Desenvolvimento de sites institucionais e landing pages com Next.js SSG, TTFB < 100ms, Janus CMS headless e integração com GA4 e Microsoft Clarity.",
              serviceType: "Web Development",
              provider: { "@id": "https://mavellium.com.br/#organization" },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "GEO — Generative Engine Optimization",
              description:
                "Otimização semântica para motores de busca generativos (ChatGPT, Perplexity, Google SGE, Gemini). JSON-LD por rota, conteúdo Answer-First, IAG Score™ e G-SOV (Generative Share of Voice).",
              serviceType: "SEO / GEO / AIO",
              provider: { "@id": "https://mavellium.com.br/#organization" },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Agentes de IA e Automação Comercial",
              description:
                "Agentes autônomos 24/7 para qualificação de leads, atendimento via WhatsApp, processamento de dados contábeis e automação de processos operacionais com redução de custo.",
              serviceType: "AI Automation",
              provider: { "@id": "https://mavellium.com.br/#organization" },
            },
          },
        ],
      },
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
      </body>
    </html>
  );
}