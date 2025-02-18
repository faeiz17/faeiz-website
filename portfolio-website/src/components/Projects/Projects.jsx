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
    <Box sx={{ padding: "20px", marginBottom: "100px" }}>
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
        sx={{ marginBottom: "150px" }}
      >
        Projects
      </Typography>

      {/* Motion container with crazy animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Grid container spacing={3} justifyContent="center" padding={2}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {/* Child animation */}
              <motion.div variants={itemVariants} whileHover="hover">
                <Card
                  sx={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "5px",
                    boxShadow: "0px 10px 30px rgba(0, 204, 255, 0.2)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Box
                      color="primary"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      technology
                      {project.tech.map((tech) =>
                        techIcons[tech]?.map((icon, i) => (
                          <img
                            key={i}
                            src={icon}
                            alt={tech}
                            width="30"
                            height="30"
                          />
                        ))
                      )}
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      {project.link && (
                        <IconButton
                          component="a"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GitHub />
                        </IconButton>
                      )}
                      {project.link2 && (
                        <IconButton
                          color="info"
                          component="a"
                          href={project.link2}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Language />
                        </IconButton>
                      )}
                      {project.link3 && (
                        <IconButton
                          color="error"
                          component="a"
                          href={project.link3}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <YouTube />
                        </IconButton>
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
