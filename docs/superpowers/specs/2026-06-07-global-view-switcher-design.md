# Global View Switcher Design

## Overview
Implement a global state-driven navigation system that allows the user to toggle between "Arsenal" (Projects) and "Logs" (Experience) modes. This system will significantly reduce the landing page's length by rendering these sections in a shared viewport slot and will provide a high-fidelity "Full Atmosphere Shift" using cyber-glitch transitions.

## Goals
- Shorten the landing page by multiplexing the main content area.
- Enhance the "Tactical OS" theme with a global mode-switching mechanic.
- Provide clear visual feedback through atmosphere (color/lighting) shifts.

## Visual Design
- **Mode Selector:**
    - Position: `fixed bottom-10 left-1/2 -translate-x-1/2`.
    - Style: Glass-morphism bar with `backdrop-blur-md` and a cyan border.
    - Labels: `[ARSENAL]` and `[LOGS]`.
- **Atmosphere Shift:**
    - **Arsenal (Default):** Cyan theme (`#22d3ee`). Skull eyes pulse at 0.5Hz.
    - **Logs (Experience):** Deep blue theme (`#3b82f6`). Skull eyes pulse at 0.2Hz (calm).
- **Transition:**
    - "Cyber Glitch" effect: 300ms of jitter, chromatic aberration, and opacity flicker.

## User Interaction
- Clicking a mode button triggers the atmosphere shift and content swap.
- Navbar links ("Arsenal" and "Experience") will now act as mode switches rather than anchor jumps.

## Technical Implementation
- **State Management:** Lift `viewMode` state to `App.tsx`.
- **Conditional Rendering:** Use a container in `App.tsx` that renders either `<Projects />` or `<Experience />` based on `viewMode`.
- **Component Updates:**
    - `SkullBackground`: Update to accept a `color` or `mode` prop for dynamic lighting updates.
    - `Navbar`: Update links to trigger the mode change.
- **New Component:** `ViewModeSelector.tsx` for the bottom floating toggle.

## Verification
- Confirm that toggling modes correctly swaps content without layout jumps.
- Verify that the background atmosphere (skull eyes, etc.) updates smoothly.
- Ensure the "Cyber Glitch" animation is performant (uses `will-change: transform`).
