import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build run against its own output directory instead of
  // fighting a dev server that is already writing to .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // There is a second lockfile one directory up, so Next guesses the wrong
  // workspace root and warns. This pins it to the app.
  outputFileTracingRoot: here,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  webpack: (config, { dev }) => {
    if (dev) {
      // gitignore does not reach the dev file watcher. Without this, anything
      // writing into these directories (an out-of-band build, browser
      // automation dropping snapshots) shows up as a source change and the dev
      // server recompiles on a loop.
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/.git/**",
          "**/node_modules/**",
          "**/.next/**",
          "**/.next-verify/**",
          "**/.playwright-cli/**",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
