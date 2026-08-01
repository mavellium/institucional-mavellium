"use client";

// Página /quem-somos no Janus: criada em modo "advanced" (confirmado via
// GET https://januscms.com.br/api/v1/content/mavellium-main/quem-somos) —
// `schema` é o dado da página diretamente, sem mapa de blocos por id como a
// `home` usa. Por isso usa useJanusPageSchema/fetchJanusPageSchema, não
// useJanusBlock/fetchJanusBlocks (esses continuam servindo só a home).
import { useJanusPageSchema } from "@/src/hooks/useJanusBlock";
import { TrajetoriaTimeline } from "@/src/components/ui/trajetoria-timeline";
import type { TrajetoriaMilestone } from "@/src/components/ui/trajetoria-timeline";

// Não exportar QUEM_SOMOS_PAGE_SLUG deste arquivo: todo export de um módulo
// "use client" vira uma referência de cliente, então uma constante simples
// importada por um Server Component quebra em runtime (tentativa de invocar
// como Server Reference). Cada lado (client hook aqui, fetch server-side em
// page.tsx) usa o literal "quem-somos" diretamente.
const QUEM_SOMOS_PAGE_SLUG = "quem-somos";

export interface TrajetoriaSchema {
  title?: string;
  description?: string;
  milestones?: TrajetoriaMilestone[];
}

export function TrajetoriaJanus({ initialData }: { initialData?: unknown }) {
  const { data: janusData } = useJanusPageSchema<TrajetoriaSchema>(
    QUEM_SOMOS_PAGE_SLUG
  );
  const data = (initialData as TrajetoriaSchema | undefined) ?? janusData;
  return (
    <TrajetoriaTimeline
      title={data?.title}
      description={data?.description}
      milestones={data?.milestones}
    />
  );
}
