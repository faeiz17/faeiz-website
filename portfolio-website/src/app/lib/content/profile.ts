/** Identity, contact details and skill groups. */

export const profile = {
  name: "Muhammad Faeiz Furqan",
  shortName: "Faeiz Furqan",
  title: "Full Stack Web & Mobile App Developer",
  location: "Lahore, Pakistan",
  email: "mfaeiz.furqan@gmail.com",
  phone: "+92 323 4307979",
  yearsExperience: "2+",
  summary:
    "Full stack web and mobile app developer with 2+ years of experience. Published open-source libraries with 25k+ combined downloads and built performance-critical features for large-scale apps used across the UAE, Egypt, and USA.",
  openToWork: true,
};

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: "Mobile", skills: ["React Native", "Expo", "Native Modules", "SwiftUI", "Kotlin"] },
  { title: "Frontend", skills: ["React", "TypeScript / JavaScript", "Next.js"] },
  { title: "Backend", skills: ["Node.js", "Express", "SQL / NoSQL", "Elasticsearch", "REST", "PHP", "Laravel"] },
];
