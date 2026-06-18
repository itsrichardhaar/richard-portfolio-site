"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, education, certifications } from "@/lib/data";
import { revealOnce } from "@/lib/reveal";

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const head = ref.current?.querySelector(".exp-head");
      if (head) revealOnce(head, head, { autoAlpha: 0, y: 20 }, { duration: 0.9 });

      const line = ref.current?.querySelector<HTMLElement>(".timeline-line");
      if (line) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-wrap",
            start: "top 70%",
            end: "bottom 85%",
            scrub: 0.5,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".job").forEach((job) => {
        revealOnce(job, job, { autoAlpha: 0, y: 30 }, { duration: 0.9 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative border-t border-border px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="exp-head mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            04 — Experience
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
            Where the hours went.
          </h2>
        </div>

        <div className="timeline-wrap relative pl-7 md:pl-12">
          <div
            className="timeline-line absolute left-1.5 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-4"
            aria-hidden
          />

          <div className="space-y-16">
            {experience.map((job) => (
              <div key={job.company} className="job relative">
                <span
                  className="absolute -left-[1.51rem] top-1.5 h-2.5 w-2.5 rounded-[2px] bg-accent md:-left-[2.28rem]"
                  aria-hidden
                />
                <div className="grid gap-3 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {job.period}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {job.location}
                    </p>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-base font-medium text-accent">
                      {job.company}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {job.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[15px] leading-relaxed text-muted"
                        >
                          <span className="mt-[0.6em] inline-block h-px w-3 shrink-0 bg-foreground/40" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education + certifications */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border md:grid-cols-2">
          <div className="bg-surface p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Education
            </p>
            <p className="mt-3 text-lg font-semibold tracking-tight">
              {education.school}
            </p>
            <p className="mt-1 text-sm text-muted">
              {education.degree} · {education.year}
            </p>
          </div>
          <div className="bg-surface p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Certifications
            </p>
            <ul className="mt-3 space-y-1.5">
              {certifications.map((c) => (
                <li key={c} className="text-sm text-foreground/85">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
