'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { getWhatsappUrl } from '@/src/lib/constants'
import { Button } from '../ui/button'

// Ícone oficial do WhatsApp em SVG para não depender de bibliotecas externas
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
)

export interface HeroSlide {
    id: string | number;
    headline: string;
    headlineHighlight?: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    mediaType: 'image' | 'video';
    mediaUrl: string;
}

interface HeroSectionProps {
    slides?: HeroSlide[];
}

const defaultSlides: HeroSlide[] = [
    {
        id: 1,
        headline: "Impulsione seu negócio com a",
        headlineHighlight: "INTELIGÊNCIA DA MAVELLIUM",
        description: "Desenvolvimento de soluções inteligentes e exclusivas para escalar o seu negócio e dominar o ambiente digital.",
        primaryButtonText: "Conhecer Soluções",
        primaryButtonLink: "#solucoes",
        secondaryButtonText: "Falar com Especialista",
        secondaryButtonLink: getWhatsappUrl("Olá! Gostaria de falar com um especialista sobre como usar a tecnologia da Mavellium para escalar meu negócio."),
        mediaType: 'video',
        mediaUrl: "https://www.youtube.com/embed/9thKG053Tyk?autoplay=1&loop=1&mute=1&controls=0&showinfo=0&modestbranding=1&disablekb=1&playsinline=1&playlist=9thKG053Tyk",
    },
    {
        id: 2,
        headline: "Visite a Mavellium na ",
        headlineHighlight: "FITEC\u00A02026",
        description: "Estaremos nos dias 14 e 15 de maio no Grêmio Teatral Leopoldo Fróes. Venha descobrir ao vivo como a Inteligência Artificial pode automatizar suas vendas.",
        primaryButtonText: "Sobre a Feira",
        primaryButtonLink: "#",
        secondaryButtonText: "Agendar Reunião no Estande",
        secondaryButtonLink: getWhatsappUrl("Olá! Gostaria de agendar um horário no estande da Mavellium durante a FITEC 2026."),
        mediaType: 'image',
        mediaUrl: "https://images.unsplash.com/photo-1620825937374-87fc7d62828e?auto=format&fit=crop&q=80&w=1920"
    }
];

export function HeroSection({ slides = defaultSlides }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const slide = slides[currentSlide];

    return (
        <section id="inicio" className="relative w-full h-[90vh] min-h-[600px] bg-[#050505] overflow-hidden">
            
            {/* === BACKGROUND MEDIA === */}
            <div className="absolute inset-0 z-0 h-full w-full transition-opacity duration-1000">
                {slide.mediaType === 'video' ? (
                    <iframe
                        key={slide.id}
                        title={`Vídeo background ${slide.id}`}
                        aria-hidden="true"
                        tabIndex={-1}
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-[100vh] w-[100vw] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-30 object-cover"
                        src={slide.mediaUrl}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : (
                    <img 
                        src={slide.mediaUrl} 
                        alt="Background Mavellium" 
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            {/* === CONTEÚDO DE TEXTO === */}
            <div className="relative z-10 flex h-full w-full max-w-7xl mx-auto items-center px-6 md:px-12">
                <div className="max-w-4xl text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
                        {slide.headline}{" "}
                        {slide.headlineHighlight && (
                            <span className="text-[#00D26A]">
                                {slide.headlineHighlight}
                            </span>
                        )}
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        {slide.description}
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        {/* Aumentei a fonte para text-lg e mantive a altura do botão (h-14) */}
                        <Button
                            asChild
                            size="lg"
                            className="h-14 rounded-md bg-[#00D26A] text-black font-bold text-lg px-8 hover:bg-[#00b35a] transition-colors sm:w-auto"
                        >
                            <Link href={slide.primaryButtonLink}>
                                <span>{slide.primaryButtonText}</span>
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>

                        {slide.secondaryButtonText && (
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-14 rounded-md border-zinc-800 bg-transparent text-white font-medium text-lg px-8 hover:border-[#00D26A] hover:bg-transparent transition-colors sm:w-auto"
                            >
                                <Link 
                                    href={slide.secondaryButtonLink || "#"} 
                                    target={slide.secondaryButtonLink?.includes('wa.me') ? "_blank" : "_self"}
                                >
                                    {/* Ícone oficial do WhatsApp na cor verde da marca */}
                                    <WhatsAppIcon className="mr-3 h-5 w-5 text-[#00D26A]" />
                                    <span>{slide.secondaryButtonText}</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* === CONTROLES DO CARROSSEL === */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-6">
                    
                    {/* CSS embutido só para a animação da barra - prático e direto! */}
                    <style>{`
                        @keyframes progress-fill {
                            0% { width: 0%; }
                            100% { width: 100%; }
                        }
                    `}</style>

                    <div className="flex gap-3">
                        {slides.map((_, index) => {
                            const isActive = currentSlide === index;
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    // Aumentei o traço ativo para w-12 e botei bg-zinc-800 (trilha escura)
                                    className={`relative h-1 overflow-hidden transition-all duration-300 rounded-full ${
                                        isActive ? 'w-12 bg-zinc-800' : 'w-4 bg-zinc-700 hover:bg-zinc-500'
                                    }`}
                                    aria-label={`Ir para o slide ${index + 1}`}
                                >
                                    {/* A barra verde que vai preenchendo a trilha */}
                                    {isActive && (
                                        <span 
                                            key={`progress-${currentSlide}`} // Isso força a animação a reiniciar ao trocar de slide
                                            className="absolute left-0 top-0 h-full bg-[#00D26A]"
                                            // A animação dura os mesmos 8s do seu useEffect!
                                            style={{ animation: 'progress-fill 8000ms linear forwards' }} 
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex gap-2 hidden md:flex">
                        <button 
                            onClick={prevSlide}
                            className="p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="p-2 text-zinc-500 hover:text-[#00D26A] transition-colors"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}