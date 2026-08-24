"use client";

import { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import WebGLLayer from "./components/webgl/WebGLLayer";

export interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
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
