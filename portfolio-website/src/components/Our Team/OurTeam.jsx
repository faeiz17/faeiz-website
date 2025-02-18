import { Typography, Box, Avatar, Grid } from "@mui/material";
import { motion } from "framer-motion";

// ✅ Animation Variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

// ✅ Team Members Data
const teamMembers = [
  { name: "Oren Lankri", role: "CEO", color: "#ff5733" },
  { name: "Faeiz Furqan", role: "Software Engineer", color: "#0077b5" },
  { name: "Mathew", role: "Digital Marketer", color: "#28a745" },
];

function OurTeam() {
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
        color="primary"
        sx={{
          marginBottom: "40px",
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: "bold",
        }}
      >
        Our Team
      </Typography>

      {/* ✅ Team Members Grid */}
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariant}
            >
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#1e1e1e",
                  boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {/* ✅ Avatar Placeholder */}
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "auto",
                    backgroundColor: member.color,
                  }}
                >
                  {member.name.charAt(0)}
                </Avatar>

                {/* ✅ Name & Role with Reveal Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                >
                  <Typography
                    variant="h5"
                    sx={{ marginTop: "15px", fontWeight: "bold" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {member.role}
                  </Typography>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default OurTeam;
