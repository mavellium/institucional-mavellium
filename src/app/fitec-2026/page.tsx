import type { Metadata } from "next";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl } from "../../lib/constants";
import { fetchFitecLeads } from "@/src/lib/fitec-api";
import { FitecGrid } from "./fitecGrid";

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

          {/* Renderiza o Client Component interativo aqui */}
          <FitecGrid leads={leads} />
        </div>
      </main>

      <Footer />
    </>
  );
}