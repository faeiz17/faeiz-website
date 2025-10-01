import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import FolderIcon from "@mui/icons-material/Folder";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const navItems = [
  { label: "About", id: "about", Icon: PersonIcon },
  { label: "Experience", id: "experience", Icon: WorkIcon },
  { label: "Skills", id: "skills", Icon: BoltIcon },
  { label: "Projects", id: "projects", Icon: FolderIcon },
  { label: "Game", id: "cargame", Icon: SportsEsportsIcon },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileOpen(false);
    } else {
      // Scroll to top if id doesn't exist
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("about");
      setMobileOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(10, 0, 21, 0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 30px rgba(255, 0, 255, 0.1)",
          borderBottom: "1px solid rgba(255, 0, 255, 0.2)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: { xs: "10px", md: "15px 40px" } }}>
          {/* Logo/Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => scrollToSection("about")}
            style={{ cursor: "pointer" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RocketLaunchIcon
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  color: "#ff00ff",
                  filter: "drop-shadow(0 0 10px #ff00ff)",
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                  background: "linear-gradient(90deg, #ff00ff, #00ffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px rgba(255, 0, 255, 0.5)",
                }}
              >
                M. Faeiz Furqan
              </Typography>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px", alignItems: "center" }}>
            {navItems.map((item) => {
              const IconComponent = item.Icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => scrollToSection(item.id)}
                    startIcon={<IconComponent />}
                    sx={{
                      color: activeSection === item.id ? "#ff00ff" : "#00ffff",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: activeSection === item.id ? "2px solid #ff00ff" : "2px solid transparent",
                      background: activeSection === item.id ? "rgba(255, 0, 255, 0.1)" : "transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 0, 255, 0.2)",
                        border: "2px solid #ff00ff",
                        boxShadow: "0 0 20px rgba(255, 0, 255, 0.4)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              );
            })}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#ff00ff",
              filter: "drop-shadow(0 0 10px #ff00ff)",
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "280px",
            background: "linear-gradient(180deg, #0a0015 0%, #1a0033 100%)",
            borderLeft: "2px solid rgba(255, 0, 255, 0.3)",
          },
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <Typography
              variant="h6"
              sx={{
                background: "linear-gradient(90deg, #ff00ff, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Navigation
            </Typography>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "#ff00ff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => {
              const IconComponent = item.Icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ListItem
                    button
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      padding: "15px 20px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      border: activeSection === item.id ? "2px solid #ff00ff" : "2px solid transparent",
                      background: activeSection === item.id ? "rgba(255, 0, 255, 0.1)" : "transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 0, 255, 0.2)",
                        border: "2px solid #ff00ff",
                        boxShadow: "0 0 20px rgba(255, 0, 255, 0.3)",
                      },
                    }}
                  >
                    <IconComponent sx={{ marginRight: "15px", color: activeSection === item.id ? "#ff00ff" : "#00ffff" }} />
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: activeSection === item.id ? "#ff00ff" : "#00ffff",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                          }}
                        >
                          {item.label}
                        </Typography>
                      }
                    />
                  </ListItem>
                </motion.div>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default NavBar;
