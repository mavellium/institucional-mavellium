"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/src/lib/utils";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  title?: string;
  description?: string;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, title, description } = props;

  // Autoplay configurado para 6000ms (6 segundos)
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 6000, stopOnInteraction: false }),
  ]);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="bg-white py-16 md:py-24 border-t border-zinc-100">
      {/* Header Geral da Seção - Tamanhos Ampliados */}
      {(title || description) && (
        <div className="text-center mb-16 px-6">
          {title && (
            <h2 className="text-5xl md:text-7xl font-extrabold text-zinc-900 mb-6 tracking-tighter">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Container dos Slides */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slideContent, index) => (
            <div 
              className="flex-[0_0_85%] md:flex-[0_0_75%] pl-4 transform-gpu" 
              key={index}
            >
              {/* FORÇANDO TAMANHOS NOS SLIDES:
                O seletor abaixo garante que títulos (h1, h2, h3) e parágrafos 
                dentro do conteúdo injetado fiquem grandes e legíveis.
              */}
              <div className="
                [&_h1]:text-4xl [&_h1]:md:text-6xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:px-5 [&_h1]:text-white
                [&_h2]:text-3xl [&_h2]:md:text-5xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:px-5 [&_h2]:text-white
                [&_h3]:text-2xl [&_h3]:md:text-4xl [&_h3]:font-bold [&_h3]:mb-3 [&_h3]:px-5 [&_h3]:text-white
                [&_p]:text-lg [&_p]:md:text-xl [&_p]:text-white/80 [&_p]:px-5 [&_p]:leading-relaxed
              ">
                {slideContent}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de Navegação e Autoplay */}
      <div className="flex mx-auto max-w-md justify-center items-center gap-8 mt-12">
        {/* Dots de Navegação */}
        <div className="flex justify-center gap-3">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() =>
                onAutoplayButtonClick(() => onDotButtonClick(index))
              }
              className={cn(
                "w-3.5 h-3.5 rounded-full border-2 transition-all duration-300",
                index === selectedIndex
                  ? "bg-zinc-900 border-zinc-900 scale-125 shadow-md"
                  : "bg-transparent border-zinc-300 hover:border-zinc-500"
              )}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <Button 
          size={'icon'} 
          variant={"outline"} 
          onClick={toggleAutoplay} 
          type="button"
          className="rounded-full w-14 h-14 border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all shadow-sm active:scale-95"
        >
          {autoplayIsPlaying ? (
            <Pause className="w-6 h-6" fill="currentColor" />
          ) : (
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          )}
        </Button>
      </div>
    </div>
  );
};

// ---------- HOOKS E HELPERS ----------

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;
      const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick };
};

type PropTypeButton = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const DotButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;
  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

export { Carousel };