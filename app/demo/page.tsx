import AuroraBorealisShader from "@/components/ui/aurora-borealis-shader";

export default function DemoOne() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AuroraBorealisShader />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-thin tracking-widest mb-4">Aurora Borealis</h1>
        <p className="text-lg tracking-wider opacity-70">An Interactive WebGL Shader</p>
      </div>
    </div>
  );
}
