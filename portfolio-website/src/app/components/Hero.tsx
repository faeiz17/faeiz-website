"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Cta from "./Cta";
import CompanyMarquee from "./CompanyMarquee";
import portrait from "../assets/1000108673.jpg";

const NAME = ["Faeiz", "Furqan"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // The portrait drifts slower than the type it overlaps, which separates the
  // two planes in depth without any 3D scene behind it.
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16 md:pb-24 snap-center"
    >
      {/* No ambient gradient here: the WebGL field behind the whole page is
          already lighting this section, and the 3D artifact sits directly
          behind the portrait so it blooms around the frame. */}
      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/*
            min-w-0 overrides the grid item's default min-width: auto. Without
            it, a fixed-width descendant (the 46ch paragraph/marquee below,
            before that fix; now a safety net for anything else that
            shouldn't have to think about this) can force this column wider
            than its track, which drags the whole grid — portrait column
            included — off past the right edge on a narrow screen.
          */}
          <motion.div className="min-w-0" style={reduce ? undefined : { y: copyY }}>
            <h1
              aria-label={NAME.join(" ")}
              className="font-display text-[clamp(3.5rem,11vw,8rem)] font-bold leading-[0.92] tracking-[-0.04em] text-ink"
            >
              {NAME.map((word, i) => (
                // Clipped box per word: the name wipes up into place on load,
                // which is the one thing on the page worth announcing. Content
                // is aria-hidden since the h1's aria-label carries the real,
                // space-separated name for assistive tech and text extraction.
                <span key={word} aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.05 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mt-6 text-[1.05rem] font-medium text-accent md:text-[1.2rem]">
                Full stack web and mobile app developer
              </p>
              {/* min() caps the measure at 46ch on wide screens without
                  letting it outgrow the actual column on a narrow one. */}
              <p className="mt-5 max-w-[min(46ch,100%)] text-[1.0625rem] leading-relaxed text-ink-secondary">
                Published open-source libraries with 25k+ downloads and shipped performance-critical apps
                across the UAE, Egypt, and USA.
              </p>

              <CompanyMarquee />

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Cta
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  See the work
                </Cta>
                <Cta
                  href="#contact"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Get in touch
                </Cta>
              </div>
            </motion.div>
          </motion.div>

          {/* Offset low so it crosses the headline's baseline instead of sitting
              politely beside it in its own column. */}
          <motion.div
            style={reduce ? undefined : { y: portraitY }}
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[22rem] lg:mt-24 lg:max-w-none"
          >
            {/* Double bezel: an outer glass tray holding an inner plate, with
                concentric radii. Reads as machined hardware rather than an
                image with a border on it. */}
            <div className="glass rounded-[2rem] p-2">
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.5rem]">
                <Image
                  src={portrait}
                  alt="Faeiz Furqan"
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 34vw, 88vw"
                  className="size-full object-cover"
                />
                {/* Tints the photo toward the page accent so it belongs to the
                    same world as the shader instead of sitting on top of it. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{ background: "linear-gradient(150deg, rgb(127 178 255 / 0.5), transparent 60%)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
                  style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.18)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
