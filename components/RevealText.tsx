"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Paragraph whose words brighten one by one as it scrolls up through the viewport.
 * Only opacity changes (no movement), so it stays on under reduced-motion settings.
 */
export default function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the text's top reaches 85% of the viewport, finishes when its bottom reaches 45%.
      const start = vh * 0.85;
      const end = vh * 0.45;
      const p = (start - rect.top) / (rect.height + start - end);
      setProgress(Math.min(1, Math.max(0, p)));
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

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const t = Math.min(1, Math.max(0, progress * words.length - i));
        return (
          <span key={i} style={{ opacity: 0.18 + 0.82 * t }} className="transition-opacity duration-150">
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
