export function SdkPage() {
  return (
    <section aria-labelledby="page-heading" className="mb-12">
      <h2
        id="page-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Página headless
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        O método{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          getPage
        </code>{" "}
        busca uma página publicada via endpoint público do Janus:
      </p>
      <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto mb-8">
        <code>{`GET /api/v1/content/:tenantId/:pageSlug`}</code>
      </pre>

      {/* Tipo JanusPage */}
      <section aria-labelledby="page-type-heading" className="mb-8">
        <h3
          id="page-type-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Tipo de retorno
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`interface JanusPage {
  slug:      string
  name:      string
  schema:    unknown  // schema de campos definido no builder
  content:   unknown  // dados preenchidos pelo cliente
  updatedAt: string
}`}</code>
        </pre>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          <code className="font-mono">schema</code> e{" "}
          <code className="font-mono">content</code> são{" "}
          <code className="font-mono">unknown</code> intencionalmente — o schema
          é dinâmico por projeto. Faça o cast no consumidor para o tipo esperado.
        </p>
      </section>

      {/* Exemplo com Next.js */}
      <section aria-labelledby="page-usage-heading" className="mb-8">
        <h3
          id="page-usage-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Uso em Server Component
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`// app/[slug]/page.tsx
import { notFound } from "next/navigation"
import { janus } from "@/lib/janus"

// Defina o tipo do seu content
interface HomeContent {
  hero_title:    string
  hero_subtitle: string
  cta_label:     string
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string }
}) {
  // getPage retorna null em 404 e re-lança JanusAPIError em 5xx
  const page = await janus.getPage(params.slug)
  if (!page) notFound()

  const content = page.content as HomeContent

  return (
    <main>
      <h1>{content.hero_title}</h1>
      <p>{content.hero_subtitle}</p>
    </main>
  )
}`}</code>
        </pre>
      </section>

      {/* Comportamento de erros */}
      <section aria-labelledby="page-errors-heading">
        <h3
          id="page-errors-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Comportamento de erros
        </h3>
        <div className="overflow-x-auto rounded-md border border-zinc-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Situação
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Retorno
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Ação recomendada
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3 text-zinc-700">Sem conexão / DNS</td>
                <td className="px-4 py-3 font-mono text-zinc-500">null</td>
                <td className="px-4 py-3 text-zinc-600">
                  <code className="font-mono">notFound()</code>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <td className="px-4 py-3 text-zinc-700">HTTP 404</td>
                <td className="px-4 py-3 font-mono text-zinc-500">null</td>
                <td className="px-4 py-3 text-zinc-600">
                  <code className="font-mono">notFound()</code>
                </td>
              </tr>
              <tr className="bg-zinc-50/25">
                <td className="px-4 py-3 text-zinc-700">HTTP 5xx</td>
                <td className="px-4 py-3 font-mono text-[#00D26A]">
                  lança JanusAPIError
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  Capturado pelo <code className="font-mono">error.tsx</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          Erros 5xx são re-lançados para que o Next.js renderize o{" "}
          <code className="font-mono">error.tsx</code> correspondente, evitando
          que uma falha do servidor entregue uma página em branco
          silenciosamente.
        </p>
      </section>
    </section>
  );
}
