import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import PipelineDiagram from "./PipelineDiagram";
import { aiCapabilities, pipelineSummary } from "../../lib/content/ai";

export default function AiSection() {
  return (
    <section id="ai" className="py-24 md:py-36">
      <div className="shell">
        <SectionHeading title="Agents, wired into real systems" lede={pipelineSummary} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-12 md:mt-20">
          {/* Capabilities: a narrow index rail, not a column competing with the
              diagram for width — the diagram is the point of this section. */}
          <ul className="order-2 lg:order-1">
            {aiCapabilities.map((cap, i) => (
              <Reveal key={cap.title} index={i} as="li">
                <div className="border-t border-line py-5 lg:py-4">
                  <h3 className="font-display text-[1rem] font-bold tracking-[-0.01em] text-ink">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-secondary">
                    {cap.detail}
                  </p>
                </div>
              </Reveal>
            ))}
            <li className="border-t border-line" />
          </ul>

          {/* Diagram */}
          <Reveal className="order-1 lg:order-2">
            <div className="glass overflow-hidden rounded-card p-4 md:p-8">
              <PipelineDiagram />
            </div>
            <p className="mt-3 text-center text-[0.75rem] text-ink-muted">
              The pipeline that keeps GitHub, ClickUp, and Slack in sync
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
