"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"
import { LALAN_MARKERS } from "@/lib/lalan-markers"
import type { PulseMarker } from "@/lib/lalan-markers"
export { LALAN_MARKERS }

interface GlobePulseProps {
  markers?: PulseMarker[]
  className?: string
  speed?: number
}

export function GlobePulse({
  markers = LALAN_MARKERS,
  className = "",
  speed = 0.002,
}: GlobePulseProps) {
  const canvasRef             = useRef<HTMLCanvasElement>(null)
  const pointerInteracting    = useRef<{ x: number; y: number } | null>(null)
  const dragOffset            = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef          = useRef(0)
  const thetaOffsetRef        = useRef(0)
  const isPausedRef           = useRef(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi:   (e.clientX - pointerInteracting.current.x) / 250,
          theta: (e.clientY - pointerInteracting.current.y) / 800,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup",   handlePointerUp,   { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup",   handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 1.8 // start centered on Sri Lanka area

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 1.8,
        theta: 0.25,
        dark: 1,
        diffuse: 1.8,
        mapSamples: 20000,
        mapBrightness: 7,
        // Lalan brand colors: navy base, green markers, blue glow
        baseColor:   [0.0,  0.10, 0.25],
        markerColor: [0.44, 0.76, 0.43],   // #72c26e green
        glowColor:   [0.0,  0.17, 0.38],   // deep blue glow
        markerElevation: 0,
        markers: markers.map(m => ({ location: m.location, size: 0.04, id: m.id })),
        // Arcs from Sri Lanka to every hub
        arcs: markers.filter(m => m.id !== "lk").map(m => ({
          from: [6.93, 79.85] as [number, number],
          to:   m.location,
        })),
        arcColor:  [0.44, 0.76, 0.43],
        arcWidth:  0.6,
        arcHeight: 0.4,
        opacity:   0.75,
      })

      function animate() {
        if (!isPausedRef.current) phi += speed
        globe!.update({
          phi:   phi + phiOffsetRef.current  + dragOffset.current.phi,
          theta: 0.25 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver(entries => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.4); opacity: 0.85; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%",
          cursor: "grab", opacity: 0,
          transition: "opacity 1.4s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {/* Pulse rings rendered via CSS anchor (browser-native where supported) */}
      {markers.map(m => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            // @ts-ignore CSS Anchor Positioning
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(center)",
            left: "anchor(center)",
            translate: "-50% 50%",
            width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 6px))`,
            transition: "opacity 0.4s, filter 0.4s",
          }}
        >
          {/* two staggered rings */}
          <span style={{
            position: "absolute", inset: 0,
            border: "1.5px solid #72c26e", borderRadius: "50%", opacity: 0,
            animation: `pulse-ring 2.2s ease-out infinite ${m.delay}s`,
          }} />
          <span style={{
            position: "absolute", inset: 0,
            border: "1.5px solid #72c26e", borderRadius: "50%", opacity: 0,
            animation: `pulse-ring 2.2s ease-out infinite ${m.delay + 0.7}s`,
          }} />
          {/* dot */}
          <span style={{
            width: 8, height: 8,
            background: "#72c26e", borderRadius: "50%",
            boxShadow: "0 0 0 2px #000d1f, 0 0 0 4px #72c26e88",
          }} />
        </div>
      ))}
    </div>
  )
}
