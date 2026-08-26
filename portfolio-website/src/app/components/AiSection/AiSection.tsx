import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import PipelineDiagram from "./PipelineDiagram";
import { aiCapabilities, pipelineSummary } from "../../lib/content/ai";

export default function AiSection() {
  return (
    <section id="ai" className="py-24 md:py-36 snap-center">
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
          {/*
            min-w-0 overrides the grid item's default min-width: auto, which
            otherwise sizes the item to fit the diagram's 640px min-width
            unshrunk and widens the whole page instead of letting the
            overflow-x-auto div below actually scroll. Grid items refusing to
            shrink below their content's intrinsic size is the standard reason
            an "overflow: auto" wrapper stops working the moment it's inside a
            grid or flex container.
          */}
          <Reveal className="order-1 min-w-0 lg:order-2">
            {/*
              The diagram's seven labelled nodes need real horizontal room —
              shrinking their text and padding to fit a phone screen makes
              them illegible before they'd ever stop overlapping. Below the
              width it's designed for, it keeps its working size and scrolls
              horizontally inside this card instead of being squeezed.
            */}
            <div className="glass overflow-hidden rounded-card p-4 md:p-8">
              <div className="overflow-x-auto">
                <PipelineDiagram />
              </div>
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
