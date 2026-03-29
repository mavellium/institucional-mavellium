"use client";

import { motion, type Variants } from "framer-motion";
import { Box, Lock, Search, Settings, Sparkles, Zap, Shield, Rocket } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-cards";

export default function Benefits() {
  // Animation variants for the feature blocks - properly typed
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const metrics = [
    {
      number: "150+",
      label: "Clientes",
      description: "Empresas confiando em nossas soluções.",
      icon: <Box className="h-6 w-6 text-yellow-400" />,
    },
    {
      number: "8+",
      label: "Anos de Experiência",
      description: "Mais de uma década de expertise em desenvolvimento.",
      icon: <Sparkles className="h-6 w-6 text-blue-400" />,
    },
    {
      number: "500+",
      label: "Sites Criados",
      description: "Projetos web de alta qualidade entregues.",
      icon: <Rocket className="h-6 w-6 text-purple-400" />,
    },
    {
      number: "98%",
      label: "Satisfação",
      description: "Taxa de satisfação dos nossos clientes.",
      icon: <Shield className="h-6 w-6 text-pink-400" />,
    },
  ];

  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Header com Título e Descrição */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-12 md:mb-16 flex-col justify-center max-w-full"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Recursos que
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent ml-3">
            Transformam
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
          Descubra como nossas soluções inovadoras podem elevar seu projeto a um novo patamar de excelência e performance.
        </p>
      </motion.div>

      {/* Grid de Benefícios */}
      <ul className="grid grid-cols-1 grid-rows-none rounded-xl gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-6 w-6 text-white dark:text-neutral-400" />}
          title="Seamless Integration"
          description="Build high-performance interfaces with beautiful glowing borders."
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Settings className="h-6 w-6 text-white dark:text-neutral-400" />}
          title="Fully Customizable"
          description="Adjust spread, proximity, and movement duration via simple props."
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Lock className="h-6 w-6 text-white dark:text-neutral-400" />}
          title="Secure by Default"
          description="Enterprise-ready components that don't compromise on style."
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Sparkles className="h-6 w-6 text-white dark:text-neutral-400" />}
          title="Modern Motion"
          description="Powered by Motion (formerly Framer Motion) for 60fps animations."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-6 w-6 text-white dark:text-neutral-400" />}
          title="Global Search"
          description="Easily find and implement components across your entire stack."
        />
      </ul>

      {/* Seção de 4 Blocos em Linha */}
      <div className="mt-8 md:mt-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                rotateX: 5,
                rotateY: -5,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              style={{
                perspective: 1000,
              }}
              className="group"
            >
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden group-hover:shadow-[0_0_60px_rgba(234,179,8,0.3)]"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative flex flex-col h-full gap-6">

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Number and Label */}
                  <div className="space-y-2">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-orange-300 group-hover:to-pink-400 transition-all duration-300">
                      {metric.number}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {metric.label}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-white/5 shadow-[0px_0px_27px_0px_#2D2D2D]">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 bg-black overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-white p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-xl font-semibold text-white">
                {title}
              </h3>
              <p className="font-sans text-sm text-white">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};