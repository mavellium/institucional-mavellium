'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { ShieldCheck, Zap, Code2 } from 'lucide-react';

// --- Dados adaptados para a realidade de uma Agência Tech / Projetos Customizados ---
const supportDetails = {
    experts: {
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=560&h=320&fit=crop",
        title: "Acesso aos Especialistas",
        subtitle: "Fale diretamente com os sócios e desenvolvedores do seu projeto.",
    },
    training: {
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=560&h=320&fit=crop",
        title: "Handover e Treinamento",
        subtitle: "Capacitamos a sua equipe para operar as novas automações com maestria.",
    },
    evolution: {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=560&h=320&fit=crop",
        title: "Manutenção Evolutiva",
        subtitle: "Monitoramento ativo, atualizações de segurança e novas features.",
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
    border-top: 1px solid rgba(255,255,255,0.05);
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
      grid-template-columns: 1.1fr 0.9fr;
    }
  }

  .support-image-wrapper {
    position: relative;
    border-radius: 40px;
    overflow: hidden;
    aspect-ratio: 1/1;
    background: #0a0a0a;
    border: 1px solid rgba(59, 130, 246, 0.2); /* Borda com leve tom de azul */
  }

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
    filter: grayscale(20%) contrast(1.15);
    opacity: 0.90;
    transition: all 0.5s ease;
  }
  
  .support-image-wrapper:hover img {
    filter: grayscale(0%) contrast(1.1);
    transform: scale(1.05);
  }

  .support-link {
    color: #fff;
    font-weight: 700;
    cursor: help;
    position: relative;
    padding: 2px 6px;
    background: rgba(59, 130, 246, 0.15); /* Fundo azul translúcido */
    border-radius: 6px;
    transition: all 0.3s ease;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .support-link:hover {
    background: #3b82f6; /* Azul vibrante no hover */
    color: #fff;
    border-color: #3b82f6;
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
    background: #0a0a0a;
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 20px;
    padding: 10px;
    width: 280px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.9), 0 0 40px rgba(59,130,246,0.1);
    backdrop-filter: blur(12px);
  }

  .preview-inner img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 12px;
  }

  .feature-icon-box {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: #3b82f6;
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
                    
                    {/* Lado Esquerdo: Imagem Arredondada */}
                    <div className="support-image-wrapper shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                        <img 
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000" 
                            alt="Código e Estrutura Digital"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/40 to-black/90" />
                        <div className="absolute bottom-10 left-8 right-8 md:left-10 md:right-10 z-20">
                            {/* Card de Testemunho focado em Parceria Técnica */}
                            <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
                                <p className="text-white text-base md:text-lg italic leading-relaxed">
                                    "A maior diferença não foi apenas o código entregue, mas o fato de não sermos abandonados após o lançamento. A parceria técnica é real."
                                </p>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center font-bold text-blue-400 text-sm">
                                        RC
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black uppercase tracking-widest text-white">— Diretor Comercial</span>
                                        <span className="text-xs text-zinc-400">Operação Escalada em 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lado Direito: Conteúdo de Texto */}
                    <div className="support-text-content flex flex-col">
                        <div className="feature-icon-box">
                            <Code2 size={28} strokeWidth={2} />
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-syne tracking-tighter leading-[0.9] mb-8">
                            Evolução <br />
                            <span className="text-blue-500">Contínua.</span>
                        </h2>

                        <div className="space-y-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
                            <p>
                                Acreditamos que o lançamento de um site ou automação é apenas o dia 1. Nossa estrutura garante que você tenha 
                                <span 
                                    className="support-link mx-2"
                                    onMouseEnter={() => triggerPreview('experts')}
                                    onMouseLeave={() => setShowPreview(false)}
                                >
                                    contato direto com os especialistas
                                </span> 
                                que construíram o seu projeto, sem "caixa preta" ou terceirização.
                            </p>

                            <p>
                                Não entregamos a chave e sumimos. Realizamos processos completos de 
                                <span 
                                    className="support-link mx-2"
                                    onMouseEnter={() => triggerPreview('training')}
                                    onMouseLeave={() => setShowPreview(false)}
                                >
                                    handover e treinamento
                                </span>, 
                                garantindo que a sua equipe saiba exatamente como extrair o máximo das novas tecnologias implementadas.
                            </p>

                            <p>
                                Negócios que escalam rápido contam com a nossa 
                                <span 
                                    className="support-link mx-2"
                                    onMouseEnter={() => triggerPreview('evolution')}
                                    onMouseLeave={() => setShowPreview(false)}
                                >
                                    manutenção evolutiva
                                </span>, 
                                um modelo de parceria focado em estabilidade de servidores, otimização contínua de código e desenvolvimento de novas funcionalidades.
                            </p>
                        </div>

                        {/* Badges de Confiança */}
                        <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-blue-500" size={24} />
                                <span className="text-sm uppercase tracking-widest font-bold text-zinc-300">Sem Terceirização</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap className="text-blue-500" size={24} />
                                <span className="text-sm uppercase tracking-widest font-bold text-zinc-300">Padrão Enterprise</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card de Preview (Hover) */}
                <div 
                    className={cn("support-card-preview", showPreview && "active")}
                    style={{ 
                        left: mousePos.x - 140, 
                        top: mousePos.y - 340 // Ajustei a altura para não cobrir o cursor
                    }}
                >
                    {activeItem && (
                        <div className="preview-inner">
                            <img src={activeItem.image} alt={activeItem.title} />
                            <div className="px-3 pb-2 pt-1">
                                <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider">{activeItem.title}</h4>
                                <p className="text-zinc-300 text-xs mt-2 leading-relaxed">{activeItem.subtitle}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}