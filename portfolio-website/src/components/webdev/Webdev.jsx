import MarqueeComp from "../Marquee/MarqueeComp";
import Typography from "@mui/material/Typography";

function Webdev() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      <Typography
        variant="h2"
        textAlign="center"
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(90deg, var(--color-accent-secondary), var(--color-accent-primary), var(--color-accent-secondary))",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 3s ease-in-out infinite",
          textShadow: "0 0 30px var(--color-accent-ghost)",
          marginBottom: "60px",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          "@keyframes shimmer": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        PREFERRED TECHNOLOGIES
      </Typography>
      <MarqueeComp />
    </div>
  );
}

export default Webdev;
