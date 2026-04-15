import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html, Preload, useProgress, useTexture } from '@react-three/drei';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
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

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const scaleValues = [0.78, 0.88, 0.98, 1.08, 1.18];

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

function PointerOrb() {
  const api = useRef<RapierRigidBody | null>(null);
  const pointerTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ pointer, viewport }) => {
    pointerTarget.current.lerp(
      new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0),
      0.18
    );

    api.current?.setNextKinematicTranslation(pointerTarget.current);
  });

  return (
    <RigidBody ref={api} type="kinematicPosition" colliders={false} position={[0, 0, 0]}>
      <BallCollider args={[1.8]} />
    </RigidBody>
  );
}

function LogoSphere({
  material,
  scale,
  position,
}: {
  material: THREE.MeshPhysicalMaterial;
  scale: number;
  position: [number, number, number];
}) {
  const api = useRef<RapierRigidBody | null>(null);
  const worldPosition = useRef(new THREE.Vector3());
  const impulseDirection = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!api.current) return;

    const safeDelta = Math.min(delta, 0.1);
    const translation = api.current.translation();

    worldPosition.current.set(translation.x, translation.y, translation.z);

    const swirlX = Math.sin(state.clock.elapsedTime * 0.35 + translation.y) * 0.35;
    const swirlY = Math.cos(state.clock.elapsedTime * 0.28 + translation.x) * 0.22;

    impulseDirection.current
      .copy(worldPosition.current)
      .multiply(new THREE.Vector3(-0.55, -0.85, -0.65))
      .add(new THREE.Vector3(swirlX, swirlY, 0))
      .multiplyScalar(safeDelta * scale * 3.8);

    api.current.applyImpulse(impulseDirection.current, true);
    api.current.applyTorqueImpulse(
      {
        x: safeDelta * 0.22 * scale,
        y: safeDelta * 0.3 * scale,
        z: safeDelta * 0.18 * scale,
      },
      true
    );
  });

  return (
    <RigidBody
      ref={api}
      colliders={false}
      position={position}
      linearDamping={0.8}
      angularDamping={0.35}
      friction={0.2}
      restitution={0.9}
    >
      <BallCollider args={[scale]} />
      <mesh castShadow receiveShadow geometry={sphereGeometry} material={material} scale={scale} />
    </RigidBody>
  );
}

function Bounds() {
  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[7.5, 0.4, 6]} position={[0, -5.4, 0]} />
        <CuboidCollider args={[7.5, 0.4, 6]} position={[0, 5.4, 0]} />
        <CuboidCollider args={[0.35, 5.2, 6]} position={[-7.4, 0, 0]} />
        <CuboidCollider args={[0.35, 5.2, 6]} position={[7.4, 0, 0]} />
        <CuboidCollider args={[7.5, 5.2, 0.35]} position={[0, 0, -4.5]} />
        <CuboidCollider args={[7.5, 5.2, 0.35]} position={[0, 0, 4.5]} />
      </RigidBody>
    </>
  );
}

function TechOrbScene({ skills, density }: { skills: SkillItem[]; density: number }) {
  const iconUrls = useMemo(() => skills.map(skill => skill.icon), [skills]);
  const textures = useTexture(iconUrls) as THREE.Texture[];

  const sphereItems = useMemo<SphereItem[]>(() => {
    return Array.from({ length: density }, (_, index) => {
      const angle = (index / density) * Math.PI * 2;
      const depthBand = (index % 5) - 2;

      return {
        id: `sphere-${index}`,
        iconIndex: index % skills.length,
        scale: scaleValues[index % scaleValues.length],
        position: [
          Math.sin(angle * 1.3) * (3.1 + (index % 4) * 0.75),
          Math.cos(angle) * (2 + (index % 3) * 0.95),
          depthBand * 0.55,
        ],
      };
    });
  }, [density, skills.length]);

  const materials = useMemo(
    () =>
      textures.map(texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;

        return new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: new THREE.Color('#ffffff'),
          emissiveMap: texture,
          emissiveIntensity: 0.42,
          metalness: 0.1,
          roughness: 0.24,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
          reflectivity: 1,
          transparent: true,
        });
      }),
    [textures]
  );

  return (
    <>
      <color attach="background" args={['#070b13']} />
      <fog attach="fog" args={['#070b13', 12, 28]} />

      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 3]} intensity={1.7} color="#dbeafe" />
      <spotLight
        position={[0, 8, 8]}
        angle={0.36}
        intensity={28}
        penumbra={1}
        color="#67e8f9"
        castShadow
      />
      <pointLight position={[-5, -2, 5]} intensity={18} color="#a855f7" />
      <pointLight position={[6, 2, -2]} intensity={14} color="#22d3ee" />

      <Physics gravity={[0, 0, 0]}>
        <PointerOrb />
        <Bounds />
        {sphereItems.map(item => (
          <LogoSphere
            key={item.id}
            material={materials[item.iconIndex]}
            scale={item.scale}
            position={item.position}
          />
        ))}
      </Physics>

      <Environment preset="city" />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <N8AO aoRadius={1.8} intensity={1.35} color="#09111d" />
      </EffectComposer>
      <Preload all />
    </>
  );
}

function SkillsTicker({ skills }: { skills: SkillItem[] }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      {skills.map(skill => (
        <div
          key={skill.name}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm"
        >
          <img src={skill.icon} alt={skill.name} className="h-4 w-4 object-contain" loading="lazy" />
          <span>{skill.name}</span>
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
  const [density, setDensity] = useState(26);

  useEffect(() => {
    const updateDensity = () => {
      setDensity(window.innerWidth < 768 ? 14 : 26);
    };

    updateDensity();
    window.addEventListener('resize', updateDensity);

    return () => window.removeEventListener('resize', updateDensity);
  }, []);

  return (
    <section id={id} className="relative overflow-hidden py-20 sm:py-24">
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
            Drag your cursor through the stack and watch the tools float, collide, and reform.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b13] shadow-[0_30px_120px_rgba(2,8,23,0.65)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_28%)]" />
          <div className="pointer-events-none absolute left-1/2 top-12 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.5em] text-white/60 backdrop-blur-md">
            Interactive Stack Field
          </div>

          <div className="h-[26rem] w-full sm:h-[34rem] lg:h-[42rem]">
            <Canvas
              shadows
              dpr={[1, 1.8]}
              camera={{ position: [0, 0, 18], fov: 32, near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: true }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.2;
              }}
            >
              <Suspense fallback={<CanvasLoader />}>
                <TechOrbScene skills={skills} density={density} />
              </Suspense>
            </Canvas>
          </div>
        </div>

        <SkillsTicker skills={skills} />
      </div>
    </section>
  );
}

export default SkillsBallSection;
