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
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec3 uColor;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.03;
        float lineWidth = 0.001;

        vec3 color = vec3(0.0);
        
        // Dynamic color scheme with chromatic aberration style
        for(int j = 0; j < 3; j++) {
          for(int i = 0; i < 4; i++) {
            float intensity = lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 4.0 - length(uv) + mod(uv.x + uv.y, 0.15));
            
            // Apply color weight based on the uniform color and channel
            if(j == 0) color[j] += intensity * uColor.r * 1.5;
            else if(j == 1) color[j] += intensity * uColor.g * 1.5;
            else color[j] += intensity * uColor.b * 1.5;
          }
        }
        
        // Add subtle vignette
        float vignette = 1.0 - length(uv) * 0.4;
        color *= vignette;
        
        // Clamp for dark aesthetic
        color = clamp(color * 0.5, 0.0, 0.3);
        
        gl_FragColor = vec4(color, 0.6);
      }
    `;

        // Initialize Three.js scene
        const camera = new THREE.Camera();
        camera.position.z = 1;

        const scene = new THREE.Scene();
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Convert theme primary hex to RGB
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16) / 255,
                g: parseInt(result[2], 16) / 255,
                b: parseInt(result[3], 16) / 255
            } : { r: 0.8, g: 0, b: 0 };
        };

        const rgb = hexToRgb(theme.primary);

        const uniforms = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() },
            uColor: { type: "v3", value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) }
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
                zIndex: -1,
                pointerEvents: "none",
                background: theme.backgroundGradient, // Use theme gradient
                backgroundColor: theme.background,
            }}
        />
    );
}

export default ShaderBackground;
