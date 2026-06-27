import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Termos de Serviço | Mavellium",
  description:
    "Termos de Serviço da Mavellium LTDA: condições de uso do site, propriedade intelectual e regras gerais para contratação de serviços.",
  alternates: { canonical: "https://mavellium.com.br/terms" },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://mavellium.com.br" },
    { "@type": "ListItem", position: 2, name: "Termos de Serviço", item: "https://mavellium.com.br/terms" },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header
        lightBg
        logo="/logo-mavellium-header.svg"
        logoAlt="Mavellium"
        links={NAV_LINKS}
        ctaLink={getWhatsappUrl("Olá! Tenho uma dúvida sobre os Termos de Serviço da Mavellium.")}
        ctaText="Falar com Especialista"
      />

      <main className="bg-white text-zinc-900">
        <nav className="pt-28 pb-4 px-6 border-b border-zinc-200" aria-label="Breadcrumb">
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-zinc-800 transition-colors">Início</Link>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-[#00D26A]">Termos de Serviço</span>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4">
            Termos de Serviço
          </h1>
          <p className="text-sm text-zinc-400 font-light mb-10">Última atualização: 26 de junho de 2026</p>

          <div className="space-y-8 text-zinc-600 font-light leading-relaxed text-base">
            <p>
              Estes Termos de Serviço regem o uso do site{" "}
              <span className="font-medium text-zinc-800">mavellium.com.br</span>, de propriedade da{" "}
              <strong className="font-semibold text-zinc-800">Mavellium LTDA</strong> (CNPJ 64.117.742/0001-84),
              com sede em Garça, SP. Ao acessar este site, você concorda com os termos descritos abaixo.
            </p>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">1. Uso do site</h2>
              <p>
                O conteúdo deste site tem caráter informativo e institucional. É proibida a reprodução,
                distribuição ou utilização comercial de textos, imagens ou código deste site sem autorização
                prévia por escrito da Mavellium.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">2. Propriedade intelectual</h2>
              <p>
                Marcas, logotipos, layouts, textos e demais elementos visuais e técnicos deste site são de
                propriedade da Mavellium ou de seus licenciantes, protegidos pela legislação brasileira de
                propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">3. Contratação de serviços</h2>
              <p>
                As informações sobre serviços, prazos e valores apresentadas neste site têm caráter geral.
                Condições comerciais específicas (escopo, prazo, investimento) são formalizadas exclusivamente em
                proposta ou contrato individual entre a Mavellium e o cliente, mediante contato prévio pelos canais
                oficiais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">4. Links externos</h2>
              <p>
                Este site pode conter links para sites de terceiros. A Mavellium não se responsabiliza pelo
                conteúdo, políticas de privacidade ou práticas desses sites externos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">5. Limitação de responsabilidade</h2>
              <p>
                Empregamos esforços razoáveis para manter as informações deste site atualizadas e precisas, mas não
                garantimos a ausência total de erros ou interrupções de disponibilidade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">6. Alterações</h2>
              <p>
                Estes Termos podem ser atualizados periodicamente. A versão vigente é sempre a publicada nesta
                página.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">7. Contato</h2>
              <p>
                Dúvidas sobre estes Termos podem ser enviadas para{" "}
                <a href="mailto:contato@mavellium.com.br" className="text-[#00b35a] font-medium hover:underline">
                  contato@mavellium.com.br
                </a>{" "}
                ou pelo WhatsApp +55 14 99177-9502.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
