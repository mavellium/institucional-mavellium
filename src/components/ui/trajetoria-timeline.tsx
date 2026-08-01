"use client";

// Página /quem-somos — seção "Trajetória", inspirada em referências do tipo
// trajetoria.totvs.com, mas como timeline rica com scroll-reveal (sem modo
// jogo/gamificação — fora de escopo v1 do projeto, doc/spec.md seção 8).
// Conteúdo vem do Janus (bloco trajetoria-mavellium, ver janus-quemsomos-sections.tsx).
// Sem marcos cadastrados ainda = estado vazio explícito, nunca marco inventado.
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export interface TrajetoriaMilestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface TrajetoriaTimelineProps {
  title?: string;
  description?: string;
  milestones?: TrajetoriaMilestone[];
}

export function TrajetoriaTimeline({
  title = "Nossa Trajetória",
  description = "Os marcos que construíram a Mavellium, na ordem em que aconteceram.",
  milestones = [],
}: TrajetoriaTimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="trajetoria"
      aria-labelledby="trajetoria-heading"
      className="w-full bg-white py-16 md:py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="trajetoria-heading"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-3 leading-tight"
        >
          {title}
        </h2>
        <p className="text-base text-zinc-600 font-light leading-relaxed mb-12 max-w-xl">
          {description}
        </p>

        {milestones.length === 0 ? (
          <div className="rounded-md border border-dashed border-zinc-300 p-10 text-center">
            <p className="text-sm text-zinc-500 font-light">
              Nossa trajetória está sendo documentada — em breve os marcos da
              história da Mavellium aparecem aqui.
            </p>
          </div>
        ) : (
          <ol className="relative border-l border-zinc-200 pl-8 space-y-12" role="list">
            {milestones.map((milestone, i) => (
              <motion.li
                key={`${milestone.year}-${i}`}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <span className="absolute -left-[calc(2rem+5px)] top-1 w-[9px] h-[9px] rounded-full bg-[#00D26A] ring-4 ring-[#00D26A]/15" />
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00D26A] mb-2">
                  {milestone.year}
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mb-2 tracking-tight">
                  {milestone.title}
                </h3>
                <p className="text-sm text-zinc-600 font-light leading-relaxed mb-4">
                  {milestone.description}
                </p>
                {milestone.image && (
                  <div className="relative w-full h-48 md:h-64 rounded-md overflow-hidden border border-zinc-200">
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
