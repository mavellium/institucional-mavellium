"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

// Dados mapeados para a história e pilares da sua empresa
const SERVICES: Service[] = [
  {
    id: "01",
    tag: "A Empresa",
    title: "DNA Jovem e Dinâmico",
    description: "Estabelecida no polo tecnológico de Garça-SP, somos focados no futuro e estritamente alinhados às inovações do mercado.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200", // Representando modernidade
  },
  {
    id: "02",
    tag: "Liderança",
    title: "Três Sócios Especialistas",
    description: "Nossa estrutura é fundamentada na expertise: cada departamento chave é comandado por um especialista focado em excelência técnica.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200", // Representando a equipe/sócios
  },
  {
    id: "03",
    tag: "Execução",
    title: "Sem Terceirização Cega",
    description: "Do planejamento estratégico ao código final, cada etapa do seu projeto passa pelas mãos de quem realmente entende do assunto.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200", // Representando o código/mão na massa
  },
  {
    id: "04",
    tag: "Resultado",
    title: "Projetos Sob Medida",
    description: "Desenhamos soluções cirurgicamente para a realidade e necessidade de cada cliente, independentemente do porte da empresa.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200", // Representando dados e resultados
  },
];

const AUTO_PLAY_DURATION = 5000;

export default function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  useEffect(() => {
    if (!isInView || isPaused) return;
    const interval = setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, isInView, handleNext]);

  return (
    // Adicionado o id="quem-somos" para a âncora do menu funcionar
    <section id="quem-somos" ref={containerRef} className="w-full bg-white py-20 lg:py-32 overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl px-6 mx-auto">
        
        {/* Header da Seção */}
        <div className="mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Tag ajustada para azul para manter a paleta das seções anteriores */}
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em]">Quem Somos</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 max-w-3xl leading-[0.9]">
              Nascemos no futuro. <br/> <span className="text-zinc-400">Construímos o seu agora.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Coluna Esquerda: Abas */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="flex flex-col">
              {SERVICES.map((service, index) => (
                <TabButton
                  key={service.id}
                  service={service}
                  isActive={activeIndex === index}
                  isInView={isInView}
                  isPaused={isPaused}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Coluna Direita: Galeria Visual */}
          <div className="lg:col-span-7 order-1 lg:order-2 h-full min-h-[400px]">
            <div 
              className="relative h-full w-full group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[16/10] lg:aspect-square xl:aspect-[16/11] rounded-[2rem] overflow-hidden border border-zinc-200 bg-zinc-50 shadow-2xl shadow-zinc-200/50">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1, x: direction * 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: direction * -50 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover/gallery:scale-110"
                    />
                    {/* Overlay gradiente mais suave para o tema claro */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                {/* Navegação Custom */}
                <div className="absolute bottom-8 right-8 flex gap-3 z-30">
                  <NavButton onClick={handlePrev} icon={ArrowLeft01Icon} />
                  <NavButton onClick={handleNext} icon={ArrowRight01Icon} />
                </div>

                {/* Tag Flutuante na Imagem */}
                <div className="absolute top-8 left-8 z-30">
                  <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 text-[10px] font-bold text-blue-600 uppercase tracking-widest shadow-sm">
                    {SERVICES[activeIndex].tag}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Sub-componentes ---

const TabButton = memo(({ service, isActive, isInView, isPaused, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "group relative pl-8 py-8 text-left transition-all duration-500 border-b border-zinc-100 outline-none last:border-0",
      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
    )}
  >
    {/* Progress Bar Indicator */}
    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-100">
      {isActive && isInView && (
        <motion.div
          key={isPaused ? 'paused' : 'active'}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: AUTO_PLAY_DURATION / 1000,
            ease: "linear",
          }}
          className="h-full w-full bg-blue-600 origin-top" // Trocado de amber-500 para blue-600
        />
      )}
    </div>

    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-mono text-zinc-400 tracking-tighter">
        /0{service.id}
      </span>
      <h3 className={cn(
        "text-2xl md:text-3xl font-bold tracking-tight transition-all duration-500",
        isActive ? "text-zinc-900 translate-x-2" : "text-zinc-500"
      )}>
        {service.title}
      </h3>
      <AnimatePresence>
        {isActive && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 5 }}
            className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-md ml-2"
          >
            {service.description}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  </button>
));

TabButton.displayName = "TabButton";

const NavButton = memo(({ onClick, icon }: { onClick: () => void, icon: any }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md border border-zinc-200 flex items-center justify-center text-zinc-900 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all active:scale-95" // Hover em azul
  >
    <HugeiconsIcon icon={icon} size={20} />
  </button>
));

NavButton.displayName = "NavButton";