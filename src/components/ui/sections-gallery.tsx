"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Grid, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link"; // Importação do Link

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    title: "Abstract Architecture",
    description: "Uma exploração visual de formas geométricas e sombras profundas em estruturas modernas.",
    category: "Architecture",
    href: "/portfolio/abstract-architecture", // Link de destino
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800",
    title: "Modern Design",
    description: "O equilíbrio perfeito entre minimalismo e funcionalidade no design contemporâneo.",
    category: "Design",
    href: "/portfolio/modern-design",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
    title: "Urban Landscape",
    description: "A natureza retomando seu espaço em meio ao concreto das grandes metrópoles.",
    category: "Nature",
    href: "/portfolio/urban-landscape",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    title: "Digital Art",
    description: "Expressões abstratas criadas através de algoritmos e manipulação de luz digital.",
    category: "Art",
    href: "/portfolio/digital-art",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800",
    title: "Creative Space",
    description: "Ambientes projetados para estimular a criatividade e o fluxo de trabalho colaborativo.",
    category: "Architecture",
    href: "/portfolio/creative-space",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    title: "Minimalist View",
    description: "A beleza do vazio e a sofisticação das linhas simples em foco.",
    category: "Design",
    href: "/portfolio/minimalist-view",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    title: "Minimalist View",
    description: "A beleza do vazio e a sofisticação das linhas simples em foco.",
    category: "Design",
    href: "/portfolio/minimalist-view",
  },
];

export function GalleryGridBlock() {
  const [filter, setFilter] = useState<string>("All");
  
  // 1. Estado para controlar quantos itens mostrar
  const INITIAL_DISPLAY_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  const categories = useMemo(() => 
    ["All", ...new Set(galleryImages.map((img) => img.category))],
    []
  );

  // Itens após o filtro de categoria
  const filteredImages = useMemo(() => 
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter),
    [filter]
  );

  // 2. Itens que serão efetivamente renderizados (limitados pelo visibleCount)
  const displayedImages = filteredImages.slice(0, visibleCount);

  // 3. Função para resetar o contador quando mudar o filtro (opcional, melhora UX)
  const handleFilterChange = (category: string) => {
    setFilter(category);
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  };

  return (
    <section className="w-full bg-background px-4 py-16" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4" variant="secondary">
            <Grid className="mr-1 h-3 w-3" />
            Galeria
          </Badge>
          <h2 id="gallery-heading" className="mb-4 text-4xl md:text-6xl font-bold tracking-tight">
            Nosso Portfólio
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore nossa coleção de visuais impressionantes e trabalhos criativos.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={image.href} className="block h-full outline-none">
                  <Card className="group h-full flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-1">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-black/60 backdrop-blur-md text-white border-none">
                          {image.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col p-5 space-y-2">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {image.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4. Lógica do Botão "Ver Mais" */}
        {filteredImages.length > visibleCount && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 font-semibold transition-all hover:bg-black cursor-pointer hover:text-white"
              onClick={() => setVisibleCount(prev => prev + 3)} // Aumenta de 3 em 3
            >
              <Plus className="mr-2 h-4 w-4" />
              Ver mais projetos
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}