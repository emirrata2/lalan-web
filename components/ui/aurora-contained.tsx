'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuroraContained({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(random(i), random(i + vec2(1.,0.)), u.x),
                   mix(random(i + vec2(0.,1.)), random(i + vec2(1.,1.)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.1; a *= 0.48; }
        return v;
      }
      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        float t = iTime * 0.12;
        vec2 p = uv; p.y += 0.2;
        float f = fbm(vec2(p.x * 1.6 + t * 0.3, p.y * 1.2 + t));
        float curtain = smoothstep(0.0, 0.6, f) * smoothstep(1.2, 0.0, p.y + 0.8);
        float shimmer = fbm(uv * 4.0 + vec2(t * 0.5, t * 0.3)) * 0.4;
        vec3 deep  = vec3(0.01, 0.20, 0.08);
        vec3 mid   = vec3(0.04, 0.55, 0.28);
        vec3 bright= vec3(0.15, 0.90, 0.50);
        vec3 color = mix(deep, mix(mid, bright, shimmer), curtain * 1.1);
        gl_FragColor = vec4(color, curtain * 0.85);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader,
      uniforms,
      transparent: true,
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
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
  );
}
