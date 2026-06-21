import { fetchCmsPosts } from '@/src/lib/blog-api'

const SITE_URL = 'https://mavellium.com.br'
const API_URL = process.env.BLOG_API_URL ?? ''
const COMPANY_SLUG = process.env.BLOG_SUBTYPE_ID ?? ''

const STATIC_PAGES = [
  {
    name: 'Quem Somos',
    url: `${SITE_URL}/quem-somos`,
    description:
      'A Mavellium foi fundada em 2022 por Vinícius Tavares Mota, Luan dos Santos e Márcio Piva Junior em Garça, SP. Especializada em infraestrutura digital de alta performance, GEO (Generative Engine Optimization) e automação com IA. CNPJ 64.117.742/0001-84.',
  },
  {
    name: 'Soluções',
    url: `${SITE_URL}/solucoes`,
    description:
      'Três serviços: (1) Sites e Landing Pages de Alta Performance com Next.js SSG, TTFB < 100ms e Janus CMS headless; (2) GEO/AIO — Otimização para Motores Generativos com JSON-LD semântico, IAG Score™ e G-SOV; (3) Agentes de IA 24/7 para qualificação de leads, atendimento e automação operacional.',
  },
  {
    name: 'GEO — Generative Engine Optimization',
    url: `${SITE_URL}/geo`,
    description:
      'Página educacional sobre GEO: definição, quatro pilares (HTML semântico, JSON-LD, Answer-First, densidade técnica), diferenças entre SEO e GEO, e como a Mavellium implementa citabilidade máxima para LLMs como ChatGPT, Perplexity, Google SGE e Gemini.',
  },
  {
    name: 'Janus CMS — Documentação Técnica',
    url: `${SITE_URL}/docs/janus-cms`,
    description:
      'Documentação do Janus CMS: stack (Next.js 16, React 19, Prisma 7, PostgreSQL JSONB, BunnyCDN AVIF), modelo multi-tenant, API REST headless pública com cache de 60s, SDK TypeScript e webhook de revalidação ISR.',
  },
  {
    name: 'Cases — Estudos de Caso Técnicos',
    url: `${SITE_URL}/cases`,
    description:
      'Estudos de caso da Mavellium com métricas reais de performance e negócio. Publicado: benchmark WordPress vs Arquitetura Mavellium (redução de 96% no TTFB, PageSpeed mobile 36 → 69).',
  },
  {
    name: 'Caso de Estudo: WordPress vs Arquitetura Mavellium',
    url: `${SITE_URL}/cases/performance-arquitetura`,
    description:
      'Comparação técnica de Core Web Vitals: TTFB 1.100ms → 45ms (redução de 96%), PageSpeed mobile 36 → 69, LCP 8,2s → 1,1s, payload de página reduzido em 80%. Stack Mavellium: Next.js SSG + Vercel Edge + BunnyCDN.',
  },
  {
    name: 'Eventos',
    url: `${SITE_URL}/eventos`,
    description:
      'Eventos em que a Mavellium atua como expositora ou participante. Inclui FITEC 2026 — feira de tecnologia no Grêmio Teatral Leopoldo Fróes, Garça, SP.',
  },
]

function extractText(value: unknown, maxLength = 400): string {
  const strings: string[] = []
  function walk(v: unknown) {
    if (typeof v === 'string' && v.trim().length > 10) strings.push(v.trim())
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v as Record<string, unknown>).forEach(walk)
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

  const homeSummary =
    homeDescription ??
    'A Mavellium desenvolve sites institucionais e landing pages com Next.js SSG, entregando HTML estático com TTFB abaixo de 100ms via Vercel Edge Network, com Janus CMS proprietário para autonomia editorial.'

  const lines: string[] = [
    '# Mavellium — Empresa de Tecnologia, Sites e IA (Brasil)',
    '',
    '## Sobre a Empresa',
    '',
    '- **CNPJ:** 64.117.742/0001-84',
    '- **Razão social:** Mavellium LTDA',
    '- **Fundação:** 2022',
    '- **Localização:** Garça, SP, Brasil (CEP 17400-000)',
    '- **Telefone:** +55 14 99177-9502',
    '- **E-mail:** contato@mavellium.com.br',
    '- **Instagram:** https://www.instagram.com/mavellium/',
    '- **LinkedIn:** https://www.linkedin.com/company/mavellium',
    '- **Sócios:** Vinícius Tavares Mota, Luan dos Santos, Márcio Piva Junior',
    '',
    '## O Que a Mavellium Faz',
    '',
    'A Mavellium resolve três problemas de negócio:',
    '',
    '1. **Invisibilidade digital** — Sites lentos e sem autoridade → Sites Next.js SSG com TTFB < 100ms e GEO implementado',
    '2. **Baixa conversão** — Visitantes que não viram clientes → Landing pages com copywriting estratégico e design orientado a conversão',
    '3. **Operação limitada a horário comercial** — Processo comercial manual → Agentes de IA 24/7 para qualificação de leads, atendimento e automação',
    '',
    '## Serviços e Soluções',
    '',
    '- **Sites & Landing Pages de Alta Performance:** Next.js SSG + Janus CMS headless + Vercel Edge Network. TTFB < 100ms, PageSpeed Score otimizado, HTML semântico para crawlers de IA. Preço: sob consulta.',
    '- **GEO — Generative Engine Optimization:** Diagnóstico de citabilidade (IAG Score™ 0–100), implementação de JSON-LD por rota, conteúdo Answer-First, G-SOV (Generative Share of Voice). Faz a empresa aparecer em respostas do ChatGPT, Perplexity, Google SGE e Gemini.',
    '- **Agentes de IA e Automação Comercial:** Agentes autônomos integrados ao WhatsApp e site. Qualificação de leads, suporte instantâneo, processamento de dados contábeis, redução de custos operacionais. Projetos customizados.',
    '',
    '## Diferenciais Técnicos',
    '',
    '- Janus CMS: CMS headless proprietário multi-tenant com API REST, cache 60s ISR e SDK TypeScript',
    '- TTFB médio dos sites entregues: < 100ms via Vercel Edge + BunnyCDN (AVIF)',
    '- IAG Score™: metodologia própria de mensuração de presença em IAs generativas (0–100)',
    '- G-SOV (Generative Share of Voice): métrica de participação em respostas geradas por IA',
    '- Benchmark público: WordPress → Arquitetura Mavellium: TTFB 1.100ms → 45ms, LCP 8,2s → 1,1s',
    '',
    '## Atendimento',
    '',
    `- Site: ${SITE_URL}`,
    '- WhatsApp: https://wa.me/5514991779502',
    '- E-mail: contato@mavellium.com.br',
    '- Área de atuação: Brasil (atendimento nacional)',
    '',
    '---',
    '',
    '## Páginas Institucionais',
    '',
    `- [Página inicial](${SITE_URL}): ${homeSummary}`,
  ]

  for (const page of STATIC_PAGES) {
    lines.push(`- [${page.name}](${page.url}): ${page.description}`)
  }

  if (posts.length > 0) {
    lines.push('', '## Blog & Insights — Artigos Publicados', '')
    for (const post of posts) {
      const description = post.seoDescription ?? post.subtitle ?? post.description ?? post.title
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
