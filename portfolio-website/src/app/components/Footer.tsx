import React from "react";
import { GithubLogo, LinkedinLogo, FilePdf } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

const socials = [
  { label: "GitHub", href: "https://github.com/faeizfurqan17", Icon: GithubLogo },
  { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-faeiz177", Icon: LinkedinLogo },
  { label: "Resume", href: "/Faeiz_Furqan_Resume.pdf", Icon: FilePdf },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line py-24 md:py-36">
      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
            Get in touch
          </h2>
        </Reveal>

        <Reveal index={1}>
          <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-secondary">
            Open to full-time roles and freelance work in mobile and full stack.
          </p>
        </Reveal>

        <Reveal index={2} className="mt-12 flex w-full justify-center">
          <ContactForm />
        </Reveal>

        <Reveal index={3} className="mt-14">
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.875rem] text-ink-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  <Icon size={17} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 w-full border-t border-line pt-8">
          <p className="text-[0.8125rem] text-ink-muted">
            Lahore, Pakistan · mfaeiz.furqan@gmail.com
          </p>
          <p className="mt-1.5 text-[0.8125rem] text-ink-muted">
            © {new Date().getFullYear()} Muhammad Faeiz Furqan
          </p>
        </div>
      </div>
    </footer>
  );
}
