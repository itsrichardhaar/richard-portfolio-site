import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* One-shot scroll reveal that ScrollTrigger.refresh() can't break.

   Tweens attached to a ScrollTrigger get reverted and re-rendered when
   ScrollTrigger refreshes (window load, resize, route change) — if that
   lands mid-stagger, elements freeze in a half-animated state. So the
   trigger here is bare and fires a detached gsap.to() instead; refreshes
   never touch a running detached tween.

   Also fires immediately when the trigger is already past its start
   (deep links, restored scroll), so content never stays hidden. */
export function revealOnce(
  trigger: Element,
  targets: gsap.TweenTarget,
  from: gsap.TweenVars,
  to: gsap.TweenVars = {},
  start = "top 85%"
) {
  gsap.set(targets, from);

  let played = false;
  const play = () => {
    if (played) return;
    played = true;

    const end: gsap.TweenVars = { duration: 0.8, ease: "power3.out", ...to };
    for (const key of ["autoAlpha", "opacity", "scale", "scaleX", "scaleY"]) {
      if (key in from) end[key] = 1;
    }
    for (const key of ["x", "y", "xPercent", "yPercent"]) {
      if (key in from) end[key] = 0;
    }
    gsap.to(targets, end);
  };

  const st = ScrollTrigger.create({ trigger, start, once: true, onEnter: play });
  if (st.progress > 0) play();
  return st;
}
