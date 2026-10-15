import { HiArrowUpRight, HiOutlineAcademicCap, HiOutlineCheckBadge } from "react-icons/hi2";
import { certifications, education, roles, stats } from "@/lib/experience";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2.5 text-sm font-medium tracking-widest text-neutral-500 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80" />
              Experience
            </p>
            <h2 className="mt-6 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Where I&apos;ve <br className="hidden sm:block" />
              <span className="text-neutral-500">made an impact.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-neutral-400 lg:col-span-5">
            I use AI-assisted tooling (GitHub Copilot, Claude, Cursor) to accelerate delivery, then
            apply engineering judgment to review, harden and productionise every change.
          </p>
        </div>

        {/* Impact numbers */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-background p-6 sm:p-8">
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block text-4xl font-medium tracking-tight text-white sm:text-5xl">
                  {value}
                  <span className="text-accent">.</span>
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-neutral-400">{label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Timeline */}
        <ol className="relative mt-20 lg:mt-28">
          {/* Vertical rail */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[3px] w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent lg:left-[calc(25%-1px)]"
          />

          {roles.map((role) => (
            <li
              key={`${role.company}-${role.period}`}
              className="relative grid gap-6 pb-16 pl-10 last:pb-0 lg:grid-cols-4 lg:gap-12 lg:pl-0"
            >
              {/* Dot on the rail */}
              <span
                aria-hidden
                className="absolute top-2 left-0 h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_10px] shadow-accent/80 lg:left-[calc(25%-4px)]"
              />

              {/* Meta column */}
              <div className="lg:pr-12">
                <p className="text-sm font-medium text-white">{role.period}</p>
                <p className="mt-1 text-sm text-neutral-500">{role.type}</p>
                {role.location && <p className="mt-1 text-sm text-neutral-500">{role.location}</p>}
                {role.url && (
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-accent"
                  >
                    View live
                    <HiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>

              {/* Content */}
              <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-3 lg:ml-6">
                <h3 className="text-2xl font-medium tracking-tight text-white">{role.title}</h3>
                <p className="mt-1 text-base font-medium text-accent">{role.company}</p>
                <p className="mt-5 text-lg leading-relaxed text-neutral-300">{role.summary}</p>

                <ul className="mt-6 space-y-3">
                  {role.highlights.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-neutral-400">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-neutral-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>

        {/* Education & certifications */}
        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:mt-28">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent">
              <HiOutlineAcademicCap className="h-5 w-5" />
            </span>
            <p className="mt-8 text-xs font-medium tracking-widest text-neutral-500 uppercase">
              Education
            </p>
            <h3 className="mt-2 text-xl font-medium tracking-tight text-white">{education.degree}</h3>
            <p className="mt-1 text-neutral-400">
              {education.school}, {education.location}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent">
              <HiOutlineCheckBadge className="h-5 w-5" />
            </span>
            <p className="mt-8 text-xs font-medium tracking-widest text-neutral-500 uppercase">
              Certifications
            </p>
            <ul className="mt-3 space-y-2">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-3 text-lg font-medium text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
