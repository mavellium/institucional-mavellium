"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface Project {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
}

interface ProjectShowcaseProps {
  projects?: Project[];
  title?: string;
  description?: string;
}

const defaultProjects: Project[] = [
  {
    title: "Lumina",
    description: "AI-powered design system generator.",
    year: "2024",
    link: "#",
    image: "https://plus.unsplash.com/premium_photo-1723489242223-865b4a8cf7b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    title: "Flux",
    description: "Real-time collaboration for creative teams.",
    year: "2024",
    link: "#",
    image: "https://images.unsplash.com/photo-1530435460869-d13625c69bbf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    title: "Prism",
    description: "Color palette extraction from any image.",
    year: "2023",
    link: "#",
    image: "https://i.pinimg.com/1200x/99/ca/5c/99ca5cf82cf12df8801f7b2bef38d325.jpg",
  },
  {
    title: "Vertex",
    description: "3D modeling toolkit for the web.",
    year: "2023",
    link: "#",
    image: "https://i.pinimg.com/736x/7c/15/39/7c1539cf7ff0207cb49ce0d338de1e5f.jpg",
  },
];

export function ProjectShowcase({
  projects = defaultProjects,
  title = "Selected Work",
  description = "Uma seleção de projetos que combinam design, tecnologia e inovação."
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Intersection Observer para animar título e descrição
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,   // anima apenas na primeira vez que entra
    threshold: 0.2,      // quando 20% do elemento estiver visível
  });

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-black"
    >
      <div className="relative w-full max-w-5xl mx-auto px-6 py-16">
        {/* Título e descrição com animação de fade */}
        <div
          ref={textRef}
          className={`mb-32 text-center transition-all duration-700 ease-out ${
            textInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-white bg-clip-text text-transparent mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            {description}
          </p>
        </div>

        {/* Imagem flutuante */}
        <div
          className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
          style={{
            left: containerRef.current?.getBoundingClientRect().left ?? 0,
            top: containerRef.current?.getBoundingClientRect().top ?? 0,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden">
            {projects.map((project, index) => (
              <img
                key={project.title}
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.1,
                  filter: hoveredIndex === index ? "none" : "blur(10px)",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>

        {/* Lista de projetos */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              className="group block"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative py-5 border-t border-border transition-all duration-300 ease-out">
                {/* Background highlight on hover */}
                <div
                  className={`
                    absolute inset-0 -mx-4 px-4 bg-white rounded-lg
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                  `}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-2">
                      <h3 className="text-white group-hover:text-black font-medium text-lg tracking-tight">
                        <span className="relative">
                          {project.title}
                          <span
                            className={`
                              absolute left-0 -bottom-0.5 h-px bg-foreground
                              transition-all duration-300 ease-out
                              ${hoveredIndex === index ? "w-full" : "w-0"}
                            `}
                          />
                        </span>
                      </h3>

                      <ArrowUpRight
                        className={`
                          w-4 h-4 text-muted-white/40
                          transition-all duration-300 ease-out
                          ${
                            hoveredIndex === index
                              ? "opacity-100 translate-x-0 translate-y-0"
                              : "opacity-0 -translate-x-2 translate-y-2"
                          }
                        `}
                      />
                    </div>

                    <p
                      className={`
                        text-muted-foreground text-sm mt-1 leading-relaxed
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-black/70" : "text-black"}
                      `}
                    >
                      {project.description}
                    </p>
                  </div>

                  <span
                    className={`
                      text-xs font-mono text-muted-foreground tabular-nums
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-black/50" : ""}
                    `}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </a>
          ))}

          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}