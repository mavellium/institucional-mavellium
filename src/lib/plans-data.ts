// Reposicionamento GEO/AEO (doc/reposicionamento.md item 3.5) — planos reais
// da Mavellium: Presença → Autoridade → Dominância → Enterprise. Headlines em
// itálico são copy pronto do doc. Bullets são TODO explícito: precisam vir do
// material interno de vendas, não podem ser inventados (regra "nenhum número
// inventado" da seção 6 do doc). btn.href aponta para o formulário de
// qualificação (/#diagnostico, item 3.4) em vez de WhatsApp — o form é o novo
// caminho primário de conversão (item 1.4).
import type { Plan } from "../components/ui/pricing-details";

// TODO(vinicius): bullets reais de cada plano — material interno de vendas.
const PLACEHOLDER_FEATURES: Plan["features"] = [
  { text: "[Em breve — detalhamento do escopo]" },
];

export const PLANS_GEO: Plan[] = [
  {
    name: "Presença",
    label: "Para sair da invisibilidade",
    info: "Diagnóstico + estruturação inicial para sua marca começar a aparecer nas respostas de IA.",
    features: PLACEHOLDER_FEATURES,
    btn: { text: "Começar com o Raio-X", href: "/#diagnostico" },
  },
  {
    highlighted: true,
    name: "Autoridade",
    label: "Para virar fonte citada",
    info: "Produção de conteúdo e construção de autoridade para a IA recomendar sua marca de forma consistente.",
    features: PLACEHOLDER_FEATURES,
    btn: { text: "Construir Autoridade", href: "/#diagnostico" },
  },
  {
    name: "Dominância",
    label: "Para liderar a categoria",
    info: "Operação completa de visibilidade, ocupando o espaço das respostas de IA à frente dos concorrentes.",
    features: PLACEHOLDER_FEATURES,
    btn: { text: "Dominar a Categoria", href: "/#diagnostico" },
  },
  {
    name: "Enterprise",
    label: "Sob consulta",
    info: "Escopo personalizado para operações multi-marca, multi-região ou com necessidades específicas.",
    // TODO(vinicius): gancho/CTA final e escopo do tier Enterprise.
    features: PLACEHOLDER_FEATURES,
    btn: { text: "Falar com Especialista", href: "/#diagnostico" },
  },
];
