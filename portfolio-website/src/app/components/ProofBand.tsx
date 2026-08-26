import React from "react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

/**
 * The three headline numbers, evicted from the hero into their own band. The
 * hero is one message and one action; evidence belongs directly underneath it,
 * not stuffed into the same moment.
 */
const proof = [
  { value: 2, suffix: "+", label: "Years shipping production apps" },
  { value: 25, suffix: "k+", label: "Downloads of published libraries" },
  { value: 3, suffix: "", label: "Markets live in: UAE, Egypt, USA" },
];

export default function ProofBand() {
  return (
    <section className="border-y border-line py-14 md:py-16 snap-center">
      <div className="shell">
        <dl className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {proof.map((item, i) => (
            <Reveal key={item.label} index={i}>
              <div className="sm:px-2">
                <dt className="tnum text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.03em] text-ink">
                  <CountUp value={item.value} suffix={item.suffix} />
                </dt>
                <dd className="mt-3 max-w-[22ch] text-[0.9375rem] leading-snug text-ink-secondary">
                  {item.label}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
