import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HashScroller } from "../components/HashScroller";

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
  title: "Mavellium | Tecnologia, Sites e Inteligência Artificial",
  description: "Desenvolvimento de soluções inteligentes, sites institucionais de alta conversão e automação com Inteligência Artificial para escalar o seu negócio no ambiente digital.",
  keywords: ["Mavellium", "Inteligência Artificial", "Criação de Sites", "Automação", "Landing Pages", "Tecnologia B2B"],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://mavellium.com.br/#organization",
      name: "Mavellium",
      legalName: "Mavellium LTDA",
      taxID: "64.117.742/0001-84",
      url: "https://mavellium.com.br",
      logo: {
        "@type": "ImageObject",
        url: "https://mavellium.com.br/logo-mavellium-header.svg",
        caption: "Mavellium",
      },
      description:
        "A Mavellium resolve três problemas de negócio: invisibilidade digital de empresas B2B, baixa conversão de visitantes em clientes e operações comerciais limitadas ao horário de trabalho. Desenvolvemos sites institucionais, landing pages de alta conversão e agentes de IA que operam 24 horas para gerar resultados reais.",
      telephone: "+55-14-98177-9502",
      email: "contato@mavellium.com.br",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Garça",
        addressRegion: "SP",
        addressCountry: "BR",
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
      ],
      areaServed: "BR",
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
      <body className={`min-h-full flex flex-col ${satoshi.variable} font-satoshi bg-[#050505] text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <HashScroller />
        {children}
      </body>
    </html>
  );
}