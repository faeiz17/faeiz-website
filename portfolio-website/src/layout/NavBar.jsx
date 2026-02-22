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
          background: "transparent",
          // background: "var(--color-bg-elevated)",
          backdropFilter: "blur(20px)",
          boxShadow: "var(--shadow-theme-md)",
          borderBottom: "1px solid var(--color-border-subtle)",
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
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                  background: `linear-gradient(90deg, var(--color-text-primary), var(--color-accent-primary))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px var(--color-accent-ghost)",
                }}
              >
                Faeiz Furqan
              </Typography>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px", alignItems: "center" }}>
            {navItems.map((item) => {
              const IconComponent = item.Icon;
              const isActive = activeSection === item.id;
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
                      color: isActive ? "var(--color-accent-primary)" : "var(--color-text-secondary)",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      padding: "8px 16px",
                      borderRadius: "var(--radius-theme-xl)",
                      border: isActive ? "2px solid var(--color-accent-primary)" : "2px solid transparent",
                      background: isActive ? "var(--color-accent-ghost)" : "transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "var(--color-bg-subtle)",
                        border: "2px solid var(--color-accent-primary)",
                        boxShadow: "var(--shadow-theme-md)",
                        color: "var(--color-accent-primary-hover)"
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
              color: "var(--color-accent-primary)",
              filter: "drop-shadow(0 0 10px var(--color-accent-ghost))",
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
            background: "var(--color-bg-base)",
            borderLeft: "2px solid var(--color-border-strong)",
            paddingTop: "env(safe-area-inset-top)",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "var(--color-accent-primary)" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => {
              const IconComponent = item.Icon;
              const isActive = activeSection === item.id;
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
                      borderRadius: "var(--radius-theme-lg)",
                      minHeight: "48px",
                      border: isActive ? "2px solid var(--color-accent-primary)" : "2px solid transparent",
                      background: isActive ? "var(--color-accent-ghost)" : "transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "var(--color-bg-subtle)",
                        border: "2px solid var(--color-accent-primary)",
                        boxShadow: "var(--shadow-theme-sm)",
                      },
                    }}
                  >
                    <IconComponent sx={{ marginRight: "15px", color: isActive ? "var(--color-accent-primary)" : "var(--color-text-secondary)" }} />
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: isActive ? "var(--color-accent-primary)" : "var(--color-text-secondary)",
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
