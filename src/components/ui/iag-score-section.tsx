// Reposicionamento GEO/AEO (doc/reposicionamento.md item 2.2): eleva o IAG
// Score™ a seção própria e visível na home, em vez de ficar só dentro do
// acordeão de FAQ. Copy reaproveitada da seção "IAG Score™ — a métrica
// rainha" já publicada e validada em src/app/quem-somos/page.tsx — sem dado
// numérico novo. O item correspondente pode continuar também dentro do FAQ
// (o doc pede "subir", não remover de lá).
const WEIGHTS = [
  { label: "Presença & Citação em IAs", weight: "25%" },
  { label: "Estrutura Semântica", weight: "20%" },
  { label: "Entidades Reconhecíveis", weight: "15%" },
  { label: "Autoridade Temática", weight: "15%" },
  { label: "Consistência Contextual", weight: "15%" },
  { label: "Performance Técnica", weight: "10%" },
];

export function IagScoreSection() {
  return (
    <section
      id="iag-score"
      aria-labelledby="iag-score-heading"
      className="w-full bg-zinc-50 py-24 px-6 border-t border-zinc-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-sm bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] text-xs font-bold uppercase tracking-widest">
          Nossa Métrica
        </div>

        <h2
          id="iag-score-heading"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight"
        >
          IAG Score™ — a métrica rainha
        </h2>

        <p className="text-base md:text-lg text-zinc-600 font-light leading-relaxed mb-10 max-w-2xl">
          O <strong className="font-semibold text-zinc-800">IAG Score™ (Índice de Autoridade Gerativa)</strong>{" "}
          é o equivalente ao PageRank do Google, mas para LLMs. Um índice de 0
          a 100 que quantifica com que frequência e precisão os grandes
          modelos de linguagem reconhecem, entendem e recomendam uma marca. A
          Mavellium não vende apenas tecnologia — entrega um IAG Score™
          crescente, que se traduz em resultados financeiros mensuráveis para
          C-Level.
        </p>

        <ul className="space-y-3 max-w-md" role="list">
          {WEIGHTS.map(({ label, weight }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="shrink-0 w-12 text-right text-xs font-bold text-[#00D26A]">
                {weight}
              </span>
              <span className="text-sm text-zinc-600 font-light">{label}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm md:text-base text-zinc-500 font-light leading-relaxed max-w-2xl">
          As métricas derivadas —{" "}
          <strong className="font-semibold text-zinc-700">
            GPR (Generative Presence Rate)
          </strong>{" "}
          e{" "}
          <strong className="font-semibold text-zinc-700">
            G-SOV (Generative Share of Voice)
          </strong>{" "}
          — traduzem o índice em impacto financeiro direto: redução de CAC,
          aceleração de pipeline e ocupação do pre-search funnel antes da
          concorrência.
        </p>
      </div>
    </section>
  );
}
