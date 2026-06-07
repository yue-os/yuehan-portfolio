import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float, Center, Stars, Sparkles, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader, MTLLoader } from 'three-stdlib';

const NeuralWeb: React.FC = () => {
  const count = 400; // Drastically reduced for performance
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    
    // Smooth lerp with lower sensitivity
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.pointer.x * 1.2, 0.04);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, state.pointer.y * 1.2, 0.04);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
};

const MovingSkull: React.FC<{ scale: number }> = ({ scale }) => {
  const { viewport } = useThree();
  const skullRef = useRef<THREE.Group>(null);
  const scrollY = useRef(0);
  const timer = useMemo(() => new (THREE as any).Timer(), []);
  const skullObjUrl = useMemo(() => new URL('../assets/skull/skull.obj', import.meta.url).href, []);
  const skullMtlUrl = useMemo(() => new URL('../assets/skull/skull.mtl', import.meta.url).href, []);

  const materials = useLoader(MTLLoader, skullMtlUrl);
  const skullModel = useLoader(OBJLoader, skullObjUrl, (loader: OBJLoader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useEffect(() => {
    (skullModel as THREE.Object3D).traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).color.set('#111111');
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
        }
      }
    });
  }, [skullModel]);

  useFrame((state) => {
    timer.update();
    const elapsed = timer.getElapsed();

    scrollY.current = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY.current / Math.max(pageHeight, 1);
    const xPercent = Math.min(Math.max(scrollPercent, 0), 1);

    if (skullRef.current) {
      const targetX = (state.pointer.x * viewport.width) / 14;
      const targetY = (state.pointer.y * viewport.height) / 14;
      
      skullRef.current.position.y = THREE.MathUtils.lerp(3.5, -12, scrollPercent) + targetY;
      if (xPercent < 0.33) {
        skullRef.current.position.x = THREE.MathUtils.lerp(0, -4.4, xPercent / 0.33) + targetX;
      } else if (xPercent < 0.66) {
        skullRef.current.position.x = THREE.MathUtils.lerp(-4.4, 4.3, (xPercent - 0.33) / 0.33) + targetX;
      } else {
        skullRef.current.position.x = THREE.MathUtils.lerp(4.3, -4.0, (xPercent - 0.66) / 0.34) + targetX;
      }
      skullRef.current.position.z = -5;
      
      const targetPos = new THREE.Vector3().copy(state.camera.position);
      targetPos.x += state.pointer.x * 1.5;
      targetPos.y += state.pointer.y * 1.5;
      
      skullRef.current.lookAt(targetPos);
      skullRef.current.rotation.z += Math.sin(elapsed * 0.3) * 0.04;
    }
  });

  return (
    <group>
      <NeuralWeb />
      <Sparkles count={20} scale={15} size={1.2} speed={0.2} color="#dc2626" opacity={0.3} />
      <Sparkles count={20} scale={15} size={1.2} speed={0.2} color="#22d3ee" opacity={0.3} />
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
        <Center top>
          <group ref={skullRef} scale={scale} rotation={[0, Math.PI, 0]}>
            <primitive object={skullModel} />
          </group>
        </Center>
      </Float>
    </group>
  );
};

const SkullBackground: React.FC<{ scale?: number }> = ({ scale = .50 }) => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#010208]">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 40 }} 
        dpr={1} 
        gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
      >
        <fog attach="fog" args={['#010208', 5, 25]} />
        <ambientLight intensity={0.1} />
        
        {/* Optimized Starfield */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />

        <Suspense fallback={null}>
          <MovingSkull scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkullBackground;