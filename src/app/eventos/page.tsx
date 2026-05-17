import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CalendarDays, MapPin } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Eventos | Mavellium",
  description:
    "Eventos em que a Mavellium participa ou participou como expositora: feiras de tecnologia, demos do Janus CMS e encontros com o ecossistema de inovação.",
  alternates: {
    canonical: "https://mavellium.com.br/eventos",
  },
  openGraph: {
    type: "website",
    title: "Eventos Mavellium",
    description:
      "Feiras e eventos em que a Mavellium atua como expositora, demonstrando o Janus CMS e arquitetura GEO.",
    url: "https://mavellium.com.br/eventos",
  },
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Eventos Mavellium",
  url: "https://mavellium.com.br/eventos",
  description:
    "Página central de eventos em que a Mavellium atua como expositora ou participante.",
  publisher: {
    "@type": "Organization",
    name: "Mavellium",
    url: "https://mavellium.com.br",
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Lista de eventos Mavellium",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "FITEC 2026 — Feira de Inovação e Tecnologia",
        url: "https://mavellium.com.br/eventos/fitec-2026",
        description:
          "Mavellium participou como expositora demonstrando o Janus CMS e a arquitetura Next.js SSG para GEO.",
      },
    ],
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
      name: "Eventos",
      item: "https://mavellium.com.br/eventos",
    },
  ],
};

const EVENTS = [
  {
    slug: "fitec-2026",
    name: "FITEC 2026 — Feira de Inovação e Tecnologia",
    date: "14/05 e 15/05",
    location: "Garça, São Paulo",
    description:
      "Mavellium participou como expositora oficial apresentando o lançamento do Janus CMS headless e a arquitetura Next.js SSG otimizada para GEO (Generative Engine Optimization). Visitantes interagiram ao vivo com o sistema, que demonstrou integração nativa com Google Analytics 4 e Microsoft Clarity.",
    tags: ["Janus CMS", "GEO", "Next.js SSG", "GA4"],
  },
];

export default function EventosPage() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Vi a página de eventos da Mavellium e quero saber mais sobre as soluções de vocês."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
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
            <span className="text-[#00D26A]">Eventos</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header da página */}
          <header className="mb-10 pb-10 border-b border-zinc-200">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] border border-[#00D26A]/30 rounded-full px-3 py-1 bg-[#00D26A]/5">
                Hub · Eventos
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4 leading-tight">
              Eventos Mavellium
            </h1>

            <p className="text-base text-zinc-600 font-light leading-relaxed max-w-2xl">
              A Mavellium participa de feiras e eventos de tecnologia como expositora, levando
              demonstrações ao vivo do Janus CMS e da arquitetura GEO para desenvolvedores,
              gestores e tomadores de decisão do ecossistema de inovação.
            </p>
          </header>

          {/* Lista de eventos */}
          <ul className="space-y-6" role="list">
            {EVENTS.map((event) => (
              <li key={event.slug}>
                <Link href={`/eventos/${event.slug}`} className="group block">
                  <article className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#00D26A]/40 hover:shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 group-hover:text-[#00D26A] transition-colors mb-3">
                          {event.name}
                        </h2>

                        <div className="flex flex-wrap gap-4 mb-4">
                          <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-light">
                            <CalendarDays className="size-3.5 text-[#00D26A]" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-light">
                            <MapPin className="size-3.5 text-[#00D26A]" />
                            {event.location}
                          </span>
                        </div>

                        <p className="text-sm text-zinc-600 font-light leading-relaxed mb-4">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-500 px-2.5 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 self-center sm:self-start">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#00D26A] group-hover:gap-2 transition-all">
                          Ver evento
                          <ChevronRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
