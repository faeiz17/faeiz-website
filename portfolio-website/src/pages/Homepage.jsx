import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import Projects from "../components/Projects/Projects";
import Webdev from "../components/webdev/Webdev";
import Experience from "../components/Experience/Experience";
import Skills3D from "../components/Skills3D/Skills3D";
import CarGame from "../components/CarGame/CarGame";
import image from "../assets/1000108673.jpg";
import { useTheme } from "../context/ThemeContext";

function Homepage() {
  const { theme } = useTheme();
  return (
    <>
      <Box
        sx={{
          overflowX: "hidden",
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          position: "relative",
          paddingTop: { xs: "80px", md: "100px" },
          paddingX: { xs: "16px", sm: "24px", md: "40px" },
        }}
      >
        {/* Animated Background Orbs - Responsive */}
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            width: { xs: "200px", sm: "300px", md: "400px" },
            height: { xs: "200px", sm: "300px", md: "400px" },
            background: `radial-gradient(circle, ${theme.secondary}4D 0%, transparent 70%)`,
            borderRadius: "50%",
            top: "10%",
            left: { xs: "5%", md: "10%" },
            filter: { xs: "blur(40px)", md: "blur(60px)" },
            zIndex: 0,
            pointerEvents: "none",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            width: { xs: "180px", sm: "280px", md: "350px" },
            height: { xs: "180px", sm: "280px", md: "350px" },
            background: `radial-gradient(circle, ${theme.primary}4D 0%, transparent 70%)`,
            borderRadius: "50%",
            bottom: "20%",
            right: { xs: "5%", md: "15%" },
            filter: { xs: "blur(40px)", md: "blur(60px)" },
            zIndex: 0,
            pointerEvents: "none",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          style={{ zIndex: 1 }}
        >
          <Box
            sx={{
              width: {
                xs: 200,
                sm: 200,
                md: 250,
                lg: 300,
                xl: 350,
              },
              height: {
                xs: 200,
                sm: 200,
                md: 250,
                lg: 300,
                xl: 350,
              },
              borderRadius: "50%",
              overflow: "hidden",
              border: `4px solid ${theme.secondary}`,
              boxShadow: `0px 0px 30px ${theme.secondary}, 0px 0px 60px ${theme.secondary}80`,
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: `linear-gradient(45deg, ${theme.secondary}, ${theme.primary}, ${theme.secondary})`,
                borderRadius: "50%",
                zIndex: -1,
                animation: "rotate 4s linear infinite",
                "@keyframes rotate": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              },
            }}
          >
            <img
              src={image}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.2)",
              }}
            />
          </Box>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ zIndex: 1 }}
        >
          <Typography
            variant="h1"
            color="default"
            sx={(theme) => ({
              overflow: "visible",
              fontWeight: "bold",
              fontSize: {
                xs: "2rem",
                sm: "3rem",
                md: "4rem",
                lg: "5rem",
                xl: "6rem",
              },
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary}, ${theme.secondary})`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s ease-in-out infinite",
              textShadow: `0 0 40px ${theme.secondary}99`,
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
              "&:hover": {
                animation: "glitch 0.3s infinite",
                "@keyframes glitch": {
                  "0%": { transform: "translate(0)" },
                  "20%": { transform: "translate(-2px, 2px)" },
                  "40%": { transform: "translate(-2px, -2px)" },
                  "60%": { transform: "translate(2px, 2px)" },
                  "80%": { transform: "translate(2px, -2px)" },
                  "100%": { transform: "translate(0)" },
                },
              },
            })}
          >
            ~&quot;I BUILD THE FUTURE&quot;~
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ zIndex: 1 }}
        >
          <Typography
            variant="h6"
            color="default"
            sx={{
              marginTop: "20px",
              fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
            }}
          >
            <motion.span
              animate={{ color: [theme.primary, theme.accent, theme.secondary, theme.primary] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ fontWeight: "bold" }}
            >
              FULL STACK DEVELOPER
            </motion.span>{" "}
            <span>
              <Typography variant="h6" color="error" display="inline">
                |{" "}
              </Typography>
            </span>
            <motion.span
              animate={{ color: [theme.primary, theme.secondary, theme.primary] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontWeight: "bold" }}
            >
              MERN EXPERT
            </motion.span>{" "}
            <span>
              <Typography variant="h6" color="error" display="inline">
                |
              </Typography>
            </span>{" "}
            <motion.span
              animate={{ color: [theme.accent, theme.secondary, theme.primary, theme.accent] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ fontWeight: "bold" }}
            >
              MOBILE APP DEVELOPER
            </motion.span>
          </Typography>
        </motion.div>
      </Box>

      <Box
        id="about"
        sx={{
          marginTop: { xs: "-100px", sm: "-120px", md: "-150px" },
          minHeight: { xs: "50vh", md: "60vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "16px", sm: "24px", md: "40px" },
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 1 }}
        >
          <Typography
            variant="h2"
            color="default"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 30px ${theme.secondary}80`,
              marginBottom: "40px",
            }}
          >
            ABOUT ME
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h4"
            color="default"
            sx={{
              textAlign: "center",
              marginTop: { xs: "1rem", md: "2rem" },
              marginBottom: { xs: "1rem", md: "2rem" },
              fontSize: {
                xs: "0.9rem",
                sm: "1.1rem",
                md: "1.4rem",
                lg: "1.8rem",
                xl: "2.2rem",
              },
              lineHeight: { xs: "1.6", md: "1.8" },
              letterSpacing: "-0.02em",
              fontWeight: "bold",
              padding: { xs: "16px", sm: "20px", md: "30px" },
              maxWidth: "1200px",
              width: "100%",
              marginX: "auto",
              background: "rgba(10, 0, 21, 0.7)",
              backdropFilter: "blur(15px)",
              borderRadius: { xs: "15px", md: "20px" },
              border: `2px solid ${theme.secondary}4D`,
              boxShadow: `0 0 40px ${theme.secondary}33, inset 0 0 60px ${theme.secondary}0D`,
            }}
          >
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer with 1.5 years of hands-on experience in MERN stack and mobile app development",
                  "Currently working at Dubizzle Labs/Bayut and Seven Stacks, building cutting-edge applications",
                  "Skilled in React Native, Next.js, Node.js, AWS, and creating seamless user experiences",
                  "Passionate about building scalable solutions that make a real-world impact",
                ],
                cursor: "|",
                delay: 50,
                autoStart: true,
                loop: true,
                contentType: "text",
              }}
            />
          </Typography>
        </motion.div>
      </Box>
      {/* ✅ Experience Section */}
      <Box id="experience">
        <Experience />
      </Box>

      {/* ✅ Skills Section - 3D Interactive */}
      <Box id="skills">
        <Skills3D />
      </Box>
      {/* ✅ Projects Section */}
      <Box id="projects">
        <Projects />
      </Box>

      {/* ✅ Car Game Section */}
      <Box id="cargame">
        <CarGame />
      </Box>
    </>
  );
}

export default Homepage;
