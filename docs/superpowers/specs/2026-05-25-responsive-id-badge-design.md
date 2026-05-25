# Design Spec: Responsive 3D ID Badge

## Problem Statement
The 3D ID badge (`HangingID3D.tsx`) is currently positioned at a static `ANCHOR` coordinate (x=2.8). On mobile devices in portrait mode, the viewport width in Three.js units is typically less than 2.5, causing the badge to be rendered off-screen. Additionally, the `Hero` section has `overflow-hidden`, which clips the off-screen component.

## Goals
- Make the ID badge visible on all screen sizes (specifically Android/mobile portrait).
- Maintain the "Side" hanging aesthetic.
- Ensure dragging functionality remains accurate across different viewport sizes.

## Proposed Changes

### 1. Dynamic Positioning in `HangingID3D.tsx`
- Move `ANCHOR` definition inside the `HangingIDModel` component.
- Use `useThree()` hook to access `viewport.width`.
- Calculate `ANCHOR.x` based on a percentage of `viewport.width` or a responsive breakpoint.
  - Desktop: `x = 2.8` (or proportional to right edge).
  - Mobile: `x = viewport.width / 2 - 0.8` (placed near the right edge of the narrow viewport).
- Adjust initial `bobPosRef` to match the dynamic anchor so the badge starts in a visible position.

### 2. Responsive Scaling
- Pass a responsive `scale` from `Hero.tsx` or handle it inside `HangingID3D.tsx`.
- Scale down the badge on mobile (e.g., `0.6` instead of `0.9`) to prevent it from covering too much of the headline.

### 3. Implementation Details
- Update `useFrame` logic to handle potential viewport resizing (though usually stable on mobile).
- Ensure the `pointer` mapping in the dragging logic correctly accounts for the responsive positioning.

## Verification Plan

### Automated Tests
- N/A (UI-heavy 3D component).

### Manual Verification
- **Desktop View:** Verify badge is on the right side and draggable.
- **Mobile View (Chrome DevTools):** Simulate Android phone (portrait) and verify badge is visible and correctly positioned on the right side.
- **Orientation Change:** Verify badge repositioning if the device is rotated.
