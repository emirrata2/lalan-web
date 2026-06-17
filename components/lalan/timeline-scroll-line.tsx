'use client';
import { useRef, useEffect, useCallback } from 'react';

export default function TimelineScrollLine({ children }: { children: React.ReactNode }) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const svgRef        = useRef<SVGSVGElement>(null);
  const trackRef      = useRef<SVGLineElement>(null);
  const pathRef       = useRef<SVGPathElement>(null);
  const dotRef        = useRef<SVGCircleElement>(null);
  const glowRef       = useRef<SVGCircleElement>(null);
  const gradRef       = useRef<SVGLinearGradientElement>(null);
  const lenRef        = useRef(0);
  const heightRef     = useRef(0);
  const rafRef        = useRef<number | null>(null);

  /* ── measure & rebuild SVG whenever container height changes ── */
  useEffect(() => {
    const rebuild = () => {
      const container = containerRef.current;
      const svg       = svgRef.current;
      const track     = trackRef.current;
      const path      = pathRef.current;
      const grad      = gradRef.current;
      if (!container || !svg || !track || !path) return;

      const h = container.scrollHeight;
      if (h === heightRef.current) return;
      heightRef.current = h;

      svg.setAttribute('height', String(h));
      track.setAttribute('y2', String(h));

      const d = `M 14 0 L 14 ${h}`;
      path.setAttribute('d', d);

      if (grad) grad.setAttribute('y2', String(h));

      const len = path.getTotalLength();
      lenRef.current = len;
      path.style.strokeDasharray  = String(len);
      path.style.strokeDashoffset = String(len);

      // re-run scroll calc after resize
      window.dispatchEvent(new Event('scroll'));
    };

    rebuild();
    const ro = new ResizeObserver(rebuild);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* ── scroll handler ── */
  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      const path      = pathRef.current;
      const dot       = dotRef.current;
      const glow      = glowRef.current;
      if (!container || !path) return;

      const len = lenRef.current;
      const h   = heightRef.current;
      if (!len || !h) return;

      const rect     = container.getBoundingClientRect();
      const winH     = window.innerHeight;
      // 0 when section's top touches bottom of viewport,
      // 1 when section's bottom touches top of viewport
      const progress = Math.max(0, Math.min(1,
        (winH - rect.top) / (winH + rect.height),
      ));

      path.style.strokeDashoffset = String(len * (1 - progress));

      const tipY   = h * progress;
      const tipVis = progress > 0.005 && progress < 0.995 ? '1' : '0';

      if (dot)  { dot.setAttribute('cy',  String(tipY)); dot.style.opacity  = tipVis; }
      if (glow) { glow.setAttribute('cy', String(tipY)); glow.style.opacity = tipVis; }
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
    <div ref={containerRef} className="relative pl-8 sm:pl-12 md:pl-16">

      {/* ── SVG connector — hidden on xs ── */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="absolute left-0 top-0 pointer-events-none hidden sm:block"
        width="28"
        height="100"           /* initial placeholder; rebuilt in effect */
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* top-to-bottom gradient using userSpaceOnUse so height matters */}
          <linearGradient
            ref={gradRef}
            id="tl-line-grad"
            x1="14" y1="0"
            x2="14" y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#8ec63f" stopOpacity="1"   />
            <stop offset="55%"  stopColor="#72c26e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5c93d6" stopOpacity="0.8" />
          </linearGradient>

          {/* glow filter for the tip dot */}
          <filter id="tl-dot-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint full-height track */}
        <line
          ref={trackRef}
          x1="14" y1="0" x2="14" y2="100"
          stroke="rgba(172,199,255,0.07)"
          strokeWidth="2"
        />

        {/* start node */}
        <circle cx="14" cy="4" r="3.5"
          fill="none"
          stroke="rgba(142,198,63,0.4)"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="4" r="1.5" fill="rgba(142,198,63,0.6)" />

        {/* animated progress line */}
        <path
          ref={pathRef}
          d="M 14 0 L 14 100"
          stroke="url(#tl-line-grad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.08s linear' }}
        />

        {/* outer halo ring at tip */}
        <circle
          ref={glowRef}
          cx="14" cy="0" r="10"
          fill="rgba(142,198,63,0.10)"
          style={{ opacity: 0, transition: 'opacity 0.2s' }}
        />

        {/* solid tip dot */}
        <circle
          ref={dotRef}
          cx="14" cy="0" r="4.5"
          fill="#8ec63f"
          filter="url(#tl-dot-glow)"
          style={{ opacity: 0, transition: 'opacity 0.2s' }}
        />
      </svg>

      {children}
    </div>
  );
}
