"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { simplex3d } from "./noise.glsl";

/**
 * Fullscreen ambient wash. Two slow noise blooms, one accent-blue and one warm,
 * drifting over near-black. This is what gives the page depth behind the glass
 * panels instead of a flat colour.
 *
 * The vertex shader writes clip space directly, so the quad always covers the
 * viewport no matter where the camera is and nothing needs resizing.
 */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uAspect;
  uniform vec3 uCool;
  uniform vec3 uWarm;
  uniform vec3 uBase;

  ${simplex3d}

  void main() {
    vec2 p = (vUv - 0.5) * uAspect;

    // Drifting low-frequency field. Scroll shifts it so the background keeps
    // changing down the page rather than looping in place behind every section.
    float t = uTime * 0.035 + uScroll * 1.4;
    float n = fbm(vec3(p * 1.15, t));

    // Two blooms placed off-centre and moving on different periods, so they
    // never line up into an obvious symmetric shape.
    vec2 coolPos = vec2(0.55 + sin(t * 0.7) * 0.16, 0.42 + cos(t * 0.5) * 0.13);
    vec2 warmPos = vec2(-0.62 + cos(t * 0.42) * 0.14, -0.45 + sin(t * 0.63) * 0.12);

    // Tight falloff and low gain. This layer is meant to be felt behind the
    // content, not seen: anything brighter blows out through the glass panels
    // and swamps the text sitting on them.
    float cool = smoothstep(0.95, 0.0, length(p - coolPos) + n * 0.46);
    float warm = smoothstep(0.85, 0.0, length(p - warmPos) + n * 0.48);

    vec3 color = uBase;
    color += uCool * pow(cool, 1.6) * 0.26;
    color += uWarm * pow(warm, 1.8) * 0.12;

    // Grain in shader as well as CSS: this one moves with the field and keeps
    // the wide gradients from banding on 8-bit displays.
    float grain = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.015;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function AmbientField({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uAspect: { value: new THREE.Vector2(1, 1) },
      uCool: { value: new THREE.Color("#3f7fd6") },
      uWarm: { value: new THREE.Color("#ff9d6e") },
      uBase: { value: new THREE.Color("#08080b") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value += delta;
    u.uScroll.value = scrollRef.current ?? 0;
    const { width, height } = state.size;
    // Correct for viewport ratio so the blooms stay round instead of stretching.
    u.uAspect.value.set(Math.max(width / height, 1), Math.max(height / width, 1));
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
