"use client";

import React from "react";
import { FlippingCard } from "../ui/flipping-card";
import { ArrowRight, Globe, Target, Bot, RotateCw } from "lucide-react";

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
        icon: React.ReactNode;
    };
}

export interface JanusCard {
    id: string;
    image: string;
    imageAlt: string;
    frontTitle: string;
    frontDescription: string;
    backDescription: string;
    buttonText: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
    "sites-inteligentes": <Globe className="w-5 h-5 text-white" />,
    "landing-pages": <Target className="w-5 h-5 text-white" />,
    "automacao-ia": <Bot className="w-5 h-5 text-white" />,
};

const ICON_MAP_BACK: Record<string, React.ReactNode> = {
    "sites-inteligentes": <Globe className="w-8 h-8 text-[#00D26A]" />,
    "landing-pages": <Target className="w-8 h-8 text-[#00D26A]" />,
    "automacao-ia": <Bot className="w-8 h-8 text-[#00D26A]" />,
};

function janusCardToCardData(jc: JanusCard): CardData {
    return {
        id: jc.id,
        front: {
            imageSrc: jc.image,
            imageAlt: jc.imageAlt,
            title: jc.frontTitle,
            description: jc.frontDescription,
            icon: ICON_MAP[jc.id] ?? <Globe className="w-5 h-5 text-white" />,
        },
        back: {
            description: jc.backDescription,
            buttonText: jc.buttonText,
            icon: ICON_MAP_BACK[jc.id] ?? <Globe className="w-8 h-8 text-[#00D26A]" />,
        },
    };
}

interface FlippingCardDemoProps {
    title?: string;
    description?: string;
    cards?: JanusCard[];
}

export default function FlippingCardDemo({
    title = "Soluções Inteligentes",
    description = "Apoiamos negócios de todos os portes na transição para um modelo de operação mais eficiente e lucrativo através de três frentes.",
    cards: cardsProp,
}: FlippingCardDemoProps) {
    const resolvedCards = cardsProp && cardsProp.length > 0
        ? cardsProp.map(janusCardToCardData)
        : [];

    if (resolvedCards.length === 0) return null;

    return (
        <section className="flex flex-col items-center py-16 md:py-24 px-4 bg-[#050505] min-h-screen text-white border-t border-white/5">
            <div className="text-center mb-16 md:mb-20 max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">
                    Soluções <span className="text-[#00D26A]">Inteligentes</span>
                </h2>
                <p className="mt-6 text-zinc-400 font-light text-lg md:text-xl leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl">
                {resolvedCards.map((card) => (
                    <div key={card.id} className="relative group w-full perspective-1000">
                        <FlippingCard
                            className="w-full aspect-square md:aspect-[4/5] lg:aspect-[3/4]"
                            frontContent={<GenericCardFront data={card.front} />}
                            backContent={<GenericCardBack data={card.back} title={card.front.title} />}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

function GenericCardFront({ data }: { data: CardData["front"] }) {
    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-zinc-950 rounded-md border border-white/10 shadow-2xl transition-all duration-300 group-hover:border-[#00D26A]/50 group-hover:shadow-[0_0_30px_rgba(0,210,106,0.1)]">
            <div className="relative h-1/2 overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 bg-[#050505]/60 z-10 group-hover:bg-[#00D26A]/10 transition-colors duration-500" />
                <img
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 p-2 bg-[#050505]/80 backdrop-blur rounded-sm lg:hidden border border-white/10 z-20">
                    <RotateCw className="w-4 h-4 text-[#00D26A] animate-pulse" />
                </div>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-zinc-950">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-sm bg-zinc-900 border border-white/5 text-[#00D26A]">
                        {data.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#00D26A] transition-colors">
                        {data.title}
                    </h3>
                </div>
                <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                    {data.description}
                </p>
                <div className="mt-auto pt-4 flex items-center text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    <span className="hidden lg:inline">Passe o mouse</span>
                    <span className="lg:hidden">Toque para ver</span>
                    <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:text-[#00D26A]" />
                </div>
            </div>
        </div>
    );
}

function GenericCardBack({ data }: { data: CardData["back"], title: string }) {
    // Reposicionamento GEO/AEO (doc/reposicionamento.md item 2.3): este card
    // deixou de ser um produto vendável isoladamente — é um componente da
    // entrega GEO. Por isso o verso não tem mais CTA de compra/WhatsApp, só
    // o texto explicativo (vindo do Janus) + um selo neutro.
    return (
        <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden p-6 md:p-8 text-center bg-zinc-950 rounded-md border border-[#00D26A]/30 shadow-[inset_0_0_50px_rgba(0,210,106,0.05)]">
            <div className="w-14 h-14 rounded-md bg-[#00D26A]/10 border border-[#00D26A]/30 flex items-center justify-center mb-6 shrink-0 -rotate-3 group-hover:rotate-0 transition-all duration-500">
                {data.icon}
            </div>

            <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-light mb-8">
                {data.description}
            </p>

            <div className="w-full shrink-0 mt-auto">
                <span className="inline-flex w-full items-center justify-center gap-2 border border-[#00D26A]/30 text-[#00D26A] px-6 py-4 rounded-md text-[11px] font-bold uppercase tracking-widest">
                    Componente da entrega GEO
                </span>
                <span className="block mt-4 text-[10px] text-zinc-600 uppercase tracking-widest lg:hidden">
                    Toque fora para voltar
                </span>
            </div>
        </div>
    );
}