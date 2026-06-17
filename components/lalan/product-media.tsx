'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Product } from '@/lib/products';

const GlbViewer = dynamic(() => import('@/components/ui/glb-viewer'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'rgba(172,199,255,0.6)' }}>
      <div
        className="w-10 h-10 rounded-full animate-spin"
        style={{ border: '3px solid rgba(172,199,255,0.15)', borderTopColor: '#8ec63f' }}
      />
    </div>
  ),
});

type MediaTab = '3d' | 'video' | 'image';

export default function ProductMedia({ product }: { product: Product }) {
  const has3d = !!product.model3d;
  const hasVideo = !!product.video;
  const hasExtras = has3d || hasVideo;

  const defaultTab: MediaTab = has3d ? '3d' : hasVideo ? 'video' : 'image';
  const [tab, setTab] = useState<MediaTab>(defaultTab);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tabs: { id: MediaTab; label: string }[] = [
    ...(has3d    ? [{ id: '3d'    as MediaTab, label: '360° Model' }] : []),
    ...(hasVideo ? [{ id: 'video' as MediaTab, label: 'Video'      }] : []),
    { id: 'image', label: 'Görsel' },
  ];

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="sticky top-28">
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
        /* ── Hero-kart formatı: 9/16 portrait, autoplay loop muted ── */
        <div className="flex justify-center">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: '100%',
              maxWidth: '360px',
              aspectRatio: '9/16',
              maxHeight: '540px',
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

            {/* Overlay badge — alt */}
            <div className="absolute bottom-4 left-4 right-4">
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(0,15,46,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(172,199,255,0.15)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(142,198,63,0.2)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8ec63f" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-xs">{product.name}</div>
                  <div className="text-[10px]" style={{ color: '#8ec63f' }}>{product.categoryLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── 3D model veya görsel ── */
        <div
          className="relative rounded-3xl overflow-hidden flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.04)',
            aspectRatio: '1/1',
            border: '1px solid rgba(172,199,255,0.08)',
          }}
        >
          {tab === '3d' && has3d ? (
            <GlbViewer src={product.model3d!} className="absolute inset-0" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.img}
              alt={product.name}
              className="w-3/4 h-3/4 object-contain"
              style={{ mixBlendMode: 'lighten' }}
            />
          )}
        </div>
      )}

      {has3d && tab === '3d' && (
        <p className="mt-3 text-center text-[11px] font-medium" style={{ color: 'rgba(172,199,255,0.45)' }}>
          Döndürmek için sürükleyin, yakınlaşmak için kaydırın
        </p>
      )}
    </div>
  );
}
