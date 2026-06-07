# Spirit-Eye Skull Background Design

## Overview
Transform the current skull background into a "Calm and Ghostly" experience featuring a dark silhouette skull with piercing blue glowing eyes that track the user's mouse with a spectral, liquid delay.

## Goals
- Enhance the visual "coolness" of the portfolio.
- Maintain high performance (60fps) by optimizing lighting and particles.
- Create a reactive, immersive experience.

## Visual Design
- **Color Palette:** Deep blacks (`#010208`), Cyan (`#22d3ee`), and Dark Blue (`#00f2ff`).
- **Atmosphere:** Near-zero ambient light, making the skull a silhouette.
- **Spirit Eyes:**
    - Two `pointLight` sources inside the eye sockets.
    - Subtle "breathing" flicker (0.1Hz pulse).
    - Small emissive spheres (blooming) as pupils.

## Interaction
- **Delayed Mouse Tracking:** The skull uses a `lerp` function with a low coefficient (e.g., `0.05`) to drift toward the mouse pointer.
- **Gaze Intensity:** Eye light intensity increases by 20% when the skull is facing the cursor.
- **Scroll Response:** The skull continues its current scroll-based movement path but with improved smoothing.

## Technical Implementation
- **Component:** `SkullBackground.tsx`.
- **Lighting Optimization:**
    - Remove `directionalLight` and `spotLight`.
    - Keep `ambientLight` at `0.1`.
    - Add two `pointLight` components inside the `MovingSkull` group.
- **Model:** No changes to the `.obj` file, but we will adjust material properties in code (traversal) to make it more matte and dark.
- **Particles:**
    - Update `Stars` and `Sparkles` to use cyan/blue tints.
    - Reduce `NeuralWeb` point count if needed for mobile.

## Verification
- Confirm 60fps on desktop.
- Verify mouse tracking is "liquid" and not jittery.
- Check visibility of eye glow in both high and low screen brightness.
