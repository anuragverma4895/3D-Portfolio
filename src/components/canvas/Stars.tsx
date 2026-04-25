import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";

const Stars = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => {
    const s = random.inSphere(new Float32Array(3003), { radius: 1.2 }) as Float32Array;
    // Filter out any NaN values just in case
    for (let i = 0; i < s.length; i++) {
        if (isNaN(s[i])) s[i] = 0;
    }
    return s;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Pause rendering when not visible
function VisibilityController() {
  const { gl } = useThree();
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = gl.domElement.parentElement;
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gl.setAnimationLoop(null); // resume default loop
        } else {
          gl.setAnimationLoop(() => {}); // pause rendering
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [gl]);

  return null;
}

const StarsCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "low-power", antialias: false }}
      >
        <VisibilityController />
        <Stars />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
