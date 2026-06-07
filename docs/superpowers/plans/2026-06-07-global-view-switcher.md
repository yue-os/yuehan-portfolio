# Global View Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a global mode switcher to toggle between "Arsenal" (Projects) and "Logs" (Experience), shortening the landing page and providing a full atmosphere shift.

**Architecture:** 
- Lift `viewMode` state to `App.tsx`.
- Conditionally render `Projects` and `Experience` in a shared main slot.
- Pass `viewMode` to `SkullBackground` for dynamic eye color and pulse rate updates.
- Use a 300ms CSS glitch animation during mode transitions.

**Tech Stack:** React, Three.js, Tailwind CSS

---

### Task 1: Core State and Conditional Layout in App.tsx

**Files:**
- Modify: `App.tsx`

- [ ] **Step 1: Define `ViewMode` type and lift state**

```typescript
type ViewMode = 'arsenal' | 'logs';

// Inside App component:
const [viewMode, setViewMode] = useState<ViewMode>('arsenal');
const [isGlitching, setIsGlitching] = useState(false);

const handleModeChange = (mode: ViewMode) => {
  if (mode === viewMode) return;
  setIsGlitching(true);
  setTimeout(() => {
    setViewMode(mode);
    setIsGlitching(false);
  }, 300);
};
```

- [ ] **Step 2: Update main rendering logic**

```tsx
<main className={`relative z-10 ${isGlitching ? 'glitch-active' : ''}`}>
  <Hero />
  <Stats />
  <Services />
  {viewMode === 'logs' ? <Experience /> : <Projects />}
  <TechStack />
</main>
```

- [ ] **Step 3: Commit**

```bash
git add App.tsx
git commit -m "feat: add global viewMode state and conditional layout"
```

### Task 2: Atmosphere Shift in SkullBackground

**Files:**
- Modify: `components/SkullBackground.tsx`

- [ ] **Step 1: Update components to accept `mode` prop**

```typescript
const MovingSkull: React.FC<{ scale: number; mode: 'arsenal' | 'logs' }> = ({ scale, mode }) => {
  const eyeColor = mode === 'arsenal' ? '#22d3ee' : '#3b82f6';
  const pulseSpeed = mode === 'arsenal' ? 2 : 1; // 2Hz vs 1Hz for calm
  
  // Update pointLight and mesh colors/refs in useFrame
  const eyePulse = 1.5 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.5;
};
```

- [ ] **Step 2: Pass prop from `SkullBackground` to `MovingSkull`**

- [ ] **Step 3: Commit**

```bash
git add components/SkullBackground.tsx
git commit -m "feat: implement atmosphere shift in SkullBackground"
```

### Task 3: Navbar Integration and Mode Selector

**Files:**
- Modify: `components/Navbar.tsx`
- Create: `components/ViewModeSelector.tsx`

- [ ] **Step 1: Update Navbar to handle mode switching**

```typescript
// Add onModeChange prop to Navbar
// Update 'Arsenal' and 'Experience' links to call onModeChange
```

- [ ] **Step 2: Create `ViewModeSelector.tsx`**

```tsx
// Floating bottom toggle bar with [ARSENAL] and [LOGS] buttons
// Style with glass-morphism and cyan highlights
```

- [ ] **Step 3: Add `ViewModeSelector` to `App.tsx`**

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx components/ViewModeSelector.tsx App.tsx
git commit -m "feat: add ViewModeSelector and integrate with Navbar"
```

### Task 4: Cyber-Glitch Transition Effect

**Files:**
- Modify: `index.css`

- [ ] **Step 1: Add glitch animation keyframes**

```css
@keyframes cyber-glitch {
  0% { transform: translate(2px, 0); opacity: 0.8; }
  50% { transform: translate(-2px, 0); opacity: 0.5; }
  100% { transform: translate(0, 0); opacity: 1; }
}
.glitch-active {
  animation: cyber-glitch 0.1s steps(2) infinite;
}
```

- [ ] **Step 2: Commit**

```bash
git add index.css
git commit -m "style: add cyber-glitch transition animation"
```
