# Atmosphere Shift in SkullBackground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `SkullBackground.tsx` and its internal components to reflect the current `viewMode` (Arsenal vs. Logs) through color changes and animation speed adjustments.

**Architecture:** Pass the `mode` prop from `App` down to `SkullBackground`, then to `MovingSkull` and its sub-components (`NeuralWeb`, `Sparkles`, and the eyes). Use conditional logic to determine colors and pulse speeds.

**Tech Stack:** React, Three.js, React Three Fiber, React Three Drei.

---

### Task 1: Update Types and Component Props

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Import `ViewMode` and update `SkullBackground` props**

```typescript
import { ViewMode } from '../types';

interface SkullBackgroundProps {
  scale?: number;
  mode?: ViewMode;
}

const SkullBackground: React.FC<SkullBackgroundProps> = ({ scale = 0.50, mode = 'arsenal' }) => {
  // ...
};
```

- [ ] **Step 2: Update `MovingSkull` props**

```typescript
const MovingSkull: React.FC<{ scale: number; mode: ViewMode }> = ({ scale, mode }) => {
  // ...
};
```

- [ ] **Step 3: Update `NeuralWeb` props**

```typescript
const NeuralWeb: React.FC<{ mode: ViewMode }> = ({ mode }) => {
  // ...
};
```

### Task 2: Implement Atmosphere Shift in `MovingSkull`

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Update eye colors and pulse speed in `MovingSkull`**

```typescript
const eyeColor = mode === 'arsenal' ? '#22d3ee' : '#3b82f6';
const pulseSpeed = mode === 'arsenal' ? 2 : 1;
```

- [ ] **Step 2: Update `useFrame` pulse logic**

```typescript
useFrame((state) => {
  const elapsed = state.clock.getElapsedTime();
  const eyePulse = 1.5 + Math.sin(elapsed * pulseSpeed) * 0.5;
  // ...
});
```

- [ ] **Step 3: Apply `eyeColor` to meshes and lights**

```typescript
<meshStandardMaterial 
  emissive={eyeColor} 
  emissiveIntensity={2} 
  color={eyeColor}
  transparent
  opacity={0.8}
/>
<pointLight ref={leftEyeLightRef} intensity={1.5} distance={3} color={eyeColor} />
```

### Task 3: Implement Atmosphere Shift in `NeuralWeb` and `Sparkles`

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Update `NeuralWeb` color**

```typescript
const webColor = mode === 'arsenal' ? '#22d3ee' : '#3b82f6';
// ...
<PointMaterial
  transparent
  color={webColor}
  // ...
/>
```

- [ ] **Step 2: Update `Sparkles` color in `MovingSkull`**

```typescript
<Sparkles count={15} scale={15} size={1} speed={0.1} color={eyeColor} opacity={0.2} />
```

### Task 4: Final Integration and Verification

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Pass `mode` prop through all components**

```typescript
// Inside SkullBackground
<MovingSkull scale={scale} mode={mode} />

// Inside MovingSkull
<NeuralWeb mode={mode} />
```

- [ ] **Step 2: Verify build and types**

Run: `yarn tsc` or `npm run build` (if applicable)

- [ ] **Step 3: Commit**

```bash
git add components/SkullBackground.tsx
git commit -m "feat: implement atmosphere shift in SkullBackground"
```
