"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { caseStudies } from "@/lib/data";
import { revealOnce } from "@/lib/reveal";
import { ArrowUpRight } from "lucide-react";

export function Work() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const head = root.querySelector(".work-head");
      if (head) revealOnce(head, head, { autoAlpha: 0, y: 20 }, { duration: 0.9 });

      root.querySelectorAll<HTMLElement>(".work-row").forEach((row) => {
        revealOnce(row, row, { autoAlpha: 0, y: 40 }, { duration: 0.9 }, "top 88%");
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="relative border-t border-border px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="work-head mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              03 — Selected Work
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
              Case studies.
            </h2>
          </div>
          <Link
            href="/log"
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover-underline"
            data-cursor="Full log"
          >
            Full project log →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              data-cursor="Case study"
              className="work-row group panel flex flex-col overflow-hidden transition-colors duration-200 hover:border-foreground/40"
            >
              {/* Media placeholder — flat clip-color block, swap for real assets later */}
              <div
                className="relative aspect-[16/10] w-full overflow-hidden border-b border-border"
                style={{
                  background: `color-mix(in oklab, ${cs.color} 22%, var(--surface))`,
                }}
              >
                <div className="beat-grid absolute inset-0 opacity-50" aria-hidden />
                <span
                  className="absolute left-4 top-4 rounded-[2px] px-2 py-1 font-mono text-[10px] font-semibold text-black/80"
                  style={{ background: cs.color }}
                >
                  {String(i + 1).padStart(2, "0")} · {cs.year}
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                  {cs.eyebrow}
                </span>
                <div
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ background: cs.color }}
                  aria-hidden
                />
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {cs.title}
                  </h3>
                  <ArrowUpRight
                    size={20}
                    className="mt-1 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                  {cs.subhead}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {cs.stack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-[2px] border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
