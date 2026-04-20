"use client";

import { memo, useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { cn } from "@/src/lib/utils";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  cta?: {
    label?: string;
    href?: string;
    variant?: "default" | "outline" | "secondary" | "ghost";
  };
}

// Componente de Card extraído para melhor performance (Memo)
const GalleryCard = memo(({ item }: { item: Gallery4Item }) => (
  <CarouselItem className="max-w-[320px] pl-5 lg:max-w-[420px]">
    <a 
      href={item.href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative block h-[450px] overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl border border-white/5 transition-all hover:border-blue-500/30"
    >
      {/* Imagem com Overlay dinâmico */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40"
      />
      
      {/* Gradiente mais suave e profissional */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      
      {/* Conteúdo */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
        <h3 className="mb-3 text-2xl font-bold leading-tight tracking-tight md:text-3xl group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm text-zinc-400 transition-colors group-hover:text-zinc-200">
          {item.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-blue-500 transition-all group-hover:gap-3 group-hover:text-blue-400">
          Ler Artigo 
          <ExternalLink className="size-4" />
        </div>
      </div>
    </a>
  </CarouselItem>
));

GalleryCard.displayName = "GalleryCard";

export function Gallery4({
  title = "Nosso Blog",
  description = "Insights, tendências e estudos aprofundados sobre tecnologia, design e conversão digital.",
  items,
  cta,
}: Gallery4Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
    setCurrentSlide(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi, onSelect]);

  const finalCta = {
    label: "Acessar Blog Completo",
    href: "/blog",
    variant: "outline" as const, // Alterado para outline para ficar mais elegante
    ...cta,
  };

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32 border-t border-white/10">
      {/* Background Glow sutil */}
      <div className="absolute top-0 left-1/4 size-[500px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-20">
          <div className="max-w-2xl text-white">
            <h2 className="mb-4 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="text-lg text-zinc-400 md:text-xl">{description}</p>
          </div>
          
          {/* Navegação Desktop */}
          <div className="hidden gap-3 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="size-12 rounded-full border-zinc-800 bg-zinc-950 text-white hover:bg-blue-600 hover:border-blue-500 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="size-12 rounded-full border-zinc-800 bg-zinc-950 text-white hover:bg-blue-600 hover:border-blue-500 disabled:opacity-30 transition-colors"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        {/* Note que removi a div solta que envolvia o Carousel para evitar erro de hidratação */}
        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {items.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </CarouselContent>
        </Carousel>

        {/* Paginação & CTA */}
        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-zinc-900 pt-12 md:flex-row">
          {/* Indicadores de Slide */}
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-full",
                  currentSlide === index ? "w-10 bg-blue-500" : "w-3 bg-zinc-800 hover:bg-zinc-600"
                )}
                aria-label={`Ir para artigo ${index + 1}`}
              />
            ))}
          </div>

          <Button
            asChild
            variant={finalCta.variant}
            className="group h-14 rounded-full border-zinc-700 bg-transparent px-8 text-base font-bold text-white transition-all hover:bg-white hover:text-black"
          >
            <a href={finalCta.href} className="flex items-center gap-3">
              {finalCta.label}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}