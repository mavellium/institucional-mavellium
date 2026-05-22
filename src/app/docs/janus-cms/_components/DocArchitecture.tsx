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
                 isAdvanced:  bool,   // false = Legacy | true = Avançado
                 uiSchema:    JSON?,  // controle de labels/widgets (opcional)
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
          Dois modos de edição: Legacy e Avançado
        </h3>
        <p className="text-zinc-600 font-light text-sm leading-relaxed mb-4">
          O campo{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            isAdvanced
          </code>{" "}
          da Page determina qual modo está ativo. A troca de modo nunca apaga
          dados — apenas muda a flag via{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            updatePageMode()
          </code>
          .
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-md border border-zinc-200 overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-4 py-2 bg-zinc-50 border-b border-zinc-200">
              Legacy — isAdvanced = false
            </p>
            <div className="p-4 space-y-2 text-xs text-zinc-600 font-light leading-relaxed">
              <p>
                <code className="font-mono bg-zinc-100 px-1 rounded">schemaData</code>{" "}
                define a estrutura de campos (read-only pelo dev).
              </p>
              <p>
                <code className="font-mono bg-zinc-100 px-1 rounded">contentData</code>{" "}
                armazena os valores preenchidos via DynamicForm.
              </p>
              <p>Suporta 11 tipos de campo predefinidos.</p>
            </div>
          </div>
          <div className="rounded-md border border-[#00D26A]/30 overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A] px-4 py-2 bg-[#00D26A]/5 border-b border-[#00D26A]/20">
              Avançado — isAdvanced = true
            </p>
            <div className="p-4 space-y-2 text-xs text-zinc-600 font-light leading-relaxed">
              <p>
                <code className="font-mono bg-zinc-100 px-1 rounded">schemaData</code>{" "}
                é JSON livre editado via Monaco Editor (3 colunas + preview).
              </p>
              <p>
                <code className="font-mono bg-zinc-100 px-1 rounded">contentData</code>{" "}
                é ignorado completamente.
              </p>
              <p>Estrutura de dados totalmente livre, sem schema predefinido.</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-500 font-light mb-3">
          Tipos de campo suportados no modo Legacy:
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {FIELD_TYPES.map((t) => (
            <code
              key={t}
              className="text-[11px] font-mono bg-zinc-100 border border-zinc-200 px-2 py-1 rounded text-zinc-600"
            >
              {t}
            </code>
          ))}
        </div>

        {/* uiSchema */}
        <div className="rounded-md border border-zinc-200 p-4">
          <p className="text-xs font-bold text-zinc-700 mb-1">
            Campo{" "}
            <code className="font-mono bg-zinc-100 px-1 rounded">uiSchema</code>{" "}
            (Modo Avançado)
          </p>
          <p className="text-xs text-zinc-500 font-light leading-relaxed mb-3">
            Controla labels, tipos de widget e visibilidade de campos sem
            poluir o JSON de dados. Usa notação de ponto com suporte a
            wildcards:
          </p>
          <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
            <code>{`{
  "cards.*.image":       { "ui:widget": "image" },
  "cards.*.buttonText":  { "ui:label": "Texto do Botão" },
  "internalId":          { "ui:hidden": true }
}`}</code>
          </pre>
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
  "schema":    { ... },   // schemaData (estrutura ou JSON livre)
  "content":   { ... },   // contentData (modo legacy) ou null (modo avançado)
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
