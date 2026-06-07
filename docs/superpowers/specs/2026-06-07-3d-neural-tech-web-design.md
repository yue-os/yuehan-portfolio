# 3D Neural Tech Web Design

## Overview
Replace the static grid in the Technical Inventory section with a fully interactive 3D constellation of technology nodes. This "Neural Tech Web" will visually represent the interconnected nature of the user's skills using Three.js, allowing users to rotate, hover, and explore the tech stack in an immersive 3D space.

## Goals
- Create a high-fidelity, interactive "wow" factor for the Tech Stack section.
- Visually demonstrate skill interconnections.
- Maintain 60fps performance through optimized 3D rendering.

## Visual Design
- **Nodes (Data Points):**
    - Each technology is a small, glowing cyan cube or sphere.
    - Floating text labels (billboarded to face the camera) identify each tech.
- **Synapses (Connections):**
    - Thin, glowing cyan lines connecting related technologies.
    - Highlighting: When a node is hovered, its connected lines and neighbors brighten.
- **Environment:**
    - Transparent background to sit on top of the global `SkullBackground`.
    - Subtle particle "dust" within the constellation area.

## User Interaction
- **Orbital Control:** Users can click and drag to rotate the constellation.
- **Hover Effects:** Nodes pulse and labels grow slightly on hover.
- **Auto-Orbit:** The web slowly rotates on its own when idle.
- **Responsiveness:** On mobile, the web is smaller and easier to navigate with touch.

## Technical Implementation
- **Component:** Refactor `TechStack.tsx` to include a local `<Canvas />`.
- **Optimization:**
    - Use `InstancedMesh` for nodes.
    - Use `BufferGeometry` for the connection lines.
    - Implement `useFrame` for smooth rotation and hover transitions.
- **Data Structure:**
    - Map `TECH_STACK` categories to 3D coordinate clusters.
    - Define a "connections" map to link related technology IDs.

## Verification
- Confirm smooth 60fps performance during rotation.
- Verify all technologies from `constants.tsx` are present in the web.
- Ensure the 3D canvas correctly handles window resizing.
