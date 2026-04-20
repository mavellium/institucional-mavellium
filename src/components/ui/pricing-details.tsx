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
import { CheckCircle2, Sparkles } from 'lucide-react'; // Ícones mais modernos
import Link from 'next/link';
import { motion } from 'framer-motion';

type FREQUENCY = 'mensal' | 'anual';
const frequencies: FREQUENCY[] = ['mensal', 'anual'];

export interface Plan {
    name: string;
    info: string;
    price: {
        mensal: number | string;
        anual: number | string;
    };
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
    const [frequency, setFrequency] = React.useState<FREQUENCY>('mensal');

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
                    Modelos de Parceria
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

            <PricingFrequencyToggle
                frequency={frequency}
                setFrequency={setFrequency}
            />

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                {plans.map((plan) => (
                    <PricingCard plan={plan} key={plan.name} frequency={frequency} />
                ))}
            </div>
        </section>
    );
}

export function PricingFrequencyToggle({
    frequency,
    setFrequency,
    ...props
}: { frequency: FREQUENCY, setFrequency: (f: FREQUENCY) => void } & React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'bg-zinc-900/80 backdrop-blur-md mx-auto flex w-fit rounded-full border border-white/10 p-1.5 shadow-xl',
                props.className,
            )}
            {...props}
        >
            {frequencies.map((freq) => (
                <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className="relative px-8 py-3 text-sm font-bold uppercase tracking-wider transition-colors outline-none"
                >
                    <span className={cn(
                        "relative z-10 transition-colors duration-300",
                        frequency === freq ? "text-white" : "text-zinc-500 hover:text-white"
                    )}>
                        {freq}
                    </span>
                    {frequency === freq && (
                        <motion.span
                            layoutId="frequencyToggle"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            className="bg-blue-600 absolute inset-0 z-0 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}

export function PricingCard({
    plan,
    className,
    frequency = frequencies[0],
    ...props
}: { plan: Plan; frequency?: FREQUENCY } & React.ComponentProps<'div'>) {
    
    // Verifica se é texto (ex: "Sob Medida") ou número (ex: 1500)
    const isCustomPrice = typeof plan.price[frequency] === 'string' && isNaN(Number(plan.price[frequency]));

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
                    style={{ backgroundColor: '#3b82f6' }} // Azul do Tailwind
                    size={150}
                />
            )}
            
            <div className="p-8 pb-6">
                <div className="flex justify-between items-center mb-3">
                    <div className="text-2xl font-bold text-white tracking-tight">{plan.name}</div>
                    {plan.highlighted && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                            Recomendado
                        </span>
                    )}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{plan.info}</p>
                
                <div className="mt-8 flex items-end gap-2 h-14">
                    {!isCustomPrice && <span className="text-2xl font-semibold text-zinc-500 mb-1">R$</span>}
                    <span className={cn("font-bold text-white tracking-tight", isCustomPrice ? "text-4xl" : "text-5xl")}>
                        {plan.price[frequency]}
                    </span>
                    {!isCustomPrice && (
                        <span className="text-zinc-500 text-sm font-medium mb-2">
                            /{frequency}
                        </span>
                    )}
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
                    <Link href={plan.btn.href}>{plan.btn.text}</Link>
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