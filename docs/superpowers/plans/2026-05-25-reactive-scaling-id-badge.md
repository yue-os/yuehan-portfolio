# Reactive Scaling in HangingID3D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the 3D ID badge scale reactively based on the viewport width to ensure it looks good on all screen sizes, especially mobile.

**Architecture:** Move scaling logic from the parent `Hero` component into the `HangingIDModel` component. Use `useThree`'s `viewport` to calculate a `derivedScale` that adjusts based on the available Three.js units.

**Tech Stack:** React, Three.js, @react-three/fiber

---

### Task 1: Update HangingID3D.tsx

**Files:**
- Modify: `components/HangingID3D.tsx`

- [x] **Step 1: Update `HangingIDModel` props and logic**
- [x] **Step 2: Use `derivedScale` in `useFrame`**
- [x] **Step 3: Update `HangingID3D` component**

### Task 2: Simplify Hero.tsx

**Files:**
- Modify: `components/Hero.tsx`

- [x] **Step 1: Remove manual scaling logic**

### Task 3: Verification and Commit

- [x] **Step 1: Verify changes**
- [x] **Step 2: Commit changes**
