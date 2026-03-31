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
import { CheckCircleIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, Transition } from 'framer-motion';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

interface Plan {
    name: string;
    info: string;
    price: {
        monthly: number;
        yearly: number;
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
    const [frequency, setFrequency] = React.useState<FREQUENCY>('monthly');

    return (
        <div
            className={cn(
                'flex w-full bg-black flex-col items-center justify-center space-y-10 p-4 py-20',
                props.className,
            )}
            {...props}
        >
            <div className="mx-auto max-w-xl space-y-3">
                <h2 className="text-center text-white text-4xl font-bold tracking-tight md:text-5xl">
                    {heading}
                </h2>
                {description && (
                    <p className="text-zinc-400 text-center text-base md:text-lg">
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
        </div>
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
                'bg-zinc-900/50 mx-auto flex w-fit rounded-full border border-white/20 p-1.5',
                props.className,
            )}
            {...props}
        >
            {frequencies.map((freq) => (
                <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className="relative px-8 py-2.5 text-sm font-medium capitalize transition-colors"
                >
                    <span className={cn(
                        "relative z-10 transition-colors duration-300",
                        frequency === freq ? "text-black" : "text-white"
                    )}>
                        {freq}
                    </span>
                    {frequency === freq && (
                        <motion.span
                            layoutId="frequency"
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                            className="bg-white absolute inset-0 z-0 rounded-full"
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
    return (
        <div
            key={plan.name}
            className={cn(
                'relative flex w-full flex-col rounded-[1.5rem] border border-white/20 bg-zinc-900/20 p-2 transition-all duration-500',
                plan.highlighted && 'border-white bg-zinc-900/40 shadow-[0_0_40px_rgba(255,255,255,0.05)]',
                className,
            )}
            {...props}
        >
            {plan.highlighted && (
                <BorderTrail
                    style={{ backgroundColor: 'white' }}
                    size={120}
                />
            )}
            
            <div className="p-8 pb-6">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-2xl font-bold text-white tracking-tight">{plan.name}</div>
                    {plan.highlighted && (
                        <span className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                            Mais Popular
                        </span>
                    )}
                </div>
                <p className="text-zinc-500 text-sm">{plan.info}</p>
                
                <div className="mt-8 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white tracking-tight">${plan.price[frequency]}</span>
                    <span className="text-zinc-500 text-sm font-medium">
                        {plan.name !== 'Free' ? `/${frequency === 'monthly' ? 'mês' : 'ano'}` : ''}
                    </span>
                </div>
            </div>

            <div className="flex-1 space-y-4 px-8 py-4">
                <div className="h-px bg-white/10 w-full mb-6" />
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <CheckCircleIcon className="text-black h-3.5 w-3.5" />
                        </div>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <p className={cn(
                                        "text-zinc-300 text-sm",
                                        feature.tooltip && 'cursor-help border-b border-white/20 border-dashed'
                                    )}>
                                        {feature.text}
                                    </p>
                                </TooltipTrigger>
                                {feature.tooltip && (
                                    <TooltipContent className="bg-white text-black border-none rounded-xl p-3 shadow-xl">
                                        <p className="text-xs font-semibold">{feature.tooltip}</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                ))}
            </div>

            <div className="p-4">
                <Button
                    className={cn(
                        "w-full rounded-[1.8rem] font-bold text-base h-14 transition-all duration-300",
                        plan.highlighted 
                            ? "bg-white text-black hover:bg-zinc-200" 
                            : "bg-transparent text-white hover:bg-white hover:text-black border border-white/30 hover:border-white"
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
        <div className='pointer-events-none absolute inset-0 rounded-[2.5rem] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
            <motion.div
                className={cn('absolute aspect-square bg-white', className)}
                style={{
                    width: size,
                    offsetPath: `rect(0 auto auto 0 round 2.5rem)`,
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