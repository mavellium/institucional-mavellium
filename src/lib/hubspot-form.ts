// Reposicionamento GEO/AEO (doc/reposicionamento.md item 3.4) — integração
// com o HubSpot Forms Submission API. Portal e form confirmados via MCP
// read-only (mcp__claude_ai_HubSpot__manage_landing_page action=FORMS):
// portal 51505005 já tem um form publicado "Raio-X Gratuito — Inbound" que
// bate com o nome do produto de diagnóstico do doc — reaproveitado aqui em
// vez de criar um form novo.
//
// PENDÊNCIA (fora do código, admin do HubSpot — combinado com o Vinícius):
// as propriedades de contato abaixo ainda não existem no portal e precisam
// ser criadas + adicionadas como campos do form "Raio-X Gratuito — Inbound"
// antes do submit funcionar de ponta a ponta:
//   - ja_apareceu_ia       (enumeration: Sim / Não / Não sei)
//   - faturamento_mensal   (enumeration: ver FATURAMENTO_OPTIONS abaixo)
//   - principal_problema   (enumeration: ver PROBLEMA_OPTIONS abaixo)
//   - urgencia             (enumeration: ver URGENCIA_OPTIONS abaixo)
// Ao criar essas propriedades, manter o "internal value" de cada opção igual
// ao texto do label (é o padrão que o HubSpot usa por default) — se algum
// vier com um value gerado automaticamente diferente (como aconteceu com 2
// das opções de "setor"), me passe os values reais pra eu ajustar.
export const HUBSPOT_PORTAL_ID = "51505005";
export const HUBSPOT_RAIOX_FORM_GUID = "b404b3a0-c843-4e7f-8b56-cfabc6f45795";

// Confirmado via mcp__claude_ai_HubSpot__get_properties (contacts.setor) —
// values exatos já cadastrados no portal. Duas opções têm value ≠ label
// (gerado pelo HubSpot), as demais usam o próprio label como value.
export const SETOR_OPTIONS = [
  { value: "jxCehdiVB1ZjwlomFdtVq", label: "Rastreamento veicular" },
  { value: "6kdmOSixctMrLjHKQ6AxL", label: "Telemetria" },
  { value: "IoT e conectividade", label: "IoT e conectividade" },
  { value: "Portaria virtual / gestão condominial", label: "Portaria virtual / gestão condominial" },
  { value: "Software de segurança", label: "Software de segurança" },
  { value: "SaaS B2B / gestão", label: "SaaS B2B / gestão" },
  { value: "Integradores de sistemas", label: "Integradores de sistemas" },
  { value: "Outro", label: "Outro" },
];

export const JA_APARECEU_OPTIONS = ["Sim", "Não", "Não sei"];

export const FATURAMENTO_OPTIONS = [
  "Até R$ 50 mil/mês",
  "R$ 50 mil a R$ 200 mil/mês",
  "R$ 200 mil a R$ 500 mil/mês",
  "Acima de R$ 500 mil/mês",
];

export const PROBLEMA_OPTIONS = [
  "Não aparece nas respostas de IA",
  "Concorrente aparece na minha frente",
  "Não sei se apareço",
  "Já sei que não apareço e quero corrigir",
];

export const URGENCIA_OPTIONS = [
  "Não sei",
  "Até 30 dias",
  "Até 90 dias",
  "Sem prazo definido",
];

export type QualificationFormFields = {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  company: string;
  cargo?: string;
  setor: string;
  ja_apareceu_ia: string;
  faturamento_mensal?: string;
  principal_problema: string;
  urgencia: string;
};

export async function submitQualificationForm(
  fields: QualificationFormFields,
  pageUri: string
): Promise<void> {
  const hutk =
    typeof document !== "undefined"
      ? document.cookie.match(/hubspotutk=([^;]+)/)?.[1]
      : undefined;

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_RAIOX_FORM_GUID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: Object.entries(fields)
          .filter(([, value]) => value)
          .map(([name, value]) => ({ name, value })),
        context: {
          pageUri,
          pageName: "Mavellium — Home",
          ...(hutk ? { hutk } : {}),
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Falha ao enviar formulário HubSpot (${res.status}): ${body}`);
  }
}
