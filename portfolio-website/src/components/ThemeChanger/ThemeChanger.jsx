import React, { useState } from "react";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PaletteIcon from "@mui/icons-material/Palette";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme, themes } from "../../context/ThemeContext";

// Since colors are in CSS variables now, we can represent theme buttons
// via a CSS variable inline style, or rely on a hardcoded preview mapping here if needed.
// For the switcher, let's use the CSS variable `var(--color-primary)`
// by dynamically applying `data-theme` just for the preview dot, or using known hexes for the bubbles.
const previewColors = {
    "default": { primary: "#3b82f6", secondary: "#1e293b", accent: "#10b981" },
    "deep-midnight": { primary: "#8b5cf6", secondary: "#18181b", accent: "#8b5cf6" },
    "dracula": { primary: "#bd93f9", secondary: "#44475a", accent: "#50fa7b" },
    "cyber-neon": { primary: "#00F0FF", secondary: "#FF003C", accent: "#00F0FF" },
    "hacker-terminal": { primary: "#00ff00", secondary: "#0a1105", accent: "#00ffcc" },
};

const ThemeChanger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, currentTheme, setTheme } = useTheme();

    const themeList = Object.values(themes);

    // Get active colors for the toggle button itself based on CSS vars mapping loosely
    const activePreview = previewColors[currentTheme] || previewColors["default"];

    return (
        <>
            {/* Floating Button */}
            <motion.div
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    zIndex: 9999,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <IconButton
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                        width: "60px",
                        height: "60px",
                        background: `var(--color-bg-elevated)`,
                        border: `2px solid var(--color-border-strong)`,
                        boxShadow: `var(--shadow-theme-lg)`,
                        "&:hover": {
                            background: `var(--color-bg-subtle)`,
                            boxShadow: `var(--shadow-theme-xl)`,
                        },
                    }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? (
                            <CloseIcon sx={{ color: "var(--color-text-primary)", fontSize: "28px" }} />
                        ) : (
                            <PaletteIcon sx={{ color: "var(--color-text-primary)", fontSize: "28px" }} />
                        )}
                    </motion.div>
                </IconButton>
            </motion.div>

            {/* Theme Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: "rgba(0, 0, 0, 0.4)",
                                backdropFilter: "blur(4px)",
                                zIndex: 9998,
                            }}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            style={{
                                position: "fixed",
                                bottom: "110px",
                                right: "30px",
                                zIndex: 9999,
                            }}
                        >
                            <Box
                                sx={{
                                    background: "var(--color-bg-elevated)",
                                    borderRadius: "var(--radius-theme-xl)",
                                    padding: "25px",
                                    border: `1px solid var(--color-border-subtle)`,
                                    boxShadow: `var(--shadow-theme-xl)`,
                                    minWidth: "280px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "var(--color-text-primary)",
                                        fontWeight: "bold",
                                        marginBottom: "20px",
                                        textAlign: "center",
                                    }}
                                >
                                    Select Vibe
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "var(--color-text-muted)",
                                        marginBottom: "15px",
                                        textAlign: "center",
                                        fontSize: "0.85rem"
                                    }}
                                >
                                    Experience the engine across the app.
                                </Typography>


                                {/* Theme Grid */}
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "15px",
                                    }}
                                >
                                    {themeList.map((t) => {
                                        const prev = previewColors[t.id] || previewColors["default"];
                                        const isActive = currentTheme === t.id;
                                        return (
                                            <motion.div
                                                key={t.id}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Tooltip title={t.name} placement="top" arrow>
                                                    <Box
                                                        onClick={() => setTheme(t.id)}
                                                        sx={{
                                                            width: "70px",
                                                            height: "70px",
                                                            borderRadius: "50%",
                                                            cursor: "pointer",
                                                            position: "relative",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            background: prev.secondary,
                                                            border: isActive
                                                                ? `3px solid ${prev.accent}`
                                                                : `3px solid transparent`,
                                                            boxShadow: isActive
                                                                ? `0 0 15px ${prev.primary}80`
                                                                : "none",
                                                            transition: "all 0.3s ease",
                                                            "&:hover": {
                                                                boxShadow: `0 0 20px ${prev.primary}60`,
                                                            },
                                                        }}
                                                    >
                                                        {/* Primary Color Circle */}
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                width: "45px",
                                                                height: "45px",
                                                                borderRadius: "50%",
                                                                background: prev.primary,
                                                                left: "5px",
                                                                top: "50%",
                                                                transform: "translateY(-50%)",
                                                                boxShadow: `0 0 10px ${prev.primary}`,
                                                            }}
                                                        />

                                                        {/* Check Mark for Selected */}
                                                        {isActive && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                style={{
                                                                    position: "absolute",
                                                                    zIndex: 10,
                                                                    background: prev.accent,
                                                                    borderRadius: "50%",
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                <CheckIcon
                                                                    sx={{ fontSize: "16px", color: "#fff" }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </Box>
                                                </Tooltip>
                                            </motion.div>
                                        )
                                    })}
                                </Box>

                                {/* Current Theme Name */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "var(--color-accent-primary)",
                                        textAlign: "center",
                                        marginTop: "15px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Current: {theme?.name}
                                </Typography>
                            </Box>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThemeChanger;
