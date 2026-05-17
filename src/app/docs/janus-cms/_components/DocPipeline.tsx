const PIPELINE_STEPS = [
  {
    step: 1,
    actor: "Janus Admin",
    action: "Usuário preenche contentData via DynamicForm",
    detail:
      "Servidor Action salva no PostgreSQL via Prisma. Imagens são convertidas para AVIF (Sharp, quality 80) e enviadas ao BunnyCDN antes de salvar a URL.",
  },
  {
    step: 2,
    actor: "Janus API",
    action: "revalidatePath() invalida o cache ISR do consumidor",
    detail:
      "Cada mutação de conteúdo chama revalidatePath() nas rotas afetadas do site consumidor. O Next.js invalida o HTML estático em cache.",
  },
  {
    step: 3,
    actor: "Janus API",
    action:
      "GET /api/v1/content/... responde com Cache-Control: s-maxage=60",
    detail:
      "A requisição chega ao servidor Janus, executa query Prisma no PostgreSQL e retorna JSON com os headers de cache. Latência real: <50ms.",
  },
  {
    step: 4,
    actor: "JanusClient SDK",
    action:
      "getHeroContent<T>() executa no Server Component — nunca no browser",
    detail:
      "O fetch acontece no servidor Next.js durante SSG/SSR. O bundle JavaScript enviado ao browser não contém o SDK, a URL da API nem as credenciais de ambiente.",
  },
  {
    step: 5,
    actor: "Next.js (SSG)",
    action: "Pré-renderiza a página no build — HTML completo no response",
    detail:
      "Com os dados retornados pelo SDK, o Next.js renderiza os React Server Components e gera o HTML final. Nenhum JavaScript de conteúdo é necessário no client.",
  },
  {
    step: 6,
    actor: "Vercel Edge Network",
    action: "Serve o HTML estático com TTFB <100ms global",
    detail:
      "O HTML gerado é armazenado em CDN distribuída. Requisições subsequentes são servidas pelo nó de edge mais próximo do cliente, sem processamento server-side.",
  },
  {
    step: 7,
    actor: "LLM Crawler",
    action:
      "Recebe HTML completo, semântico, sem necessidade de executar JavaScript",
    detail:
      "O parser do LLM lê o HTML do primeiro byte. Todo o conteúdo — texto, headings, listas — está presente no response inicial. Zero dependência de renderização client-side.",
  },
];

const CACHE_LAYERS = [
  {
    layer: "Janus API",
    header: "Cache-Control: public, max-age=60, s-maxage=60",
    desc: "Vercel Edge armazena a resposta JSON por 60s",
  },
  {
    layer: "Next.js ISR",
    header: "revalidatePath() on mutation",
    desc: "HTML pré-renderizado invalidado sob demanda; novo HTML gerado na próxima requisição",
  },
  {
    layer: "BunnyCDN",
    header: "Pull Zone global",
    desc: "Assets AVIF servidos do nó de borda mais próximo; cache permanente até invalidação manual",
  },
];

export function DocPipeline() {
  return (
    <section aria-labelledby="pipeline-heading" className="mb-12">
      <h2
        id="pipeline-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Pipeline de renderização
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        O HTML gerado pelo Janus é otimizado para LLMs porque é produzido em
        React Server Components (zero JS client-side para conteúdo), servido em
        menos de 100ms via Vercel Edge, e estruturado com tags semânticas
        nativas — não divs de editor WYSIWYG.
      </p>

      {/* Steps */}
      <ol className="space-y-0 mb-10" aria-label="Etapas do pipeline">
        {PIPELINE_STEPS.map((s, i) => (
          <li
            key={s.step}
            className={`flex gap-5 pb-6 ${
              i < PIPELINE_STEPS.length - 1
                ? "border-l-2 border-zinc-200 ml-[13px] pl-6 relative"
                : "ml-[13px] pl-6 relative"
            }`}
          >
            {/* Step number dot */}
            <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-white border-2 border-[#00D26A] flex items-center justify-center shrink-0">
              <span className="text-[9px] font-black text-[#00D26A]">
                {s.step}
              </span>
            </div>

            <div className="pt-0.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">
                {s.actor}
              </p>
              <p className="text-sm font-semibold text-zinc-900 mb-1">
                {s.action}
              </p>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                {s.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Cache layers */}
      <section aria-labelledby="cache-heading">
        <h3
          id="cache-heading"
          className="text-lg font-bold text-zinc-900 mb-3"
        >
          Estratégia de cache em três camadas
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-4">
          LLMs como o Perplexity operam com timeout de 2–5s e parsers síncronos.
          O Janus CMS + Next.js SSG entrega o HTML completo antes de 100ms, sem
          renderização client-side. O conteúdo existe no{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            &lt;body&gt;
          </code>{" "}
          do primeiro byte — exatamente o que parsers de LLM precisam para
          extrair e citar com fidelidade.
        </p>

        <div className="overflow-x-auto rounded-md border border-zinc-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-28">
                  Camada
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Mecanismo
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Efeito
                </th>
              </tr>
            </thead>
            <tbody>
              {CACHE_LAYERS.map((row, i) => (
                <tr
                  key={row.layer}
                  className={`border-b border-zinc-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-zinc-700">
                    {row.layer}
                  </td>
                  <td className="px-4 py-3">
                    <code className="font-mono text-zinc-600 text-[11px]">
                      {row.header}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 font-light">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
