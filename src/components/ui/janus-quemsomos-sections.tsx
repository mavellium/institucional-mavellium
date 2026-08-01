"use client";

// Página /quem-somos no Janus: criada em modo "advanced" (confirmado via
// GET https://januscms.com.br/api/v1/content/mavellium-main/quem-somos) —
// `schema` é o dado da página diretamente, sem mapa de blocos por id como a
// `home` usa. Por isso usa useJanusPageSchema/fetchJanusPageSchema, não
// useJanusBlock/fetchJanusBlocks (esses continuam servindo só a home).
import { useJanusPageSchema } from "@/src/hooks/useJanusBlock";
import { TrajetoriaTimeline } from "@/src/components/ui/trajetoria-timeline";
import type { TrajetoriaMilestone } from "@/src/components/ui/trajetoria-timeline";
import { QuemSomosIntro } from "@/src/components/ui/quemsomos-intro";
import { FoundersGrid } from "@/src/components/ui/founders-grid";
import type { Founder } from "@/src/components/ui/founders-grid";

// Não exportar o slug deste arquivo: todo export de um módulo "use client"
// vira uma referência de cliente, então uma constante simples importada por
// um Server Component quebra em runtime (tentativa de invocar como Server
// Reference). Cada lado (client hook aqui, fetch server-side em page.tsx)
// usa o literal "quem-somos" diretamente.
const QUEM_SOMOS_PAGE_SLUG = "quem-somos";

export interface QuemSomosSchema {
  // Intro
  introKicker?: string;
  introHeading?: string;
  introDescription?: string;
  // Trajetória
  title?: string;
  description?: string;
  milestones?: TrajetoriaMilestone[];
  // Fundadores
  founders?: Founder[];
}

function useQuemSomosSchema(initialData?: unknown): QuemSomosSchema | undefined {
  const { data: janusData } = useJanusPageSchema<QuemSomosSchema>(
    QUEM_SOMOS_PAGE_SLUG
  );
  return (initialData as QuemSomosSchema | undefined) ?? janusData ?? undefined;
}

export function IntroJanus({ initialData }: { initialData?: unknown }) {
  const data = useQuemSomosSchema(initialData);
  return (
    <QuemSomosIntro
      kicker={data?.introKicker}
      heading={data?.introHeading}
      description={data?.introDescription}
    />
  );
}

export function TrajetoriaJanus({ initialData }: { initialData?: unknown }) {
  const data = useQuemSomosSchema(initialData);
  return (
    <TrajetoriaTimeline
      title={data?.title}
      description={data?.description}
      milestones={data?.milestones}
    />
  );
}

export function FoundersJanus({ initialData }: { initialData?: unknown }) {
  const data = useQuemSomosSchema(initialData);
  return <FoundersGrid founders={data?.founders} />;
}
