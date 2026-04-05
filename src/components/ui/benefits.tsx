"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Box, Lock, Search, Settings, Sparkles, Shield, Rocket, Activity, Globe, ArrowUpRight } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-cards";

// --- Configurações de Dados ---
const METRICS = [
  { label: "Clientes", value: "3", icon: Box, color: "text-yellow-400" },
  { label: "Satisfação", value: "98%", icon: Shield, color: "text-pink-400" },
  { label: "Anos", value: "1", icon: Sparkles, color: "text-blue-400" },
  { label: "Projetos", value: "5", icon: Rocket, color: "text-purple-400" },
];

const SECURITY_STATS = [
  { label: "Firewall", value: 100, color: "bg-blue-500" },
  { label: "SSL/TLS", value: 100, color: "bg-emerald-500" },
  { label: "DDoS Protection", value: 85, color: "bg-purple-500" },
];

// --- Sub-componentes Otimizados ---

const CardWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative h-full w-full group ${className}`}>
    <div className="relative h-full rounded-2xl border border-white/10 p-[1px] bg-white/5 transition-all duration-300 hover:border-white/20">
      <GlowingEffect spread={40} glow={true} proximity={64} />
      <div className="relative flex h-full flex-col bg-zinc-950 rounded-[15px] p-5 overflow-hidden">
        {children}
      </div>
    </div>
  </div>
);

const SectionHeader = memo(() => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
        Dashboard de <span className="text-yellow-400 italic">Resultados</span>
      </h2>
      <p className="text-zinc-400 mt-4 text-balance">
        Infraestrutura de alta performance com monitoramento ativo e segurança enterprise-grade.
      </p>
    </motion.div>
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      Sistema Live
    </div>
  </div>
));

export default function Benefits() {
  return (
    <section className="p-6 md:p-12 lg:p-20 bg-black min-h-screen text-zinc-100 selection:bg-yellow-400/30">
      <SectionHeader />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-fr">
        
        {/* Lado Esquerdo: Grid de Métricas Rápidas */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          {METRICS.map((item, idx) => (
            <div key={idx} className="relative group p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-900 transition-colors">
              <item.icon className={`w-5 h-5 ${item.color} mb-3`} />
              <div className="text-2xl font-bold tracking-tight">{item.value}</div>
              <div className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Centro: Gráfico de Barras Principal */}
        <div className="md:col-span-8">
          <CardWrapper>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-yellow-400" />
                <span className="text-sm font-bold uppercase tracking-tight">Tráfego de Rede</span>
              </div>
              <ArrowUpRight size={16} className="text-zinc-600" />
            </div>
            <div className="flex items-end justify-between h-40 gap-1.5">
              {[30, 45, 35, 60, 90, 70, 85, 40, 65, 50, 95, 80].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ height: `${h}%`, originY: 1 }}
                  className="flex-1 bg-gradient-to-t from-yellow-500/10 via-yellow-400/40 to-yellow-400 rounded-t-sm"
                />
              ))}
            </div>
          </CardWrapper>
        </div>

        {/* Linha Inferior: Segurança e Status */}
        <div className="md:col-span-5">
          <CardWrapper>
            <div className="flex items-center gap-2 mb-6">
              <Lock size={16} className="text-blue-400" />
              <span className="text-sm font-bold uppercase tracking-tight">Segurança Ativa</span>
            </div>
            <div className="space-y-5">
              {SECURITY_STATS.map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-1.5 font-medium text-zinc-400 uppercase">
                    <span>{stat.label}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: `${stat.value}%` }}
                      className={`h-full ${stat.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>

        <div className="md:col-span-4">
          <CardWrapper>
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} className="text-emerald-400" />
              <span className="text-sm font-bold uppercase tracking-tight">Uptime Global</span>
            </div>
            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-6 rounded-[2px] transition-all hover:scale-110 ${
                    i === 18 ? 'bg-zinc-800' : 'bg-emerald-500/30 border border-emerald-500/20'
                  }`} 
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
              <span>99.98% SUCESSO</span>
              <span>LATÊNCIA: 24MS</span>
            </div>
          </CardWrapper>
        </div>

        <div className="md:col-span-3">
          <div className="h-full rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-6 flex flex-col items-center justify-center text-center group cursor-help">
            <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
              <Search className="text-yellow-400" size={20} />
            </div>
            <h4 className="text-sm font-bold">SEO Audit</h4>
            <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
              Otimização de indexação automática em todos os motores de busca.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}