"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/** Draws Kannada text on a canvas (browser shaping = always correct glyphs) and uses it as a texture. */
function textTexture(text: string, color = "#1d1b2e", bg = "transparent", size = 512) {
  const c = document.createElement("canvas");
  c.width = size * 2; c.height = size;
  const ctx = c.getContext("2d")!;
  if (bg !== "transparent") { ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height); }
  ctx.fillStyle = color;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = `800 ${size * 0.62}px "Noto Sans Kannada", "Kannada Sangam MN", "Nirmala UI", sans-serif`;
  ctx.fillText(text, c.width / 2, c.height / 2 + size * 0.04);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  return tex;
}

function Word({ text, position, scale = 1, color }: { text: string; position: [number, number, number]; scale?: number; color: string }) {
  const tex = useMemo(() => textTexture(text, color), [text, color]);
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh position={position} scale={[2 * scale, scale, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
    </Float>
  );
}

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((st) => { if (ref.current) ref.current.rotation.y = st.clock.elapsedTime * 0.25; });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 0.1, -0.6]} scale={1.55}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial color="#f5b301" distort={0.35} speed={2} roughness={0.15} metalness={0.25} />
      </mesh>
    </Float>
  );
}

function Orbit({ r, speed, size, color, y = 0, offset = 0 }: { r: number; speed: number; size: number; color: string; y?: number; offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((st) => {
    const t = st.clock.elapsedTime * speed + offset;
    if (ref.current) ref.current.position.set(Math.cos(t) * r, y + Math.sin(t * 1.3) * 0.25, Math.sin(t) * r - 0.6);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
    </mesh>
  );
}

function Cube({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const tex = useMemo(() => textTexture(label, "#ffffff"), [label]);
  const ref = useRef<THREE.Group>(null);
  useFrame((st) => { if (ref.current) { ref.current.rotation.x = Math.sin(st.clock.elapsedTime * 0.6) * 0.3; ref.current.rotation.y = st.clock.elapsedTime * 0.5; } });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
      <group ref={ref} position={position}>
        <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.12} smoothness={6}>
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.36]} scale={[0.9, 0.45, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({ word }: { word: string }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} />
      <pointLight position={[-4, -2, 2]} intensity={1.2} color="#f08a76" />
      <Blob />
      <Word text={word} position={[0, 0.15, 1.2]} scale={1.35} color="#1d1b2e" />
      <Cube position={[-2.4, 1.1, 0]} color="#d1462f" label="ಅ" />
      <Cube position={[2.5, -0.9, 0.2]} color="#3b6fd9" label="ಕ" />
      <Cube position={[2.2, 1.4, -1]} color="#2e9e6b" label="ನ" />
      <Cube position={[-2.3, -1.3, -0.5]} color="#7a4bd6" label="ಡ" />
      <Orbit r={2.9} speed={0.5} size={0.14} color="#ffd45c" y={0.4} />
      <Orbit r={3.2} speed={-0.35} size={0.1} color="#ffffff" y={-0.3} offset={2} />
      <Orbit r={2.6} speed={0.7} size={0.08} color="#f08a76" y={0.9} offset={4} />
      <Sparkles count={70} scale={[8, 5, 4]} size={3} speed={0.4} color="#fff1c2" />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={10} blur={2.4} far={3} />
      <Environment preset="city" />
    </>
  );
}

/** Interactive 3D hero. Pointer tilt via camera parallax; cheap enough for phones. */
export function KannadaScene({ word = "ಕನ್ನಡ", className }: { word?: string; className?: string }) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6.5], fov: 42 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <Parallax />
          <Scene word={word} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Parallax() {
  useFrame((st) => {
    st.camera.position.x += (st.pointer.x * 0.9 - st.camera.position.x) * 0.05;
    st.camera.position.y += (st.pointer.y * 0.6 - st.camera.position.y) * 0.05;
    st.camera.lookAt(0, 0, 0);
  });
  return null;
}

// keep the loader import referenced for tree-shaking friendliness in some bundlers
void useLoader;
