"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { HiArrowDown, HiArrowUpRight } from "react-icons/hi2";
import CategoryTabs from "@/components/CategoryTabs";
import generated from "@/lib/projects.generated.json";
import { projects, projectSlug, type Project } from "@/lib/projects";

type Captured = { title: string; description: string; width: number; height: number };
const captured = generated as Record<string, Captured>;

// Screenshots are taken at 1440x900, so the preview frame uses the same ratio.
const FRAME_RATIO = 900 / 1440;

// Projects revealed initially and per "Load more" click.
const PAGE_SIZE = 6;

const CATEGORIES = ["All", ...new Set(projects.map((p) => p.category))];
const COUNTS: Record<string, number> = { All: projects.length };
for (const { category } of projects) COUNTS[category] = (COUNTS[category] ?? 0) + 1;

/** "Next.js by Vercel - The React Framework" -> "Next.js by Vercel" */
function shortTitle(title?: string) {
  return title?.split(/\s+[|\-–—:]\s+/)[0]?.trim() || undefined;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const slug = projectSlug(project.url);
  const info = captured[slug];
  const domain = new URL(project.url).hostname.replace(/^www\./, "");
  const title = project.title ?? shortTitle(info?.title) ?? domain;
  const description = project.description ?? info?.description;

  // How far the screenshot travels so its bottom edge meets the bottom of the frame.
  const travel = info ? Math.max(0, 1 - (info.width * FRAME_RATIO) / info.height) * 100 : 0;
  const duration = info ? Math.max(8, info.height / 450) : 0;

  return (
    <article
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} in a new tab`}
        className="block overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-neutral-950/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          </div>
          <div className="flex h-7 flex-1 items-center justify-center gap-2 rounded-md bg-white/[0.04] px-3 text-xs text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="truncate">{domain}</span>
          </div>
          <span className="w-[42px]" />
        </div>

        {/* Auto-scrolling preview; pauses on hover so visitors can look closer */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          {info ? (
            <Image
              src={`/projects/${slug}.jpg`}
              alt={`Full-page preview of ${title}`}
              width={info.width}
              height={info.height}
              sizes="(min-width: 768px) 560px, 100vw"
              className="keep-motion animate-preview absolute inset-x-0 top-0 h-auto w-full group-hover:[animation-play-state:paused]"
              style={{ "--travel": `-${travel}%`, animationDuration: `${duration}s` } as CSSProperties}
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-neutral-500">
              Preview pending · run npm run shots
            </div>
          )}
        </div>
      </a>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-widest text-neutral-500 uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 text-xl font-medium tracking-tight text-white">{title}</h3>
          {description && (
            <p className="mt-2 line-clamp-2 leading-relaxed text-neutral-400">{description}</p>
          )}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${title}`}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-neutral-400 transition-colors duration-300 hover:border-accent/40 hover:text-accent group-hover:border-accent/40 group-hover:text-accent"
        >
          <HiArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string>("All");
  const [shown, setShown] = useState(PAGE_SIZE);
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
  const visible = filtered.slice(0, shown);
  const remaining = filtered.length - visible.length;

  const changeTab = (tab: string) => {
    setActive(tab);
    setShown(PAGE_SIZE);
  };

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-2.5 text-sm font-medium tracking-widest text-neutral-500 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
              Projects
            </p>
            <h2 className="mt-6 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Selected work, <br className="hidden sm:block" />
              <span className="text-neutral-500">live in production.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-neutral-400 lg:col-span-4">
            Live products across web and mobile. Every preview is a real capture of the
            production site, so what you see is what users get.
          </p>
        </div>

        <div className="mt-14">
          <CategoryTabs
            tabs={CATEGORIES}
            active={active}
            onChange={changeTab}
            counts={COUNTS}
            label="Project categories"
            controls="projects-grid"
          />
        </div>

        <div
          id="projects-grid"
          role="tabpanel"
          key={active}
          className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2"
        >
          {visible.map((project, i) => (
            // Stagger restarts per batch so newly loaded cards animate in together.
            <ProjectCard key={project.url} project={project} index={i % PAGE_SIZE} />
          ))}
        </div>

        {remaining > 0 && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="group flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-base font-semibold text-white transition-colors hover:border-accent/40 hover:bg-white/5"
            >
              Load more
              <span className="text-sm font-medium text-neutral-500">{remaining}</span>
              <HiArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
