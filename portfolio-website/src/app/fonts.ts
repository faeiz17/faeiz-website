import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted through next/font so the faces are inlined into the build and
 * served from our own origin. Loading these over a <link> to a font CDN costs
 * an extra connection on the critical path and leaks visitors to a third party.
 *
 * The woff2 files come from Fontshare (free for commercial use) and live in
 * ./fonts. Weights are deliberately sparse: three per family is enough to build
 * a hierarchy, and every extra weight is another blocking download.
 */

export const display = localFont({
  variable: "--font-display-face",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  src: [
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
});

export const body = localFont({
  variable: "--font-body-face",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
});

/** Metrics only. Tabular figures stop counters jittering as digits change width. */
export const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});
