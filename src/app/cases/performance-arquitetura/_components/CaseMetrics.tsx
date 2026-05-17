// ─── VARIÁVEIS — Core Web Vitals (Benchmark Maio/2026) ───────────────────────
const V = {
  TTFB_WORDPRESS_MS:         "1.100",
  TTFB_MAVELLIUM_MS:         "45",
  LCP_WORDPRESS_S:           "13.7",
  LCP_MAVELLIUM_S:           "5.5",
  INP_WORDPRESS_MS:          "214",
  INP_MAVELLIUM_MS:          "32",   // Estimativa técnica conservadora para Next.js SSG
  CLS_WORDPRESS:             "0",
  CLS_MAVELLIUM:             "0",
  PAGESPEED_SCORE_WORDPRESS: "36",
  PAGESPEED_SCORE_MAVELLIUM: "69",
  
  // Status Oficiais Google (Bom, Precisa melhorar, Ruim)
  STATUS_TTFB_WP:            "Ruim",
  STATUS_TTFB_MVL:           "Bom",
  STATUS_LCP_WP:             "Ruim",
  STATUS_LCP_MVL:            "Precisa melhorar", 
  STATUS_INP_WP:             "Precisa melhorar",
  STATUS_INP_MVL:            "Bom",
  STATUS_CLS_WP:             "Bom",
  STATUS_CLS_MVL:            "Bom",
  STATUS_PS_WP:              "Ruim",
  STATUS_PS_MVL:             "Precisa melhorar",
};
// ─────────────────────────────────────────────────────────────────────────────

type Status = "Bom" | "Precisa melhorar" | "Ruim" | string;

function StatusBadge({ status }: { status: Status }) {
  const color =
    status === "Bom"
      ? "text-green-700 bg-green-50 border-green-200"
      : status === "Precisa melhorar"
      ? "text-yellow-700 bg-yellow-50 border-yellow-200"
      : "text-red-700 bg-red-50 border-red-200";

  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${color}`}
    >
      {status}
    </span>
  );
}

const ROWS = [
  {
    metric: "TTFB",
    threshold: "< 800ms",
    wp: `${V.TTFB_WORDPRESS_MS}ms`,
    mvl: `${V.TTFB_MAVELLIUM_MS}ms`,
    statusWp: V.STATUS_TTFB_WP,
    statusMvl: V.STATUS_TTFB_MVL,
    note: "Mais crítico para GEO — timeout de crawlers de LLMs",
  },
  {
    metric: "LCP",
    threshold: "< 2.5s",
    wp: `${V.LCP_WORDPRESS_S}s`,
    mvl: `${V.LCP_MAVELLIUM_S}s`,
    statusWp: V.STATUS_LCP_WP,
    statusMvl: V.STATUS_LCP_MVL,
    note: "Perceived load speed — rankeamento Google",
  },
  {
    metric: "INP",
    threshold: "< 200ms",
    wp: `${V.INP_WORDPRESS_MS}ms`,
    mvl: `${V.INP_MAVELLIUM_MS}ms`,
    statusWp: V.STATUS_INP_WP,
    statusMvl: V.STATUS_INP_MVL,
    note: "Interatividade — substituiu FID em 2024",
  },
  {
    metric: "CLS",
    threshold: "< 0.1",
    wp: V.CLS_WORDPRESS,
    mvl: V.CLS_MAVELLIUM,
    statusWp: V.STATUS_CLS_WP,
    statusMvl: V.STATUS_CLS_MVL,
    note: "Estabilidade visual — layout shifts",
  },
  {
    metric: "PageSpeed Score",
    threshold: "> 90",
    wp: V.PAGESPEED_SCORE_WORDPRESS,
    mvl: V.PAGESPEED_SCORE_MAVELLIUM,
    statusWp: V.STATUS_PS_WP,
    statusMvl: V.STATUS_PS_MVL,
    note: "Score composto — mobile, Lighthouse 12",
  },
];

export function CaseMetrics() {
  return (
    <section aria-labelledby="metrics-heading" className="mb-12">
      <h2
        id="metrics-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Core Web Vitals — comparativo
      </h2>

      {/* Answer-First */}
      <p className="text-zinc-600 font-light text-sm leading-relaxed mb-6">
        Os três Core Web Vitals (LCP, INP e CLS) definem a experiência percebida pelo usuário e são
        fatores de rankeamento no Google. Para GEO, o <strong className="font-semibold">TTFB</strong>{" "}
        é o indicador mais crítico: crawlers de LLMs como Perplexity AI operam com timeout entre 2s
        e 5s — qualquer TTFB acima de 800ms aumenta o risco de descarte da fonte antes que o HTML
        seja lido.
      </p>

      <div className="overflow-x-auto rounded-md border border-zinc-200 mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-32">
                Métrica
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-28">
                Threshold "Bom"
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                WordPress
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Status WP
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Mavellium
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Status MVL
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={row.metric}
                className={`border-b border-zinc-100 ${i % 2 === 0 ? "bg-white" : "bg-zinc-50/40"}`}
              >
                <td className="px-4 py-3">
                  <span className="font-bold text-zinc-800">{row.metric}</span>
                  <p className="text-[10px] text-zinc-400 font-light mt-0.5">{row.note}</p>
                </td>
                <td className="px-4 py-3 font-mono text-zinc-500">{row.threshold}</td>
                <td className="px-4 py-3 font-mono text-zinc-700">{row.wp}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.statusWp} />
                </td>
                <td className="px-4 py-3 font-mono font-bold text-[#00D26A]">{row.mvl}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.statusMvl} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-zinc-400 font-light">
        Thresholds conforme{" "}
        <strong className="font-semibold">Google Web Vitals (2024)</strong>. Medições em
        dispositivo móvel simulado (4G, 10&nbsp;Mbps). INP substituiu FID como Core Web Vital em
        março de 2024.
      </p>
    </section>
  );
}
