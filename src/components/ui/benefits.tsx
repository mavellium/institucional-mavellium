"use client";

import React, { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { Box, Lock, Search, Settings, Sparkles, Shield, Rocket } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-cards";

// Animações centralizadas para evitar recreação de objetos em cada render
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const METRICS_DATA = [
  {
    number: "150+",
    label: "Clientes",
    description: "Empresas confiando em nossas soluções.",
    icon: <Box className="h-5 w-5 text-yellow-400" />,
  },
  {
    number: "8+",
    label: "Anos",
    description: "Mais de uma década de expertise em desenvolvimento.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
  },
  {
    number: "500+",
    label: "Sites",
    description: "Projetos web de alta qualidade entregues.",
    icon: <Rocket className="h-5 w-5 text-purple-400" />,
  },
  {
    number: "98%",
    label: "Satisfação",
    description: "Taxa de aprovação dos nossos parceiros.",
    icon: <Shield className="h-5 w-5 text-pink-400" />,
  },
];

export default function Benefits() {
  return (
    <section className="p-6 md:p-12 lg:p-16 bg-black min-h-screen overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 max-w-4xl"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Nossos 
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent ml-3">
            Benefícios
          </span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Soluções desenvolvidas para escalar sua presença digital com segurança e performance de elite.
        </p>
      </motion.header>

      {/* Grid de Benefícios Principal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[14rem] md:auto-rows-[16rem]">
        <GridItem
          area="md:col-span-6 lg:col-span-4"
          icon={<Box size={24} className="text-white" />}
          title="Seamless Integration"
          description="Build high-performance interfaces with beautiful glowing borders."
        />
        <GridItem
          area="md:col-span-6 lg:col-span-4"
          icon={<Settings size={24} className="text-white" />}
          title="Fully Customizable"
          description="Adjust spread and proximity via simple props."
        />
        <GridItem
          area="md:col-span-12 lg:col-span-4"
          icon={<Lock size={24} className="text-white" />}
          title="Secure by Default"
          description="Enterprise-ready components with zero compromise."
        />
        <GridItem
          area="md:col-span-7 lg:col-span-8"
          icon={<Sparkles size={24} className="text-white" />}
          title="Modern Motion"
          description="Powered by Motion for fluid 60fps animations and interactions."
        />
        <GridItem
          area="md:col-span-5 lg:col-span-4"
          icon={<Search size={24} className="text-white" />}
          title="Global Search"
          description="Easily find and implement components fast."
        />
      </div>

      {/* Seção de Métricas (Os 4 Bloquinhos) */}
      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {METRICS_DATA.map((metric, idx) => (
          <MetricCard key={idx} metric={metric} />
        ))}
      </motion.div>
    </section>
  );
}

// Sub-componente de Métrica otimizado
const MetricCard = memo(({ metric }: { metric: typeof METRICS_DATA[0] }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group relative p-[1px] rounded-2xl overflow-hidden bg-white/5 transition-all"
    >
      {/* Border Glow Effect sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full rounded-[15px] bg-zinc-950 p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
            {metric.icon}
          </div>
          <div className="h-1 w-8 rounded-full bg-white/10 group-hover:bg-yellow-400/30 transition-colors" />
        </div>

        <div>
          <div className="text-4xl font-bold text-white tracking-tighter group-hover:text-yellow-400 transition-colors">
            {metric.number}
          </div>
          <h3 className="text-sm font-medium text-zinc-300 mb-1">{metric.label}</h3>
          <p className="text-xs text-zinc-500 leading-tight line-clamp-2">
            {metric.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

MetricCard.displayName = "MetricCard";

// Sub-componente GridItem otimizado
const GridItem = memo(({ area, icon, title, description }: any) => {
  return (
    <div className={`relative group h-full ${area}`}>
      <div className="relative h-full rounded-2xl border border-white/10 p-[1px] bg-white/5 transition-all group-hover:border-white/20">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between bg-black rounded-[15px] p-6 overflow-hidden">
          <div className="w-fit rounded-lg border border-white/10 p-2 mb-4 bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-zinc-400 leading-snug">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

GridItem.displayName = "GridItem";