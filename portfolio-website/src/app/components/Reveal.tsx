"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger index. Multiplied by 60ms so grid items cascade rather than pop together. */
  index?: number;
  as?: "div" | "li" | "section" | "article";
}

/**
 * The page's single scroll-entry animation. Everything that appears on scroll
 * uses this, so the whole site enters with one consistent weight and easing
 * instead of each section inventing its own.
 */
export default function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
