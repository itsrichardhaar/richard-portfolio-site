"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  trigger = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const words = el.querySelectorAll<HTMLElement>(".word > span");
    gsap.set(words, { yPercent: 110 });

    // Detached tween (not attached to the ScrollTrigger) so a mid-flight
    // ScrollTrigger.refresh() can't revert it to a half-revealed state.
    const tween = gsap.to(words, {
      yPercent: 0,
      duration: 1.1,
      delay,
      ease: "expo.out",
      stagger,
      paused: trigger,
    });

    if (trigger) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => tween.play(),
      });
      // Already past the start (deep link / restored scroll) — play now.
      if (st.progress > 0) tween.play();
      return () => {
        st.kill();
        tween.kill();
      };
    } else {
      tween.play();
      return () => tween.kill();
    }
  }, [delay, stagger, trigger, text]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="word inline-block overflow-hidden align-top"
          style={{
            marginRight: i === words.length - 1 ? 0 : "0.25em",
            // breathing room so descenders aren't clipped by the mask
            paddingBottom: "0.15em",
            marginBottom: "-0.15em",
          }}
        >
          <span className="inline-block will-change-transform">{w}</span>
        </span>
      ))}
    </span>
  );
}
