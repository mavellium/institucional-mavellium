# build-plan.md — Plano de execução (Claude Code) — Site Mavellium sobre Janus

9 fases (0–8). **Cada fase termina com PARE e peça aprovação.** Cole o prompt da
fase, revise, aprove, só então avance. Escopo fechado por fase.

Pré-requisito: rodando **dentro do monorepo do Janus**. O Claude Code deve ler,
antes de qualquer fase: o `CLAUDE.md` da raiz, `.claude/context/` do Janus, o
`ARCHITECTURE.md`, o `SITE-CLAUDE.md` (deste app) e o `spec.md` do site.

---

## Fase 0 — Recon (read-only) + proposta de estrutura  ⟵ a mais importante

```
MODO: somente leitura. NÃO altere, crie ou delete nenhum arquivo nesta fase.

Leia o CLAUDE.md raiz, .claude/context/ do Janus, ARCHITECTURE.md, SITE-CLAUDE.md
e spec.md. Depois investigue o repo e produza um relatório (em markdown, só no
chat, sem gravar) cobrindo:

1. CONTRATO DA API PÚBLICA DO JANUS que o site vai consumir:
   - Endpoints públicos para: conteúdo de página (contentData/page-schema),
     blog headless (artigos), e casos/projetos.
   - Formato de resposta de cada um (campos, tipos), autenticação (se houver
     para leitura pública), e os headers de cache.
   - Como um tenant/projeto é identificado na chamada (id/slug/host).
   - Como as URLs de mídia do Bunny aparecem nas respostas.
   - Se existe endpoint adequado para registrar um lead/guest (para o
     /diagnostico) — se não existir, registre como pendência.

2. ESTRUTURA DO MONOREPO e proposta para o app novo:
   - Como o repo está organizado hoje (workspace? app único? ferramenta?).
   - Proposta de onde colocar o app do site (ex.: apps/site numa pnpm workspace)
     com o MENOR impacto possível no Janus, e o que precisa mudar na raiz
     (package.json/workspaces/tsconfig/CI) para isso.
   - Como o deploy do site entraria no compose Docker/Traefik + GitHub Actions
     existentes.

3. MAPA DE CONTEÚDO: para cada seção/página do spec (seção 3 e 4), de qual
   endpoint/campo do Janus o conteúdo virá. Aponte lacunas.

NÃO proponha código ainda. Entregue o relatório e PARE para aprovação da Fase 1.
```

---

## Fase 1 — Scaffold do app + camada de dados do Janus

```
ESCOPO: criar o app do site no monorepo (conforme estrutura aprovada na Fase 0)
e o client tipado da API pública do Janus. Nada de UI/páginas de conteúdo ainda.

- Criar o app Next.js 16 (App Router, TS strict, Tailwind 4) no caminho
  aprovado; ajustar workspace/tsconfig/CI da raiz com impacto mínimo no Janus.
- Camada de dados: client tipado para os endpoints públicos do Janus mapeados na
  Fase 0 (página, blog, casos). Tipos derivados do contrato real, não de
  suposição. Funções de fetch com cache/ISR (revalidate ~60) coerentes com o
  Cache-Control do Janus.
- Loader de imagem do next/image para o Bunny CDN.
- .env.example: base URL da API do Janus, id/slug do tenant Mavellium, chave do
  Bunny se necessário. Sem valores.
- Um teste de fumaça que busca o conteúdo do tenant Mavellium e loga os campos
  (prova de que a integração responde).

NÃO FAÇA: alterar core do Janus; componentes visuais; páginas.

Liste antes de codar. Ao terminar, PARE e peça aprovação para a Fase 2.
```

---

## Fase 2 — Design system e shell de layout

```
ESCOPO: tokens de design + layout global. Nada de páginas de conteúdo.

- Tokens (cores, tipografia, espaçamento, raios) no Tailwind 4 — marca de
  tecnologia séria e direta; clareza acima de animação.
- Header (nav: Método, Casos, Sobre, Conteúdo + CTA "Diagnóstico"), Footer
  (dados da empresa + redes para sameAs), container, tipografia base.
- Menu mobile acessível (Client Component só onde necessário).
- app/layout.tsx com metadata default, fontes, e slot de JsonLd global
  (Organization) — placeholder tipado, preenchido na Fase 6.

NÃO FAÇA: páginas reais; só uma rota de exemplo para ver o shell.

Liste antes de codar. PARE e peça aprovação para a Fase 3.
```

---

## Fase 3 — Componentes de seção (biblioteca)

```
ESCOPO: componentes reutilizáveis, com props tipadas pelos TIPOS do conteúdo do
Janus (Fase 1). Dados mockados conforme o shape real. SEM montar páginas.

Componentes (Server por padrão; Client só com interação):
- Hero, ProofBar, ProblemBlock
- IAGScoreExplainer (gauge/medidor em SVG leve, sem libs pesadas)
- MethodSteps (5 fases; versão curta e completa via prop)
- CaseCard / CaseStudy
- PlanCards (3 planos, preço fechado, destaque no meio)
- AudienceFit, FAQ (<details> semântico), CTASection
- LeadForm (UI apenas; lógica na Fase 7)

Acessível, semântico, responsivo. Exemplos numa rota /_dev (removida depois).

Liste antes de codar. PARE e peça aprovação para a Fase 4.
```

---

## Fase 4 — Páginas estáticas com dados do Janus (Home, /metodo, /sobre)

```
ESCOPO: montar Home, /metodo e /sobre compondo os componentes da Fase 3,
puxando o conteúdo real via a camada de dados do Janus (SSG/ISR revalidate ~60).

- Home: as 9 seções na ordem do spec; CTAs → /diagnostico.
- /metodo: answer-first por fase; seção do IAG Score; porquê-contínuo; CTA.
- /sobre: Vinícius, equipe, origem do método; tom humano e direto.
- Conteúdo vem do Janus; se algum campo faltar na API, REPORTE e pare (não
  hardcode texto que deveria ser editável).
- generateMetadata por página. JSON-LD ainda NÃO (Fase 6) — deixe os hooks.

NÃO FAÇA: /casos, /conteudo (Fase 5); /diagnostico (Fase 7).

Liste antes de codar. PARE e peça aprovação para a Fase 5.
```

---

## Fase 5 — Conteúdo dinâmico do Janus (/casos e /conteudo)

```
ESCOPO: índices e páginas de detalhe de /casos e /conteudo, consumindo o blog
headless e os casos/projetos do Janus.

- /casos (índice) e /casos/[slug]: situação → ação → resultado + print +
  depoimento, vindos do Janus.
- /conteudo (índice) e /conteudo/[slug]: blog headless do Janus; layout
  answer-first; autor e data visíveis; CTA → diagnóstico.
- generateStaticParams a partir dos slugs do Janus; ISR (revalidate ~60).
- generateMetadata por slug. JSON-LD ainda NÃO (Fase 6).
- Imagens via Bunny (next/image loader).

Liste antes de codar. PARE e peça aprovação para a Fase 6.
```

---

## Fase 6 — Camada GEO (coração do projeto)

```
ESCOPO: tornar o site legível e citável por IA. Sem mudança visual.

- lib/schema/: builders tipados de JSON-LD. <JsonLd> injetando no Server
  Component, com dados vindos do Janus.
- Schema correto por página (tabela da seção 5.2 do spec): Organization/WebSite/
  LocalBusiness/Service/Offer/FAQPage/Article/BlogPosting/Person/AboutPage/
  DefinedTerm.
- app/robots.ts: allow-all dos bots legítimos (seção 5.3 do spec) + Sitemap.
  (Bytespider/WAF é fora do código — documentar no README.)
- app/sitemap.ts: estáticas + casos + artigos (slugs do Janus).
- public/llms.txt e public/llms-full.txt (seção 5.4 do spec).
- Revisar metadata/OG de todas as páginas (canonical, imagens OG do Bunny).
- Garantir um <h1> único por página e hierarquia correta.

VALIDAÇÃO antes de fechar: cada JSON-LD num validador (sem erros); robots.txt e
sitemap.xml acessíveis e corretos.

Liste antes de codar. PARE e peça aprovação para a Fase 7.
```

---

## Fase 7 — Formulário de diagnóstico (conversão)

```
ESCOPO: lógica do LeadForm em /diagnostico.

- Página completa conforme spec (headline, o que recebe, preço, prova, form
  curto: nome, WhatsApp com máscara BR, segmento, cidade).
- Zod (client + re-valida no server). Submit via Server Action.
- Destino do lead: usar o endpoint de lead/guest do Janus SE a Fase 0 confirmou
  um adequado; senão, atrás de uma interface plugável (e-mail/WhatsApp/Asaas).
- Honeypot + rate limit básico. Tela de confirmação pós-submit.

REGRAS DE SEGURANÇA (não violar):
- Segredos só em env; nunca commitar.
- NÃO disparar mensagens/cobranças reais nesta fase — dry-run/log até eu aprovar
  e fornecer credenciais.
- Não alterar o Janus sem aprovação (se precisar de um endpoint de lead novo,
  REPORTE como pendência e pare).

Liste antes de codar. PARE e peça aprovação para a Fase 8.
```

---

## Fase 8 — QA de crawlability + deploy

```
ESCOPO: provar que uma IA enxerga o site como queremos, e subir. Sem features
novas.

- Para cada rota, via curl com User-Agent de ClaudeBot e de GPTBot, confirmar
  que o conteúdo factual completo (vindo do Janus) está no HTML servido, não só
  após hidratação. Reportar falhas.
- Confirmar que o ISR revalida sem furar o cache de borda do Bunny.
- Lighthouse em todas as rotas: SEO 100, Performance verde, a11y sem erros
  graves. Reportar números.
- Revalidar todos os JSON-LD; conferir <h1> único, metadata/OG, canonical,
  sitemap, robots, llms.txt.
- Checklist "definição de pronto" do SITE-CLAUDE.md por página.
- Preparar o deploy do app no compose Docker/Traefik + GitHub Actions (como os
  demais serviços do monorepo), sem subir ainda.

Entregue um RELATÓRIO (markdown) com status por rota, números de CWV/Lighthouse e
pendências. PARE e peça aprovação para o deploy real.
```

---

## Depois do v1 (backlog)
- Instrumentar log de user-agents de IA + medição do IAG Score™ no próprio site.
- Esteira de conteúdo: 1–2 artigos/mês (gerenciados no blog do Janus).
- WAF/edge (Cloudflare/Bunny) com regra para Bytespider e scrapers abusivos.
- Coleta sistemática de depoimento + autorização ao fechar cada cliente.
- Avaliar expor os blocos do schema-builder do Janus para editar mais seções do
  site sem deploy.