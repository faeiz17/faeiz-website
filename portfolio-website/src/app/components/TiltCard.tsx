"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Degrees of rotation at the card's edge. Keep it small; past ~8 it reads as a gimmick. */
  maxTilt?: number;
}

/**
 * Pointer-tracked 3D tilt. This is the site's depth cue in place of a WebGL
 * scene: real perspective, no 500kB dependency.
 *
 * Pointer position lives in motion values, never React state. State would
 * re-render the subtree on every mousemove and stutter the whole grid.
 */
export default function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const config = { stiffness: 220, damping: 22, mass: 0.6 };
  const springX = useSpring(x, config);
  const springY = useSpring(y, config);

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  // Highlight follows the cursor across the surface, so the tilt reads as a
  // physical plate catching light rather than a flat div being rotated.
  const glareX = useTransform(springX, (v) => `${v * 100}%`);
  const glareY = useTransform(springY, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(340px circle at ${glareX} ${glareY}, var(--color-accent-ghost), transparent 70%)`;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
}
