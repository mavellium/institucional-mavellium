const ERROR_TABLE = [
  { method: "getPosts",        network: "[]",   http404: "[]",   http5xx: "[]"                  },
  { method: "getPostSlugs",    network: "[]",   http404: "[]",   http5xx: "[]"                  },
  { method: "getRelatedPosts", network: "[]",   http404: "[]",   http5xx: "[]"                  },
  { method: "getCategories",   network: "[]",   http404: "[]",   http5xx: "[]"                  },
  { method: "getPost",         network: "null", http404: "null", http5xx: "null"                },
  { method: "getPage",         network: "null", http404: "null", http5xx: "JanusAPIError ↑"     },
];

export function SdkErrors() {
  return (
    <section aria-labelledby="errors-heading" className="mb-12">
      <h2
        id="errors-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Tratamento de erros
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        O SDK separa erros de rede (sem conexão, DNS, timeout) de erros HTTP
        (respostas{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          4xx/5xx
        </code>
        ). Erros de rede sempre resultam em retorno gracioso. Erros HTTP geram{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          JanusAPIError
        </code>{" "}
        internamente — cada método decide se o captura ou propaga.
      </p>

      {/* Como fetchJson funciona */}
      <section aria-labelledby="fetchjson-heading" className="mb-8">
        <h3
          id="fetchjson-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Como o fetch interno funciona
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`fetchJson(path)
    │
    ├── fetch() lança exceção (sem rede, DNS, timeout)
    │       └── retorna null              ← gracioso, não quebra o build
    │
    ├── res.ok === false (HTTP 4xx / 5xx)
    │       └── throw new JanusAPIError  ← tipado, capturado pelo método público
    │
    └── res.json() lança exceção (JSON malformado)
            └── retorna null              ← gracioso`}</code>
        </pre>
      </section>

      {/* Tabela */}
      <section aria-labelledby="table-heading" className="mb-8">
        <h3
          id="table-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Comportamento por método
        </h3>
        <div className="overflow-x-auto rounded-md border border-zinc-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Método
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Erro de rede
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  HTTP 404
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  HTTP 5xx
                </th>
              </tr>
            </thead>
            <tbody>
              {ERROR_TABLE.map((row, i) => (
                <tr
                  key={row.method}
                  className={
                    i % 2 === 0
                      ? "border-b border-zinc-100"
                      : "border-b border-zinc-100 bg-zinc-50/50"
                  }
                >
                  <td className="px-4 py-3 font-mono text-zinc-700">
                    {row.method}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-500">
                    {row.network}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-500">
                    {row.http404}
                  </td>
                  <td
                    className={`px-4 py-3 font-mono ${
                      row.http5xx.includes("JanusAPIError")
                        ? "text-[#00D26A]"
                        : "text-zinc-500"
                    }`}
                  >
                    {row.http5xx}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          Métodos de lista ({" "}
          <code className="font-mono">getPosts</code>,{" "}
          <code className="font-mono">getCategories</code> etc.) nunca lançam —
          seguros para builds estáticos. <code className="font-mono">getPage</code>{" "}
          propaga erros 5xx para que o{" "}
          <code className="font-mono">error.tsx</code> do Next.js os trate.
        </p>
      </section>

      {/* JanusAPIError */}
      <section aria-labelledby="api-error-heading" className="mb-8">
        <h3
          id="api-error-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          JanusAPIError
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`class JanusAPIError extends Error {
  readonly status: number  // código HTTP (ex: 404, 500, 503)
  readonly url:    string  // URL completa que falhou
}`}</code>
        </pre>
      </section>

      {/* Capturando manualmente */}
      <section aria-labelledby="catch-heading">
        <h3
          id="catch-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Capturando manualmente
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Se precisar de controle granular sobre erros em{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            getPage
          </code>
          , capture{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            JanusAPIError
          </code>{" "}
          e decida com base no status:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`import { JanusAPIError } from "janus-sdk"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
  let page
  try {
    page = await janus.getPage(params.slug)
  } catch (err) {
    if (err instanceof JanusAPIError) {
      console.error(\`Janus \${err.status} em \${err.url}\`)
      // 503 → Janus indisponível, mostrar fallback
      // 500 → erro interno, deixar error.tsx agir
    }
    throw err  // propaga para o error.tsx do Next.js
  }

  if (!page) notFound()  // 404 ou não publicado
}`}</code>
        </pre>

        {/* error.tsx */}
        <p className="text-zinc-500 font-light text-sm leading-relaxed mt-6 mb-3">
          Crie um{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            error.tsx
          </code>{" "}
          para capturar erros propagados pelo SDK:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`// app/error.tsx
"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Erro ao carregar o conteúdo</h2>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  )
}`}</code>
        </pre>
      </section>
    </section>
  );
}
