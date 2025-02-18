// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "./routes/routes";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import CanvasCursor from "./components/Canvas Cursor/CanvasCursor";
import FluidCursor from "./components/FluidCursor/FluidCursor";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <Router>
      <FluidCursor />

      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route path={ROUTES.home} element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
