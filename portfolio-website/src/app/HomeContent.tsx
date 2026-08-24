import Hero from "./components/Hero";
import ProofBand from "./components/ProofBand";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import AiSection from "./components/AiSection/AiSection";
import Projects from "./components/Projects/Projects";
import Certifications from "./components/Certifications/Certifications";

export default function HomeContent() {
  return (
    <main>
      <Hero />
      <ProofBand />
      <Experience />
      <Skills />
      <AiSection />
      <Projects />
      <Certifications />
    </main>
  );
}
