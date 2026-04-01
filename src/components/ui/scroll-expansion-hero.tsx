'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70, // Mais suave para a parada não ser brusca
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- LÓGICA DA PARADA (TIMINGS) ---
  
  // 1. O VÍDEO EXPANDE RÁPIDO: de 0 a 0.4 do scroll.
  // Entre 0.4 e 0.7 ele fica PARADO (a "parada" que você quer).
  const mediaWidth = useTransform(smoothProgress, [0, 0.4], [300, isMobile ? 800 : 1920]);
  const mediaHeight = useTransform(smoothProgress, [0, 0.4], [450, isMobile ? 600 : 1080]);
  const borderRadius = useTransform(smoothProgress, [0.3, 0.4], [24, 0]);

  // 2. TÍTULOS SOMEM IMEDIATAMENTE: de 0 a 0.2
  const textXLeft = useTransform(smoothProgress, [0, 0.25], ["0vw", "-120vw"]);
  const textXRight = useTransform(smoothProgress, [0, 0.25], ["0vw", "120vw"]);
  const uiOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  // 3. CONTEÚDO (ABOUT) SÓ APARECE NO FINAL: de 0.7 a 1.0
  // Isso cria o intervalo de 0.4 até 0.7 onde o vídeo fica em tela cheia sem texto.
  const childrenOpacity = useTransform(smoothProgress, [0.75, 0.9], [0, 1]);
  const childrenY = useTransform(smoothProgress, [0.75, 1], [150, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={containerRef} className="relative bg-white">
      
      {/* Container de 400vh: Dá muito espaço para o vídeo "ficar parado" */}
      <div className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* BG Inicial */}
          <motion.div style={{ opacity: uiOpacity }} className="absolute inset-0 z-0">
            <Image src={bgImageSrc} alt="Background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          {/* Mídia Principal */}
          <motion.div
            style={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius: borderRadius,
              maxWidth: '100vw',
              maxHeight: '100vh',
            }}
            className="relative z-10 overflow-hidden shadow-2xl bg-gray-900 flex items-center justify-center"
          >
            {mediaType === 'video' ? (
              <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            ) : (
              <Image src={mediaSrc} alt={title || 'Media'} fill className="object-cover" />
            )}
          </motion.div>

          {/* Textos que "fogem" */}
          <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none ${textBlend ? 'mix-blend-difference' : ''}`}>
             <div className="flex flex-col md:flex-row items-center gap-4">
                <motion.h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter" style={{ x: textXLeft }}>
                  {firstWord}
                </motion.h2>
                <motion.h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter" style={{ x: textXRight }}>
                  {restOfTitle}
                </motion.h2>
             </div>
             <motion.div style={{ opacity: uiOpacity }} className="mt-8 flex flex-col items-center gap-2">
                {date && <p className="text-xl text-blue-100">{date}</p>}
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{scrollToExpand || "Role para expandir"}</p>
             </motion.div>
          </div>
        </div>
      </div>

      {/* Seção de Texto que sobe depois da parada */}
      <motion.div 
        style={{ opacity: childrenOpacity, y: childrenY }}
        className="relative z-30 w-full bg-white py-32 min-h-screen border-t border-white/5"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          {children}
        </div>
      </motion.div>

    </div>
  );
};

export default ScrollExpandMedia;