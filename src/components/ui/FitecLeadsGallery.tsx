"use client";

import { memo, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, UserSquare2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { cn } from "../../lib/utils";

export interface FitecLeadItem {
  id: string;
  name: string;
  text?: string;
  image: string;
}

interface FitecLeadsGalleryProps {
  title?: string;
  description?: string;
  items: FitecLeadItem[];
}

const LeadCard = memo(({ item }: { item: FitecLeadItem }) => (
  <CarouselItem className="max-w-[280px] pl-5 lg:max-w-[320px]">
    <Link 
      href="/fitec-2026"
      className="group relative block h-[380px] overflow-hidden rounded-md bg-zinc-950 shadow-xl border border-white/10 transition-all duration-500 hover:border-[#00D26A]/40 hover:shadow-[0_0_30px_rgba(0,210,106,0.1)] cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.name || "Visitante FITEC"}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40 grayscale group-hover:grayscale-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90" />
      
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
        {item.text && (
          <div className="relative mb-3 w-full">
            <span className="absolute -top-3 -left-1 text-5xl leading-none text-[#00D26A]/30 font-serif select-none pointer-events-none">&ldquo;</span>
            <p className="pt-2 pl-1 text-sm font-light italic text-zinc-200 leading-relaxed line-clamp-4">
              {item.text}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2 mb-3 w-full">
          <span className="w-4 h-px bg-[#00D26A] flex-shrink-0" />
          <h3 className="text-base font-bold leading-tight tracking-tight group-hover:text-[#00D26A] transition-colors line-clamp-1">
            {item.name || "Visitante FITEC"}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-500 transition-all group-hover:text-[#00D26A]">
          <UserSquare2 className="size-4" />
          Lead Janus
        </div>
      </div>
    </Link>
  </CarouselItem>
));

LeadCard.displayName = "LeadCard";

export function FitecLeadsGallery({
  title = "Conexões FITEC 2026",
  description = "Conheça os líderes e inovadores que passaram pelo nosso estande e interajiram com a integração Janus.",
  items,
}: FitecLeadsGalleryProps) {
  // LIMITA O ARRAY A 5 ITENS NO MÁXIMO
  const displayItems = items.slice(0, 5);

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

  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 lg:py-32 border-t border-white/5">
      <div className="absolute top-0 right-1/4 size-[400px] rounded-full bg-[#00D26A]/[0.02] blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center rounded-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-[#00D26A]/10 text-[#00D26A] border border-[#00D26A]/20 mb-4">
              Destaque
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-base text-zinc-400 font-light md:text-lg">{description}</p>
          </div>
          
          <div className="hidden gap-3 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="size-12 rounded-md border-white/10 bg-zinc-950 text-white hover:bg-[#00D26A] hover:text-black hover:border-[#00D26A] disabled:opacity-30 transition-all duration-300"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="size-12 rounded-md border-white/10 bg-zinc-950 text-white hover:bg-[#00D26A] hover:text-black hover:border-[#00D26A] disabled:opacity-30 transition-all duration-300"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-5">
            {/* AGORA ITERA SOBRE 'displayItems' EM VEZ DE 'items' */}
            {displayItems.map((item) => (
              <LeadCard key={item.id} item={item} />
            ))}
          </CarouselContent>
        </Carousel>

        {/* Área inferior com dots de navegação e botão CTA */}
        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          
          {/* Indicadores de Slide (Dots) limitados a 5 */}
          <div className="flex gap-2">
            {displayItems.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-sm",
                  currentSlide === index ? "w-10 bg-[#00D26A]" : "w-3 bg-zinc-800 hover:bg-zinc-600"
                )}
                aria-label={`Ir para lead ${index + 1}`}
              />
            ))}
          </div>

          <Button asChild variant="outline" className="h-14 rounded-md border-white/10 bg-transparent px-8 text-base font-bold text-white transition-all hover:bg-[#00D26A] hover:border-[#00D26A] hover:text-black w-full md:w-auto">
            <Link href="/fitec-2026">Ver Todos os Leads</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}