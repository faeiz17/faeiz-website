import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { GitHub, YouTube, Language } from "@mui/icons-material";
import { motion } from "framer-motion";
import SocialDev from "../../assets/SocialDev.png";
import hebrewlearn from "../../assets/hebrewlearn.jpeg";
import BuyBye from "../../assets/BuyBye.png";
import freecs from "../../assets/freecs.png";
import expense from "../../assets/expense.png";
import PorscheWebsite from "../../assets/PorscheWebsite.png";
import wall from "../../assets/wall.png";
import car from "../../assets/car.png";
import { useTheme } from "../../context/ThemeContext";

// Crazy animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -45,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 80,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    // If you want it to wiggle indefinitely on hover, uncomment:
    // transition: { yoyo: Infinity }
  },
};

const techIcons = {
  MERN: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  ],
  "React Native": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  ],
  Expo: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  ],
  "React.js": [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  ],
  Django: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  ],
  PostgreSQL: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  ],
  Flutter: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  ],
  Firebase: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  ],
  Dart: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  ],
  JavaFX: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  ],
  Java: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  ],
};

const projects = [
  {
    title: "Social Dev",
    tech: ["MERN"],
    image: SocialDev,
    link: "https://github.com/faeiz17/socialdev-website",
    link2: "https://socialdev-website.vercel.app/",
  },
  {
    title: "Hebrew Learn",
    tech: ["React Native"],
    image: hebrewlearn,
    link: "https://github.com/faeiz17/hebrew-backend",
    link2:
      "https://drive.google.com/file/d/1YevMngQ2x7RmbNu6yU1S1u35bBPEq347/view?usp=sharing",
  },
  {
    title: "BuyBye",
    tech: ["MERN"],
    image: BuyBye,
    link: "https://github.com/faeiz17/buy-bye-frontend",
  },
  {
    title: "Free-CS",
    tech: ["React.js", "Django", "PostgreSQL"],
    image: freecs,
    link2: "https://freecs-frontend-dsqj33m6w-faeiz17s-projects.vercel.app/",
    link3: "https://youtu.be/_kzsVQS5cFk",
  },
  {
    title: "Expense Tracker",
    tech: ["MERN"],
    image: expense,
    link2: "https://expense-tracker-chi-bice-88.vercel.app/",
    link3: "https://youtu.be/SgW9Qmi2KQs",
  },
  {
    title: "Porsche Website",
    tech: ["MERN"],
    image: PorscheWebsite,
    link: "https://github.com/faeiz17/Web-Technologies",
    link3: "https://youtu.be/Srgs5GqtnZQ",
  },
  {
    title: "Wallpallete",
    tech: ["Flutter", "Firebase", "Dart"],
    image: wall,
    link: "https://github.com/faeiz17/Wall-Palette",
    link2:
      "https://www.linkedin.com/posts/muhammad-faeiz177_flutter-dart-google-activity-7160311372289847296-zZuf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEG5fswB_r2Hb1hWyiSZLdbJe1YDxgLhpww",
  },
  {
    title: "Car Dealership",
    tech: ["JavaFX"],
    image: car,
    link: "https://github.com/faeiz17/OOP-PROJECT-FA21-BCS-008",
    link3: "https://youtu.be/2-cuXVI6anA",
  },
];

function Projects() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: { xs: "40px 16px", sm: "50px 24px", md: "60px 40px" },
        position: "relative",
        overflow: "hidden",
        margin: "auto"
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
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem", lg: "3.2rem" },
            background: "linear-gradient(90deg, #8b0000, #cc0000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(139, 0, 0, 0.5)",
            marginBottom: { xs: "40px", sm: "60px", md: "80px" },
          }}
        >
          MY PROJECTS
        </Typography>
      </motion.div>

      {/* Motion container with crazy animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          justifyContent="center"
          sx={{
            margin: "0 auto",
            padding: { xs: "0", md: "0 16px" },
          }}
        >
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {/* Child animation */}
              <motion.div variants={itemVariants} whileHover="hover" style={{ height: "100%" }}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: { xs: "300px", sm: "320px", md: "340px" },
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(10, 0, 21, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid #cc0000",
                    borderRadius: { xs: "12px", md: "15px" },
                    boxShadow: "0px 0px 30px rgba(204, 0, 0, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0px 0px 50px rgba(204, 0, 0, 0.6)",
                      border: "2px solid #8b0000",
                    },
                    "@media (hover: none)": {
                      "&:active": {
                        transform: "scale(0.98)",
                        boxShadow: "0px 0px 50px rgba(204, 0, 0, 0.6)",
                        border: "2px solid #8b0000",
                      },
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      height: { xs: "140px", sm: "150px", md: "160px" },
                      borderBottom: "2px solid rgba(204, 0, 0, 0.3)",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{
                    padding: { xs: "12px", sm: "14px", md: "16px" },
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                        color: "#cc0000",
                        textShadow: "0 0 10px rgba(204, 0, 0, 0.5)",
                        lineHeight: 1.3,
                        minHeight: { xs: "auto", sm: "2.6rem" },
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                        marginBottom: "15px",
                        flexWrap: "wrap",
                      }}
                    >
                      {project.tech.map((tech) =>
                        techIcons[tech]?.map((icon, i) => (
                          <Box
                            key={i}
                            sx={{
                              padding: "8px",
                              background: "rgba(0, 255, 255, 0.1)",
                              border: "1px solid rgba(0, 255, 255, 0.3)",
                              borderRadius: "8px",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background: "rgba(255, 0, 255, 0.2)",
                                border: "1px solid rgba(255, 0, 255, 0.5)",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <img
                              src={icon}
                              alt={tech}
                              width="25"
                              height="25"
                            />
                          </Box>
                        ))
                      )}
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
                    >
                      {project.link && (
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <IconButton
                            component="a"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: "#cc0000",
                              "&:hover": {
                                color: "#8b0000",
                                filter: "drop-shadow(0 0 10px #8b0000)",
                              },
                            }}
                          >
                            <GitHub />
                          </IconButton>
                        </motion.div>
                      )}
                      {project.link2 && (
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <IconButton
                            component="a"
                            href={project.link2}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: "#ff4444",
                              "&:hover": {
                                color: "#8b0000",
                                filter: "drop-shadow(0 0 10px #8b0000)",
                              },
                            }}
                          >
                            <Language />
                          </IconButton>
                        </motion.div>
                      )}
                      {project.link3 && (
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <IconButton
                            component="a"
                            href={project.link3}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: "#ff073a",
                              "&:hover": {
                                color: "#8b0000",
                                filter: "drop-shadow(0 0 10px #8b0000)",
                              },
                            }}
                          >
                            <YouTube />
                          </IconButton>
                        </motion.div>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}

export default Projects;
