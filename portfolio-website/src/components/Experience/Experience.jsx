import React from "react";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "../../context/ThemeContext";

const getExperiences = (theme) => [
  {
    company: "Dubizzle Labs / Bayut",
    position: "Associate Software Engineer",
    location: "Lahore, Pakistan",
    duration: "July 2025 – Present",
    description: [
      "Contributed to the Bayut portfolio app using React Native (Expo), implementing advanced UI components and Instagram story-like features for property postings to enhance user engagement and interactivity.",
      "Collaborated with cross-functional teams to handle event tracking, optimize performance, and deliver polished user interfaces, ensuring a seamless and intuitive user experience across the application.",
    ],
    tech: ["React Native", "Expo", "Event Tracking", "UI/UX"],
    color: theme.accent,
  },
  {
    company: "Seven Stacks",
    position: "Associate Software Engineer",
    location: "Lahore, Pakistan",
    duration: "February 2025 – July 2025",
    description: [
      "Developed and maintained a full-stack web application using Next.js on the frontend and Sails.js on the backend",
      "Worked extensively with AWS services, including EC2, S3, and RDS, collaborated closely with QA and design teams to resolve production issues, improve UX, and ship stable releases on tight deadlines.",
    ],
    tech: ["Next.js", "Sails.js", "AWS", "EC2", "S3", "RDS"],
    color: theme.primary,
  },
  {
    company: "SocialDev",
    position: "Software Engineer (Part-Time)",
    location: "Cyprus",
    duration: "October 2024 – July 2025",
    description: [
      "Designed and developed the company's portfolio website, ensuring responsive and user-friendly design.",
      "Built an open-source mobile application, HebrewLearn, using React Native (Expo) for cross-platform language learning solutions.",
    ],
    tech: ["React Native", "Expo", "Web Design", "Open Source"],
    color: theme.accent,
  },
  {
    company: "Arbisoft",
    position: "React.js Intern",
    location: "Lahore, Pakistan",
    duration: "June 2024 – August 2024",
    description: [
      "Developed a full-fledged expense tracker using the MERN stack (MongoDB, Express, React, Node.js).",
      "Contributed to an open-source educational website, integrating React.js with Django to provide free CS resources.",
    ],
    tech: ["React.js", "MongoDB", "Express", "Node.js", "Django"],
    color: theme.secondary,
  },
];

const Experience = () => {
  const { theme } = useTheme();
  const experiences = getExperiences(theme);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

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
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem", lg: "3.2rem" },
            background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 30px ${theme.secondary}80`,
            marginBottom: { xs: "30px", md: "60px" },
            position: "relative",
            zIndex: 1,
          }}
        >
          PROFESSIONAL EXPERIENCE
        </Typography>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                sx={{
                  marginBottom: "30px",
                  background: "rgba(10, 0, 21, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: `2px solid ${exp.color}`,
                  borderRadius: "15px",
                  boxShadow: `0 0 30px ${exp.color}40`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: `0 0 50px ${exp.color}80`,
                  },
                }}
              >
                <CardContent sx={{ padding: { xs: "16px", sm: "20px", md: "30px" } }}>
                  {/* Company Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <WorkIcon sx={{ color: exp.color, fontSize: "30px" }} />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.6rem" },
                        color: exp.color,
                        textShadow: `0 0 15px ${exp.color}80`,
                      }}
                    >
                      {exp.company}
                    </Typography>
                  </Box>

                  {/* Position */}
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: { xs: "1rem", sm: "1.15rem", md: "1.3rem" },
                      marginBottom: "10px",
                    }}
                  >
                    {exp.position}
                  </Typography>

                  {/* Location & Duration */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <LocationOnIcon sx={{ color: theme.primary, fontSize: "20px" }} />
                      <Typography variant="body2" sx={{ color: theme.primary }}>
                        {exp.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <CalendarTodayIcon sx={{ color: theme.accent, fontSize: "20px" }} />
                      <Typography variant="body2" sx={{ color: theme.accent }}>
                        {exp.duration}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Box sx={{ marginBottom: "20px" }}>
                    {exp.description.map((desc, i) => (
                      <Typography
                        key={i}
                        variant="body1"
                        sx={{
                          color: "#fff",
                          marginBottom: "10px",
                          lineHeight: 1.8,
                          "&:before": {
                            content: '"▸ "',
                            color: exp.color,
                            fontWeight: "bold",
                          },
                        }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  </Box>

                  {/* Technologies */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {exp.tech.map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Chip
                          label={tech}
                          sx={{
                            background: `linear-gradient(90deg, ${exp.color}20, ${exp.color}40)`,
                            color: exp.color,
                            border: `1px solid ${exp.color}`,
                            fontWeight: "bold",
                            fontSize: "0.85rem",
                            boxShadow: `0 0 10px ${exp.color}40`,
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};

export default Experience;

