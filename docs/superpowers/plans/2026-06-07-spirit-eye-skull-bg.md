# Spirit-Eye Skull Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the skull background into a ghostly silhouette with pulsing blue eyes and liquid mouse tracking.

**Architecture:** 
- Reduce ambient lighting to create a silhouette effect.
- Add local `pointLight` sources and emissive spheres inside the eye sockets of the skull model.
- Implement a lerp-based smoothing system for mouse following to create a "liquid" feel.
- Optimize existing particles and lighting for performance.

**Tech Stack:** React, Three.js, @react-three/fiber, @react-three/drei

---

### Task 1: Atmosphere and Silhouette Optimization

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Reduce ambient light and remove high-intensity lights**

```typescript
// Inside SkullBackground component
<ambientLight intensity={0.1} /> // Reduced from 0.4
// Remove directionalLight, pointLight (global), and spotLight
```

- [ ] **Step 2: Darken the skull material**

```typescript
// Inside MovingSkull component, update the traverse effect
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
```

- [ ] **Step 3: Update Stars and Fog for ghostly vibe**

```typescript
<fog attach="fog" args={['#010208', 5, 25]} />
<Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} color="#22d3ee" />
```

- [ ] **Step 4: Commit**

```bash
git add components/SkullBackground.tsx
git commit -m "style: darken atmosphere and skull for silhouette effect"
```

### Task 2: Spirit Eyes Implementation

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Add PointLights and Emissive Spheres to eye sockets**

```typescript
// Inside MovingSkull return, inside the skullRef group
<group ref={skullRef} scale={scale} rotation={[0, Math.PI, 0]}>
  <primitive object={skullModel} />
  
  {/* Left Eye */}
  <mesh position={[-0.35, 0.4, 0.5]}>
    <sphereGeometry args={[0.08, 16, 16]} />
    <meshStandardMaterial 
      emissive="#22d3ee" 
      emissiveIntensity={2} 
      color="#22d3ee"
      transparent
      opacity={0.8}
    />
    <pointLight intensity={1.5} distance={3} color="#22d3ee" />
  </mesh>

  {/* Right Eye */}
  <mesh position={[0.35, 0.4, 0.5]}>
    <sphereGeometry args={[0.08, 16, 16]} />
    <meshStandardMaterial 
      emissive="#22d3ee" 
      emissiveIntensity={2} 
      color="#22d3ee"
      transparent
      opacity={0.8}
    />
    <pointLight intensity={1.5} distance={3} color="#22d3ee" />
  </mesh>
</group>
```

- [ ] **Step 2: Implement "Breathing" flicker for eyes**

```typescript
// In MovingSkull useFrame
const eyePulse = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
// Update eye light intensities (need refs or find by name)
```

- [ ] **Step 3: Commit**

```bash
git add components/SkullBackground.tsx
git commit -m "feat: add glowing spirit eyes with pulse effect"
```

### Task 3: Liquid Mouse Tracking and Gaze Intensity

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Implement Lerp for position and rotation**

```typescript
// In MovingSkull useFrame
const lerpFactor = 0.05;
const targetX = (state.pointer.x * viewport.width) / 14;
const targetY = (state.pointer.y * viewport.height) / 14;

// Update positions using lerp instead of direct assignment
skullRef.current.position.x = THREE.MathUtils.lerp(skullRef.current.position.x, calculatedX + targetX, lerpFactor);
skullRef.current.position.y = THREE.MathUtils.lerp(skullRef.current.position.y, calculatedY + targetY, lerpFactor);
```

- [ ] **Step 2: Smooth Gaze tracking**

```typescript
const targetPos = new THREE.Vector3().copy(state.camera.position);
targetPos.x += state.pointer.x * 2;
targetPos.y += state.pointer.y * 2;

const currentLookAt = new THREE.Vector3();
skullRef.current.getWorldDirection(currentLookAt);
// Use a proxy object or smooth lookAt
```

- [ ] **Step 3: Commit**

```bash
git add components/SkullBackground.tsx
git commit -m "feat: implement liquid mouse tracking and gaze smoothing"
```

### Task 4: Final Polishing and Particle Optimization

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Update Sparkles to Cyan/Blue**

```typescript
<Sparkles count={15} scale={15} size={1} speed={0.1} color="#22d3ee" opacity={0.2} />
```

- [ ] **Step 2: Verify performance and visibility**

- [ ] **Step 3: Commit**

```bash
git add components/SkullBackground.tsx
git commit -m "perf: optimize particles and finalize ghostly aesthetic"
```
