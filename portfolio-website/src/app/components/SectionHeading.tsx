import React from "react";
import Reveal from "./Reveal";
import { cn } from "../utils/cn";

interface SectionHeadingProps {
  title: string;
  /** Optional single sentence, stacked under the title. Never floated beside it. */
  lede?: string;
  className?: string;
}

/**
 * Headline only. There are deliberately no eyebrow labels anywhere on this
 * site: a small uppercase tag above every section is the fastest way to make a
 * page read as templated, and the section's position already says what it is.
 */
export default function SectionHeading({ title, lede, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal index={1}>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-secondary">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
