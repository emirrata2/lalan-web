'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  startTime?: number;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  startTime = 0,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent]       = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY]       = useState<number>(0);
  const [winSize, setWinSize] = useState({ w: 1280, h: 800, mobile: false });

  const sectionRef   = useRef<HTMLDivElement | null>(null);
  const videoRef     = useRef<HTMLVideoElement | null>(null);
  const pendingDelta = useRef(0);
  const rafId        = useRef<number | null>(null);
  const [prevMediaType, setPrevMediaType] = useState(mediaType);

  /* ── seek to startTime before playing ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const start = () => {
      video.currentTime = startTime;
      video.play().catch(() => {});
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      start();
    } else {
      video.addEventListener('loadedmetadata', start, { once: true });
      return () => video.removeEventListener('loadedmetadata', start);
    }
  }, [startTime]);

  // Reset state during render when mediaType changes, rather than in an
  // effect — React applies these updates before the DOM paints, avoiding an
  // extra cascading render. See: https://react.dev/learn/you-might-not-need-an-effect
  if (prevMediaType !== mediaType) {
    setPrevMediaType(mediaType);
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }

  // Hysteresis band: expand fully at >=1, but only release the lock once
  // progress has genuinely fallen back below COLLAPSE_AT. Without this gap, a
  // single noisy wheel tick (trackpad inertia) right at progress===1 — while
  // window.scrollY is still pinned at 0 — could instantly flip
  // mediaFullyExpanded back to false and re-trigger expansion on the very
  // next tick, trapping the user in a visible expand/collapse loop.
  const COLLAPSE_AT = 0.9;

  useEffect(() => {
    const advance = (delta: number) => {
      const newProgress = Math.min(Math.max(scrollProgress + delta, 0), 1);
      setScrollProgress(newProgress);
      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (newProgress < COLLAPSE_AT) {
        setMediaFullyExpanded(false);
        if (newProgress < 0.75) setShowContent(false);
      }
    };

    // Coalesce high-frequency wheel/scroll/touchmove events into one state
    // update per animation frame instead of one per raw event.
    const scheduleAdvance = (delta: number) => {
      pendingDelta.current += delta;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          advance(pendingDelta.current);
          pendingDelta.current = 0;
          rafId.current = null;
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded) {
        // Only start un-expanding while genuinely at the top of the real
        // page. Collapse is gradual (via scheduleAdvance + hysteresis), not
        // an instant flip, so a single jittery tick can't trap the user.
        if (e.deltaY < 0 && window.scrollY <= 0) {
          e.preventDefault();
          scheduleAdvance(e.deltaY * 0.0009);
        }
      } else {
        e.preventDefault();
        scheduleAdvance(e.deltaY * 0.0009);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (mediaFullyExpanded && (e.key === 'ArrowUp' || e.key === 'PageUp') && window.scrollY <= 0) {
        e.preventDefault();
        advance(-0.08);
        return;
      }
      if (!mediaFullyExpanded) {
        const map: Record<string, number> = {
          ArrowDown: 0.08, ArrowUp: -0.08,
          PageDown: 0.3,  PageUp: -0.3,
          ' ': 0.3,
        };
        const delta = map[e.key];
        if (delta !== undefined) { e.preventDefault(); advance(delta); }
      }
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          scheduleAdvance(scrollY * 0.002);
          window.scrollTo(0, 0);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY  = e.touches[0].clientY;
      const deltaY  = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 0) {
        e.preventDefault();
        scheduleAdvance(deltaY * 0.008);
        setTouchStartY(touchY);
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        scheduleAdvance(deltaY * (deltaY < 0 ? 0.008 : 0.005));
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => setTouchStartY(0);

    window.addEventListener('wheel',      handleWheel      as EventListener, { passive: false });
    window.addEventListener('keydown',    handleKeyDown    as EventListener);
    window.addEventListener('scroll',     handleScroll     as EventListener);
    window.addEventListener('touchstart', handleTouchStart as EventListener, { passive: false });
    window.addEventListener('touchmove',  handleTouchMove  as EventListener, { passive: false });
    window.addEventListener('touchend',   handleTouchEnd   as EventListener);

    return () => {
      window.removeEventListener('wheel',      handleWheel      as EventListener);
      window.removeEventListener('keydown',    handleKeyDown    as EventListener);
      window.removeEventListener('scroll',     handleScroll     as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as EventListener);
      window.removeEventListener('touchmove',  handleTouchMove  as EventListener);
      window.removeEventListener('touchend',   handleTouchEnd   as EventListener);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
        pendingDelta.current = 0;
      }
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const update = () => setWinSize({
      w:      window.innerWidth,
      h:      window.innerHeight,
      mobile: window.innerWidth < 768,
    });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ── size: start small, end = exact viewport ── */
  const NAV_H   = 80; // fixed nav bar height in px
  const startW  = winSize.mobile ? Math.min(300, winSize.w * 0.88) : Math.min(480, winSize.w * 0.38);
  const startH  = startW * (9 / 16);

  const mediaWidth  = startW + scrollProgress * (winSize.w - startW);
  const mediaHeight = startH + scrollProgress * (winSize.h - startH);
  const mediaScaleX = mediaWidth  / winSize.w;
  const mediaScaleY = mediaHeight / winSize.h;

  /* vertical center offset: push down by half nav height when small, return to 0 when fullscreen */
  const navOffset      = (1 - scrollProgress) * (NAV_H / 2);
  const textTranslateX = scrollProgress * (winSize.mobile ? 180 : 150);

  const firstWord   = title ? title.split(' ')[0]              : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── background image (fades out as video expands) ── */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── expanding media frame ── */}
              <div
                className="absolute z-0 transition-none"
                style={{
                  width:        `${winSize.w}px`,
                  height:       `${winSize.h}px`,
                  top:          '50%',
                  left:         '50%',
                  transform:    `translate(-50%, calc(-50% + ${navOffset}px)) scale(${mediaScaleX}, ${mediaScaleY})`,
                  transformOrigin: 'center center',
                  boxShadow:    scrollProgress < 0.98 ? '0px 0px 50px rgba(0,0,0,0.4)' : 'none',
                  borderRadius: `${(1 - scrollProgress) * 16}px`,
                  overflow:     'hidden',
                }}
              >
                {mediaType === 'video' ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        ref={videoRef}
                        src={mediaSrc}
                        poster={posterSrc}
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                        onEnded={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = startTime;
                            videoRef.current.play();
                          }
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* date + scroll hint — fly apart as video expands */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      className="text-2xl"
                      style={{
                        color:     'rgba(172,199,255,0.85)',
                        transform: `translateX(-${textTranslateX}vw)`,
                      }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      style={{
                        color:           'rgba(255,255,255,0.92)',
                        transform:       `translateX(${textTranslateX}vw)`,
                        fontSize:        '12px',
                        fontWeight:      800,
                        letterSpacing:   '0.18em',
                        textTransform:   'uppercase',
                        marginTop:       '12px',
                        textShadow:      '0 1px 12px rgba(0,0,0,0.8)',
                        background:      'rgba(0,0,0,0.35)',
                        backdropFilter:  'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        padding:         '5px 14px',
                        borderRadius:    '20px',
                        border:          '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* ── title text (splits and flies apart) ── */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold transition-none"
                  style={{
                    color:     '#8ec63f',
                    transform: `translateX(-${textTranslateX}vw)`,
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-none"
                  style={{
                    color:      'white',
                    transform:  `translateX(${textTranslateX}vw)`,
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            {/* ── content revealed after expansion ── */}
            {children && (
              <motion.section
                className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
