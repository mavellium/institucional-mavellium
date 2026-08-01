// Reposicionamento GEO/AEO (doc/reposicionamento.md item 3.1) — copy mínimo
// literal do doc. Posição: logo após o Manifesto, antes da Metodologia.
const COLUMNS = [
  {
    label: "SEO",
    title: "Search Engine Optimization",
    description: "Foco em ranking e cliques em buscadores tradicionais.",
  },
  {
    label: "AEO",
    title: "Answer Engine Optimization",
    description: "Foco em ser a resposta direta em buscas zero-click.",
  },
  {
    label: "GEO",
    title: "Generative Engine Optimization",
    description:
      "Foco em ser citado e sintetizado por IAs generativas (ChatGPT, Gemini, Perplexity, Claude).",
    highlighted: true,
  },
];

export function SeoAeoGeoComparison() {
  return (
    <section
      id="seo-aeo-geo"
      aria-labelledby="seo-aeo-geo-heading"
      className="w-full bg-white py-24 px-6 border-t border-zinc-100"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          id="seo-aeo-geo-heading"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4 leading-tight text-center"
        >
          SEO x AEO x GEO
        </h2>
        <p className="text-base md:text-lg text-zinc-600 font-light leading-relaxed mb-12 max-w-2xl mx-auto text-center">
          Três camadas de visibilidade digital — a Mavellium é especialista na
          mais recente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((col) => (
            <div
              key={col.label}
              className={`rounded-md border p-8 flex flex-col ${
                col.highlighted
                  ? "border-[#00D26A] bg-[#00D26A]/[0.04] shadow-[0_0_30px_rgba(0,210,106,0.08)]"
                  : "border-zinc-200 bg-zinc-50/50"
              }`}
            >
              <span
                className={`text-3xl font-black tracking-tight mb-2 ${
                  col.highlighted ? "text-[#00D26A]" : "text-zinc-400"
                }`}
              >
                {col.label}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                {col.title}
              </span>
              <p
                className={`text-sm leading-relaxed font-light ${
                  col.highlighted ? "text-zinc-800" : "text-zinc-600"
                }`}
              >
                {col.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
