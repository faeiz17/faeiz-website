"use client";

import React from "react";
import { CellSignalFull, WifiHigh, BatteryHigh, Cpu, Database, PlugsConnected } from "@phosphor-icons/react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";
import TypedText from "../TypedText";
import { skillGroups } from "../../lib/content/profile";
import {
  ReactIcon,
  ExpoIcon,
  SwiftIcon,
  KotlinIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  NextJsIcon,
  NodeJsIcon,
  ExpressIcon,
  ElasticsearchIcon,
  PHPIcon,
  LaravelIcon,
  ReduxIcon,
  TanStackQueryIcon,
  AwsIcon,
  GoogleCloudIcon,
} from "../icons/BrandMarks";

/**
 * One real logo per skill where a brand actually has one; a generic tinted
 * glyph for the handful that don't ("Native Modules", "SQL / NoSQL", "REST"
 * are concepts, not companies — there is no logo to be accurate to).
 * "TypeScript / JavaScript" is the one skill that names two brands, so it
 * gets both marks rather than picking a winner.
 */
function SkillMark({ skill, size }: { skill: string; size: number }) {
  switch (skill) {
    case "React Native":
    case "React":
      return <ReactIcon width={size} height={size} className="shrink-0" />;
    case "Expo":
      return <ExpoIcon width={size} height={size} className="shrink-0" />;
    case "SwiftUI":
      return <SwiftIcon width={size} height={size} className="shrink-0" />;
    case "Kotlin":
      return <KotlinIcon width={size} height={size} className="shrink-0" />;
    case "TypeScript / JavaScript":
      return (
        <span className="inline-flex shrink-0 items-center gap-1">
          <TypeScriptIcon width={size} height={size} />
          <JavaScriptIcon width={size} height={size} />
        </span>
      );
    case "Next.js":
      return <NextJsIcon width={size} height={size} className="shrink-0" />;
    case "TanStack Query":
      return <TanStackQueryIcon width={size} height={size} className="shrink-0" />;
    case "Redux":
      return <ReduxIcon width={size} height={size} className="shrink-0" />;
    case "AWS":
      return <AwsIcon width={size} height={size} className="shrink-0" />;
    case "Google Cloud":
      return <GoogleCloudIcon width={size} height={size} className="shrink-0" />;
    case "Node.js":
      return <NodeJsIcon width={size} height={size} className="shrink-0" />;
    case "Express":
      return <ExpressIcon width={size} height={size} className="shrink-0" />;
    case "Elasticsearch":
      return <ElasticsearchIcon width={size} height={size} className="shrink-0" />;
    case "PHP":
      return <PHPIcon width={size} height={size} className="shrink-0" />;
    case "Laravel":
      return <LaravelIcon width={size} height={size} className="shrink-0" />;
    case "Native Modules":
      return <Cpu size={size} weight="bold" className="shrink-0 text-accent" />;
    case "SQL / NoSQL":
      return <Database size={size} weight="bold" className="shrink-0 text-accent" />;
    case "REST":
      return <PlugsConnected size={size} weight="bold" className="shrink-0 text-accent" />;
    default:
      return null;
  }
}

/**
 * Each discipline is shown in the surface it actually ships to: mobile on a
 * handset, frontend in a macOS browser window, backend in a terminal.
 *
 * The chrome is deliberately accurate rather than stylised. A Mac window
 * without its red/yellow/green lights does not read as a Mac window, and a
 * terminal without a coloured prompt does not read as a terminal. Getting these
 * details right is what makes the frames land instead of looking like generic
 * boxes with rounded corners.
 *
 * These are presentation frames, not fake product screenshots: nothing inside
 * pretends to be a running app. The content is the skill list.
 */
const byTitle = Object.fromEntries(skillGroups.map((g) => [g.title, g.skills]));

/** The actual macOS window control colours. */
const TRAFFIC = ["#ff5f57", "#febc2e", "#28c840"] as const;

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-36 snap-center">
      <div className="shell">
        <SectionHeading title="What I build with" />

        {/* Phone is tall so it takes the full height on the left; the two wide
            windows stack beside it. Not three equal columns. */}
        <div className="mt-10 grid gap-5 md:mt-20 lg:grid-cols-[minmax(0,17rem)_1fr] lg:items-stretch">
          <Reveal className="mx-auto w-full max-w-[17rem] lg:mx-0">
            <Phone skills={byTitle.Mobile ?? []} />
          </Reveal>

          <div className="grid gap-5">
            <Reveal index={1}>
              <BrowserWindow skills={byTitle.Frontend ?? []} />
            </Reveal>
            <Reveal index={2}>
              <TerminalWindow skills={byTitle.Backend ?? []} />
            </Reveal>
          </div>
        </div>

        <Reveal index={3} className="mt-5 md:mt-20">
          <p className="mx-auto max-w-3xl text-center font-display text-[1.75rem] font-medium italic leading-[1.3] tracking-[-0.01em] text-ink-secondary md:text-[2.25rem]">
            <TypedText
              breakBetween
              segments={[
                { text: "A craftsman is known by his tools" },
                { text: "mine just happen to ship to production.", className: "text-ink" },
              ]}
            />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Light falling across a screen. Keeps the glass from reading as flat fill. */
function Glare() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(148deg, rgb(255 255 255 / 0.08) 0%, transparent 36%, transparent 100%)",
      }}
    />
  );
}

/**
 * macOS window controls. The inner ring is what stops them looking like flat
 * circles: the real ones have a slightly darker rim and a soft top highlight.
 */
function TrafficLights() {
  return (
    <span aria-hidden className="flex shrink-0 gap-2">
      {TRAFFIC.map((color) => (
        <span
          key={color}
          className="size-3 rounded-full"
          style={{
            background: color,
            boxShadow: `inset 0 0 0 0.5px rgb(0 0 0 / 0.22), inset 0 1px 0 rgb(255 255 255 / 0.28)`,
          }}
        />
      ))}
    </span>
  );
}

function Phone({ skills }: { skills: readonly string[] }) {
  return (
    <TiltCard maxTilt={7} className="group h-full">
      {/* Double bezel: a brushed-metal outer shell holding the screen, inner
          radius stepped down from the outer so the curves stay concentric the
          way real hardware does. */}
      <div
        className="relative h-full rounded-[2.4rem] p-[5px] shadow-floating"
        style={{
          background:
            "linear-gradient(165deg, rgb(255 255 255 / 0.24), rgb(255 255 255 / 0.05) 45%, rgb(255 255 255 / 0.14))",
        }}
      >
        <div className="relative flex h-full min-h-[30rem] flex-col overflow-hidden rounded-[2.05rem] bg-[#0a0a10]">
          <Glare />

          {/* iOS status bar, wrapping the dynamic island the way the real one
              does: clock to the left of the cutout, radios to the right. */}
          <div className="relative flex items-center justify-between px-6 pt-3.5 text-ink">
            <span className="text-[0.75rem] font-semibold tabular-nums">9:41</span>
            <span
              aria-hidden
              className="absolute left-1/2 top-2.5 h-[1.35rem] w-[5.2rem] -translate-x-1/2 rounded-full bg-black"
            />
            <span className="flex items-center gap-1">
              <CellSignalFull size={13} weight="fill" />
              <WifiHigh size={13} weight="fill" />
              <BatteryHigh size={16} weight="fill" />
            </span>
          </div>

          <div className="relative flex flex-1 flex-col px-5 pb-7 pt-8">
            <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-ink">
              Mobile
            </h3>

            <ul className="mt-4">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2.5 border-t border-line py-3 text-[0.9375rem] text-ink-secondary last:border-b"
                >
                  <SkillMark skill={skill} size={17} />
                  {skill}
                </li>
              ))}
            </ul>

            {/* Home indicator */}
            <span
              aria-hidden
              className="mx-auto mt-auto h-[3px] w-[6.5rem] rounded-full bg-white/25"
            />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function BrowserWindow({ skills }: { skills: readonly string[] }) {
  return (
    <TiltCard maxTilt={4} className="group h-full">
      <div className="glass h-full overflow-hidden rounded-card">
        {/* Safari-style title bar: controls hard left, address centred. */}
        <div className="flex items-center gap-3 border-b border-line bg-white/[0.03] px-4 py-3">
          <TrafficLights />
          <span className="mx-auto w-full max-w-[18rem] truncate rounded-md bg-black/30 px-3 py-1 text-center text-[0.75rem] text-ink-muted">
            faeizfurqan.com
          </span>
          {/* Balances the controls so the address bar sits optically centred. */}
          <span aria-hidden className="w-[3.25rem] shrink-0" />
        </div>

        <div className="relative p-6 md:p-7">
          <Glare />
          <div className="relative">
            <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-ink">
              Frontend
            </h3>
            <ul className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex items-center gap-2.5 font-display text-[1.375rem] font-bold tracking-[-0.02em] text-ink-secondary transition-colors duration-300 hover:text-accent md:text-[1.75rem]"
                >
                  <SkillMark skill={skill} size={22} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function TerminalWindow({ skills }: { skills: readonly string[] }) {
  return (
    <TiltCard maxTilt={4} className="group h-full">
      <div className="h-full overflow-hidden rounded-card border border-line shadow-lifted">
        {/* Terminal.app title bar. Same controls, lighter bar, centred title. */}
        <div className="relative flex items-center border-b border-line bg-white/[0.05] px-4 py-3">
          <TrafficLights />
          <span className="absolute inset-x-0 text-center text-[0.75rem] text-ink-muted">
            faeiz — zsh — 80×24
          </span>
        </div>

        {/* A real terminal is near-black, not frosted glass, so this one panel
            opts out of the page's glass treatment. */}
        <div className="bg-[#07070b] p-6 font-mono text-[0.875rem] leading-relaxed md:p-7 h-full">
          <p>
            <span style={{ color: "#28c840" }}>faeiz@services</span>{" "}
            <span style={{ color: "#5fd4ff" }}>~</span>{" "}
            <span className="text-ink-muted">%</span>{" "}
            <span className="text-ink">stack</span>{" "}
            <span style={{ color: "#febc2e" }}>--backend</span>
          </p>

          <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-ink-secondary">
            {skills.map((skill) => (
              <li key={skill} className="inline-flex items-center gap-1.5">
                <SkillMark skill={skill} size={14} />
                {skill}
              </li>
            ))}
          </ul>

          <p className="mt-3 flex items-center gap-2">
            <span style={{ color: "#28c840" }}>faeiz@services</span>
            <span style={{ color: "#5fd4ff" }}>~</span>
            <span className="text-ink-muted">%</span>
            {/* One live detail; everything else in the frame is still. */}
            <span aria-hidden className="inline-block h-[1.05em] w-[0.55em] animate-pulse bg-ink/70" />
          </p>
        </div>
      </div>
    </TiltCard>
  );
}
