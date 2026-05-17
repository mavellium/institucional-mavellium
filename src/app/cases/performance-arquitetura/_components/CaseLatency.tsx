// ─── VARIÁVEIS — TTFB, Bundle e Requisições ──────────────────────────────────
const V = {
  TTFB_WORDPRESS_MS:          "1.100",
  TTFB_MAVELLIUM_MS:          "45",
  TTFB_REDUCAO_PERCENT:       "96",
  JS_BUNDLE_WORDPRESS_KB:     "4.800",
  JS_BUNDLE_MAVELLIUM_KB:     "947",
  JS_REDUCAO_PERCENT:         "80",
  HTTP_REQUESTS_WORDPRESS:    "114",
  HTTP_REQUESTS_MAVELLIUM:    "21",
  REQUESTS_REDUCAO_PERCENT:   "81",
  LARGURA_BARRA_MAVELLIUM:    "4%",
};
// ─────────────────────────────────────────────────────────────────────────────
export function CaseLatency() {
  return (
    <section aria-labelledby="latency-heading" className="mb-12">
      <h2
        id="latency-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        TTFB e bundle JavaScript
      </h2>

      {/* Seção 1 — TTFB */}
      <section aria-labelledby="ttfb-heading" className="mb-10">
        <h3 id="ttfb-heading" className="text-lg font-bold text-zinc-900 mb-3">
          Time to First Byte (TTFB)
        </h3>

        {/* Answer-First */}
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-6">
          TTFB de{" "}
          <strong className="font-semibold">{V.TTFB_WORDPRESS_MS}ms</strong> →{" "}
          <strong className="font-semibold text-[#00D26A]">{V.TTFB_MAVELLIUM_MS}ms</strong> (
          −{V.TTFB_REDUCAO_PERCENT}%) é a métrica com maior impacto em GEO. Crawlers de LLMs como
          Perplexity AI e você.com operam com timeout entre 2s e 5s — qualquer TTFB acima de 800ms
          aumenta o risco de descarte da fonte antes que o conteúdo seja extraído.
        </p>

        {/* Bar chart */}
        <div
          className="space-y-3 mb-4 p-4 bg-zinc-50 rounded-md border border-zinc-200"
          role="img"
          aria-label={`Comparativo de TTFB: WordPress ${V.TTFB_WORDPRESS_MS}ms versus Mavellium ${V.TTFB_MAVELLIUM_MS}ms`}
        >
          {/* WordPress bar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                WordPress
              </span>
              <span className="text-xs font-mono text-zinc-600">{V.TTFB_WORDPRESS_MS}ms</span>
            </div>
            <div className="h-6 w-full bg-zinc-200 rounded-sm overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-sm"
                style={{ width: "100%" }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Mavellium bar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Mavellium
              </span>
              <span className="text-xs font-mono font-bold text-[#00D26A]">
                {V.TTFB_MAVELLIUM_MS}ms
              </span>
            </div>
            <div className="h-6 w-full bg-zinc-200 rounded-sm overflow-hidden">
              <div
                className="h-full bg-[#00D26A] rounded-sm"
                style={{ width: V.LARGURA_BARRA_MAVELLIUM }}
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="text-[10px] text-zinc-400 font-light pt-1">
            Barras proporcionais ao TTFB mediano. Eixo: 0 → {V.TTFB_WORDPRESS_MS}ms.
          </p>
        </div>

        <p className="text-xs text-zinc-500 font-light leading-relaxed">
          A diferença é explicada pela arquitetura: WordPress reconstrói HTML a cada requisição via
          PHP. A stack Mavellium (Next.js SSG + Vercel Edge Network) serve HTML pré-renderizado
          diretamente do nó de borda mais próximo — sem processamento server-side por request.
        </p>
      </section>

      {/* Seção 2 — Bundle JS */}
      <section aria-labelledby="bundle-heading">
        <h3 id="bundle-heading" className="text-lg font-bold text-zinc-900 mb-3">
          JavaScript transferido e requisições HTTP
        </h3>

        {/* Answer-First */}
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-5">
          JavaScript em excesso impacta GEO porque conteúdo renderizado client-side não está
          presente no HTML do primeiro byte. Parsers síncronos de LLMs leem o HTML inicial —
          conteúdo dependente de{" "}
          <strong className="font-semibold">{V.JS_BUNDLE_WORDPRESS_KB}KB</strong> de JavaScript
          pode ser simplesmente ignorado.
        </p>

        <div className="overflow-x-auto rounded-md border border-zinc-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-48">
                  Recurso
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  WordPress
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Mavellium
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Redução
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100 bg-white">
                <td className="px-4 py-3 font-semibold text-zinc-700">JS total transferido</td>
                <td className="px-4 py-3 font-mono text-zinc-600">
                  {V.JS_BUNDLE_WORDPRESS_KB}&nbsp;KB
                </td>
                <td className="px-4 py-3 font-mono font-bold text-[#00D26A]">
                  {V.JS_BUNDLE_MAVELLIUM_KB}&nbsp;KB
                </td>
                <td className="px-4 py-3 font-mono text-zinc-500">
                  −{V.JS_REDUCAO_PERCENT}%
                </td>
              </tr>
              <tr className="border-b border-zinc-100 bg-zinc-50/40">
                <td className="px-4 py-3 font-semibold text-zinc-700">Requisições HTTP</td>
                <td className="px-4 py-3 font-mono text-zinc-600">{V.HTTP_REQUESTS_WORDPRESS}</td>
                <td className="px-4 py-3 font-mono font-bold text-[#00D26A]">
                  {V.HTTP_REQUESTS_MAVELLIUM}
                </td>
                <td className="px-4 py-3 font-mono text-zinc-500">
                  −{V.REQUESTS_REDUCAO_PERCENT}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[10px] text-zinc-400 font-light mt-3">
          JS transferido = total de bytes de scripts (gzip). Requisições HTTP = total de recursos
          carregados no DOMContentLoaded.
        </p>
      </section>
    </section>
  );
}
