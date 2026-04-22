'use client';
import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const IDLE_MODE = {
  color1: [0.0, 1.0, 0.82] as [number, number, number],
  color2: [0.1, 0.02, 0.2] as [number, number, number],
  speed: 0.003,
  dispAmp: 0.15,
  dispFreq: 3.0,
};

// ─── SHADERS ──────────────────────────────────────────────────────────────────
const vertexShader = `
uniform float uTime;
uniform float uMorph;
uniform float uDispAmp;
uniform float uDispFreq;
uniform float uHover;
varying vec3 vNormal;
varying float vFresnel;
varying float vDisp;

void main() {
  vNormal = normalize(normalMatrix * normal);
  float wave = sin(position.x*uDispFreq + uTime*1.2)
             * sin(position.y*uDispFreq + uTime*0.9)
             * sin(position.z*uDispFreq + uTime*1.5);
  float morph = sin(position.x*2.0+uTime*0.5)*cos(position.y*2.0+uTime*0.7)*0.3*uMorph;
  vDisp = wave;
  float disp = wave*(uDispAmp + uMorph*0.3 + uHover*0.08) + morph;
  vec3 newPos = position + normal * disp;
  vFresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.2);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}`;

const fragmentShader = `
uniform float uTime;
uniform float uGlow;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uHover;
varying vec3 vNormal;
varying float vFresnel;
varying float vDisp;

void main() {
  vec3 col = mix(uColor2, uColor1, vFresnel);
  float scanline = step(0.98, fract(vNormal.y * 8.0 + uTime * 0.3));
  col += uColor1 * scanline * 0.15;
  float hotspot = pow(max(0.0, vDisp), 2.0) * 0.4;
  col += uColor1 * hotspot * (1.0 + uHover * 0.5);
  float alpha = 0.72 + vFresnel * 0.2 + uGlow * 0.08;
  gl_FragColor = vec4(col, alpha);
}`;

// ─── ORBIT CONFIG ─────────────────────────────────────────────────────────────
const ORBITS = [
  { label: 'Hindi',    speed: 0.28, radius: 1.8, inc: 0.5,  phase: 0   },
  { label: 'English',  speed: 0.22, radius: 2.0, inc: 1.1,  phase: 2.1 },
  { label: 'Hinglish', speed: 0.35, radius: 1.7, inc: 1.8,  phase: 4.2 },
  { label: 'Inbound',  speed: 0.19, radius: 2.1, inc: 0.9,  phase: 1.0 },
  { label: 'Outbound', speed: 0.31, radius: 1.9, inc: 2.3,  phase: 3.3 },
  { label: 'RAG',      speed: 0.25, radius: 2.0, inc: 1.5,  phase: 5.1 },
];

// ─── ORBIT DOT ────────────────────────────────────────────────────────────────
function OrbitDot({ data, color, modeSpeed }: {
  data: typeof ORBITS[0];
  color: THREE.Color;
  modeSpeed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !trailRef.current) return;
    const t = clock.getElapsedTime();
    const speed = data.speed * modeSpeed;
    const angle = t * speed + data.phase;
    ref.current.position.set(
      Math.cos(angle) * data.radius * Math.sin(data.inc),
      Math.sin(angle) * data.radius * 0.45 + Math.cos(t * 0.4 + data.phase) * 0.2,
      Math.sin(angle * 0.8 + data.phase * 0.3) * data.radius * 0.3
    );
    const ta = angle - 0.35;
    trailRef.current.position.set(
      Math.cos(ta) * data.radius * Math.sin(data.inc),
      Math.sin(ta) * data.radius * 0.45 + Math.cos(t * 0.4 + data.phase - 0.35) * 0.2,
      Math.sin(ta * 0.8 + data.phase * 0.3) * data.radius * 0.3
    );
  });

  return (
    <>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.09}
          color={color}
          anchorX="center"
          letterSpacing={0.12}
        >
          {data.label}
        </Text>
      </group>
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </>
  );
}

// ─── SPHERE ───────────────────────────────────────────────────────────────────
function VoiceSphereInner() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const morphRef = useRef(0);
  const scrollRef = useRef(0);
  const hoverRef = useRef(0);
  const rotSpeedRef = useRef(0.003);

  const uniforms = useMemo(() => ({
    uTime:     { value: 0 },
    uMorph:    { value: 0 },
    uDispAmp:  { value: IDLE_MODE.dispAmp },
    uDispFreq: { value: IDLE_MODE.dispFreq },
    uGlow:     { value: 0 },
    uHover:    { value: 0 },
    uColor1:   { value: new THREE.Color(...IDLE_MODE.color1) },
    uColor2:   { value: new THREE.Color(...IDLE_MODE.color2) },
  }), []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      scrollRef.current += e.deltaY * 0.0015;
      morphRef.current = Math.abs(Math.sin(scrollRef.current));
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    uniforms.uTime.value = t;

    uniforms.uMorph.value += (morphRef.current - uniforms.uMorph.value) * 0.05;
    morphRef.current *= 0.97;

    const targetGlow = hoverRef.current;
    uniforms.uGlow.value += (targetGlow - uniforms.uGlow.value) * 0.08;
    uniforms.uHover.value = uniforms.uGlow.value;

    const targetSpeed = hoverRef.current > 0.5
      ? IDLE_MODE.speed * 4
      : IDLE_MODE.speed;
    rotSpeedRef.current += (targetSpeed - rotSpeedRef.current) * 0.06;
    if (meshRef.current) {
      meshRef.current.rotation.y += rotSpeedRef.current;
      meshRef.current.rotation.x += rotSpeedRef.current * 0.25;
    }
    if (lightRef.current) {
      lightRef.current.intensity = (1.5 + Math.sin(t*2)*0.6) * (1 + uniforms.uGlow.value * 1.5);
      lightRef.current.position.set(
        0.8 + Math.sin(t*0.5)*0.3,
        Math.cos(t*0.3)*0.3,
        0.5
      );
    }
  });

  const modeColor = new THREE.Color(...IDLE_MODE.color1);
  const modeSpeedMult = 1.0;

  return (
    <>
      <pointLight ref={lightRef} position={[0.8, 0, 0.5]} color="#00FFD1" intensity={2} distance={12} />
      <ambientLight intensity={0.05} />
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerEnter={() => { hoverRef.current = 1 }}
        onPointerLeave={() => { hoverRef.current = 0 }}
      >
        <icosahedronGeometry args={[1.5, 6]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      {ORBITS.map((o) => (
        <OrbitDot key={o.label} data={o} color={modeColor} modeSpeed={modeSpeedMult} />
      ))}
    </>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function VoiceSphere() {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        className="absolute inset-0 z-10 pointer-events-auto"
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <VoiceSphereInner />
        </Suspense>
      </Canvas>
    </div>
  );
}
