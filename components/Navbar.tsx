"use client";

import { useEffect, useRef, useState } from "react";
import { sections, site, type SectionId } from "@/lib/site";

export default function Navbar() {
  const [active, setActive] = useState<SectionId>("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const clickLock = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      if (clickLock.current !== null) return;

      // Active section: the one whose top most recently passed 40% down the viewport.
      // Compared by position, not list order, so reordering sections on the page can't break it.
      // Sections are looked up on every pass so re-rendered or hot-reloaded sections are never stale.
      const line = window.innerHeight * 0.4;
      let current: SectionId = sections[0].id;
      let closest = -Infinity;
      for (const { id } of sections) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > closest) {
          closest = top;
          current = id;
        }
      }
      // At the bottom of the page the last section wins, even if it's too short to reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const selectSection = (id: SectionId) => {
    setActive(id);
    setMenuOpen(false);
    if (clickLock.current !== null) window.clearTimeout(clickLock.current);
    clickLock.current = window.setTimeout(() => {
      clickLock.current = null;
    }, 900);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={`relative mx-auto transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "max-w-4xl" : "max-w-full"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`flex h-16 items-center justify-between rounded-full border pr-2 pl-7 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${
            scrolled
              ? "border-white/10 bg-neutral-950/70"
              : "border-transparent bg-neutral-950/40"
          }`}
        >
          {/* Wordmark */}
          <a
            href="#home"
            onClick={() => selectSection("home")}
            className="text-lg font-semibold tracking-tight text-white"
          >
            {site.name}
            <span className="text-neutral-500">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center lg:flex">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => selectSection(id)}
                  aria-current={active === id ? "page" : undefined}
                  className={`flex items-center px-3.5 py-2 text-base font-medium transition-colors duration-200 ${
                    active === id ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80 transition-all duration-300 ease-out ${
                      active === id ? "mr-2 w-1.5 opacity-100" : "mr-0 w-0 opacity-0"
                    }`}
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={() => selectSection("contact")}
              className="flex h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold whitespace-nowrap text-neutral-950 transition-colors hover:bg-accent/85 sm:h-11 sm:px-6 sm:text-base"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={`absolute left-0 h-px w-4 bg-white transition-all duration-300 ${
                    menuOpen ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-white transition-all duration-300 ${
                    menuOpen ? "top-1/2 -rotate-45" : "top-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu: sibling of <nav> so its backdrop blur sees the page beneath */}
        {menuOpen && (
          <ul
            id="mobile-nav"
            className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-white/10 bg-neutral-950/80 p-2 backdrop-blur-xl backdrop-saturate-150 lg:hidden"
          >
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => selectSection(id)}
                  aria-current={active === id ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium ${
                    active === id ? "text-white" : "text-neutral-400"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full ${
                      active === id
                        ? "bg-accent shadow-[0_0_8px] shadow-accent/80"
                        : "bg-transparent"
                    }`}
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
