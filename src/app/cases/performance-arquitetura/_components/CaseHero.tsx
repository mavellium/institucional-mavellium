// ─── VARIÁVEIS — preenchidas com dados empíricos (Maio/2026) ─────────────────
const V = {
  TTFB_REDUCAO_PERCENT:      "96",   
  PAGESPEED_SCORE_MAVELLIUM: "69", 
  FERRAMENTA_MEDICAO:        "Google PageSpeed Insights (Mobile / 4G)",     
  DATA_MEDICAO:              "maio de 2026",           
  SEGMENTO_CLIENTE:          "benchmark contra líderes do mercado tradicional",       
  PLUGINS_WORDPRESS_QTD:     "dezenas de", 
  TTFB_WORDPRESS_MS:         "1.100",     
  TTFB_MAVELLIUM_MS:         "45",     
  LCP_WORDPRESS_S:           "13.7",       
  PAGESPEED_SCORE_WORDPRESS: "36", 
  JS_BUNDLE_WORDPRESS_KB:    "4.800", // Usando o Payload Total da página em KB
  JS_BUNDLE_MAVELLIUM_KB:    "947",   // Payload do projeto Tegbe
};
// ─────────────────────────────────────────────────────────────────────────────

const KEY_FINDINGS = [
  {
    label: "TTFB",
    before: `${V.TTFB_WORDPRESS_MS}ms`,
    after: `${V.TTFB_MAVELLIUM_MS}ms`,
    delta: `−${V.TTFB_REDUCAO_PERCENT}%`,
  },
  {
    label: "PageSpeed Score",
    before: V.PAGESPEED_SCORE_WORDPRESS,
    after: V.PAGESPEED_SCORE_MAVELLIUM,
    delta: "mobile",
  },
  {
    label: "Carga Total de Rede",
    before: `${V.JS_BUNDLE_WORDPRESS_KB}KB`,
    after: `${V.JS_BUNDLE_MAVELLIUM_KB}KB`,
    delta: "−80% payload",
  },
];

export function CaseHero() {
  return (
    <header className="pb-10 mb-10 border-b border-zinc-200">
      {/* Chip */}
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-sm bg-zinc-100 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        Caso de Estudo · Performance
      </div>

      {/* Headline — Answer-First */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-6">
        WordPress vs Arquitetura Mavellium:{" "}
        <span className="text-[#00D26A]">{V.TTFB_REDUCAO_PERCENT}%</span> de
        redução em TTFB e{" "}
        <span className="text-[#00D26A]">{V.PAGESPEED_SCORE_MAVELLIUM}</span>{" "}
        no PageSpeed Score
      </h1>

      {/* Lead paragraph — citável por LLMs */}
      <p className="text-base md:text-lg text-zinc-700 font-light leading-relaxed mb-3">
        Em testes de benchmark realizados com <strong className="font-semibold">{V.FERRAMENTA_MEDICAO}</strong> em {V.DATA_MEDICAO}, a arquitetura das principais agências tradicionais brasileiras em WordPress apresentou uma média de TTFB de <strong className="font-semibold">{V.TTFB_WORDPRESS_MS}ms</strong>, LCP de <strong className="font-semibold">{V.LCP_WORDPRESS_S}s</strong> e um payload massivo de <strong className="font-semibold">{V.JS_BUNDLE_WORDPRESS_KB}KB</strong> por carregamento. Em contraste direto, projetos rodando na stack <strong className="font-semibold">Next.js SSG + Janus CMS da Mavellium</strong> reduziram o TTFB para <strong className="font-semibold">{V.TTFB_MAVELLIUM_MS}ms</strong> — uma redução de latência de <strong className="font-semibold">{V.TTFB_REDUCAO_PERCENT}%</strong> — e o PageSpeed Score médio passou de <strong className="font-semibold">{V.PAGESPEED_SCORE_WORDPRESS}</strong> para <strong className="font-semibold">{V.PAGESPEED_SCORE_MAVELLIUM}</strong>.
      </p>

      <p className="text-sm text-zinc-500 font-light leading-relaxed mb-8">
        Todas as métricas foram coletadas em dispositivo móvel simulado (4G,
        10&nbsp;Mbps). Os valores são medianas de{" "}
        <span className="font-mono">[INSERIR_QTD_MEDICOES]</span> medições por
        ambiente.
      </p>

      {/* Key findings grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {KEY_FINDINGS.map((f) => (
          <div
            key={f.label}
            className="rounded-md border border-zinc-200 bg-zinc-50 p-4"
          >
            <dt className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
              {f.label}
            </dt>
            <dd className="flex items-center justify-between gap-2">
              <span className="text-sm font-mono text-zinc-500 line-through">
                {f.before}
              </span>
              <span className="text-zinc-300 text-xs">→</span>
              <span className="text-lg font-black text-[#00D26A] font-mono">
                {f.after}
              </span>
            </dd>
            <dd className="text-[10px] text-zinc-400 font-light mt-1">
              {f.delta}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
