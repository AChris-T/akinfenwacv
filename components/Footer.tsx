import { HiArrowUp } from "react-icons/hi2";
import CurrentYear from "@/components/CurrentYear";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-sm text-neutral-500">
          © <CurrentYear /> {site.fullName}
          <span className="text-accent">.</span>
        </p>
        <a
          href="#home"
          className="group flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
        >
          Back to top
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
            <HiArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>
    </footer>
  );
}
