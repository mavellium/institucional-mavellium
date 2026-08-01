"use client";

// Blocos Janus da página /quem-somos (pageSlug "quem-somos" no Janus — página
// e bloco ainda precisam ser criados no admin do Janus, ver README no final
// deste arquivo / relatado no chat). Segue o mesmo padrão de
// janus-home-sections.tsx (pageSlug "home").
import { useJanusBlock } from "@/src/hooks/useJanusBlock";
import { TrajetoriaTimeline } from "@/src/components/ui/trajetoria-timeline";
import type { TrajetoriaMilestone } from "@/src/components/ui/trajetoria-timeline";

export const QUEM_SOMOS_PAGE_SLUG = "quem-somos";
export const TRAJETORIA_BLOCK_ID = "trajetoria-mavellium";

export interface TrajetoriaBlock {
  title?: string;
  description?: string;
  milestones?: TrajetoriaMilestone[];
}

export function TrajetoriaJanus({ initialData }: { initialData?: unknown }) {
  const { data: janusData } = useJanusBlock<TrajetoriaBlock>(
    QUEM_SOMOS_PAGE_SLUG,
    TRAJETORIA_BLOCK_ID
  );
  const data = (initialData as TrajetoriaBlock | undefined) ?? janusData;
  return (
    <TrajetoriaTimeline
      title={data?.title}
      description={data?.description}
      milestones={data?.milestones}
    />
  );
}

/**
 * Schema esperado do bloco `trajetoria-mavellium` na página `quem-somos` do
 * Janus (a criar no admin):
 *
 * {
 *   "title": "Nossa Trajetória",              // opcional, tem default
 *   "description": "...",                     // opcional, tem default
 *   "milestones": [
 *     { "year": "2022", "title": "...", "description": "...", "image": "https://mavellium-janus.b-cdn.net/..." }
 *   ]
 * }
 */
