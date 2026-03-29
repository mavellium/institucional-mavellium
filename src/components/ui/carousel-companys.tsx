"use client";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  title?: string;
  description?: string;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, title, description } = props;
  const progressNode = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]); 

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="bg-black py-10">
      {/* Optional title and description */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ml-auto mr-3">
          {slides.map((slideContent, index) => (
            <div className="flex-[0_0_70%] pl-3 transform-gpu" key={index}>
              {slideContent}
            </div>
          ))}
        </div>
      </div>

      <div className="flex mx-auto max-w-80 justify-center items-center gap-3 mt-7">
        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() =>
                onAutoplayButtonClick(() => onDotButtonClick(index))
              }
              className={`w-3 h-3 rounded-full border-2 border-border transition-colors duration-200 ${
                index === selectedIndex
                  ? "bg-white"
                  : "bg-transparent hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <Button size={'icon'} variant={"secondary"} onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? (
            <Pause fill="currentColor" />
          ) : (
            <Play fill="currentColor" />
          )}
        </Button>
      </div>
    </div>
  );
};

// ---------- hooks and helpers (unchanged) ----------
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

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
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

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

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

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  };
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
    onNextButtonClick,
  };
};

type PropTypeButton = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-transparent text-foreground disabled:text-muted-foreground"
      type="button"
      {...restProps}
    >
      <ChevronLeft />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-transparent text-foreground disabled:text-muted-foreground"
      type="button"
      {...restProps}
    >
      <ChevronRight />
      {children}
    </button>
  );
};

export { Carousel };