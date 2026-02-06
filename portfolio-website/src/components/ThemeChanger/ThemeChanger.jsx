import React, { useState } from "react";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PaletteIcon from "@mui/icons-material/Palette";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme, themes } from "../../context/ThemeContext";

const ThemeChanger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, currentTheme, setTheme } = useTheme();

    const themeList = Object.values(themes);

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
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                        border: `2px solid ${theme.accent}`,
                        boxShadow: `0 0 30px ${theme.primary}60`,
                        "&:hover": {
                            background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
                            boxShadow: `0 0 40px ${theme.primary}80`,
                        },
                    }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? (
                            <CloseIcon sx={{ color: "#fff", fontSize: "28px" }} />
                        ) : (
                            <PaletteIcon sx={{ color: "#fff", fontSize: "28px" }} />
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
                                background: "rgba(0, 0, 0, 0.7)",
                                backdropFilter: "blur(5px)",
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
                                    background: "rgba(15, 15, 15, 0.95)",
                                    borderRadius: "20px",
                                    padding: "25px",
                                    border: `2px solid ${theme.primary}40`,
                                    boxShadow: `0 0 50px ${theme.primary}30`,
                                    minWidth: "280px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        marginBottom: "20px",
                                        textAlign: "center",
                                        background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Choose Theme
                                </Typography>

                                {/* Theme Grid */}
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "15px",
                                    }}
                                >
                                    {themeList.map((t) => (
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
                                                        border:
                                                            currentTheme === t.id
                                                                ? `3px solid ${t.accent}`
                                                                : "3px solid transparent",
                                                        boxShadow:
                                                            currentTheme === t.id
                                                                ? `0 0 20px ${t.primary}80`
                                                                : "none",
                                                        transition: "all 0.3s ease",
                                                        "&:hover": {
                                                            boxShadow: `0 0 25px ${t.primary}60`,
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
                                                            background: t.primary,
                                                            left: "5px",
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                            boxShadow: `0 0 15px ${t.primary}`,
                                                        }}
                                                    />
                                                    {/* Secondary Color Circle */}
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            width: "45px",
                                                            height: "45px",
                                                            borderRadius: "50%",
                                                            background: t.secondary,
                                                            right: "5px",
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                            boxShadow: `0 0 15px ${t.secondary}`,
                                                        }}
                                                    />
                                                    {/* Check Mark for Selected */}
                                                    {currentTheme === t.id && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            style={{
                                                                position: "absolute",
                                                                zIndex: 10,
                                                                background: t.accent,
                                                                borderRadius: "50%",
                                                                width: "24px",
                                                                height: "24px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <CheckIcon
                                                                sx={{ fontSize: "16px", color: "#000" }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </Box>
                                            </Tooltip>
                                        </motion.div>
                                    ))}
                                </Box>

                                {/* Current Theme Name */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.accent,
                                        textAlign: "center",
                                        marginTop: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Current: {theme.name}
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
