import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, MeshDistortMaterial, PerspectiveCamera, Segments, Segment, Billboard, Sparkles } from '@react-three/drei';
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
  isHovered: boolean;
  onHover: (name: string | null) => void;
}

const TechNode: React.FC<TechNodeProps> = ({ name, icon, position, color, isHovered, onHover }) => {
  return (
    <group 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(name);
      }}
      onPointerOut={() => onHover(null)}
    >
      <Sphere args={[0.3, 32, 32]} scale={isHovered ? 1.4 : 1}>
        <MeshDistortMaterial
          color={color}
          speed={isHovered ? 4 : 2}
          distort={isHovered ? 0.5 : 0.3}
          radius={1}
          emissive={color}
          emissiveIntensity={isHovered ? 2 : 0.5}
        />
      </Sphere>
      <Billboard>
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
      </Billboard>
    </group>
  );
};

const TechNodesAndConnections = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const { nodeData, connections } = useMemo(() => {
    const posMap: Record<string, [number, number, number]> = {};
    const nodes: { name: string, icon: string, position: [number, number, number], color: string }[] = [];
    
    // 1. Calculate positions and create node data
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
        
        posMap[item.name] = [x, y, z];
        
        nodes.push({
          name: item.name,
          icon: item.icon,
          position: [x, y, z],
          color: color,
        });
      });
    });

    // 2. Define connections
    const lineSegments: { start: [number, number, number], end: [number, number, number], color: string, from: string, to: string }[] = [];
    
    // Intra-category connections
    TECH_STACK.forEach((category) => {
      const color = CATEGORY_COLORS[category.category] || "#ffffff";
      category.items.forEach((item, index) => {
        const nextItem = category.items[(index + 1) % category.items.length];
        if (posMap[item.name] && posMap[nextItem.name]) {
          lineSegments.push({
            start: posMap[item.name],
            end: posMap[nextItem.name],
            color: color,
            from: item.name,
            to: nextItem.name
          });
        }
      });
    });

    // Cross-category connections (Neural links)
    const crossConnections = [
      ["Python", "FastAPI"],
      ["Python", "Kali Linux"],
      ["C#", "Unity"],
      ["C#", "ASP.NET"],
      ["TypeScript", "React"],
      ["Next.js", "React"],
      ["Node.js", "Docker"],
      ["PostgreSQL", "Supabase"],
      ["FastAPI", "Supabase"],
      ["React", "FastAPI"],
    ];

    crossConnections.forEach(([from, to]) => {
      if (posMap[from] && posMap[to]) {
        lineSegments.push({
          start: posMap[from],
          end: posMap[to],
          color: "#22d3ee", // Default neural cyan
          from,
          to
        });
      }
    });

    return { nodeData: nodes, connections: lineSegments };
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {nodeData.map((node) => (
          <TechNode
            key={`${node.name}`}
            {...node}
            isHovered={hoveredNode === node.name}
            onHover={setHoveredNode}
          />
        ))}
        <Segments limit={200} lineWidth={1} transparent opacity={0.6}>
          {connections.map((conn, i) => {
            const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;
            return (
              <Segment 
                key={i} 
                start={new THREE.Vector3(...conn.start)} 
                end={new THREE.Vector3(...conn.end)} 
                color={isHighlighted ? "#ffffff" : conn.color}
              />
            );
          })}
        </Segments>
      </group>
    </Float>
  );
};

const TechWeb: React.FC = () => {
  return (
    <div className="w-full h-[600px] bg-transparent cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f43f5e" />
        
        <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.2} color="#22d3ee" />
        
        <TechNodesAndConnections />
        
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