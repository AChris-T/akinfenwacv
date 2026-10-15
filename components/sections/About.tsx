import type { IconType } from "react-icons";
import {
  HiArrowRight,
  HiOutlineArrowDownTray,
  HiOutlineBolt,
  HiOutlineCodeBracket,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import RevealText from "@/components/RevealText";
import { site } from "@/lib/site";

const LEAD =
  "I'm a fullstack and mobile engineer who designs, builds and operates software across the entire stack, from data modelling and API contracts to cross-platform clients. I turn ambiguous requirements into resilient architecture and own delivery from first commit to production.";

const BODY =
  "My core stack is TypeScript end-to-end: Next.js, React, Vue.js and Angular on the web, React Native with Expo on mobile, and NestJS services backed by PostgreSQL, Prisma and Redis. I also modernise legacy jQuery codebases without disrupting delivery. I prioritise observability, comprehensive test coverage and maintainable abstractions, and I'm comfortable driving technical decisions, reviewing code and raising the engineering bar across a team.";

const FACTS = [
  { label: "Focus", value: "Product engineering" },
  { label: "Platforms", value: "Web · iOS · Android" },
  { label: "Approach", value: "Architecture‑first, outcome‑driven" },
  { label: "Status", value: site.available ? "Open to work" : "Currently booked" },
];

const PRINCIPLES: { icon: IconType; title: string; body: string }[] = [
  {
    icon: HiOutlineSquare3Stack3D,
    title: "Full lifecycle ownership",
    body: "From domain modelling and API design to CI/CD and production monitoring. I own outcomes, not tickets.",
  },
  {
    icon: HiOutlineBolt,
    title: "Performance as a feature",
    body: "Efficient queries, smart caching and optimised rendering, measured against real-user metrics rather than assumptions.",
  },
  {
    icon: HiOutlineCodeBracket,
    title: "Built to scale",
    body: "Strongly typed boundaries, test coverage and clear abstractions that keep velocity high as the codebase and team grow.",
  },
];

const TESTING = [
  { name: "Unit testing", scope: "Isolated business logic, utilities and services" },
  { name: "Integration testing", scope: "Modules, databases and third-party services working together" },
  { name: "Component testing", scope: "UI components in isolation across web and mobile" },
  { name: "End-to-end testing", scope: "Critical user journeys through the full stack" },
  { name: "API testing", scope: "Endpoints, payload validation, auth and error handling" },
  { name: "Contract testing", scope: "Guaranteed compatibility between services and clients" },
  { name: "Regression testing", scope: "Protecting existing behaviour on every release" },
  { name: "Visual regression testing", scope: "Catching unintended UI changes before users do" },
  { name: "Performance testing", scope: "Response times and rendering under real-world conditions" },
  { name: "Load & stress testing", scope: "System behaviour at and beyond peak traffic" },
  { name: "Accessibility testing", scope: "WCAG compliance, screen readers and keyboard flows" },
  { name: "Cross-browser & device testing", scope: "Consistent behaviour on every browser, iOS and Android" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 pt-16 pb-28 sm:px-10 lg:pt-24 lg:pb-40">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: sticky heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="flex items-center gap-2.5 text-sm font-medium tracking-widest text-neutral-500 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
                About me
              </p>
              <h2 className="mt-6 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                Engineering systems, <span className="text-neutral-500">not just features.</span>
              </h2>
            </div>
          </div>

          {/* Right: story */}
          <div className="lg:col-span-7">
            <RevealText
              text={LEAD}
              className="text-2xl leading-snug font-medium tracking-tight text-white sm:text-3xl"
            />
            <p className="mt-8 text-lg leading-relaxed text-neutral-400">{BODY}</p>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {FACTS.map(({ label, value }) => (
                <div key={label} className="bg-background p-5 sm:p-6">
                  <dt className="text-xs font-medium tracking-widest text-neutral-500 uppercase">
                    {label}
                  </dt>
                  <dd className="mt-2 flex items-center gap-2 text-base font-medium text-white">
                    {label === "Status" && site.available && (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    )}
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-base font-semibold text-neutral-950 transition-colors hover:bg-accent/85"
              >
                <HiOutlineArrowDownTray className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
              <a
                href="#contact"
                className="group flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-base font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Let&apos;s talk
                <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* How I work */}
        <div className="mt-24 grid gap-4 md:grid-cols-3 lg:mt-32">
          {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
            >
              <span className="absolute top-8 right-8 font-mono text-sm text-neutral-600">
                0{i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-8 text-xl font-medium tracking-tight text-white">{title}</h3>
              <p className="mt-3 leading-relaxed text-neutral-400">{body}</p>
            </article>
          ))}
        </div>

        {/* Testing strategy */}
        <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent">
                <HiOutlineShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-8 text-2xl font-medium tracking-tight text-white">
                Quality at every layer
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-400">
                A layered testing strategy that catches defects early, keeps releases predictable
                and lets teams ship with confidence.
              </p>
            </div>

            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {TESTING.map(({ name, scope }) => (
                <li key={name} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
                  <div>
                    <p className="font-medium text-white">{name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">{scope}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
