/** Single source of truth for work history. */

export interface Highlight {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface ExperienceEntry {
  company: string;
  companyUrl?: string;
  position: string;
  location: string;
  duration: string;
  highlights?: Highlight[];
  description: string[];
  tech: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    company: "Dubizzle Labs / Bayut",
    companyUrl: "https://www.dubizzlelabs.com/",
    position: "Software Engineer",
    location: "Lahore, Pakistan",
    duration: "July 2025 - Present",
    highlights: [
      { value: 83, suffix: "%", label: "faster first render" },
      { value: 97, suffix: "%", label: "faster navigation" },
      { value: 16000, prefix: "£", label: "saved on tooling" },
      { value: 6, suffix: "x", label: "faster Stories load" },
    ],
    description: [
      "Built an agentic pipeline over MCP servers that syncs GitHub, ClickUp, and Slack to automate PR creation and self-reviews.",
      "Replaced reactive list loading with a predictive-prefetch scroll hook, then extended it app-wide.",
      "Owned TruBroker Stories end to end: resumable uploads, an in-house ffmpeg-kit compression pipeline, and a story-style yearly recap with native sharing.",
    ],
    tech: ["React Native", "Expo", "New Architecture", "MCP", "Performance", "ffmpeg-kit"],
  },
  {
    company: "We Are Very",
    companyUrl: "https://wearevery.com/",
    position: "Software Consultant (Freelance, Remote)",
    location: "California, USA",
    duration: "February 2026 - Present",
    description: [
      "Built a hardware-accelerated compression mechanism for the platform, shipped as the expo-image-and-video-compressor library with native H.264 and HEVC encoding for Expo and React Native.",
    ],
    tech: ["React Native", "Expo", "Native Modules", "H.264", "HEVC"],
  },
  {
    company: "Seven Stacks",
    companyUrl: "https://www.sevenstacks.net/",
    position: "Associate Software Engineer",
    location: "Lahore, Pakistan",
    duration: "December 2024 - June 2025",
    description: [
      "Built and maintained full-stack web applications on Next.js with a Sails.js backend.",
      "Worked across AWS EC2, S3, and RDS, collaborating closely with QA and design.",
    ],
    tech: ["Next.js", "Sails.js", "AWS", "EC2", "S3", "RDS"],
  },
  {
    company: "SocialDev",
    companyUrl: "https://www.linkedin.com/company/socialdevil/",
    position: "Software Engineer (Part-Time)",
    location: "Cyprus (Remote)",
    duration: "October 2024 - May 2025",
    description: [
      "Built the HebrewLearn mobile app in Expo, plus the company portfolio site, focusing on responsive UI.",
    ],
    tech: ["React Native", "Expo", "Web Design"],
  },
  {
    company: "Arbisoft",
    companyUrl: "https://arbisoft.com/",
    position: "React.js Intern",
    location: "Lahore, Pakistan",
    duration: "June 2024 - August 2024",
    description: [
      "Built a MERN expense tracker and contributed React.js and Django integrations for edX.",
    ],
    tech: ["React.js", "MongoDB", "Express", "Node.js", "Django"],
  },
];
