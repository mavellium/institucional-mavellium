"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  image: string;
}

const faqData: FAQItem[] = [
  {
    question: "Como funciona o suporte 24/7?",
    answer: "Nossa equipe global opera em turnos rotativos para garantir que você tenha uma resposta humana em menos de 15 minutos, independente do fuso horário.",
    category: "Suporte",
    image: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=600&auto=format&fit=crop",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim. Sem contratos de fidelidade ou taxas ocultas. Você pode cancelar ou pausar seu plano diretamente pelo painel de controle com um clique.",
    category: "Assinatura",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
  },
  {
    question: "Quais são as integrações disponíveis?",
    answer: "Conectamos nativamente com Slack, Notion, Jira e mais de 2.000 outros apps via Zapier ou nossa API pública robusta.",
    category: "Integrações",
    image: "https://images.unsplash.com/photo-1551288049-bbbda540d3b9?q=80&w=600&auto=format&fit=crop",
  },
  {
    question: "Meus dados estão seguros e criptografados?",
    answer: "Utilizamos criptografia AES-256 de nível bancário e conformidade total com LGPD e GDPR para garantir que apenas você acesse suas informações.",
    category: "Segurança",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ImmersiveFAQ() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isHoverVisible, setIsHoverVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.12),
        y: lerp(prev.y, mousePosition.y, 0.12),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [mousePosition, isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const toggleAccordion = (index: number) => {
    if (!isMobile) return;
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#fafafa] py-16 lg:py-24 overflow-hidden" id="faq" 
    >
      <div className="relative w-full max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 lg:mb-24 transition-all duration-1000 ease-out ${
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl lg:text-7xl font-bold text-zinc-950 text-center tracking-tighter mb-6">
            Dúvidas <span className="text-zinc-400 italic">Frequentes.</span>
          </h2>
        </div>

        {/* Imagem Flutuante (Desktop Only) */}
        {!isMobile && (
          <div
            className="pointer-events-none absolute z-50 overflow-hidden rounded-2xl border border-zinc-200 shadow-2xl bg-white"
            style={{
              left: 0,
              top: 0,
              width: "300px",
              height: "180px",
              transform: `translate3d(${smoothPosition.x + 30}px, ${smoothPosition.y - 90}px, 0)`,
              opacity: isHoverVisible ? 1 : 0,
              scale: isHoverVisible ? 1 : 0.85,
              transition: "opacity 0.4s ease, scale 0.4s ease",
            }}
          >
            {faqData.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        )}

        {/* Lista de FAQ */}
        <div className="relative border-t border-zinc-200">
          {faqData.map((item, index) => {
            const isOpen = isMobile ? activeIndex === index : hoveredIndex === index;

            return (
              <div
                key={index}
                className="group relative border-b border-zinc-200"
                onMouseEnter={() => !isMobile && (setHoveredIndex(index), setIsHoverVisible(true))}
                onMouseLeave={() => !isMobile && (setHoveredIndex(null), setIsHoverVisible(false))}
                onClick={() => toggleAccordion(index)}
              >
                {/* Background Highlight (Desktop Only) */}
                {!isMobile && (
                  <div className={`absolute inset-0 bg-white transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />
                )}

                <div className="relative py-8 lg:py-10 px-2 lg:px-4 cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-2">
                        {item.category}
                      </span>
                      <h3 className={`text-xl lg:text-3xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? "text-zinc-950" : "text-zinc-500"}`}>
                        {item.question}
                      </h3>
                    </div>
                    
                    <div className={`p-2 rounded-full border transition-all duration-500 ${isOpen ? "border-zinc-950 bg-zinc-950 text-white rotate-45" : "border-zinc-200 text-zinc-400"}`}>
                      <Plus size={18} />
                    </div>
                  </div>

                  {/* Resposta + Imagem Mobile */}
                  <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      {isMobile && (
                        <img 
                          src={item.image} 
                          alt="" 
                          className="w-full h-48 object-cover rounded-xl mb-6 border border-zinc-100"
                        />
                      )}
                      <p className="text-zinc-600 text-base lg:text-lg max-w-2xl leading-relaxed pb-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
            <p className="text-zinc-400 text-2xl">
                Ainda tem dúvidas? <a href="#" className="text-zinc-950 font-medium hover:underline underline-offset-4">Fale conosco.</a>
            </p>
        </div>
      </div>
    </section>
  );
}