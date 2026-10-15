"use client";

/** Pill tabs with the site's accent dot beside the active tab and an item count. */
export default function CategoryTabs<T extends string>({
  tabs,
  active,
  onChange,
  counts,
  label,
  controls,
}: {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  counts: Record<string, number>;
  label: string;
  controls: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={controls}
            onClick={() => onChange(tab)}
            className={`flex h-11 shrink-0 items-center rounded-full border px-5 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
              isActive
                ? "border-white/15 bg-white/[0.06] text-white"
                : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px] shadow-accent/80 transition-all duration-300 ease-out ${
                isActive ? "mr-2 w-1.5 opacity-100" : "mr-0 w-0 opacity-0"
              }`}
            />
            {tab}
            <span className="ml-2 text-xs text-neutral-500">{counts[tab] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}
