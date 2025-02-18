import { useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          padding: "20px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="error"
            sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
              },
            }}
          >
            Muhammad Faeiz Furqan
          </Typography>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default NavBar;
