import CelestialBloomShader from "@/components/ui/celestial-bloom-shader";

export default function CelestialDemo() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <CelestialBloomShader />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-thin tracking-widest mb-4">Celestial Bloom</h1>
        <p className="text-lg tracking-wider opacity-60">A Procedural Shader Animation</p>
      </div>
    </div>
  );
}
