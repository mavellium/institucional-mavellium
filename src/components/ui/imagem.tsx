'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '../ui/scroll-expansion-hero'; // Certifique-se de que o caminho está correto

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

// Dados focados na sua agência de tecnologia
const agencyContent: MediaContent = {
  // Imagem que vai expandir (Sugestão: setup de código, servidor ou ambiente tech moderno)
  src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', 
  // Imagem de fundo (pode ser mais escura/abstrata para dar contraste)
  background: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  title: 'O Futuro é Agora',
  date: 'Manifesto Mavellium', // Coloquei Mavellium baseado no nome do logo que vi nos códigos anteriores
  scrollToExpand: 'Role para descobrir',
  about: {
    overview:
      'Acreditamos que a tecnologia não deve ser um obstáculo, mas sim o maior acelerador de resultados do seu negócio. Nascemos com o propósito de tirar projetos do papel e transformá-los em ecossistemas digitais vivos, rentáveis e escaláveis.',
    conclusion:
      'Nosso compromisso é com a entrega cirúrgica. Não vendemos sites ou códigos; nós construímos as fundações digitais para que a sua empresa lidere o mercado de amanhã.',
  },
};

const MediaContentBlock = () => {
  return (
    <div className='max-w-4xl mx-auto py-16 px-6'>
      <h2 className='text-3xl md:text-5xl font-medium mb-8 text-black tracking-tight'>
        Nosso Manifesto
      </h2>
      <div className="space-y-6">
        <p className='text-xl md:text-2xl leading-relaxed text-zinc-600 font-medium'>
          {agencyContent.about.overview}
        </p>
        <p className='text-xl md:text-2xl leading-relaxed text-zinc-600 font-medium'>
          {agencyContent.about.conclusion}
        </p>
      </div>
    </div>
  );
};

export default function Demo() {
  // Define forçadamente como 'image' para contornar a falta do vídeo
  const mediaType = 'image';

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={agencyContent.src}
        bgImageSrc={agencyContent.background}
        title={agencyContent.title}
        date={agencyContent.date}
        scrollToExpand={agencyContent.scrollToExpand}
      >
        <MediaContentBlock />
      </ScrollExpandMedia>
    </div>
  );
}