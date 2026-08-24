import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Faeiz Furqan, Full Stack Web & Mobile App Developer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fffefb",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(55,48,163,0.10) 0%, transparent 55%), radial-gradient(circle at 8% 85%, rgba(180,83,9,0.10) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 36, height: 3, background: "#b45309" }} />
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#b45309",
              fontFamily: "Arial",
            }}
          >
            Portfolio
          </div>
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 500,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
            color: "#1a1a2e",
            marginBottom: 20,
          }}
        >
          Faeiz Furqan
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#3730a3",
            fontFamily: "Arial",
            marginBottom: 40,
          }}
        >
          Full Stack Web &amp; Mobile App Developer
        </div>
        <div style={{ display: "flex", gap: 56 }}>
          {[
            ["2+", "Years Experience"],
            ["25k+", "OSS Downloads"],
            ["3", "Markets Shipped"],
          ].map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 44, fontWeight: 500, fontStyle: "italic", fontFamily: "Georgia, serif", color: "#1a1a2e" }}>
                {value}
              </div>
              <div style={{ fontSize: 20, color: "#83809a", fontFamily: "Arial", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
