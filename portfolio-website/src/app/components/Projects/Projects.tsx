"use client";

import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import CountUp from "../CountUp";
import { featuredProjects, ProjectEntry } from "../../lib/content/projects";
import { cn } from "../../utils/cn";

/**
 * Bento spans, indexed to match featuredProjects. Four columns across three
 * rows with no empty cells:
 *
 *   [ compressor ][ compressor ][   Bayut    ][   Bayut    ]
 *   [ compressor ][ compressor ][ story-edit ][ blur-face  ]
 *   [  Profolio  ][  Profolio  ][    edX     ][    edX     ]
 */
const spans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-36 snap-center">
      <div className="shell">
        <SectionHeading
          title="Libraries and products"
          lede="Three published packages, and the apps they came out of."
        />

        <div className="mt-14 grid auto-rows-[minmax(11rem,auto)] grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.title} index={i} className={cn("group", spans[i])}>
              <FeatureTile project={project} hero={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureTile({ project, hero }: { project: ProjectEntry; hero: boolean }) {
  return (
    <TiltCard maxTilt={hero ? 4 : 6} className="h-full">
      <a
        href={project.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "glass flex h-full flex-col justify-between overflow-hidden rounded-card p-6 transition-[border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] md:p-7",
          hero
            ? "bloom hover:shadow-floating"
            : "hover:border-line-strong hover:shadow-floating"
        )}
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3
              className={cn(
                "font-display font-bold tracking-[-0.02em] text-ink",
                hero ? "text-[1.5rem] md:text-[1.875rem]" : "text-[1.0625rem]"
              )}
            >
              {project.shortTitle ?? project.title}
            </h3>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-ink-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>

          {project.stat && (
            <p className="tnum mt-6 text-[clamp(3rem,7vw,5rem)] font-bold leading-none tracking-[-0.04em] text-accent">
              <CountUp value={project.stat.value} suffix={project.stat.suffix} />
              <span className="ml-3 align-middle font-body text-[0.875rem] font-medium tracking-normal text-ink-secondary">
                {project.stat.label}
              </span>
            </p>
          )}

          <p
            className={cn(
              "leading-relaxed text-ink-secondary",
              hero ? "mt-6 max-w-[36ch] text-[1rem]" : "mt-3 text-[0.875rem]"
            )}
          >
            {project.description}
          </p>
        </div>

        <p className="mt-6 text-[0.75rem] text-ink-muted">{project.tech.join("  ·  ")}</p>
      </a>
    </TiltCard>
  );
}

