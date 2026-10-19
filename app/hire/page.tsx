import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  HiArrowLeft,
  HiArrowUpRight,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { roles, stats } from "@/lib/experience";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire Me",
  description: `${site.fullName} is a full-stack and mobile engineer open to new roles. A 20-second overview for recruiters and hiring managers.`,
  alternates: { canonical: "/hire" },
};

// Recruiter-facing, skimmable in 20 seconds. Plain senior English, numbers where they count.
const STRENGTHS = [
  {
    title: "Ships end-to-end, solo",
    body: "I take features from database design to production. My church platform was built alone: a Next.js app and a NestJS API with 583 endpoints and a 129-model database, live and in use.",
  },
  {
    title: "Full-stack in one language",
    body: "TypeScript across the board: React and Next.js on the front, Node.js and NestJS on the back, PostgreSQL and Redis for data. Less hand-off, faster delivery.",
  },
  {
    title: "AI-native and startup-ready",
    body: "I build AI features in production at Viro and use Cursor, Claude and Copilot daily, then review and test everything before it ships. Comfortable with ambiguity and owning decisions.",
  },
];

const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "React Native",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "REST APIs",
  "AWS / Google Cloud",
  "CI/CD",
];

const LINKS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: HiOutlineEnvelope },
  { label: "Download CV", value: "PDF", href: site.resume, icon: HiOutlineDocumentText },
  { label: "LinkedIn", value: "Profile", href: site.linkedin, icon: FaLinkedinIn },
  { label: "GitHub", value: "AChris-T", href: site.githubProfile, icon: FaGithub },
];

export default function HirePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
      >
        <HiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        Full portfolio
      </Link>

      {/* Header */}
      <header className="mt-10">
        {site.available && (
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-neutral-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
            Open to work · Remote
          </p>
        )}
        <h1 className="mt-6 text-4xl font-medium tracking-[-0.03em] text-white sm:text-5xl">
          {site.fullName}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-3 text-xl text-neutral-400 sm:text-2xl">
          Full-Stack &amp; Mobile Engineer, 5+ years
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
          I build and ship production software end-to-end, from database and API to the interface
          people use every day. Recently a full platform built solo, and AI features in production at
          a UK startup.
        </p>
      </header>

      {/* Links */}
      <div className="mt-8 flex flex-wrap gap-3">
        {LINKS.map(({ label, value, href, icon: Icon }, i) => {
          const external = href.startsWith("http") || href.endsWith(".pdf");
          const primary = i === 0;
          return (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`group flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                primary
                  ? "bg-accent text-neutral-950 hover:bg-accent/85"
                  : "border border-white/15 text-white hover:border-accent/40 hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {!primary && value !== "Profile" && value !== "PDF" && (
                <span className="text-neutral-500">{value}</span>
              )}
            </a>
          );
        })}
      </div>

      {/* Stats */}
      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-background p-5 sm:p-6">
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="block text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {value}
              </span>
              <span className="mt-2 block text-xs leading-relaxed text-neutral-400 sm:text-sm">
                {label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {/* Strengths */}
      <section className="mt-16">
        <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Why me
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {STRENGTHS.map(({ title, body }) => (
            <article
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h3 className="text-lg font-medium tracking-tight text-white">{title}</h3>
              <p className="mt-3 leading-relaxed text-neutral-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Recent roles */}
      <section className="mt-16">
        <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Recent work
        </h2>
        <ul className="mt-6 space-y-4">
          {roles.slice(0, 3).map((role) => (
            <li
              key={`${role.company}-${role.period}`}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-lg font-medium tracking-tight text-white">
                  {role.title}, <span className="text-accent">{role.company}</span>
                </p>
                <p className="text-sm text-neutral-500">{role.period}</p>
              </div>
              <p className="mt-3 leading-relaxed text-neutral-400">{role.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section className="mt-16">
        <h2 className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Core stack
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {STACK.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-neutral-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-10">
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Let&apos;s talk
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-neutral-400">
          If your team needs an engineer who can own work from idea to launch, I&apos;d love to hear
          what you&apos;re building.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="group flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-neutral-950 transition-colors hover:bg-accent/85"
          >
            Email me
            <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-base font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5"
          >
            <HiOutlineDocumentText className="h-4 w-4" />
            Download CV
          </a>
        </div>
      </section>
    </main>
  );
}
