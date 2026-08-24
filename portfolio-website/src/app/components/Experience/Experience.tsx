"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "../Reveal";
import CountUp from "../CountUp";
import { experiences, ExperienceEntry } from "../../lib/content/experience";
import { cn } from "../../utils/cn";

/**
 * Pinned index on the left, roles scrolling past on the right.
 *
 * Deliberately not a stacking-card scroll: overlapping pinned panels fight over
 * the same space, and getting them to enter and leave cleanly costs more than
 * the effect is worth. This keeps every role fully readable, gives the section
 * a spine, and tells you where you are the whole way down.
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // IntersectionObserver rather than a scroll handler: the browser does the
  // work off the main thread and only tells us when the answer changes.
  useEffect(() => {
    const panels = sectionRef.current?.querySelectorAll("[data-role-index]");
    if (!panels?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.roleIndex);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      // A band across the upper middle of the viewport. Whichever panel is in
      // that band is the one being read.
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 md:py-36">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-16">
        {/* Index rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              Five roles,
              <br />
              one throughline
            </h2>
          </Reveal>

          <Reveal index={1}>
            <p className="mt-5 max-w-[34ch] text-[1rem] leading-relaxed text-ink-secondary">
              Performance work on apps with real users behind them.
            </p>
          </Reveal>

          {/* The rail itself is desktop-only: on mobile the panels are already
              in order and a duplicate index is just noise above the content. */}
          <div className="mt-10 hidden lg:block">
            <div className="relative pl-5">
              <span aria-hidden className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-line" />
              <motion.span
                aria-hidden
                style={{ scaleY: reduce ? 1 : fill }}
                className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-accent"
              />

              <ol className="space-y-3.5">
                {experiences.map((exp, i) => (
                  <li key={exp.company}>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(`role-${i}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "center" })
                      }
                      className={cn(
                        "block text-left text-[0.9375rem] transition-colors duration-300",
                        i === active ? "text-ink" : "text-ink-muted hover:text-ink-secondary"
                      )}
                    >
                      {exp.company}
                      <span
                        className={cn(
                          "tnum ml-2 text-[0.75rem] transition-colors duration-300",
                          i === active ? "text-accent" : "text-ink-muted/60"
                        )}
                      >
                        {exp.duration.split(" - ")[0].split(" ").pop()}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, i) => (
            <RolePanel key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RolePanel({ exp, index }: { exp: ExperienceEntry; index: number }) {
  return (
    <Reveal>
      <article
        id={`role-${index}`}
        data-role-index={index}
        className="glass group relative scroll-mt-28 overflow-hidden rounded-card p-6 transition-[box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:border-accent/25 hover:shadow-floating md:p-9"
      >
        {/* A tinted glow in the corner the pointer entered from would need JS to
            track; a fixed top-right glow reads just as intentional and costs
            nothing. Opacity-gated so idle cards stay flat. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent/[0.14] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          {exp.companyUrl ? (
            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-ink transition-colors duration-300 hover:text-accent md:text-[1.75rem]"
            >
              {exp.company}
              <ArrowUpRight
                size={18}
                className="opacity-0 transition-opacity duration-300 group-hover/link:opacity-100"
              />
            </a>
          ) : (
            <h3 className="font-display text-[1.4rem] font-bold tracking-[-0.02em] text-ink md:text-[1.75rem]">
              {exp.company}
            </h3>
          )}
          <span className="tnum text-[0.8125rem] text-ink-muted">{exp.duration}</span>
        </div>

        <p className="mt-1.5 text-[0.9375rem] text-ink-secondary">
          {exp.position}
          <span className="text-ink-muted"> · {exp.location}</span>
        </p>

        {exp.highlights && (
          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {exp.highlights.map((h) => (
              <div key={h.label}>
                <p className="tnum text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-accent md:text-[2.125rem]">
                  <CountUp value={h.value} prefix={h.prefix} suffix={h.suffix} compact={h.value >= 1000} />
                </p>
                <p className="mt-2 text-[0.8125rem] leading-snug text-ink-muted">{h.label}</p>
              </div>
            ))}
          </div>
        )}

        <ul className="mt-7 space-y-3">
          {exp.description.map((line) => (
            <li key={line} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-secondary">
              <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-line-strong" />
              {line}
            </li>
          ))}
        </ul>

        <p className="mt-7 text-[0.8125rem] leading-relaxed text-ink-muted">{exp.tech.join("  ·  ")}</p>
      </article>
    </Reveal>
  );
}
