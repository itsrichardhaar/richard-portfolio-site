# Richard Haar — Portfolio

Personal portfolio site built with Next.js 16 and React 19.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP + Lenis (smooth scroll)
- **Icons:** lucide-react
- **Language:** TypeScript

## Routes

- `/` — home (hero, about, experience, stack, work, contact)
- `/work/[slug]` — case study detail pages
- `/log` — changelog / activity log

## Project layout

```
src/
  app/                Next.js App Router routes
    work/[slug]/      case study pages
    log/              activity log
  components/
    sections/         home page sections (Hero, About, Work, …)
    CaseStudyView, Nav, Footer, Cursor, Magnetic, Reveal, …
  lib/
    data.ts           projects, experience, log content
    reveal.ts         scroll-reveal helper
```

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Notes

This repo uses Next.js 16, which has breaking changes from earlier versions. See `AGENTS.md` and the docs bundled in `node_modules/next/dist/docs/` before making changes.
