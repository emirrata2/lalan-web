"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowUp, ArrowDown } from "lucide-react"

// Satış ve gösterim önceliği: NitroFL → NaturaFL → Tek Kullanımlık → diğerleri
const images = [
  // ── Öncelikli ürünler ──────────────────────────────────────────
  { id: 1,  productId: "nitrofl-330-15sd",        src: "/products/industrial/nitrofl-330-15sd.jpg",        alt: "NitroFL 330-15SD",        label: "NitroFL™ 330-15SD",        category: "Kimyasal"        },
  { id: 2,  productId: "naturafl-300-15bf",        src: "/products/industrial/naturafl-300-15bf.webp",      alt: "NaturaFL 300-15BF",        label: "NaturaFL™ 300-15BF",        category: "Gıdaya Uygun"    },
  // ── Tek Kullanımlık ────────────────────────────────────────────
  { id: 3,  productId: "lalan-2-8",               src: "/products/disposable/lalan-2.8.png",               alt: "Lalan LITE28",            label: "Lalan LITE28™",            category: "Tek Kullanımlık" },
  { id: 4,  productId: "lalan-lite-3-2",          src: "/products/disposable/lalan-lite.png",              alt: "Lalan Lite 3.2",          label: "Lalan Lite™ 3.2",          category: "Tek Kullanımlık" },
  { id: 5,  productId: "lalan-strong-f",          src: "/products/disposable/lalan-strong-f.png",          alt: "Lalan Strong F",          label: "Lalan Strong F™",          category: "Tek Kullanımlık" },
  { id: 6,  productId: "lalan-strong-x",          src: "/products/disposable/lalan-strong-x.png",          alt: "Lalan Strong X",          label: "Lalan Strong X™",          category: "Tek Kullanımlık" },
  { id: 7,  productId: "lalan-strong-x-esd",      src: "/products/disposable/lalan-strong-x-esd.png",      alt: "Lalan Strong X ESD",      label: "Lalan Strong X ESD™",      category: "Tek Kullanımlık" },
  // ── Tüm ürünler ────────────────────────────────────────────────
  { id: 9,  productId: "duonpfl-330-24sd",        src: "/products/industrial/duonpfl-330-24sd.jpg",        alt: "DUONPFL 330-24SD",        label: "DUONPFL™ 330-24SD",        category: "Kimyasal"        },
  { id: 11, productId: "naturafl-300-22sf",       src: "/products/industrial/naturafl-300-22sf.webp",      alt: "NaturaFL 300-22SF",       label: "NaturaFL™ 300-22SF",       category: "Endüstriyel"     },
  { id: 12, productId: "naturafl-330-28bf",       src: "/products/industrial/naturafl-330-28bf.webp",      alt: "NaturaFL 330-28BF",       label: "NaturaFL™ 330-28BF",       category: "Endüstriyel"     },
  { id: 18, productId: "nitroul-330-8sd",         src: "/products/industrial/nitroul-330-8sd.webp",        alt: "NitroUL 330-8SD",         label: "NitroUL™ 330-8SD",         category: "Hassas"          },
  { id: 19, productId: "neo-armor-ultra",         src: "/products/neo/neo-armor-ultra.jpg",                alt: "NEO Armor Ultra",         label: "NEO ARMOR ULTRA™",         category: "Neo Serisi"      },
  { id: 20, productId: "neo-classic-001-a11",     src: "/products/neo/neo-classic-001-a11.jpg",            alt: "NEO Classic 001-A11",     label: "NEO CLASSIC™ 001-A11",     category: "Neo Serisi"      },
  { id: 21, productId: "neo-classic-031-a11",     src: "/products/neo/neo-classic-031-a11.jpg",            alt: "NEO Classic 031-A11",     label: "NEO CLASSIC™ 031-A11",     category: "Neo Serisi"      },
  { id: 22, productId: "neo-classic-044-f38",     src: "/products/neo/neo-classic-044-f38.jpg",            alt: "NEO Classic 044-F38",     label: "NEO CLASSIC™ 044-F38",     category: "Neo Serisi"      },
  { id: 23, productId: "neo-classic-001-p11",     src: "/products/neo/neo-classic-001-p11.jpg",            alt: "NEO Classic 001-P11",     label: "NEO CLASSIC™ 001-P11",     category: "Neo Serisi"      },
  { id: 24, productId: "neo-classic-066-d11",     src: "/products/neo/neo-classic-066-d11.jpg",            alt: "NEO Classic 066-D11",     label: "NEO CLASSIC™ 066-D11",     category: "Neo Serisi"      },
  { id: 25, productId: "neo-lite-001-d11",        src: "/products/neo/neo-lite-001-d11.jpg",               alt: "NEO Lite 001-D11",        label: "NEO LITE™ 001-D11",        category: "Neo Serisi"      },
  { id: 26, productId: "neo-lite-087-p11",        src: "/products/neo/neo-lite-087-p11.jpg",               alt: "NEO Lite 087-P11",        label: "NEO LITE™ 087-P11",        category: "Neo Serisi"      },
  { id: 27, productId: "neo-lite-ultra-003-p11",  src: "/products/neo/neo-lite-ultra-003-p11.jpg",         alt: "NEO Lite Ultra",          label: "NEO LITE ULTRA™ 003-P11",  category: "Neo Serisi"      },
  { id: 28, productId: "neo-fizz-lite-044-f38",   src: "/products/neo/neo-fizz-lite-044-f38.jpg",          alt: "Neo Fizz Lite",           label: "Neo Fizz Lite™ 044-F38",   category: "Neo Serisi"      },
]

interface VerticalImageStackProps {
  className?: string
}

export function VerticalImageStack({ className = "" }: VerticalImageStackProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  // Card height = 220px, gap between cards = 32px → step = 252px
  const STEP = 252

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -STEP, scale: 0.88, opacity: 0.6, zIndex: 4, rotateX: 5 }
    } else if (diff === -2) {
      return { y: -STEP * 2, scale: 0.76, opacity: 0.28, zIndex: 3, rotateX: 10 }
    } else if (diff === 1) {
      return { y: STEP, scale: 0.88, opacity: 0.6, zIndex: 4, rotateX: -5 }
    } else if (diff === 2) {
      return { y: STEP * 2, scale: 0.76, opacity: 0.28, zIndex: 3, rotateX: -10 }
    } else {
      return { y: diff > 0 ? STEP * 3 : -STEP * 3, scale: 0.62, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -15 : 15 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div className={`relative flex h-screen w-full items-center justify-center overflow-hidden ${className}`}>
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.02] blur-3xl" />
      </div>

      {/* Card Stack — landscape 16:7 cards */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: '640px', height: '760px', perspective: '1400px' }}
      >
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute"
              style={{
                cursor: isCurrent ? "grab" : "pointer",
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 32, mass: 1 }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
              onTap={() => router.push(`/products/${image.productId}`)}
            >
              {/* Yatay kart: 620×220px */}
              <div
                style={{
                  width: '620px',
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  isolation: 'isolate',
                  display: 'flex',
                  background: '#060e1e',
                  boxShadow: isCurrent
                    ? '0 24px 56px -8px rgba(0,0,0,0.75), 0 0 0 1px rgba(142,198,63,0.18)'
                    : '0 8px 24px -4px rgba(0,0,0,0.5), 0 0 0 1px rgba(172,199,255,0.06)',
                }}
              >
                {/* Sol: görsel alanı — sabit genişlik, eşit padding */}
                <div
                  style={{
                    width: '320px',
                    flexShrink: 0,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#060e1e',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="320px"
                    draggable={false}
                    priority={isCurrent}
                    style={{ padding: '20px' }}
                  />
                </div>

                {/* Dikey ayırıcı */}
                <div style={{ width: '1px', background: 'rgba(172,199,255,0.08)', flexShrink: 0 }} />

                {/* Sağ: metin alanı */}
                <div
                  style={{
                    flex: 1,
                    padding: '28px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#8ec63f',
                    }}
                  >
                    {image.category}
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.95)',
                      fontFamily: 'var(--font-manrope), sans-serif',
                      lineHeight: 1.25,
                    }}
                  >
                    {image.label}
                  </span>
                  {isCurrent && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#8ec63f',
                        marginTop: '4px',
                        fontWeight: 600,
                      }}
                    >
                      Ürünü İncele →
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots — sağda dikey, maks 7 görünür (sliding window) */}
      <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {(() => {
          const total = images.length
          const half = 3
          let start = Math.max(0, currentIndex - half)
          const end = Math.min(total - 1, start + 6)
          start = Math.max(0, end - 6)
          return Array.from({ length: end - start + 1 }, (_, i) => {
            const idx = start + i
            const active = idx === currentIndex
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`${idx + 1}. ürün`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: '5px',
                  height: active ? '20px' : '5px',
                  background: active ? '#8ec63f' : 'rgba(172,199,255,0.22)',
                }}
              />
            )
          })
        })()}
      </div>

      {/* Counter — solda */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span
            className="text-3xl font-black tabular-nums"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', color: 'rgba(255,255,255,0.85)' }}
          >
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-2 h-px w-6" style={{ background: 'rgba(142,198,63,0.4)' }} />
          <span className="text-xs tabular-nums" style={{ color: 'rgba(172,199,255,0.38)' }}>
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Scroll hint — altta ortada */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-1.5" style={{ color: 'rgba(172,199,255,0.38)' }}>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowUp size={16} strokeWidth={1.5} />
          </motion.div>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Scroll or drag</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown size={16} strokeWidth={1.5} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
