'use client';
import { useRef, useEffect, useCallback } from 'react';

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function VideoExpansionHero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number | null>(null);

  /* ── initial & responsive sizing ── */
  useEffect(() => {
    const setInitial = () => {
      if (!wrapperRef.current) return;
      const isMobile = window.innerWidth < 640;
      const startW = Math.min(560, window.innerWidth * (isMobile ? 0.88 : 0.46));
      const startH = startW * (9 / 16);
      wrapperRef.current.style.width  = `${startW}px`;
      wrapperRef.current.style.height = `${startH}px`;
    };
    setInitial();
    window.addEventListener('resize', setInitial);
    return () => window.removeEventListener('resize', setInitial);
  }, []);

  /* ── scroll handler ── */
  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      if (!section || !wrapper) return;

      const rect    = section.getBoundingClientRect();
      const winW    = window.innerWidth;
      const winH    = window.innerHeight;
      const total   = section.offsetHeight - winH;
      const raw     = Math.max(0, Math.min(1, -rect.top / total));
      const t       = easeInOut(raw);

      const isMobile = winW < 640;
      const startW   = Math.min(560, winW * (isMobile ? 0.88 : 0.46));
      const startH   = startW * (9 / 16);

      const w  = lerp(startW, winW, t);
      const h  = lerp(startH, winH, t);
      const br = lerp(18, 0, t);

      wrapper.style.width        = `${w}px`;
      wrapper.style.height       = `${h}px`;
      wrapper.style.borderRadius = `${br}px`;
      wrapper.style.boxShadow    = t < 0.97
        ? `0 ${lerp(24, 0, t)}px ${lerp(72, 0, t)}px rgba(0,0,0,${lerp(0.65, 0, t)})`
        : 'none';

      /* scroll hint fades out fast */
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - raw * 5));
      }

      /* center text fades in as video approaches full-screen */
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(Math.max(0, (t - 0.68) / 0.32));
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  return (
    <section
      ref={sectionRef}
      aria-label="Lalan Kurumsal Tanıtım"
      style={{ height: '260vh', position: 'relative', background: '#000810' }}
    >
      {/* ── sticky viewport ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000810',
      }}>

        {/* ── expanding wrapper ── */}
        <div
          ref={wrapperRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 18,
            boxShadow: '0 24px 72px rgba(0,0,0,0.65)',
            flexShrink: 0,
            /* CSS fallbacks for SSR — JS overrides these on mount */
            width: 'min(560px, 46vw)',
            height: 'min(315px, calc(46vw * 0.5625))',
          }}
        >
          <video
            src="/videos/lalan-kurumsal.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* gradient vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }} />

          {/* always-visible badge (bottom-left) */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            padding: '8px 14px',
            borderRadius: 10,
            background: 'rgba(0,15,46,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(172,199,255,0.15)',
            pointerEvents: 'none',
          }}>
            <div style={{
              color: 'white',
              fontWeight: 700,
              fontSize: 12,
              fontFamily: 'var(--font-manrope), sans-serif',
              lineHeight: 1.3,
            }}>
              Lalan Group — Kurumsal Tanıtım
            </div>
            <div style={{
              color: '#8ec63f',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}>
              1940&apos;tan Bu Yana Kauçuk Uzmanlığı
            </div>
          </div>

          {/* fullscreen title overlay — fades in at the end */}
          <div
            ref={overlayRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              pointerEvents: 'none',
              textAlign: 'center',
              padding: '0 32px',
            }}
          >
            <p style={{
              color: '#8ec63f',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 18,
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              1940&apos;tan Bu Yana Kauçuk Uzmanlığı
            </p>
            <h2 style={{
              color: 'white',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-manrope), sans-serif',
            }}>
              Lalan Group<br />
              <span style={{ color: '#8ec63f' }}>Kurumsal Tanıtım</span>
            </h2>
          </div>
        </div>

        {/* ── scroll hint ── */}
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            color: 'rgba(172,199,255,0.45)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Kaydır
          </span>
          <svg
            width="16" height="26" viewBox="0 0 16 26" fill="none"
            style={{ animation: 'veh-arrow 1.6s ease-in-out infinite' }}
          >
            <line x1="8" y1="0" x2="8" y2="18"
              stroke="rgba(142,198,63,0.55)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 12 L8 19 L14 12"
              stroke="rgba(142,198,63,0.55)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes veh-arrow {
          0%, 100% { opacity: 0.45; transform: translateY(0px); }
          50%       { opacity: 1;    transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}
