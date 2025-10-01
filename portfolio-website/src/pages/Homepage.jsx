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
function Homepage() {
  return (
    <>
      <Box
        sx={{
          overflowX: "hidden",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Animated Background Orbs */}
        <motion.div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            top: "10%",
            left: "10%",
            filter: "blur(60px)",
            zIndex: 0,
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
        <motion.div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)",
            borderRadius: "50%",
            bottom: "20%",
            right: "15%",
            filter: "blur(60px)",
            zIndex: 0,
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
              border: "4px solid rgb(255, 0, 255)",
              boxShadow: "0px 0px 30px rgb(255, 0, 255), 0px 0px 60px rgba(255, 0, 255, 0.5)",
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: "linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)",
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
              background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s ease-in-out infinite",
              textShadow: "0 0 40px rgba(255, 0, 255, 0.6)",
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
              animate={{ color: ["#ff00ff", "#00ffff", "#ffea00", "#ff00ff"] }}
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
              animate={{ color: ["#00ffff", "#ff00ff", "#00ffff"] }}
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
              animate={{ color: ["#ffea00", "#ff00ff", "#00ffff", "#ffea00"] }}
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
          marginTop: { xs: "-170px" },
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "20px", md: "40px" },
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
              background: "linear-gradient(90deg, #ff00ff, #00ffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(255, 0, 255, 0.5)",
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
              marginTop: "2rem",
              marginBottom: "2rem",
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.5rem",
                lg: "2rem",
                xl: "2.5rem",
              },
              lineHeight: "1.8",
              letterSpacing: "-0.02em",
              fontWeight: "bold",
              padding: "20px",
              maxWidth: "1200px",
              background: "rgba(10, 0, 21, 0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              border: "2px solid rgba(255, 0, 255, 0.3)",
              boxShadow: "0 0 40px rgba(255, 0, 255, 0.2)",
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
