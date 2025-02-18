/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box, Typography } from "@mui/material";

function Model({ path, scale, position }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} />;
}

function AppDevelopment() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      {/* ✅ Section Title */}
      <Typography
        variant="h3"
        color="success"
        sx={{
          marginBottom: "40px",
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        App Development
      </Typography>

      {/* ✅ Models Container (Responsive) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile
          gap: { xs: "40px", md: "80px" }, // Adjust spacing
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* ✅ iPhone Model */}
        <Box
          sx={{
            width: { xs: "250px", md: "350px" },
            height: { xs: "400px", md: "500px" },
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center", marginBottom: "10px" }}
          >
            iPhone
          </Typography>
          <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [0, 0, 10], fov: 50 }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
            <Suspense fallback={null}>
              <Model
                path="/models/iphone_15_pro_max.glb"
                scale={[1.5, 1.5, 1.5]} // Adjust scale for mobile
                position={[0, -0.5, 0]}
              />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </Box>

        {/* ✅ Samsung Model */}
        <Box
          sx={{
            width: { xs: "250px", md: "350px" },
            height: { xs: "400px", md: "500px" },
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center", marginBottom: "10px" }}
          >
            Samsung
          </Typography>
          <Canvas
            style={{ width: "100%", height: "100%" }}
            camera={{ position: [0, 0, 15], fov: 50 }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
            <Suspense fallback={null}>
              <Model
                path="/models/samsung_s25_ultra_free.glb"
                scale={[1.5, 1.5, 1.5]} // Adjust scale for mobile
                position={[0, -0.5, 0]}
              />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </Box>
      </Box>

      {/* ✅ Description Below Models */}
      <Typography
        variant="h6"
        textAlign="center"
        color="success"
        sx={{
          margin: "50px",
          marginBottom: "1px",
          fontSize: {
            xs: "1.2rem",
            sm: "1.5rem",
            md: "1.8rem",
            lg: "2.2rem",
          }, // Responsive font size
        }}
      >
        We create seamless and powerful applications for both iOS and Android,
        ensuring high performance and an intuitive user experience.
      </Typography>
    </Box>
  );
}

export default AppDevelopment;
