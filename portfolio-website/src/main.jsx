import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { store } from "./redux/store.js";
// import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";

//Creating Cyberpunk Style Theme For MUI

export const CustomTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff00ff", // Neon Magenta
      contrastText: "#0ff", // Neon Cyan
    },
    secondary: {
      main: "#ffea00", // Electric Yellow
      contrastText: "#ff00ff", // Neon Magenta
    },
    error: {
      main: "#ff073a", // Bright Red
    },
    warning: {
      main: "#ff9100", // Vivid Orange
    },
    info: {
      main: "#00eaff", // Neon Blue
    },
    success: {
      main: "#00ff6a", // Bright Green
    },
    background: {
      // Dark Neon Purple
    },
    divider: "#7f00ff", // Electric Purple
  },
  typography: {
    fontFamily: '"Orbitron", "Press Start 2P", "Oswald", sans-serif', // Cyberpunk fonts
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "#ff00ff", // Neon Magenta
      textTransform: "uppercase",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#ffea00", // Bright Yellow
    },
    body1: {
      fontSize: "1.1rem",
      color: "#00eaff", // Neon Blue
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            "url('https://www.toptal.com/designers/subtlepatterns/uploads/ep_naturalblack.png')", // More futuristic pattern
          backgroundRepeat: "repeat",
          backgroundSize: "auto",

          color: "#0ff", // Neon cyan text
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 50,
          height: 28,
          padding: 0,
          margin: 10,
        },
        switchBase: {
          padding: 2,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(22px)",
            color: "#000",
            "& + $track": {
              opacity: 1,
              border: "none",
              backgroundColor: "#ff00ff", // Neon Magenta Track
            },
          },
        },
        thumb: {
          width: 26,
          height: 26,
          background: "linear-gradient(135deg, #ff00ff 30%, #ffea00 100%)", // Magenta to Yellow Glow
        },
        track: {
          borderRadius: 15,
          border: "1px solid #ff00ff",
          backgroundColor: "#140033",
          opacity: 1,
          transition: "all 300ms ease-in-out",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={CustomTheme}>
    <CssBaseline />
    <React.StrictMode>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </React.StrictMode>
  </ThemeProvider>
);
