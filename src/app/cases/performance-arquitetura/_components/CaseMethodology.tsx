const V = {
  FERRAMENTA_MEDICAO:    "Google PageSpeed Insights (Mobile / 4G)",
  DATA_MEDICAO:          "maio de 2026",
  SEGMENTO_CLIENTE:      "benchmark contra líderes do mercado tradicional",
  PLUGINS_WORDPRESS_QTD: "dezenas de",
  QTD_MEDICOES:          "3", 
};

export function CaseMethodology() {
  return (
    <section aria-labelledby="methodology-heading" className="mb-12">
      <h2
        id="methodology-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Metodologia
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        Todos os dados foram coletados sob condições controladas e reproduzíveis.
        Nenhuma métrica foi extraída de ambiente de produção sem replicação.
      </p>

      <ul className="space-y-4 mb-8" role="list">
        <li className="flex gap-3">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold text-zinc-800">
              Site experimental (Mavellium):
            </strong>{" "}
            <span className="text-sm text-zinc-600 font-light">
              Projetos institucionais B2B equivalentes em complexidade. Stack: Next.js SSG + Janus CMS,
              Vercel Edge Network para HTML, BunnyCDN para assets estáticos e otimização nativa de mídia.
            </span>
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold text-zinc-800">Ferramentas de medição:</strong>{" "}
            <span className="text-sm text-zinc-600 font-light">{V.FERRAMENTA_MEDICAO}.</span>
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold text-zinc-800">Data:</strong>{" "}
            <span className="text-sm text-zinc-600 font-light">{V.DATA_MEDICAO}.</span>
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold text-zinc-800">
              Site de controle (WordPress):
            </strong>{" "}
            <span className="text-sm text-zinc-600 font-light">
              {V.SEGMENTO_CLIENTE} com {V.PLUGINS_WORDPRESS_QTD} plugins ativos, tema premium,
              hospedagem compartilhada, sem CDN dedicado para ativos estáticos.
            </span>
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold text-zinc-800">
              Site experimental (Mavellium):
            </strong>{" "}
            <span className="text-sm text-zinc-600 font-light">
              Mesmo conteúdo e funcionalidades do site de controle. Stack: Next.js SSG + Janus CMS,
              Vercel Edge Network para HTML, BunnyCDN para assets AVIF.
            </span>
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold text-zinc-800">Métricas coletadas:</strong>{" "}
            <span className="text-sm text-zinc-600 font-light">
              TTFB, LCP, INP, CLS, total de JavaScript transferido, total de requisições HTTP e
              PageSpeed Insights Score (modo mobile).
            </span>
          </div>
        </li>

        <li className="flex gap-3">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00D26A]" aria-hidden="true" />
          <div>
            <strong className="text-sm font-semibold text-zinc-800">Repetições:</strong>{" "}
            <span className="text-sm text-zinc-600 font-light">
              {V.QTD_MEDICOES} medições por ambiente. Valor reportado: mediana.
            </span>
          </div>
        </li>
      </ul>

      <aside
        className="border-l-4 border-[#00D26A] pl-4 py-2 bg-[#00D26A]/5 rounded-r-md"
        aria-label="Nota metodológica"
      >
        <p className="text-xs text-zinc-600 font-light leading-relaxed">
          <strong className="font-semibold text-zinc-700">Nota metodológica:</strong> o site de
          controle não foi degradado artificialmente. {V.PLUGINS_WORDPRESS_QTD} plugins representam
          a configuração típica de um {V.SEGMENTO_CLIENTE} em WordPress com funcionalidades
          equivalentes às do site experimental. Os valores são medianas, não médias — outliers de
          rede não inflacionam os resultados.
        </p>
      </aside>
    </section>
  );
}
