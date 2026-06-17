"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./Providers";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/log", label: "Log" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const progRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client mount gate to avoid hydration mismatch on the theme-dependent icon
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(progRef.current, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    });
    return () => ctx.revert();
    // re-measure scroll range when the route (page height) changes
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6 md:px-12 lg:px-20">
        <Link
          href="/"
          data-cursor="Home"
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-accent" />
          richard.haar
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-[3px] px-3 py-1.5 text-[13px] font-medium text-muted transition-colors duration-150 hover:bg-raised hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggle}
          data-cursor={mounted && theme === "dark" ? "Light" : "Dark"}
          aria-label="Toggle theme"
          className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-border transition-colors duration-150 hover:bg-raised"
        >
          {mounted && theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      {/* scroll position = song position */}
      <div
        ref={progRef}
        className="absolute inset-x-0 bottom-[-1px] h-[2px] w-full origin-left scale-x-0 bg-accent"
        aria-hidden
      />
    </header>
  );
}
