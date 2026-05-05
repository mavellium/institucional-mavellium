"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, TrendingUp, Cpu, Server } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-cards";

// --- Sub-componentes Otimizados ---
const CardWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative h-full w-full group ${className}`}>
    {/* Bordas ajustadas para rounded-md e hover emitindo um verde sutil */}
    <div className="relative h-full rounded-md border border-white/10 p-[1px] bg-white/5 transition-all duration-300 hover:border-[#00D26A]/30 hover:shadow-[0_0_30px_rgba(0,210,106,0.05)]">
      <GlowingEffect spread={40} glow={true} proximity={64} />
      <div className="relative flex h-full flex-col bg-zinc-950 rounded-[5px] p-6 lg:p-8 overflow-hidden z-10">
        {children}
      </div>
    </div>
  </div>
);

const SectionHeader = memo(() => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        Arquitetura de <span className="text-[#00D26A]">Alta Performance</span>
      </h2>
      <p className="text-zinc-400 mt-4 text-lg text-balance font-light leading-relaxed">
        Não entregamos apenas código. Entregamos uma infraestrutura digital otimizada para eficiência, escalabilidade e redução de custos operacionais.
      </p>
    </motion.div>
    {/* Tag com o verde oficial e brilho correspondente */}
    <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#00D26A]/5 border border-[#00D26A]/20 text-xs font-bold uppercase tracking-widest text-[#00D26A] shadow-[0_0_15px_rgba(0,210,106,0.1)]">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D26A] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D26A]"></span>
      </span>
      Agentes Autônomos de IA
    </div>
  </div>
));

export default function Benefits() {
  return (
    // Fundo alinhado com o #050505 do restante do site
    <section className="p-6 md:p-12 lg:p-20 bg-[#050505] min-h-screen text-zinc-100 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Card 1: Operação 24/7 (Automação IA) - Destaque */}
          <div className="md:col-span-2">
            <CardWrapper>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-sm bg-[#00D26A]/10 flex items-center justify-center border border-[#00D26A]/20">
                  <Clock className="text-[#00D26A] w-6 h-6" />
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-sm border border-white/10 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  IA Autônoma
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Operação 24/7</h3>
              <p className="text-zinc-400 font-light leading-relaxed max-w-md">
                Sua empresa nunca para. Nossos agentes autônomos processam dados, qualificam leads e realizam atendimentos simultâneos a qualquer hora do dia ou da noite, sem perda de qualidade.
              </p>
              
              {/* Elemento Visual Abstrato (Barras em verde Mavellium) */}
              <div className="mt-8 flex gap-2 h-12 items-end opacity-60">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: ["30%", "100%", "30%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                    className="flex-1 bg-[#00D26A]/40 rounded-t-sm"
                  />
                ))}
              </div>
            </CardWrapper>
          </div>

          {/* Card 2: Redução de Custos */}
          <div className="md:col-span-1">
            <CardWrapper>
              <div className="w-12 h-12 rounded-sm bg-[#00D26A]/10 flex items-center justify-center border border-[#00D26A]/20 mb-6">
                <TrendingUp className="text-[#00D26A] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Redução de Custos</h3>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Automatize tarefas repetitivas nos setores comercial, de marketing e contábil, diminuindo drasticamente a carga sobre a sua folha de pagamento.
              </p>
            </CardWrapper>
          </div>

          {/* Card 3: Velocidade e Performance */}
          <div className="md:col-span-1">
            <CardWrapper>
              <div className="w-12 h-12 rounded-sm bg-[#00D26A]/10 flex items-center justify-center border border-[#00D26A]/20 mb-6">
                <Zap className="text-[#00D26A] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Escalabilidade</h3>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Código limpo e infraestrutura preparada para suportar centenas ou milhares de acessos simultâneos sem gargalos.
              </p>
            </CardWrapper>
          </div>

          {/* Card 4: Segurança e Estabilidade */}
          <div className="md:col-span-2">
            <CardWrapper className="bg-gradient-to-br from-zinc-950 to-zinc-900">
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-sm bg-[#00D26A]/10 flex items-center justify-center border border-[#00D26A]/20 mb-6">
                    <Shield className="text-[#00D26A] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Segurança e Proteção</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    A sede digital da sua empresa protegida por protocolos modernos. Criptografia avançada e monitoramento de estabilidade para garantir que sua autoridade no digital permaneça intocável.
                  </p>
                </div>

                {/* Status Rings (Unificados com a paleta da marca) */}
                <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-[#050505] rounded-md border border-white/5">
                    <Server className="text-zinc-500 mb-2 w-5 h-5" />
                    <span className="text-[10px] font-bold text-[#00D26A] tracking-wider">UPTIME</span>
                    <span className="text-lg font-mono font-bold text-white">99.9%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-[#050505] rounded-md border border-white/5">
                    <Cpu className="text-zinc-500 mb-2 w-5 h-5" />
                    <span className="text-[10px] font-bold text-[#00D26A] tracking-wider">RESPOSTA</span>
                    <span className="text-lg font-mono font-bold text-white">&lt;50ms</span>
                  </div>
                </div>
              </div>
            </CardWrapper>
          </div>

        </div>
      </div>
    </section>
  );
}