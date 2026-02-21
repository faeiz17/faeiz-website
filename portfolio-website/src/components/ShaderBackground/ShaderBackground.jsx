import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

export function ShaderBackground() {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Vertex shader
        const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

        // Fragment shader - Dynamic colored flowing effect
        const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.03;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        
        for(int j = 0; j < 3; j++) {
          for(int i = 0; i < 4; i++) {
            float intensity = lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 4.0 - length(uv) + mod(uv.x + uv.y, 0.15));
            
            vec3 activeColor = uColor1;
            if(j == 1) activeColor = uColor2;
            else if(j == 2) activeColor = uColor3;

            color += intensity * activeColor * 0.8;
          }
        }
        
        // Add subtle vignette
        float vignette = 1.0 - length(uv) * 0.3;
        color *= vignette;
        
        // Clamp to prevent blowout
        color = clamp(color, 0.0, 1.0);
        
        gl_FragColor = vec4(color, 0.7);
      }
    `;

        // Initialize Three.js scene
        const camera = new THREE.Camera();
        camera.position.z = 1;

        const scene = new THREE.Scene();
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Convert theme colors to RGB
        const hexToRgb = (hex) => {
            if (!hex) return { r: 0, g: 0, b: 0 };
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16) / 255,
                g: parseInt(result[2], 16) / 255,
                b: parseInt(result[3], 16) / 255
            } : { r: 0.8, g: 0, b: 0 };
        };

        const c1 = hexToRgb(theme.primary || "#3b82f6");
        const c2 = hexToRgb(theme.secondary || "#8b5cf6");
        const c3 = hexToRgb(theme.accent || "#06b6d4");

        const uniforms = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() },
            uColor1: { type: "v3", value: new THREE.Vector3(c1.r, c1.g, c1.b) },
            uColor2: { type: "v3", value: new THREE.Vector3(c2.r, c2.g, c2.b) },
            uColor3: { type: "v3", value: new THREE.Vector3(c3.r, c3.g, c3.b) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);

        // Handle resize
        const onWindowResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            uniforms.resolution.value.x = renderer.domElement.width;
            uniforms.resolution.value.y = renderer.domElement.height;
        };

        onWindowResize();
        window.addEventListener("resize", onWindowResize, false);

        // Animation loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            uniforms.time.value += 0.05;
            renderer.render(scene, camera);
        };

        sceneRef.current = { renderer, geometry, material, animationId };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", onWindowResize);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, [theme]); // Re-run when theme changes

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                pointerEvents: "none",
                background: "var(--color-bg-base)",
            }}
        />
    );
}

export default ShaderBackground;
