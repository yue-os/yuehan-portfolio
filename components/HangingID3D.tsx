import React, { useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const CARD_TOP_OFFSET = new THREE.Vector3(0, -0.11, 0); // Top edge of the ID card body
const UP_AXIS = new THREE.Vector3(0, 1, 0);

interface HangingIDModelProps {
  imageUrl?: string;
  name?: string;
  scale?: number;
}

const defaultProfileImageUrl = new URL('../assets/profile.jpg', import.meta.url).href;

const HangingIDModel: React.FC<HangingIDModelProps> = ({ 
  imageUrl = defaultProfileImageUrl, 
  name = 'Johnmark Calimbo',
  scale
}) => {
  const { viewport } = useThree();

  const derivedScale = useMemo(() => {
    const baseScale = scale || 0.9;
    // If viewport is narrow, reduce scale further
    if (viewport.width < 5) return baseScale * 0.55; 
    if (viewport.width < 7) return baseScale * 0.8;
    return baseScale;
  }, [viewport.width, scale]);

  const responsiveAnchor = useMemo(() => {
    // On desktop (viewport.width > 7), use 2.8. 
    // On mobile, position it relative to the right edge.
    const xPos = viewport.width > 7 ? 2.8 : (viewport.width / 2 - 0.6);
    return new THREE.Vector3(xPos, 3.2, 0);
  }, [viewport.width]);

  const cardRigRef = useRef<THREE.Group>(null);
  const laceRef = useRef<THREE.Mesh>(null);
  
  const initialX = viewport.width > 7 ? 2.8 : (viewport.width / 2 - 0.6);
  const bobPosRef = useRef(new THREE.Vector3(initialX, 2.1, 0));
  const bobVelRef = useRef(new THREE.Vector3(0, 0, 0));
  const dragTargetRef = useRef(new THREE.Vector3(initialX, 2.1, 0));
  const draggingRef = useRef(false);

  // Use the original offset - the world matrix will handle the scaling
  const localTop = useMemo(() => CARD_TOP_OFFSET.clone(), []);

  useEffect(() => {
    const handlePointerUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const onCardPointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    draggingRef.current = true;
  };

  const onCardPointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    draggingRef.current = false;
  };

  // Load image with explicit crossOrigin and error handling
  const photoTex = useLoader(TextureLoader, imageUrl, (loader) => {
    loader.setCrossOrigin('anonymous');
  });

  const frontTexture = useMemo(() => {
    const w = 1024;
    const h = 1382;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Tactical dark background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // Subtle binary/matrix pattern
    ctx.font = '12px monospace';
    ctx.fillStyle = 'rgba(220, 38, 38, 0.05)';
    for(let y=20; y<h; y+=25) {
      let line = "";
      for(let x=0; x<30; x++) line += Math.random() > 0.5 ? "1" : "0";
      ctx.fillText(line, 10, y);
    }

    const pad = 60;
    
    // Header
    ctx.fillStyle = '#dc2626'; // Crimson red
    ctx.fillRect(0, 0, w, 120);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText("RED TEAM // OPERATIVE", w/2, 80);

    // 1:1 Square Photo Area
    const photoSize = w - pad * 2;
    ctx.fillStyle = '#171717';
    ctx.fillRect(pad - 4, pad + 100, photoSize + 8, photoSize + 8);

    if (photoTex && photoTex.image) {
      const img = photoTex.image as HTMLImageElement;
      ctx.save();
      const rx = pad, ry = pad + 104, rw = photoSize, rh = photoSize, r = 4;
      ctx.beginPath();
      ctx.moveTo(rx + r, ry);
      ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
      ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
      ctx.arcTo(rx, ry + rh, rx, ry, r);
      ctx.arcTo(rx, ry, rx + rw, ry, r);
      ctx.closePath();
      ctx.clip();
      
      const ratio = Math.max(rw / img.width, rh / img.height);
      const iw = img.width * ratio;
      const ih = img.height * ratio;
      const ix = rx + (rw - iw) / 2;
      const iy = ry + (rh - ih) / 2;
      
      // Grayscale/Desaturated effect
      ctx.filter = 'grayscale(100%) contrast(110%)';
      ctx.drawImage(img, ix, iy, iw, ih);
      ctx.filter = 'none';
      
      // Subtle red scanline overlay
      ctx.fillStyle = 'rgba(220, 38, 38, 0.1)';
      for(let i=0; i<rh; i+=6) ctx.fillRect(rx, ry+i, rw, 1);
      
      ctx.restore();
    }

    // Name at the bottom
    const bottomY = h - 160;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 90px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(name.toUpperCase(), w/2, bottomY);
    
    ctx.font = 'bold 36px monospace';
    ctx.fillStyle = '#dc2626';
    ctx.fillText("OFFENSIVE SECURITY SPECIALIST", w/2, bottomY + 50);

    // Decorative footer
    ctx.fillStyle = '#171717';
    ctx.fillRect(0, h - 80, w, 80);
    ctx.fillStyle = '#737373';
    ctx.font = 'bold 24px monospace';
    ctx.fillText("PROPERTY OF YUE-OS // UNAUTHORIZED USE IS PROHIBITED", w/2, h - 35);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    return tex;
  }, [photoTex, name]);

  const backTexture = useMemo(() => {
    const w = 1024;
    const h = 1382;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // Magnetic Stripe (slight sheen)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 100, w, 180);

    // Legal Warning (Lightened for readability)
    const pad = 80;
    ctx.fillStyle = '#a3a3a3'; // Lightened gray
    ctx.font = '24px monospace';
    ctx.textAlign = 'left';
    const warning = [
      "NOTICE: This credential remains the property of YUE-OS.",
      "If found, please return to the nearest security office.",
      "Any unauthorized attempt to use or replicate this badge",
      "will be detected and responded to by active counter-measures.",
      "",
      "RED TEAM OPERATIVE // CLASSIFIED ACCESS LEVEL 5",
      "SUBJECT ID: 0x" + Math.random().toString(16).slice(2, 10).toUpperCase()
    ];
    warning.forEach((line, i) => {
      ctx.fillText(line, pad, 350 + (i * 40));
    });

    // Barcode Placeholder
    ctx.fillStyle = '#ffffff';
    for(let i=0; i<40; i++) {
      const bw = Math.random() * 20 + 2;
      ctx.fillRect(pad + (i * 22), h - 300, bw, 150);
    }

    // "RESTRICTED" watermark
    ctx.save();
    ctx.translate(w/2, h/2 + 200);
    ctx.rotate(-Math.PI / 4);
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 150px monospace';
    ctx.textAlign = 'center';
    ctx.fillText("RESTRICTED", 0, 0);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    return tex;
  }, []);

  const timer = useMemo(() => new (THREE as any).Timer(), []);

  useFrame((state, delta) => {
    if (!cardRigRef.current || !laceRef.current) return;

    const dt = Math.min(delta, 1 / 30);
    timer.update();
    const elapsed = timer.getElapsed();

    const bobPos = bobPosRef.current;
    const bobVel = bobVelRef.current;

    if (draggingRef.current) {
      const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 0]);
      // pointer is -1 to 1, map to viewport
      const pointerTarget = new THREE.Vector3(
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        0
      );

      dragTargetRef.current.lerp(pointerTarget, 0.4);
      const toTarget = dragTargetRef.current.clone().sub(bobPos).multiplyScalar(50);
      bobVel.addScaledVector(toTarget, dt);
      bobVel.multiplyScalar(0.72);
    } else {
      bobVel.y -= 9.81 * dt;
      bobVel.multiplyScalar(Math.exp(-1.8 * dt));

      const rope = bobPos.clone().sub(responsiveAnchor);
      const ropeLength = Math.max(rope.length(), 0.0001);
      const ropeDir = rope.multiplyScalar(1 / ropeLength);
      const restLength = 1.05;
      const extension = ropeLength - restLength;
      
      const springK = extension > 0 ? (60 + extension * 45) : 15;
      const damping = 8.5;
      
      const velAlongRope = bobVel.dot(ropeDir);
      const springForce = (-springK * extension) - (damping * velAlongRope);
      bobVel.addScaledVector(ropeDir, springForce * dt);

      bobVel.x += Math.sin(elapsed * 1.5) * dt * 0.15;
      bobVel.z += Math.cos(elapsed * 1.8) * dt * 0.1;
    }

    bobPos.addScaledVector(bobVel, dt);

    // Keep Y in viewport range
    bobPos.y = Math.min(bobPos.y, 4.0);

    cardRigRef.current.position.copy(bobPos);
    cardRigRef.current.scale.setScalar(derivedScale);

    const ropeDirForTilt = bobPos.clone().sub(responsiveAnchor).normalize();
    const targetTiltZ = -ropeDirForTilt.x * 1.2 + bobVel.x * 0.15;
    const targetTiltX = ropeDirForTilt.y * 0.2 + bobVel.y * 0.05 + (draggingRef.current ? 0.4 : 0);
    const targetTiltY = bobVel.x * 0.1 + (draggingRef.current ? state.pointer.x * 1.2 : 0);

    cardRigRef.current.rotation.z = THREE.MathUtils.lerp(cardRigRef.current.rotation.z, targetTiltZ, 0.2);
    cardRigRef.current.rotation.x = THREE.MathUtils.lerp(cardRigRef.current.rotation.x, targetTiltX, 0.15);
    cardRigRef.current.rotation.y = THREE.MathUtils.lerp(cardRigRef.current.rotation.y, targetTiltY, 0.15);

    // Accurate lace attachment using the card's world matrix
    // This correctly handles scaling and rotation without double-counting the scale
    const cardTopWorld = localTop.clone().applyMatrix4(cardRigRef.current.matrixWorld);
    const laceVector = cardTopWorld.clone().sub(responsiveAnchor);
    const laceLength = Math.max(laceVector.length(), 0.0001);
    const laceDirection = laceVector.clone().multiplyScalar(1 / laceLength);
    const laceMidpoint = responsiveAnchor.clone().addScaledVector(laceDirection, laceLength * 0.5);

    laceRef.current.position.copy(laceMidpoint);
    laceRef.current.quaternion.setFromUnitVectors(UP_AXIS, laceDirection);

    const stretchRatio = laceLength / 1.05;
    const thickness = Math.max(0.3, 1 / Math.pow(stretchRatio, 0.5));
    laceRef.current.scale.set(thickness, laceLength, thickness);
  });

  return (
    <group>
      <mesh position={responsiveAnchor.toArray() as any} castShadow frustumCulled={false}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#b3c0d1" metalness={0.85} roughness={0.2} />
      </mesh>

      <mesh ref={laceRef} castShadow frustumCulled={false}>
        <cylinderGeometry args={[0.016, 0.012, 1, 18]} />
        <meshStandardMaterial color="#2d3748" roughness={0.55} />
      </mesh>

      <group ref={cardRigRef}>
        <group position={[0, -0.82, 0]}>
          <RoundedBox args={[1.08, 1.42, 0.055]} radius={0.06} smoothness={8} castShadow receiveShadow frustumCulled={false}>
            <meshStandardMaterial color="#171717" roughness={0.4} metalness={0.2} />
          </RoundedBox>

          <mesh position={[0, 0.52, 0.032]} castShadow frustumCulled={false}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
            <meshStandardMaterial color="#101626" roughness={0.45} />
          </mesh>

          <mesh position={[0, 0.52, 0.04]} frustumCulled={false}>
            <torusGeometry args={[0.09, 0.015, 16, 30]} />
            <meshStandardMaterial color="#c7d4eb" metalness={0.9} roughness={0.2} />
          </mesh>

          <mesh position={[0, -0.04, 0.073]} onPointerDown={onCardPointerDown} onPointerUp={onCardPointerUp} frustumCulled={false}>
            <boxGeometry args={[1.14, 1.66, 0.18]} />
            <meshStandardMaterial color="#000000" transparent opacity={0} depthWrite={false} />
          </mesh>

          {frontTexture && (
            <mesh 
              key={`${name}-front`}
              position={[0, 0, 0.05]} 
              rotation={[0, 0, 0]} 
              frustumCulled={false}
            >
              <planeGeometry args={[1.02, 1.38]} />
              <meshStandardMaterial 
                map={frontTexture} 
                transparent={true} 
                roughness={0.2} 
                metalness={0.1}
              />
            </mesh>
          )}

          {backTexture && (
            <mesh 
              key={`${name}-back`}
              position={[0, 0, -0.05]} 
              rotation={[0, Math.PI, 0]} 
              frustumCulled={false}
            >
              <planeGeometry args={[1.02, 1.38]} />
              <meshStandardMaterial 
                map={backTexture} 
                transparent={true} 
                roughness={0.2} 
                metalness={0.1}
              />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
};

const HangingID3D: React.FC<{ scale?: number }> = ({ scale }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows
      style={{ pointerEvents: 'auto' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.72} />
        <directionalLight
          castShadow
          position={[2.3, 3.2, 3]}
          intensity={1.18}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Back-side lighting for the reverse face */}
        <pointLight position={[0, 0, -5]} intensity={0.8} color="#ffffff" />
        <spotLight position={[-1.8, 2.4, 2.8]} intensity={0.55} angle={0.45} penumbra={0.6} />
        <HangingIDModel scale={scale} />
      </Suspense>
    </Canvas>
  );
};

export default HangingID3D;