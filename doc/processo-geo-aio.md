# Processo GEO / AIO — Playbook Mavellium

**Versão:** 1.0 — Junho 2026
**Uso:** Interno — equipe de execução e vendas

---

## O que é GEO / AIO?

**GEO (Generative Engine Optimization)** — também chamado de **AIO (AI Optimization)** — é o processo de otimizar um site para que empresas sejam citadas e recomendadas em respostas geradas por Inteligência Artificial (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude).

**Diferença do SEO clássico:**

| | SEO Clássico | GEO / AIO |
|-|-|-|
| Objetivo | Aparecer nos links azuis do Google | Ser citado nas respostas geradas por IA |
| Como funciona | Crawlers do Google indexam e ranqueiam páginas | LLMs rastreiam, leem e extraem entidades do site |
| Resultado | Posição no ranking de busca | Menção direta nas respostas das IAs |
| Métrica | Posição, clicks, impressões | IAG Score™, G-SOV (Generative Share of Voice) |

---

## Etapa 1 — Diagnóstico e Auditoria Inicial

**O que fazer:**
- Mapear todas as páginas do site do cliente (sitemap ou crawl manual)
- Verificar se `robots.txt` existe e se bloqueia crawlers de IA
- Verificar se há JSON-LD no site (Organization, WebSite, Service)
- Identificar gaps técnicos: broken links, páginas órfãs, placeholders em schema, `alt` faltando em imagens, datas em formato inválido
- Testar manualmente se a empresa já aparece em IAs: perguntar pelo nome e pelo problema que ela resolve no ChatGPT, Perplexity e Gemini
- Registrar o IAG Score™ inicial (baseline) para comparação após a implementação

**Resultado entregue:** Relatório de diagnóstico com lista priorizada de gaps e IAG Score™ atual

**Tempo médio:** 3–5 horas

---

## Etapa 2 — Rastreabilidade para Crawlers de IA

**O que fazer:**
- Atualizar `public/robots.txt` com permissões explícitas para todos os crawlers de IA relevantes:
  - `GPTBot` (OpenAI / ChatGPT)
  - `ChatGPT-User`
  - `OAI-SearchBot`
  - `Claude-Web` (Anthropic)
  - `anthropic-ai`
  - `PerplexityBot`
  - `Google-Extended` (Gemini / SGE)
  - `Gemini-Web-Extension`
  - `CCBot`
  - `Applebot-Extended`
  - `Bytespider`
- Criar/atualizar `sitemap.xml` com todas as URLs válidas e datas de modificação reais
- Referenciar o sitemap no `robots.txt` (`Sitemap: https://dominio.com.br/sitemap.xml`)
- Testar acesso ao `robots.txt` e ao `sitemap.xml` em produção via browser

**Por que importa:** Sem permissão explícita, crawlers como GPTBot simplesmente não rastreiam o site. O conteúdo nunca entra nos ciclos de treinamento nem nas recuperações RAG em tempo real.

**Tempo médio:** 1–2 horas

---

## Etapa 3 — Identidade de Entidade (JSON-LD / Schema.org)

**O que fazer:**

Implementar no layout raiz (envolve todas as páginas):

**`Organization`** completo:
```json
{
  "@type": ["Organization", "ProfessionalService"],
  "name": "Nome da Empresa",
  "legalName": "Razão Social LTDA",
  "taxID": "XX.XXX.XXX/0001-XX",
  "foundingDate": "AAAA",
  "slogan": "...",
  "url": "https://dominio.com.br",
  "telephone": "+55-XX-XXXXX-XXXX",
  "email": "contato@dominio.com.br",
  "address": { ... },
  "geo": { "latitude": -XX.XXXX, "longitude": -XX.XXXX },
  "sameAs": ["https://instagram.com/...", "https://linkedin.com/company/..."],
  "founder": [{ "@type": "Person", "name": "..." }],
  "knowsAbout": ["Serviço A", "Serviço B"],
  "areaServed": { "@type": "Country", "name": "Brasil" },
  "hasOfferCatalog": { ... }
}
```

**`WebSite`** com SearchAction:
```json
{
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dominio.com.br/blog?q={search_term_string}"
  }
}
```

**`Service`** em cada página de solução com descrição técnica real.

**Regras de qualidade:**
- Nunca incluir `Offer` com `priceCurrency` sem `price` (schema inválido)
- Nunca deixar campos obrigatórios vazios ou com placeholder `[INSERIR_...]`
- Datas sempre em ISO 8601: `YYYY-MM-DD`

**Por que importa:** LLMs constroem grafos de conhecimento sobre entidades. Um schema rico e sem erros é a forma mais direta de comunicar "quem é essa empresa" para os modelos — é como o cartão de identidade da empresa para a IA.

**Tempo médio:** 4–8 horas (varia com a quantidade de serviços e páginas)

---

## Etapa 4 — Arquivo `llms.txt` (Answer-First Content)

**O que fazer:**
- Criar a rota `/llms.txt` no site (arquivo de texto puro ou rota dinâmica)
- Estrutura obrigatória em formato Answer-First:

```
# [Nome da Empresa]
> [1 frase: o que a empresa faz e para quem]

## Fatos Objetivos
- CNPJ: ...
- Fundação: ...
- Sede: ...
- Telefone: ...
- Email: ...

## Problemas que Resolve
### Problema 1: [Nome]
[Descrição do problema] → [Como a empresa resolve]

## Serviços
### [Nome do Serviço]
[Descrição técnica com métricas reais]

## Diferenciais
- [Diferencial com dado quantificável]

## Contato
- WhatsApp: ...

## Páginas do Site
- [Título](https://dominio.com.br/pagina)

## Artigos Recentes
- [Título do Artigo](https://dominio.com.br/blog/slug)
```

**Por que importa:** O padrão `llms.txt` foi criado especificamente para que LLMs consumam conteúdo empresarial sem precisar interpretar HTML/CSS/JS. Perplexity e crawlers especializados já buscam esse arquivo ativamente.

**Tempo médio:** 2–4 horas

---

## Etapa 5 — Conteúdo Estruturado por Rota

**O que fazer:**

**Homepage:**
- `FAQPage` JSON-LD com mín. 5 perguntas reais que clientes fazem (não genéricas)
- Filtrar respostas vazias antes de gerar o schema

**Página de Blog (listagem):**
- `Blog` schema
- `BreadcrumbList`: Início → Blog

**Cada artigo de blog:**
- `BlogPosting` completo: `headline`, `description`, `datePublished`, `dateModified`, `author`, `publisher`, `articleSection`, `image`
- `BreadcrumbList`: Início → Blog → Categoria → Artigo
- Todos os `ListItem` do breadcrumb com `item` (URL) preenchido — inclusive o último

**Todas as páginas de nível 2+:**
- `BreadcrumbList` com URL em todos os itens

**Layout raiz:**
- OG Image dinâmica (`1200×630px`) gerada com `next/og` ou equivalente
- `metadataBase` apontando para o domínio de produção
- Twitter/X Card: `summary_large_image`

**Por que importa:** FAQ schema alimenta respostas diretas das IAs ("AI Overviews"). Blog com `BlogPosting` e autoria reforça E-E-A-T — o sinal que Gemini e SGE usam para decidir quais fontes citar.

**Tempo médio:** 4–8 horas

---

## Etapa 6 — SEO Técnico Base (pré-requisito de autoridade)

**O que fazer:**

| Problema | Ação |
|----------|------|
| Links internos quebrados | Corrigir href ou remover o link |
| Imagens sem `alt` | Adicionar descrição real (não genérica) |
| Títulos > 70 caracteres | Encurtar mantendo palavra-chave principal |
| Meta descriptions fora de 130–160 chars | Ajustar |
| Páginas sem link interno (órfãs) | Adicionar ao footer, nav ou artigo relacionado |
| Links de âncora entre páginas (`#section`) | Prefixar com `/` → `/#section` |
| Datas de evento em `DD/MM/YYYY` | Converter para ISO 8601 `YYYY-MM-DD` |
| Páginas 404 linkadas no nav/footer | Criar a página ou corrigir o link |

**Por que importa:** Perplexity e Google SGE usam os índices do Google e do Bing como base de recuperação. Um site com erros técnicos básicos tem autoridade depreciada nos índices — menor chance de ser citado.

**Tempo médio:** 3–6 horas

---

## Etapa 7 — Validação e Controle de Qualidade

**O que verificar antes de entregar:**

- [ ] Google Rich Results Test em todas as páginas com schema dinâmico (home, blog, artigos, soluções, eventos)
- [ ] Schema Markup Validator (`validator.schema.org`) nas páginas principais — zero erros
- [ ] `robots.txt` acessível em produção: `https://dominio.com.br/robots.txt`
- [ ] `llms.txt` acessível em produção: `https://dominio.com.br/llms.txt`
- [ ] `sitemap.xml` acessível e sem URLs 404
- [ ] Build TypeScript sem erros (`tsc --noEmit`)
- [ ] Build de produção limpo (`npm run build`)
- [ ] Teste manual de menção nas IAs: perguntar pelo nome da empresa e pelo problema que ela resolve no ChatGPT (modo web), Perplexity e Gemini

**Tempo médio:** 2–3 horas

---

## Etapa 8 — Monitoramento Contínuo (pós-entrega)

**O que fazer a cada mês:**

**IAG Score™** — Índice de Aparecimento em IAs Generativas:
1. Definir 10 perguntas-chave relacionadas ao negócio do cliente (ex.: "Qual empresa desenvolve sites institucionais em Garça SP?", "Quem faz automação com IA no interior de São Paulo?")
2. Fazer as perguntas no ChatGPT, Perplexity e Gemini
3. Registrar quantas mencionam o cliente: `IAG Score™ = (menções / total de perguntas testadas) × 100%`

**G-SOV** — Generative Share of Voice:
1. Definir as mesmas perguntas usadas para a empresa do cliente
2. Verificar se os concorrentes diretos são mencionados nas mesmas respostas
3. Calcular: `G-SOV = menções do cliente / (menções do cliente + menções dos concorrentes)`

**Ações recorrentes:**
- Publicar ao menos 1 artigo de blog por mês com `BlogPosting` schema completo
- Reportar IAG Score™ e G-SOV ao cliente mensalmente
- Verificar Google Search Console: erros de rastreamento, novas páginas indexadas

**Tempo médio:** 1–2 horas/mês

---

## Resumo de Tempo

| Fase | Etapas | Tempo Estimado |
|------|--------|----------------|
| Diagnóstico | Etapa 1 | 3–5 h |
| Execução técnica | Etapas 2–6 | 14–28 h |
| Validação | Etapa 7 | 2–3 h |
| **Total do projeto** | | **19–36 horas** |
| Manutenção mensal | Etapa 8 | 1–2 h/mês |

---

## Tempo até o Cliente Aparecer nas IAs

| Plataforma de IA | Como funciona | Tempo estimado |
|------------------|---------------|----------------|
| **Perplexity** | Crawl próprio + Bing em tempo quase real (RAG) | 1–4 semanas |
| **ChatGPT com busca web** | Bing Search API em tempo real (RAG) | 1–4 semanas |
| **Google AI Overviews (SGE)** | Re-indexação Google + atualização do modelo SGE | 4–12 semanas |
| **Gemini (Google)** | Re-indexação Google + ciclo de atualização do modelo | 4–12 semanas |
| **Claude (Anthropic)** | Ciclo de treinamento não público | ? |
| **ChatGPT sem busca web** | Ciclo de treinamento OpenAI (meses/anos) | ? |
| **Llama / modelos open-source** | Depende do dataset do fine-tuning | ? |

> **Observação:** O impacto mais rápido e mensurável vem de **Perplexity** e do **ChatGPT no modo de busca web**, pois usam RAG (recuperação em tempo real). Para modelos sem acesso à web, o aparecimento depende do próximo ciclo de treinamento — sem prazo público e sem garantia de inclusão.

> **Fator acelerador:** Publicação constante de conteúdo novo com `BlogPosting` schema aumenta a frequência de revisita dos crawlers, reduzindo a latência entre publicação e citação pela IA.

---

## Checklist de Entrega (resumo rápido)

- [ ] `robots.txt` com 11+ crawlers de IA liberados
- [ ] `sitemap.xml` atualizado e referenciado no robots.txt
- [ ] `llms.txt` com conteúdo Answer-First
- [ ] `Organization` JSON-LD completo e sem erros no layout raiz
- [ ] `FAQPage` na homepage (mín. 5 Q&As)
- [ ] `BlogPosting` em todos os artigos com BreadcrumbList completo
- [ ] `Service` em páginas de soluções
- [ ] OG Image dinâmica + metadataBase + Twitter Card
- [ ] Zero broken links internos
- [ ] Zero `<img>` sem `alt`
- [ ] Títulos ≤ 70 caracteres
- [ ] Datas ISO 8601 em todos os schemas de Event
- [ ] Google Rich Results Test: zero erros
- [ ] IAG Score™ baseline registrado
