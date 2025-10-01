import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";

const CarGame = () => {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'gameOver'
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(1); // 0: left, 1: center, 2: right
  const [obstacles, setObstacles] = useState([]);
  const [speed, setSpeed] = useState(0.5); // Decreased from 5 to 2 for slower traffic
  const [isJumping, setIsJumping] = useState(false);
  const gameRef = useRef(null);
  const animationFrameRef = useRef(null);

  const lanes = [15, 50, 85]; // Lane positions in percentages

  // Start game
  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setObstacles([]);
    setSpeed(0.5); // Start with slower speed (was 5)
    setPlayerPosition(1);
    setIsJumping(false);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== "playing") return;

      if (e.key === "ArrowLeft" && playerPosition > 0) {
        e.preventDefault(); // Prevent default behavior
        setPlayerPosition((prev) => prev - 1);
      } else if (e.key === "ArrowRight" && playerPosition < 2) {
        e.preventDefault(); // Prevent default behavior
        setPlayerPosition((prev) => prev + 1);
      } else if (e.key === " " && !isJumping) {
        e.preventDefault(); // Prevent spacebar from scrolling the page!
        // Spacebar to jump
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600); // Jump duration
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, playerPosition, isJumping]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = () => {
      // Move obstacles down
      setObstacles((prev) => {
        const updated = prev
          .map((obs) => ({
            ...obs,
            y: obs.y + speed,
          }))
          .filter((obs) => obs.y < 1000);

        // Check collision (very forgiving hitbox) - no collision while jumping
        updated.forEach((obs) => {
          if (
            !isJumping &&
            obs.y > 80 &&
            obs.y < 90 &&
            Math.abs(obs.lane - playerPosition) < 0.01
          ) {
            setGameState("gameOver");
          }
        });

        return updated;
      });

      // Add new obstacles
      if (Math.random() < 0.02) {
        const randomLane = Math.floor(Math.random() * 3);
        setObstacles((prev) => [
          ...prev,
          { id: Date.now(), lane: randomLane, y: -10 },
        ]);
      }

      // Increase score
      setScore((prev) => prev + 1);

      // Gradually increase speed (slower progression)
      if (score % 500 === 0 && speed < 8) {
        setSpeed((prev) => prev + 0.03);
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, speed, playerPosition, score]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >

      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s ease-in-out infinite",
            textShadow: "0 0 30px rgba(255, 0, 255, 0.5)",
            marginBottom: "20px",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            "@keyframes shimmer": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          RACE TO FUTURE WITH ME
        </Typography>
      </motion.div>

      {/* Game Container */}
      <Box
        ref={gameRef}
        sx={{
          width: { xs: "100%", sm: "400px", md: "500px" },
          height: "600px",
          position: "relative",
          border: "4px solid #ff00ff",
          borderRadius: "10px",
          background: "linear-gradient(180deg, #1a0033 0%, #0a0015 100%)",
          boxShadow: "0 0 50px rgba(255, 0, 255, 0.5), inset 0 0 50px rgba(0, 255, 255, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Road Lanes */}
        {[0, 1, 2].map((lane) => (
          <Box
            key={lane}
            sx={{
              position: "absolute",
              left: `${lanes[lane]}%`,
              top: 0,
              width: "2px",
              height: "100%",
              background: "repeating-linear-gradient(transparent, transparent 20px, #00ffff 20px, #00ffff 40px)",
              animation: "laneScroll 1s linear infinite",
              "@keyframes laneScroll": {
                "0%": { transform: "translateY(0)" },
                "100%": { transform: "translateY(40px)" },
              },
            }}
          />
        ))}

        {/* Score Display */}
        {gameState === "playing" && (
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#00ffff",
                fontWeight: "bold",
                textShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
              }}
            >
              SCORE: {score}
            </Typography>
          </Box>
        )}

        {/* Player Car (Futuristic) */}
        <AnimatePresence>
          {gameState === "playing" && (
            <motion.div
              initial={{ scale: 0, bottom: "10%" }}
              animate={{
                scale: 1,
                bottom: isJumping ? "30%" : "10%",
                rotateX: isJumping ? 15 : 0,
              }}
              transition={{
                scale: { type: "spring", duration: 0.5 },
                bottom: { type: "spring", stiffness: 400, damping: 15 },
                rotateX: { duration: 0.3 },
              }}
              style={{
                position: "absolute",
                left: `${lanes[playerPosition]}%`,
                transform: "translateX(-50%)",
                zIndex: 5,
                transition: "left 0.3s ease-out",
              }}
            >
              <DirectionsCarIcon
                sx={{
                  fontSize: "60px",
                  color: "#00ffff",
                  filter: isJumping
                    ? "drop-shadow(0 0 30px #00ffff) drop-shadow(0 0 60px #00ffff)"
                    : "drop-shadow(0 0 20px #00ffff) drop-shadow(0 0 40px #00ffff)",
                  transform: "rotate(0deg)",
                  transition: "filter 0.3s ease",
                }}
              />
              {isJumping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "rgba(0, 255, 255, 0.3)",
                    filter: "blur(5px)",
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Obstacles (Vintage Cars) */}
        {obstacles.map((obs) => (
          <motion.div
            key={obs.id}
            style={{
              position: "absolute",
              top: `${obs.y}%`,
              left: `${lanes[obs.lane]}%`,
              transform: "translateX(-50%)",
              zIndex: 4,
            }}
          >
            <TimeToLeaveIcon
              sx={{
                fontSize: "50px",
                color: "#ff6b00",
                filter: "drop-shadow(0 0 10px #ff6b00)",
                transform: "rotate(180deg)",
              }}
            />
          </motion.div>
        ))}

        {/* Start Screen */}
        {gameState === "start" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.8)",
              zIndex: 20,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#ff00ff",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
                textShadow: "0 0 20px rgba(255, 0, 255, 0.8)",
              }}
            >
              Ready to Race?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#00ffff",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              Use ← → arrow keys to move | SPACEBAR to jump
            </Typography>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                onClick={startGame}
                sx={{
                  background: "linear-gradient(90deg, #ff00ff, #00ffff)",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  padding: "15px 40px",
                  borderRadius: "30px",
                  boxShadow: "0 0 30px rgba(255, 0, 255, 0.8)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                  },
                }}
              >
                START GAME
              </Button>
            </motion.div>
          </Box>
        )}

        {/* Game Over Screen */}
        {gameState === "gameOver" && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.9)",
              zIndex: 20,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#ff073a",
                fontWeight: "bold",
                marginBottom: "20px",
                textShadow: "0 0 30px rgba(255, 7, 58, 0.8)",
                animation: "glitch 0.5s infinite",
                "@keyframes glitch": {
                  "0%, 100%": { transform: "translate(0)" },
                  "20%": { transform: "translate(-2px, 2px)" },
                  "40%": { transform: "translate(-2px, -2px)" },
                  "60%": { transform: "translate(2px, 2px)" },
                  "80%": { transform: "translate(2px, -2px)" },
                },
              }}
            >
              GAME OVER!
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "#00ffff",
                marginBottom: "30px",
                textShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
              }}
            >
              Final Score: {score}
            </Typography>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                onClick={startGame}
                sx={{
                  background: "linear-gradient(90deg, #ff00ff, #00ffff)",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  padding: "15px 40px",
                  borderRadius: "30px",
                  boxShadow: "0 0 30px rgba(255, 0, 255, 0.8)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                  },
                }}
              >
                PLAY AGAIN
              </Button>
            </motion.div>
          </motion.div>
        )}
      </Box>

      {/* Instructions */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#00ffff",
            marginTop: "20px",
            textAlign: "center",
            textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
          }}
        >
          Navigate your futuristic car through vintage traffic! Press SPACEBAR to jump!
        </Typography>
      </motion.div>
    </Box>
  );
};

export default CarGame;

