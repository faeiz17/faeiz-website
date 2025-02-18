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
const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);
  return (
    <div className="fixed top-0 left-0 z-2">
      <canvas
        id="fluid"
        className="w-screen h-screen"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -1,
          // transparent background to avoid artifacts
          // ensures the canvas is behind your contentks
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
};
export default FluidCursor;
