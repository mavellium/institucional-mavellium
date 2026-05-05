"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
// Importe os dados do arquivo que criamos (ajuste o caminho conforme sua estrutura)
import { selectorOptions } from "@/src/lib/portfolio"; 

export default function PremiumStyleSelector() {
    const [selected, setSelected] = React.useState("landing-pages");
    const current = selectorOptions.find((o) => o.value === selected);

    return (
        <section className="w-full bg-[#050505] text-white py-24 px-6 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                
                {/* HEADER COM SELECT INLINE */}
                <div className="flex flex-col gap-2 mb-16">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] mb-4">
                        <span>Portfólio Customizado</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight flex flex-wrap items-center gap-x-4">
                        Projetos desenhados para
                        <div className="inline-block mt-2 md:mt-0">
                            <Select value={selected} onValueChange={setSelected}>
                                <SelectTrigger className="border-none bg-transparent p-0 h-auto focus:ring-0 text-4xl md:text-6xl font-extrabold transition-all hover:opacity-80">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-950 border-white/10 text-white rounded-md shadow-2xl">
                                    {selectorOptions.map((opt) => (
                                        <SelectItem 
                                            key={opt.value} 
                                            value={opt.value} 
                                            className="focus:bg-zinc-800 focus:text-white cursor-pointer text-lg font-medium rounded-sm transition-colors"
                                        >
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
                        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {current?.cards.map((card, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0 },
                                    exit: { opacity: 0, scale: 0.98 }
                                }}
                                whileHover={{ y: -5 }}
                                className="group relative flex flex-col md:flex-row bg-white/[0.02] border border-white/10 rounded-md overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* IMAGEM */}
                                <div className="relative w-full md:w-5/12 h-64 md:h-auto overflow-hidden">
                                    <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    {card.tag && (
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-zinc-950/80 text-zinc-300 border border-white/10 backdrop-blur-md rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-md">
                                            {card.tag}
                                        </div>
                                    )}
                                </div>

                                {/* CONTEÚDO */}
                                <div className="relative p-8 md:p-10 flex flex-col justify-between flex-1">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold tracking-tight leading-tight text-white">{card.title}</h3>
                                        <p className="text-zinc-400 text-base font-light leading-relaxed">{card.description}</p>
                                    </div>
                                    <button className="mt-8 flex items-center gap-2 text-white font-medium text-sm group/btn w-fit">
                                        <span className="relative">
                                            {card.cta}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover/btn:w-full" />
                                        </span>
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform text-white" />
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