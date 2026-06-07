# 3D Neural Tech Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static Tech Stack grid with an interactive 3D constellation using Three.js.

**Architecture:** 
- Create a new `TechWeb` 3D component that renders nodes (technologies) and synapses (connections) in a local `<Canvas />`.
- Each category from `TECH_STACK` will form a spatial cluster.
- Use `OrbitControls` (limited) for rotation and `Text` from `@react-three/drei` for billboarded labels.

**Tech Stack:** React, Three.js, @react-three/fiber, @react-three/drei

---

### Task 1: 3D Node and Connection Infrastructure

**Files:**
- Create: `components/TechWeb.tsx`
- Modify: `components/TechStack.tsx`

- [ ] **Step 1: Define data mapping and spatial clusters**

```typescript
// Map TECH_STACK to 3D positions
// Languages: Center/Top
// Frameworks: Right
// Engines: Left
// Cybersecurity: Bottom
```

- [ ] **Step 2: Implement the `TechWeb` skeleton with Canvas and OrbitControls**

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';

const TechNode = ({ position, name, icon }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
    </mesh>
    <Text position={[0, 0.4, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
      {name}
    </Text>
  </group>
);

export const TechWeb = () => (
  <div className="h-[500px] w-full border border-white/10 bg-black/20 cyber-corners relative">
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* Map nodes here */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  </div>
);
```

- [ ] **Step 3: Integrate `TechWeb` into `TechStack.tsx`**

- [ ] **Step 4: Commit**

```bash
git add components/TechWeb.tsx components/TechStack.tsx
git commit -m "feat: implement 3D node infrastructure for Tech Stack"
```

### Task 2: Synapses and Connections

**Files:**
- Modify: `components/TechWeb.tsx`

- [ ] **Step 1: Define connection logic between nodes**

- [ ] **Step 2: Render glowing lines using `BufferGeometry` or `Line` component**

```tsx
// For each connection:
<Line 
  points={[startPos, endPos]} 
  color="#22d3ee" 
  lineWidth={0.5} 
  transparent 
  opacity={0.2} 
/>
```

- [ ] **Step 3: Commit**

```bash
git add components/TechWeb.tsx
git commit -m "feat: add glowing synapses between tech nodes"
```

### Task 4: Interactive Hover and Refined Aesthetic

**Files:**
- Modify: `components/TechWeb.tsx`

- [ ] **Step 1: Implement hover detection for nodes**

- [ ] **Step 2: Update node and line colors on hover**

```typescript
const [hovered, setHovered] = useState(false);
// On hover: emissiveIntensity = 5, line opacity = 0.8
```

- [ ] **Step 3: Add subtle background particles to the canvas**

- [ ] **Step 4: Commit**

```bash
git add components/TechWeb.tsx
git commit -m "feat: finalize 3D Tech Web with hover interactions and particles"
```
