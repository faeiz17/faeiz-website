import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as icon.tsx, scaled up for the iOS home-screen tile. */
export default async function AppleIcon() {
  // See icon.tsx: Satori needs the .ttf sibling, not the woff2 next/font uses.
  const clash700 = await readFile(join(process.cwd(), "src/app/fonts/ClashDisplay-700.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #15151d 0%, #0d0d12 100%)",
        }}
      >
        <div
          style={{
            fontSize: 106,
            fontWeight: 700,
            fontFamily: "Clash Display",
            color: "#7fb2ff",
            lineHeight: 1,
          }}
        >
          F
        </div>
        <div
          style={{
            position: "absolute",
            top: 38,
            right: 36,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#ff9d6e",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Clash Display", data: clash700, weight: 700, style: "normal" }] }
  );
}
