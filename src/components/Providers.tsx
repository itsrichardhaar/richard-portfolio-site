"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme outside provider");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const lenisRef = useRef<Lenis | null>(null);
  const mounted = useRef(false);
  const pathname = usePathname();

  // Theme class is set pre-paint by the inline script in layout.tsx;
  // sync React state to whatever it decided.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Lenis + GSAP wiring
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Route same-page anchor clicks through Lenis so they animate
    // and ScrollTrigger sees every frame of the journey.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href*="#"]'
      );
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.querySelector<HTMLElement>(url.hash);
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      lenis.scrollTo(el, { offset: -64 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  // After every route change: honor any #hash target, then refresh
  // ScrollTrigger so triggers created on the new page measure correctly —
  // and triggers already past their start (deep links, restored scroll)
  // fire instead of leaving content hidden.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;

    const raf = requestAnimationFrame(() => {
      if (hash) {
        const el = document.querySelector<HTMLElement>(hash);
        if (el && lenis) lenis.scrollTo(el, { offset: -64, immediate: true });
      }
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
