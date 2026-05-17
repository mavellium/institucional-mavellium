import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Globe, Brain, TrendingUp } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Soluções | Mavellium",
  description:
    "Mavellium oferece três soluções de infraestrutura digital: desenvolvimento de sites e landing pages de alta conversão, otimização para motores generativos (GEO/AIO) e ocupação de espaço em IA para vendas — todas integradas ao Janus CMS com análise via GA4 e Microsoft Clarity.",
  alternates: { canonical: "https://mavellium.com.br/solucoes" },
  openGraph: {
    type: "website",
    title: "Soluções | Mavellium",
    description:
      "Sites de alta conversão, GEO/AIO e estratégia de presença em IA — infraestrutura digital integrada ao Janus CMS com GA4 e Microsoft Clarity.",
    url: "https://mavellium.com.br/solucoes",
  },
};

const service1Schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Desenvolvimento de Sites e Landing Pages de Alta Conversão",
  serviceType: "Desenvolvimento Web",
  provider: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  url: "https://mavellium.com.br/solucoes#sites-landing-pages",
  description:
    "Criação de sites institucionais e landing pages sobre a stack Next.js SSG + Janus CMS, com TTFB abaixo de 100ms via Vercel Edge Network, imagens AVIF via BunnyCDN e HTML pré-renderizado. Análise de dados integrada via Google Analytics 4 e Microsoft Clarity diretamente no painel do Janus CMS.",
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
  },
};

const service2Schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Otimização para Motores Generativos (GEO/AIO)",
  serviceType: "Generative Engine Optimization",
  provider: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  url: "https://mavellium.com.br/solucoes#geo-aio",
  description:
    "Estruturação de código e conteúdo para que LLMs como ChatGPT, Perplexity AI e Google Gemini identifiquem, extraiam e citem o site com precisão. Implementação de HTML semântico, JSON-LD por rota, conteúdo Answer-First e densidade técnica por entidade. O Janus CMS exporta HTML estático e estruturado por padrão — sem depender de renderização client-side.",
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
  },
};

const service3Schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ocupação de Espaço em IA para Vendas",
  serviceType: "Estratégia de Presença em Inteligência Artificial",
  provider: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  url: "https://mavellium.com.br/solucoes#ia-para-vendas",
  description:
    "Estratégia de conteúdo e arquitetura técnica para que a empresa seja citada por modelos de linguagem no momento de decisão de compra do usuário. Inclui mapeamento de entidades semânticas, criação de conteúdo Answer-First por intenção de busca generativa e monitoramento de comportamento pós-citação via GA4 e Microsoft Clarity integrados ao Janus CMS.",
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
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
      name: "Soluções",
      item: "https://mavellium.com.br/solucoes",
    },
  ],
};

export default function SolucoesPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Conheci as soluções da Mavellium e quero entender como vocês podem ajudar o meu negócio."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service1Schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service2Schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service3Schema) }}
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
            <span className="text-[#00D26A]">Soluções</span>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Answer-First */}
          <header className="pb-10 mb-10 border-b border-zinc-200">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] border border-[#00D26A]/30 rounded-full px-3 py-1 bg-[#00D26A]/5">
                Soluções · Infraestrutura Digital
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
              Soluções Mavellium
            </h1>

            <p className="text-base text-zinc-600 font-light leading-relaxed">
              A Mavellium oferece três soluções integradas de infraestrutura digital:
              desenvolvimento de sites e landing pages de alta conversão sobre Next.js SSG,
              otimização para motores generativos (GEO/AIO) e estratégia de ocupação de espaço
              em IA para vendas. Todas as soluções são operadas por meio do{" "}
              <strong className="font-semibold text-zinc-800">Mavellium Janus CMS</strong> —
              plataforma headless que permite que profissionais e gestores sem conhecimento
              técnico gerenciem conteúdo, acompanhem métricas de comportamento via{" "}
              <strong className="font-semibold text-zinc-800">Google Analytics 4</strong> e{" "}
              <strong className="font-semibold text-zinc-800">Microsoft Clarity</strong>, e
              publiquem alterações em tempo real.
            </p>
          </header>

          {/* Solução 1 */}
          <section
            id="sites-landing-pages"
            aria-labelledby="s1-heading"
            className="mb-14 pb-14 border-b border-zinc-100"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="mt-1 shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#00D26A]/10">
                <Globe className="size-5 text-[#00D26A]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Solução 01
                </p>
                <h2
                  id="s1-heading"
                  className="text-2xl font-extrabold tracking-tight text-zinc-900 leading-tight"
                >
                  Desenvolvimento de Sites e Landing Pages de Alta Conversão
                </h2>
              </div>
            </div>

            <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
              Sites e landing pages desenvolvidos pela Mavellium são entregues como HTML
              estático pré-renderizado via Next.js SSG, distribuídos pelo Vercel Edge Network
              com TTFB abaixo de 100ms e imagens convertidas para AVIF via BunnyCDN. O Janus
              CMS permite que qualquer membro da equipe atualize textos, imagens e seções sem
              escrever uma linha de código — e as alterações entram no ar automaticamente, sem
              redeploy manual.
            </p>

            <ul className="space-y-4" role="list">
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Stack de performance: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Next.js SSG + Vercel Edge + BunnyCDN AVIF — Core Web Vitals otimizados por
                    padrão, com TTFB abaixo de 100ms e LCP minimizado por lazy loading nativo do{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">next/image</code>.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Autonomia sem código: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Painel Janus CMS com editor visual por seção e campos tipados (texto, imagem,
                    vídeo, lista, booleano) — gestores operam o conteúdo sem conhecimento técnico
                    avançado.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Analytics integrado: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Google Analytics 4 e Microsoft Clarity acessíveis diretamente no painel do
                    Janus CMS — funis de conversão, mapas de calor e gravações de sessão sem sair
                    da plataforma.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">HTML semântico nativo: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">&lt;article&gt;</code>,{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">&lt;section&gt;</code> e{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">&lt;h1&gt;</code>–
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">&lt;h3&gt;</code>{" "}
                    gerados pela API do Janus — nenhum{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">&lt;div&gt;</code>{" "}
                    de editor WYSIWYG poluindo o DOM.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* Solução 2 */}
          <section
            id="geo-aio"
            aria-labelledby="s2-heading"
            className="mb-14 pb-14 border-b border-zinc-100"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="mt-1 shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#00D26A]/10">
                <Brain className="size-5 text-[#00D26A]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Solução 02
                </p>
                <h2
                  id="s2-heading"
                  className="text-2xl font-extrabold tracking-tight text-zinc-900 leading-tight"
                >
                  Otimização para Motores Generativos (GEO/AIO)
                </h2>
              </div>
            </div>

            <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
              GEO — Generative Engine Optimization — é a prática de estruturar código e
              conteúdo para que modelos de linguagem como ChatGPT, Perplexity AI e Google
              Gemini identifiquem, extraiam e citem seu site com precisão. Diferente do SEO
              tradicional (palavra-chave → ranking), o GEO opera em nível de entidade
              semântica: o modelo precisa entender <em>o que</em> seu site é,{" "}
              <em>quem</em> está por trás dele e <em>o que</em> ele oferece — antes de decidir
              se vai mencioná-lo numa resposta.
            </p>

            <ul className="space-y-4" role="list">
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">JSON-LD por rota: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Schemas{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">Organization</code>,{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">Service</code>,{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">FAQPage</code>,{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">TechArticle</code> e{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">Event</code>{" "}
                    injetados em cada página — o Janus CMS gerencia os dados que alimentam esses
                    schemas.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Conteúdo Answer-First: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Cada página começa com a resposta direta, não com uma introdução — LLMs
                    extraem e citam o primeiro parágrafo. Nenhum conteúdo relevante fica atrás de
                    JavaScript ou abas client-side.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">TTFB abaixo de 100ms: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Crawlers de LLMs como Perplexity operam com timeout de 2–5s; HTML acima de
                    800ms de TTFB pode ser descartado antes de ser lido. O stack Mavellium entrega
                    consistentemente abaixo de 100ms.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Zero JS para conteúdo: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    React Server Components garantem que o conteúdo principal esteja presente no{" "}
                    <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded font-mono">&lt;body&gt;</code>{" "}
                    do primeiro byte — sem depender de execução de JavaScript para ser lido por
                    parsers síncronos de LLMs.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* Solução 3 */}
          <section
            id="ia-para-vendas"
            aria-labelledby="s3-heading"
            className="mb-14"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="mt-1 shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#00D26A]/10">
                <TrendingUp className="size-5 text-[#00D26A]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Solução 03
                </p>
                <h2
                  id="s3-heading"
                  className="text-2xl font-extrabold tracking-tight text-zinc-900 leading-tight"
                >
                  Ocupação de Espaço em IA para Vendas
                </h2>
              </div>
            </div>

            <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
              Quando um potencial cliente pergunta a um modelo de linguagem{" "}
              <em>"qual agência de sites é boa para minha empresa?"</em>, o modelo responde com
              base nas fontes que conseguiu ler, entender e indexar. Ocupar espaço em IA para
              vendas significa ser a resposta — estar presente no momento de decisão de compra
              do usuário, mesmo que ele nunca tenha digitado o nome da sua empresa em um
              buscador.
            </p>

            <ul className="space-y-4" role="list">
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Mapeamento de entidades: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Identificação das entidades semânticas do negócio (serviços, diferenciais,
                    pessoas, casos) e estruturação delas em JSON-LD e conteúdo Answer-First para
                    que LLMs as reconheçam como autoridade no segmento.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Conteúdo de alta densidade técnica: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Casos de estudo, documentação e FAQs estruturadas para serem citadas por LLMs
                    em respostas sobre o segmento — Information Gain que nenhum concorrente
                    genérico oferece.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Monitoramento pós-citação: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    GA4 e Microsoft Clarity integrados ao Janus CMS permitem acompanhar o que os
                    visitantes vindos de IA fazem no site — quais páginas leem, onde abandonam, o
                    que convertem — sem sair do painel.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
                <div>
                  <strong className="text-sm font-semibold text-zinc-800">Infraestrutura de longo prazo: </strong>
                  <span className="text-sm text-zinc-600 font-light">
                    Cada nova página publicada pelo Janus CMS já sai com HTML semântico, JSON-LD e
                    TTFB otimizado — o espaço em IA cresce organicamente com o conteúdo, sem
                    trabalho adicional de otimização.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section
            aria-labelledby="cta-solucoes-heading"
            className="p-8 rounded-md bg-gradient-to-br from-[#00D26A]/[0.05] to-zinc-50 border border-[#00D26A]/20"
          >
            <h2
              id="cta-solucoes-heading"
              className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2"
            >
              Qual solução faz sentido para o seu negócio?
            </h2>
            <p className="text-zinc-600 font-light mb-6 text-sm leading-relaxed">
              As três soluções funcionam de forma integrada — mas cada negócio tem um ponto de
              partida diferente. Fale com nossa equipe para um diagnóstico gratuito da sua
              presença digital.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
            >
              Solicitar Diagnóstico Gratuito
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
