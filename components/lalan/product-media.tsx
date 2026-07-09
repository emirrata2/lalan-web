'use client';

import { useState, useRef } from 'react';
import type { Product } from '@/lib/products';

// 360° GLB viewer is shelved — dynamic import kept for future use
// import dynamic from 'next/dynamic';
// const GlbViewer = dynamic(() => import('@/components/ui/glb-viewer'), { ssr: false });

type MediaTab = 'video' | 'image';

export default function ProductMedia({ product }: { product: Product }) {
  const hasVideo = !!product.video;
  const hasExtras = hasVideo;

  const defaultTab: MediaTab = hasVideo ? 'video' : 'image';
  const [tab, setTab] = useState<MediaTab>(defaultTab);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tabs: { id: MediaTab; label: string }[] = [
    ...(hasVideo ? [{ id: 'video' as MediaTab, label: 'Video' }] : []),
    { id: 'image', label: 'Görsel' },
  ];

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div>
      {hasExtras && (
        <div className="flex gap-2 mb-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                background: tab === t.id ? 'rgba(142,198,63,0.15)' : 'rgba(255,255,255,0.04)',
                color: tab === t.id ? '#8ec63f' : 'rgba(172,199,255,0.55)',
                border: `1px solid ${tab === t.id ? 'rgba(142,198,63,0.3)' : 'rgba(172,199,255,0.08)'}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {tab === 'video' && hasVideo ? (
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio: '1/1',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(142,198,63,0.15)',
            background: '#000d1f',
          }}
        >
          <video
            ref={videoRef}
            src={product.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Ses toggle — sol üst */}
          <button
            onClick={toggleMute}
            className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: 'rgba(0,15,46,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(172,199,255,0.15)',
            }}
            aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}
          >
            {muted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(172,199,255,0.7)" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
              </svg>
            )}
          </button>
        </div>
      ) : (
        /* ── Ürün görseli ── */
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            aspectRatio: '1/1',
            border: '1px solid rgba(172,199,255,0.08)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
      )}
    </div>
  );
}
