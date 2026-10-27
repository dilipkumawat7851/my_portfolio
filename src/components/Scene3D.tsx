"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  { name: "JS", color: "#f7df1e", position: [-3, 2, -2] },
  { name: "Docker", color: "#10b981", position: [4, 3, -4] },
  { name: "C++", color: "#f59e0b", position: [-5, -1, -5] },
  { name: "AWS", color: "#ff9900", position: [5, -2, -3] },
  { name: "Linux", color: "#34d399", position: [0, 4, -6] },
  { name: "React", color: "#a855f7", position: [2, -4, -2] },
];

function SkillSphere({ position, color, name }: { position: number[]; color: string; name: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position as [number, number, number]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
      <Html distanceFactor={10} center>
        <div className="px-2 py-1 glass-card text-white text-xs font-semibold rounded pointer-events-none select-none border border-white/10" style={{ textShadow: `0 0 8px rgba(255,255,255,0.6)` }}>
          {name}
        </div>
      </Html>
    </mesh>
  );
}

function SceneControls({ mousePos }: { mousePos: { x: number; y: number } }) {
  useFrame((state) => {
    // Subtle mouse follow parallax
    state.camera.position.x += (mousePos.x * 2 - state.camera.position.x) * 0.05;
    state.camera.position.y += (-mousePos.y * 2 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none transition-transform duration-75 ease-out"
      style={{ transform: `translateY(${scrollY * 0.3}px)` }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {skills.map((skill, index) => (
          <SkillSphere key={index} {...skill} />
        ))}
        
        <SceneControls mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
