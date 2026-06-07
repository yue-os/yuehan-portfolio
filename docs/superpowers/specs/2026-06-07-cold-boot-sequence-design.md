# Cold Boot Sequence Design

## Overview
Implement a high-fidelity "Encrypted Hacker" boot sequence that plays when a user first visits the portfolio. The sequence will feature scrambling text that resolves into a system access granted message, followed by a CRT-style flash reveal of the main website. 

## Goals
- Immerse the user immediately in the "Tactical OS" theme.
- Provide a visually striking loading state before the main 3D canvas is revealed.
- Ensure the animation only plays once per session to respect user time.

## Visual Design
- **Phase 1: Encryption (0s - 1.5s)**
    - Background: Deep black (`#010208`).
    - Text: Neon green (`#10b981`), monospace.
    - Content: Random, rapidly changing hexadecimal codes and symbols.
- **Phase 2: Resolution (1.5s - 2.5s)**
    - Text color snaps to Cyan (`#22d3ee`).
    - Content resolves to:
      `> SYSTEM: TACTICAL_OS_V2.4`
      `> STATUS: ONLINE`
      `> USER: YUEHAN`
      `> ACCESS: GRANTED`
- **Phase 3: The Flash (2.5s - 3.0s)**
    - Screen flashes white (`#ffffff`) for a split second, then fades out to reveal the site.

## User Interaction
- **Session Storage:** A flag (`hasBooted`) will be checked on mount. If present, the boot sequence is skipped instantly.
- The user cannot interact with the underlying site until the sequence completes.

## Technical Implementation
- **Component:** Create `components/BootSequence.tsx`.
- **Integration:** Mount at the top level of `App.tsx`, wrapping or overlaying the main content.
- **Animation Logic:** 
    - Use `requestAnimationFrame` or `setInterval` for the text scrambling effect to ensure high performance.
    - Use CSS keyframes for the final flash and fade-out.
- **State Management:** Use a `isBooting` state in `App.tsx` to conditionally render the sequence or hide the main content until ready.

## Verification
- Verify the sequence takes exactly 3 seconds.
- Confirm the text scrambling is performant and doesn't cause layout thrashing.
- Verify that refreshing the page skips the sequence (session storage works).
