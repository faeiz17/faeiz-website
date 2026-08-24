"use client";

import React, { useState } from "react";
import { CheckCircle, CircleNotch, PaperPlaneTilt } from "@phosphor-icons/react";

type Status = "idle" | "sending" | "success" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/**
 * Field names (name, email, message, botcheck) are fixed by the Web3Forms
 * endpoint and by browser autofill. Renaming them breaks both, so they stay as
 * they are regardless of how the markup around them changes.
 */
const fieldClass =
  "w-full rounded-inner border border-line bg-white/[0.04] px-4 py-3 text-[0.9375rem] text-ink " +
  "transition-colors duration-300 placeholder:text-ink-muted hover:border-line-strong " +
  "focus:border-accent focus:outline-none focus-visible:outline-none";

const labelClass = "block text-[0.8125rem] font-medium text-ink-secondary";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!ACCESS_KEY) {
      window.location.href = "mailto:mfaeiz.furqan@gmail.com";
      return;
    }

    setStatus("sending");
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New message from faeizfurqan.com");

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass flex w-full max-w-lg flex-col items-center gap-3 rounded-card px-6 py-12">
        <CheckCircle size={34} weight="fill" className="text-accent" />
        <p className="font-medium text-ink">Message sent.</p>
        <p className="text-[0.9375rem] text-ink-secondary">I usually reply within a day.</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg text-left">
      {/* Honeypot. Hidden from humans and from assistive tech alike. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="cf-name" className={labelClass}>
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <label htmlFor="cf-message" className={labelClass}>
          Message
        </label>
        <textarea id="cf-message" name="message" required rows={4} className={`${fieldClass} resize-y`} />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-[0.9375rem] font-medium text-ink-inverse transition-colors duration-300 hover:bg-accent-hover active:scale-[0.98] disabled:opacity-70"
      >
        {sending ? <CircleNotch size={17} className="animate-spin" /> : <PaperPlaneTilt size={17} />}
        {sending ? "Sending" : "Send message"}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-4 text-[0.875rem] text-ink-secondary">
          That did not go through. Email{" "}
          <a href="mailto:mfaeiz.furqan@gmail.com" className="text-accent underline underline-offset-4">
            mfaeiz.furqan@gmail.com
          </a>{" "}
          directly instead.
        </p>
      )}
    </form>
  );
}
