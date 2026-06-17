"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/data";
import { revealOnce } from "@/lib/reveal";

const stats = [
  { value: "7+", label: "Years shipping production software" },
  { value: "E2E", label: "Architecture through customer deployment" },
  { value: "RAG", label: "Retrieval systems running in production" },
  { value: "WCAG", label: "Accessibility-first engineering practice" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const heads = ref.current?.querySelectorAll(".about-head");
      if (heads?.length) {
        revealOnce(heads[0], heads, { autoAlpha: 0, y: 20 }, { duration: 0.9, stagger: 0.1 });
      }

      // Paragraphs brighten as they pass through the viewport
      gsap.utils.toArray<HTMLElement>(".bio-line").forEach((line) => {
        gsap.from(line, {
          autoAlpha: 0.25,
          y: 10,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.5,
          },
        });
      });

      const statRow = ref.current?.querySelector(".stat-row");
      if (statRow) {
        revealOnce(
          statRow,
          statRow.querySelectorAll(".stat-cell"),
          { autoAlpha: 0, y: 18 },
          { duration: 0.7, stagger: 0.08 }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-t border-border px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-12">
        {/* sticky rail — kept transform-free so position:sticky works */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <p className="about-head font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              01 — About
            </p>
            <h2 className="about-head mt-5 text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
              Engineer as the technical point of contact.
            </h2>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="space-y-7 text-lg leading-relaxed md:text-xl">
            {site.bio.map((line, i) => (
              <p key={i} className="bio-line text-foreground/90">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Apple-style stat band */}
      <div className="stat-row mx-auto mt-24 grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-border bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-cell bg-surface p-6 md:p-8">
            <p className="text-3xl font-semibold tracking-tight md:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
