import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useTheme } from "../../context/ThemeContext";

const Loader = ({ onLoadingComplete }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING");

  useEffect(() => {
    const texts = [
      "INITIALIZING SYSTEMS...",
      "LOADING NEURAL NETWORK...",
      "CONNECTING TO MATRIX...",
      "BOOTING CYBERNETIC CORE...",
      "CALIBRATING INTERFACE...",
      "ACCESSING MAINFRAME...",
      "READY TO LAUNCH...",
    ];

    let textIndex = 0;
    const textInterval = setInterval(() => {
      setLoadingText(texts[textIndex]);
      textIndex = (textIndex + 1) % texts.length;
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          background: "linear-gradient(135deg, #080808 0%, #1a0a0a 50%, #080808 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Animated Grid Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(${theme.secondary}1A 1px, transparent 1px),
              linear-gradient(90deg, ${theme.secondary}1A 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
            "@keyframes gridMove": {
              "0%": { transform: "translate(0, 0)" },
              "100%": { transform: "translate(50px, 50px)" },
            },
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              background: i % 2 === 0 ? theme.secondary : theme.primary,
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Main Loading Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Rocket Icon with Animations */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  width: "200px",
                  height: "200px",
                  border: `2px solid ${theme.secondary}`,
                  borderRadius: "50%",
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
                }}
              />

              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  width: "150px",
                  height: "150px",
                  border: `2px solid ${theme.primary}`,
                  borderRadius: "50%",
                  borderBottomColor: "transparent",
                  borderLeftColor: "transparent",
                }}
              />

              {/* Inner Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  position: "absolute",
                  width: "100px",
                  height: "100px",
                  background: `radial-gradient(circle, ${theme.secondary}4D 0%, transparent 70%)`,
                  borderRadius: "50%",
                }}
              />

              {/* Rocket Icon */}
              <RocketLaunchIcon
                sx={{
                  fontSize: "80px",
                  color: "#fff",
                  filter: `drop-shadow(0 0 20px ${theme.secondary}) drop-shadow(0 0 40px ${theme.primary})`,
                  zIndex: 1,
                }}
              />
            </Box>
          </motion.div>

          {/* Loading Text with Glitch Effect */}
          <motion.div
            key={loadingText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary}, ${theme.secondary})`,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 2s ease-in-out infinite, glitch 0.5s infinite",
                textShadow: `0 0 30px ${theme.secondary}80`,
                "@keyframes shimmer": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "50%": { backgroundPosition: "100% 50%" },
                  "100%": { backgroundPosition: "0% 50%" },
                },
                "@keyframes glitch": {
                  "0%, 100%": { transform: "translate(0)" },
                  "20%": { transform: "translate(-2px, 2px)" },
                  "40%": { transform: "translate(-2px, -2px)" },
                  "60%": { transform: "translate(2px, 2px)" },
                  "80%": { transform: "translate(2px, -2px)" },
                },
              }}
            >
              {loadingText}
            </Typography>
          </motion.div>

          {/* Progress Bar */}
          <Box
            sx={{
              width: { xs: "300px", sm: "400px", md: "500px" },
              height: "4px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              border: `1px solid ${theme.secondary}4D`,
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})`,
                borderRadius: "10px",
                boxShadow: `0 0 20px ${theme.secondary}CC`,
              }}
            />
          </Box>

          {/* Progress Percentage */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: theme.primary,
              textShadow: `0 0 30px ${theme.primary}CC`,
              fontFamily: "monospace",
            }}
          >
            {progress}%
          </Typography>

          {/* Scanning Lines Effect */}
          <motion.div
            animate={{ y: [-400, 400] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "100%",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
              boxShadow: `0 0 20px ${theme.primary}CC`,
              pointerEvents: "none",
            }}
          />
        </Box>

        {/* Bottom Text */}
        <Box
          sx={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.primary,
              fontFamily: "monospace",
              opacity: 0.7,
              animation: "blink 1s infinite",
              "@keyframes blink": {
                "0%, 100%": { opacity: 0.7 },
                "50%": { opacity: 0.3 },
              },
            }}
          >
            WELCOME TO THE FUTURE
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.secondary,
              fontFamily: "monospace",
              fontSize: "0.8rem",
            }}
          >
            Muhammad Faeiz Furqan | Full Stack Developer
          </Typography>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;

