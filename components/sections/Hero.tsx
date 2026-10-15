"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiArrowRight, HiOutlineEnvelope } from "react-icons/hi2";
import {
  SiAngular,
  SiDocker,
  SiExpo,
  SiGooglecloud,
  SiJquery,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { site } from "@/lib/site";

// The layers of the stack the rotating word cycles through.
const PLATFORMS = ["the web", "iOS", "Android", "the cloud"];

const TECH: { name: string; icon: IconType; color: string }[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Expo", icon: SiExpo, color: "#FFFFFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", icon: SiPrisma, color: "#FFFFFF" },
  { name: "Redis", icon: SiRedis, color: "#FF4438" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "jQuery", icon: SiJquery, color: "#0769AD" },
];

const SOCIALS = [
  { label: "GitHub", href: site.github, icon: FaGithub },
  { label: "LinkedIn", href: site.linkedin, icon: FaLinkedinIn },
  { label: "Email", href: `mailto:${site.email}`, icon: HiOutlineEnvelope },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % PLATFORMS.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      key={index}
      className="animate-word-in inline-block font-medium whitespace-nowrap text-accent"
    >
      {PLATFORMS[index]}
    </span>
  );
}

function TechList({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {TECH.map(({ name, icon: Icon, color }) => (
        <li
          key={name}
          style={{ "--brand": color } as CSSProperties}
          className="group/item flex items-center gap-3 pr-14 text-lg font-medium whitespace-nowrap text-neutral-500 transition-colors hover:text-white"
        >
          <Icon className="h-6 w-6 transition-colors duration-300 group-hover/item:text-(--brand)" />
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh scroll-mt-24 flex-col justify-center overflow-hidden px-6 pt-36 pb-16 sm:px-10"
    >
      {/* Dot grid: echoes the navbar's active dot, fading out from behind the title */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, #000 20%, transparent 75%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="animate-fade-up flex flex-wrap items-center gap-x-4 gap-y-3" style={delay(0)}>
          <p className="text-lg text-neutral-400">
            Hi, I&apos;m <span className="font-medium text-white">{site.fullName}</span>
          </p>
          {site.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-neutral-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
              Open to work
            </span>
          )}
        </div>

        <h1
          className="animate-fade-up mt-6 text-[clamp(2.75rem,8.5vw,7.25rem)] leading-[0.95] font-medium tracking-[-0.04em] text-white"
          style={delay(100)}
        >
          {/* Name in the main heading for search engines and screen readers; the greeting above shows it visually */}
          <span className="sr-only">{site.fullName}, </span>
          Fullstack <span className="font-light text-neutral-500">&amp;</span> Mobile{" "}
          <br />
          Engineer
          {/* The brand dot doubles as the full stop */}
          <span
            aria-hidden
            className="ml-[0.06em] inline-block h-[0.13em] w-[0.13em] rounded-full bg-accent shadow-[0_0_24px] shadow-accent/60"
          />
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <p
            className="animate-fade-up max-w-2xl text-xl leading-snug text-neutral-400 sm:text-2xl"
            style={delay(200)}
          >
            I architect and ship production-grade software end‑to‑end, engineered for{" "}
            <RotatingWord />
          </p>

          <div className="animate-fade-up flex flex-wrap items-center gap-2 sm:gap-3" style={delay(300)}>
            <a
              href="#projects"
              className="group flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold whitespace-nowrap text-neutral-950 transition-colors hover:bg-accent/85 sm:h-12 sm:px-7 sm:text-base"
            >
              View my work
              <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-neutral-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent sm:h-12 sm:w-12"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tech marquee: pauses on hover, brand colour reveals per item */}
      <div
        className="animate-fade-up mx-auto mt-24 w-full max-w-6xl overflow-hidden"
        style={{
          ...delay(400),
          maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="keep-motion animate-marquee flex w-max hover:[animation-play-state:paused]">
          <TechList />
          <TechList hidden />
        </div>
      </div>
    </section>
  );
}
