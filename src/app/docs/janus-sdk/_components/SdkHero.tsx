const PROPERTIES = [
  {
    label: "Framework-agnostic",
    desc: "Next.js, Astro, Node.js puro, Bun, Deno",
  },
  {
    label: "ESM + CJS",
    desc: "Dual output via tsup · tipos .d.ts inclusos",
  },
  {
    label: "Fetch nativa",
    desc: "Sem dependências · Node ≥ 18",
  },
  {
    label: "Erros tipados",
    desc: "JanusAPIError com status e url",
  },
];

export function SdkHero() {
  return (
    <header className="pb-10 mb-10 border-b border-zinc-200">
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-sm bg-zinc-100 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        SDK TypeScript · Mavellium
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-5">
        janus-sdk
      </h1>

      <p className="text-lg text-zinc-700 font-light leading-relaxed mb-3">
        <strong className="font-semibold text-zinc-900">janus-sdk</strong> é o
        cliente TypeScript oficial para a API pública do{" "}
        <strong className="font-semibold">Janus CMS</strong>. Agnóstico de
        framework — funciona em Next.js, Astro, Node.js puro e qualquer runtime
        com{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          fetch
        </code>{" "}
        nativa (Node ≥ 18).
      </p>

      <p className="text-base text-zinc-500 font-light leading-relaxed mb-8">
        O SDK encapsula toda a comunicação com o Janus: busca de posts de blog,
        categorias, slugs para geração estática e páginas headless via{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          /api/v1/content/:tenant/:slug
        </code>
        . Exporta os formatos ESM e CommonJS simultaneamente, com tipos TypeScript
        completos e erros tipados para tratamento granular.
      </p>

      <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PROPERTIES.map((p) => (
          <div
            key={p.label}
            className="flex flex-col px-4 py-3 rounded-sm bg-zinc-50 border border-zinc-200"
          >
            <dt className="text-xs font-bold uppercase tracking-widest text-[#00D26A] mb-0.5">
              {p.label}
            </dt>
            <dd className="text-[11px] text-zinc-500 font-light">{p.desc}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
