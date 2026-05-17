export function SdkInit() {
  return (
    <section aria-labelledby="init-heading" className="mb-12">
      <h2
        id="init-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Inicialização
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        Instancie o{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          JanusClient
        </code>{" "}
        passando a URL base do Janus e o identificador do seu tenant. O construtor
        aceita um terceiro campo opcional,{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          defaultInit
        </code>
        , mesclado em todos os fetches — use para opções de cache específicas do
        framework.
      </p>

      {/* Interface */}
      <section aria-labelledby="config-heading" className="mb-8">
        <h3
          id="config-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Interface de configuração
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`interface JanusClientConfig {
  baseUrl:      string;        // URL base do Janus
  tenantId:     string;        // companySlug registrado no Janus
  defaultInit?: RequestInit;   // opções de fetch mescladas em todas as chamadas
}`}</code>
        </pre>
      </section>

      {/* Exemplo básico */}
      <section aria-labelledby="basic-heading" className="mb-8">
        <h3
          id="basic-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Exemplo básico (Node.js / runtime genérico)
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`import { JanusClient } from "janus-sdk"

const client = new JanusClient({
  baseUrl:  "https://cms.exemplo.com.br",
  tenantId: "minha-empresa",
})

const posts = await client.getPosts()
console.log(posts)`}</code>
        </pre>
      </section>

      {/* Next.js singleton */}
      <section aria-labelledby="nextjs-heading" className="mb-8">
        <h3
          id="nextjs-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Padrão recomendado — singleton para Next.js App Router
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Instancie fora dos componentes para reutilizar entre requests. Use{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            defaultInit
          </code>{" "}
          para configurar ISR globalmente — cada método pode sobrescrever se
          precisar de uma política diferente.
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`// src/lib/janus.ts
import { JanusClient } from "janus-sdk"

export const janus = new JanusClient({
  baseUrl:     process.env.JANUS_URL!,
  tenantId:    process.env.JANUS_TENANT_ID!,
  defaultInit: {
    next: { revalidate: 60 },  // ISR: revalida todas as rotas a cada 60 s
  } as RequestInit,
})`}</code>
        </pre>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          O campo{" "}
          <code className="font-mono">next</code> é uma extensão da API{" "}
          <code className="font-mono">fetch</code> do Next.js e não existe no
          tipo padrão{" "}
          <code className="font-mono">RequestInit</code> do DOM — daí o cast{" "}
          <code className="font-mono">as RequestInit</code>. Em produção, o
          Next.js resolve o tipo corretamente via augmentation global.
        </p>
      </section>

      {/* Uso no componente */}
      <section aria-labelledby="usage-component-heading">
        <h3
          id="usage-component-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Uso em Server Component
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`// app/blog/page.tsx
import { janus } from "@/lib/janus"

export default async function BlogPage() {
  const posts = await janus.getPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>{post.title}</li>
      ))}
    </ul>
  )
}`}</code>
        </pre>
      </section>
    </section>
  );
}
