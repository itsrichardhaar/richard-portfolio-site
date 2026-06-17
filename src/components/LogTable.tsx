"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { projectLog } from "@/lib/data";
import { SplitWords } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

const statusColor: Record<string, string> = {
  Shipped: "var(--clip-green)",
  Internal: "var(--clip-amber)",
  "In progress": "var(--clip-cyan)",
};

export function LogTable() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".log-fade", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });

      gsap.from(".log-row", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.5,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="px-6 pb-28 pt-32 md:px-12 md:pt-40 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        <p className="log-fade font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          Project Log
        </p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          <SplitWords text="Everything on the timeline." delay={0.2} stagger={0.05} trigger={false} />
        </h1>
        <p className="log-fade mt-5 max-w-xl text-base leading-relaxed text-muted">
          A running log of shipped client work, internal platforms, and
          experiments — newest first. Case studies where they exist, links where
          they&apos;re public.
        </p>

        {/* Table */}
        <div className="panel mt-14 overflow-hidden">
          {/* Header row */}
          <div className="hidden grid-cols-12 gap-4 border-b border-border bg-raised px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:grid">
            <span className="col-span-1">Year</span>
            <span className="col-span-4">Project</span>
            <span className="col-span-2">Type</span>
            <span className="col-span-3">Stack</span>
            <span className="col-span-2 text-right">Status</span>
          </div>

          {projectLog.map((entry) => {
            const href = entry.caseStudy
              ? `/work/${entry.caseStudy}`
              : entry.href;
            const isInternalLink = Boolean(entry.caseStudy);
            const Row = (
              <div className="log-row group grid grid-cols-2 gap-x-4 gap-y-2 border-b border-border/60 px-5 py-4 transition-colors duration-150 last:border-b-0 hover:bg-raised md:grid-cols-12 md:items-center">
                <span className="order-1 font-mono text-xs text-muted md:col-span-1">
                  {entry.year}
                </span>
                <span className="order-3 col-span-2 flex items-center gap-2.5 md:order-2 md:col-span-4">
                  <span
                    className="inline-block h-3 w-1 shrink-0 rounded-[1px]"
                    style={{ background: entry.color }}
                  />
                  <span className="text-[15px] font-medium tracking-tight">
                    {entry.title}
                  </span>
                  {href && (
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-muted opacity-0 transition-all duration-150 group-hover:opacity-100"
                    />
                  )}
                </span>
                <span className="order-4 text-sm text-muted md:order-3 md:col-span-2">
                  {entry.type}
                </span>
                <span className="order-5 col-span-2 flex flex-wrap gap-1.5 md:order-4 md:col-span-3">
                  {entry.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-[2px] border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </span>
                <span className="order-2 flex items-center gap-2 justify-self-end font-mono text-[10px] uppercase tracking-wide text-muted md:order-5 md:col-span-2">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: statusColor[entry.status] }}
                  />
                  {entry.status}
                </span>
              </div>
            );

            if (href && isInternalLink) {
              return (
                <Link key={entry.title} href={href} data-cursor="Case study">
                  {Row}
                </Link>
              );
            }
            if (href) {
              return (
                <a
                  key={entry.title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Visit"
                >
                  {Row}
                </a>
              );
            }
            return <div key={entry.title}>{Row}</div>;
          })}
        </div>

        <p className="log-fade mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {projectLog.length} entries · updated continuously
        </p>
      </div>
    </div>
  );
}
