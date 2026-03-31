'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative w-full bg-black p-2 sm:p-4">
            
            <div className="relative min-h-[85vh] md:min-h-[90vh] w-full overflow-hidden rounded-[2.5rem] bg-zinc-950 lg:rounded-[4rem]">
                
                {/* === BACKGROUND COM VÍDEO === */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/15 via-white/5 to-transparent p-[1px]">
                        
                        <div className="relative h-full w-full overflow-hidden rounded-[calc(inherit-1px)]">
                            
                            <iframe
                                title="Vídeo de apresentação em background"
                                aria-hidden="true"
                                tabIndex={-1}
                                // A MÁGICA FINAL ESTÁ AQUI: adicionei `scale-[1.2]`
                                // Isso dá um zoom de 20% no iframe, empurrando qualquer borda preta para fora da tela.
                                className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-[100vh] w-[100vw] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-50 mix-blend-luminosity duration-700 ease-in-out dark:opacity-60"
                                src="https://www.youtube.com/embed/9thKG053Tyk?autoplay=1&loop=1&mute=1&controls=0&showinfo=0&modestbranding=1&disablekb=1&playsinline=1&playlist=9thKG053Tyk"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-black/20" />
                        </div>
                    </div>
                </div>

                {/* === CONTEÚDO DE TEXTO === */}
                <div className="relative z-10 mx-auto flex w-full max-w-7xl min-h-[85vh] md:min-h-[90vh] items-center px-6 py-24 lg:px-12 lg:py-48">
                    <div className="max-w-3xl text-center lg:text-left">
                        
                        <h1 className="text-balance text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                            Chega de inércia.<br />
                            Nós fazemos acontecer.
                        </h1>
                        
                        <p className="mt-6 text-balance text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
                            Você tem a visão, nós somos o parceiro certo para executar. Assumimos o desenvolvimento do seu projeto com tecnologia de ponta para você focar apenas no seu negócio. Bora tirar essa ideia do papel?
                        </p>

                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 w-full rounded-full bg-white pl-6 pr-4 text-base font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:bg-zinc-200 sm:w-auto"
                            >
                                <Link href="#link">
                                    <span>Vamos fazer acontecer</span>
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            
                            <Button
                                asChild
                                size="lg"
                                variant="ghost"
                                className="h-12 w-full rounded-full px-6 text-base font-semibold text-white transition-all hover:bg-white/10 hover:text-white sm:w-auto"
                            >
                                <Link href="#link">
                                    <span>Falar com especialista</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    )
}