// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "./routes/routes";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import FluidCursor from "./components/FluidCursor/FluidCursor";
import Loader from "./components/Loader/Loader";
import ShaderBackground from "./components/ShaderBackground/ShaderBackground";
import ThemeChanger from "./components/ThemeChanger/ThemeChanger";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // Disable spacebar globally (except in game)
  useEffect(() => {
    const preventSpacebarScroll = (e) => {
      // Only prevent if spacebar is pressed and target is not an input/textarea
      if (e.key === " " &&
        e.target.tagName !== "INPUT" &&
        e.target.tagName !== "TEXTAREA" &&
        !e.target.isContentEditable) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventSpacebarScroll);

    return () => {
      window.removeEventListener("keydown", preventSpacebarScroll);
    };
  }, []);

  return (
    <>
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}

      {!loading && (
        <Router>
          <ShaderBackground />
          <FluidCursor />
          <ThemeChanger />

          <Routes>
            <Route path={ROUTES.home} element={<Layout />}>
              <Route path={ROUTES.home} element={<Homepage />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;

