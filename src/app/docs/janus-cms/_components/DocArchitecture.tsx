const FIELD_TYPES = [
  "text", "textarea", "number", "color", "url",
  "image", "video", "boolean", "select", "html", "list",
];

export function DocArchitecture() {
  return (
    <section aria-labelledby="arch-heading" className="mb-12">
      <h2
        id="arch-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Arquitetura de dados
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        Modelo extraído do{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          prisma/schema.prisma
        </code>{" "}
        do repositório Janus.
      </p>

      {/* 1. Multi-tenant hierarchy */}
      <section aria-labelledby="tenant-heading" className="mb-10">
        <h3
          id="tenant-heading"
          className="text-lg font-bold text-zinc-900 mb-3"
        >
          Hierarquia multi-tenant
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-4">
          O Janus CMS isola dados por{" "}
          <strong className="font-semibold">Company</strong>. Cada Company
          contém Projects; cada Project contém Pages. Esta hierarquia garante
          que nenhuma query vaze dados entre tenants — o{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            companyId
          </code>{" "}
          é chave estrangeira obrigatória em todas as entidades filhas.
        </p>

        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`Company  (id: UUID, slug: unique, name: string)
  └─ Project  (type: LANDING_PAGE | INSTITUTIONAL,
               blogEnabled: bool, isActive: bool)
       └─ Page  (schemaData: JSON,
                 contentData: JSON,
                 isPublished: bool,
                 slug: unique per project,
                 deletedAt: nullable)`}</code>
        </pre>

        <p className="text-xs text-zinc-400 font-light mt-2">
          Todas as entidades possuem soft delete via{" "}
          <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">
            deletedAt
          </code>
          . Consultas filtram{" "}
          <code className="font-mono bg-zinc-100 px-1 py-0.5 rounded">
            deletedAt: null
          </code>{" "}
          por padrão.
        </p>
      </section>

      {/* 2. Dual-model */}
      <section aria-labelledby="dualmodel-heading" className="mb-10">
        <h3
          id="dualmodel-heading"
          className="text-lg font-bold text-zinc-900 mb-3"
        >
          Dual-model de Page: schemaData e contentData
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-4">
          Cada Page armazena dois objetos JSON independentes no PostgreSQL
          (JSONB):{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            schemaData
          </code>{" "}
          define a estrutura de campos;{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            contentData
          </code>{" "}
          armazena os valores preenchidos pelo usuário. Esta separação permite
          que o schema evolua sem migração de dados — alterar{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            schemaData
          </code>{" "}
          não requer alterar{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            contentData
          </code>
          .
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
              schemaData (estrutura)
            </p>
            <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed h-full">
              <code>{`{
  "hero": {
    "name": "Hero Principal",
    "fields": [
      {
        "name": "headline",
        "label": "Título",
        "type": "text"
      },
      {
        "name": "cover",
        "label": "Imagem",
        "type": "image"
      }
    ]
  }
}`}</code>
            </pre>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
              contentData (valores)
            </p>
            <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed h-full">
              <code>{`{
  "hero": {
    "headline": "Transforme sua\npresença digital",
    "cover": "https://cdn.bunny.net/\nimagens/hero.avif"
  }
}`}</code>
            </pre>
          </div>
        </div>

        <p className="text-xs text-zinc-500 font-light mb-3">
          Tipos de campo suportados:
        </p>
        <div className="flex flex-wrap gap-2">
          {FIELD_TYPES.map((t) => (
            <code
              key={t}
              className="text-[11px] font-mono bg-zinc-100 border border-zinc-200 px-2 py-1 rounded text-zinc-600"
            >
              {t}
            </code>
          ))}
        </div>
      </section>

      {/* 3. Public API */}
      <section aria-labelledby="api-heading" className="mb-2">
        <h3 id="api-heading" className="text-lg font-bold text-zinc-900 mb-3">
          API REST pública headless
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-4">
          A API REST do Janus é pública, CORS-aberta e projetada para ser
          consumida por React Server Components. A resposta do servidor ocorre
          em{" "}
          <strong className="font-semibold">&lt;50ms</strong>; com{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            s-maxage=60
          </code>
          , a Vercel Edge Network serve o cache em{" "}
          <strong className="font-semibold">&lt;10ms</strong>.
        </p>

        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-5 overflow-x-auto leading-relaxed">
          <code>{`GET /api/v1/content/{companySlug}/{pageSlug}

Headers de resposta:
  Cache-Control: public, max-age=60, s-maxage=60
  Access-Control-Allow-Origin: *

Body 200 — OK:
{
  "slug":      "home",
  "name":      "Página Inicial",
  "schema":    { ... },   // schemaData
  "content":   [ ... ],   // contentData serializado
  "updatedAt": "2026-05-16T00:00:00.000Z"
}

Requisitos para HTTP 200:
  page.isPublished  = true
  project.isActive  = true
  company.deletedAt = null

Body 404 — Not Found:
{ "error": "Page not found or not published" }`}</code>
        </pre>
      </section>
    </section>
  );
}
