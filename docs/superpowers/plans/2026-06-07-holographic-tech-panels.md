# Holographic Tech Data Panels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement high-fidelity holographic data panels that appear on hover over tech nodes in the 3D Neural Tech Web.

**Architecture:** 
- Enhance the `TechNode` component to conditionally render either a simple label or a detailed `Html` panel.
- Use Tailwind CSS for the panel's "Tactical HUD" aesthetic.
- Determine "Mastery Levels" based on the tech category.
- Implement CSS-based expansion and scanline animations.

**Tech Stack:** React, Three.js, @react-three/drei (Html), Tailwind CSS

---

### Task 1: CSS Animations and Panel Styling

**Files:**
- Modify: `index.css`

- [ ] **Step 1: Add scanline and panel expansion animations**

```css
@keyframes panel-expand {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes panel-scanline {
  0% { top: -10%; }
  100% { top: 110%; }
}

.hologram-panel {
  animation: panel-expand 0.2s ease-out forwards;
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
}

.hologram-scanline {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(34, 211, 238, 0.5);
  box-shadow: 0 0 10px #22d3ee;
  animation: panel-scanline 2s linear infinite;
  pointer-events: none;
}
```

- [ ] **Step 2: Commit**

```bash
git add index.css
git commit -m "style: add animations and base styles for holographic panels"
```

### Task 2: Data Mapping and TechNode Expansion

**Files:**
- Modify: `components/TechWeb.tsx`

- [ ] **Step 1: Define Mastery Level mapping**

```typescript
const MASTERY_LEVELS: Record<string, string> = {
  "Languages": "MASTERED",
  "Frameworks": "EXPERT",
  "Engines & Tools": "ADVANCED",
  "Cybersecurity": "OPERATIONAL",
};
```

- [ ] **Step 2: Refactor `TechNode` to include the Holographic Panel**

```tsx
// Inside TechNode component:
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
        > Status: System_Active<br />
        > Priority: High<br />
        > Neural_Sync: 98%
      </div>
    </div>
  </Html>
) : (
  <Html distanceFactor={10} position={[0, -0.6, 0]} center pointerEvents="none">
    {/* Current simple label */}
  </Html>
)}
```

- [ ] **Step 3: Commit**

```bash
git add components/TechWeb.tsx
git commit -m "feat: implement holographic data panel on node hover"
```

### Task 3: Visual Polish and Verification

**Files:**
- Modify: `components/TechWeb.tsx`

- [ ] **Step 1: Add category prop to `TechNode` to correctly display mastery level**

- [ ] **Step 2: Add high-contrast white pulsing for the node when hovered**

- [ ] **Step 3: Verify build and performance**

- [ ] **Step 4: Commit**

```bash
git add components/TechWeb.tsx
git commit -m "feat: finalize holographic panels with mastery levels and polish"
```
