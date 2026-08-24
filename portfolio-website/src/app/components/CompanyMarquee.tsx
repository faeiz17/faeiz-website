"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { useReducedMotion } from "motion/react";
import dubizzleLabs from "../assets/companies/dubizzle-labs.png";
import bayut from "../assets/companies/bayut.png";
import weAreVery from "../assets/companies/we-are-very.png";
import sevenStacks from "../assets/companies/seven-stacks.png";
import socialDev from "../assets/companies/socialdev.png";
import arbisoft from "../assets/companies/arbisoft.svg";
import { EdXIcon } from "./icons/BrandMarks";

interface Company {
  name: string;
  href: string;
  /** Render height in px; width follows from each source image's own aspect ratio. */
  height: number;
  /** A raster/vector file, for logos sourced as static assets. */
  src?: typeof dubizzleLabs;
  /** A path-data mark from BrandMarks, for logos already available that way (edX, shared with the AI section's brand icons). */
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  /**
   * Seven Stacks' asset is a dark wordmark meant for a light header — this is
   * the exact CSS filter their own site applies to invert it for dark
   * backgrounds (recovered from their stylesheet's .logo-invert rule), not a
   * guess: invert flips the near-black text to white, and the hue-rotate
   * un-does the same flip on the green accent so it lands back on green
   * instead of magenta.
   */
  filterClass?: string;
  /**
   * SocialDev's mark pairs a navy wordmark with a gold one — the gold half
   * reads fine on this dark background, but the navy half is close enough to
   * the page background to nearly vanish once dimmed to the marquee's idle
   * opacity. A white chip is the standard fix for a logo whose own palette
   * assumes a light background, same as any "trusted by" strip with a mixed
   * set of brand colours.
   */
  chip?: boolean;
}

const COMPANIES: Company[] = [
  { name: "Dubizzle Labs", src: dubizzleLabs, href: "https://www.dubizzlelabs.com/", height: 22 },
  { name: "Bayut", src: bayut, href: "https://www.bayut.com/", height: 24 },
  { name: "We Are Very", src: weAreVery, href: "https://wearevery.com/", height: 34 },
  {
    name: "Seven Stacks",
    src: sevenStacks,
    href: "https://www.sevenstacks.net/",
    height: 26,
    filterClass: "invert hue-rotate-180",
  },
  { name: "SocialDev", src: socialDev, href: "https://www.linkedin.com/company/socialdevil/", height: 35,},
  { name: "Arbisoft", src: arbisoft, href: "https://arbisoft.com/", height: 20 },
  { name: "edX", icon: EdXIcon, href: "https://www.edx.org/", height: 30 },
];

/**
 * "Companies I've worked with" strip beneath the hero summary. Reuses the
 * exact marquee mechanics Certifications already established (two copies of
 * the row, translate -50% for a seamless loop, animate-marquee from
 * globals.css) rather than inventing a second technique for the same effect.
 */
export default function CompanyMarquee() {
  const reduce = useReducedMotion();

  return (
    // min() caps this at 46ch (matching the paragraph above it) on wide
    // screens, without letting a fixed ch-width outgrow a narrow one — 46ch
    // is wider than most phone screens, and unlike prose it can't wrap to
    // compensate: the marquee track is nowrap by design.
    <div className="mt-10 max-w-[min(46ch,100%)]">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Worked with
      </p>

      {reduce ? (
        <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
          {COMPANIES.map((c) => (
            <li key={c.name}>
              <Logo company={c} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="group/row relative mt-4 flex overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
        >
          {/*
            One track holding both copies back to back, not two independently
            animated tracks. The marquee keyframe moves an element by -50% of
            ITS OWN width — with two separate <ul>s that only shifts each one
            by half of a single copy's width, so the pair stays in lockstep
            but the whole strip snaps backward every time the animation
            restarts. With both copies inside one track, -50% of the track's
            (double) width is exactly one copy's width, so the restart frame
            is pixel-identical to the frame before it and the loop is seamless.
          */}
          <ul
            // Seven logos is a much shorter loop than Certifications' full
            // credential list, so it gets its own (faster) pace via an
            // inline duration override rather than editing the shared
            // --animate-marquee timing everything else still uses.
            style={{ animationDuration: "15s" }}
            className="flex shrink-0 items-center gap-7.5 pr-10 animate-marquee group-hover/row:[animation-play-state:paused]"
          >
            {[0, 1].map((copy) =>
              COMPANIES.map((c) => (
                <li key={`${copy}-${c.name}`} aria-hidden={copy === 1} className="shrink-0">
                  <Logo company={c} tabbable={copy === 0} />
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function Logo({ company, tabbable = true }: { company: Company; tabbable?: boolean }) {
  const Icon = company.icon;
  const img = Icon ? (
    // BrandMarks icons carry their own fill (already picked for legibility
    // on dark), so this just sizes the mark — no colour class needed.
    <Icon aria-label={company.name} className="w-auto" style={{ height: company.height }} />
  ) : (
    <Image
      src={company.src!}
      alt={company.name}
      height={company.height}
      className={company.filterClass ? `w-auto ${company.filterClass}` : "w-auto"}
      style={{ height: company.height }}
    />
  );

  return (
    <a
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabbable ? undefined : -1}
      className={
        // The chip logo already sits inside a solid white card, which reads
        // as "quieter than the page" on its own — grayscaling it too would
        // collapse its own colours against that white background instead of
        // against the dark page, and (as with SocialDev's pink/gold mark)
        // can wash it out to near-illegible.
        company.chip
          ? "block opacity-80 transition-opacity duration-300 hover:opacity-100"
          : "block opacity-70 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
      }
    >
      {company.chip ? (
        <span className="inline-flex items-center rounded-md bg-white p-1.5">{img}</span>
      ) : (
        img
      )}
    </a>
  );
}
