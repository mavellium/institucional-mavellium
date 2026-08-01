// Reposicionamento GEO/AEO (doc/reposicionamento.md item 1.3 + seção 5, posição 6):
// único case mantido no portfólio é a Tegbe. Não há ainda dado numérico real de
// citação/posição em IA para a Tegbe no material da Mavellium (o case dedicado em
// /cases está marcado "Em breve"), então este bloco fica qualitativo — sem métrica
// nem print de resposta de IA inventados. Atualizar com números reais assim que o
// case completo (/cases/tegbe) for publicado.
import Link from "next/link";

export function CaseTegbeSection() {
  return (
    <section
      id="case-tegbe"
      aria-labelledby="case-tegbe-heading"
      className="w-full bg-white py-24 px-6 border-t border-zinc-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-sm bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] text-xs font-bold uppercase tracking-widest">
          Case Tegbe
        </div>

        <h2
          id="case-tegbe-heading"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight"
        >
          Nosso case de GEO em produção
        </h2>

        <p className="text-base md:text-lg text-zinc-600 font-light leading-relaxed mb-4">
          A Tegbe é cliente real da Mavellium e roda hoje sobre a mesma
          arquitetura que vendemos: Next.js SSG + Janus CMS, HTML servido
          desde o primeiro byte e dados estruturados para leitura por
          crawlers de IA — a base técnica da nossa metodologia (Arquitetura
          Semântica).
        </p>

        <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed">
          O acompanhamento de citabilidade da Tegbe em ChatGPT, Gemini,
          Perplexity e Claude está em andamento. Assim que os resultados
          forem mensuráveis, publicamos o case completo — antes/depois e
          respostas reais de IA — nesta página.
        </p>

        <Link
          href="/cases"
          className="inline-flex items-center gap-2 mt-8 text-sm font-bold uppercase tracking-widest text-[#00D26A] hover:gap-3 transition-all"
        >
          Ver cases da Mavellium
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
