import React from "react";
import Marquee from "react-fast-marquee";
import { Box } from "@mui/material";

// ✅ Tech logos for web development
const techLogos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
];

const techLogosRow2 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
];

function MarqueeComp() {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        marginTop: "50px",

        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* ✅ Seamless First Row */}
      <Marquee speed={150} gradient={false} pauseOnHover={true}>
        {[...techLogos, ...techLogos].map((logo, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 20px",
              padding: "10px",
              width: "100px",
              height: "100px",
              borderRadius: "var(--radius-theme-md)",
              background: "var(--color-bg-subtle)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              border: "1px solid var(--color-border-subtle)",
              boxShadow: "var(--shadow-theme-md)",
            }}
          >
            <img
              src={logo}
              alt="Tech Logo"
              style={{ width: "60px", height: "60px" }}
            />
          </Box>
        ))}
      </Marquee>

      {/* ✅ Seamless Second Row */}
      <Marquee
        speed={150}
        gradient={false}
        pauseOnHover={true}
        direction="right"
      >
        {[...techLogosRow2, ...techLogosRow2].map((logo, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 20px",
              padding: "10px",
              width: "100px",
              height: "100px",
              borderRadius: "var(--radius-theme-md)",
              background: "var(--color-bg-subtle)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              border: "1px solid var(--color-border-subtle)",
              boxShadow: "var(--shadow-theme-md)",
            }}
          >
            <img
              src={logo}
              alt="Tech Logo"
              style={{ width: "60px", height: "60px" }}
            />
          </Box>
        ))}
      </Marquee>
    </Box>
  );
}

export default MarqueeComp;
