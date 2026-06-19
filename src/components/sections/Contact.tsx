"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/data";
import { SplitWords } from "../Reveal";
import { revealOnce } from "@/lib/reveal";
import { Send } from "lucide-react";

export function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const root = ref.current;
      if (!root) return;
      revealOnce(
        root,
        root.querySelectorAll(".contact-fade"),
        { autoAlpha: 0, y: 18 },
        { stagger: 0.1 },
        "top 70%"
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative border-t border-border px-6 py-32 md:px-12 md:py-44 lg:px-20"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="contact-fade font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          05 — Contact
        </p>

        <h2 className="mt-8 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          <SplitWords text="Engineering intelligent systems end-to-end." stagger={0.04} />
        </h2>

        <p className="contact-fade mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Open to full-stack and forward-deployed engineering roles — especially
          where AI meets real customer workflows.
        </p>

        <div className="contact-fade mt-12 flex flex-col items-center gap-6">
          <a
            href={`mailto:${site.email}`}
            data-cursor="Say hi"
            className="btn btn-primary px-8 py-4 text-base"
          >
            {site.email}
            <Send
              size={18}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </a>

          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              GitHub
            </a>
            <span className="text-muted/60">/</span>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              LinkedIn
            </a>
            <span className="text-muted/60">/</span>
            <span className="text-muted">{site.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
