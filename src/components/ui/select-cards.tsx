"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react"; // Adicionado para ícones

type Card = {
    image: string;
    title: string;
    description: string;
    cta: string;
    tag?: string; // Adicionado tag opcional
};

type Option = {
    value: string;
    label: string;
    cards: Card[];
};

const options: Option[] = [
    {
        value: "modern",
        label: "Tecnologia",
        cards: [
            {
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
                title: "Design de Próxima Geração",
                description: "Interfaces intuitivas que elevam a percepção de valor da sua marca.",
                cta: "Explorar Projeto",
                tag: "Inovação"
            },
            {
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
                title: "Alta Performance Core",
                description: "Arquitetura otimizada para escalabilidade e tempos de resposta instantâneos.",
                cta: "Ver Detalhes",
                tag: "Performance"
            },
        ],
    },
    {
        value: "minimal",
        label: "Minimalista",
        cards: [
            {
                image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800",
                title: "Essencialismo Digital",
                description: "A arte de remover o excesso para focar no que realmente converte.",
                cta: "Descobrir",
                tag: "Clean"
            },
            {
                image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800",
                title: "Leveza Sistêmica",
                description: "Experiências fluidas que respeitam o tempo e a atenção do usuário.",
                cta: "Acessar",
                tag: "UX"
            },
        ],
    },
];

export default function PremiumStyleSelector() {
    const [selected, setSelected] = React.useState("modern");
    const current = options.find((o) => o.value === selected);

    return (
        <section className="w-full bg-[#050505] text-white py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* HEADER COM SELECT INLINE */}
                <div className="flex flex-col gap-2 mb-16">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium uppercase tracking-[0.2em] mb-4">
                        <Sparkles size={14} className="text-yellow-500" />
                        <span>Case Studies</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight flex flex-wrap items-center gap-x-4">
                        Histórias de sucesso em
                        <div className="inline-block">
                            <Select value={selected} onValueChange={setSelected}>
                                <SelectTrigger className="border-none bg-transparent p-0 h-auto text-yellow-500 focus:ring-0 text-4xl md:text-6xl font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                    {options.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className="focus:bg-white/10 focus:text-white">
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </h2>
                </div>

                {/* GRID DE CARDS */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            visible: { transition: { staggerChildren: 0.15 } }
                        }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {current?.cards.map((card, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                    exit: { opacity: 0, scale: 0.95 }
                                }}
                                whileHover={{ y: -10 }}
                                className="group relative flex flex-col md:flex-row bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06]"
                            >
                                {/* OVERLAY DE GRADIENTE NO HOVER */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* IMAGEM */}
                                <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {card.tag && (
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            {card.tag}
                                        </div>
                                    )}
                                </div>

                                {/* CONTEÚDO */}
                                <div className="relative p-8 md:p-10 flex flex-col justify-between flex-1">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold leading-tight group-hover:text-yellow-400 transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-zinc-400 text-base leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>

                                    <button className="mt-8 flex items-center gap-2 text-white font-semibold text-sm group/btn">
                                        <span className="relative">
                                            {card.cta}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-500 transition-all group-hover/btn:w-full" />
                                        </span>
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform text-yellow-500" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}