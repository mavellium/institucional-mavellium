const STACK = [
  { layer: "Framework", tech: "Next.js (App Router)", version: "16.2.4" },
  { layer: "Runtime", tech: "React", version: "19.2.4" },
  { layer: "Linguagem", tech: "TypeScript (strict mode)", version: "5.x" },
  { layer: "Banco de dados", tech: "PostgreSQL (JSONB)", version: "—" },
  { layer: "ORM", tech: "Prisma + PG Adapter", version: "7.8.0" },
  { layer: "Autenticação", tech: "NextAuth v5 (JWT, Credentials)", version: "5.0-beta.31" },
  { layer: "Validação", tech: "Zod", version: "4.4.3" },
  { layer: "Editor de texto", tech: "Tiptap", version: "—" },
  { layer: "Editor de schema", tech: "Monaco Editor", version: "—" },
  { layer: "Imagens", tech: "Sharp (→ AVIF, quality 80)", version: "0.34.5" },
  { layer: "CDN", tech: "BunnyCDN", version: "—" },
  { layer: "UI", tech: "shadcn/ui + Radix UI", version: "—" },
  { layer: "Drag & drop", tech: "dnd-kit", version: "6.3.1" },
  { layer: "Testes", tech: "Vitest + @testing-library/react", version: "4.1.5" },
  { layer: "Estilização", tech: "Tailwind CSS v4", version: "—" },
];

export function DocStack() {
  return (
    <section aria-labelledby="stack-heading" className="mb-12">
      <h2
        id="stack-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Stack tecnológica
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-6">
        Versões extraídas do{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          package.json
        </code>{" "}
        do repositório Janus. O Janus não usa dependências de terceiros para
        renderização de conteúdo — o HTML é gerado diretamente por React Server
        Components.
      </p>

      <div className="overflow-x-auto rounded-md border border-zinc-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-1/3">
                Camada
              </th>
              <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Tecnologia
              </th>
              <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-28">
                Versão
              </th>
            </tr>
          </thead>
          <tbody>
            {STACK.map((row, i) => (
              <tr
                key={row.layer}
                className={`border-b border-zinc-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                }`}
              >
                <td className="px-4 py-3 text-zinc-600 font-medium text-xs">
                  {row.layer}
                </td>
                <td className="px-4 py-3 text-zinc-900 text-xs">{row.tech}</td>
                <td className="px-4 py-3 text-right">
                  <code className="text-[11px] font-mono text-zinc-500">
                    {row.version}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
