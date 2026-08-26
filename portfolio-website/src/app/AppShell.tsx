"use client";

import { ReactNode, useEffect } from "react";
import { MotionConfig } from "motion/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import WebGLLayer from "./components/webgl/WebGLLayer";

export interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  // The browser restores the previous scroll offset on refresh by default;
  // every load should read as a fresh visit starting at the top instead.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    // reducedMotion="user" makes every Motion component in the tree respect the
    // OS setting without each one having to check for itself.
    <MotionConfig reducedMotion="user">
      <WebGLLayer />
      {/* Everything above the shader. Sections are transparent so the field
          reads through them; only panels get a surface. */}
      <div className="relative z-10">
        <ScrollProgress />
        <NavBar />
        {children}
        <Footer />
      </div>
    </MotionConfig>
  );
}
