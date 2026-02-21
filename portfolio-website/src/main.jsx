import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

// Since we are migrating fully to Semantic Tailwind and CSS Variables
// we no longer generate dynamic MUI themes. Any MUI components
// should be refactored or overridden via standard css vars if kept.

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

