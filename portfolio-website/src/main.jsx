import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import { ThemeProvider, useTheme as useCustomTheme } from "./context/ThemeContext";

// Dynamic MUI Theme Creator
const createDynamicTheme = (themeColors) => createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: themeColors.primary,
      light: themeColors.accent,
      dark: themeColors.secondary,
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2a2a2a",
      light: "#404040",
      dark: "#1a1a1a",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff1744",
    },
    warning: {
      main: "#b33000",
    },
    info: {
      main: "#4a4a4a",
    },
    success: {
      main: themeColors.secondary,
    },
    background: {
      default: themeColors.background,
      paper: themeColors.background,
    },
    divider: `${themeColors.primary}4D`,
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Oswald", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "#ffffff",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1.1rem",
      color: "#e0e0e0",
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
          backgroundColor: themeColors.background,
          backgroundImage: themeColors.backgroundGradient,
          backgroundAttachment: "fixed",
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15, 15, 15, 0.9)",
          borderRadius: "12px",
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
              backgroundColor: themeColors.primary,
            },
          },
        },
        thumb: {
          width: 26,
          height: 26,
          background: `linear-gradient(135deg, ${themeColors.primary} 30%, ${themeColors.secondary} 100%)`,
        },
        track: {
          borderRadius: 15,
          border: `1px solid ${themeColors.secondary}`,
          backgroundColor: "#1a1a1a",
          opacity: 1,
          transition: "all 300ms ease-in-out",
        },
      },
    },
  },
});

// Inner app wrapper that uses the theme context
const ThemedApp = () => {
  const { theme } = useCustomTheme();
  const muiTheme = createDynamicTheme(theme);

  return (
    <EmotionThemeProvider theme={muiTheme}>
      <CssBaseline />
      <App />
    </EmotionThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <React.StrictMode>
      <ThemedApp />
    </React.StrictMode>
  </ThemeProvider>
);

