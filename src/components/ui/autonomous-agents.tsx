"use client";

import React from "react";
import { FlippingCard } from "../ui/flipping-card"; // Certifique-se de que o caminho está correto
import { ArrowRight, Code, Globe, Target, Bot, RotateCw } from "lucide-react";

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
  title?: string;
  description?: string;
}

// --- Dados Mapeados para as Soluções da Empresa ---
const cardsData: CardData[] = [
  {
    id: "sites-inteligentes",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Sites Institucionais Inteligentes",
      title: "Sites Inteligentes",
      description: "Mais do que presença, construímos a sua autoridade no ambiente digital.",
      icon: <Globe className="w-5 h-5 text-white" />,
    },
    back: {
      description: "A sede digital da sua empresa. Um canal estruturado que transmite credibilidade e trabalha a favor da sua marca 24 horas por dia.",
      buttonText: "Construir Autoridade",
    },
  },
  {
    id: "landing-pages",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Landing Pages de Alta Conversão",
      title: "Alta Conversão",
      description: "Páginas desenvolvidas com um único objetivo: transformar visitantes em clientes.",
      icon: <Target className="w-5 h-5 text-white" />,
    },
    back: {
      description: "Livre de distrações e desenhada cirurgicamente. Guie o usuário direto para a ação e maximize o retorno sobre seus anúncios.",
      buttonText: "Acelerar Vendas",
    },
  },
  {
    id: "automacao-ia",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Automação e Agentes Autônomos (IA)",
      title: "Automação & IA",
      description: "A revolução da eficiência operacional operando nos seus setores estratégicos.",
      icon: <Bot className="w-5 h-5 text-white" />,
    },
    back: {
      description: "Agentes autônomos para qualificar leads e processar dados. Atendimento instantâneo e redução da carga sobre a folha de pagamento.",
      buttonText: "Operar 24/7",
    },
  },
];

export default function FlippingCardDemo({ 
  title = "Soluções Inteligentes", 
  description = "Apoiamos negócios de todos os portes na transição para um modelo de operação mais eficiente e lucrativo através de três frentes." 
}: FlippingCardDemoProps) {
  return (
    <section className="flex flex-col items-center py-16 md:py-24 px-4 bg-black min-h-screen text-white">
      
      {/* Header */}
      <div className="text-center mb-16 md:mb-20 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
          {title}
        </h2>
        <p className="mt-6 text-neutral-400 text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Grid - Ajustado para 3 colunas em telas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl">
        {cardsData.map((card) => (
          <div key={card.id} className="relative group w-full perspective-1000">
            <FlippingCard
              className="w-full aspect-square md:aspect-[4/5] lg:aspect-[3/4]"
              frontContent={<GenericCardFront data={card.front} />}
              backContent={<GenericCardBack data={card.back} />}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function GenericCardFront({ data }: { data: CardData["front"] }) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl transition-all duration-300 group-hover:border-blue-500/50">
      
      {/* Imagem com Overlay Escuro */}
      <div className="relative h-1/2 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-blue-900/20 transition-colors duration-500" />
        <img
          src={data.imageSrc}
          alt={data.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4 p-2 bg-black/80 backdrop-blur rounded-full lg:hidden border border-neutral-700 z-20">
          <RotateCw className="w-4 h-4 text-blue-400 animate-pulse" />
        </div>
      </div>
      
      {/* Conteúdo de Texto */}
      <div className="p-6 md:p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-neutral-950">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-blue-400">
            {data.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            {data.title}
          </h3>
        </div>
        
        <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
          {data.description}
        </p>
        
        <div className="mt-auto pt-4 flex items-center text-[10px] md:text-xs font-bold text-neutral-500 uppercase tracking-widest">
          <span className="hidden lg:inline">Passe o mouse</span>
          <span className="lg:hidden">Toque para ver</span>
          <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
        </div>
      </div>
    </div>
  );
}

function GenericCardBack({ data }: { data: CardData["back"] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 md:p-10 text-center bg-zinc-950 rounded-2xl border border-blue-500/30 shadow-[inset_0_0_50px_rgba(37,99,235,0.1)]">
      
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mb-6 -rotate-3 group-hover:rotate-0 transition-all duration-500">
        <Code className="w-8 h-8 text-blue-500" />
      </div>

      <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-8 font-medium">
        {data.description}
      </p>

      {/* Recomendo adicionar uma ação (onClick) aqui ou envolver em um Link do Next.js */}
      <button 
        onClick={(e) => e.stopPropagation()} 
        className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 active:scale-95"
      >
        {data.buttonText}
      </button>

      <span className="mt-6 text-[10px] text-neutral-600 uppercase tracking-widest lg:hidden">
        Toque fora para voltar
      </span>
    </div>
  );
}