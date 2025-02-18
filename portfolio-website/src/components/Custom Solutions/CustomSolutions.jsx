import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import WebIcon from "@mui/icons-material/LaptopMac";
import MobileFriendlyIcon from "@mui/icons-material/PhoneIphone";
import BusinessIcon from "@mui/icons-material/Business";
import { motion } from "framer-motion";

// ✅ Animations Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

// ✅ Function to handle opening email with predefined message
const sendEmail = (packageName) => {
  const email = "orenlankri333@gmail.com";
  const subject = `Inquiry about ${packageName}`;
  const body = `Hello,\n\nI am interested in your ${packageName} package and would like more information about its features and pricing.\n\nPlease get back to me at your earliest convenience.\n\nBest regards,`;

  // Open Gmail Compose in a new tab
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`,
    "_blank"
  );
};

function CustomSolutions() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
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
          color="error"
          sx={{
            marginBottom: "40px",
            textAlign: "center",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Custom Solutions
        </Typography>

        {/* ✅ Pricing Plans */}
        <Grid container spacing={4} justifyContent="center">
          {/* Responsive Website Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={cardVariants} whileHover="hover">
              <Card
                sx={{
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  textAlign: "center",
                  padding: "20px",
                  height: "400px",
                  borderRadius: "15px",
                  boxShadow: "0px 10px 30px rgba(255, 255, 0, 0.2)",
                }}
              >
                <CardContent>
                  <WebIcon sx={{ fontSize: 50, color: "#ffcc00" }} />
                  <Typography variant="h4" sx={{ marginY: 2 }}>
                    $999
                  </Typography>
                  <Typography variant="h5">Responsive Website</Typography>
                  <Typography variant="body1">5 Custom Pages</Typography>
                  <Typography variant="body1">Basic SEO Setup</Typography>
                  <Typography variant="body1">Contact Form</Typography>
                  <Typography variant="body1">3 Months Support</Typography>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ marginTop: 2 }}
                      onClick={() => sendEmail("Responsive Website Package")}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Mobile Pro Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={cardVariants} whileHover="hover">
              <Card
                sx={{
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  textAlign: "center",
                  padding: "20px",
                  height: "400px",
                  borderRadius: "15px",
                  boxShadow: "0px 10px 30px rgba(0, 204, 255, 0.2)",
                }}
              >
                <CardContent>
                  <MobileFriendlyIcon sx={{ fontSize: 50, color: "#00ccff" }} />
                  <Typography variant="h4" sx={{ marginY: 2 }}>
                    $1,999
                  </Typography>
                  <Typography variant="h5">Native Mobile App</Typography>
                  <Typography variant="body1">
                    Cross-Platform (iOS & Android)
                  </Typography>
                  <Typography variant="body1">User Authentication</Typography>
                  <Typography variant="body1">Push Notifications</Typography>
                  <Typography variant="body1">6 Months Support</Typography>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ marginTop: 2 }}
                      onClick={() => sendEmail("Native Mobile App Package")}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Enterprise Suite Plan */}
          <Grid item xs={12} sm={12} md={4}>
            <motion.div variants={cardVariants} whileHover="hover">
              <Card
                sx={{
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  textAlign: "center",
                  padding: "20px",
                  height: "400px",
                  borderRadius: "15px",
                  boxShadow: "0px 10px 30px rgba(255, 87, 51, 0.2)",
                }}
              >
                <CardContent>
                  <BusinessIcon sx={{ fontSize: 50, color: "#ff5733" }} />
                  <Typography variant="h4" sx={{ marginY: 2 }}>
                    Custom
                  </Typography>
                  <Typography variant="h5">Enterprise Suite</Typography>
                  <Typography variant="body1">Full-Stack Solution</Typography>
                  <Typography variant="body1">Custom Infrastructure</Typography>
                  <Typography variant="body1">Advanced Security</Typography>
                  <Typography variant="body1">Dedicated Team</Typography>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginTop: 2 }}
                      onClick={() => sendEmail("Enterprise Suite Package")}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}

export default CustomSolutions;
