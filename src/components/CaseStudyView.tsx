"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseMedia, CaseStudy } from "@/lib/data";
import { SplitWords } from "./Reveal";
import { revealOnce } from "@/lib/reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

function MediaSlot({
  color,
  label,
  image,
  ratio = "aspect-[16/9]",
  sizes,
}: {
  color: string;
  label: string;
  image?: CaseMedia;
  ratio?: string;
  sizes?: string;
}) {
  if (image) {
    return (
      <div className={`panel relative ${ratio} w-full overflow-hidden`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes ?? "(min-width: 1280px) 1152px, 100vw"}
          className="object-cover"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={`panel relative ${ratio} w-full overflow-hidden`}
      style={{
        background: `color-mix(in oklab, ${color} 18%, var(--surface))`,
      }}
    >
      <div className="beat-grid absolute inset-0 opacity-50" aria-hidden />
      <span
        className="absolute left-4 top-4 rounded-[2px] px-2 py-1 font-mono text-[10px] font-semibold text-black/80"
        style={{ background: color }}
      >
        {label}
      </span>
      <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
        Media coming soon
      </span>
    </div>
  );
}

export function CaseStudyView({
  cs,
  next,
}: {
  cs: CaseStudy;
  next: { slug: string; title: string };
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".cs-fade", {
        autoAlpha: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((el) => {
        revealOnce(el, el, { autoAlpha: 0, y: 32 }, { duration: 0.9 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="px-6 pb-28 pt-32 md:px-12 md:pt-40 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        {/* Breadcrumb */}
        <Link
          href="/#work"
          className="cs-fade inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          data-cursor="Back"
        >
          <ArrowLeft size={13} />
          All work
        </Link>

        {/* Apple-style centered hero */}
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="cs-fade font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {cs.eyebrow} · {cs.year}
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            <SplitWords text={cs.headline} delay={0.25} stagger={0.05} trigger={false} />
          </h1>
          <p className="cs-fade mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {cs.subhead}
          </p>

          <div className="cs-fade mt-8 flex flex-wrap items-center justify-center gap-2">
            {cs.stack.map((t) => (
              <span
                key={t}
                className="rounded-[2px] border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {cs.liveUrl && (
            <div className="cs-fade mt-8">
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-cursor="Live site"
              >
                View live
                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </div>

        {/* Hero media */}
        <div className="cs-reveal mt-16 md:mt-20">
          <MediaSlot
            color={cs.color}
            label={cs.title}
            image={cs.heroMedia}
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
        </div>

        {/* Highlights band */}
        <div className="cs-reveal mt-20 grid gap-px overflow-hidden rounded-[4px] border border-border bg-border md:grid-cols-3">
          {cs.highlights.map((h) => (
            <div key={h.label} className="bg-surface p-7 text-center md:p-9">
              <p
                className="text-4xl font-semibold tracking-tight md:text-5xl"
                style={{ color: cs.color }}
              >
                {h.value}
              </p>
              <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-snug text-muted">
                {h.label}
              </p>
            </div>
          ))}
        </div>

        {/* Alternating feature sections */}
        <div className="mt-28 space-y-24 md:space-y-32">
          {cs.sections.map((section, i) => (
            <div
              key={section.kicker}
              className={`cs-reveal grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.25em]"
                  style={{ color: cs.color }}
                >
                  {section.kicker}
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                  {section.body}
                </p>
              </div>
              <MediaSlot
                color={cs.color}
                label={`${String(i + 1).padStart(2, "0")}`}
                ratio="aspect-[4/3]"
                image={section.media}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>

        {/* Spec table */}
        <div className="cs-reveal mt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Specifications
          </p>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {cs.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid gap-1 py-4 md:grid-cols-12 md:gap-8"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:col-span-3 md:pt-0.5">
                  {spec.label}
                </dt>
                <dd className="text-[15px] leading-relaxed md:col-span-9">
                  {spec.value}
                </dd>
              </div>
            ))}
          </div>
        </div>

        {/* Next project */}
        <Link
          href={`/work/${next.slug}`}
          data-cursor="Next"
          className="cs-reveal group mt-24 flex items-center justify-between rounded-[4px] border border-border bg-surface p-8 transition-colors duration-200 hover:border-foreground/40 md:p-12"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Next case study
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={28}
            className="shrink-0 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground"
          />
        </Link>
      </div>
    </div>
  );
}
