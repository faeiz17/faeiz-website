"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

/* Custom Animated Background Hook */
function useElementDimensions(ref) {
  const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 });

  function measure() {
    if (!ref.current) return;
    setSize(ref.current.getBoundingClientRect());
  }

  useEffect(() => {
    measure();
  }, []);

  return [size, measure];
}

/* ✅ Footer Component */
export default function Footer() {
  const ref = useRef(null);
  const [{ width, height, top, left }, measure] = useElementDimensions(ref);
  const gradientX = useMotionValue(0.5);
  const gradientY = useMotionValue(0.5);
  const background = useTransform(
    () =>
      `conic-gradient(from 0deg at calc(${gradientX.get() * 100}% - ${left}px) calc(${gradientY.get() * 100}% - ${top}px), var(--color-bg-base), var(--color-accent-primary), var(--color-bg-elevated), var(--color-accent-secondary), var(--color-bg-sunken), var(--color-accent-primary), var(--color-bg-base))`
  );

  return (
    <Box
      component="footer"
      sx={{
        height: { xs: "auto", sm: "400px", md: "450px", lg: "500px" },
        minHeight: { xs: "350px" },
        position: "relative",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: { xs: "40px 20px", md: "40px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: { xs: "12px", md: "16px" },
        zIndex: 100,
        background: "var(--color-bg-subtle)",
      }}
      onPointerMove={(e) => {
        gradientX.set(e.clientX / width);
        gradientY.set(e.clientY / height);
      }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        ref={ref}
        style={{
          background,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          filter: "blur(30px)",
          opacity: 0.6,
        }}
        onPointerEnter={() => measure()}
      />

      {/* Contact Info */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: "10px",
          fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem" },
          background: "linear-gradient(90deg, var(--color-text-primary), var(--color-accent-primary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Connect With Me
      </Typography>

      {/* Email Link */}
      <Link
        href="mailto:mfaeiz.furqan@gmail.com"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          color: "var(--color-text-primary)",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "500",
          transition: "all 0.3s ease",
          "&:hover": { color: "var(--color-accent-primary)" },
        }}
      >
        <EmailIcon />
        mfaeiz.furqan@gmail.com
      </Link>

      {/* Social Media Icons */}
      <Box
        sx={{
          marginTop: { xs: "10px", md: "15px" },
          display: "flex",
          justifyContent: "center",
          gap: { xs: "10px", md: "15px" },
          flexWrap: "wrap",
        }}
      >
        <IconButton
          component="a"
          href="https://github.com/faeiz17"
          target="_blank"
          sx={{ color: "var(--color-text-primary)", "&:hover": { color: "var(--color-accent-primary)" } }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com"
          target="_blank"
          sx={{ color: "var(--color-text-primary)", "&:hover": { color: "var(--color-accent-primary)" } }}
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.instagram.com/faeizfurqan/"
          target="_blank"
          sx={{ color: "var(--color-text-primary)", "&:hover": { color: "var(--color-accent-primary)" } }}
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.facebook.com/faeizfurqan.17"
          target="_blank"
          sx={{ color: "var(--color-text-primary)", "&:hover": { color: "var(--color-accent-primary)" } }}
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Copyright Text */}
      <Typography variant="body2" sx={{ marginTop: "10px", color: "var(--color-text-muted)", fontSize: { xs: "0.8rem", md: "0.875rem" } }}>
        © 2025 Muhammad Faeiz Furqan | Full Stack Developer | All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "5px", color: "var(--color-text-muted)", fontSize: { xs: "0.75rem", md: "0.8rem" } }}>
        Lahore, Pakistan | 03234307979 | faeiz-website.vercel.app
      </Typography>
    </Box>
  );
}
