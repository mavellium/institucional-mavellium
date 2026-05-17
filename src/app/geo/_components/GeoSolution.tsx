"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Tag, Gauge } from "lucide-react";
import { GlowingEffect } from "../../../components/ui/glowing-cards";

const COMPARISONS = [
  {
    problem: "TTFB 3.2s por PHP monolítico sem cache",
    solution: "SSG + Vercel Edge: TTFB <100ms global",
    metric: "<100ms",
  },
  {
    problem: "<div class='wp-block'> sem semântica estrutural",
    solution: "Janus API tipada → <article>, <section>, <h2> nativos",
    metric: "HTML limpo",
  },
  {
    problem: "847kb de JS bloqueando o First Contentful Paint",
    solution: "Zero JS não essencial: React Server Components + streaming SSR",
    metric: "0kb bundle",
  },
  {
    problem: "Cache hit rate < 40% em arquitetura monolítica",
    solution: "ISR + Cache-Control: s-maxage=86400 por rota",
    metric: ">95% hit",
  },
];

const FEATURES = [
  {
    icon: Brain,
    title: "HTML Semântico Nativo",
    answer:
      "O Janus CMS serializa conteúdo em tipos tipados que o Next.js renderiza diretamente como tags semânticas corretas. Nenhum div desnecessário, nenhum estilo inline.",
  },
  {
    icon: Tag,
    title: "JSON-LD por Rota",
    answer:
      "Cada rota gerada pelo Janus recebe automaticamente seu bloco de Schema Markup correspondente: Article, FAQPage, Product ou Organization — sem configuração manual.",
  },
  {
    icon: Gauge,
    title: "Core Web Vitals <100ms",
    answer:
      "Next.js SSG pré-renderiza páginas no build. O Vercel Edge Network serve HTML estático em <100ms TTFB global — dentro da janela de timeout de qualquer crawler de LLM.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function GeoSolution() {
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
              Como o{" "}
              <span className="text-[#00D26A]">Janus CMS + Next.js</span>{" "}
              resolve cada problema
            </h2>
            <p className="text-zinc-400 mt-4 text-lg font-light leading-relaxed">
              Cada falha do WordPress tem uma contrapartida técnica direta na
              arquitetura headless que a Mavellium implementa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#00D26A]/5 border border-[#00D26A]/20 text-xs font-bold uppercase tracking-widest text-[#00D26A] shrink-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D26A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D26A]" />
            </span>
            Nossa Solução
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div
          className="mb-16 rounded-md border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_1fr] bg-white/[0.03] border-b border-white/10 px-6 py-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
              WordPress / Legado
            </span>
            <span className="w-8" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D26A]">
              Janus CMS + Next.js
            </span>
          </div>

          {COMPARISONS.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 ${
                i < COMPARISONS.length - 1 ? "border-b border-white/5" : ""
              } hover:bg-white/[0.02] transition-colors`}
            >
              <p className="text-sm text-zinc-500 font-mono leading-snug">
                {row.problem}
              </p>
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="w-4 h-4 text-[#00D26A]" />
                <span className="text-[9px] font-black font-mono text-[#00D26A] tracking-wider">
                  {row.metric}
                </span>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-snug">
                {row.solution}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div key={feat.title} variants={itemVariants}>
                <div className="relative h-full w-full group">
                  <div className="relative h-full rounded-md border border-white/10 p-[1px] bg-white/5 transition-all duration-300 hover:border-[#00D26A]/30 hover:shadow-[0_0_30px_rgba(0,210,106,0.05)]">
                    <GlowingEffect spread={40} glow={true} proximity={64} />
                    <article className="relative flex h-full flex-col bg-zinc-950 rounded-[5px] p-6 lg:p-8 overflow-hidden z-10">
                      <div className="w-12 h-12 rounded-sm bg-[#00D26A]/10 flex items-center justify-center border border-[#00D26A]/20 mb-6">
                        <Icon className="text-[#00D26A] w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="text-zinc-400 font-light leading-relaxed text-sm">
                        {feat.answer}
                      </p>
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
