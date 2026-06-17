export const site = {
  name: "Richard Haar",
  role: "Full-Stack Engineer",
  focus: "AI Automation & Customer Deployment",
  location: "Raleigh, NC",
  email: "haar.richard@gmail.com",
  social: {
    github: "https://github.com/itsrichardhaar",
    linkedin: "https://www.linkedin.com/in/richard-v-haar",
  },
  tagline:
    "I ship AI and automation systems end-to-end — from architecture through customer deployment.",
  bio: [
    "I'm a full-stack engineer who ships AI and automation solutions end-to-end — from system architecture through customer deployment.",
    "Lately that means building RAG and retrieval systems, automating manual business processes with LLM APIs, and translating ambiguous client workflows into working software. I'm comfortable as the technical point of contact: gathering requirements, onboarding and training customers, debugging integrations live, and owning outcomes.",
    "I lead engineering on client work at Springer Studios. Off the clock I'm usually traveling, skiing, or somewhere near the coast.",
  ],
};

/* ── Track-style skill groups ─────────────────────────────── */

export type TrackGroup = {
  n: string;
  label: string;
  color: string;
  items: string[];
};

export const stack: TrackGroup[] = [
  {
    n: "01",
    label: "AI / LLM",
    color: "var(--clip-cyan)",
    items: [
      "RAG architectures",
      "multi‑step orchestration",
      "Vector embeddings",
      "Semantic search",
      "Retrieval pipelines",
      "LLM API integration",
      "Workflow automation",
    ],
  },
  {
    n: "02",
    label: "Languages",
    color: "var(--clip-blue)",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL", "PHP", "HTML5 / CSS3"],
  },
  {
    n: "03",
    label: "Frameworks",
    color: "var(--clip-green)",
    items: ["React", "Next.js", "Node.js", "Express", "React Native", "Tailwind CSS"],
  },
  {
    n: "04",
    label: "Platforms & Data",
    color: "var(--clip-amber)",
    items: [
      "AWS",
      "Docker",
      "CI/CD",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Qdrant (Vector DB)",
    ],
  },
  {
    n: "05",
    label: "APIs & Services",
    color: "var(--clip-coral)",
    items: [
      "REST/GraphQL",
      "Schema/Versioning",
      "Authentication/Authorization",
    ],
  },
];

/* ── Case studies ─────────────────────────────────────────── */

export type CaseMedia = {
  src: string;
  alt: string;
  position?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  role: string;
  stack: string[];
  color: string;
  liveUrl?: string;
  heroMedia?: CaseMedia;
  highlights: { value: string; label: string }[];
  sections: { kicker: string; title: string; body: string; media?: CaseMedia }[];
  specs: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "martin-cc",
    title: "Martin Community College",
    client: "Martin Community College",
    year: "2024",
    eyebrow: "Headless CMS · Higher Ed Tech",
    headline: "One platform. Every pathway.",
    subhead:
      "A headless CMS and college catalog platform that replaced a stack of single-purpose third-party tools with one integrated system — courses, programs, job metrics, registrations, and lead generation in a single build.",
    role: "Full-Stack Engineer · end-to-end owner",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST API"],
    color: "var(--clip-blue)",
    liveUrl: "https://martincc.edu/",
    highlights: [
      { value: "5+", label: "Third-party tools replaced by one platform" },
      { value: "1:1", label: "Direct collaboration with college stakeholders" },
      { value: "100%", label: "Owned end-to-end, data model to deployment" },
    ],
    sections: [
      {
        kicker: "The problem",
        title: "A budget leaking through subscriptions.",
        body: "The college was juggling multiple single-purpose tools — one for course catalogs, one for career exploration, one for registrations, another for lead capture. Each had its own login, its own data silo, and its own recurring invoice. Staff spent hours re-entering the same information across systems.",
      },
      {
        kicker: "The build",
        title: "Courses, pathways, and metrics under one roof.",
        body: "I architected a headless platform managing courses, programs, career pathways, labor-market job metrics, registrations, and lead generation. Content flows from a single source of truth to every page through an API layer, so staff update once and it's reflected everywhere.",
      },
      {
        kicker: "The process",
        title: "Built with stakeholders, not just for them.",
        body: "I worked directly with college staff to translate their operational needs into the build — sitting in on their workflows, mapping what each third-party tool actually did, and designing replacements that fit how they already worked. Then I onboarded and trained the team through launch.",
      },
    ],
    specs: [
      { label: "Role", value: "Full-Stack Engineer" },
      { label: "Scope", value: "Architecture, data modeling, API, frontend, training" },
      { label: "Frontend", value: "Next.js, TypeScript, Tailwind CSS" },
      { label: "Backend", value: "Node.js REST API, PostgreSQL" },
      { label: "Replaced", value: "Course catalog, career explorer, registration & lead-gen tools" },
    ],
  },
  {
    slug: "springer-os",
    title: "Springer OS",
    client: "Springer Studios",
    year: "2024",
    eyebrow: "Internal Platform · Operations",
    headline: "The studio, running on its own software.",
    subhead:
      "An internal operations and project-management platform — project boards, timelines, task and team management — built API-first and deployed on AWS.",
    role: "Full-Stack Engineer · platform architect",
    stack: ["Next.js", "Node.js", "Express", "Prisma", "AWS"],
    color: "var(--clip-green)",
    highlights: [
      { value: "API", label: "Express + Prisma backend on EC2" },
      { value: "AWS", label: "Amplify client, Cognito auth, EC2 services" },
      { value: "1", label: "Platform replacing scattered PM tooling" },
    ],
    sections: [
      {
        kicker: "The problem",
        title: "An agency's work, scattered across tools.",
        body: "Project state lived in too many places — boards in one app, timelines in another, team allocation in spreadsheets. Nothing talked to anything else, and nobody had a single view of what the studio was actually doing.",
      },
      {
        kicker: "The build",
        title: "Boards, timelines, tasks, and teams — one API.",
        body: "I built an API-driven platform: Node.js, Express, and Prisma running on EC2, with a Next.js, Tailwind, and TypeScript client deployed on AWS Amplify. Project boards, timelines, task management, and team management all read from the same backbone.",
      },
      {
        kicker: "The details",
        title: "Auth and access done properly.",
        body: "User management runs through AWS Cognito — roles, sessions, and access control handled at the platform level rather than bolted on. The architecture leaves room for the next thing the studio needs, without rework.",
      },
    ],
    specs: [
      { label: "Role", value: "Full-Stack Engineer" },
      { label: "Backend", value: "Node.js, Express, Prisma on AWS EC2" },
      { label: "Frontend", value: "Next.js, TypeScript, Tailwind on AWS Amplify" },
      { label: "Auth", value: "AWS Cognito" },
      { label: "Features", value: "Project boards, timelines, tasks, team & user management" },
    ],
  },
  {
    slug: "builtrite-configurator",
    title: "BuiltRite Configurator",
    client: "BuiltRite Storage",
    year: "2025",
    eyebrow: "Real-time 3D · Product",
    headline: "Spec a building. Watch it build itself.",
    subhead:
      "An interactive 3D storage-model configurator rendering GLB models in the browser — customers explore options in real time, with auth and asset delivery wired for production.",
    role: "Full-Stack Engineer · solo build",
    stack: ["React", "TypeScript", "Three.js", "Supabase", "AWS S3"],
    color: "var(--clip-red)",
    liveUrl: "https://built-rite-model-configurator-59t1.vercel.app",
    highlights: [
      { value: "3D", label: "Interactive GLB models rendered with Three.js" },
      { value: "<1s", label: "Asset loads via S3 + CloudFront CDN" },
      { value: "Solo", label: "Architecture, 3D pipeline, auth, and delivery" },
    ],
    sections: [
      {
        kicker: "The problem",
        title: "Buildings are hard to sell from a brochure.",
        body: "BuiltRite's customers needed to understand configurable storage structures before committing — sizes, options, layouts. Static photos and PDFs weren't doing it, and back-and-forth with sales reps slowed everything down.",
      },
      {
        kicker: "The build",
        title: "Real-time 3D, straight in the browser.",
        body: "A React + TypeScript app rendering interactive 3D GLB models with Three.js. Customers rotate, explore, and configure structures live — no plugins, no downloads, works on whatever device they show up with.",
      },
      {
        kicker: "The infrastructure",
        title: "Production plumbing behind the canvas.",
        body: "Supabase handles authentication; 3D assets ship through AWS S3 fronted by CloudFront so heavy GLB files load fast everywhere. The pipeline is built so new models drop in without touching application code.",
      },
    ],
    specs: [
      { label: "Role", value: "Full-Stack Engineer (solo)" },
      { label: "Frontend", value: "React, TypeScript" },
      { label: "3D", value: "Three.js, GLB model pipeline" },
      { label: "Auth", value: "Supabase" },
      { label: "Assets", value: "AWS S3 + CloudFront" },
    ],
  },
  {
    slug: "atmos-led",
    title: "Atmos LED",
    client: "Atmos LED",
    year: "2025",
    eyebrow: "Marketing Site · Ecommerce",
    headline: "A storefront with stage presence.",
    subhead:
      "A React/TypeScript marketing site with Shopify commerce and custom motion — launched as the brand's flagship storefront.",
    role: "Lead Engineer · architecture, motion, commerce",
    stack: ["React", "TypeScript", "Shopify", "GSAP"],
    color: "var(--clip-amber)",
    liveUrl: "https://atmosled.co",
    highlights: [
      { value: "1", label: "Flagship storefront for the brand" },
      { value: "Headless", label: "Shopify commerce behind a custom front" },
      { value: "60fps", label: "Custom motion without sacrificing performance" },
    ],
    sections: [
      {
        kicker: "The problem",
        title: "A lighting brand stuck in template lighting.",
        body: "Atmos sells atmosphere — and their old templated storefront couldn't show it. They needed a site that demonstrated the product feel while still converting like a store.",
      },
      {
        kicker: "The build",
        title: "Commerce that moves.",
        body: "A React + TypeScript front end with Shopify running commerce underneath. Custom motion and interaction design carry the brand, while the buying path stays fast and conventional where it counts.",
      },
      {
        kicker: "The outcome",
        title: "Launched as the flagship.",
        body: "The site shipped as the brand's primary storefront — modern, fast, and distinctly theirs, with a commerce backend the team can run without engineering support.",
      },
    ],
    specs: [
      { label: "Role", value: "Lead Engineer" },
      { label: "Frontend", value: "React, TypeScript" },
      { label: "Commerce", value: "Shopify" },
      { label: "Motion", value: "GSAP" },
      { label: "Live", value: "atmosled.co" },
    ],
  },
];

/* ── Running project log ──────────────────────────────────── */

export type LogEntry = {
  year: string;
  title: string;
  type: string;
  stack: string[];
  status: "Shipped" | "Internal" | "In progress";
  color: string;
  href?: string;
  caseStudy?: string;
};

export const projectLog: LogEntry[] = [
  {
    year: "2026",
    title: "Portfolio v2",
    type: "Personal site",
    stack: ["Next.js", "GSAP", "TypeScript"],
    status: "In progress",
    color: "var(--clip-violet)",
  },
  {
    year: "2026",
    title: "Robert High Development",
    type: "Industrial site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-red)",
    href: "https://roberthighdevelopment.com",
  },
  {
    year: "2026",
    title: "Internal RAG / Semantic Search",
    type: "Retrieval system",
    stack: ["TypeScript", "Python", "Qdrant", "LLM APIs", "Vector embeddings"],
    status: "Internal",
    color: "var(--clip-cyan)",
  },
  {
    year: "2026",
    title: "AI Workflow Automation",
    type: "Process automation",
    stack: ["LLM APIs", "Node.js", "Workflow design"],
    status: "Internal",
    color: "var(--clip-cyan)",
  },
  {
    year: "2026",
    title: "Springer OS",
    type: "Operations platform",
    stack: ["Next.js", "Express", "Prisma", "AWS"],
    status: "Internal",
    color: "var(--clip-green)",
    caseStudy: "springer-os",
  },
  {
    year: "2026",
    title: "Martin Community College",
    type: "Headless CMS platform",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    status: "Shipped",
    color: "var(--clip-blue)",
    caseStudy: "martin-cc",
  },
  {
    year: "2025",
    title: "BuiltRite Storage Configurator",
    type: "Real-time 3D app",
    stack: ["React", "Three.js", "PostgreSQL", "AWS"],
    status: "Shipped",
    color: "var(--clip-red)",
    caseStudy: "builtrite-configurator",
  },
  {
    year: "2025",
    title: "Atmos LED",
    type: "Marketing + commerce",
    stack: ["React", "Shopify", "GSAP"],
    status: "Shipped",
    color: "var(--clip-amber)",
    caseStudy: "atmos-led",
    href: "https://atmosled.co",
  },
  {
    year: "2025",
    title: "CVCC Programs Filter",
    type: "WordPress plugin",
    stack: ["PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-coral)",
    href: "https://www.cvcc.edu/programs-of-study/",
  },
  {
    year: "2025",
    title: "Catawba Valley Community College",
    type: "Higher-ed site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-blue)",
    href: "https://cvcc.edu/programs-of-study/",
  },
  {
    year: "2025",
    title: "BuiltRite Storage Systems",
    type: "Industrial site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-red)",
    href: "https://builtritestoragesystems.com",
  },
  {
    year: "2024",
    title: "Essential Personnel",
    type: "Brand site",
    stack: ["Webflow", "jQuery", "GSAP"],
    status: "Shipped",
    color: "var(--clip-violet)",
    href: "https://www.essper.com",
  },
  {
    year: "2024",
    title: "Carteret Community College",
    type: "Higher-ed site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-blue)",
    href: "https://carteret.edu/",
  },
  {
    year: "2024",
    title: "Vance-Granville Community College",
    type: "Higher-ed site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-blue)",
    href: "https://www.vgcc.edu",
  },
  {
    year: "2024",
    title: "Springer Studios Redesign",
    type: "Agency site",
    stack: ["Webflow", "jQuery", "GSAP", "SwiperJS"],
    status: "Shipped",
    color: "var(--clip-violet)",
    href: "https://www.springerstudios.com",
  },
  {
    year: "2024",
    title: "TenrecX",
    type: "Brand site",
    stack: ["Webflow", "jQuery", "Lottie", "GSAP"],
    status: "Shipped",
    color: "var(--clip-violet)",
    href: "https://www.tenrecx.com",
  },
  {
    year: "2024",
    title: "Cooks Mill Whiskey",
    type: "Brand site",
    stack: ["Webflow", "GSAP", "JavaScript"],
    status: "Shipped",
    color: "var(--clip-violet)",
    href: "https://www.cooksmillwhiskey.com",
  },
  {
    year: "2024",
    title: "Infintegration",
    type: "Industrial site",
    stack: ["WordPress", "PHP", "jQuery", "SwiperJS", "SQL"],
    status: "Shipped",
    color: "var(--clip-amber)",
    href: "https://infintegration.com/",
  },
  {
    year: "2024",
    title: "Portfolio v1",
    type: "Personal site",
    stack: ["React", "JavaScript"],
    status: "Shipped",
    color: "var(--clip-violet)",
    href: "https://www.richardhaar.com/",
  },
  {
    year: "2023",
    title: "Custom Headless CMS",
    type: "Content platform",
    stack: ["Node.js", "REST API", "React"],
    status: "Internal",
    color: "var(--clip-blue)",
  },
  {
    year: "2023",
    title: "Studsvik",
    type: "Industrial site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-amber)",
    href: "https://www.studsvik.com",
  },
  {
    year: "2023",
    title: "Cameron Art Museum",
    type: "Cultural site",
    stack: ["WordPress", "PHP", "JavaScript"],
    status: "Shipped",
    color: "var(--clip-violet)",
    href: "https://cameronartmuseum.org",
  },
  {
    year: "2023",
    title: "Southeastern Community College",
    type: "Higher-ed site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-blue)",
    href: "https://www.sccnc.edu",
  },
  {
    year: "2023",
    title: "Iredell Ready",
    type: "Workforce-dev site",
    stack: ["WordPress", "PHP", "JavaScript", "SwiperJS", "SQL"],
    status: "Shipped",
    color: "var(--clip-amber)",
    href: "https://iredellready.com",
  },
  {
    year: "2023",
    title: "Honeycutt Construction Services",
    type: "Construction site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-amber)",
    href: "https://honeycuttcorp.com",
  },
  {
    year: "2023",
    title: "Durham Charter",
    type: "Education site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-blue)",
    href: "https://www.durhamcharter.org",
  },
  {
    year: "2022",
    title: "Cape Fear Community College",
    type: "Higher-ed platform",
    stack: ["WordPress", "PHP", "JavaScript", "SQL", "REST API"],
    status: "Shipped",
    color: "var(--clip-blue)",
    href: "https://cfcc.edu/",
  },
  {
    year: "2022",
    title: "James Sprunt Community College",
    type: "Higher-ed site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-blue)",
    href: "https://jamessprunt.edu",
  },
  {
    year: "2022",
    title: "Thomas Construction Group",
    type: "Construction site",
    stack: ["WordPress", "PHP", "JavaScript", "SQL"],
    status: "Shipped",
    color: "var(--clip-amber)",
    href: "https://thomasconstructiongroup.com",
  },
];

/* ── Experience ───────────────────────────────────────────── */

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    company: "Springer Studios",
    role: "Full-Stack Engineer",
    period: "2022 — Present",
    location: "Wilmington, NC (Remote)",
    bullets: [
      "Automated manual, labor-heavy business processes with LLM APIs — designing workflows that replaced repetitive human steps and cut turnaround time.",
      "Built a RAG / semantic-search system over internal documents using vector embeddings and Qdrant, enabling natural-language retrieval where keyword search failed.",
      "Serve as technical point of contact for client implementations — requirements, architecture, onboarding, and training through launch.",
      "Architected a custom headless CMS delivering API-driven content across marketing sites and applications.",
      "Lead technical infrastructure: REST APIs, component libraries, CI/CD pipelines, and cloud-hosted environments.",
      "Act as tech lead on project work — running 2-week agile sprints with PMs, designers, and engineers.",
    ],
  },
  {
    company: "DataGroup Technologies",
    role: "Web Engineer",
    period: "2019 — 2022",
    location: "Greenville, NC",
    bullets: [
      "Shipped and maintained production code for client websites as a senior IC other engineers relied on for technical direction.",
      "Diagnosed and resolved issues across cloud environments and client applications, improving monitoring processes.",
      "Collaborated directly with designers and stakeholders on UI updates, feature work, and CMS improvements.",
      "Ran QA testing and debugging for functionality, accessibility compliance, and cross-browser consistency.",
    ],
  },
];

export const education = {
  school: "East Carolina University",
  degree: "B.S. Economics, Minor in History",
  year: "2017",
};

export const certifications = [
  "UNC Chapel Hill Full Stack Coding Bootcamp",
  "Google Analytics (GA4)",
  "Google Ads",
];
