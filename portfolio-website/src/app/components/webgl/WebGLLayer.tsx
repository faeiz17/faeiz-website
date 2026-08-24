"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useReducedMotion } from "motion/react";

// Code-split: three plus the scene is the heaviest thing on the page and none
// of it is needed to render or read the content, so it loads after paint.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

/** Static stand-in that matches the shader's composition. */
function Fallback() {
  return (
    <div
      aria-hidden
      className="size-full"
      style={{
        // Intensities track the shader's, so switching between the live layer
        // and this one is not a visible jump in brightness.
        background:
          "radial-gradient(58% 46% at 74% 34%, rgb(63 127 214 / 0.15) 0%, transparent 68%), radial-gradient(46% 40% at 16% 76%, rgb(255 157 110 / 0.06) 0%, transparent 70%), #08080b",
      }}
    />
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The page's background. Fixed behind everything, pointer-events-none, and
 * always present so the glass panels have something live to sit over.
 *
 * Scroll and pointer are written into refs rather than state: these update
 * every frame, and putting them through React would re-render the tree
 * continuously for values only the render loop reads.
 */
export default function WebGLLayer() {
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const [enabled, setEnabled] = useState(false);
  const [lite, setLite] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || !supportsWebGL()) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setLite(coarse || window.innerWidth < 768);
    setEnabled(true);
  }, [reduce]);

  useEffect(() => scrollYProgress.on("change", (v) => {
    scrollRef.current = v;
  }), [scrollYProgress]);

  useEffect(() => {
    if (!enabled) return;
    const onPointer = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    // Stop the render loop while the tab is hidden. A shader running in a
    // background tab is pure battery drain.
    const onVisibility = () => setPaused(document.hidden);

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {enabled ? (
        <Scene scrollRef={scrollRef} pointerRef={pointerRef} lite={lite} paused={paused} />
      ) : (
        <Fallback />
      )}
    </div>
  );
}
