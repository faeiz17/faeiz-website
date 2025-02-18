// src/components/CanvasCursor/CanvasCursor.jsx
import React from "react";
import useCanvasCursor from "../../hooks/use-canvasCursor";

const CanvasCursor = () => {
  useCanvasCursor();
  return (
    <></>
    // <canvas
    //   className="pointer-events-none absolute inset-0"
    //   id="canvas"
    //   style={{
    //     position: "fixed",
    //     left: 0,
    //     top: 0,
    //     zIndex: -1,
    //     // transparent background to avoid artifacts
    //     // ensures the canvas is behind your contentks
    //     width: "100vw",
    //     height: "100vh",
    //   }}
    // />
  );
};

export default CanvasCursor;
