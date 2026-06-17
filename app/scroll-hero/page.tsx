'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';

type MediaType = 'video' | 'image';

const mediaContent = {
  video: {
    src: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    background:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1920&auto=format&fit=crop',
    title: 'Lalan Rubbers',
    date: 'Since 1940',
    scrollToExpand: 'Scroll to explore',
  },
  image: {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop',
    title: 'Premium Quality',
    date: 'Sri Lanka',
    scrollToExpand: 'Scroll to explore',
  },
} satisfies Record<MediaType, { src: string; background: string; title: string; date: string; scrollToExpand: string }>;

const AboutContent = ({ mediaType }: { mediaType: MediaType }) => (
  <div className='max-w-4xl mx-auto'>
    <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
      {mediaType === 'video' ? 'World-Class Manufacturing' : 'Engineered for Protection'}
    </h2>
    <p className='text-lg mb-8 text-black dark:text-white'>
      {mediaType === 'video'
        ? 'Lalan Rubbers Group has been a global leader in rubber glove manufacturing since 1940. Our state-of-the-art facilities in Sri Lanka produce millions of gloves daily for industrial, medical, and household applications across 60+ countries.'
        : 'Every Lalan glove is engineered to meet the most demanding international standards. From chemical resistance to sterile environments, our product range covers every protection need — backed by ISO, CE, and FDA certifications.'}
    </p>
    <p className='text-lg text-black dark:text-white'>
      {mediaType === 'video'
        ? 'With over 80 years of expertise and a commitment to sustainable production, we continue to innovate and set the benchmark for quality in the global rubber industry.'
        : 'Explore our catalog of 30+ glove models — from disposable nitrile to heavy-duty industrial — and find the right solution for your specific application.'}
    </p>
  </div>
);

export default function ScrollHeroPage() {
  const [mediaType, setMediaType] = useState<MediaType>('video');
  const current = mediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mediaType]);

  return (
    <div className='min-h-screen bg-black'>
      <div className='fixed top-4 right-4 z-50 flex gap-2'>
        {(['video', 'image'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setMediaType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              mediaType === type
                ? 'bg-white text-black'
                : 'bg-black/50 text-white border border-white/30 hover:bg-black/70'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <ScrollExpandMedia
        key={mediaType}
        mediaType={mediaType}
        mediaSrc={current.src}
        bgImageSrc={current.background}
        title={current.title}
        date={current.date}
        scrollToExpand={current.scrollToExpand}
        textBlend
      >
        <AboutContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
}
