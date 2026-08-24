import type { ThreeElements } from "@react-three/fiber";

/**
 * react-three-fiber v9 stopped augmenting the global JSX namespace, because
 * React 19 moved it under the react module. Without this, every intrinsic
 * three element (<mesh>, <planeGeometry>, <shaderMaterial>) is a type error.
 *
 * https://r3f.docs.pmnd.rs/api/canvas#typescript
 */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
