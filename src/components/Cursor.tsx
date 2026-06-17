"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...pos };
    const ringPos = { ...pos };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // No scaling on hover — scaled text rasterizes and pixelates.
    // The ring brightens and a fixed-size label pill fades in beside it.
    const onEnter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      const cursorLabel = t.dataset.cursor;
      gsap.to(ring, { opacity: 1, duration: 0.25, ease: "power2.out" });
      if (cursorLabel) {
        label.textContent = cursorLabel;
        gsap.to(label, { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" });
      }
    };

    const onLeave = () => {
      gsap.to(ring, { opacity: 0.45, duration: 0.25, ease: "power2.out" });
      gsap.to(label, { autoAlpha: 0, y: 4, duration: 0.2, ease: "power2.out" });
    };

    const attach = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor], [data-magnetic]"
      );
      targets.forEach((t) => {
        t.addEventListener("mouseenter", onEnter);
        t.addEventListener("mouseleave", onLeave);
      });
      return targets;
    };

    let targets = attach();
    const mo = new MutationObserver(() => {
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
      targets = attach();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const tick = () => {
      dotPos.x += (pos.x - dotPos.x) * 0.7;
      dotPos.y += (pos.y - dotPos.y) * 0.7;
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      gsap.set(dot, { x: dotPos.x, y: dotPos.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      gsap.set(label, { x: ringPos.x + 18, y: ringPos.y + 18 });
    };

    gsap.ticker.add(tick);
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { opacity: 0.45 });
    gsap.set(label, { autoAlpha: 0, y: 4 });

    return () => {
      window.removeEventListener("mousemove", onMove);
      mo.disconnect();
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-foreground mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-foreground"
        style={{ willChange: "transform" }}
      />
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] whitespace-nowrap rounded-[3px] bg-foreground px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-background"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
