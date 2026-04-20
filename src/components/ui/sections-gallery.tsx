"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Grid, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

// --- Dados do Portfólio ---
const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    title: "Portal Corporativo Global",
    description: "Site Institucional B2B focado em posicionar a marca e apresentar o histórico e valores da empresa ao mercado global.",
    category: "Sites Inteligentes",
    href: "#",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    title: "Captura B2C - Black Friday",
    description: "Landing Page de extrema conversão, desenhada sem distrações para maximizar a captura de leads durante campanha sazonal.",
    category: "Landing Pages",
    href: "#",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    title: "Triagem Inteligente 24/7",
    description: "Agente autônomo operando no setor comercial para qualificar leads instantaneamente e reduzir carga da equipe humana.",
    category: "Automação e IA",
    href: "#",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
    title: "Lançamento Infoproduto",
    description: "Página de destino focada em gatilhos mentais e quebra de objeções, guiando o usuário direto para a ação de compra.",
    category: "Landing Pages",
    href: "#",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    title: "Plataforma Institucional",
    description: "A sede digital da empresa, estruturada para transmitir autoridade e trabalhar como ponto de partida para fidelização.",
    category: "Sites Inteligentes",
    href: "#",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    title: "Automação Contábil",
    description: "Sistema inteligente para processar dados repetitivos e rotinas financeiras, garantindo velocidade sem perda de qualidade.",
    category: "Automação e IA",
    href: "#",
  },
];

export function GalleryGridBlock() {
  const [filter, setFilter] = useState<string>("Todos");
  
  const INITIAL_DISPLAY_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  const categories = useMemo(() => 
    ["Todos", ...new Set(galleryImages.map((img) => img.category))],
    []
  );

  const filteredImages = useMemo(() => 
    filter === "Todos"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter),
    [filter]
  );

  const displayedImages = filteredImages.slice(0, visibleCount);

  const handleFilterChange = (category: string) => {
    setFilter(category);
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  };

  return (
    // Fundo alterado para bg-white e borda sutil cinza
    <section className="w-full bg-white px-4 py-16 md:py-24 border-t border-zinc-100" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">
            <Grid className="mr-2 h-3 w-3" />
            Cases de Sucesso
          </Badge>
          <h2 id="gallery-heading" className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
            Nosso <span className="text-blue-600">Portfólio</span>
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-500 text-lg">
            Projetos customizados e desenhados cirurgicamente para as necessidades de empresas de todos os portes.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className={`rounded-full px-6 transition-all duration-300 ${
                filter === category 
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white shadow-sm" 
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayedImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Link href={image.href} className="block h-full outline-none">
                  <Card className="group h-full flex flex-col overflow-hidden border-zinc-200 bg-white transition-all duration-500 hover:border-blue-300 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)] hover:-translate-y-2 rounded-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      {/* Overlay mais suave para o tema claro */}
                      <div className="absolute inset-0 bg-black/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img
                        src={image.url}
                        alt={image.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        {/* Badge da imagem em branco fosco para leitura elegante */}
                        <Badge className="bg-white/90 backdrop-blur-md text-zinc-800 border border-white/50 text-xs font-semibold tracking-wider uppercase shadow-sm">
                          {image.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col p-6 space-y-3 flex-grow">
                      <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                        {image.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Botão Ver Mais */}
        {filteredImages.length > visibleCount && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 py-6 text-base font-semibold transition-all bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 cursor-pointer shadow-sm"
              onClick={() => setVisibleCount(prev => prev + 3)}
            >
              <Plus className="mr-2 h-5 w-5 text-blue-600" />
              Carregar Mais Projetos
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}