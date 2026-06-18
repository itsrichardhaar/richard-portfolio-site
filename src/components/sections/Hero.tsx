"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/data";
import { SplitWords } from "../Reveal";
import { ArrowRight, ArrowDown, Send } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        autoAlpha: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.9,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88svh] items-center px-6 pb-16 pt-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="hero-fade font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {site.role} — {site.focus}
        </p>

        <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          <SplitWords text="Richard Haar" delay={0.15} stagger={0.07} trigger={false} />
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          <SplitWords text={site.tagline} delay={0.5} stagger={0.02} trigger={false} />
        </p>

        <div className="hero-fade mt-10 flex items-center justify-center gap-3">
          <a href="#work" className="btn btn-primary" data-cursor="View">
            Selected work
            <ArrowRight size={15} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="btn btn-ghost"
            data-cursor="Say hi"
          >
            {site.email}
            <Send size={15} />
          </a>
        </div>

        <div className="hero-fade mt-6 flex items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
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

        <div className="hero-fade mt-16 flex justify-center">
          <ArrowDown size={16} className="animate-bounce text-muted" />
        </div>
      </div>
    </section>
  );
}
