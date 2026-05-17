"use client";

import { motion } from "framer-motion";
import { Zap, Code, AlertTriangle, Server } from "lucide-react";
import { GlowingEffect } from "../../../components/ui/glowing-cards";

const PROBLEMS = [
  {
    icon: Zap,
    tag: "Performance",
    title: "Plugin Bloat → Timeout de LLMs",
    answer:
      "Com 20+ plugins ativos, o TTFB médio do WordPress ultrapassa 3.2s — acima do timeout de 2–5s que crawlers de LLMs como o Perplexity usam antes de descartar a fonte e buscar alternativa mais rápida.",
    detail: [
      "20+ plugins comuns = 300+ requisições HTTP",
      "TTFB médio: 3.2s (benchmarks 2024)",
      "Timeout padrão de LLMs: 2–5s",
    ],
  },
  {
    icon: Code,
    tag: "Semântica",
    title: "HTML Semanticamente Poluído",
    answer:
      "O Gutenberg gera estrutura como <div class='wp-block-paragraph'> onde deveria ser simplesmente <p>. LLMs treinados para HTML semântico inferem baixa qualidade estrutural de conteúdo embrulhado em divs arbitrários.",
    detail: [
      "Elementor: até 12 divs por parágrafo",
      "Estilos inline em cada elemento",
      "Atributos data-* sem propósito semântico",
    ],
  },
  {
    icon: AlertTriangle,
    tag: "Renderização",
    title: "Renderização Bloqueada por JS",
    answer:
      "Themes WordPress carregam em média 847kb de JavaScript. Conteúdo que só existe após execução de JS client-side é invisível para parsers síncronos — o LLM lê o HTML inicial e não espera pelo bundle.",
    detail: [
      "JS médio: 847kb por página",
      "FCP médio WordPress: 4.1s",
      "RSC do Next.js: zero JS não essencial",
    ],
  },
  {
    icon: Server,
    tag: "Arquitetura",
    title: "Cache Impossível por Rota",
    answer:
      "Arquitetura PHP monolítica reconstrói o HTML completo a cada request. Sem cache granular por rota, o LLM sempre encontra latência real de processamento — e fontes lentas são preteridas em favor de alternativas com TTFB menor.",
    detail: [
      "Cache hit rate médio: < 40%",
      "PHP reconstrói HTML a cada requisição",
      "Sem controle por rota ou componente",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function GeoProblems() {
  return (
    <section className="px-6 py-20 md:py-28 bg-[#050505] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
              Por que o <span className="text-[#00D26A]">WordPress falha</span>{" "}
              para GEO
            </h2>
            <p className="text-zinc-400 mt-4 text-lg font-light leading-relaxed">
              Quatro falhas técnicas estruturais que tornam arquiteturas legadas
              inadequadas para serem citadas por modelos de linguagem generativa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-red-500/5 border border-red-500/20 text-xs font-bold uppercase tracking-widest text-red-400 shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
            </span>
            Análise Técnica
          </motion.div>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;
            return (
              <motion.div key={problem.title} variants={cardVariants}>
                <div className="relative h-full w-full group">
                  <div className="relative h-full rounded-md border border-white/10 p-[1px] bg-white/5 transition-all duration-300 hover:border-[#00D26A]/30 hover:shadow-[0_0_30px_rgba(0,210,106,0.05)]">
                    <GlowingEffect spread={40} glow={true} proximity={64} />
                    <article className="relative flex h-full flex-col bg-zinc-950 rounded-[5px] p-6 lg:p-8 overflow-hidden z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-sm bg-red-500/10 flex items-center justify-center border border-red-500/20">
                          <Icon className="text-red-400 w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 bg-white/5 rounded-sm border border-white/10 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                          {problem.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                        {problem.title}
                      </h3>

                      <p className="text-zinc-400 font-light leading-relaxed text-sm mb-5">
                        {problem.answer}
                      </p>

                      <ul className="mt-auto space-y-1.5">
                        {problem.detail.map((d) => (
                          <li
                            key={d}
                            className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono"
                          >
                            <span className="w-1 h-1 rounded-full bg-red-400/60 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
