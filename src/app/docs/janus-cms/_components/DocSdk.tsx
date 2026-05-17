export function DocSdk() {
  return (
    <section aria-labelledby="sdk-heading" className="mb-12">
      <h2
        id="sdk-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        SDK TypeScript
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        O{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          @mavellium/janus-sdk
        </code>{" "}
        é o cliente oficial do Janus para projetos Next.js. Código real de{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          packages/janus-sdk/src/client.ts
        </code>
        .
      </p>

      {/* Instalação */}
      <section aria-labelledby="install-heading" className="mb-8">
        <h3
          id="install-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Instalação
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-3">
          Disponível como workspace package no monorepo Mavellium. Adicione ao{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            package.json
          </code>{" "}
          do seu projeto Next.js:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto">
          <code>{`{
  "dependencies": {
    "@mavellium/janus-sdk": "workspace:*"
  }
}`}</code>
        </pre>
      </section>

      {/* API de erros */}
      <section aria-labelledby="errors-heading" className="mb-8">
        <h3
          id="errors-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Erros tipados
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-3">
          O SDK lança dois erros distintos, ambos exportados como classes:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`import { JanusNotFoundError, JanusNetworkError } from "@mavellium/janus-sdk"

// JanusNotFoundError — HTTP 404
// Lançado quando: page não existe ou isPublished = false
// message: 'JanusNotFoundError: no published content found for "slug"'

// JanusNetworkError — falha de rede (fetch exception)
// Propriedade .cause preserva o erro original do fetch
// message: 'JanusNetworkError: unable to reach Janus API at "url"'`}</code>
        </pre>
      </section>

      {/* Uso completo */}
      <section aria-labelledby="usage-heading" className="mb-8">
        <h3
          id="usage-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Uso em Server Component (código real)
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-3">
          Código extraído de{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            src/app/page.tsx
          </code>{" "}
          do site institucional da Mavellium:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`import { JanusClient } from "@mavellium/janus-sdk"

// Instanciado fora do componente — reutilizado entre requests
const janus = new JanusClient({
  baseUrl: process.env.BLOG_API_URL ?? 'http://localhost:3000',
})

// Server Component (função async)
export default async function Home() {
  let heroSlides: HeroSlide[] = staticFallback

  try {
    // projectId formato obrigatório: "companySlug/pageSlug"
    heroSlides = await janus.getHeroContent<HeroSlide>('mavellium-main/home')
    // Retorna T[] tipado
    // Retorna [] se content não for array (nunca lança nesse caso)
  } catch {
    // API indisponível ou não publicado → fallback estático
    // O site nunca quebra por ausência do CMS
  }
}`}</code>
        </pre>
      </section>

      {/* Validação do projectId */}
      <section aria-labelledby="validation-heading">
        <h3
          id="validation-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Validação de projectId
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-3">
          O SDK valida o{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            projectId
          </code>{" "}
          de forma síncrona antes de executar o fetch:
        </p>
        <div className="overflow-x-auto rounded-md border border-zinc-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Condição
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Comportamento
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3">
                  <code className="font-mono text-zinc-700">{`projectId === ""`}</code>
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  Erro síncrono imediato (sem fetch)
                </td>
              </tr>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <td className="px-4 py-3">
                  <code className="font-mono text-zinc-700">
                    Sem{" "}
                    <span className="text-[#00D26A]">/</span> no projectId
                  </code>
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  Erro síncrono: formato deve ser{" "}
                  <code className="font-mono">"companySlug/pageSlug"</code>
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-3">
                  <code className="font-mono text-zinc-700">HTTP 404</code>
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  Lança{" "}
                  <code className="font-mono">JanusNotFoundError</code>
                </td>
              </tr>
              <tr className="bg-zinc-50/50">
                <td className="px-4 py-3">
                  <code className="font-mono text-zinc-700">Falha de rede</code>
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  Lança{" "}
                  <code className="font-mono">JanusNetworkError</code> com{" "}
                  <code className="font-mono">.cause</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
