import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Decal, Environment, Html, Preload, useProgress, useTexture } from '@react-three/drei';
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

const sphereGeometry = new THREE.SphereGeometry(1, 52, 52);
const scaleValues = [0.72, 0.8, 0.88, 0.96, 1.04];
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

function getCompactLabel(label: string) {
  const customLabels: Record<string, string> = {
    'HTML 5': 'HTML5',
    'CSS 3': 'CSS3',
    JavaScript: 'JavaScript',
    TypeScript: 'TypeScript',
    'React JS': 'React',
    'Redux Toolkit': 'Redux',
    'Tailwind CSS': 'Tailwind',
    'Node JS': 'Node.js',
    MongoDB: 'MongoDB',
    'Three JS': 'Three.js',
    git: 'Git',
    figma: 'Figma',
    docker: 'Docker',
  };

  return customLabels[label] ?? label;
}

function getLabelLines(label: string) {
  const compactLabel = getCompactLabel(label);

  if (compactLabel.length <= 10) {
    return [compactLabel];
  }

  const words = compactLabel.split(' ');
  if (words.length === 1) {
    return [compactLabel];
  }

  if (words.length === 2) {
    return words;
  }

  return [words.slice(0, 2).join(' '), words.slice(2).join(' ')];
}

function createSkillBadgeTexture(iconSource: CanvasImageSource, label: string, accentColor: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;

  const context = canvas.getContext('2d');
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  const glow = context.createRadialGradient(512, 512, 120, 512, 512, 360);
  glow.addColorStop(0, `${accentColor}33`);
  glow.addColorStop(0.55, `${accentColor}14`);
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.roundRect(232, 238, 560, 548, 168);
  context.fillStyle = 'rgba(255,255,255,0.92)';
  context.fill();

  context.beginPath();
  context.roundRect(232, 238, 560, 548, 168);
  context.strokeStyle = 'rgba(255,255,255,0.45)';
  context.lineWidth = 8;
  context.stroke();

  context.beginPath();
  context.roundRect(340, 278, 344, 214, 108);
  context.fillStyle = 'rgba(245,247,250,0.92)';
  context.fill();

  context.drawImage(iconSource, 388, 302, 248, 166);

  context.fillStyle = accentColor;
  context.fillRect(390, 544, 244, 10);

  context.shadowColor = 'rgba(0, 0, 0, 0.12)';
  context.shadowBlur = 12;
  context.fillStyle = '#111827';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const lines = getLabelLines(label);
  let fontSize = lines.length > 1 ? 82 : 98;
  context.font = `700 ${fontSize}px Arial`;

  while (fontSize > 50 && lines.some(line => context.measureText(line).width > 455)) {
    fontSize -= 4;
    context.font = `700 ${fontSize}px Arial`;
  }

  lines.slice(0, 2).forEach((line, index) => {
    context.fillText(line, canvas.width / 2, 636 + index * 84);
  });
  context.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

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
  labelMap,
  scale,
  position,
}: {
  material: THREE.MeshPhysicalMaterial;
  labelMap: THREE.Texture;
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
        x: safeDelta * 0.14 * scale,
        y: safeDelta * 0.18 * scale,
        z: safeDelta * 0.12 * scale,
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
      <mesh castShadow receiveShadow geometry={sphereGeometry} material={material} scale={scale}>
        <Decal
          position={[0, 0, 0.98]}
          rotation={[0, 0, 0]}
          scale={[0.72, 0.72, 0.72]}
          map={labelMap}
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

function TechOrbScene({ skills, density }: { skills: SkillItem[]; density: number }) {
  const iconUrls = useMemo(() => skills.map(skill => skill.icon), [skills]);
  const textures = useTexture(iconUrls) as THREE.Texture[];

  const sphereItems = useMemo<SphereItem[]>(() => {
    return Array.from({ length: density }, (_, index) => {
      const angle = (index / density) * Math.PI * 2;
      const ring = 1.7 + (index % 4) * 0.42;
      const depthBand = ((index % 5) - 2) * 0.34;

      return {
        id: `sphere-${index}`,
        iconIndex: index % skills.length,
        scale: scaleValues[index % scaleValues.length],
        position: [
          Math.sin(angle * 1.2) * ring,
          Math.cos(angle * 1.05) * (1.25 + (index % 3) * 0.55) + ((index % 4) - 1.5) * 0.2,
          depthBand,
        ],
      };
    });
  }, [density, skills.length]);

  const materials = useMemo(
    () =>
      textures.map((texture, index) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;

        const baseColor = new THREE.Color(spherePalette[index % spherePalette.length]);

        return new THREE.MeshPhysicalMaterial({
          color: baseColor,
          emissive: baseColor.clone().multiplyScalar(0.22),
          emissiveIntensity: 0.38,
          metalness: 0.06,
          roughness: 0.12,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          reflectivity: 1,
        });
      }),
    [textures]
  );

  const labelTextures = useMemo(
    () =>
      textures.map((texture, index) =>
        createSkillBadgeTexture(
          texture.image as CanvasImageSource,
          skills[index].name,
          spherePalette[index % spherePalette.length]
        )
      ),
    [skills, textures]
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
            labelMap={labelTextures[item.iconIndex]}
            scale={item.scale}
            position={item.position}
          />
        ))}
      </Physics>

      <Environment preset="city" />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <N8AO aoRadius={1.4} intensity={0.9} color="#09111d" />
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
  const [density, setDensity] = useState(18);

  useEffect(() => {
    const updateDensity = () => {
      setDensity(window.innerWidth < 768 ? 12 : 18);
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
          <div className="pointer-events-none absolute inset-x-0 top-12 z-0 text-center font-light uppercase tracking-[0.08em] text-white/16">
            <div className="text-[clamp(2.8rem,8vw,7rem)] leading-none">My Tech Stack</div>
            <div className="mt-3 text-[clamp(0.8rem,1.5vw,1rem)] tracking-[0.55em] text-white/18">
              Colorful. Clean. Interactive.
            </div>
          </div>

          <div className="h-[26rem] w-full sm:h-[34rem] lg:h-[42rem]">
            <Canvas
              shadows
              dpr={[1, 1.8]}
              camera={{ position: [0, 0, 14.5], fov: 34, near: 0.1, far: 100 }}
              gl={{ antialias: true, alpha: true }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.1;
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
