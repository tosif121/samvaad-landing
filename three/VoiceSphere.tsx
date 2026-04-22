'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vNormal = normal;
  vPosition = position;
  float displacement = sin(position.x * 3.0 + uTime) * sin(position.y * 3.0 + uTime) * sin(position.z * 3.0 + uTime) * 0.15;
  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vec3 cyan = vec3(0.0, 1.0, 0.82);
  vec3 purple = vec3(0.1, 0.02, 0.2);
  float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
  vec3 color = mix(purple, cyan, fresnel);
  gl_FragColor = vec4(color, 0.85);
}
`;

const ORBIT_LABELS = ['Hindi', 'English', 'Hinglish', 'Inbound', 'Outbound', 'RAG'];

function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y += 0.003;
    if (lightRef.current) {
      lightRef.current.intensity = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.75 + 0.75;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[0, 0, 0]} color="#00FFD1" intensity={1.5} />
      <ambientLight intensity={0.1} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 5]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

function OrbitDot({ index, total, label }: { index: number; total: number; label: string }) {
  const ref = useRef<THREE.Group>(null);
  const speed = 0.3 + index * 0.1;
  const radius = 2.2 + index * 0.15;
  const inclination = (index / total) * Math.PI;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.cos(t) * radius * Math.sin(inclination);
    ref.current.position.y = Math.sin(inclination * 1.5) * radius * 0.5;
    ref.current.position.z = Math.sin(t) * radius * Math.sin(inclination);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#00FFD1" />
      </mesh>
    </group>
  );
}

export default function VoiceSphere() {
  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Sphere />
      {ORBIT_LABELS.map((label, i) => (
        <OrbitDot key={label} index={i} total={ORBIT_LABELS.length} label={label} />
      ))}
    </Canvas>
  );
}
