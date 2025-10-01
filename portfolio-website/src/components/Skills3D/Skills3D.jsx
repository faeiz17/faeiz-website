import React, { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Box, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import DnsIcon from "@mui/icons-material/Dns";
import CloudIcon from "@mui/icons-material/Cloud";
import BuildIcon from "@mui/icons-material/Build";

// Skills data structure
const skillsData = {
  center: {
    title: "TECHNICAL SKILLS",
    color: "#ffffff",
    position: [0, 0, 0],
  },
  categories: [
    {
      id: "frontend",
      title: "Frontend",
      color: "#ff00ff",
      Icon: CodeIcon,
      skills: ["React.js", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Material UI", "Framer Motion", "Redux"],
    },
    {
      id: "backend",
      title: "Backend",
      color: "#00ffff",
      Icon: StorageIcon,
      skills: ["Node.js", "Express.js", "Sails.js", "Django", "RESTful APIs", "GraphQL"],
    },
    {
      id: "mobile",
      title: "Mobile",
      color: "#ffea00",
      Icon: PhoneAndroidIcon,
      skills: ["React Native", "Expo", "Cross-Platform", "Native Features", "Push Notifications"],
    },
    {
      id: "database",
      title: "Database",
      color: "#ff073a",
      Icon: DnsIcon,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      color: "#00ff6a",
      Icon: CloudIcon,
      skills: ["AWS (EC2, S3, RDS)", "Git", "Docker", "CI/CD", "Vercel", "Heroku"],
    },
    {
      id: "tools",
      title: "Tools",
      color: "#ff9100",
      Icon: BuildIcon,
      skills: ["Figma", "VS Code", "Postman", "Jira", "Agile", "Scrum"],
    },
  ],
};

// 3D Node Component
function Node({ position, color, label, onClick, isActive, scale = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (isActive || hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3 * scale, 1.3 * scale, 1.3 * scale), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1 * scale, 1 * scale, 1 * scale), 0.1);
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive || hovered ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.9, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
      {(isActive || hovered) && (
        <pointLight position={[0, 0, 0]} intensity={2} color={color} distance={5} />
      )}
    </group>
  );
}

// Connection Line Component
function ConnectionLine({ start, end, color, visible }) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  if (!visible) return null;

  return (
    <line>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} linewidth={2} transparent opacity={0.6} />
    </line>
  );
}

// Main 3D Scene
function Scene({ selectedCategory, setSelectedCategory }) {
  // Calculate positions for category nodes in a circle
  const categoryPositions = useMemo(() => {
    const radius = 4;
    return skillsData.categories.map((_, index) => {
      const angle = (index / skillsData.categories.length) * Math.PI * 2;
      return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

      {/* Center Node */}
      <Node
        position={[0, 0, 0]}
        color={skillsData.center.color}
        label="SKILLS"
        scale={1.5}
        isActive={selectedCategory === null}
        onClick={() => setSelectedCategory(null)}
      />

      {/* Category Nodes */}
      {skillsData.categories.map((category, index) => (
        <React.Fragment key={category.id}>
          <Node
            position={categoryPositions[index]}
            color={category.color}
            label={category.title}
            isActive={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          />
          <ConnectionLine
            start={[0, 0, 0]}
            end={categoryPositions[index]}
            color={category.color}
            visible={true}
          />
        </React.Fragment>
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        autoRotate={selectedCategory === null}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main Component
const Skills3D = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectedCategoryData = skillsData.categories.find((cat) => cat.id === selectedCategory);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: { xs: "40px 20px", md: "60px 40px" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s ease-in-out infinite",
            textShadow: "0 0 30px rgba(255, 0, 255, 0.5)",
            marginBottom: "20px",
            position: "relative",
            zIndex: 1,
            "@keyframes shimmer": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          TECHNICAL SKILLS
        </Typography>
      </motion.div>

      <Typography
        variant="body1"
        textAlign="center"
        sx={{
          color: "#00ffff",
          marginBottom: "40px",
          fontSize: { xs: "0.9rem", md: "1.1rem" },
        }}
      >
        Click on nodes to explore | Drag to rotate | Scroll to zoom
      </Typography>

      {/* 3D Canvas */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "500px", md: "600px" },
          background: "rgba(10, 0, 21, 0.5)",
          borderRadius: "20px",
          border: "2px solid rgba(255, 0, 255, 0.3)",
          boxShadow: "0 0 50px rgba(255, 0, 255, 0.2)",
          overflow: "hidden",
          marginBottom: "40px",
        }}
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Scene selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </Canvas>
      </Box>

      {/* Skills Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedCategoryData && (
          <motion.div
            key={selectedCategoryData.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "30px",
                background: "rgba(10, 0, 21, 0.8)",
                backdropFilter: "blur(10px)",
                border: `2px solid ${selectedCategoryData.color}`,
                borderRadius: "20px",
                boxShadow: `0 0 40px ${selectedCategoryData.color}40`,
              }}
            >
              <Typography
                variant="h3"
              sx={{
                fontWeight: "bold",
                color: selectedCategoryData.color,
                textShadow: `0 0 20px ${selectedCategoryData.color}80`,
                marginBottom: "30px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <selectedCategoryData.Icon sx={{ fontSize: "2.5rem" }} />
              {selectedCategoryData.title}
            </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                {selectedCategoryData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Chip
                      label={skill}
                      sx={{
                        background: `linear-gradient(135deg, ${selectedCategoryData.color}20, ${selectedCategoryData.color}40)`,
                        color: selectedCategoryData.color,
                        border: `2px solid ${selectedCategoryData.color}`,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        padding: "20px 15px",
                        height: "auto",
                        boxShadow: `0 0 20px ${selectedCategoryData.color}40`,
                        "&:hover": {
                          boxShadow: `0 0 30px ${selectedCategoryData.color}80`,
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        )}

        {!selectedCategoryData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                color: "#ff00ff",
                fontWeight: "bold",
                textShadow: "0 0 20px rgba(255, 0, 255, 0.8)",
              }}
            >
              🎯 Click on any skill category to view details
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {skillsData.categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedCategory(category.id)}
            style={{ cursor: "pointer" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                background: selectedCategory === category.id
                  ? `${category.color}20`
                  : "rgba(10, 0, 21, 0.6)",
                border: `2px solid ${category.color}`,
                borderRadius: "30px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: `${category.color}30`,
                  boxShadow: `0 0 20px ${category.color}60`,
                },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
                {category.icon}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: category.color,
                  fontWeight: "bold",
                }}
              >
                {category.title}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Skills3D;

