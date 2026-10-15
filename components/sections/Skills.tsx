"use client";

import { useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { HiOutlineQueueList } from "react-icons/hi2";
import {
  SiAndroid,
  SiAngular,
  SiBootstrap,
  SiClaude,
  SiCss,
  SiCursor,
  SiDocker,
  SiExpo,
  SiGithub,
  SiGithubcopilot,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJquery,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiSass,
  SiSentry,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
  SiVuedotjs,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import CategoryTabs from "@/components/CategoryTabs";

type Category =
  | "Frontend"
  | "Mobile"
  | "Backend"
  | "Data"
  | "Cloud & DevOps"
  | "Testing"
  | "AI Tools";

// Matches the skills on the CV (public/resume.pdf).
const SKILLS: { name: string; icon: IconType; color: string; category: Category }[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "Frontend" },
  { name: "React", icon: SiReact, color: "#61DAFB", category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", category: "Frontend" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", category: "Frontend" },
  { name: "Angular", icon: SiAngular, color: "#DD0031", category: "Frontend" },
  { name: "jQuery", icon: SiJquery, color: "#0769AD", category: "Frontend" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC", category: "Frontend" },
  { name: "React Query", icon: SiReactquery, color: "#FF4154", category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "Frontend" },
  { name: "Sass", icon: SiSass, color: "#CC6699", category: "Frontend" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", category: "Frontend" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "Frontend" },
  { name: "CSS", icon: SiCss, color: "#663399", category: "Frontend" },

  { name: "React Native", icon: SiReact, color: "#61DAFB", category: "Mobile" },
  { name: "Expo", icon: SiExpo, color: "#FFFFFF", category: "Mobile" },
  { name: "EAS Build", icon: SiExpo, color: "#B6D7A8", category: "Mobile" },
  { name: "Android", icon: SiAndroid, color: "#3DDC84", category: "Mobile" },

  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", category: "Backend" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E", category: "Backend" },
  { name: "Python", icon: SiPython, color: "#3776AB", category: "Backend" },
  { name: "REST APIs", icon: TbApi, color: "#B6D7A8", category: "Backend" },
  { name: "Prisma", icon: SiPrisma, color: "#FFFFFF", category: "Backend" },
  { name: "Supabase Auth", icon: SiSupabase, color: "#3FCF8E", category: "Backend" },
  { name: "BullMQ", icon: HiOutlineQueueList, color: "#FF4438", category: "Backend" },

  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Data" },
  { name: "Redis", icon: SiRedis, color: "#FF4438", category: "Data" },

  { name: "Git & GitHub", icon: SiGithub, color: "#FFFFFF", category: "Cloud & DevOps" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", category: "Cloud & DevOps" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4", category: "Cloud & DevOps" },
  { name: "Sentry", icon: SiSentry, color: "#FFFFFF", category: "Cloud & DevOps" },

  { name: "Jest", icon: SiJest, color: "#C21325", category: "Testing" },
  { name: "Vitest", icon: SiVitest, color: "#FCC72B", category: "Testing" },

  { name: "GitHub Copilot", icon: SiGithubcopilot, color: "#FFFFFF", category: "AI Tools" },
  { name: "Claude", icon: SiClaude, color: "#D97757", category: "AI Tools" },
  { name: "Cursor", icon: SiCursor, color: "#FFFFFF", category: "AI Tools" },
];

const TABS = [
  "All",
  "Frontend",
  "Mobile",
  "Backend",
  "Data",
  "Cloud & DevOps",
  "Testing",
  "AI Tools",
] as const;
type Tab = (typeof TABS)[number];

const COUNTS: Record<string, number> = { All: SKILLS.length };
for (const { category } of SKILLS) COUNTS[category] = (COUNTS[category] ?? 0) + 1;

export default function Skills() {
  const [active, setActive] = useState<Tab>("All");
  const visible = active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2.5 text-sm font-medium tracking-widest text-neutral-500 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
              Skills
            </p>
            <h2 className="mt-6 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              The toolkit behind <br className="hidden sm:block" />
              <span className="text-neutral-500">the work.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-neutral-400 lg:col-span-5">
            A deliberately focused stack, chosen for type safety, delivery speed and long-term
            maintainability across web, mobile and backend.
          </p>
        </div>

        <div className="mt-14">
          <CategoryTabs
            tabs={TABS}
            active={active}
            onChange={setActive}
            counts={COUNTS}
            label="Skill categories"
            controls="skills-grid"
          />
        </div>

        {/* Skill tiles; keyed by tab so they re-enter on each switch */}
        <ul
          id="skills-grid"
          role="tabpanel"
          key={active}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {visible.map(({ name, icon: Icon, color, category }, i) => (
            <li
              key={name}
              style={{ "--brand": color, animationDelay: `${i * 25}ms` } as CSSProperties}
              className="group animate-fade-up flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <Icon className="h-7 w-7 text-neutral-400 transition-colors duration-300 group-hover:text-(--brand)" />
              <div>
                <p className="font-medium text-white">{name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{category}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
