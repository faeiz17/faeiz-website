"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "../utils/cn";

interface CtaProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * The page's only button. Two variants, one shape, one motion behaviour, so
 * every action on the site feels like the same physical control.
 *
 * The arrow sits inside its own circular well rather than floating next to the
 * label, and shifts diagonally on hover while the button itself pulls slightly
 * toward the cursor. That gives the control internal tension instead of a flat
 * colour change.
 */
export default function Cta({
  children,
  href,
  variant = "primary",
  external = false,
  className,
  onClick,
}: CtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    // Cap the pull at a few pixels: enough to feel alive, not enough to make
    // the target move out from under the pointer.
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 6);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { x: springX, y: springY }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group/cta inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-[0.95rem] font-medium",
        "transition-[background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
        "active:scale-[0.98]",
        isPrimary
          ? "bg-accent text-ink-inverse shadow-lifted hover:bg-accent-hover hover:shadow-floating"
          : "border border-line-strong text-ink hover:border-accent hover:text-accent",
        className
      )}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)]",
          "group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5",
          isPrimary ? "bg-white/18" : "bg-accent-ghost"
        )}
      >
        <ArrowUpRight size={17} weight="bold" />
      </span>
    </motion.a>
  );
}
