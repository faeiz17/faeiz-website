"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface Segment {
  text: string;
  className?: string;
}

interface TypedTextProps {
  /** Typed in order, sharing one running character count so segment 2 only starts once segment 1 is fully typed. */
  segments: Segment[];
  /** Rendered between segments — for a forced line break in a short quote like this one, not for wrapping prose. */
  breakBetween?: boolean;
  /** ms per character. */
  speed?: number;
  className?: string;
}

/**
 * Types its text out a character at a time the first time it scrolls into
 * view, then leaves a blinking caret at the end — the one place on the page
 * that borrows the terminal's own cursor motif for prose instead of a shell
 * prompt, since this quote sits directly under the Terminal window it echoes.
 */
export default function TypedText({ segments, breakBetween = false, speed = 28, className }: TypedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  const total = segments.reduce((sum, s) => sum + s.text.length, 0);
  const [count, setCount] = useState(reduce ? total : 0);
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= total) {
          clearInterval(id);
          setDone(true);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [reduce, inView, total, speed]);

  let consumed = 0;

  return (
    <span ref={ref} className={className}>
      {segments.map((segment, i) => {
        const visible = Math.max(0, Math.min(segment.text.length, count - consumed));
        consumed += segment.text.length;
        return (
          <span key={i}>
            {i > 0 && breakBetween && <br />}
            <span className={segment.className}>{segment.text.slice(0, visible)}</span>
          </span>
        );
      })}
      {!reduce && (
        <span
          aria-hidden
          className={`ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.1em] bg-current ${
            done ? "animate-pulse" : "opacity-100"
          }`}
        />
      )}
    </span>
  );
}
