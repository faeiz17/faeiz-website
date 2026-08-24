import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { display, body, mono } from "./fonts";

const title = "Faeiz Furqan | Full Stack Web & Mobile App Developer";
const description =
  "Portfolio of Faeiz Furqan, a full stack web and mobile app developer with 2+ years of experience. Published open-source libraries (25k+ downloads) and shipped performance-critical apps across the UAE, Egypt, and USA markets.";

export const metadata: Metadata = {
  metadataBase: new URL("https://faeizfurqan.com"),
  title,
  description,
  keywords:
    "Faeiz Furqan, Full Stack Developer, Software Engineer, React Native, Expo, Mobile Development, React, Next.js, Node.js",
  authors: [{ name: "Muhammad Faeiz Furqan" }],
  openGraph: {
    type: "website",
    url: "https://faeizfurqan.com/",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Faeiz Furqan",
  alternateName: "Faeiz Furqan",
  url: "https://faeizfurqan.com",
  jobTitle: "Full Stack Web & Mobile App Developer",
  email: "mailto:mfaeiz.furqan@gmail.com",
  telephone: "+92-323-4307979",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "Pakistan",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "COMSATS University",
  },
  worksFor: {
    "@type": "Organization",
    name: "Dubizzle Labs / Bayut",
  },
  sameAs: [
    "https://github.com/faeizfurqan17",
    "https://linkedin.com/in/muhammad-faeiz177",
  ],
  knowsAbout: [
    "React Native",
    "Expo",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Mobile App Development",
    "Full Stack Development",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
