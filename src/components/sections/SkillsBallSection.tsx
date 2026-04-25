import { Suspense, useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Decal, Environment, Html, Preload, useProgress, useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from '@react-three/rapier';

import { styles } from '../../constants/styles';

export type SkillItem = {
  name: string;
  icon: string;
};

type SkillsBallSectionProps = {
  subtitle?: string;
  title?: string;
  skills: SkillItem[];
  id?: string;
};

type SphereItem = {
  id: string;
  iconIndex: number;
  scale: number;
  position: [number, number, number];
};

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const scaleValues = [0.58, 0.66, 0.74, 0.82, 0.9];
const spherePalette = [
  '#55c7ff',
  '#7dd3fc',
  '#8b5cf6',
  '#22d3ee',
  '#fb7185',
  '#f97316',
  '#facc15',
  '#34d399',
];

function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-md">
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// Reusable vector instances to avoid GC pressure
const _pointerTarget = new THREE.Vector3();
const _lerpTarget = new THREE.Vector3();

function PointerOrb() {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame(({ pointer, viewport }) => {
    _lerpTarget.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    _pointerTarget.lerp(_lerpTarget, 0.18);
    api.current?.setNextKinematicTranslation(_pointerTarget);
  });

  return (
    <RigidBody ref={api} type="kinematicPosition" colliders={false} position={[0, 0, 0]}>
      <BallCollider args={[1.8]} />
    </RigidBody>
  );
}

// Reusable vectors per sphere (cached outside render)
const _worldPos = new THREE.Vector3();
const _impulseDir = new THREE.Vector3();
const _negMultiplier = new THREE.Vector3(-0.55, -0.85, -0.65);

function LogoSphere({
  material,
  decalMap,
  scale,
  position,
}: {
  material: THREE.MeshPhysicalMaterial;
  decalMap: THREE.Texture;
  scale: number;
  position: [number, number, number];
}) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((state, delta) => {
    if (!api.current) return;

    const safeDelta = Math.min(delta, 0.1);
    const translation = api.current.translation();

    _worldPos.set(translation.x, translation.y, translation.z);

    const swirlX = Math.sin(state.clock.elapsedTime * 0.35 + translation.y) * 0.35;
    const swirlY = Math.cos(state.clock.elapsedTime * 0.28 + translation.x) * 0.22;

    _impulseDir
      .copy(_worldPos)
      .multiply(_negMultiplier)
      .x += swirlX;
    _impulseDir.y += swirlY;
    _impulseDir.multiplyScalar(safeDelta * scale * 3.8);

    api.current.applyImpulse(_impulseDir, true);
  });

  return (
    <RigidBody
      ref={api}
      colliders={false}
      position={position}
      linearDamping={0.8}
      angularDamping={1}
      friction={0.2}
      restitution={0.9}
      enabledRotations={[false, false, false]}
    >
      <BallCollider args={[scale]} />
      <mesh castShadow receiveShadow geometry={sphereGeometry} material={material} scale={scale}>
        <Decal
          position={[0, 0, 0.99]}
          rotation={[0, 0, 0]}
          scale={[0.84, 0.84, 0.84]}
          map={decalMap}
        />
      </mesh>
    </RigidBody>
  );
}

function Bounds() {
  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[5.8, 0.35, 5]} position={[0, -3.8, 0]} />
        <CuboidCollider args={[5.8, 0.35, 5]} position={[0, 3.8, 0]} />
        <CuboidCollider args={[0.35, 3.7, 5]} position={[-5.8, 0, 0]} />
        <CuboidCollider args={[0.35, 3.7, 5]} position={[5.8, 0, 0]} />
        <CuboidCollider args={[5.8, 3.7, 0.35]} position={[0, 0, -3.8]} />
        <CuboidCollider args={[5.8, 3.7, 0.35]} position={[0, 0, 3.8]} />
      </RigidBody>
    </>
  );
}

// Pause rendering when off-screen
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

function TechOrbScene({ skills }: { skills: SkillItem[] }) {
  const iconUrls = useMemo(() => skills.map(skill => skill.icon), [skills]);
  const iconTextures = useTexture(iconUrls) as THREE.Texture[];

  const sphereItems = useMemo<SphereItem[]>(() => {
    return skills.map((skill, index) => {
      const total = skills.length;
      const angle = (index / total) * Math.PI * 2;
      const ring = index % 3 === 0 ? 1.2 : index % 3 === 1 ? 1.75 : 2.15;
      const depthBand = ((index % 5) - 2) * 0.24;

      return {
        id: `sphere-${skill.name}`,
        iconIndex: index,
        scale: scaleValues[index % scaleValues.length],
        position: [
          Math.sin(angle * 1.18) * ring,
          Math.cos(angle) * (0.95 + (index % 3) * 0.35) + ((index % 4) - 1.5) * 0.14,
          depthBand,
        ],
      };
    });
  }, [skills]);

  const materials = useMemo(
    () =>
      iconTextures.map((texture, index) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;

        const accent = new THREE.Color(spherePalette[index % spherePalette.length]);

        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#f5f7fb'),
          emissive: accent.clone().multiplyScalar(0.1),
          emissiveIntensity: 0.28,
          metalness: 0.03,
          roughness: 0.08,
          clearcoat: 1,
          clearcoatRoughness: 0.04,
          reflectivity: 1,
          envMapIntensity: 1.1,
        });
      }),
    [iconTextures]
  );

  return (
    <>
      <color attach="background" args={['#070b13']} />
      <fog attach="fog" args={['#070b13', 12, 28]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={1.35} color="#dbeafe" />
      <spotLight
        position={[0, 8, 8]}
        angle={0.36}
        intensity={18}
        penumbra={1}
        color="#67e8f9"
        castShadow
        shadow-mapSize={512}
      />
      <pointLight position={[-5, -2, 5]} intensity={11} color="#a855f7" />
      <pointLight position={[6, 2, -2]} intensity={9} color="#22d3ee" />

      <Physics gravity={[0, 0, 0]}>
        <PointerOrb />
        <Bounds />
        {sphereItems.map(item => (
          <LogoSphere
            key={item.id}
            material={materials[item.iconIndex]}
            decalMap={iconTextures[item.iconIndex]}
            scale={item.scale}
            position={item.position}
          />
        ))}
      </Physics>

      <Environment preset="city" />
      <Preload all />
    </>
  );
}

function SkillsTicker({ skills }: { skills: SkillItem[] }) {
  return (
    <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 shadow-[0_10px_40px_rgba(8,15,34,0.35)] backdrop-blur-md"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: spherePalette[index % spherePalette.length] }}
          />
          <img src={skill.icon} alt={skill.name} className="h-4 w-4 object-contain" loading="lazy" />
          <span className="truncate">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}

function SkillsBallSection({
  subtitle = 'My skills',
  title = 'Technologies.',
  skills,
  id = 'skills',
}: SkillsBallSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Only mount the heavy Canvas when section is near viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 text-center sm:mb-12">
          <p className={styles.sectionSubText}>{subtitle}</p>
          <h2 className={styles.sectionHeadText}>{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            A cleaner interactive stack field with glossy logo spheres and a sharper presentation.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b13] shadow-[0_30px_120px_rgba(2,8,23,0.65)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-12 z-0 text-center font-light uppercase tracking-[0.08em] text-white/16">
            <div className="text-[clamp(2.8rem,8vw,7rem)] leading-none">My Tech Stack</div>
            <div className="mt-3 text-[clamp(0.8rem,1.5vw,1rem)] tracking-[0.55em] text-white/18">
              Colorful. Clean. Interactive.
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-10 left-1/2 h-28 w-[26rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="h-[26rem] w-full sm:h-[34rem] lg:h-[42rem]">
            {isVisible ? (
              <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 14.5], fov: 34, near: 0.1, far: 100 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                onCreated={({ gl }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping;
                  gl.toneMappingExposure = 1.1;
                }}
              >
                <VisibilityController />
                <Suspense fallback={<CanvasLoader />}>
                  <TechOrbScene skills={skills} />
                </Suspense>
              </Canvas>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-md">
                  Loading...
                </div>
              </div>
            )}
          </div>
        </div>

        <SkillsTicker skills={skills} />
      </div>
    </section>
  );
}

export default SkillsBallSection;
