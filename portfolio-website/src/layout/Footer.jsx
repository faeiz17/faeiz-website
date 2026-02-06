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
      `conic-gradient(from 0deg at calc(${gradientX.get() * 100
      }% - ${left}px) calc(${gradientY.get() * 100
      }% - ${top}px), #1a0505, #2a0a0a, #0d0505)`
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
          background: "linear-gradient(90deg, #ffffff, #cc0000)",
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
          color: "white",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "500",
          "&:hover": { color: "red" },
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
          sx={{ color: "#fff", "&:hover": { color: "#ffcc00" } }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com"
          target="_blank"
          sx={{ color: "#fff", "&:hover": { color: "#0077b5" } }}
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.instagram.com/faeizfurqan/"
          target="_blank"
          sx={{ color: "#fff", "&:hover": { color: "#E1306C" } }}
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.facebook.com/faeizfurqan.17"
          target="_blank"
          sx={{ color: "#fff", "&:hover": { color: "#1877F2" } }}
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Copyright Text */}
      <Typography variant="body2" sx={{ marginTop: "10px", opacity: 0.8, fontSize: { xs: "0.8rem", md: "0.875rem" } }}>
        © 2025 Muhammad Faeiz Furqan | Full Stack Developer | All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "5px", opacity: 0.7, fontSize: { xs: "0.75rem", md: "0.8rem" } }}>
        Lahore, Pakistan | 03234307979 | faeiz-website.vercel.app
      </Typography>
    </Box>
  );
}
