import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CloudIcon from "@mui/icons-material/Cloud";
import BrushIcon from "@mui/icons-material/Brush";
import BuildIcon from "@mui/icons-material/Build";
import { useTheme } from "../../context/ThemeContext";

const getSkillCategories = (theme) => [
  {
    title: "Frontend",
    icon: <CodeIcon sx={{ fontSize: "50px" }} />,
    skills: ["React.js", "Next.js", "React Native", "JavaScript", "HTML/CSS", "Tailwind CSS", "Material UI", "Framer Motion"],
    color: theme.secondary,
  },
  {
    title: "Backend",
    icon: <StorageIcon sx={{ fontSize: "50px" }} />,
    skills: ["Node.js", "Express.js", "Sails.js", "Django", "RESTful APIs", "GraphQL"],
    color: theme.primary,
  },
  {
    title: "Mobile Development",
    icon: <PhoneAndroidIcon sx={{ fontSize: "50px" }} />,
    skills: ["React Native", "Expo", "Cross-Platform", "Native Features", "Push Notifications"],
    color: theme.accent,
  },
  {
    title: "Databases",
    icon: <StorageIcon sx={{ fontSize: "50px" }} />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
    color: theme.secondary,
  },
  {
    title: "Cloud & DevOps",
    icon: <CloudIcon sx={{ fontSize: "50px" }} />,
    skills: ["AWS (EC2, S3, RDS)", "Git", "Docker", "CI/CD", "Vercel", "Heroku"],
    color: theme.primary,
  },
  {
    title: "Tools & Others",
    icon: <BrushIcon sx={{ fontSize: "50px" }} />,
    skills: ["Figma", "VS Code", "Postman", "Jira", "Agile", "Scrum"],
    color: theme.accent,
  },
];

const Skills = () => {
  const { theme } = useTheme();
  const skillCategories = getSkillCategories(theme);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
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
            background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary}, ${theme.secondary})`,
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s ease-in-out infinite",
            textShadow: `0 0 30px ${theme.secondary}80`,
            marginBottom: "60px",
            position: "relative",
            zIndex: 1,
            "@keyframes shimmer": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          ⚡ TECHNICAL SKILLS ⚡
        </Typography>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    height: "100%",
                    background: "rgba(10, 0, 21, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: `2px solid ${category.color}`,
                    borderRadius: "20px",
                    boxShadow: `0 0 30px ${category.color}40`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-15px) rotateZ(2deg)",
                      boxShadow: `0 0 60px ${category.color}80`,
                      border: `3px solid ${category.color}`,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      padding: "30px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Box
                        sx={{
                          color: category.color,
                          filter: `drop-shadow(0 0 20px ${category.color})`,
                          marginBottom: "20px",
                        }}
                      >
                        {category.icon}
                      </Box>
                    </motion.div>

                    {/* Title */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: "bold",
                        color: category.color,
                        textShadow: `0 0 15px ${category.color}80`,
                        marginBottom: "20px",
                      }}
                    >
                      {category.title}
                    </Typography>

                    {/* Skills List */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 10 }}
                        >
                          <Box
                            sx={{
                              background: `linear-gradient(90deg, ${category.color}20, transparent)`,
                              border: `1px solid ${category.color}40`,
                              borderRadius: "10px",
                              padding: "10px 15px",
                              textAlign: "left",
                              position: "relative",
                              overflow: "hidden",
                              "&:before": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: "4px",
                                background: category.color,
                                boxShadow: `0 0 10px ${category.color}`,
                              },
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#fff",
                                fontWeight: "500",
                                marginLeft: "10px",
                              }}
                            >
                              {skill}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
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
};

export default Skills;

