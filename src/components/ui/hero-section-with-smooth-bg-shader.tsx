'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ChevronRight, MessageCircle } from 'lucide-react'
import { getWhatsappUrl, siteConfig } from '@/src/lib/constants'

export function HeroSection() {
    return (
        <section id="inicio" className="relative w-full bg-black p-2 sm:p-4">

            <div className="relative min-h-[85vh] md:min-h-[90vh] w-full overflow-hidden rounded-[2.5rem] bg-zinc-950 lg:rounded-[4rem]">

                {/* === BACKGROUND COM VÍDEO === */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/15 via-white/5 to-transparent p-[1px]">
                        <div className="relative h-full w-full overflow-hidden rounded-[calc(inherit-1px)]">
                            <iframe
                                title="Vídeo de apresentação em background"
                                aria-hidden="true"
                                tabIndex={-1}
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
                            Tecnologia focada no futuro, desenhada para a sua realidade.
                        </h1>

                        <p className="mt-6 text-balance text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
                            Apoiamos negócios na transição para um modelo mais eficiente e lucrativo através de Sites Inteligentes, Landing Pages de Alta Conversão e Agentes Autônomos de IA.
                        </p>

                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                            {/* BOTÃO CHAMATIVO (AZUL ELÉTRICO) */}
                            <Button
                                asChild
                                size="lg"
                                className="h-14 w-full rounded-full bg-blue-600 pl-8 pr-6 text-base font-bold text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] active:scale-95 sm:w-auto"
                            >
                                <Link href="#solucoes">
                                    <span>Conhecer Nossas Soluções</span>
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            {/* BOTÃO SECUNDÁRIO (BORDA REFINADA) - COM LINK ATUALIZADO */}
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-14 w-full rounded-full border-2 border-blue-600/30 bg-transparent px-8 text-base font-semibold text-white transition-all hover:border-blue-500 hover:bg-blue-500/10 hover:text-white sm:w-auto"
                            >
                                <Link 
                                    // A MÁGICA ENTRA AQUI:
                                    href={getWhatsappUrl("Olá! Acabei de acessar o site da Mavellium e gostaria de falar com um especialista sobre como usar a tecnologia para escalar meu negócio.")} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5 text-blue-400" />
                                    <span>Falar com Especialista</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}