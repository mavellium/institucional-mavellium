'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '../ui/scroll-expansion-hero';

export interface MediaAbout {
  overview: string;
  conclusion: string;
}

export interface MediaContent {
  src: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

const MediaContentBlock = ({ content }: { content: MediaContent }) => {
  return (
    <div className='max-w-4xl mx-auto py-16 px-6'>
      <h2 className='text-3xl md:text-5xl font-medium mb-8 text-black tracking-tight'>
        Nosso Manifesto
      </h2>
      <div className="space-y-6">
        <p className='text-xl md:text-2xl leading-relaxed text-zinc-600 font-medium'>
          {content.about.overview}
        </p>
        <p className='text-xl md:text-2xl leading-relaxed text-zinc-600 font-medium'>
          {content.about.conclusion}
        </p>
      </div>
    </div>
  );
};

export default function Demo({ content }: { content?: MediaContent } = {}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  if (!content) return null;

  return (
    <div className='min-h-screen bg-white'>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={content.src}
        bgImageSrc={content.background}
        title={content.title}
        date={content.date}
        scrollToExpand={content.scrollToExpand}
      >
        <MediaContentBlock content={content} />
      </ScrollExpandMedia>
    </div>
  );
}
