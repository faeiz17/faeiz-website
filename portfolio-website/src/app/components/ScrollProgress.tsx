"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin progress rule pinned to the very top of the viewport. Reads scroll
 * through Motion's useScroll rather than a scroll listener, so it updates off
 * the main React render path.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-px origin-left bg-accent"
    />
  );
}
