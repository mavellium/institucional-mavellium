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
import { cn } from "@/src/lib/utils"; // Certifique-se de ter essa utilidade ou use template strings

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
      className="group relative block h-[450px] overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl transition-all"
    >
      {/* Imagem com Overlay dinâmico */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60"
      />
      
      {/* Gradiente mais suave e profissional */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      
      {/* Conteúdo */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
        <h3 className="mb-3 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          {item.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm text-zinc-300 transition-colors group-hover:text-white">
          {item.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm font-medium text-blue-400 transition-all group-hover:gap-3 group-hover:text-blue-300">
          Explorar Projeto 
          <ExternalLink className="size-4" />
        </div>
      </div>
    </a>
  </CarouselItem>
));

GalleryCard.displayName = "GalleryCard";

const Gallery4 = ({
  title = "Estudos de Caso",
  description = "Explore como estamos utilizando tecnologias de ponta para criar experiências digitais memoráveis.",
  items,
  cta,
}: Gallery4Props) => {
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
    label: "Iniciar um projeto",
    href: "/contact",
    variant: "default" as const,
    ...cta,
  };

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">
      {/* Background Glow sutil */}
      <div className="absolute top-0 left-1/4 size-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row lg:mb-20">
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
              className="size-12 rounded-full border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-30"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="size-12 rounded-full border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-30"
            >
              <ArrowRight className="size-6" />
            </Button>
          </div>
        </div>

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
        <div className="mt-12 flex flex-col items-center justify-between gap-8 border-t border-zinc-900 pt-12 md:flex-row">
          {/* Indicadores de Slide */}
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full",
                  currentSlide === index ? "w-8 bg-blue-500" : "w-2 bg-zinc-800 hover:bg-zinc-700"
                )}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            asChild
            variant={finalCta.variant}
            className="group relative h-14 overflow-hidden rounded-full bg-white px-10 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            <a href={finalCta.href}>
              <span className="relative z-10 flex items-center gap-2">
                {finalCta.label}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </span>
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 z-0 bg-background/80 " />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };