import React, { createContext, useContext, useState, useEffect } from "react";

// Define all theme presets
export const themes = {
    crimson: {
        id: "crimson",
        name: "Crimson",
        primary: "#cc0000",
        secondary: "#8b0000",
        accent: "#ff4444",
        background: "#080808",
        backgroundGradient: `
      radial-gradient(ellipse at 20% 30%, rgba(139, 0, 0, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(100, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(20, 0, 0, 0.3) 0%, transparent 70%)
    `,
    },
    obsidian: {
        id: "obsidian",
        name: "Obsidian",
        primary: "#4a4a4a",
        secondary: "#2a2a2a",
        accent: "#8a8a8a",
        background: "#0a0a0a",
        backgroundGradient: `
      radial-gradient(ellipse at 20% 30%, rgba(74, 74, 74, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(42, 42, 42, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(20, 20, 20, 0.3) 0%, transparent 70%)
    `,
    },
    ocean: {
        id: "ocean",
        name: "Ocean Blue",
        primary: "#0066cc",
        secondary: "#004488",
        accent: "#3399ff",
        background: "#050510",
        backgroundGradient: `
      radial-gradient(ellipse at 20% 30%, rgba(0, 102, 204, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(0, 68, 136, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(0, 20, 40, 0.3) 0%, transparent 70%)
    `,
    },
    gold: {
        id: "gold",
        name: "Royal Gold",
        primary: "#d4af37",
        secondary: "#8b7500",
        accent: "#ffd700",
        background: "#0a0805",
        backgroundGradient: `
      radial-gradient(ellipse at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(139, 117, 0, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(30, 25, 10, 0.3) 0%, transparent 70%)
    `,
    },
    cyber: {
        id: "cyber",
        name: "Cyber Purple",
        primary: "#9933ff",
        secondary: "#6600cc",
        accent: "#cc66ff",
        background: "#0a0510",
        backgroundGradient: `
      radial-gradient(ellipse at 20% 30%, rgba(153, 51, 255, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(102, 0, 204, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(20, 10, 30, 0.3) 0%, transparent 70%)
    `,
    },
    emerald: {
        id: "emerald",
        name: "Emerald",
        primary: "#00cc66",
        secondary: "#008844",
        accent: "#33ff99",
        background: "#050a08",
        backgroundGradient: `
      radial-gradient(ellipse at 20% 30%, rgba(0, 204, 102, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(0, 136, 68, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(10, 30, 20, 0.3) 0%, transparent 70%)
    `,
    },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Load theme from localStorage or default to crimson
        const savedTheme = localStorage.getItem("portfolio-theme");
        return savedTheme && themes[savedTheme] ? savedTheme : "obsidian";
    });

    // Get the full theme object
    const theme = themes[currentTheme];

    // Save theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("portfolio-theme", currentTheme);
    }, [currentTheme]);

    const setTheme = (themeId) => {
        if (themes[themeId]) {
            setCurrentTheme(themeId);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, themes, currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default ThemeContext;
