import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import BoltIcon from "@mui/icons-material/Bolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ShieldIcon from "@mui/icons-material/Shield";
import TimerIcon from "@mui/icons-material/Timer";
import StarRateIcon from "@mui/icons-material/StarRate";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import { useTheme } from "../../context/ThemeContext";

// Different obstacle types with varying speeds and points
const OBSTACLE_TYPES = [
  { icon: TimeToLeaveIcon, color: "var(--color-accent-primary)", speedMod: 1, points: 10, name: "car" },
  { icon: LocalShippingIcon, color: "var(--color-accent-secondary)", speedMod: 0.7, points: 15, name: "truck" },
  { icon: TwoWheelerIcon, color: "var(--color-accent-tertiary)", speedMod: 1.3, points: 5, name: "bike" },
];

// Power-up types (using icon components instead of emojis)
// Power-up types (using icon components instead of emojis)
const POWERUP_TYPES = [
  { type: "shield", icon: ShieldIcon, duration: 5000 },
  { type: "slowmo", icon: TimerIcon, duration: 3000 },
  { type: "doublePoints", icon: StarRateIcon, duration: 5000 },
];

const CarGame = () => {
  const { theme } = useTheme();
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("carGameHighScore");
    return saved ? parseInt(saved) : 0;
  });
  const [playerPosition, setPlayerPosition] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [speed, setSpeed] = useState(1);
  const [isJumping, setIsJumping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [activePowerUp, setActivePowerUp] = useState(null);
  const [level, setLevel] = useState(1);
  const [dodgedCount, setDodgedCount] = useState(0);
  const [isInvincible, setIsInvincible] = useState(false);
  const [screenShake, setScreenShake] = useState(false);

  const gameRef = useRef(null);
  const animationFrameRef = useRef(null);
  const touchStartRef = useRef(null);
  const lastObstacleTimeRef = useRef(0);
  const lastPowerUpTimeRef = useRef(0);
  const scoreRef = useRef(0);

  const lanes = [18, 50, 82];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    scoreRef.current = 0;
    setObstacles([]);
    setPowerUps([]);
    setSpeed(1);
    setPlayerPosition(1);
    setIsJumping(false);
    setLives(3);
    setCombo(0);
    setLevel(1);
    setDodgedCount(0);
    setActivePowerUp(null);
    setIsInvincible(false);
    lastObstacleTimeRef.current = 0;
    lastPowerUpTimeRef.current = 0;
  }, []);

  // Handle collision
  const handleCollision = useCallback(() => {
    if (activePowerUp?.type === "shield" || isInvincible) {
      return; // Protected!
    }

    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 300);

    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        // Game Over
        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current);
          localStorage.setItem("carGameHighScore", scoreRef.current.toString());
        }
        setGameState("gameOver");
      } else {
        // Brief invincibility
        setIsInvincible(true);
        setTimeout(() => setIsInvincible(false), 2000);
      }
      return newLives;
    });
    setCombo(0);
  }, [activePowerUp, isInvincible, highScore]);

  // Collect power-up
  const collectPowerUp = useCallback((powerUp) => {
    setActivePowerUp(powerUp);
    setTimeout(() => {
      setActivePowerUp(null);
    }, powerUp.duration);
  }, []);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || gameState !== "playing") return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStartRef.current;

    if (Math.abs(diff) > 40) {
      if (diff > 0 && playerPosition < 2) {
        setPlayerPosition((prev) => prev + 1);
      } else if (diff < 0 && playerPosition > 0) {
        setPlayerPosition((prev) => prev - 1);
      }
    }
    touchStartRef.current = null;
  };

  const handleJump = useCallback(() => {
    if (!isJumping && gameState === "playing") {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  }, [isJumping, gameState]);

  const moveLeft = useCallback(() => {
    if (playerPosition > 0 && gameState === "playing") {
      setPlayerPosition((prev) => prev - 1);
    }
  }, [playerPosition, gameState]);

  const moveRight = useCallback(() => {
    if (playerPosition < 2 && gameState === "playing") {
      setPlayerPosition((prev) => prev + 1);
    }
  }, [playerPosition, gameState]);

  // Keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== "playing") return;

      if (e.key === "ArrowLeft" && playerPosition > 0) {
        e.preventDefault();
        setPlayerPosition((prev) => prev - 1);
      } else if (e.key === "ArrowRight" && playerPosition < 2) {
        e.preventDefault();
        setPlayerPosition((prev) => prev + 1);
      } else if ((e.key === " " || e.key === "ArrowUp") && !isJumping) {
        e.preventDefault();
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState, playerPosition, isJumping]);

  // Main game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    let lastTime = performance.now();
    const currentSpeed = activePowerUp?.type === "slowmo" ? speed * 0.5 : speed;

    const gameLoop = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = currentTime;

      // Move obstacles
      setObstacles((prev) => {
        const updated = prev
          .map((obs) => ({
            ...obs,
            y: obs.y + currentSpeed * obs.speedMod * 0.8 * deltaTime,
          }))
          .filter((obs) => {
            // Check if passed player successfully
            if (obs.y > 95 && !obs.counted) {
              const pointMultiplier = activePowerUp?.type === "doublePoints" ? 2 : 1;
              const comboMultiplier = 1 + combo * 0.1;
              const points = Math.floor(obs.points * pointMultiplier * comboMultiplier);
              setScore((s) => {
                const newScore = s + points;
                scoreRef.current = newScore;
                return newScore;
              });
              setDodgedCount((d) => d + 1);
              setCombo((c) => Math.min(c + 1, 10));
              obs.counted = true;
            }
            return obs.y < 110;
          });

        // Check collision
        updated.forEach((obs) => {
          if (
            !isJumping &&
            !obs.hit &&
            obs.y > 75 &&
            obs.y < 92 &&
            Math.abs(obs.lane - playerPosition) < 0.5
          ) {
            obs.hit = true;
            handleCollision();
          }
        });

        return updated;
      });

      // Move power-ups
      setPowerUps((prev) => {
        const updated = prev
          .map((pu) => ({
            ...pu,
            y: pu.y + currentSpeed * 0.6 * deltaTime,
          }))
          .filter((pu) => pu.y < 110);

        // Check power-up collection
        updated.forEach((pu) => {
          if (
            !pu.collected &&
            pu.y > 75 &&
            pu.y < 95 &&
            Math.abs(pu.lane - playerPosition) < 0.5
          ) {
            pu.collected = true;
            collectPowerUp(pu);
          }
        });

        return updated.filter((pu) => !pu.collected);
      });

      // Spawn new obstacles
      const obstacleSpawnRate = Math.max(800 - level * 50, 400);
      if (currentTime - lastObstacleTimeRef.current > obstacleSpawnRate) {
        const obstacleType = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
        const numObstacles = level >= 5 ? (Math.random() > 0.7 ? 2 : 1) : 1;
        const usedLanes = [];

        for (let i = 0; i < numObstacles; i++) {
          let randomLane;
          do {
            randomLane = Math.floor(Math.random() * 3);
          } while (usedLanes.includes(randomLane));
          usedLanes.push(randomLane);

          setObstacles((prev) => [
            ...prev,
            {
              id: Date.now() + i,
              lane: randomLane,
              y: -15,
              ...obstacleType,
              speedMod: obstacleType.speedMod + (level - 1) * 0.1,
            },
          ]);
        }
        lastObstacleTimeRef.current = currentTime;
      }

      // Spawn power-ups (rare)
      if (currentTime - lastPowerUpTimeRef.current > 8000 && Math.random() > 0.7) {
        const powerUpType = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
        const randomLane = Math.floor(Math.random() * 3);
        setPowerUps((prev) => [
          ...prev,
          {
            id: Date.now(),
            lane: randomLane,
            y: -15,
            ...powerUpType,
          },
        ]);
        lastPowerUpTimeRef.current = currentTime;
      }

      // Level progression
      if (dodgedCount > 0 && dodgedCount % 15 === 0 && level < 10) {
        setLevel((l) => Math.min(l + 1, 10));
        setSpeed((s) => Math.min(s + 0.15, 3));
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    gameState,
    speed,
    playerPosition,
    isJumping,
    handleCollision,
    collectPowerUp,
    combo,
    level,
    dodgedCount,
    activePowerUp,
  ]);

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
        padding: { xs: "16px", md: "20px" },
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
            background: "linear-gradient(90deg, var(--color-accent-secondary), var(--color-accent-primary), var(--color-accent-secondary))",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s ease-in-out infinite",
            textShadow: "0 0 30px var(--color-accent-ghost)",
            marginBottom: { xs: "10px", md: "20px" },
            fontSize: { xs: "1.6rem", sm: "2.2rem", md: "3rem" },
            textAlign: "center",
            "@keyframes shimmer": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          NEON RACER
        </Typography>
      </motion.div>

      {/* Stats Bar */}
      {gameState === "playing" && (
        <Box
          sx={{
            display: "flex",
            gap: { xs: "8px", md: "15px" },
            marginBottom: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Chip
            icon={<FavoriteIcon sx={{ color: "var(--color-accent-tertiary) !important" }} />}
            label={`${lives}`}
            sx={{
              background: "var(--color-bg-subtle)",
              border: "1px solid var(--color-accent-tertiary)",
              color: "var(--color-accent-tertiary)",
              fontWeight: "bold",
            }}
          />
          <Chip
            icon={<StarIcon sx={{ color: "var(--color-accent-primary) !important" }} />}
            label={`Lv.${level}`}
            sx={{
              background: "var(--color-bg-subtle)",
              border: "1px solid var(--color-accent-primary)",
              color: "var(--color-text-primary)",
              fontWeight: "bold",
            }}
          />
          <Chip
            icon={<BoltIcon sx={{ color: "var(--color-accent-secondary) !important" }} />}
            label={`x${combo}`}
            sx={{
              background: "var(--color-bg-subtle)",
              border: "1px solid var(--color-accent-secondary)",
              color: "var(--color-accent-secondary)",
              fontWeight: "bold",
            }}
          />
          {activePowerUp && (() => {
            const PowerUpIcon = activePowerUp.icon;
            return (
              <Chip
                icon={<PowerUpIcon sx={{ color: `${activePowerUp.color} !important` }} />}
                label={activePowerUp.type}
                sx={{
                  background: `var(--color-bg-subtle)`,
                  border: `2px solid ${activePowerUp.color}`,
                  color: "var(--color-text-primary)",
                  animation: "pulse 0.5s infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                  },
                }}
              />
            );
          })()}
        </Box>
      )}

      {/* Game Container */}
      <Box
        ref={gameRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{
          width: { xs: "100%", sm: "380px", md: "450px" },
          maxWidth: "100%",
          height: { xs: "400px", sm: "500px", md: "550px" },
          position: "relative",
          border: "4px solid var(--color-border-strong)",
          borderRadius: "var(--radius-theme-xl)",
          background: "var(--color-bg-base)",
          boxShadow: `var(--shadow-theme-xl), inset 0 0 80px var(--color-bg-subtle)`,
          overflow: "hidden",
          touchAction: "none",
          userSelect: "none",
          transform: screenShake ? "translateX(5px)" : "none",
          transition: "transform 0.05s",
        }}
      >
        {/* Road with animated lines */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                var(--color-bg-subtle) 40px,
                var(--color-bg-subtle) 42px
              )
            `,
            animation: `roadScroll ${2 / speed}s linear infinite`,
            "@keyframes roadScroll": {
              "0%": { backgroundPositionY: "0px" },
              "100%": { backgroundPositionY: "42px" },
            },
          }}
        />

        {/* Lane dividers */}
        {[0, 1].map((i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              left: `${33.3 + i * 33.3}%`,
              top: 0,
              width: "3px",
              height: "100%",
              background: `repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 20px,
                var(--color-border-muted) 20px,
                var(--color-border-muted) 40px
              )`,
              animation: `laneScroll ${1 / speed}s linear infinite`,
              "@keyframes laneScroll": {
                "0%": { backgroundPositionY: "0px" },
                "100%": { backgroundPositionY: "40px" },
              },
            }}
          />
        ))}

        {/* Score Display */}
        {gameState === "playing" && (
          <Box
            sx={{
              position: "absolute",
              top: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "var(--color-accent-primary)",
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                textShadow: "0 0 20px var(--color-accent-ghost)",
              }}
            >
              {score.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "var(--color-text-secondary)", fontSize: "0.7rem" }}
            >
              HIGH: {highScore.toLocaleString()}
            </Typography>
          </Box>
        )}

        {/* Player Car */}
        <AnimatePresence>
          {gameState === "playing" && (
            <motion.div
              initial={{ scale: 0, bottom: "10%" }}
              animate={{
                scale: 1,
                bottom: isJumping ? "25%" : "12%",
                rotateX: isJumping ? 20 : 0,
              }}
              transition={{
                scale: { type: "spring", duration: 0.3 },
                bottom: { type: "spring", stiffness: 500, damping: 20 },
              }}
              style={{
                position: "absolute",
                left: `${lanes[playerPosition]}%`,
                transform: "translateX(-50%)",
                zIndex: 5,
                transition: "left 0.15s ease-out",
              }}
            >
              <DirectionsCarIcon
                sx={{
                  fontSize: { xs: "50px", md: "60px" },
                  color: isInvincible
                    ? activePowerUp?.type === "shield"
                      ? theme.primary
                      : theme.accent
                    : theme.primary,
                  filter: isJumping
                    ? `drop-shadow(0 0 40px ${theme.primary}) drop-shadow(0 0 80px ${theme.primary})`
                    : isInvincible
                      ? `drop-shadow(0 0 30px ${theme.accent})`
                      : `drop-shadow(0 0 20px ${theme.primary})`,
                  animation: isInvincible ? "blink 0.2s infinite" : "none",
                  "@keyframes blink": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.4 },
                  },
                }}
              />
              {/* Jump shadow */}
              {isJumping && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "50px",
                    height: "15px",
                    borderRadius: "50%",
                    background: `${theme.primary}4D`,
                    filter: "blur(8px)",
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Obstacles */}
        {obstacles.map((obs) => {
          const IconComponent = obs.icon;
          // Dynamically determine color based on obstacle type and theme
          let obsColor = theme.primary;
          if (obs.name === "car") obsColor = theme.primary;
          if (obs.name === "truck") obsColor = theme.secondary;
          if (obs.name === "bike") obsColor = theme.accent;

          return (
            <motion.div
              key={obs.id}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: obs.hit ? 0.3 : 1 }}
              style={{
                position: "absolute",
                top: `${obs.y}%`,
                left: `${lanes[obs.lane]}%`,
                transform: "translateX(-50%)",
                zIndex: 4,
              }}
            >
              <IconComponent
                sx={{
                  fontSize: obs.name === "truck" ? "55px" : obs.name === "bike" ? "40px" : "45px",
                  color: obsColor,
                  filter: `drop-shadow(0 0 15px ${obsColor})`,
                  transform: "rotate(180deg)",
                }}
              />
            </motion.div>
          );
        })}

        {/* Power-ups */}
        {powerUps.map((pu) => (
          <motion.div
            key={pu.id}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.5, repeat: Infinity },
            }}
            style={{
              position: "absolute",
              top: `${pu.y}%`,
              left: `${lanes[pu.lane]}%`,
              transform: "translateX(-50%)",
              zIndex: 6,
            }}
          >
            {(() => {
              const PowerUpIcon = pu.icon;
              let puColor = theme.primary;
              if (pu.type === "shield") puColor = theme.primary;
              if (pu.type === "slowmo") puColor = theme.secondary;
              if (pu.type === "doublePoints") puColor = theme.accent;
              return <PowerUpIcon sx={{ fontSize: "35px", color: puColor }} />;
            })()}
          </motion.div>
        ))}

        {/* Start Screen */}
        {gameState === "start" && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--color-bg-base)",
              opacity: 0.95,
              zIndex: 20,
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "var(--color-accent-secondary)",
                fontWeight: "bold",
                marginBottom: "10px",
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "2rem" },
                textShadow: `0 0 20px var(--color-accent-ghost)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px"
              }}
            >
              <SportsMotorsportsIcon sx={{ fontSize: "inherit" }} /> NEON RACER
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "var(--color-accent-primary)", marginBottom: "5px", textAlign: "center" }}
            >
              High Score: {highScore.toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text-secondary)",
                marginBottom: "20px",
                textAlign: "center",
                fontSize: "0.8rem",
              }}
            >
              {isMobile ? "Swipe or tap buttons to move" : "← → to move | SPACE to jump"}
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" }}>
              <Chip icon={<ShieldIcon />} label="Shield" size="small" sx={{ color: "var(--color-accent-primary)", borderColor: "var(--color-accent-primary)", "& .MuiChip-icon": { color: "var(--color-accent-primary)" } }} variant="outlined" />
              <Chip icon={<TimerIcon />} label="Slow-Mo" size="small" sx={{ color: "var(--color-accent-secondary)", borderColor: "var(--color-accent-secondary)", "& .MuiChip-icon": { color: "var(--color-accent-secondary)" } }} variant="outlined" />
              <Chip icon={<StarRateIcon />} label="2x Points" size="small" sx={{ color: "var(--color-accent-tertiary)", borderColor: "var(--color-accent-tertiary)", "& .MuiChip-icon": { color: "var(--color-accent-tertiary)" } }} variant="outlined" />
            </Box>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                onClick={startGame}
                sx={{
                  background: `linear-gradient(90deg, var(--color-accent-secondary), var(--color-accent-primary))`,
                  color: "var(--color-bg-base)",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  padding: "12px 35px",
                  borderRadius: "30px",
                  boxShadow: `0 0 30px var(--color-accent-ghost)`,
                  "&:hover": {
                    background: `linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary))`,
                  },
                }}
              >
                START RACING
              </Button>
            </motion.div>
          </Box>
        )}

        {/* Game Over Screen */}
        {gameState === "gameOver" && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.9)",
              zIndex: 20,
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.accent,
                fontWeight: "bold",
                marginBottom: "10px",
                textShadow: `0 0 30px ${theme.accent}CC`,
                animation: "glitch 0.3s infinite",
                fontSize: { xs: "1.5rem", md: "2rem" },
                "@keyframes glitch": {
                  "0%, 100%": { transform: "translate(0)" },
                  "25%": { transform: "translate(-2px, 2px)" },
                  "75%": { transform: "translate(2px, -2px)" },
                },
              }}
            >
              GAME OVER
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: theme.primary,
                marginBottom: "5px",
                textShadow: `0 0 20px ${theme.primary}CC`,
              }}
            >
              Score: {score.toLocaleString()}
            </Typography>
            {score >= highScore && score > 0 && (
              <Typography
                sx={{
                  color: theme.accent,
                  marginBottom: "10px",
                  fontWeight: "bold",
                  animation: "pulse 0.5s infinite",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px"
                }}
              >
                <EmojiEventsIcon /> NEW HIGH SCORE! <EmojiEventsIcon />
              </Typography>
            )}
            <Typography variant="body2" sx={{ color: "#aaa", marginBottom: "20px" }}>
              Level {level} | Dodged: {dodgedCount}
            </Typography>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                onClick={startGame}
                sx={{
                  background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})`,
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  padding: "12px 30px",
                  borderRadius: "30px",
                  boxShadow: `0 0 30px ${theme.secondary}CC`,
                }}
              >
                PLAY AGAIN
              </Button>
            </motion.div>
          </motion.div>
        )}
      </Box>

      {/* Mobile Controls */}
      {isMobile && gameState === "playing" && (
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            marginTop: "15px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onTouchStart={moveLeft}
            onClick={moveLeft}
            sx={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.primary}33, ${theme.primary}66)`,
              border: `3px solid ${theme.primary}`,
              color: theme.primary,
              fontSize: "1.6rem",
              minWidth: "unset",
              boxShadow: `0 0 20px ${theme.primary}66`,
              "&:active": { transform: "scale(0.9)", background: `${theme.primary}66` },
            }}
          >
            ←
          </Button>
          <Button
            onTouchStart={handleJump}
            onClick={handleJump}
            sx={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              background: isJumping
                ? `linear-gradient(135deg, ${theme.secondary}80, ${theme.secondary}B3)`
                : `linear-gradient(135deg, ${theme.secondary}33, ${theme.secondary}66)`,
              border: `3px solid ${theme.secondary}`,
              color: theme.secondary,
              fontSize: "0.85rem",
              fontWeight: "bold",
              minWidth: "unset",
              boxShadow: `0 0 30px ${theme.secondary}80`,
              "&:active": { transform: "scale(0.9)" },
            }}
          >
            JUMP
          </Button>
          <Button
            onTouchStart={moveRight}
            onClick={moveRight}
            sx={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.primary}33, ${theme.primary}66)`,
              border: `3px solid ${theme.primary}`,
              color: theme.primary,
              fontSize: "1.6rem",
              minWidth: "unset",
              boxShadow: `0 0 20px ${theme.primary}66`,
              "&:active": { transform: "scale(0.9)", background: `${theme.primary}66` },
            }}
          >
            →
          </Button>
        </Box>
      )}

      {/* Instructions */}
      <Typography
        variant="body2"
        sx={{
          color: "#888",
          marginTop: "15px",
          textAlign: "center",
          fontSize: { xs: "0.75rem", md: "0.85rem" },
          paddingX: "16px",
        }}
      >
        Dodge traffic, collect power-ups, beat your high score!
      </Typography>
    </Box>
  );
};

export default CarGame;
