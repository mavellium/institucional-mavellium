// Reposicionamento GEO/AEO (doc/reposicionamento.md item 3.2, regra
// "nenhum número inventado"): só entram aqui métricas reais já publicadas em
// /cases/performance-arquitetura (src/app/cases/performance-arquitetura/_components/CaseHero.tsx
// e CaseMetrics.tsx). Esse case é um benchmark de arquitetura Mavellium vs
// WordPress — NÃO é específico do cliente Tegbe, por isso está rotulado como
// tal aqui, não como resultado de negócio ou de GEO da Tegbe.
// Números de negócio pedidos no doc (empresas diagnosticadas, prompts
// analisados, prazo do diagnóstico, resultado de IA do case Tegbe) ficam
// fora deste componente até existir dado real — nunca como placeholder
// visível no HTML público.
const METRICS = [
  {
    label: "Redução de TTFB",
    value: "96%",
    detail: "1.100ms → 45ms",
  },
  {
    label: "PageSpeed Score (mobile)",
    value: "36 → 69",
    detail: "Google PageSpeed Insights",
  },
  {
    label: "Redução de payload",
    value: "80%",
    detail: "carga total de rede",
  },
];

export function MetricsCounters() {
  return (
    <section
      aria-labelledby="metrics-heading"
      className="w-full bg-[#050505] py-16 px-6 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <h2 id="metrics-heading" className="sr-only">
          Métricas de performance da arquitetura Mavellium
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-md border border-white/10 bg-zinc-950 p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-black text-[#00D26A] font-mono mb-2">
                {m.value}
              </p>
              <p className="text-sm text-white font-semibold mb-1">
                {m.label}
              </p>
              <p className="text-[11px] text-zinc-500 font-light">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-zinc-600 font-light mt-6">
          Benchmark de arquitetura Next.js SSG + Janus CMS vs. WordPress
          tradicional. Google PageSpeed Insights (Mobile/4G), maio de 2026.
        </p>
      </div>
    </section>
  );
}
