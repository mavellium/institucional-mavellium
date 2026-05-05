"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Grid, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
// Importe os dados do arquivo que criamos
import { gridImages } from "@/src/lib/portfolio";

export function GalleryGridBlock() {
  const [filter, setFilter] = useState<string>("Todos");
  
  const INITIAL_DISPLAY_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  const categories = useMemo(() => 
    ["Todos", ...new Set(gridImages.map((img) => img.category))],
    []
  );

  const filteredImages = useMemo(() => 
    filter === "Todos"
      ? gridImages
      : gridImages.filter((img) => img.category === filter),
    [filter]
  );

  const displayedImages = filteredImages.slice(0, visibleCount);

  const handleFilterChange = (category: string) => {
    setFilter(category);
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  };

  return (
    <section className="w-full bg-white px-4 py-16 md:py-24 border-t border-zinc-200" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 bg-[#00D26A]/10 text-[#00b35a] border border-[#00D26A]/20 hover:bg-[#00D26A]/20 rounded-sm">
            <Grid className="mr-2 h-3 w-3" />
            Cases de Sucesso
          </Badge>
          <h2 id="gallery-heading" className="mb-4 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900">
            Nosso <span className="text-[#00D26A]">Portfólio</span>
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-500 font-light text-lg">
            Projetos customizados e desenhados cirurgicamente para escalar os resultados de empresas de todos os portes.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className={`rounded-sm px-6 font-medium transition-all duration-300 ${
                filter === category 
                  ? "bg-[#00D26A] text-black border-[#00D26A] hover:bg-[#00b35a] hover:text-black shadow-sm" 
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-[#00D26A]/50 hover:bg-[#00D26A]/5 hover:text-[#00b35a]"
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
                <Link href={image.href} className="block h-full outline-none group">
                  <Card className="h-full flex flex-col overflow-hidden border-zinc-200 bg-white transition-all duration-500 group-hover:border-[#00D26A]/40 group-hover:shadow-[0_10px_40px_-10px_rgba(0,210,106,0.15)] group-hover:-translate-y-2 rounded-md shadow-sm">
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      <div className="absolute inset-0 bg-black/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img src={image.url} alt={image.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      
                      {/* TAGS EM CINZA / BRANCO MANTIDAS AQUI */}
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-white/90 backdrop-blur-md text-zinc-800 border border-zinc-200 rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-sm hover:bg-white transition-colors">
                          {image.category}
                        </Badge>
                      </div>

                    </div>
                    <div className="flex flex-col p-6 space-y-3 flex-grow">
                      <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-[#00D26A] transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-sm text-zinc-500 font-light leading-relaxed line-clamp-3">
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
              className="rounded-md px-8 py-6 text-base font-bold transition-all bg-white border-zinc-200 text-zinc-700 hover:bg-[#00D26A] hover:border-[#00D26A] hover:text-black cursor-pointer group shadow-sm"
              onClick={() => setVisibleCount(prev => prev + 3)}
            >
              <Plus className="mr-2 h-5 w-5 text-[#00b35a] group-hover:text-black transition-colors" />
              Carregar Mais Projetos
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}