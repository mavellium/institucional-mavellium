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
  "@type": "ProfessionalService",
  name: "Mavellium",
  url: "https://mavellium.com.br",
  logo: "https://mavellium.com.br/logo.png",
  description: "Desenvolvimento de sites e landing pages com arquitetura otimizada para modelos de IA, RAG e motores de busca semânticos.",
  telephone: "+55-14-99177-9502",
  email: "contato@mavellium.com.br",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.instagram.com/mavellium/",
    "https://www.linkedin.com/company/mavellium",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Search Engine Optimization",
    "Structured Data",
    "Large Language Models",
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