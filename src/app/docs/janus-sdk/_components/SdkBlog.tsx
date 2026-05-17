export function SdkBlog() {
  return (
    <section aria-labelledby="blog-heading" className="mb-12">
      <h2
        id="blog-heading"
        className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2"
      >
        Métodos de blog
      </h2>
      <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8">
        Todos os métodos de blog comunicam com{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          GET /api/{"{tenantId}"}/blog/...
        </code>{" "}
        e sempre retornam{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          []
        </code>{" "}
        ou{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          null
        </code>{" "}
        em caso de erro — nunca lançam exceção. Seguros para uso em{" "}
        <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
          generateStaticParams
        </code>{" "}
        e builds estáticos.
      </p>

      {/* getPosts */}
      <section aria-labelledby="get-posts-heading" className="mb-8">
        <h3
          id="get-posts-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          getPosts(opts?)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Retorna posts publicados. Aceita filtros opcionais por categoria,
          destaque e limite. Sempre retorna{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            Post[]
          </code>
          .
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`// Todos os posts publicados (limite padrão: 50)
const posts = await janus.getPosts()

// Com filtros
const destaques  = await janus.getPosts({ featured: true })
const categoria  = await janus.getPosts({ categoryId: "abc123" })
const recentes   = await janus.getPosts({ limit: 6 })

// Tipagem de retorno:
// Post[]  (array vazio em caso de erro)

interface GetPostsOptions {
  categoryId?: string
  featured?:   boolean
  limit?:      number   // padrão: 50
}`}</code>
        </pre>
      </section>

      {/* getPost */}
      <section aria-labelledby="get-post-heading" className="mb-8">
        <h3
          id="get-post-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          getPost(slug)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Retorna um post pelo slug ou{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            null
          </code>{" "}
          se não encontrado. Chame{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            notFound()
          </code>{" "}
          após verificar o retorno.
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import { janus } from "@/lib/janus"
import { processHtmlBody } from "janus-sdk"

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await janus.getPost(params.slug)
  if (!post) notFound()

  const { processedHtml, headings } = processHtmlBody(post.htmlBody)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </article>
  )
}`}</code>
        </pre>
      </section>

      {/* getPostSlugs */}
      <section aria-labelledby="get-slugs-heading" className="mb-8">
        <h3
          id="get-slugs-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          getPostSlugs()
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Retorna todos os slugs publicados. Ideal para{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            generateStaticParams
          </code>{" "}
          — sempre retorna{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            string[]
          </code>
          , nunca lança.
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await janus.getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}`}</code>
        </pre>
      </section>

      {/* getRelatedPosts */}
      <section aria-labelledby="get-related-heading" className="mb-8">
        <h3
          id="get-related-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          getRelatedPosts(categoryId, excludeSlug)
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Retorna até 3 posts da mesma categoria, excluindo o slug informado.
          Sempre retorna{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            Post[]
          </code>
          .
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`const related = await janus.getRelatedPosts(
  post.category.id,
  post.slug,
)
// Post[]  (máximo 3 itens da mesma categoria)`}</code>
        </pre>
      </section>

      {/* getCategories */}
      <section aria-labelledby="get-cats-heading">
        <h3
          id="get-cats-heading"
          className="text-base font-bold text-zinc-900 mb-1"
        >
          getCategories()
        </h3>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-3">
          Retorna todas as categorias do tenant. Sempre retorna{" "}
          <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">
            CmsCategory[]
          </code>
          .
        </p>
        <pre className="bg-zinc-900 text-zinc-300 text-xs font-mono rounded-md p-4 overflow-x-auto leading-relaxed">
          <code>{`const categories = await janus.getCategories()

// CmsCategory[]
interface CmsCategory {
  id:           string
  name:         string
  slug?:        string
  description?: string
  image?:       string
}`}</code>
        </pre>
      </section>
    </section>
  );
}
