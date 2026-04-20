'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBloomContained({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    } catch (err) {
      console.error('WebGL not supported', err);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // Raw mouse target (updated instantly on mousemove)
    const mouseTarget = { x: 0, y: 0 };
    // Smoothed mouse (lerped each frame)
    const mouseSmooth = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalize to -1..1 relative to container center
      mouseTarget.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseTarget.y = ((e.clientY - rect.top)  / rect.height - 0.5) * -2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const fragmentShader = `
      precision highp float;
      uniform vec2  iResolution;
      uniform float iTime;
      uniform vec2  iMouse;

      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy)
                  / min(iResolution.x, iResolution.y);

        // Shift UV by mouse — bloom follows cursor (stronger offset)
        vec2 mouseOffset = iMouse * 0.55;
        vec2 uvShifted   = uv - mouseOffset;

        float t      = iTime * 0.7;
        float radius = length(uvShifted);
        float angle  = atan(uvShifted.y, uvShifted.x);

        // Stronger ripple distortion near cursor
        float mouseDist  = length(uv - mouseOffset);
        float ripple     = sin(mouseDist * 8.0 - t * 3.5) * 0.045
                         * smoothstep(0.8, 0.0, mouseDist);

        float petals     = 5.0;
        float bloomShape = sin(angle * petals + t);
        float distorted  = radius
                         + bloomShape * 0.14
                         * fbm(uvShifted * 2.5 + t * 0.08)
                         + ripple;

        // Lalan brand palette — boosted brightness
        vec3 deepNavy  = vec3(0.0,  0.08, 0.22);
        vec3 midBlue   = vec3(0.0,  0.28, 0.62);
        vec3 lushGreen = vec3(0.12, 0.65, 0.35);
        vec3 coreTint  = vec3(0.75, 0.88, 1.0);

        float outerMix = smoothstep(0.1, 0.70, distorted);
        vec3 color = mix(midBlue, deepNavy, outerMix);

        // Wider green bloom zone
        float greenZone = smoothstep(0.65, 0.10, distorted);
        color = mix(color, lushGreen, greenZone * 0.75);

        // Bigger core glow
        float coreGlow = smoothstep(0.18, 0.0, radius);
        color = mix(color, coreTint, coreGlow * 1.0);

        // Brighter cursor highlight
        float cursorGlow = smoothstep(0.35, 0.0, mouseDist);
        color = mix(color, coreTint * 1.4, cursorGlow * 0.55);

        // Wider cursor aura ring
        float aura = smoothstep(0.45, 0.30, mouseDist) * smoothstep(0.10, 0.30, mouseDist);
        color = mix(color, lushGreen * 1.2, aura * 0.25);

        float twinkle = smoothstep(0.96, 1.0, fbm(uv * 12.0 + t * 0.2));
        color = mix(color, coreTint, twinkle * (1.0 - coreGlow) * 0.9);

        float vignette = smoothstep(1.5, 0.45, length(uv));
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader,
      uniforms,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.iResolution.value.set(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    onResize();

    renderer.setAnimationLoop(() => {
      // Smooth lerp toward mouse target (0.10 = snappier follow)
      mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * 0.10;
      mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * 0.10;
      uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y);
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      renderer.setAnimationLoop(null);
      if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
