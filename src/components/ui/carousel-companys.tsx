"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useInView } from "react-intersection-observer";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  title?: string;
  description?: string;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, title, description } = props;

  // 1. Estado para saber se o usuário pausou manualmente
  const [isManualPause, setIsManualPause] = useState(false);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, align: "start" }, [
    Autoplay({ playOnInit: false, delay: 6000, stopOnInteraction: false }),
  ]);

  const { autoplayIsPlaying, onAutoplayButtonClick } = useAutoplay(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // 2. Função de Toggle aprimorada para respeitar a vontade do usuário
  const handleToggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsManualPause(true); // Bloqueia o autoplay automático
    } else {
      autoplay.play();
      setIsManualPause(false); // Libera o autoplay automático
    }
  }, [emblaApi]);

  // 3. Efeito de visibilidade agora checa se existe uma pausa manual
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    if (inView && !isManualPause) {
      autoplay.play(); 
    } else {
      autoplay.stop();
    }
  }, [emblaApi, inView, isManualPause]);

  return (
    <div ref={sectionRef} id="metodologia" className="bg-white py-16 md:py-24 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-4xl md:text-6xl font-medium text-zinc-900 mb-6 tracking-tighter">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Slides */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom -ml-4 md:-ml-6">
            {slides.map((slideContent, index) => (
              <div 
                className="flex-[0_0_100%] md:flex-[0_0_50%] pl-4 md:pl-6 transform-gpu" 
                key={index}
              >
                {slideContent}
              </div>
            ))}
          </div>
        </div>

       {/* Barra de Controles (Light Glassmorphism) */}
        <div className="flex mx-auto mt-12 w-fit items-center gap-4 rounded-full border-[1.5] border-zinc-300 bg-white/90 backdrop-blur-md px-6 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:mt-16 md:gap-5">
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
              disabled={prevBtnDisabled}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => onAutoplayButtonClick(onNextButtonClick)}
              disabled={nextBtnDisabled}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Separador Claro */}
          <div className="h-6 w-[1px] bg-zinc-200" />

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onAutoplayButtonClick(() => onDotButtonClick(index))}
                className={cn(
                  "h-2 rounded-full outline-none transition-all duration-500",
                  index === selectedIndex
                    // Verde Mavellium em vez do Azul para combinar com sua marca
                    ? "w-6 bg-[#00D26A] shadow-[0_0_12px_rgba(0,210,106,0.4)]"
                    // Pontos inativos mais claros
                    : "w-2 bg-zinc-300 hover:bg-zinc-400"
                )}
              />
            ))}
          </div>

          {/* Separador Claro */}
          <div className="h-6 w-[1px] bg-zinc-200" />

          <button 
            onClick={handleToggleAutoplay}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95"
          >
            {autoplayIsPlaying ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="ml-1 h-4 w-4 fill-current" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
  };
  
  export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined
  ): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  
    const onPrevButtonClick = useCallback(() => {
      if (!emblaApi) return;
      emblaApi.scrollPrev();
    }, [emblaApi]);
  
    const onNextButtonClick = useCallback(() => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
    }, [emblaApi]);
  
    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);
  
    useEffect(() => {
      if (!emblaApi) return;
      onSelect(emblaApi);
      emblaApi.on("reInit", onSelect).on("select", onSelect);
    }, [emblaApi, onSelect]);
  
    return {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    };
  };
  
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