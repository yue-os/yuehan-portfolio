import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_STACK } from '../constants';

const CATEGORY_CENTERS: Record<string, [number, number, number]> = {
  "Languages": [0, 3, 0],
  "Frameworks": [5, 1, 0],
  "Engines & Tools": [-5, 1, 0],
  "Cybersecurity": [0, -3, 0],
};

const CATEGORY_COLORS: Record<string, string> = {
  "Languages": "#a855f7", // purple-500
  "Frameworks": "#22d3ee", // cyan-400
  "Engines & Tools": "#f43f5e", // rose-500
  "Cybersecurity": "#dc2626", // crimson/red-600
};

interface TechNodeProps {
  name: string;
  icon: string;
  position: [number, number, number];
  color: string;
}

const TechNode: React.FC<TechNodeProps> = ({ name, icon, position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Sphere args={[0.3, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={0.3}
            radius={1}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Sphere>
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="top"
        >
          {name}
        </Text>
        <Text
          position={[0, 0, 0.4]}
          fontSize={0.4}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </group>
    </Float>
  );
};

const TechNodes = () => {
  const nodes = useMemo(() => {
    const allNodes: React.ReactElement[] = [];
    
    TECH_STACK.forEach((category) => {
      const center = CATEGORY_CENTERS[category.category] || [0, 0, 0];
      const color = CATEGORY_COLORS[category.category] || "#ffffff";
      
      category.items.forEach((item, index) => {
        // Spiral-like distribution around the center
        const phi = Math.acos(-1 + (2 * index) / category.items.length);
        const theta = Math.sqrt(category.items.length * Math.PI) * phi;
        
        const spread = 1.5;
        const x = center[0] + spread * Math.sin(phi) * Math.cos(theta);
        const y = center[1] + spread * Math.sin(phi) * Math.sin(theta);
        const z = center[2] + spread * Math.cos(phi);
        
        allNodes.push(
          <TechNode
            key={`${category.category}-${item.name}`}
            name={item.name}
            icon={item.icon}
            position={[x, y, z]}
            color={color}
          />
        );
      });
    });
    
    return allNodes;
  }, []);

  return <>{nodes}</>;
};

const TechWeb: React.FC = () => {
  return (
    <div className="w-full h-[600px] bg-transparent cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f43f5e" />
        
        <TechNodes />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          makeDefault
        />
      </Canvas>
    </div>
  );
};

export default TechWeb;