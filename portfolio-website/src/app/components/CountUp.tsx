"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Renders 16000 as "16k". Used for the money and download figures. */
  compact?: boolean;
  className?: string;
}

function format(n: number, compact: boolean): string {
  if (!compact) return Math.round(n).toString();
  if (n >= 1000) {
    const k = n / 1000;
    return `${k >= 10 ? Math.round(k) : Math.round(k * 10) / 10}k`;
  }
  return Math.round(n).toString();
}

/**
 * Counts a metric up from zero the first time it scrolls into view. The numbers
 * are the strongest evidence on the page, so they get the one piece of motion
 * whose whole job is to make you look at them.
 *
 * Writes to the DOM node directly rather than through state: a spring updating
 * React state every frame would re-render the tree sixty times a second.
 */
export default function CountUp({ value, prefix = "", suffix = "", compact = false, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (reduce) return;
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${format(latest, compact)}${suffix}`;
    });
  }, [spring, prefix, suffix, compact, reduce]);

  // Under reduced motion the final value is the first and only thing rendered.
  const initial = reduce ? `${prefix}${format(value, compact)}${suffix}` : `${prefix}${format(0, compact)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {initial}
    </span>
  );
}
