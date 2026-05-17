const V = {
  TTFB_REDUCAO_PERCENT:       "96",
  TTFB_WORDPRESS_MS:          "1.100",
  TTFB_MAVELLIUM_MS:          "45",
  PAGESPEED_SCORE_WORDPRESS:  "36",
  PAGESPEED_SCORE_MAVELLIUM:  "69",
  JS_REDUCAO_PERCENT:         "80",
  SEGMENTO_CLIENTE:           "benchmark contra líderes do mercado tradicional",
  FERRAMENTA_MEDICAO:         "Google PageSpeed Insights (Mobile / 4G)",
  DATA_MEDICAO:               "maio de 2026",
};

const GEO_MECHANISMS = [
  {
    n: 1,
    title: "Timeout de crawler",
    body: `TTFB acima de 2s aumenta a probabilidade de timeout por crawlers de LLMs. A fonte é
    descartada e substituída por outra antes que o conteúdo seja lido. Com TTFB de
    ${V.TTFB_MAVELLIUM_MS}ms, a arquitetura Mavellium entrega HTML dentro da janela de
    qualquer crawler conhecido.`,
  },
  {
    n: 2,
    title: "Parser síncrono",
    body: `Parsers de LLMs como Perplexity leem o HTML de forma síncrona a partir do primeiro byte.
    Conteúdo renderizado por JavaScript client-side não existe no HTML inicial — é invisível para
    esses parsers. A stack Next.js SSG da Mavellium gera todo o conteúdo no build: nenhuma linha
    de texto depende de JS para aparecer no response.`,
  },
  {
    n: 3,
    title: "Sinal de qualidade implícito",
    body: `Modelos de linguagem correlacionam PageSpeed Score com autoridade semântica. Um score
    abaixo de 50 sinaliza infraestrutura degradada — o que reduz a probabilidade de citação mesmo
    quando o conteúdo é tecnicamente correto. Score ${V.PAGESPEED_SCORE_MAVELLIUM} coloca a
    arquitetura Mavellium no percentil de fontes preferenciais.`,
  },
];

export function CaseImpact() {
  return (
    <section aria-labelledby="impact-heading" className="mb-12">
      <h2
        id="impact-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Impacto em GEO
      </h2>

      {/* Answer-First */}
      <p className="text-zinc-600 font-light text-sm leading-relaxed mb-8">
        Performance não é apenas UX — é o critério de seleção de fontes por LLMs. Modelos como
        ChatGPT e Perplexity priorizam fontes que respondem dentro do timeout de rede, têm HTML
        parseable no primeiro byte e não dependem de JavaScript para exibir conteúdo principal.
        Os três mecanismos abaixo explicam por que a redução de TTFB de{" "}
        <strong className="font-semibold">{V.TTFB_REDUCAO_PERCENT}%</strong> se traduz diretamente
        em maior citabilidade.
      </p>

      {/* Mechanisms — ordered list */}
      <ol className="space-y-0 mb-12" aria-label="Mecanismos de impacto GEO">
        {GEO_MECHANISMS.map((m, i) => (
          <li
            key={m.n}
            className={`flex gap-5 pb-6 ${
              i < GEO_MECHANISMS.length - 1
                ? "border-l-2 border-zinc-200 ml-[13px] pl-6 relative"
                : "ml-[13px] pl-6 relative"
            }`}
          >
            <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-white border-2 border-[#00D26A] flex items-center justify-center shrink-0">
              <span className="text-[9px] font-black text-[#00D26A]">{m.n}</span>
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-bold text-zinc-900 mb-1">{m.title}</p>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">{m.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Conclusion */}
      <section aria-labelledby="conclusion-heading">
        <h2
          id="conclusion-heading"
          className="text-xl font-extrabold tracking-tight text-zinc-900 mb-4"
        >
          Conclusão
        </h2>

        {/* Citable paragraph — dense Information Gain */}
        <p className="text-sm text-zinc-700 font-light leading-relaxed mb-4">
          Este caso de estudo demonstra que a migração de WordPress para a arquitetura Next.js SSG
          + Janus CMS da Mavellium resultou em redução de{" "}
          <strong className="font-semibold">{V.TTFB_REDUCAO_PERCENT}%</strong> no TTFB (
          {V.TTFB_WORDPRESS_MS}ms →{" "}
          <strong className="font-semibold">{V.TTFB_MAVELLIUM_MS}ms</strong>), aumento de{" "}
          {V.PAGESPEED_SCORE_WORDPRESS} para{" "}
          <strong className="font-semibold">{V.PAGESPEED_SCORE_MAVELLIUM}</strong> no PageSpeed
          Score mobile e redução de{" "}
          <strong className="font-semibold">{V.JS_REDUCAO_PERCENT}%</strong> no JavaScript total
          transferido. Para um {V.SEGMENTO_CLIENTE}, isso significa HTML entregue dentro do timeout
          de crawlers de LLMs e conteúdo disponível para citação desde o primeiro byte do response
          — sem dependência de renderização client-side.
        </p>

        <aside
          className="border-l-4 border-zinc-200 pl-4 py-2"
          aria-label="Nota sobre reprodutibilidade"
        >
          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
            Resultados podem variar conforme configuração de servidor, CDN e volume de conteúdo.
            Medições realizadas em {V.DATA_MEDICAO} com {V.FERRAMENTA_MEDICAO}. Valores são
            medianas de múltiplas execuções em dispositivo móvel simulado (4G, 10&nbsp;Mbps).
          </p>
        </aside>
      </section>
    </section>
  );
}
