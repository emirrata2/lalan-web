'use client';
import GloveFinder from './glove-finder';

export default function GloveFinderSection() {
  return (
    <div
      className="py-28 md:py-36 relative"
      style={{ background: 'rgba(0,5,15,0.30)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(142,198,63,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#8ec63f' }}>
            Size Özel
          </div>
          <h2
            className="font-black text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
          >
            Doğru Eldiveni Bulun
          </h2>
          <p className="text-base leading-relaxed max-w-[52ch] mx-auto" style={{ color: 'rgba(172,199,255,0.65)' }}>
            Çalışma ortamınızı ve dayanım gereksinimlerinizi seçin — size en uygun modeller anında listelensin.
          </p>
        </div>

        <GloveFinder />
      </div>
    </div>
  );
}
