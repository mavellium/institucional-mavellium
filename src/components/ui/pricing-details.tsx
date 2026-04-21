'use client';

import React from 'react';
import { Button } from '../ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { cn } from '@/src/lib/utils';
import { CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface Plan {
    name: string;
    info: string;
    label: string; // <-- Substituímos o "price" por uma label conceitual
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
                'flex w-full bg-black flex-col items-center justify-center space-y-12 p-4 py-24 border-t border-white/5',
                props.className,
            )}
            {...props}
        >
            <div className="mx-auto max-w-2xl space-y-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                    <Sparkles className="w-3 h-3" />
                    Nossas Frentes
                </div>
                <h2 className="text-white text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    {heading}
                </h2>
                {description && (
                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                        {description}
                    </p>
                )}
            </div>

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 mt-8">
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
                'relative flex w-full flex-col rounded-[2rem] border border-white/10 bg-zinc-900/30 p-2 transition-all duration-500 hover:-translate-y-2 hover:border-white/20',
                plan.highlighted && 'border-blue-500/50 bg-zinc-900/60 shadow-[0_0_40px_rgba(37,99,235,0.15)]',
                className,
            )}
            {...props}
        >
            {plan.highlighted && (
                <BorderTrail
                    style={{ backgroundColor: '#3b82f6' }}
                    size={150}
                />
            )}
            
            <div className="p-8 pb-6">
                <div className="flex justify-between items-center mb-3">
                    <div className="text-2xl font-bold text-white tracking-tight">{plan.name}</div>
                    {plan.highlighted && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                            Mais Procurado
                        </span>
                    )}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{plan.info}</p>
                
                {/* Aqui entra a Label (ex: "Sob Medida") no lugar do preço numérico */}
                <div className="mt-8 flex items-end gap-2 h-10">
                    <span className="text-2xl font-bold text-white tracking-tight">
                        {plan.label}
                    </span>
                </div>
            </div>

            <div className="flex-1 space-y-4 px-8 py-4">
                <div className="h-px bg-white/5 w-full mb-6" />
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className={cn(
                            "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                            plan.highlighted ? "bg-blue-600" : "bg-white/10"
                        )}>
                            <CheckCircle2 className={cn("h-3.5 w-3.5", plan.highlighted ? "text-white" : "text-zinc-400")} />
                        </div>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <p className={cn(
                                        "text-zinc-300 text-sm leading-snug text-left",
                                        feature.tooltip && 'cursor-help border-b border-white/20 border-dashed pb-0.5'
                                    )}>
                                        {feature.text}
                                    </p>
                                </TooltipTrigger>
                                {feature.tooltip && (
                                    <TooltipContent className="bg-zinc-800 text-white border-white/10 rounded-xl p-3 shadow-2xl max-w-[250px]">
                                        <p className="text-xs font-medium leading-relaxed">{feature.tooltip}</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                ))}
            </div>

            <div className="p-6 pt-4 mt-auto">
                <Button
                    className={cn(
                        "w-full rounded-2xl font-bold text-sm uppercase tracking-widest h-14 transition-all duration-300",
                        plan.highlighted 
                            ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                            : "bg-zinc-800 text-white hover:bg-zinc-700"
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
        <div className='pointer-events-none absolute inset-0 rounded-[2rem] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
            <motion.div
                className={cn('absolute aspect-square bg-blue-500', className)}
                style={{
                    width: size,
                    offsetPath: `rect(0 auto auto 0 round 2rem)`,
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