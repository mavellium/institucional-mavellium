import { fetchCmsPosts } from '@/lib/blog-api'

const SITE_URL = 'https://mavellium.com.br'

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export async function GET() {
  const posts = await fetchCmsPosts({ limit: 100 })

  const lines: string[] = [
    '# Mavellium — Conteúdo Completo',
    '',
    '> Este documento contém o texto integral dos artigos publicados no blog da Mavellium,',
    '> gerado dinamicamente a partir do Janus CMS.',
    '',
    '---',
    '',
  ]

  for (const post of posts) {
    lines.push(`# ${post.title}`)
    lines.push(`URL: ${SITE_URL}/blog/${post.slug}`)
    if (post.subtitle) lines.push(`Subtítulo: ${post.subtitle}`)
    if (post.seoDescription) lines.push(`Descrição: ${post.seoDescription}`)
    if (post.publishedAt) lines.push(`Publicado em: ${post.publishedAt}`)
    lines.push('')
    if (post.body) {
      lines.push(stripHtml(post.body))
    }
    lines.push('', '---', '')
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  })
}
