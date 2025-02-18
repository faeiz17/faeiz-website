import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Typewriter from "typewriter-effect";
import UiUx from "../components/Projects/Projects";
import Webdev from "../components/webdev/Webdev";
import AppDevelopment from "../components/App dev/AppDevelopment";
import CustomSolutions from "../components/Custom Solutions/CustomSolutions";
import OurTeam from "../components/Our Team/OurTeam";
import Projects from "../components/Projects/Projects";
import vid from "../assets/vid.mp4";
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
        }}
      >
        <Box
          sx={{
            width: {
              xs: 200,
              sm: 200,
              md: 250,
              lg: 300,
              xl: 350,
            }, // Adjust size
            height: {
              xs: 200,
              sm: 200,
              md: 250,
              lg: 300,
              xl: 350,
            },
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid rgb(255, 0, 0)", // Cyberpunk Neon Border
            boxShadow: "0px 0px 15px rgb(173, 0, 0)",
          }}
        >
          <video
            src={vid} // Update with your video file
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

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
            background: `linear-gradient(90deg, ${theme.palette.secondary.light} 50%, ${theme.palette.text.primary} 50%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "background-position 0.5s ease-in-out",
            "&:hover": {
              backgroundPosition: "0 0",
            },
          })}
        >
          ~&quot;I build the future&quot;~
        </Typography>
        <Typography variant="h6" color="default">
          MERN EXPERT{" "}
          <span>
            <Typography variant="h6" color="error" display="inline">
              |{" "}
            </Typography>
          </span>
          APP DEVELOPER{" "}
          <span>
            <Typography variant="h6" color="error" display="inline">
              |
            </Typography>
          </span>{" "}
          SOFTWARE ENGINEER
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: {
            xs: "-170px",
          },
        }}
      >
        <Typography variant="h2" color="default" textAlign="center">
          ABOUT ME
        </Typography>

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
            lineHeight: "1.5",
            letterSpacing: "-0.02em",
            fontWeight: "bold",
            padding: "20px",
          }}
        >
          <Typewriter
            options={{
              strings: [
                "I am a full-stack developer who enjoys building functional and user-friendly web applications.",
                "With experience in both frontend and backend, I create solutions that are efficient and scalable.",
                "I work with technologies like React, Node.js, Express, and MongoDB to bring ideas to life.",
              ],
              cursor: "|",
              delay: 50,
              autoStart: true,
              loop: true,
              contentType: "text",
            }}
          />
        </Typography>
      </Box>
      {/* ✅ Assign IDs for Smooth Scrolling */}

      <Box id="webdev">
        <Webdev />
      </Box>
      <Box id="uiux">
        <Projects />
      </Box>
    </>
  );
}

export default Homepage;
