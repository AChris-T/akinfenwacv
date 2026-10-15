"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  HiArrowUpRight,
  HiCheck,
  HiOutlineClipboard,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { site } from "@/lib/site";

const LINKS: { label: string; value: string; href: string; icon: IconType }[] = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: HiOutlineEnvelope },
  {
    label: "LinkedIn",
    value: "akinfenwa-taiwo-christopher",
    href: site.linkedin,
    icon: FaLinkedinIn,
  },
  { label: "GitHub", value: "AChris-T", href: site.github, icon: FaGithub },
  { label: "CV", value: "Download PDF", href: site.resume, icon: HiOutlineDocumentText },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`flex h-12 items-center gap-2 rounded-full border px-6 text-base font-semibold transition-colors ${
        copied
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-white/15 text-white hover:border-white/30 hover:bg-white/5"
      }`}
    >
      {copied ? <HiCheck className="h-4 w-4" /> : <HiOutlineClipboard className="h-4 w-4" />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden px-6 py-28 sm:px-10 lg:py-40">
      {/* Dot grid echoing the hero, so the page opens and closes the same way */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 55% at 30% 45%, #000 15%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 30% 45%, #000 15%, transparent 75%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <p className="flex items-center gap-2.5 text-sm font-medium tracking-widest text-neutral-500 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
          Contact
        </p>

        <h2 className="mt-6 text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.04em] text-white">
          Let&apos;s build something <br className="hidden md:block" />
          <span className="text-neutral-500">worth shipping</span>
          <span
            aria-hidden
            className="ml-[0.06em] inline-block h-[0.13em] w-[0.13em] rounded-full bg-accent shadow-[0_0_24px] shadow-accent/60"
          />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pitch + email */}
          <div className="lg:col-span-6">
            <p className="max-w-lg text-lg leading-relaxed text-neutral-400">
              Have a product to build, or a team that needs an engineer who can own work from
              idea to launch? I&apos;m open to new roles and projects, and happy to talk through
              what you have in mind.
            </p>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <p className="flex items-center gap-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
                {site.available && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                )}
                {site.available ? "Available for work" : "Get in touch"}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 block text-xl font-medium tracking-tight break-all text-white transition-colors hover:text-accent sm:text-2xl"
              >
                {site.email}
              </a>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-neutral-950 transition-colors hover:bg-accent/85"
                >
                  Send an email
                  <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <CopyEmail />
              </div>
            </div>
          </div>

          {/* Contact list */}
          <ul className="border-t border-white/10 lg:col-span-6">
            {LINKS.map(({ label, value, href, icon: Icon }) => {
              const external = href.startsWith("http") || href.endsWith(".pdf");
              return (
                <li key={label} className="border-b border-white/10">
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 py-6 transition-colors"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-neutral-400 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium tracking-widest text-neutral-500 uppercase">
                        {label}
                      </span>
                      <span className="mt-1 block truncate text-lg font-medium text-white">
                        {value}
                      </span>
                    </span>
                    <HiArrowUpRight className="h-5 w-5 shrink-0 text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
