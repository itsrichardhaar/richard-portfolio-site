"use client";

import { site } from "@/lib/data";
import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(`${t} ET`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--clip-green)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--clip-green)]" />
          </span>
          Available for work — {time}
        </div>

        <div className="hidden md:block">
          © {new Date().getFullYear()} {site.name}
        </div>

        <div className="flex gap-5">
          <a
            href={site.social.github}
            className="hover-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            className="hover-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover-underline">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
