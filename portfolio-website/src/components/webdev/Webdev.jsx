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
        padding: "40px 20px",
      }}
    >
      <Typography
        variant="h2"
        textAlign="center"
        sx={{
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, // Responsive font size
        }}
      >
        Preffered Technologies
      </Typography>
      <MarqueeComp />
    </div>
  );
}

export default Webdev;
