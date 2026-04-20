"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

// --- INTERFACES DINÂMICAS ---
export interface FinalCtaData {
  text: {
    headline: string;
    highlight: string;
    description: string;
  };
  theme: {
    bg_color?: string;
    gradient_start: string;
    gradient_end: string;
    button_bg: string;
  };
  calls_to_action: {
    primary: {
      label: string;
      href: string;
      icon: string;
    };
    secondary: {
      label: string;
      href: string;
      icon: string;
    };
  };
}

interface FinalCtaSectionProps {
  data: FinalCtaData;
  className?: string;
}

export default function FinalCtaSection({ data, className = "" }: FinalCtaSectionProps) {
  const { text, theme, calls_to_action } = data;

  const bgStyle = theme.bg_color ? { backgroundColor: theme.bg_color } : {};

  return (
    <section
      className={`py-32 px-6 relative overflow-hidden flex flex-col items-center justify-center border-t border-zinc-100 ${className}`}
      style={bgStyle}
    >
      {/* --- AMBIÊNCIA ORIGINAL --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_top,#fafafa_1px,transparent_1px)] bg-[size:4rem_4rem] bg-bottom [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Alterado para um azul super suave no blur de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-multiply pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tighter leading-[1.05]">
          {text.headline} <br />
          <span
            className="text-transparent bg-clip-text drop-shadow-sm"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.gradient_start}, ${theme.gradient_end})`,
            }}
          >
            {text.highlight}
          </span>
        </h2>

        <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
          {text.description}
        </p>

        {/* --- BOTÃO COM INVERSÃO DE COR --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
          <Link href={calls_to_action.primary.href} target="_blank" rel="noopener noreferrer" className="group relative">
            
            {/* Sombra de contorno que brilha no hover */}
            <div
              className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-all duration-700"
              style={{
                background: `linear-gradient(to right, ${theme.gradient_start}, ${theme.gradient_end})`,
              }}
            />

            <button
              className="relative overflow-hidden px-10 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-4 shadow-xl"
              style={{ backgroundColor: theme.button_bg }}
            >
              {/* LAYER DE PREENCHIMENTO: inicia fora do botão e sobe no hover */}
              <div
                className="absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.gradient_start}, ${theme.gradient_end})`,
                }}
              />

              {/* Texto: muda de branco para branco (já que o gradiente é escuro) */}
              <span className="relative z-10 text-white transition-colors duration-500">
                {calls_to_action.primary.label}
              </span>

              {/* Ícone */}
              <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 group-hover:bg-black/20 flex items-center justify-center transition-all duration-500 group-hover:rotate-[-10deg]">
                <Icon
                  icon={calls_to_action.primary.icon}
                  className="w-5 h-5 text-white transition-colors duration-500"
                />
              </div>
            </button>
          </Link>

          {/* Link Secundário */}
          <Link
            href={calls_to_action.secondary.href}
            className="group flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors"
            onClick={(e) => {
              const href = calls_to_action.secondary.href;
              if (href.startsWith("#")) {
                e.preventDefault();
                const element = document.getElementById(href.slice(1));
                element?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {calls_to_action.secondary.label}
            <Icon
              icon={calls_to_action.secondary.icon}
              className="group-hover:-translate-y-1 transition-transform"
              style={{ color: theme.gradient_start }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}