import { fetchCmsPosts } from '@/lib/blog-api'

const SITE_URL = 'https://mavellium.com.br'
const API_URL = process.env.BLOG_API_URL ?? ''
const COMPANY_SLUG = process.env.BLOG_SUBTYPE_ID ?? ''

// Páginas ainda em JSX — descrições estáticas até migrarem para o Janus
const STATIC_PAGES = [
  {
    name: 'Quem Somos',
    url: `${SITE_URL}/quem-somos`,
    description:
      'A Mavellium é especializada em infraestrutura digital de alta performance e GEO. Fundadores: Vinícius Tavares Mota, Luan dos Santos e Márcio Piva Junior. CNPJ 48.802.866/0001-42 — Mavellium LTDA.',
  },
  {
    name: 'Soluções',
    url: `${SITE_URL}/solucoes`,
    description:
      'Três serviços: (1) Sites e Landing Pages de Alta Conversão com Next.js SSG + Janus CMS; (2) GEO/AIO — Otimização para Motores Generativos; (3) Ocupação de Espaço em IA para Vendas.',
  },
  {
    name: 'GEO — Generative Engine Optimization',
    url: `${SITE_URL}/geo`,
    description:
      'Definição técnica de GEO, os quatro pilares (HTML semântico, JSON-LD, Answer-First, densidade técnica) e como o Janus CMS + Next.js SSG entrega citabilidade máxima para LLMs.',
  },
  {
    name: 'Janus CMS — Documentação Técnica',
    url: `${SITE_URL}/docs/janus-cms`,
    description:
      'Documentação de engenharia do Janus CMS: stack (Next.js 16, React 19, Prisma 7, PostgreSQL JSONB, BunnyCDN), modelo multi-tenant, API REST headless pública com cache de 60s e SDK TypeScript.',
  },
  {
    name: 'Cases — Estudos de Caso Técnicos',
    url: `${SITE_URL}/cases`,
    description:
      'Coleção de estudos de caso da Mavellium. Publicado: benchmark WordPress vs Arquitetura Mavellium.',
  },
  {
    name: 'Caso de Estudo: WordPress vs Arquitetura Mavellium',
    url: `${SITE_URL}/cases/performance-arquitetura`,
    description:
      'Comparação de Core Web Vitals: redução de 96% no TTFB (1.100ms → 45ms), PageSpeed mobile 36 → 69, redução de 80% no payload.',
  },
  {
    name: 'Eventos',
    url: `${SITE_URL}/eventos`,
    description: 'Eventos em que a Mavellium atua como expositora ou participante.',
  },
]

// Extrai texto legível de contentData (JSON livre do page builder do Janus)
function extractText(value: unknown, maxLength = 400): string {
  const strings: string[] = []

  function walk(v: unknown) {
    if (typeof v === 'string' && v.trim().length > 10) {
      strings.push(v.trim())
    } else if (Array.isArray(v)) {
      v.forEach(walk)
    } else if (v && typeof v === 'object') {
      Object.values(v as Record<string, unknown>).forEach(walk)
    }
  }

  walk(value)
  return strings.join(' ').slice(0, maxLength)
}

async function fetchHomeDescription(): Promise<string | null> {
  if (!API_URL || !COMPANY_SLUG) return null
  try {
    const res = await fetch(`${API_URL}/api/v1/content/${COMPANY_SLUG}/home`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { content?: unknown; schema?: unknown }
    const raw = data.content ?? data.schema
    if (!raw) return null
    return extractText(raw) || null
  } catch {
    return null
  }
}

export async function GET() {
  const [posts, homeDescription] = await Promise.all([
    fetchCmsPosts({ limit: 100 }),
    fetchHomeDescription(),
  ])

  const intro =
    homeDescription ??
    'Mavellium é especializada em infraestrutura digital de alta performance e GEO (Generative Engine Optimization). Desenvolve sites institucionais e landing pages com Next.js SSG + Janus CMS, entregando HTML estático com TTFB abaixo de 100ms via Vercel Edge Network.'

  const lines: string[] = [
    '# Mavellium',
    '',
    `> ${intro}`,
    '',
    '## Páginas institucionais',
    '',
    `- [Página inicial](${SITE_URL}): ${intro}`,
  ]

  for (const page of STATIC_PAGES) {
    lines.push(`- [${page.name}](${page.url}): ${page.description}`)
  }

  if (posts.length > 0) {
    lines.push('', '## Blog & Insights', '')
    for (const post of posts) {
      const description = post.seoDescription ?? post.subtitle ?? post.title
      lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${description}`)
    }
  }

  lines.push('')

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  })
}
