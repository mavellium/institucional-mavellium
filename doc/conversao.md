# Spec — Instrumentação de conversão e correções do site Mavellium

**Objetivo:** tornar mensurável o funil do site (visitante → interesse → lead) e eliminar as falhas estruturais identificadas na análise de dados do PostHog (90 dias, 137 visitantes, 1 evento de conversão instrumentado).

**Contexto do diagnóstico que originou esta spec:**
- Único evento de conversão existente: `conv_whatsapp_click` (8 disparos em 180 dias).
- Nenhum evento de formulário, CTA de plano ou navegação para Raio-X.
- 64% das entradas caem na home; blog gera ~30 entradas em 90 dias com rejeição de 71% a 100% em várias URLs.
- Duas URLs publicadas para o mesmo artigo (GPR vs Share of Voice), dividindo autoridade.
- Landing `/raio-x` existe no HubSpot mas não está publicada e não recebe tráfego.

---

## 0. Premissas — já verificadas no repositório

> Esta seção foi verificada diretamente no código (`c:\temp\MONOREPO\institucional-mavellium`) antes de qualquer execução. Os vereditos abaixo são fonte de verdade para o resto da spec.

| # | Premissa | Veredito | Evidência |
|---|---|---|---|
| P1 | Site é Next.js (App Router) hospedado na Vercel | **Confirmada** (corrigido — ver nota abaixo) | Next.js 16.2.1 App Router (`package.json`, `src/app/`). `doc/CLAUDE.md` afirma Docker + Traefik, mas os headers HTTP do site em produção (`curl -sI https://www.mavellium.com.br/`) confirmam `Server: Vercel`, `X-Vercel-Id`, `X-Vercel-Cache` — é Vercel de fato. `doc/CLAUDE.md` está desatualizado nesse ponto (fora do escopo desta spec corrigir o arquivo dele mesmo). |
| P2 | O PostHog já está inicializado no client | **Confirmada** | `src/components/PostHogProvider.tsx` chama `posthog.init(...)`, montado em `src/app/layout.tsx`. Proxy `/ingest/*` já em `next.config.mjs`. Já dispara `$pageview` manual e `conv_whatsapp_click` (hardcoded ali dentro). |
| P3 | O formulário do Raio-X é um embed do HubSpot Forms | **Refutada** | Formulário React nativo (`src/components/ui/qualification-form.tsx`). O submit (`submitQualificationForm` em `src/lib/hubspot-form.ts`) faz `fetch` direto do client para a API de submissão do HubSpot — sem iframe, sem `postMessage`. Não existe rota `/raio-x` nem `/diagnostico`: é a seção `QualificationFormSection` (`id="diagnostico"`) ancorada na home, acessada via `/#diagnostico`. "Raio-X" é o nome do produto/oferta (copy do CTA, constante `HUBSPOT_RAIOX_FORM_GUID`), não uma página — os nomes de evento `conv_raio_x_*` continuam válidos, só o destino muda para `/#diagnostico`. |
| P4 | Existe um arquivo central de analytics/provider | **Parcial** | Existe o provider (`PostHogProvider.tsx`), mas `lib/analytics.ts` **não existe** — precisa ser criado do zero, migrando `conv_whatsapp_click` para dentro dele. |
| P5 | Os artigos do blog são MDX/arquivos ou vêm de CMS | **Confirmada (CMS)** | `src/app/blog/[slug]/page.tsx` + `src/lib/blog-api.ts` buscam via API pública do Janus (`JanusPost`/`JanusResponse`). Rota é `/blog` (índice + `[slug]`), SSG com `revalidate = 10`. Zero MDX. |

**Chave do projeto PostHog:** `phc_vHp5mWs9e9qFBxXXNfJmVC7cvNUGTSXQKpSHXCJvWdgA` (projeto 445129, host `us.posthog.com`). Não hardcodar — usar variável de ambiente. Se a variável já existir com outro nome, manter o nome existente.

---

## 1. Camada de analytics centralizada

**Problema atual:** eventos disparados ad hoc, sem contrato de nomes nem tipagem. Hoje só existe `conv_whatsapp_click`, hardcoded dentro de `src/components/PostHogProvider.tsx` (listener genérico de clique em links `wa.me`), sem propriedades úteis e sem módulo dedicado. `lib/analytics.ts` precisa ser criado do zero — o evento existente deve ser migrado para dentro dele.

**Entregar:** um módulo único que seja a *única* forma de disparar evento no projeto.

### Arquivo: `lib/analytics.ts`

Requisitos:

1. Exportar um enum/union type `AnalyticsEvent` com todos os nomes de evento definidos na seção 2. Nenhuma string solta no resto do código.
2. Exportar `track(event: AnalyticsEvent, props?: Record<string, unknown>)` que:
   - injeta automaticamente as propriedades globais da seção 1.1;
   - faz no-op silencioso em ambiente de desenvolvimento **a menos que** `NEXT_PUBLIC_ANALYTICS_DEBUG=true`, caso em que loga no console em vez de enviar;
   - nunca lança exceção que quebre a UI (envolver em try/catch).
3. Exportar `identify(email: string, traits?: Record<string, unknown>)`.
4. Ser importável tanto em client components quanto em handlers de script externo.

### 1.1 Propriedades globais em todo evento

| Propriedade | Origem | Exemplo |
|---|---|---|
| `page_path` | `window.location.pathname` | `/blog/geo-e-a-mesma-coisa-que-seo` |
| `page_type` | derivado da rota | `home`, `blog_post`, `blog_index`, `solucoes`, `cases`, `quem_somos`, `docs`, `eventos`, `outro` (sem `raio_x` — não é uma rota própria, é a âncora `/#diagnostico` dentro de `home`) |
| `cta_location` | passado pelo chamador | `hero`, `meio_artigo`, `fim_artigo`, `header`, `footer`, `secao_planos`, `sticky_mobile` |

`page_type` deve ser calculado por uma função pura `getPageType(pathname: string)` exportada e testada — não inferida em cada componente.

---

## 2. Contrato de eventos

Implementar exatamente estes nomes. **Não criar variações, não renomear, não abreviar.** Nomes em snake_case, prefixo `conv_` reservado para eventos que representam intenção comercial real.

### 2.1 Eventos de conversão (intenção comercial)

| Evento | Dispara quando | Propriedades específicas |
|---|---|---|
| `conv_raio_x_cta_click` | clique em qualquer CTA que leve à seção do Raio-X (âncora `/#diagnostico` na home) | `cta_text` (texto do botão), `destination` (URL, ex.: `/#diagnostico`) |
| `conv_raio_x_form_start` | primeiro foco em qualquer campo do formulário do Raio-X (`QualificationForm`) | `form_id` |
| `conv_raio_x_form_submit` | submissão bem-sucedida do formulário | `form_id`, `dominio_empresa` (domínio extraído do e-mail, **não** o e-mail) |
| `conv_whatsapp_click` | já existe — manter o nome, adicionar as props globais | `cta_location` |
| `conv_plano_cta_click` | clique em CTA dentro da seção de planos | `plano` (`presenca` \| `autoridade` \| `dominancia` \| `enterprise`) |
| `conv_contato_email_click` | clique em link `mailto:` | — |

### 2.2 Eventos de engajamento (diagnóstico, não conversão)

| Evento | Dispara quando | Propriedades específicas |
|---|---|---|
| `artigo_scroll_50` | leitor atinge 50% da altura do artigo | `slug`, `titulo` |
| `artigo_scroll_90` | leitor atinge 90% da altura do artigo | `slug`, `titulo` |
| `artigo_leitura_completa` | 90% de scroll **e** ≥ 45s na página | `slug`, `titulo`, `tempo_segundos` |
| `nav_blog_para_site` | clique, a partir de um artigo, em qualquer link interno que não seja outro artigo | `slug_origem`, `destino` |
| `secao_planos_visivel` | seção de planos entra no viewport por ≥ 2s | — |

**Regras de disparo:**
- Cada evento de scroll dispara **uma vez por sessão por slug**. Usar um `Set` em memória no módulo de analytics (não localStorage — artifacts e SSR à parte, é estado de sessão simples).
- Eventos de scroll só em rotas `/blog/[slug]`.
- `secao_planos_visivel` via `IntersectionObserver` com `threshold: 0.5` e debounce de 2s.

### 2.3 O que **não** instrumentar

Não adicionar autocapture de cliques genéricos, não capturar conteúdo de campos de formulário, não enviar e-mail, telefone ou nome como propriedade de evento. Apenas o domínio da empresa, conforme tabela acima.

---

## 3. Ponte HubSpot → PostHog

**Este é o item de maior valor da spec.** Hoje o visitante desaparece exatamente no momento da conversão porque não há tracking nenhum na submissão do formulário.

**Não é um embed/iframe.** O formulário (`src/components/ui/qualification-form.tsx`, componente `QualificationForm`) é React nativo. O envio (`submitQualificationForm` em `src/lib/hubspot-form.ts`) faz `fetch` **direto do client** para a API de submissão do HubSpot (`POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`). Não há `postMessage` para interceptar — a instrumentação entra direto no código que já existe.

### 3.1 Captura da submissão

Instrumentar diretamente no fluxo do formulário, sem listener de `message`:

- **Início:** no primeiro `onFocus` de qualquer campo do form, disparar `conv_raio_x_form_start` uma única vez por sessão de preenchimento.
- **Submissão:** envolver a chamada a `submitQualificationForm()` (ou o `handleSubmit` que a invoca em `qualification-form.tsx`) — ao resolver com sucesso, disparar `conv_raio_x_form_submit`.

Requisitos:
- `form_id`: usar a constante já existente `HUBSPOT_RAIOX_FORM_GUID` de `src/lib/hubspot-form.ts` (é first-party, não precisa validar origem nem comparar payload — o valor já é conhecido em build/runtime).
- `dominio_empresa`: extrair do campo `email` do próprio `FormData` do submit (parte após `@`), **não** do e-mail completo.
- Disparar o evento só após a Promise do `fetch` resolver com sucesso (não em `onSubmit` do form, que dispara antes da confirmação da API).

### 3.2 Identificação

Na submissão bem-sucedida, chamar `identify(email)` com:
- `email` — do campo do próprio formulário (`FormData`)
- `dominio_empresa`

**Correção em relação à primeira versão desta spec:** ela pedia para passar `primeira_origem` a partir de `$initial_channel_type`. Verificado no bundle de `posthog-js` (`node_modules/posthog-js/dist/array.full.js`) — não existe essa chave no client. `$channel_type`/`$initial_channel_type` é um valor **computado no servidor em tempo de query** (a partir dos `$initial_utm_*`/`$initial_referrer` já capturados automaticamente), não uma propriedade persistida localmente que dê para ler via `get_property()`. Não tem como "passar" isso no `identify()`.

Isso também não é necessário: `posthog.identify(email)` faz merge do `distinct_id` anônimo (que já carrega os `$initial_*` capturados automaticamente pelo autocapture antes da submissão) com a pessoa identificada. O PostHog computa `$initial_channel_type` a partir desses dados já mesclados — de graça, sem nenhum código adicional. `identify(email)` sozinho já é o que amarra a sessão anônima ao contato do HubSpot e permite responder "de onde veio o lead que fechou".

---

## 4. CTAs para o Raio-X

**Problema:** não existe caminho do conteúdo para a oferta. Artigos com 100% de rejeição são artigos sem saída.

### 4.1 Componente `<RaioXCTA />`

Criar componente reutilizável com duas variantes:

- `variant="inline"` — bloco compacto, para inserção no meio do artigo
- `variant="destaque"` — bloco maior, para o fim do artigo e para páginas institucionais

Props: `variant`, `location` (repassado como `cta_location`), `titulo?`, `texto?` para override do copy padrão.

Comportamento: ao clicar, dispara `conv_raio_x_cta_click` e navega para `/#diagnostico` (âncora da seção `QualificationFormSection` na home — não existe página própria de Raio-X).

> **Copy:** usar placeholder marcado como `TODO_COPY` no componente. O texto definitivo será escrito à parte — não inventar promessas, números ou resultados. Nenhum CTA pode conter métrica não medida.

### 4.2 Inserção nos artigos

- Variante `inline` após aproximadamente 40% do conteúdo do artigo. Conteúdo vem do Janus CMS (`src/lib/blog-api.ts`, tipos `JanusPost`) — calcular o ponto de inserção por contagem de blocos no corpo renderizado, não editar artigo por artigo.
- Variante `destaque` ao fim de todo artigo, automaticamente no layout `src/app/blog/[slug]/page.tsx`, sem necessidade de editar cada artigo no CMS.
- Bloco de "próximos artigos" ao fim, com 3 links para artigos relacionados — hoje o leitor não tem para onde ir.

### 4.3 Demais páginas

Adicionar CTA de Raio-X em: `/`, `/solucoes`, `/cases`, `/blog` (índice), `/quem-somos`. Cada um com seu `cta_location` distinto.

---

## 5. Correções de SEO/GEO

### 5.1 Consolidação de URLs duplicadas

Existem duas URLs para o mesmo artigo:
- `/blog/gpr-vs-share-of-voice-qual-metrica-importa-na-era-da-ia` (11 entradas orgânicas — **canônica**)
- `/blog/gpr-generative-presence-rate-vs-share-of-voice-tradicional-qual-metrica-importa-na-era-da-ia` (2 entradas — redirecionar)

**Feito:** redirect 301 permanente da segunda para a primeira, adicionado em `next.config.mjs`.

**Auditoria de outras duplicatas — não foi possível completar.** Não há `BLOG_PROJECT_ID`/credenciais da API do Janus configuradas neste ambiente (sem `.env`, e as env vars não têm valor default utilizável) e não existe cache local (`src/data/janus-content.json` está ausente), então não dá pra listar todos os posts publicados e comparar títulos/slugs programaticamente. Isso precisa ser feito por alguém com acesso real à API ou ao painel do Janus.

**UUID como slug — investigado e confirmado.** `/blog/fed2c881-bad8-4df1-b456-0fec32be5e1d` responde `200` em produção (`curl` direto no site, não na API) e tem exatamente o mesmo `<title>` do artigo canônico: "GPR vs. Share of Voice: Qual Métrica Importa na Era da IA? | Mavellium Blog". É uma **terceira URL do mesmo artigo** — provavelmente um post no Janus sem `slug` preenchido, caindo no fallback `p.slug ?? p.id` de `toCmsPost` (`src/lib/blog-api.ts`). **Não apliquei redirect para essa terceira URL** — decisão do usuário, já que envolve confirmar se apagar/corrigir o post duplicado no Janus é a solução certa (mais robusta do que só redirecionar a URL) ou se um redirect 301 já resolve.

### 5.2 Dados estruturados

**Premissa errada — já está feito.** A spec original assumia que JSON-LD precisava ser adicionado do zero. Não precisa: 16 arquivos em `src/app/**` já têm `<script type="application/ld+json">` com `JSON.stringify(objeto)` (já segue a regra "não montar strings manualmente", só não está num componente `<JsonLd />` compartilhado). Cobertura confirmada:
- **Organization** — `src/app/layout.tsx` (`siteSchema`), `@type: ["Organization", "ProfessionalService"]`, com `name`, `url`, `logo`, `sameAs` (LinkedIn, Instagram) e `description` — no **root layout**, ou seja, em **todas as páginas**, não só home/`quem-somos`. Já tem `Service` e `WebSite` (com `SearchAction`) também globais.
- **Artigos** — `blog/[slug]/page.tsx` já gera `BlogPosting` (subtipo de `Article`) com `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `description`, mais `BreadcrumbList`.
- **`/solucoes`** — já tem `Service` schema próprio (3 schemas: `service1Schema`/`service2Schema`/`service3Schema`) além do `Service` global do layout.
- **FAQPage** — já existe em `/`, `/solucoes` e `/geo` (onde há seções de FAQ reais).

**Gap real encontrado:** artigos do blog não têm `FAQPage`, mas o CMS (`JanusPost` em `src/lib/blog-api.ts`) não tem nenhum campo estruturado de pergunta/resposta — só `body` (HTML livre). Extrair FAQ de HTML arbitrário via regex seria dado não verificado (viola a restrição abaixo). **Não implementado** — precisaria de um campo dedicado no Janus primeiro, fora do escopo desta spec (seção 7: nada no Janus sem aprovação).

**`<JsonLd />` compartilhado:** não criei — reescrever 16 arquivos que já funcionam só pra trocar `<script dangerouslySetInnerHTML>` por um wrapper é refactor puro, sem ganho funcional, e é risco desnecessário de quebrar algo que já está correto. Fica como sugestão para quando alguém for mexer nesses arquivos por outro motivo, não como tarefa desta spec.

**Restrição (mantida, já respeitada pelo que existe):** nenhum campo de schema pode conter dado não verificado (número de clientes, resultados, avaliações). Se o dado não existe, omitir o campo.

### 5.3 Higiene técnica

- **Já correto, verificado.** `src/app/sitemap.ts` é dinâmico e já inclui todos os artigos (`fetchCmsAllSlugs()`). `public/robots.txt` já é bem mais completo do que o esperado — libera explicitamente `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `Claude-Web`, `Google-Extended` etc., alinhado com o objetivo de GEO do site. Nenhuma mudança necessária.
- **Já correto, verificado.** `<title>`/`<meta description>` por artigo já vêm de `post.seoTitle`/`post.seoDescription` (campos do Janus), únicos por post.
- **Gap real encontrado e corrigido.** `home` (`/`), `/blog` (índice) e `/blog/[slug]` não tinham `alternates.canonical` — confirmado direto em produção (`curl` no HTML, sem `<link rel="canonical">` nessas três rotas; outras páginas como `/solucoes` já tinham). Adicionado nos três: `src/app/page.tsx`, `src/app/blog/page.tsx` (metadata estática) e `generateMetadata` de `src/app/blog/[slug]/page.tsx` (dinâmico, usa `post.slug`).
- **Corrigido de novo:** o hosting é Vercel mesmo (confirmado via headers HTTP em produção — ver P1 na seção 0; `doc/CLAUDE.md` está desatualizado nesse ponto). Domínio de preview `institucional-mavellium-*.vercel.app` — confirmar se está sendo indexado (aparece como referrer nos dados originais do diagnóstico) e, se estiver, bloquear via configuração de `noindex`/`robots.txt` específica do ambiente de preview na Vercel (`VERCEL_ENV=preview`).
- **Confirmado:** `mavellium.com.br` (apex) faz redirect 307 para `www.mavellium.com.br` — é a configuração de domínio da Vercel, não do código. Todos os canonicals e o JSON-LD do site já usam o apex sem `www` (`https://mavellium.com.br/...`) consistentemente; mantive esse padrão nos canonicals adicionados agora.

---

## 6. Ordem de execução e entregáveis

Executar nesta ordem, com commit separado por etapa:

1. `lib/analytics.ts` + `getPageType` + provider (seção 1)
2. Contrato de eventos de conversão (seção 2.1)
3. Ponte HubSpot (seção 3) — **prioridade máxima**
4. Componente `<RaioXCTA />` e inserção (seção 4)
5. Eventos de engajamento (seção 2.2)
6. Correções de SEO/GEO (seção 5)

### Critérios de aceite

- [ ] Nenhuma string de evento hardcoded fora de `lib/analytics.ts`
- [ ] `NEXT_PUBLIC_ANALYTICS_DEBUG=true` loga todos os eventos no console sem enviá-los
- [ ] Submeter o formulário do Raio-X em staging dispara `conv_raio_x_form_submit` **e** `identify`
- [ ] Nenhum PII (e-mail, telefone, nome) aparece como propriedade de evento — apenas em `identify`
- [ ] Todo artigo do blog renderiza CTA de fim e bloco de próximos artigos sem edição manual do conteúdo
- [ ] `next build` passa sem warnings novos
- [ ] Redirect 301 da URL duplicada funciona e preserva o status code

### Reportar ao final

1. Confirmar que a ponte HubSpot (seção 3) foi instrumentada no handler nativo de `submitQualificationForm`/`qualification-form.tsx`, sem depender de `postMessage`.
2. Lista de duplicatas de URL encontradas na auditoria, **sem aplicar redirects** além do especificado.
3. Qualquer evento do contrato que não foi possível implementar e por quê.

---

## 7. Fora de escopo desta spec

Não fazer nesta execução:
- Reescrita de copy (será tratada separadamente)
- Publicação da landing `/raio-x` no HubSpot (feita na UI do HubSpot, não no repo)
- Criação de workflow de automação no HubSpot
- Alteração de estrutura de planos ou preços
- Qualquer conteúdo novo de artigo