"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { getWhatsappUrl, siteConfig } from "@/src/lib/constants";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  image: string;
}

// --- Textos adaptados para a sua Empresa de Projetos Customizados ---
const faqData: FAQItem[] = [
  {
    question: "Como funciona o desenvolvimento do meu projeto?",
    answer: "Trabalhamos com total transparência através de 5 passos: Imersão e Briefing, Análise de Viabilidade Técnica, Cronograma, Desenvolvimento acompanhado por você e Entrega Final. Você nunca fica no escuro.",
    category: "Metodologia",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  },
  {
    question: "Os projetos são feitos a partir de templates prontos?",
    answer: "Não. Nós desenvolvemos projetos altamente customizados, desenhados cirurgicamente para a realidade e necessidade de cada cliente, seja uma Landing Page de conversão ou a sede digital da sua empresa.",
    category: "Customização",
    image: "https://images.unsplash.com/photo-1551288049-bbbda540d3b9?q=80&w=600&auto=format&fit=crop",
  },
  {
    question: "Onde vocês estão localizados? Atendem todo o país?",
    answer: "Nossa operação técnica e expertise estão estabelecidas no polo de Garça-SP. No entanto, nossa infraestrutura digital nos permite atuar como parceiros estratégicos para pequenas, médias e grandes empresas em todo o território nacional.",
    category: "Atendimento",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
  },
  {
    question: "O que acontece após o lançamento do projeto?",
    answer: "Nós não entregamos o código e sumimos. Oferecemos modelos de parceria evolutiva, garantindo que o seu projeto conte com manutenção constante, segurança de dados e atualizações contínuas.",
    category: "Pós-Entrega",
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
      className="relative w-full bg-white py-16 lg:py-24 overflow-hidden border-t border-zinc-200" id="faq"
    >
      <div className="relative w-full max-w-5xl mx-auto px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 lg:mb-24 transition-all duration-1000 ease-out ${headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          <h2 className="text-4xl lg:text-7xl font-medium text-zinc-950 text-center tracking-tighter mb-6">
            Dúvidas <span className="text-[#00D26A]">Frequentes.</span>
          </h2>
        </div>

        {/* Imagem Flutuante (Desktop Only) */}
        {!isMobile && (
          <div
            className="pointer-events-none absolute z-50 overflow-hidden rounded-md border border-zinc-200 shadow-2xl bg-white"
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
                  <div className={`absolute inset-0 bg-zinc-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />
                )}

                <div className="relative py-8 lg:py-10 px-2 lg:px-4 cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      {/* Cor do texto da categoria com um verde mais fechado para leitura no fundo claro */}
                      <span className="text-[10px] font-bold text-[#00b35a] uppercase tracking-widest block mb-2">
                        {item.category}
                      </span>
                      <h3 className={`text-xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-zinc-950" : "text-zinc-500"}`}>
                        {item.question}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-md border transition-all duration-500 ${isOpen ? "border-[#00D26A] bg-[#00D26A] text-black rotate-45 shadow-sm" : "border-zinc-200 text-zinc-400"}`}>
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
                          className="w-full h-48 object-cover rounded-md mb-6 border border-zinc-200"
                        />
                      )}
                      <p className="text-zinc-600 text-base lg:text-lg font-light max-w-2xl leading-relaxed pb-4">
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
          <p className="text-zinc-500 text-xl md:text-2xl font-light">
            Sua dúvida não está aqui?{" "}
            <a
              href={getWhatsappUrl("Olá, equipe Mavellium! Eu estava lendo as dúvidas frequentes no site, mas ainda tenho uma pergunta específica sobre como vocês podem me ajudar.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00b35a] font-bold hover:text-[#00D26A] hover:underline underline-offset-4 transition-colors"
            >
              Fale com a nossa equipe.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}