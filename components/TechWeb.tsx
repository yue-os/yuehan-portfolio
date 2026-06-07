import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere, Html, Float, Line, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_STACK } from '../constants';

const CATEGORY_CENTERS: Record<string, [number, number, number]> = {
  "Languages": [0, 3, 0],
  "Frameworks": [5, 1, 0],
  "Engines & Tools": [-5, 1, 0],
  "Cybersecurity": [0, -3, 0],
};

const CATEGORY_COLORS: Record<string, string> = {
  "Languages": "#a855f7",
  "Frameworks": "#22d3ee",
  "Engines & Tools": "#f43f5e",
  "Cybersecurity": "#dc2626",
};

const MASTERY_LEVELS: Record<string, string> = {
  "Languages": "MASTERED",
  "Frameworks": "EXPERT",
  "Engines & Tools": "ADVANCED",
  "Cybersecurity": "OPERATIONAL",
};

interface TechNodeProps {
  name: string;
  icon: string;
  position: [number, number, number];
  color: string;
  category: string;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const TechNode: React.FC<TechNodeProps> = ({ name, icon, position, color, category, isHovered, onHover }) => {
  return (
    <group 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
    >
      <Sphere args={[0.3, 16, 16]} scale={isHovered ? 1.4 : 1}>
        <meshStandardMaterial 
          color={isHovered ? "#ffffff" : color} 
          emissive={isHovered ? "#ffffff" : color}
          emissiveIntensity={isHovered ? 2 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      
      {isHovered ? (
        <Html distanceFactor={10} position={[0, 0, 0]} center>
          <div className="hologram-panel w-48 bg-[#060a16]/90 border border-cyan-400/50 p-3 rounded-sm backdrop-blur-md relative overflow-hidden">
            <div className="hologram-scanline" />
            
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />

            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-white tracking-tighter uppercase">{name}</span>
              <span className="text-[7px] px-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                [{MASTERY_LEVELS[category] || 'ACTIVE'}]
              </span>
            </div>
            
            <div className="text-[8px] text-cyan-300/80 font-mono uppercase leading-tight">
              &gt; Status: System_Active<br />
              &gt; Priority: High<br />
              &gt; Neural_Sync: 98%
            </div>
          </div>
        </Html>
      ) : (
        <Html distanceFactor={10} position={[0, -0.6, 0]} center pointerEvents="none">
          <div className="whitespace-nowrap flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded text-[8px] font-mono font-bold text-slate-400 transition-all">
            <span>{icon}</span>
            <span>{name}</span>
          </div>
        </Html>
      )}
    </group>
  );
};

const TechNodesAndConnections = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const { nodeData, connections } = useMemo(() => {
    const posMap: Record<string, [number, number, number]> = {};
    const nodes: { name: string, icon: string, position: [number, number, number], color: string, category: string }[] = [];
    
    TECH_STACK.forEach((category) => {
      const center = CATEGORY_CENTERS[category.category] || [0, 0, 0];
      const color = CATEGORY_COLORS[category.category] || "#ffffff";
      
      category.items.forEach((item, index) => {
        const phi = Math.acos(-1 + (2 * index) / category.items.length);
        const theta = Math.sqrt(category.items.length * Math.PI) * phi;
        const spread = 2.5;
        const x = center[0] + spread * Math.sin(phi) * Math.cos(theta);
        const y = center[1] + spread * Math.sin(phi) * Math.sin(theta);
        const z = center[2] + spread * Math.cos(phi);
        
        posMap[item.name] = [x, y, z];
        nodes.push({ 
          name: item.name, 
          icon: item.icon, 
          position: [x, y, z], 
          color: color,
          category: category.category
        });
      });
    });

    const lineSegments: { start: [number, number, number], end: [number, number, number], color: string, from: string, to: string }[] = [];
    
    // Intra-category
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

    // Cross-category
    const crossConnections = [
      ["Python", "FastAPI"], ["Python", "Kali Linux"], ["C#", "Unity"],
      ["TypeScript", "React"], ["Next.js", "React"], ["Node.js", "Docker"]
    ];

    crossConnections.forEach(([from, to]) => {
      if (posMap[from] && posMap[to]) {
        lineSegments.push({
          start: posMap[from],
          end: posMap[to],
          color: "#22d3ee",
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
        {nodeData.map((node, i) => (
          <TechNode
            key={i}
            {...node}
            isHovered={hoveredNode === node.name}
            onHover={(hovered) => setHoveredNode(hovered ? node.name : null)}
          />
        ))}
        {connections.map((conn, i) => {
          const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;
          return (
            <Line
              key={i}
              points={[conn.start, conn.end]}
              color={isHighlighted ? "#ffffff" : conn.color}
              lineWidth={1}
              transparent
              opacity={isHighlighted ? 0.8 : 0.2}
            />
          );
        })}
      </group>
    </Float>
  );
};

const TechWeb: React.FC = () => {
  return (
    <div className="w-full h-[600px] relative bg-transparent">
      <Canvas dpr={1} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        <Sparkles count={50} scale={20} size={2} speed={0.4} opacity={0.2} color="#22d3ee" />
        <TechNodesAndConnections />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default TechWeb;