"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { simplex3d } from "./noise.glsl";

/**
 * The hero object: a sphere pushed around by 3D noise and shaded with a fresnel
 * rim rather than a lit material. Nothing here is a stock Three.js material, so
 * it does not read as a demo scene.
 *
 * It lives in the same canvas as the ambient field and simply fades out as the
 * hero leaves the viewport, which is cheaper than mounting a second context.
 */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying float vDisp;

  ${simplex3d}

  void main() {
    float n = fbm(normal * 1.5 + vec3(0.0, 0.0, uTime * 0.16));
    vDisp = n;

    vec3 displaced = position + normal * n * uAmp;

    // Recompute a usable normal from two nearby samples. Cheaper than a full
    // tangent basis and accurate enough for a rim term.
    float eps = 0.06;
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0) + 0.001));
    vec3 bitangent = normalize(cross(normal, tangent));
    float nt = fbm((normal + tangent * eps) * 1.5 + vec3(0.0, 0.0, uTime * 0.16));
    float nb = fbm((normal + bitangent * eps) * 1.5 + vec3(0.0, 0.0, uTime * 0.16));
    vec3 pt = (position + tangent * eps) + normal * nt * uAmp;
    vec3 pb = (position + bitangent * eps) + normal * nb * uAmp;
    vec3 adjusted = normalize(cross(pt - displaced, pb - displaced));
    adjusted *= sign(dot(adjusted, normal));

    vec4 world = modelMatrix * vec4(displaced, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * adjusted);
    vViewDir = normalize(cameraPosition - world.xyz);

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uCool;
  uniform vec3 uWarm;
  uniform float uOpacity;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying float vDisp;

  void main() {
    // Fresnel: bright where the surface turns away from the eye, which is what
    // makes it read as glass rather than a painted ball.
    float fresnel = pow(1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0), 2.4);

    // Two-sided key light, cool from upper right, warm from lower left.
    float keyCool = clamp(dot(normalize(vNormalW), normalize(vec3(0.7, 0.6, 0.5))), 0.0, 1.0);
    float keyWarm = clamp(dot(normalize(vNormalW), normalize(vec3(-0.6, -0.5, 0.3))), 0.0, 1.0);

    vec3 color = vec3(0.02, 0.025, 0.04);
    color += uCool * (keyCool * 0.22 + fresnel * 0.62);
    color += uWarm * keyWarm * 0.1;
    // Crest highlight: the peaks of the displacement catch a little extra.
    color += uCool * smoothstep(0.25, 0.75, vDisp) * 0.1;

    gl_FragColor = vec4(color, uOpacity * (0.28 + fresnel * 0.72));
  }
`;

interface ArtifactProps {
  scrollRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  detail: number;
}

export default function Artifact({ scrollRef, pointerRef, detail }: ArtifactProps) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.34 },
      uOpacity: { value: 1 },
      uCool: { value: new THREE.Color("#7fb2ff") },
      uWarm: { value: new THREE.Color("#ff9d6e") },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!group.current || !material.current) return;
    const scroll = scrollRef.current ?? 0;
    const pointer = pointerRef.current ?? { x: 0, y: 0 };

    material.current.uniforms.uTime.value += delta;

    // Constant slow spin, plus a pointer-driven lean eased toward the target so
    // it never snaps. Reading the refs in the frame loop keeps pointer and
    // scroll out of React state entirely.
    group.current.rotation.y += delta * 0.14;
    group.current.rotation.x += (pointer.y * 0.34 - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (-pointer.x * 0.2 - group.current.rotation.z) * 0.05;

    // Drift down and dim as the hero scrolls away, so it hands the page over
    // rather than hanging around behind the content. The multiplier is high
    // because scroll here is progress over the whole (very tall) page and the
    // hero is only the first tenth of it.
    const exit = Math.min(scroll * 10, 1);
    group.current.position.y = -exit * 2.6;
    group.current.scale.setScalar(1 - exit * 0.22);
    material.current.uniforms.uOpacity.value = 1 - exit;
    group.current.visible = exit < 0.995;
  });

  return (
    <group ref={group} position={[1.35, 0.1, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.5, detail]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
