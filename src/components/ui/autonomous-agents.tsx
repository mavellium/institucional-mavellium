"use client";

import React from "react";
import { FlippingCard } from "../ui/flipping-card";
import { ArrowRight, Code, Palette, Database, RotateCw } from "lucide-react";

// --- Interfaces ---
interface CardData {
  id: string;
  front: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  back: {
    description: string;
    buttonText: string;
  };
}

interface FlippingCardDemoProps {
  title: string;
  description: string;
}

// --- Mock Data ---
const cardsData: CardData[] = [
  {
    id: "design-excellence",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Design Excellence",
      title: "Design Excellence",
      description: "Designs intuitivos que criam conexões significativas com usuários.",
      icon: <Palette className="w-5 h-5 text-pink-500" />,
    },
    back: {
      description: "Criamos experiências excepcionais através de design systems modernos que garantem consistência e acessibilidade total.",
      buttonText: "Ver Portfólio",
    },
  },
  {
    id: "data-analytics",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Data Analytics",
      title: "Data Analytics",
      description: "Transforme dados brutos em insights acionáveis para o seu negócio.",
      icon: <Database className="w-5 h-5 text-blue-500" />,
    },
    back: {
      description: "Nossa plataforma fornece análise em tempo real e modelos preditivos para ajudar empresas em decisões críticas.",
      buttonText: "Saiba Mais",
    },
  },
];

// --- Componente Principal ---
export default function FlippingCardDemo({ title, description }: FlippingCardDemoProps) {
  return (
    <section className="flex flex-col items-center py-12 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      
      {/* Header Responsivo */}
      <div className="text-center mb-12 md:mb-20 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>

      {/* Grid Otimizado: 
          - 1 coluna em celulares
          - 2 colunas em tablets/desktops
          - Largura máxima controlada para não esticar demais os cards
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-6xl">
        {cardsData.map((card) => (
          <div key={card.id} className="relative group w-full perspective-1000">
            <FlippingCard
              // Aspect-square garante que o card seja sempre quadrado, ideal para mobile
              className="w-full aspect-square md:aspect-[4/5] lg:aspect-square"
              frontContent={<GenericCardFront data={card.front} />}
              backContent={<GenericCardBack data={card.back} />}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Sub-componente: Frente do Card ---
function GenericCardFront({ data }: { data: CardData["front"] }) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm transition-all duration-300">
      
      {/* Container da Imagem com Aspect Ratio Interno */}
      <div className="relative h-2/5 md:h-1/2 overflow-hidden">
        <img
          src={data.imageSrc}
          alt={data.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge Indicativo para Mobile (Visual Feedback) */}
        <div className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur rounded-full md:hidden shadow-sm">
          <RotateCw className="w-4 h-4 text-neutral-500 animate-pulse" />
        </div>
      </div>
      
      {/* Conteúdo de Texto */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-primary">
            {data.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {data.title}
          </h3>
        </div>
        
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
          {data.description}
        </p>
        
        {/* Guia de Interação Dinâmica */}
        <div className="mt-auto flex items-center text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          <span className="hidden md:inline">Passe o mouse para detalhes</span>
          <span className="md:inline lg:hidden">Toque para ver mais</span>
          <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

// --- Sub-componente: Verso do Card ---
function GenericCardBack({ data }: { data: CardData["back"] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 md:p-12 text-center bg-neutral-100 dark:bg-neutral-800 rounded-2xl border-2 border-primary/20 shadow-inner">
      
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 -rotate-3 group-hover:rotate-0 transition-transform duration-500">
        <Code className="w-8 h-8 text-primary" />
      </div>

      <p className="text-sm md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 mb-8 font-medium">
        {data.description}
      </p>

      {/* Botão de Ação com StopPropagation para evitar o flip indesejado ao clicar */}
      <button 
        onClick={(e) => e.stopPropagation()} 
        className="w-full md:w-auto bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950 px-10 py-3 rounded-xl text-sm font-bold shadow-lg transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95"
      >
        {data.buttonText}
      </button>

      {/* Texto de Voltar para Mobile */}
      <span className="mt-4 text-[10px] text-muted-foreground uppercase tracking-tighter md:hidden">
        Toque fora para voltar
      </span>
    </div>
  );
}