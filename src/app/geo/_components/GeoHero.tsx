"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getWhatsappUrl } from "../../../lib/constants";

const PILLARS = [
  { label: "HTML Semântico", desc: "Hierarquia legível por máquina" },
  { label: "JSON-LD", desc: "Entidades mapeadas por rota" },
  { label: "Answer-First", desc: "Resposta na primeira linha" },
  { label: "Densidade Técnica", desc: "Profundidade que LLMs citam" },
];

const STATS = [
  { value: "<100ms", label: "TTFB com Next.js SSG" },
  { value: "3×", label: "mais citações vs WordPress" },
  { value: "JSON-LD", label: "Schema nativo por rota" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export function GeoHero() {
  const whatsappUrl = getWhatsappUrl(
    "Olá! Quero implementar GEO no meu site com Next.js e Janus CMS."
  );

  return (
    <section className="px-6 pt-32 pb-24 border-b border-white/5">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#00D26A]/5 border border-[#00D26A]/20 text-xs font-bold uppercase tracking-widest text-[#00D26A]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D26A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D26A]" />
            </span>
            Novo Framework · 2025
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6"
        >
          <span className="text-[#00D26A]">GEO</span> é o novo padrão
          <br className="hidden md:block" /> de autoridade digital
        </motion.h1>

        {/* Answer-First definition */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-4"
        >
          <strong className="text-white font-semibold">GEO — Generative Engine Optimization</strong> é a
          prática de estruturar código e conteúdo para que modelos de linguagem como{" "}
          <span className="text-zinc-300">ChatGPT, Perplexity AI e Google Gemini</span> consigam
          identificar, extrair e citar seu site com precisão.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          A unidade de trabalho não é a keyword — é a entidade semântica. LLMs não
          rankeiam: eles escolhem a fonte mais estruturada, mais rápida e mais clara
          para compor sua resposta.
        </motion.p>

        {/* 4 Pillars */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {PILLARS.map((p) => (
            <div
              key={p.label}
              className="flex flex-col items-center px-5 py-3 rounded-sm bg-white/[0.03] border border-white/10 hover:border-[#00D26A]/30 transition-colors duration-300"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#00D26A]">
                {p.label}
              </span>
              <span className="text-[10px] text-zinc-500 mt-0.5">{p.desc}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-md transition-all duration-300 shadow-[0_0_25px_rgba(0,210,106,0.25)] hover:shadow-[0_0_40px_rgba(0,210,106,0.4)]"
          >
            Implementar GEO no meu site
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
