import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { getWhatsappUrl, NAV_LINKS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade | Mavellium",
  description:
    "Política de Privacidade da Mavellium LTDA: quais dados coletamos, como usamos, com quem compartilhamos e como exercer seus direitos sob a LGPD.",
  alternates: { canonical: "https://mavellium.com.br/privacy" },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://mavellium.com.br" },
    { "@type": "ListItem", position: 2, name: "Política de Privacidade", item: "https://mavellium.com.br/privacy" },
  ],
};

export default function PrivacyPage() {
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
        ctaLink={getWhatsappUrl("Olá! Tenho uma dúvida sobre a Política de Privacidade da Mavellium.")}
        ctaText="Falar com Especialista"
      />

      <main className="bg-white text-zinc-900">
        <nav className="pt-28 pb-4 px-6 border-b border-zinc-200" aria-label="Breadcrumb">
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-zinc-800 transition-colors">Início</Link>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-[#00D26A]">Política de Privacidade</span>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 py-12 prose-zinc">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-sm text-zinc-400 font-light mb-10">Última atualização: 26 de junho de 2026</p>

          <div className="space-y-8 text-zinc-600 font-light leading-relaxed text-base">
            <p>
              A <strong className="font-semibold text-zinc-800">Mavellium LTDA</strong> (CNPJ 64.117.742/0001-84),
              com sede em Garça, SP, respeita a privacidade dos visitantes e clientes que interagem com este site e
              com nossos canais de atendimento. Esta política descreve, em conformidade com a Lei Geral de Proteção
              de Dados (Lei nº 13.709/2018 — LGPD), quais dados coletamos, como os utilizamos e quais direitos você
              possui sobre eles.
            </p>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">1. Dados que coletamos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dados de contato informados voluntariamente em formulários (nome, e-mail, telefone/WhatsApp);</li>
                <li>Dados de navegação coletados automaticamente via cookies e ferramentas de analytics (Google Analytics 4, Microsoft Clarity, PostHog), como páginas visitadas, tempo de permanência e origem do acesso;</li>
                <li>Dados enviados ao iniciar uma conversa via WhatsApp ou e-mail.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">2. Como utilizamos os dados</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Para responder a solicitações de contato e orçamento;</li>
                <li>Para melhorar a experiência de navegação e o desempenho do site;</li>
                <li>Para análises estatísticas agregadas sobre o uso do site;</li>
                <li>Para cumprir obrigações legais ou regulatórias, quando aplicável.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">3. Compartilhamento de dados</h2>
              <p>
                Não vendemos dados pessoais a terceiros. Dados de navegação podem ser processados por provedores de
                analytics (Google, Microsoft, PostHog) sob seus respectivos termos de privacidade, exclusivamente
                para fins estatísticos e de melhoria do site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">4. Seus direitos (LGPD)</h2>
              <p>Você pode, a qualquer momento, solicitar:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmação da existência de tratamento de dados;</li>
                <li>Acesso, correção ou exclusão dos seus dados;</li>
                <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
                <li>Revogação do consentimento dado anteriormente.</li>
              </ul>
              <p className="mt-3">
                Para exercer qualquer um desses direitos, envie um e-mail para{" "}
                <a href="mailto:contato@mavellium.com.br" className="text-[#00b35a] font-medium hover:underline">
                  contato@mavellium.com.br
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">5. Cookies</h2>
              <p>
                Utilizamos cookies para fins de funcionamento do site e de análise de audiência. Você pode desativar
                cookies diretamente nas configurações do seu navegador, o que pode afetar algumas funcionalidades.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-zinc-900 mt-10 mb-3">6. Contato</h2>
              <p>
                Dúvidas sobre esta política podem ser enviadas para{" "}
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
