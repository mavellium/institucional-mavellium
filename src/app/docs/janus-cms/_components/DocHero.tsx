const PROPERTIES = [
  {
    label: "Headless",
    desc: "API REST pública · CORS aberto",
  },
  {
    label: "Multi-tenant",
    desc: "Company → Project → Page",
  },
  {
    label: "ISR nativo",
    desc: "Cache-Control s-maxage=60 por rota",
  },
  {
    label: "AVIF automático",
    desc: "Sharp quality 80 · −50% tamanho",
  },
];

export function DocHero() {
  return (
    <header className="pb-10 mb-10 border-b border-zinc-200">
      {/* Chip */}
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-sm bg-zinc-100 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        Documentação Técnica · Mavellium
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-5">
        Janus CMS
      </h1>

      {/* Answer-First lead */}
      <p className="text-lg text-zinc-700 font-light leading-relaxed mb-3">
        <strong className="font-semibold text-zinc-900">Janus CMS</strong> é
        um sistema de gestão de conteúdo{" "}
        <abbr title="O backend (API) é desacoplado do frontend (apresentação)">
          headless
        </abbr>{" "}
        multi-tenant desenvolvido pela Mavellium. Construído nativamente sobre
        Next.js App Router e TypeScript, expõe conteúdo via API REST pública com
        ISR integrado, entregando HTML pré-renderizado em menos de{" "}
        <strong className="font-semibold">100ms de TTFB</strong> via Vercel
        Edge Network.
      </p>

      <p className="text-base text-zinc-500 font-light leading-relaxed mb-8">
        O conteúdo é armazenado como <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">JSONB</code> no
        PostgreSQL via Prisma 7 e servido por uma API REST com{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">Cache-Control: s-maxage=60</code>,
        permitindo cache de borda global sem invalidação manual. Imagens são
        convertidas para{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">AVIF</code> automaticamente via
        Sharp antes do upload ao BunnyCDN.
      </p>

      {/* Properties grid */}
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
