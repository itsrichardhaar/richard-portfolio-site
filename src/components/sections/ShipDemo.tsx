"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* A pinned, scroll-scrubbed terminal: scrolling "runs" a client project
   end-to-end. Commands type out character by character, driven entirely
   by scroll position — scrub back up and it un-types. */

type Step = { cmd: string; out: { text: string; ok?: boolean }[] };

const script: Step[] = [
  {
    cmd: "rh init --client martin-cc",
    out: [{ text: "requirements gathered — 14 stakeholder workflows mapped" }],
  },
  {
    cmd: "rh scaffold --stack next,node,postgres",
    out: [{ text: "headless CMS · REST API · career-pathways platform" }],
  },
  {
    cmd: "rh embed ./internal-docs --db qdrant",
    out: [{ text: "12,408 chunks embedded · vector index ready" }],
  },
  {
    cmd: 'rh query "programs that lead to nursing careers"',
    out: [{ text: "3 pathways returned · 142ms · where keyword search failed" }],
  },
  {
    cmd: "rh test --wcag --ci",
    out: [{ text: "48 checks passed · pipeline green", ok: true }],
  },
  {
    cmd: "rh deploy --onboard-stakeholders",
    out: [
      { text: "shipped to production · client trained · 5 tools replaced", ok: true },
      { text: "owned end-to-end ✓", ok: true },
    ],
  },
];

export function ShipDemo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".term-step");
      const hint = root.querySelector(".term-hint");

      gsap.set(steps, { autoAlpha: 0 });
      gsap.set(".term-out", { autoAlpha: 0 });
      gsap.set(".term-caret", { display: "none" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      if (hint) tl.to(hint, { autoAlpha: 0, duration: 0.2 }, 0.1);

      steps.forEach((step) => {
        const cmdEl = step.querySelector<HTMLElement>(".term-cmd")!;
        const caret = step.querySelector<HTMLElement>(".term-caret")!;
        const outs = step.querySelectorAll<HTMLElement>(".term-out");
        const full = cmdEl.dataset.cmd ?? "";
        const proxy = { n: 0 };

        tl.set(step, { autoAlpha: 1 })
          .set(caret, { display: "inline-block" })
          .to(proxy, {
            n: full.length,
            duration: Math.max(0.6, full.length * 0.035),
            ease: "none",
            onUpdate: () => {
              cmdEl.textContent = full.slice(0, Math.round(proxy.n));
            },
          })
          .to(outs, { autoAlpha: 1, duration: 0.25, stagger: 0.18 }, ">+0.1")
          .set(caret, { display: "none" }, ">+0.15");
      });

      // hold the finished state for a beat before unpinning
      tl.to({}, { duration: 0.8 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center border-t border-border px-6 py-16 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            00 — Demo
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
            How a project ships.
          </h2>
        </div>

        <div className="panel overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-border bg-raised px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[var(--clip-red)]" />
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[var(--clip-amber)]" />
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[var(--clip-green)]" />
            </div>
            <span className="font-mono text-[11px] tracking-wide text-muted">
              richard@springer — ship.log
            </span>
            <span className="w-12" aria-hidden />
          </div>

          {/* Log body — fixed-height layout so lines appear in place */}
          <div className="space-y-4 px-4 py-5 font-mono text-[12px] leading-relaxed md:px-6 md:text-[13px]">
            {script.map((step, i) => (
              <div key={i} className="term-step">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="shrink-0 text-[var(--clip-green)]">➜</span>
                  <span className="shrink-0 text-muted">~/clients</span>
                  <span className="break-all text-foreground">
                    <span className="term-cmd" data-cmd={step.cmd} />
                    <span className="term-caret ml-px inline-block h-[1em] w-[7px] translate-y-[2px] bg-foreground/80" />
                  </span>
                </div>
                {step.out.map((o, j) => (
                  <div
                    key={j}
                    className={`term-out mt-1 pl-5 ${
                      o.ok ? "text-[var(--clip-green)]" : "text-muted"
                    }`}
                  >
                    {o.text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="term-hint mt-5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          Scroll to run
        </p>
      </div>
    </section>
  );
}
