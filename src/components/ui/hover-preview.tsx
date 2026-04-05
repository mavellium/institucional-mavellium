'use client';

import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { Headset, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

const supportDetails = {
    realtime: {
        image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=560&h=320&fit=crop",
        title: "Chat em Tempo Real",
        subtitle: "Resposta média em menos de 2 minutos com agentes reais.",
    },
    documentation: {
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=560&h=320&fit=crop",
        title: "Base de Conhecimento",
        subtitle: "Mais de 500 artigos detalhados para autoatendimento 24/7.",
    },
    priority: {
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=560&h=320&fit=crop",
        title: "Suporte VIP",
        subtitle: "Gerente de conta dedicado para planos Enterprise.",
    },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@800&display=swap');

  .support-section-container {
    min-height: 100vh;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    font-family: 'Space Grotesk', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .support-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 80px;
    max-width: 1200px;
    width: 100%;
    align-items: center;
    z-index: 10;
  }

  @media (min-width: 1024px) {
    .support-grid {
      /* Inverti a proporção: imagem maior à esquerda */
      grid-template-columns: 1.1fr 0.9fr;
    }
  }

  .support-image-wrapper {
    position: relative;
    border-radius: 40px;
    overflow: hidden;
    aspect-ratio: 1/1;
    background: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.12); /* Aumentei um pouco o contraste da borda */
  }

  /* Para telas menores, inverto a ordem para o texto aparecer antes */
  @media (max-width: 1023px) {
    .support-image-wrapper {
      order: 2;
    }
    .support-text-content {
      order: 1;
    }
  }

  .support-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(10%) contrast(1.15); /* Imagem um pouco mais "viva" */
    opacity: 0.95;
  }

  .support-link {
    color: #fff;
    font-weight: 700;
    cursor: help;
    position: relative;
    padding: 0 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .support-link:hover {
    background: #fff;
    color: #000;
  }

  .support-card-preview {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(15px) scale(0.98);
    transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
  }

  .support-card-preview.active {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-inner {
    background: #111;
    border: 1px solid rgba(255,255,255,0.2); /* Borda mais visível no dark */
    border-radius: 20px;
    padding: 10px;
    width: 260px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.9);
    backdrop-filter: blur(12px);
  }

  .preview-inner img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 12px;
  }

  .feature-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #fff;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }
`;

export default function SupportHoverSection() {
    const [activeItem, setActiveItem] = useState<any>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showPreview, setShowPreview] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const triggerPreview = (key: string) => {
        setActiveItem(supportDetails[key as keyof typeof supportDetails]);
        setShowPreview(true);
    };

    return (
        <>
            <style>{styles}</style>
            <section className="support-section-container" onMouseMove={handleMouseMove}>
                <div className="support-grid">
                    
                    {/* Lado Esquerdo: Imagem Arredondada (AGORA PRIMEIRO) */}
                    <div className="support-image-wrapper shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                            alt="Equipe de Suporte"
                        />
                        {/* Gradiente um pouco mais escuro para garantir contraste do texto */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/80" />
                        <div className="absolute bottom-10 left-10 right-10 z-20">
                            {/* Card de Testemunho Premium */}
                            <div className="bg-zinc-900/60 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl">
                                <p className="text-white text-base italic leading-relaxed">"O melhor suporte que já experimentamos em uma plataforma SaaS. Eles realmente se importam."</p>
                                <div className="mt-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/30 flex items-center justify-center font-bold text-white text-xs">TF</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black uppercase tracking-widest text-white">— Diretor de Operações</span>
                                        <span className="text-xs text-zinc-400">TechFlow Soluções</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito: Conteúdo de Texto */}
                    <div className="support-text-content flex flex-col">
                        <div className="feature-icon-box">
                            <Headset size={24} strokeWidth={2.5} />
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl font-bold font-syne tracking-tighter leading-[0.9] mb-8">
                            Sempre aqui, <br />
                            <span className="text-zinc-600">quando precisar.</span>
                        </h2>

                        <div className="space-y-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
                            <p>
                                Acreditamos que um produto excelente só é completo com um suporte impecável. Nossa equipe está disponível para garantir que você nunca perca o ritmo, oferecendo 
                                <span 
                                    className="support-link mx-1"
                                    onMouseEnter={() => triggerPreview('realtime')}
                                    onMouseLeave={() => setShowPreview(false)}
                                >
                                    atendimento em tempo real
                                </span> 
                                focado em resolver problemas técnicos em minutos, não dias.
                            </p>

                            <p>
                                Para dúvidas rápidas e guias passo a passo, você pode navegar por nossa 
                                <span 
                                    className="support-link mx-1"
                                    onMouseEnter={() => triggerPreview('documentation')}
                                    onMouseLeave={() => setShowPreview(false)}
                                >
                                    central de ajuda
                                </span>, 
                                um repositório completo com vídeos e tutoriais criados pelos nossos próprios desenvolvedores.
                            </p>

                            <p>
                                Grandes empresas contam com a tranquilidade do nosso 
                                <span 
                                    className="support-link mx-1"
                                    onMouseEnter={() => triggerPreview('priority')}
                                    onMouseLeave={() => setShowPreview(false)}
                                >
                                    Suporte Prioritário
                                </span>, 
                                que inclui um SLA garantido e acesso direto via Slack ou WhatsApp.
                            </p>
                        </div>

                        {/* Badges de Confiança */}
                        <div className="mt-12 flex flex-wrap gap-6 border-t border-zinc-900 pt-8">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-emerald-400" size={18} />
                                <span className="text-md uppercase tracking-widest font-bold text-zinc-500">99.8% Satisfação</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="text-emerald-400" size={18} />
                                <span className="text-md uppercase tracking-widest font-bold text-zinc-500">Resposta em &lt; 2min</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card de Preview (Hover) */}
                <div 
                    className={cn("support-card-preview", showPreview && "active")}
                    style={{ 
                        left: mousePos.x - 130, 
                        top: mousePos.y - 320 
                    }}
                >
                    {activeItem && (
                        <div className="preview-inner">
                            <img src={activeItem.image} alt={activeItem.title} />
                            <div className="px-2">
                                <h4 className="text-white font-bold text-sm uppercase">{activeItem.title}</h4>
                                <p className="text-zinc-500 text-xs mt-1 leading-snug">{activeItem.subtitle}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}