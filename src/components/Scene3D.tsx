"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  { text: "JS", position: [-4, 2, -3] as [number, number, number], color: "#3b82f6" }, 
  { text: "Docker", position: [4, -1, -4] as [number, number, number], color: "#60a5fa" }, 
  { text: "C++", position: [0, -3, -5] as [number, number, number], color: "#2563eb" }, 
  { text: "AWS", position: [-3, -2, -6] as [number, number, number], color: "#93c5fd" }, 
  { text: "Linux", position: [3, 3, -7] as [number, number, number], color: "#1d4ed8" }, 
  { text: "React", position: [-2, 4, -5] as [number, number, number], color: "#bfdbfe" }, 
];

function FloatingSkill({ text, position, color }: { text: string; position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group position={position}>
        {/* The Ball */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshPhysicalMaterial 
            color="#0f172a" 
            metalness={0.9} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
            emissive={new THREE.Color(color)}
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* The Text using HTML to guarantee rendering without font fetch issues */}
        <Html center position={[0, 0, 0.9]} style={{ pointerEvents: 'none' }}>
          <div style={{ color: color, fontSize: '1.2rem', fontWeight: 'bold', textShadow: `0 0 10px ${color}` }}>
            {text}
          </div>
        </Html>
      </group>
    </Float>
  );
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" /> 
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        
        {skills.map((skill) => (
          <FloatingSkill key={skill.text} text={skill.text} position={skill.position} color={skill.color} />
        ))}
      </Canvas>
    </div>
  );
}
