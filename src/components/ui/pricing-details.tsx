'use client';

import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/src/lib/utils';
import { CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface Plan {
    name: string;
    info: string;
    label: string;
    features: {
        text: string;
        tooltip?: string;
    }[];
    btn: {
        text: string;
        href: string;
    };
    highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
    plans: Plan[];
    heading: string;
    description?: string;
}

export function PricingSection({
    plans,
    heading,
    description,
    ...props
}: PricingSectionProps) {
    return (
        <section
            id="planos"
            className={cn(
                'flex w-full bg-[#050505] flex-col items-center justify-center space-y-12 p-4 py-24 border-t border-white/5',
                props.className,
            )}
            {...props}
        >
            <div className="mx-auto max-w-2xl space-y-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] text-xs font-bold uppercase tracking-widest mb-2">
                    <Sparkles className="w-3 h-3" />
                    Nossas Frentes
                </div>
                <h2 className="text-white text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                    {heading}
                </h2>
                {description && (
                    <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        {description}
                    </p>
                )}
            </div>

            {/* Grid alinhado */}
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 mt-8 items-stretch">
                {plans.map((plan) => (
                    <PricingCard plan={plan} key={plan.name} />
                ))}
            </div>
        </section>
    );
}

export function PricingCard({
    plan,
    className,
    ...props
}: { plan: Plan } & React.ComponentProps<'div'>) {

    return (
        <div
            key={plan.name}
            className={cn(
                'relative flex h-full w-full flex-col rounded-xl border border-white/10 bg-zinc-950 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20',
                plan.highlighted && 'border-[#00D26A]/50 bg-[#050505] shadow-[0_0_40px_rgba(0,210,106,0.08)]',
                className,
            )}
            {...props}
        >
            {/* 1. BADGE FLUTUANTE NA LINHA DA BORDA (ABOVE EVERYTHING) */}
            {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#00D26A] text-black text-[10px] font-bold px-4 py-1.5 rounded-sm uppercase tracking-widest shadow-md z-20">
                    Mais Procurado
                </div>
            )}

            {plan.highlighted && (
                <BorderTrail
                    style={{ backgroundColor: '#00D26A' }}
                    size={150}
                />
            )}

            {/* 2. Cabeçalho Limpo (Sem a tag empurrando o layout) */}
            <div className="flex flex-col items-start gap-3 mb-8 pt-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">{plan.name}</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">{plan.info}</p>
            </div>

            <div className="h-px bg-white/5 w-full mb-8" />

            {/* Sub-label */}
            <div className="mb-6">
                <span className="text-xl font-bold text-white tracking-tight">
                    {plan.label}
                </span>
            </div>

            {/* Lista de Features */}
            <div className="flex flex-col gap-4 flex-grow mb-8">
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 relative group/tooltip">
                        <div className={cn(
                            "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                            plan.highlighted ? "bg-[#00D26A]/20" : "bg-white/5"
                        )}>
                            <CheckCircle2 className={cn("h-3.5 w-3.5", plan.highlighted ? "text-[#00D26A]" : "text-zinc-500")} />
                        </div>

                        <p className={cn(
                            "text-zinc-300 font-light text-sm leading-snug text-left cursor-default",
                            feature.tooltip && 'cursor-help border-b border-white/20 border-dashed pb-0.5'
                        )}>
                            {feature.text}
                        </p>

                        {/* TOOLTIP CUSTOMIZADO */}
                        {feature.tooltip && (
                            <div className="absolute left-8 bottom-full mb-2 hidden w-[220px] rounded-md border border-white/10 bg-zinc-900 p-3 text-xs font-medium text-zinc-300 shadow-2xl opacity-0 group-hover/tooltip:opacity-100 group-hover/tooltip:block transition-opacity z-50 pointer-events-none">
                                {feature.tooltip}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Botão no rodapé */}
            <div className="mt-auto pt-4">
                <Button
                    className={cn(
                        "w-full rounded-md font-bold text-sm uppercase tracking-widest h-14 transition-all duration-300",
                        plan.highlighted
                            ? "bg-[#00D26A] text-black hover:bg-[#00b35a] hover:shadow-[0_0_20px_rgba(0,210,106,0.3)]"
                            : "bg-zinc-800 text-white hover:bg-zinc-700 hover:text-[#00D26A]"
                    )}
                    asChild
                >
                    <Link href={plan.btn.href} target="_blank" rel="noopener noreferrer">{plan.btn.text}</Link>
                </Button>
            </div>
        </div>
    );
}

export function BorderTrail({ className, size = 60, transition, delay, style }: any) {
    return (
        <div className='pointer-events-none absolute inset-0 rounded-xl [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
            <motion.div
                className={cn('absolute aspect-square bg-[#00D26A]', className)}
                style={{
                    width: size,
                    offsetPath: `rect(0 auto auto 0 round 12px)`, // Ajustado para seguir o rounded-xl do card
                    ...style,
                }}
                animate={{ offsetDistance: ['0%', '100%'] }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'linear',
                    delay: delay,
                    ...transition
                }}
            />
        </div>
    );
}