# Reposicionamento do site Mavellium — Spec para execução

**Contexto:** mavellium.com.br é hoje um site de "agência de sites/landing pages/automação" com GEO como um item entre outros. A empresa vende **apenas GEO/AEO** (visibilidade em IA generativa). O site precisa refletir isso. Este documento é a lista completa de mudanças, priorizada, para implementação direta no código.

Stack observada: Next.js (rotas `/_next/image`, App Router provável). Ajustar aos arquivos reais do repo.

**Nota sobre nomenclatura:** os nomes das etapas da metodologia (Raio-X, Base, Alcance, Radar) foram definidos como padrão de marca. Usar exatamente esses nomes. Tom: claro e direto — qualquer dono de empresa entende em segundos. Cada nome vem com uma linha de benefício (itálico) + uma explicação simples. "Raio-X" já é termo usado internamente e é a porta de entrada (o produto de diagnóstico); "Radar" fecha o arco (monitoramento contínuo via Janus).

**IMPORTANTE — antes de executar:** primeiro mapear a estrutura real do repositório (rotas, componentes, onde vive cada seção da home) e confirmar a stack. Só então aplicar as mudanças. Não assumir caminhos de arquivo.

---

## 0. Princípio geral

Uma única promessa do início ao fim da home: **Raio-X → IAG Score → Metodologia → Case Tegbe → Planos → CTA de qualificação.**
Tudo que não serve essa linha sai ou vira suporte secundário.

---

## 1. REMOVER (prioridade alta)

### 1.1 Seção "Soluções Estratégicas" (3 cards: Sites Inteligentes / Landing Pages / Automação)
- Localização: home, logo após o hero
- Ação: remover a seção inteira como está. Não apagar o conteúdo de Automação/Sites — ver item 3 (reposicionar como componentes de entrega).

### 1.2 Seção "Modelos de Projeto" (Landing Pages / Site Inteligente / Automação & IA com bullets e CTAs próprios)
- Duplica a seção 1.1 com outro layout. Remover completamente.

### 1.3 Portfólio de landing pages de conversão
- Remover do portfólio: **Tegpro (curso e-commerce), FAIP (bolsas), Instituto do Sorriso (implantes)**
- Manter apenas: **Tegbe** (único case de GEO real)
- Motivo: são projetos de conversão paga, não têm relação com GEO/AEO e diluem a prova social que importa

### 1.4 CTAs de WhatsApp genérico como único caminho de conversão
- Todo botão que hoje aponta direto pra `wa.me/...` com mensagem genérica de "quero saber mais" deve ser substituído por CTA que leva ao formulário de qualificação (ver item 4)
- Exceção: manter 1 botão de WhatsApp fixo/flutuante como canal alternativo, não como CTA primário

---

## 2. REESCREVER

### 2.1 Metodologia (seção "Nossa Metodologia" — hoje "5 passos" genéricos de agência)
Trocar os 5 passos atuais:
> Imersão e Briefing → Análise de Viabilidade → Cronograma de Entregas → Desenvolvimento → Entrega Final

Pela metodologia nomeada abaixo. **Usar este copy pronto** (título premium + linha simples). Arco: diagnosticar → arquitetar → autoridade → observar.

**Título da seção:** Nossa Metodologia
**Subtítulo:** Da invisibilidade à recomendação por IA, em quatro etapas mensuráveis.

**Etapa 1 — Raio-X**
*Diagnóstico de Citabilidade Multi-LLM.*
Mapeamos como sua marca aparece hoje nas respostas de ChatGPT, Gemini, Perplexity e Claude para as perguntas críticas do seu setor — e quantas vezes a IA recomenda o concorrente no seu lugar.

**Etapa 2 — Arquitetura Semântica**
*Estruturação de dados, entidades e schema.*
Reescrevemos a base técnica do seu site na linguagem que os modelos leem: dados estruturados (JSON-LD), entidades consistentes e HTML legível por máquina. É o que transforma seu site em fonte que a IA consegue interpretar.

**Etapa 3 — Autoridade Algorítmica**
*Information gain e distribuição.*
Produzimos conteúdo que a IA cita como fonte e construímos presença nos lugares que os modelos consultam para gerar respostas. Deixar de ser encontrado para passar a ser recomendado.

**Etapa 4 — Observabilidade Contínua**
*Monitoramento e IAG Score ao longo do tempo, via Janus.*
Nosso painel acompanha sua visibilidade e a dos concorrentes em tempo real, ajustando a estratégia conforme os modelos de IA evoluem. Visibilidade em IA não é entrega única — é operação contínua.

Manter os 4 nomes exatamente assim. A linha em itálico é o descritor técnico; o parágrafo abaixo é a explicação em linguagem simples (obrigatória, para não afastar leitor leigo).

### 2.2 FAQ do IAG Score™
- Já existe e está bem escrito — **subir para seção própria visível na home**, não deixar só dentro do acordeão de FAQ
- Adicionar, se disponível: um exemplo numérico (ex. "empresa X tinha IAG Score 12, hoje está em 61") — se não houver dado real ainda, não inventar número (ver regra de conteúdo no rodapé deste doc)

### 2.3 Blocos de "Sites Semânticos" e "Agentes & IA" (dentro de "Soluções Inteligentes")
- Não apagar — reescrever como **componentes da entrega GEO**, não como produtos vendáveis separadamente
- Exemplo de reposicionamento: trocar "Construir Autoridade" (CTA de venda de site) por texto explicando que a reestruturação do site é *parte* do trabalho de visibilidade, sem CTA de compra isolado

---

## 3. ADICIONAR (novos blocos/seções)

### 3.1 Bloco comparativo SEO x AEO x GEO
- Formato: 3 colunas ou tabela simples
- Conteúdo mínimo:
  - **SEO** — foco em ranking e cliques em buscadores tradicionais
  - **AEO** — foco em ser a resposta direta em buscas zero-click
  - **GEO** — foco em ser citado e sintetizado por IAs generativas (ChatGPT, Gemini, Perplexity, Claude)
- Posição sugerida: logo após o Manifesto, antes da Metodologia
- Motivo: é o conteúdo mais citado pelos próprios concorrentes nas respostas de IA (validado no painel AEO do HubSpot — domínios como organic301.com e triploup.com.br aparecem nas citações justamente com esse tipo de bloco didático)

### 3.2 Números/métricas concretas no hero ou logo abaixo
Adicionar contador(es) com dado real da operação, exemplos de formato (preencher com dado real, não inventar):
- Nº de empresas diagnosticadas via Raio-X
- Nº de prompts/respostas de IA analisadas
- Prazo de entrega do diagnóstico (ex: "resultado em X dias")
- Resultado do case Tegbe (ex: "de invisível a #1 no ChatGPT para [categoria]")

### 3.3 Seção "Quem lidera" / fundador
- Nome, foto, credencial curta, por que fundou a Mavellium
- Objetivo: marca sem rosto identificável tem menos chance de virar fonte citável para os próprios LLMs (padrão observado em Brasil GEO com o fundador Alexandre Caramaschi)
- Manter enxuto — 2-3 frases + foto, não precisa virar página "Sobre" longa

### 3.4 Formulário de qualificação (substitui WhatsApp como CTA primário)
Campos sugeridos (ajustar ao ICP real da Mavellium):
- Nome / Empresa / Cargo
- Setor (usar os 6 setores prioritários do ICP: rastreamento veicular/telemetria, IoT/conectividade, portaria/condomínio virtual, software de segurança, SaaS B2B de gestão, integradores de sistema — ou "Outro")
- A empresa já apareceu no ChatGPT/Gemini pra própria categoria? (Sim / Não / Não sei)
- Faturamento médio mensal (faixas)
- Principal problema: Não aparece nas respostas de IA / Concorrente aparece na minha frente / Não sei se apareço / Já sei que não apareço e quero corrigir
- Urgência (não sei / até 30 dias / até 90 dias / sem prazo definido)
- CTA de envio: leva para agendamento ou para receber o Raio-X

### 3.5 Estrutura de oferta = planos reais
Trocar "Modelos de Projeto" (removido no item 1.2) por bloco com os planos reais da Mavellium. Nomes reais: **Presença → Autoridade → Dominância → Enterprise (sob consulta).**

Copy de posicionamento pronto para cada tier (linha de headline). Os **bullets do que está incluso em cada plano ficam como TODO** — precisam vir do material interno de vendas, não podem ser inventados:

- **Presença** — *Para sair da invisibilidade.* Diagnóstico + estruturação inicial para sua marca começar a aparecer nas respostas de IA.
  - [ ] TODO: preencher 3-4 bullets do que inclui (material interno)
- **Autoridade** — *Para virar fonte citada.* Produção de conteúdo e construção de autoridade para a IA recomendar sua marca de forma consistente.
  - [ ] TODO: preencher 3-4 bullets do que inclui (material interno)
- **Dominância** — *Para liderar a categoria.* Operação completa de visibilidade, ocupando o espaço das respostas de IA à frente dos concorrentes.
  - [ ] TODO: preencher 3-4 bullets do que inclui (material interno)
- **Enterprise** — *Sob consulta.* Escopo personalizado para operações multi-marca, multi-região ou com necessidades específicas.
  - [ ] TODO: definir gancho/CTA (ex: "falar com especialista")

As linhas de headline (em itálico) podem ser usadas como estão. Os bullets são o único ponto que exige input do Vinícius antes de publicar.

---

## 4. MANTER COMO ESTÁ (já funciona)

- Manifesto ("A Era da Pesquisa Mudou") — tom já correto, não mexer no texto, só na posição (ver ordem final abaixo)
- Case Tegbe — manter, expandir com número se houver
- Janus como plataforma proprietária — já bem posicionado
- FAQ técnico (schema markup, templates vs custom) — manter, só reorganizar posição

---

## 5. ORDEM FINAL DA HOME (proposta)

1. Hero (headline atual "Seu cliente já pergunta pra IA quem contratar" — manter, está boa) + CTA formulário (não WhatsApp)
2. Números/métricas (3.2)
3. Manifesto (já existe)
4. Bloco SEO x AEO x GEO (3.1) — novo
5. Metodologia renomeada (2.1)
6. Case Tegbe único (1.3 + expandido)
7. Estrutura de planos: Presença/Autoridade/Dominância/Enterprise (3.5)
8. IAG Score™ em destaque (2.2)
9. Quem lidera / fundador (3.3)
10. FAQ técnico reduzido
11. Blog/Insights (manter como está)
12. CTA final + formulário de qualificação (3.4)

Remover do fluxo: seção de "Soluções Estratégicas", "Modelos de Projeto", portfólio de landing pages não-GEO, depoimento isolado se não for sobre GEO (verificar se o depoimento do Donizete/Tegbe é sobre landing page ou sobre GEO — se for sobre landing page antiga, reescrever ou remover).

---

## 6. REGRAS DE CONTEÚDO (não negociável — já em uso pela Mavellium)

- **Nenhum número inventado.** Todo dado numérico (contadores, % de resultado, prazos) precisa vir de dado real verificado. Se não houver dado disponível ainda, deixar o bloco fora até ter, ou usar linguagem qualitativa sem número.
- Case Tegbe pode ser citado nominalmente (já é usado publicamente). Outros prospects/clientes em pipeline (Henlau, V3/Golfleet, R.J. Frabetti etc.) **não devem ser citados ou identificáveis** em nenhum conteúdo público do site.
- Manter meta tags e schema markup (JSON-LD) atualizados após qualquer mudança estrutural — é parte do próprio produto que a Mavellium vende, o site precisa ser prova viva da metodologia.

---

## 7. CHECKLIST TÉCNICO PARA O CLAUDE CODE

- [ ] Localizar os componentes/seções da home correspondentes a cada item acima (provavelmente em `app/` ou `components/` dado stack Next.js)
- [ ] Remover seções 1.1–1.4
- [ ] Reescrever textos das seções 2.1–2.3
- [ ] Criar componentes novos para 3.1, 3.2, 3.3, 3.4, 3.5
- [ ] Reordenar seções conforme item 5
- [ ] Atualizar links de navegação/menu se alguma rota for removida (ex. se existir página própria de Landing Pages/Automação como produto)
- [ ] Verificar e atualizar JSON-LD / schema markup para refletir a nova estrutura de oferta (Service schema deve listar GEO/AEO, não "Sites/Landing Pages/Automação")
- [ ] Atualizar meta-description e OG tags se o posicionamento na home mudar o resumo da empresa
- [ ] Testar formulário de qualificação (novo) — validar campos obrigatórios e destino do submit
- [ ] Rodar build e checar Core Web Vitals não regrediram com os novos componentes