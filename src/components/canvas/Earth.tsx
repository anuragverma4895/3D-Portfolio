import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

// Pause rendering when not visible
function VisibilityController() {
  const { gl } = useThree();

  useEffect(() => {
    const container = gl.domElement.parentElement;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gl.setAnimationLoop(null);
        } else {
          gl.setAnimationLoop(() => {});
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [gl]);

  return null;
}

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true, powerPreference: "low-power" }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <VisibilityController />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={3}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
