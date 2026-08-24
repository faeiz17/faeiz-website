"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { cn } from "../utils/cn";

/**
 * Page order, and short labels on purpose: five links plus the wordmark and the
 * action is the most that holds one line at 1024px. "Credentials" was the item
 * that pushed it over, hence "Certs".
 */
const navItems = [
  { label: "Work", id: "experience" },
  { label: "Stack", id: "skills" },
  { label: "AI", id: "ai" },
  { label: "Projects", id: "projects" },
  { label: "Certs", id: "certifications" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const { scrollY } = useScroll();

  // A discrete boolean, not a continuous value, so state is the right home for
  // it. The continuous scroll position stays inside the motion value.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 24);
  });

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 md:pt-6">
        <nav
          className={cn(
            "pointer-events-auto flex h-14 w-full max-w-[62rem] items-center justify-between gap-2 rounded-full pl-5 pr-2",
            "transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]",
            condensed
              ? "glass"
              : "border border-transparent bg-transparent"
          )}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-ink"
          >
            Faeiz Furqan
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="rounded-full px-3 py-2 text-[0.9rem] font-medium text-ink-secondary transition-colors duration-300 hover:bg-accent-ghost hover:text-accent"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => go("contact")}
              className="hidden rounded-full bg-accent px-5 py-2.5 text-[0.9rem] font-medium text-ink-inverse transition-colors duration-300 hover:bg-accent-hover md:block"
            >
              Get in touch
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-9 place-items-center rounded-full text-ink md:hidden"
            >
              <List size={20} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[95] bg-surface/92 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-16 items-center justify-end px-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full text-ink"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-2 px-6 pt-6">
              {navItems.map((item, i) => (
                // Each link rises out of its own clipped box, staggered, so the
                // menu resolves as a sequence rather than a block appearing.
                <div key={item.id} className="overflow-hidden py-1">
                  <motion.button
                    type="button"
                    onClick={() => go(item.id)}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.55, delay: 0.06 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-display text-[2.25rem] font-bold leading-tight tracking-[-0.03em] text-ink"
                  >
                    {item.label}
                  </motion.button>
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-medium text-ink-inverse"
                >
                  Get in touch
                </button>
                <a
                  href="/Faeiz_Furqan_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line-strong px-6 py-3.5 text-center text-[0.95rem] font-medium text-ink"
                >
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
