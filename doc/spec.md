# spec.md — Site Mavellium (front custom sobre o Janus headless)

Spec-Driven Development. Fonte da verdade do "o quê". O "como/quando" está em
`build-plan.md`. Contexto do app em `SITE-CLAUDE.md` (complementa o `CLAUDE.md`
raiz do Janus).

---

## 1. Objetivo e métrica

**Negócio:** transformar contatos (rede quente + tráfego) em diagnósticos pagos
(R$300–500), que qualificam para os planos recorrentes.

**Visibilidade:** fazer a Mavellium aparecer e ser citada quando alguém pergunta
a uma IA por GEO / "como aparecer no ChatGPT" / sites inteligentes no Brasil.

**Prova viva:** o site roda no Janus (Mavellium como tenant) — o próprio site é
demonstração da plataforma.

**KPIs:** conversão visitante → lead; citação/aparição em IA (IAG Score™ medido
no próprio site); crawl rate de bots de IA nos logs; Core Web Vitals
(LCP < 2.5s, INP < 200ms, CLS < 0.1).

---

## 2. Arquitetura de integração

```
[ Janus CMS (headless) ]
  - tenant "Mavellium" (projeto: site institucional)
  - conteúdo de páginas (contentData / schema-builder)
  - blog headless (artigos /conteudo)
  - casos (projetos/conteúdo)
  - mídia -> Bunny CDN
  - API REST pública: Cache-Control public, max-age=60, s-maxage=60
        |
        v   (consome só endpoints públicos)
[ App "site" (Next.js custom, mesmo monorepo) ]
  - SSG/ISR revalidate ~60s
  - design/funil/componentes bespoke
  - camada GEO (JSON-LD, robots, sitemap, llms.txt)
        |
        v
[ Bunny CDN edge cache de HTML ] -> visitantes e crawlers de IA
```

Regra: o app só toca os **endpoints públicos** do Janus (mapeados na Fase 0).
Sem acesso a banco ou módulos internos. Se faltar campo na API, **reportar e
parar**, não improvisar.

---

## 3. Modelo de conteúdo: o que vem do Janus × o que é código

| Seção / página | Fonte do conteúdo (Janus) | No código (front) |
|---|---|---|
| Home — copy de todas as seções | page content / contentData do projeto Mavellium | layout, ordem, componentes, gauge SVG |
| Planos (Presença/Visibilidade/Autoridade) | conteúdo estruturado no Janus (nome, preço fechado, bullets) | render dos cards, destaque do meio |
| Casos (`/casos`) | blog/projetos do Janus (situação, ação, resultado, print, depoimento) | grid, página de caso, schema |
| Blog (`/conteudo`) | **blog headless do Janus** (título, resumo, autor, data, body, tags) | índice, página de artigo, answer-first |
| `/metodo`, `/sobre` | page content do Janus | layout, seções |
| FAQ (home e /metodo) | conteúdo do Janus (lista Q&A) | render + FAQPage schema |
| Mídia (imagens, prints, OG) | URLs do **Bunny CDN** via Janus | `next/image` com loader do Bunny |

> A confirmar na Fase 0: a forma exata de `contentData`/page-schema e quais
> endpoints públicos entregam página, blog e casos.

---

## 4. Arquitetura de conteúdo (6 páginas)

### Home `/` — funil vertical (venda inteira numa rolada). Ordem importa:
1. **Hero** — promessa única ("Seu cliente já pergunta pra IA quem contratar.
   Você aparece?"), subheadline, CTA "Descubra seu IAG Score" → `/diagnostico`.
   Clareza em 3s, animação mínima.
2. **Barra de prova** — Tegbe ("A Tegbe aparece em 1º no ChatGPT"). Preparada
   para virar fileira de provas.
3. **O problema** — cria a dor da invisibilidade (2–3 frases).
4. **Solução + IAG Score™** — a métrica que mede e resolve; conceito em 1
   parágrafo. Diferencial proprietário.
5. **Como funciona** — 5 fases em versão curta/visual. Link → `/metodo`.
6. **Caso Tegbe (detalhado)** — antes/depois + print da resposta do ChatGPT.
7. **Para quem é** — qualifica ("estar online" vs "ser encontrado").
8. **Oferta/planos** — Presença/Visibilidade/Autoridade, **um preço fechado
   cada**, meio em destaque.
9. **CTA final + FAQ** — 6–8 perguntas reais (conversão + `FAQPage`).

### `/metodo` — autoridade técnica
GEO completo em linguagem de cliente: o que é aparecer na IA e por que agora; as
5 fases (cada uma **answer-first**); o que é o IAG Score™ e como se mede; por que
é contínuo (justifica mensalidade); CTA → `/diagnostico`. Tem que aparecer para
"como aparecer no ChatGPT" e "GEO no Brasil".

### `/casos` — prova social
Índice + página por caso (situação → ação → resultado + print). Tegbe em
destaque. Cada caso é página citável. Operacional: coletar depoimento +
autorização ao fechar cada cliente.

### `/diagnostico` — conversão (capriche mais que tudo)
Destino de TODOS os CTAs. Headline: "Descubra exatamente onde você aparece (e
onde some) nas respostas da IA." Lista o que recebe (IAG Score atual + mapa de
invisibilidade + quem aparece no lugar). Preço (R$300–500), baixa fricção.
**Form curto**: nome, WhatsApp, segmento, cidade. Prova (Tegbe) + quem está por
trás (Vinícius).

### `/sobre` — confiança + E-E-A-T
Vinícius Mota (história, porquê); equipe (Mateus, Raphael, papéis); origem do
método e do IAG Score™; foto e nome reais; tom direto e humano. Dá à IA "donos"
identificáveis.

### `/conteudo` — motor de GEO de longo prazo (blog headless do Janus)
Artigos respondendo perguntas reais ("como aparecer no ChatGPT", "o que é GEO",
"minha empresa não aparece na IA, e agora", "GEO para [segmento]"). Cada artigo:
**resposta direta no topo**, parágrafos curtos, fatos e números, autor nomeado,
data, CTA → diagnóstico. 1–2/mês (citação em IA tem validade de ~13 semanas).

---

## 5. Camada GEO técnica

### 5.1 Renderização
Conteúdo do Janus no HTML servido via SSG/ISR (`revalidate ~60`). Teste de
aceite: `curl` com UA de bot de IA retorna o texto completo.

### 5.2 JSON-LD por página (componente `<JsonLd>`, dados vindos do Janus)

| Página | Schemas |
|---|---|
| Home | `Organization` + `WebSite` + `LocalBusiness` + `Service` (lista) + `Offer` (planos) + `FAQPage` |
| `/metodo` | `Article`/`HowTo` + `DefinedTerm` (IAG Score™) + `FAQPage` |
| `/casos` | `CollectionPage` |
| `/casos/[slug]` | `Article` + `Review`/quote + `about` (organização cliente) |
| `/diagnostico` | `Service` + `Offer` + `WebPage` |
| `/sobre` | `AboutPage` + `Organization` (founder) + `Person` (Vinícius, Mateus, Raphael) |
| `/conteudo/[slug]` | `BlogPosting` + `author: Person` + `FAQPage` quando houver Q&A |

`Organization` global: nome, logo, url, `sameAs`, `areaServed` (Brasil),
`founder`, descrição factual com entidade nomeada.

### 5.3 robots.txt (`app/robots.ts`) — postura allow-all dos bots legítimos
Visibilidade é o modelo de negócio; bloquear training seria contraproducente
(queremos estar no corpus E na retrieval). Bytespider/scrapers abusivos: barrar
no **WAF/edge**, não aqui.

Liberar (Allow: /): `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`,
`Claude-SearchBot`, `Claude-User`, `anthropic-ai`, `PerplexityBot`,
`Perplexity-User`, `Googlebot`, `Google-Extended`, `Bingbot`, `Amazonbot`,
`Applebot`, `Applebot-Extended`, `Meta-ExternalAgent`, e `User-agent: *`.
Linha `Sitemap:`. Reauditar a cada trimestre; validar antes de subir.

### 5.4 Arquivos de IA e sitemap
- `public/llms.txt` (índice curado) e `public/llms-full.txt` (institucional em
  texto limpo)
- `app/sitemap.ts`: estáticas + casos + artigos (slugs vindos do Janus)

### 5.5 Metadata / OG
`generateMetadata` por página (title único, description factual, canonical, OG,
Twitter). Imagens OG do Bunny.

### 5.6 Conteúdo extraível
Um `<h1>` por página; answer-first no 1º parágrafo; listas/tabelas para fatos
comparáveis (planos, fases); datas e autoria visíveis.

---

## 6. Formulário de diagnóstico (`/diagnostico`)
- Campos: nome, WhatsApp (máscara BR), segmento, cidade. Mínima fricção.
- Zod (client + re-valida no server). Submit via **Server Action**.
- Destino do lead: registrar via API do Janus **se** houver endpoint de
  lead/guest adequado (confirmar na Fase 0); senão, atrás de uma interface
  plugável (e-mail/WhatsApp/Asaas).
- Honeypot + rate limit. Tela de confirmação pós-submit.

> ⚠️ Pagamento/Asaas e envio de mensagem são ações com efeito colateral:
> credenciais só em env, nunca commitar; disparo real só após aprovação
> (dry-run/log até lá).

---

## 7. Hospedagem / deploy
Mesma infra do Janus: Docker + Traefik (SSL automático), deploy via GitHub
Actions. O app do site sobe como serviço próprio no compose, atrás do Traefik,
com cache de borda de HTML no Bunny aproveitando os `Cache-Control` já
existentes. Recomendação de servidor segue a do Janus (Hetzner CX32 agora →
Magalu Cloud na escala).

---

## 8. Fora de escopo (v1)
- Three.js / scroll-storytelling cinematográfico.
- Área logada / dashboard de cliente no site.
- Multi-idioma (só PT-BR).
- Qualquer alteração no core do Janus além de cadastrar o tenant e (se preciso e
  aprovado) expor um campo que falte na API pública.