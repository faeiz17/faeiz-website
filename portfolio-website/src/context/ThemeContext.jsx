import React, { createContext, useContext, useState, useEffect } from "react";

export const themes = {
    default: {
        id: "default",
        name: "Midnight Abyss",
        description: "Deep oceanic blue dark theme.",
    },
    "deep-midnight": {
        id: "deep-midnight",
        name: "Deep Midnight",
        description: "True black OLED optimized dark mode.",
    },
    "dracula": {
        id: "dracula",
        name: "Dracula",
        description: "Vibrant dark theme with purple and pink accents.",
    },
    "cyber-neon": {
        id: "cyber-neon",
        name: "Cyber Neon",
        description: "High-energy, sharp, futuristic neon.",
    },
    "hacker-terminal": {
        id: "hacker-terminal",
        name: "Hacker Terminal",
        description: "Retro phosphor green dark theme.",
    },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        // Load theme from localStorage or default to 'cyber-neon'
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("portfolio-theme-engine");
            return savedTheme && themes[savedTheme] ? savedTheme : "cyber-neon";
        }
        return "cyber-neon";
    });

    useEffect(() => {
        // Apply the theme to the HTML root element
        const root = document.documentElement;

        // Remove previous themes if any exist (safety cleanup)
        Object.keys(themes).forEach((t) => {
            if (t !== "default") {
                root.removeAttribute("data-theme");
            }
        });

        // Apply new theme
        if (currentTheme !== "default") {
            root.setAttribute("data-theme", currentTheme);
        } else {
            root.removeAttribute("data-theme"); // Default is the :root layer
        }

        // Persist
        localStorage.setItem("portfolio-theme-engine", currentTheme);
    }, [currentTheme]);

    const setTheme = (themeId) => {
        if (themes[themeId]) {
            setCurrentTheme(themeId);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme: themes[currentTheme], themes, currentTheme, setTheme }}>
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
