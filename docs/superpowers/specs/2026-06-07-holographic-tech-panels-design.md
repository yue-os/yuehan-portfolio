# Holographic Tech Data Panels Design

## Overview
Enhance the 3D Neural Tech Web with interactive, holographic data panels that provide detailed information about each technology on hover. These panels will feature high-fidelity "HUD" styling and smooth "opening" animations to reinforce the Tactical OS theme.

## Goals
- Increase the informative depth of the Tech Stack section.
- Provide a high-impact, interactive visual reward for user engagement.
- Maintain smooth performance by using hybrid HTML/3D rendering.

## Visual Design
- **The Panel:**
    - Background: `rgba(6, 10, 22, 0.8)` with `backdrop-blur-md`.
    - Border: 1px cyan-400 with a subtle outer glow.
    - Corners: Cyber-style "L" brackets in the corners.
- **Typography:**
    - High-contrast white and cyan text using `JetBrains Mono`.
    - Status badges (e.g., `[SYS_ACTIVE]`) in emerald green.
- **Animations:**
    - Expansion: The panel scales from 0 to 1 over 200ms.
    - Text Reveal: A simple typing or glitch effect for the header.
    - Scanline: A single vertical glow bar passes through the panel upon activation.

## Interaction
- Hovering a node hides the basic label and displays the Holographic Panel.
- The panel uses `Billboard` logic to always face the user.
- Connections related to the hovered node remain highlighted while the panel is open.

## Technical Implementation
- **Component:** Update `TechNode` in `TechWeb.tsx`.
- **Panel Component:** Use the `Html` component from `@react-three/drei` for the panel UI.
- **Data Mapping:**
    - Use the `TECH_STACK` categories to determine "Mastery Level" (e.g., Top category = Mastered).
    - Map specific tech items to brief descriptions if available, or generate standard "Operational Specs".

## Verification
- Confirm panels are legible and correctly positioned relative to nodes.
- Verify that panels don't overlap awkwardly when navigating.
- Ensure 60fps performance is maintained during panel transitions.
