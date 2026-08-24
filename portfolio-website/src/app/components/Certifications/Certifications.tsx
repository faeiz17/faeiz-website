"use client";

import React from "react";
import { useReducedMotion } from "motion/react";
import { SealCheck } from "@phosphor-icons/react";
import SectionHeading from "../SectionHeading";
import CountUp from "../CountUp";
import Reveal from "../Reveal";
import { certifications, Certification } from "../../lib/content/certifications";
import { cn } from "../../utils/cn";

const half = Math.ceil(certifications.length / 2);
const rows = [certifications.slice(0, half), certifications.slice(half)];

/**
 * Twenty-one credentials is too many to list and too many to drop. A marquee
 * shows the breadth without asking anyone to read every line, and each pill is
 * still a real link to its verification page.
 *
 * Shares its scroll mechanics (two copies of the row, translate -50%,
 * animate-marquee from globals.css) with the company logo strip in the hero.
 */
export default function Certifications() {
  const reduce = useReducedMotion();

  return (
    <section id="certifications" className="overflow-hidden py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          title="Certified across the Claude platform"
          lede="Every credential below is independently verifiable."
        />

        <Reveal index={1}>
          <p className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span className="tnum text-[clamp(3.5rem,9vw,6.5rem)] font-bold leading-none tracking-[-0.04em] text-accent">
              <CountUp value={certifications.length} />
            </span>
            <span className="text-[1.0625rem] text-ink-secondary">
              credentials in agents, MCP, and the Claude API
            </span>
          </p>
        </Reveal>
      </div>

      {reduce ? (
        <div className="shell mt-10">
          <ul className="flex flex-wrap gap-2.5">
            {certifications.map((cert) => (
              <li key={cert.href}>
                <Pill cert={cert} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-12 flex flex-col gap-3.5">
          {rows.map((row, i) => (
            <div key={i} className="group/row relative flex overflow-hidden">
              {/* Two copies of the row make the -50% loop seamless. The second
                  is hidden from screen readers so links are not announced twice. */}
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className={cn(
                    "flex shrink-0 gap-3.5 pr-3.5",
                    i % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse",
                    "group-hover/row:[animation-play-state:paused]"
                  )}
                >
                  {row.map((cert) => (
                    <li key={cert.href} className="shrink-0">
                      <Pill cert={cert} tabbable={copy === 0} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Pill({ cert, tabbable = true }: { cert: Certification; tabbable?: boolean }) {
  return (
    <a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabbable ? undefined : -1}
      className="inline-flex items-center gap-2 whitespace-nowrap glass rounded-full px-4 py-2.5 text-[0.875rem] text-ink-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      <SealCheck size={15} weight="fill" className="shrink-0 text-accent" />
      {cert.name}
    </a>
  );
}
