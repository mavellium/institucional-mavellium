"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
    image: string;
    title: string;
    description: string;
    cta: string;
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
                image: "https://picsum.photos/400/300?1",
                title: "Design elegante",
                description: "Interface moderna com foco em conversão e estética.",
                cta: "Explorar",
            },
            {
                image: "https://picsum.photos/400/300?2",
                title: "Alta performance",
                description: "Velocidade e fluidez para melhor experiência.",
                cta: "Ver mais",
            },
        ],
    },
    {
        value: "minimal",
        label: "Minimalista",
        cards: [
            {
                image: "https://picsum.photos/400/300?3",
                title: "Clean e direto",
                description: "Menos distrações, mais foco no essencial.",
                cta: "Descobrir",
            },
            {
                image: "https://picsum.photos/400/300?4",
                title: "Leve e rápido",
                description: "Carregamento rápido e navegação simples.",
                cta: "Acessar",
            },
        ],
    },
];

export default function PremiumStyleSelector() {
    const [selected, setSelected] = React.useState("modern");
    const current = options.find((o) => o.value === selected);

    return (
        <section className="flex flex-col items-center bg-black gap-10 max-w-full">
            <div className="flex flex-col items-start gap-10 max-w-full mx-auto text-white py-20 px-4">
                {/* TÍTULO COM SELECT */}
                <h2 className="text-3xl md:text-4xl font-semibold mb-10 tracking-tight">
                    Eu quero ver novas histórias de clientes de{" "}
                    <Select value={selected} onValueChange={setSelected}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </h2>

                {/* CARDS COM ANIMAÇÃO */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        {current?.cards.map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="group rounded-2xl overflow-hidden border-1 border-white/20 bg-black/5 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all flex flex-col md:flex-row hover:shadow-[0_0_5px_rgba(250,204,21,0.5),0_0_30px_rgba(236,72,153,0.4)]"
                            >
                                {/* IMAGEM - ESQUERDA (DESKTOP) / TOPO (MOBILE) */}
                                <div className="relative w-full md:w-2/5 h-48 md:h-64 overflow-hidden flex-shrink-0">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:from-black/40 md:to-transparent" />
                                </div>

                                {/* CONTEÚDO - DIREITA (DESKTOP) / BAIXO (MOBILE) */}
                                <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-3/5">
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-xl md:text-2xl font-semibold">{card.title}</h3>
                                        <p className="text-sm text-gray-300">{card.description}</p>
                                    </div>

                                    {/* CTA */}
                                    <button className="mt-4 w-fit px-6 py-2 rounded-lg bg-yellow-500 text-black text-sm font-medium hover:bg-yellow-400 transition">
                                        {card.cta}
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