"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { stack } from "@/lib/data";
import { revealOnce } from "@/lib/reveal";

export function Stack() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const head = root.querySelector(".stack-head");
      if (head) revealOnce(head, head, { autoAlpha: 0, y: 20 }, { duration: 0.9 });

      root.querySelectorAll<HTMLElement>(".track-row").forEach((row) => {
        revealOnce(row, row, { autoAlpha: 0, y: 24 }, {}, "top 88%");
        revealOnce(
          row,
          row.querySelectorAll(".skill-clip"),
          { autoAlpha: 0, x: -8 },
          { duration: 0.45, ease: "power2.out", stagger: 0.03 },
          "top 82%"
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={ref}
      className="relative border-t border-border px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="stack-head mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              02 — Stack
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
              The tracks I work in.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Sharp on the frontend, fluent on the backend, increasingly deep in
            retrieval and LLM tooling.
          </p>
        </div>

        <div className="panel divide-y divide-border overflow-hidden">
          {stack.map((group) => (
            <div
              key={group.label}
              className="track-row flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6 md:p-5"
            >
              <div className="flex w-44 shrink-0 items-center gap-3">
                <span
                  className="flex h-6 w-8 items-center justify-center rounded-[2px] font-mono text-[10px] font-semibold text-black/80"
                  style={{ background: group.color }}
                >
                  {group.n}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-foreground">
                  {group.label}
                </span>
              </div>

              <div className="flex flex-1 flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="skill-clip rounded-[2px] px-2.5 py-1 text-[13px] font-medium text-black/80 transition-transform duration-150 hover:scale-[1.04]"
                    style={{ background: `color-mix(in oklab, ${group.color} 75%, transparent)` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
