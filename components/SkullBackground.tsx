import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader, MTLLoader } from 'three-stdlib';

const MovingSkull: React.FC<{ scale: number }> = ({ scale }) => {
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
        mesh.receiveShadow = true;
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
      // 1. Position: Moves vertically and stays on the right side
      skullRef.current.position.y = THREE.MathUtils.lerp(3.5, -12, scrollPercent);
      if (xPercent < 0.33) {
        skullRef.current.position.x = THREE.MathUtils.lerp(0, -4.4, xPercent / 0.33);
      } else if (xPercent < 0.66) {
        skullRef.current.position.x = THREE.MathUtils.lerp(-4.4, 4.3, (xPercent - 0.33) / 0.33);
      } else {
        skullRef.current.position.x = THREE.MathUtils.lerp(4.3, -4.0, (xPercent - 0.66) / 0.34);
      }
      skullRef.current.position.z = -5; // Keep it slightly back
      
      // 2. ALWAYS FACING ME:
      // The camera position is where the user "is".
      // We want the skull to track the user.
      const targetPos = new THREE.Vector3().copy(state.camera.position);
      
      // Look at the camera but keep it upright
      skullRef.current.lookAt(targetPos);
      
      // Some models are exported facing the wrong way, we might need a 180 flip
      // skullRef.current.rotateY(Math.PI); 
      
      // Add a slight "breathing" sway
      skullRef.current.rotation.z += Math.sin(elapsed * 0.5) * 0.08;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1}>
      <Center top>
        <group ref={skullRef} scale={scale} rotation={[0, Math.PI, 0]}>
          <primitive object={skullModel} />
        </group>
      </Center>
    </Float>
  );
};

const SkullBackground: React.FC<{ scale?: number }> = ({ scale = .50 }) => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 8, 8]} intensity={3.5} color="#fff7ea" castShadow />
        <pointLight position={[10, 10, 10]} intensity={3.5} color="#dc2626" />
        <pointLight position={[-10, -10, 10]} intensity={2} color="#ffffff" />
        <spotLight position={[0, 10, 10]} angle={0.4} penumbra={1} intensity={2.5} color="#dc2626" castShadow />

        <Suspense fallback={null}>
          <MovingSkull scale={scale} />
        </Suspense>
      </Canvas>
      
      {/* Intense Red Team atmosphere vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
};

export default SkullBackground;
