// // src/components/CanvasCursor/CanvasCursor.jsx
// import React from "react";
// import useCanvasCursor from "../../hooks/use-canvasCursor";

// const CanvasCursor = () => {
//   useC();
//   return (
//     <canvas
//       className="pointer-events-none absolute inset-0"
//       id="canvas"
//       style={{
//         position: "fixed",
//         left: 0,
//         top: 0,
//         zIndex: -1,
//         // transparent background to avoid artifacts
//         // ensures the canvas is behind your contentks
//         width: "100vw",
//         height: "100vh",
//       }}
//     />
//   );
// };

// export default CanvasCursor;
"use client";
import { useEffect } from "react";
import fluidCursor from "../../hooks/useFluidCursor";
import { useTheme } from "../../context/ThemeContext";

const FluidCursor = () => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    const applyCursorColor = () => {
      // Get the current active color from CSS Variables
      const root = document.documentElement;
      let primaryColorHex = getComputedStyle(root).getPropertyValue("--color-accent-primary").trim();

      if (!primaryColorHex) {
        primaryColorHex = "#3b82f6"; // Safe default
      }

      // Convert hex to RGB normalized (0-1)
      const hexToRgbNormalized = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255
        } : { r: 1, g: 0, b: 0 };
      };

      const rgb = hexToRgbNormalized(primaryColorHex);
      fluidCursor({ color: rgb });
    };

    // Small delay ensures CSS variables are applied by the browser before computing style
    const themeTimeout = setTimeout(applyCursorColor, 50);

    return () => clearTimeout(themeTimeout);
  }, [currentTheme]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none" style={{ zIndex: 1 }}>
      <canvas
        id="fluid"
        className="w-full h-full"
      />
    </div>
  );
};

export default FluidCursor;
