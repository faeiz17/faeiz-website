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
          background: "rgba(8, 8, 8, 0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 30px rgba(139, 0, 0, 0.15)",
          borderBottom: "1px solid rgba(139, 0, 0, 0.3)",
          paddingTop: "env(safe-area-inset-top)",
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
                  color: "#cc0000",
                  filter: "drop-shadow(0 0 10px rgba(200, 0, 0, 0.5))",
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                  background: "linear-gradient(90deg, #ffffff, #cc0000)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px rgba(200, 0, 0, 0.3)",
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
                      color: activeSection === item.id ? "#cc0000" : "#ffffff",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: activeSection === item.id ? "2px solid #cc0000" : "2px solid transparent",
                      background: activeSection === item.id ? "rgba(139, 0, 0, 0.2)" : "transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(139, 0, 0, 0.3)",
                        border: "2px solid #cc0000",
                        boxShadow: "0 0 20px rgba(139, 0, 0, 0.4)",
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
              color: "#cc0000",
              filter: "drop-shadow(0 0 10px rgba(200, 0, 0, 0.5))",
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
            width: { xs: "280px", sm: "320px" },
            background: "linear-gradient(180deg, #080808 0%, #0d0505 100%)",
            borderLeft: "2px solid rgba(139, 0, 0, 0.4)",
            paddingTop: "env(safe-area-inset-top)",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <Typography
              variant="h6"
              sx={{
                background: "linear-gradient(90deg, #ffffff, #cc0000)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Navigation
            </Typography>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "#cc0000" }}>
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
                      padding: { xs: "12px 16px", sm: "15px 20px" },
                      marginBottom: "10px",
                      borderRadius: "10px",
                      minHeight: "48px",
                      border: activeSection === item.id ? "2px solid #cc0000" : "2px solid transparent",
                      background: activeSection === item.id ? "rgba(139, 0, 0, 0.2)" : "transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(139, 0, 0, 0.3)",
                        border: "2px solid #cc0000",
                        boxShadow: "0 0 20px rgba(139, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <IconComponent sx={{ marginRight: "15px", color: activeSection === item.id ? "#cc0000" : "#ffffff" }} />
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: activeSection === item.id ? "#cc0000" : "#ffffff",
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
