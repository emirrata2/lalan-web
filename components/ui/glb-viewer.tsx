'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function GlbViewer({ src, className }: { src: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

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
      queueMicrotask(() => setError(true));
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 1000);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 1.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xaccfff, 0.8);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 0.01;
    controls.maxDistance = 1000;

    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    loader.load(
      src,
      gltf => {
        model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const distance = maxDim * 1.8;
        camera.position.set(distance, distance * 0.6, distance);
        camera.near = maxDim / 100;
        camera.far = maxDim * 100;
        camera.updateProjectionMatrix();

        controls.minDistance = maxDim * 0.5;
        controls.maxDistance = maxDim * 5;
        controls.target.set(0, 0, 0);
        controls.update();

        setLoaded(true);
      },
      xhr => {
        if (xhr.total) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
      },
      err => {
        console.error('GLB load error', err);
        setError(true);
      }
    );

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    onResize();

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      controls.dispose();
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach(mat => {
            Object.values(mat).forEach(value => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            mat.dispose();
          });
        }
      });
      if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [src]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0 }}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ color: 'rgba(172,199,255,0.6)' }}>
          <div
            className="w-10 h-10 rounded-full animate-spin"
            style={{ border: '3px solid rgba(172,199,255,0.15)', borderTopColor: '#8ec63f' }}
          />
          <span className="text-xs font-bold uppercase tracking-widest">Model yükleniyor… {progress}%</span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center" style={{ color: 'rgba(172,199,255,0.6)' }}>
          <span className="text-sm font-medium">3D model yüklenemedi.</span>
        </div>
      )}
    </div>
  );
}
