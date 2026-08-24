import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The tab icon in the site's own language: the obsidian panel gradient every
 * glass surface on the page uses, Clash Display (the real display face, not
 * a system-font stand-in), and the accent blue. The corner spark borrows the
 * AI section's node-pulse motif — a signal on a dark field — as the one bit
 * of personality a 16px glyph can still carry.
 */
export default async function Icon() {
  // Satori (the renderer behind ImageResponse) can't parse woff2 in this
  // Next version — hence the .ttf sibling of the woff2 the rest of the site
  // actually loads through next/font. Decompressed once with wawoff2 and
  // committed as a plain file; no new runtime dependency.
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
          borderRadius: "16px",
        }}
      >
        <div
          style={{
            fontSize: 38,
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
            top: 14,
            right: 13,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#ff9d6e",
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: "Clash Display", data: clash700, weight: 700, style: "normal" }] }
  );
}
