import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, Sparkles, Text } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';

function useScrollOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setOffset(max > 0 ? scroll / max : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return offset;
}

function HeroPortal({ offset }: { offset: number }) {
  const group = useRef<any>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.14;
      group.current.position.x = Math.sin(t * 0.2) * 0.12;
      group.current.position.y = -offset * 1.5;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[0, 0.25, 0]}>
          <torusGeometry args={[1.55, 0.16, 32, 120]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            metalness={0.85}
            roughness={0.12}
            emissive="#38bdf8"
            emissiveIntensity={0.45}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.8}>
        <mesh position={[0, -0.35, 0]}>
          <icosahedronGeometry args={[0.75, 2]} />
          <meshStandardMaterial color="#6366f1" roughness={0.18} metalness={0.35} emissive="#7c3aed" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Text
        position={[0, -1.75, 0]}
        fontSize={0.35}
        letterSpacing={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Cloud Architect
      </Text>
    </group>
  );
}

function SkillSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={1.3}>
      <mesh position={position}>
        <sphereGeometry args={[0.3, 28, 28]} />
        <meshPhysicalMaterial color={color} metalness={0.55} roughness={0.18} emissive={color} emissiveIntensity={0.15} clearcoat={0.9} />
      </mesh>
    </Float>
  );
}

function SkillSphereField({ offset }: { offset: number }) {
  const group = useRef<any>();

  useFrame((state) => {
    if (group.current) {
      group.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.25;
      group.current.position.y = -offset * 2.2;
    }
  });

  return (
    <group ref={group}>
      <SkillSphere position={[-1.8, -0.4, -1.2]} color="#38bdf8" />
      <SkillSphere position={[1.4, 0.1, -1.5]} color="#f97316" />
      <SkillSphere position={[0.4, -0.9, -2.1]} color="#34d399" />
      <SkillSphere position={[-0.7, 0.7, -1.4]} color="#a78bfa" />
    </group>
  );
}

function ExperienceTrail({ offset }: { offset: number }) {
  const group = useRef<any>();

  useFrame((state) => {
    if (group.current) {
      group.current.position.x = Math.cos(state.clock.getElapsedTime() * 0.1) * 0.18;
      group.current.position.y = -offset * 3.5 - 0.5;
    }
  });

  return (
    <group ref={group}>
      {[...Array(4)].map((_, index) => (
        <Float key={index} speed={1.1 + index * 0.1} rotationIntensity={0.2} floatIntensity={1.1}>
          <mesh position={[index * 1.1 - 1.8, -2.4 - index * 0.85, -2.6]}>
            <boxGeometry args={[0.42, 0.6, 0.1]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#818cf8" emissiveIntensity={0.12} roughness={0.35} metalness={0.35} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function BackgroundScene() {
  const offset = useScrollOffset();

  return (
    <Canvas className="background-canvas" camera={{ position: [0, 0, 16], fov: 30 }}>
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} />
      <Sparkles count={192} scale={[20, 10, 12]} size={2.5} speed={0.18} color="#66d9ef" />
      <Stars radius={130} depth={100} count={2600} factor={4} saturation={0.75} fade />
      <HeroPortal offset={offset} />
      <SkillSphereField offset={offset} />
      <ExperienceTrail offset={offset} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.6, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial roughness={1} color="#020717" emissive="#04131f" emissiveIntensity={0.2} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </Canvas>
  );
}
