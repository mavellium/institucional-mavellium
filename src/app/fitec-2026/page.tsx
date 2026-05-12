import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl } from "../../lib/constants";
import { fetchFitecLeads } from "@/src/lib/fitec-api";

export const metadata: Metadata = {
  title: "Fitec 2026 | Mavellium",
  description: "Conheça as pessoas e conexões da feira de tecnologia FITEC 2026.",
};

const NAV_LINKS = [
  { name: "Início", href: "/" },
  { name: "Quem Somos", href: "/#quem-somos" },
  { name: "Soluções", href: "/#solucoes" },
  { name: "Metodologia", href: "/#metodologia" },
  { name: "Blog", href: "/blog" },
  { name: "FITEC - 2026", href: "/fitec-2026" },
];

export default async function FitecPage() {
  const leads = await fetchFitecLeads();

  const whatsappMsg = getWhatsappUrl(
    "Olá! Gostaria de falar sobre as soluções apresentadas na FITEC 2026."
  );

  return (
    <>
      <Header
        lightBg
        logo="/logo-mavellium-header.svg"
        logoAlt="Mavellium"
        links={NAV_LINKS}
        ctaLink={whatsappMsg}
        ctaText="Falar com Especialista"
      />

      <main className="min-h-screen bg-zinc-50 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center rounded-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/20 mb-6">
              Janus CMS
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-4">
              Conexões da FITEC 2026
            </h1>
            <p className="text-lg text-zinc-600 font-light">
              Nossa galeria de contatos capturados durante a feira de tecnologia. 
              Conteúdo gerenciado e servido via Janus CMS.
            </p>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-300 rounded-md">
              <p className="text-zinc-500 font-light">Nenhum dado encontrado no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {leads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="group relative flex flex-col bg-white rounded-md overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={lead.image}
                      alt={lead.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 border-t border-zinc-100">
                    <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wide line-clamp-1">
                      {lead.name}
                    </h3>
                    {lead.role && (
                      <p className="text-xs text-zinc-500 mt-1 font-light line-clamp-1">
                        {lead.role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}