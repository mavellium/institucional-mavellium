const PALETTE_ROWS = [
  { name: "Azul",    bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    dot: "bg-blue-500"    },
  { name: "Roxo",    bg: "bg-purple-50",  text: "text-purple-700",  border: "border-purple-200",  dot: "bg-purple-500"  },
  { name: "Verde",   bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  { name: "Laranja", bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200",  dot: "bg-orange-500"  },
  { name: "Rosa",    bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",    dot: "bg-rose-500"    },
  { name: "Âmbar",  bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-500"   },
];

export function SdkUtils() {
  return (
    <section aria-labelledby="utils-heading" className="mb-12">
      <h2
        id="utils-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Funções utilitárias
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        Exportadas como funções puras — não dependem de uma instância do{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          JanusClient
        </code>
        . Importe diretamente do pacote.
      </p>

      {/* processHtmlBody */}
      <section aria-labelledby="html-heading" className="mb-10">
        <h3
          id="html-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          processHtmlBody(html)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Injeta atributos{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            id
          </code>{" "}
          únicos em todas as tags{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            {"<h2>"}
          </code>{" "}
          e{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            {"<h3>"}
          </code>{" "}
          do HTML e retorna a lista de headings para construção de Sumário (ToC).
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed mb-3">
          <code>{`import { processHtmlBody } from "janus-sdk"

const { processedHtml, headings } = processHtmlBody(post.htmlBody)

// headings: TocHeading[]
// [
//   { id: "introducao",  text: "Introdução",  level: 2 },
//   { id: "configuracao", text: "Configuração", level: 3 },
// ]

// Exemplo de ToC com React:
function TableOfContents({ headings }: { headings: TocHeading[] }) {
  return (
    <nav>
      <ul>
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : 0 }}>
            <a href={\`#\${h.id}\`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}`}</code>
        </pre>
      </section>

      {/* getCategoryColor */}
      <section aria-labelledby="color-heading" className="mb-10">
        <h3
          id="color-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          getCategoryColor(name)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Retorna um bundle de classes Tailwind CSS para uma categoria,
          determinístico pelo nome — o mesmo nome sempre produz a mesma cor.
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed mb-4">
          <code>{`import { getCategoryColor } from "janus-sdk"

const { bg, text, border, dot } = getCategoryColor("Inteligência Artificial")
// { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" }

function CategoryBadge({ name }: { name: string }) {
  const { bg, text, border, dot } = getCategoryColor(name)
  return (
    <span className={\`\${bg} \${text} \${border} border rounded-full px-2 py-0.5 text-xs flex items-center gap-1\`}>
      <span className={\`\${dot} w-1.5 h-1.5 rounded-full\`} />
      {name}
    </span>
  )
}`}</code>
        </pre>

        {/* Paleta visual */}
        <p className="text-zinc-500 font-light text-xs mb-2">
          Paleta disponível (6 cores, seleção por hash do nome):
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PALETTE_ROWS.map((p) => (
            <div
              key={p.name}
              className={`${p.bg} ${p.border} border rounded-sm px-3 py-2 flex items-center gap-2`}
            >
              <span className={`${p.dot} w-2 h-2 rounded-full flex-shrink-0`} />
              <span className={`${p.text} text-xs font-medium`}>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* formatDate */}
      <section aria-labelledby="date-heading">
        <h3
          id="date-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          formatDate(isoDate)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Formata uma string ISO 8601 para português brasileiro usando{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            Intl.DateTimeFormat
          </code>
          .
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`import { formatDate } from "janus-sdk"

formatDate("2026-05-17T00:00:00.000Z")  // "17 de maio de 2026"
formatDate("2026-01-01T00:00:00.000Z")  // "1 de janeiro de 2026"`}</code>
        </pre>
      </section>
    </section>
  );
}
