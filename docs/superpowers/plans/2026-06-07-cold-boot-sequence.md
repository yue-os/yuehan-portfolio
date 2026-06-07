# Cold Boot Sequence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a 3-second "Encrypted Hacker" boot sequence that runs once per session before revealing the main portfolio.

**Architecture:** 
- Create a `BootSequence` React component that handles the text scrambling logic using a high-frequency `useEffect` interval.
- Use a state machine in `BootSequence` to manage the three phases: Scramble, Resolve, and Flash.
- Manage global boot state (`isBooting`) in `App.tsx` and use `sessionStorage` to ensure it only plays once per session.
- Hide the main content until `isBooting` is false.

**Tech Stack:** React, Tailwind CSS

---

### Task 1: Scramble Logic and CSS Setup

**Files:**
- Modify: `index.css`
- Create: `components/BootSequence.tsx`

- [ ] **Step 1: Add flash animation to `index.css`**

```css
@keyframes crt-flash {
  0% { background-color: #ffffff; opacity: 1; }
  100% { background-color: transparent; opacity: 0; }
}

.animate-crt-flash {
  animation: crt-flash 0.5s ease-out forwards;
}
```

- [ ] **Step 2: Create the basic `BootSequence` component structure with scramble logic**

```tsx
// components/BootSequence.tsx
import React, { useState, useEffect } from 'react';

const FINAL_TEXT = [
  "> SYSTEM: TACTICAL_OS_V2.4",
  "> STATUS: ONLINE",
  "> USER: YUEHAN",
  "> ACCESS: GRANTED"
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'scramble' | 'resolve' | 'flash'>('scramble');
  const [displayText, setDisplayText] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (phase === 'scramble') {
      interval = setInterval(() => {
        setDisplayText(FINAL_TEXT.map(line => 
          line.split('').map(char => char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
        ));
      }, 50);

      setTimeout(() => setPhase('resolve'), 1500);
    } else if (phase === 'resolve') {
      setDisplayText(FINAL_TEXT);
      setTimeout(() => setPhase('flash'), 1000); // 2.5s total
    } else if (phase === 'flash') {
      setTimeout(onComplete, 500); // 3.0s total
    }

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  if (phase === 'flash') {
    return <div className="fixed inset-0 z-[100] bg-white animate-crt-flash pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#010208] flex items-center justify-center font-mono p-8">
      <div className="max-w-2xl w-full">
        {displayText.map((line, i) => (
          <div key={i} className={`text-xl md:text-2xl tracking-widest font-black mb-2 ${phase === 'scramble' ? 'text-emerald-500' : 'text-cyan-400'}`}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootSequence;
```

- [ ] **Step 3: Commit**

```bash
git add index.css components/BootSequence.tsx
git commit -m "feat: implement BootSequence component with scramble and flash animations"
```

### Task 2: Integration into App.tsx

**Files:**
- Modify: `App.tsx`

- [ ] **Step 1: Implement session storage logic in App.tsx**

```tsx
// Inside App component, before other hooks:
const [isBooting, setIsBooting] = useState(() => {
  if (typeof window !== 'undefined') {
    const hasBooted = sessionStorage.getItem('hasBooted');
    return !hasBooted;
  }
  return true;
});

const handleBootComplete = () => {
  sessionStorage.setItem('hasBooted', 'true');
  setIsBooting(false);
};
```

- [ ] **Step 2: Conditionally render the boot sequence and hide main content**

```tsx
// At the top of the return block in App.tsx:
return (
  <div className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30 selection:text-cyan-200">
    {isBooting && <BootSequence onComplete={handleBootComplete} />}
    
    <div style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
      {/* Sidebar HUD Interface */}
      {/* ... rest of the existing App components (SkullBackground, Navbar, main, Footer, etc) */}
    </div>
  </div>
);
```
*Note: Make sure to import `BootSequence`.*

- [ ] **Step 3: Verify build and performance**

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: integrate BootSequence into App root and manage session state"
```
