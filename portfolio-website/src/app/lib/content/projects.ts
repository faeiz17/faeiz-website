/**
 * Project data for the featured bento grid.
 */

export interface LinkEntry {
  label: string;
  href: string;
}

export interface ProjectStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface ProjectEntry {
  title: string;
  /** Shorter display name for cards where the package name is unreadably long. */
  shortTitle?: string;
  description: string;
  stat?: ProjectStat;
  tech: string[];
  imageKey?: string;
  link: LinkEntry;
}

export const featuredProjects: ProjectEntry[] = [
  {
    title: "expo-image-and-video-compressor",
    description:
      "Hardware-accelerated H.264 and HEVC encoding for Expo and React Native, exposed as a drop-in native module.",
    stat: { value: 22, suffix: "k+", label: "downloads" },
    tech: ["Expo", "React Native", "Native Modules"],
    link: { label: "npm", href: "https://www.npmjs.com/package/expo-image-and-video-compressor" },
  },
  {
    title: "Bayut",
    description: "One of the largest property marketplace apps in the UAE, where I work on mobile performance.",
    tech: ["React Native", "Expo"],
    link: { label: "bayut.com", href: "https://www.bayut.com/" },
  },
  {
    title: "@faeizfurqan/expo-story-video-and-image-editor",
    shortTitle: "expo-story-editor",
    description: "Story-style video and image editing built on Skia.",
    tech: ["Expo", "Skia"],
    link: {
      label: "npm",
      href: "https://www.npmjs.com/package/@faeizfurqan/expo-story-video-and-image-editor",
    },
  },
  {
    title: "expo-blur-face",
    description: "On-device face detection and blurring for Expo apps.",
    tech: ["Expo", "React Native"],
    link: { label: "npm", href: "https://www.npmjs.com/package/expo-blur-face" },
  },
  {
    title: "Profolio",
    description: "iOS app shipped to the App Store.",
    tech: ["React Native", "Expo"],
    link: { label: "App Store", href: "https://apps.apple.com/pk/app/profolio/id1450925753" },
  },
  {
    title: "edX",
    description: "React and Django integrations for the edX learning platform.",
    tech: ["React.js", "Django"],
    link: { label: "edx.org", href: "https://www.edx.org/courses?q=free+online+courses" },
  },
];
