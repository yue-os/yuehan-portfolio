# Responsive ID Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the 3D ID badge visible and correctly positioned on all screen sizes, especially mobile.

**Architecture:** Use the `useThree` hook from `@react-three/fiber` to dynamically calculate the anchor point and initial position of the ID badge based on the viewport width.

**Tech Stack:** React, Three.js, @react-three/fiber, Tailwind CSS.

---

### Task 1: Refactor `HangingID3D.tsx` for Responsive Positioning

**Files:**
- Modify: `components/HangingID3D.tsx`

- [ ] **Step 1: Move `ANCHOR` inside `HangingIDModel` and use `useThree`**

```tsx
// Inside HangingIDModel component
const { viewport } = useThree();

const responsiveAnchor = useMemo(() => {
  // On desktop (viewport.width > 7), use 2.8. 
  // On mobile, position it relative to the right edge.
  const xPos = viewport.width > 7 ? 2.8 : (viewport.width / 2 - 0.6);
  return new THREE.Vector3(xPos, 3.2, 0);
}, [viewport.width]);

// Update initial bobPosRef to match the new anchor logic
const bobPosRef = useRef(new THREE.Vector3(viewport.width > 7 ? -2.8 : 0, 2.1, 0));
```

- [ ] **Step 2: Update `useFrame` to use `responsiveAnchor` instead of static `ANCHOR`**

```tsx
// Update all occurrences of ANCHOR to responsiveAnchor inside useFrame
const rope = bobPos.clone().sub(responsiveAnchor);
// ...
const cardTopWorld = localTop.clone().applyMatrix4(cardRigRef.current.matrixWorld);
const laceVector = cardTopWorld.clone().sub(responsiveAnchor);
// ...
laceRef.current.position.copy(responsiveAnchor.clone().addScaledVector(laceDirection, laceLength * 0.5));
```

- [ ] **Step 3: Update return JSX to use `responsiveAnchor`**

```tsx
<mesh position={responsiveAnchor.toArray() as any} castShadow frustumCulled={false}>
```

- [ ] **Step 4: Commit changes**

```bash
git add components/HangingID3D.tsx
git commit -m "feat: make ID badge anchor position responsive"
```

---

### Task 2: Implement Reactive Scaling in `HangingID3D.tsx`

**Files:**
- Modify: `components/HangingID3D.tsx`
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Move scaling logic into `HangingIDModel`**

In `components/HangingID3D.tsx`, calculate a `derivedScale` based on `viewport.width` and the passed `scale` prop.

```tsx
const derivedScale = useMemo(() => {
  const baseScale = scale || 0.9;
  // If viewport is narrow, reduce scale further
  if (viewport.width < 5) return baseScale * 0.55; 
  if (viewport.width < 7) return baseScale * 0.8;
  return baseScale;
}, [viewport.width, scale]);
```

- [ ] **Step 2: Use `derivedScale` in `useFrame`**

```tsx
cardRigRef.current.scale.setScalar(derivedScale);
```

- [ ] **Step 3: Simplify `Hero.tsx` usage**

Remove the `window.innerWidth` check and just pass the base scale or nothing.

```tsx
<HangingID3D />
```

- [ ] **Step 4: Commit changes**

```bash
git add components/HangingID3D.tsx components/Hero.tsx
git commit -m "fix: make ID badge scale reactive and smaller on mobile"
```

---

### Task 3: Verification

- [ ] **Step 1: Manual verification on desktop**
- [ ] **Step 2: Manual verification on mobile simulation (Chrome DevTools)**
- [ ] **Step 3: Final commit and cleanup**
