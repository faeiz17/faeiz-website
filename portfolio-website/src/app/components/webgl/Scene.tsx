"use client";

import { Canvas } from "@react-three/fiber";
import AmbientField from "./AmbientField";
import Artifact from "./Artifact";

interface SceneProps {
  scrollRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  /** Coarse pointer or small viewport: fewer triangles, lower resolution. */
  lite: boolean;
  paused: boolean;
}

export default function Scene({ scrollRef, pointerRef, lite, paused }: SceneProps) {
  return (
    <Canvas
      // One context for both the ambient field and the object. A second canvas
      // would mean a second GL context and a second render loop for no gain.
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, lite ? 1.25 : 1.75]}
      // Nothing here needs a depth buffer or MSAA: the field is a fullscreen
      // pass and the object is additively blended.
      gl={{ antialias: false, alpha: false, depth: false, powerPreference: "high-performance" }}
      frameloop={paused ? "never" : "always"}
      style={{ width: "100%", height: "100%" }}
    >
      <AmbientField scrollRef={scrollRef} />
      <Artifact scrollRef={scrollRef} pointerRef={pointerRef} detail={lite ? 12 : 24} />
    </Canvas>
  );
}
