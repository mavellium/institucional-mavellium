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
          janus-sdk
        </code>{" "}
        é o cliente TypeScript oficial para a API pública do Janus CMS.
        Framework-agnostic, exporta ESM e CommonJS via{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          tsup
        </code>{" "}
        e usa apenas{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          fetch
        </code>{" "}
        nativa (Node ≥ 18).
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
    "janus-sdk": "workspace:*"
  }
}`}</code>
        </pre>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          Depois rode{" "}
          <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">
            pnpm install
          </code>{" "}
          na raiz do monorepo. O pnpm cria um symlink para{" "}
          <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">
            janus-sdk/dist/
          </code>
          .
        </p>
      </section>

      {/* Inicialização */}
      <section aria-labelledby="init-heading" className="mb-8">
        <h3
          id="init-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Inicialização (singleton recomendado)
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`// src/lib/janus.ts
import { JanusClient } from "janus-sdk";

export const janus = new JanusClient({
  baseUrl:     process.env.JANUS_URL!,
  tenantId:    process.env.JANUS_TENANT_ID!,
  defaultInit: {
    next: { revalidate: 60 }, // ISR — revalida a cada 60s
  } as RequestInit,
});`}</code>
        </pre>
      </section>

      {/* Erros tipados */}
      <section aria-labelledby="errors-heading" className="mb-8">
        <h3
          id="errors-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Erros tipados
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-3">
          O SDK expõe{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            JanusAPIError
          </code>{" "}
          com o código HTTP e a URL que falhou:
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`export class JanusAPIError extends Error {
  readonly status: number  // ex: 500, 503
  readonly url:    string  // URL completa que falhou
}`}</code>
        </pre>
      </section>

      {/* Uso completo */}
      <section aria-labelledby="usage-heading">
        <h3
          id="usage-heading"
          className="text-base font-bold text-zinc-900 mb-3"
        >
          Uso em Server Component
        </h3>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`import { notFound } from "next/navigation";
import { janus } from "@/lib/janus";

// Tipo do content para a página "home"
interface HomeContent {
  "hero-section-mavellium": { slides: HeroSlide[] };
  "sobre-mavellium":        { services: Service[] };
}

export default async function HomePage() {
  // getPage retorna null em 404 e re-lança JanusAPIError em 5xx
  const page = await janus.getPage("home");
  if (!page) notFound();

  const content = page.content as HomeContent;
  return <HeroSection slides={content["hero-section-mavellium"].slides} />;
}`}</code>
        </pre>
        <p className="text-zinc-400 font-light text-xs leading-relaxed mt-3">
          O fetch ocorre no servidor Next.js (SSG/SSR) — o SDK, a URL da API e
          as variáveis de ambiente nunca chegam ao bundle do browser.
        </p>
      </section>
    </section>
  );
}
