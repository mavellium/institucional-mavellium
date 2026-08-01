# CLAUDE.md — App do Site Mavellium (dentro do monorepo Janus)

Contexto do app do **site institucional da Mavellium**. Este arquivo
**complementa** o `CLAUDE.md` da raiz do monorepo Janus — não o substitui. Em
caso de conflito, as regras da raiz e de `.claude/context/` do Janus prevalecem.
Leia este arquivo + o `CLAUDE.md` raiz + o `spec.md` do site antes de qualquer
tarefa.

## O que é este app

Front-end **custom** do site da Mavellium (Garça-SP), que **consome a API REST
pública headless do Janus**. A Mavellium é cadastrada como um **tenant/projeto**
no próprio Janus — o site roda na nossa própria plataforma (isso é prova de
venda, não detalhe técnico).

Divisão de responsabilidade:
- **Janus (CMS)** gerencia o conteúdo editável: textos das seções, planos,
  casos e o blog `/conteudo` (blog headless nativo do Janus). Mídia via Bunny CDN.
- **Este app (front custom)** detém o design, o layout e os componentes de
  conversão (funil, gauge do IAG Score em SVG, etc.) e renderiza o conteúdo do
  Janus.

Objetivo duplo e inseparável: **converter** (funil → `/diagnostico`) e **ser
citável por IA** (ChatGPT, Gemini, Perplexity, Claude).

Regra de ouro: **se um crawler de IA não lê o conteúdo no HTML servido, ele não
existe.** Conteúdo do Janus tem que estar no HTML via SSG/ISR — nunca só após
hidratação no client.

## Stack

- **Next.js 16** (App Router, RSC, **SSG/ISR** com `revalidate ~60`s — casa com
  o `Cache-Control: public, max-age=60, s-maxage=60` que a API do Janus já emite)
- **TypeScript 5** (strict), **Tailwind CSS 4**
- **Camada de dados:** client tipado da **API pública do Janus** (sem acesso
  direto ao Postgres; só os endpoints públicos)
- **Mídia:** Bunny CDN (URLs vêm do Janus)
- **Formulário `/diagnostico`:** React Hook Form + Zod → Server Action → webhook
- **Motion** para animação leve — SEM Three.js, SEM GSAP
- **pnpm workspace** (estrutura exata a confirmar na recon da Fase 0)
- **Deploy:** mesma infra do Janus (Docker + Traefik, GitHub Actions); cache de
  borda de HTML via Bunny aproveitando os headers já existentes

## Integração com o Janus (regras)

1. Consumir **apenas a API pública** do Janus (a mapeada na Fase 0). Não acessar
   banco, módulos internos (`cms`, `projects`, etc.) nem actions privadas a
   partir do site.
2. Não alterar nada do Janus para fazer o site funcionar sem aprovação
   explícita. Se faltar um campo na API, **reporte e pare** — não improvise
   acesso interno.
3. Tipos do conteúdo derivam do contrato real da API (Fase 0), não de suposição.
4. `tenant`/`project` id da Mavellium e base URL da API ficam em env.

## Princípios inegociáveis

1. SSR/SSG sempre; Client Component só onde há interação (form, menu, toggles).
2. JSON-LD em toda página, construído a partir dos dados do Janus.
3. Conteúdo em sentenças declarativas e factuais, com entidades nomeadas.
4. Semântica HTML real; um `<h1>` por página.
5. Performance é GEO: Core Web Vitals verdes.

## Processo de trabalho (OBRIGATÓRIO)

- Uma fase por vez (ver `build-plan.md`).
- Ao fim de cada fase: **PARE e peça aprovação**. Não emende fases.
- Antes de codar, **liste o que vai fazer** e espere o "ok".
- Respeite o escopo da fase. Nada fora do escopo.
- Sem dependências novas sem justificar e aprovar.
- Nada que modifique o Janus sem aprovação explícita.

## Definição de "pronto" por página

- [ ] Renderiza no servidor com o conteúdo do Janus no HTML (`curl` confirma)
- [ ] JSON-LD válido do tipo correto
- [ ] `<title>`, meta description, Open Graph
- [ ] Um `<h1>` único e hierarquia correta
- [ ] Lighthouse SEO 100, Performance verde
- [ ] CTA para `/diagnostico` quando aplicável
- [ ] ISR revalidando (~60s) sem furar o cache de borda