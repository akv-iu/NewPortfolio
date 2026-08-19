/* ============================================================================
 *  EDIT EVERYTHING HERE.
 *  This is the only file you need to touch to change the site's content.
 *  No component below reads a hard-coded string.
 *
 *  Colors and type live in app/globals.css (also one place, clearly marked).
 *
 *  A note on the copy: it is deliberately plain and factual. No adjectives,
 *  no voice. If you want it to sound like you, replace it with how you would
 *  actually say it out loud. Anything written in an invented voice reads as
 *  written by a machine, which is worse than reading as a resume.
 * ========================================================================== */

/* -------------------------------------------------------------------------
 *  1. WHO YOU ARE
 * ---------------------------------------------------------------------- */
export const site = {
  name: "Akshay Viswanath",
  /** Shown as the mark in the nav. Keep it 2-3 characters. */
  initials: "AV",
  title: "Akshay Viswanath - Software Engineer",
  description:
    "Software engineer. Full-stack, with a bias toward the backend. MS Computer Science, Indiana University, 2026.",
  /** Deployed URL. Update after your first deploy so share cards resolve. */
  url: "https://your-domain.com",

  email: "akshayvgrad@gmail.com",
  /** Sits in public/docs/. Replace that file to update the resume. */
  resume: "/docs/resume.pdf",
};

/** Order here is the order they appear in the contact block and footer. */
export const socials = [
  { label: "GitHub", href: "https://github.com/akv-iu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/akshay-viswanath-grad" },
];

/* -------------------------------------------------------------------------
 *  2. NAVIGATION
 *  `id` must match a section id in app/page.tsx. Delete a row to drop it
 *  from the nav; the section stays on the page.
 * ---------------------------------------------------------------------- */
export const nav = [
  { id: "top", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
];

/** Section headings. Sentence case on purpose. */
export const headings = {
  work: "Selected work",
  experience: "Experience",
  stack: "Stack",
};

/* -------------------------------------------------------------------------
 *  3. HERO
 *  Leads with the name, the way a printed masthead would. `standfirst` is
 *  the one factual sentence under it. Keep it under about 25 words.
 * ---------------------------------------------------------------------- */
export const hero = {
  /** Rendered as the display type. Each string is one line. */
  name: ["Akshay", "Viswanath"],
  standfirst:
    "Software engineer. Full-stack, with a bias toward the backend. Nearly three years shipping to production before graduate school.",
  /** Two short factual rows in the masthead. Delete either one. */
  meta: [
    { label: "Based in", value: "Salt lake City, Utah" },
    { label: "Graduate", value: "MS Computer Science, Indiana University" },
  ],
  available: "Open to new grad software engineering roles",
  primaryCta: { label: "See the work", href: "#work" },
  secondaryCta: { label: "Resume", href: site.resume },
  /** Lives in public/me/. Swap the file or point this somewhere else. */
  portrait: "/me/ak.jpeg",
  portraitAlt: "Akshay Viswanath",
};

/* -------------------------------------------------------------------------
 *  4. WORK
 *
 *  ADDING MEDIA  ->  drop the file into  public/projects/
 *                    then put the FILE NAME in `media` below.
 *
 *    media: "adeguard.png"     an image
 *    media: "adeguard.mp4"     a video (autoplays muted, loops)
 *    media: ""                 shows a labelled empty slot instead
 *
 *  Supported: .svg .png .jpg .jpeg .webp .avif .gif .mp4 .webm .mov
 *
 *  The FIRST project renders large. Reorder the array to change which.
 * ---------------------------------------------------------------------- */
export type Project = {
  slug: string;
  title: string;
  period: string;
  /** One short line under the title. What it is, not why it matters. */
  kind: string;
  stack: string[];
  /** Two sentences. What it does and how. */
  summary: string;
  /** Max 3. Numbers where you have them. */
  highlights: string[];
  media: string;
  /** Optional poster image for video media, e.g. "twinmind-poster.png". */
  poster?: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "zero-trust-mcp-gateway",
    title: "Zero-Trust MCP Gateway",
    period: "2026",
    kind: "Security research project",
    stack: ["Python", "OPA/Rego", "MCP Protocol"],
    summary:
      "Default-deny authorization gateway that enforces policy on every MCP tool call via OPA/Rego, sitting in front of real HTTP transport rather than a mock. Validated against a 66-scenario adversarial corpus built to probe for prohibited side effects.",
    highlights: [
      "0 prohibited side effects across the corpus, versus 37 under a broken-enforcer control",
      "Side-effect oracle passing 63/66 scenarios with zero false-pass indeterminates",
    ],
    media: "zero-trust-mcp-gateway.svg",
    links: [{ label: "GitHub", href: "https://github.com/akv-iu/Zero-Trust-MCP-Gateway" }],
  },
  {
    slug: "adeguard",
    title: "ADEGuard",
    period: "2026",
    kind: "Graduate capstone",
    stack: ["Python", "Neo4j", "FAISS", "LLaMA 3.2", "Sentence-BERT", "Streamlit"],
    summary:
      "Semantic search across 4,000+ unstructured VAERS adverse event reports, joined to a Neo4j knowledge graph so symptom relationships can be queried rather than only matched. Every answer is grounded in the reports actually retrieved.",
    highlights: [
      "Knowledge graph of 5 entity types, modelling symptom co-occurrence with frequency aggregation",
      "Local LLaMA-3.2 pipeline, constrained to retrieved evidence",
      "Refuses to answer outside retrieved context rather than guessing",
    ],
    media: "adeguard.svg",
    links: [{ label: "GitHub", href: "https://github.com/akv-iu" }],
  },
  {
    slug: "twinmind-v2",
    title: "TwinMind v2",
    period: "2026",
    kind: "Web application",
    stack: ["Next.js", "TypeScript", "React", "Tailwind", "Zustand", "Groq SDK"],
    summary:
      "Live meeting copilot with real-time transcription and suggestions, built on context engineering to keep LLM prompts bounded as sessions grow. Checkpointed delta architecture and prompt engineering across four suggestion types replace naive full-transcript resends with summarized state.",
    highlights: [
      "Suggestion prompt size held stable at ~4-7 KB from batch 5 onward regardless of session length",
      "Switched from MediaRecorder timeslice mode to 6-second record-stop-restart cycles after timeslice caused transcript gaps under load, with suffix/prefix dedup across chunk boundaries",
    ],
    media: "twinmind-v2.svg",
    links: [{ label: "GitHub", href: "https://github.com/akv-iu/TwinMind-v2.0" } , { label: "Website", href: "https://twinmind-v2.0.vercel.app/" }],
    
  },
  {
    slug: "kaggriculture-evidence-loop",
    title: "Kaggriculture Evidence Loop",
    period: "2026",
    kind: "Kaggle competition strategy pipeline",
    stack: ["Python", "Claude (Sonnet)", "PowerShell", "Task Scheduler"],
    summary:
      "Evidence-first optimization loop for a live Kaggle farming-sim competition. A scheduled poll turns real replay data into a capped evidence packet; one read-only, tool-less Claude call proposes a single falsifiable patch from a fixed candidate backlog; a deterministic, seed-fingerprinted backtest with automatic rollback gates every change before a human approves submission.",
    highlights: [
      "Backtest gate calibrated against 4 known-outcome historical releases correctly failed the identical no-op and a known-regressing release (+$795 median mirror, below the $1,000 pass bar), correctly passed both known-good releases",
      "108 historical attempts indexed into a durable ledger so the model never re-proposes an idea whose recorded retry condition isn't yet satisfied",
    ],
    media: "kaggriculture-evidence-loop.svg",
    links: [{ label: "GitHub", href: "https://github.com/akv-iu/kaggleComp" }],
  },
];

/* -------------------------------------------------------------------------
 *  5. EXPERIENCE
 *  Newest first, with numbers. `links` is optional: use it for work that is
 *  live and can be clicked, since a shipped URL argues better than a bullet.
 * ---------------------------------------------------------------------- */
type Job = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
  links?: { label: string; href: string }[];
};

export const experience: Job[] = [
  {
    role: "Head Teaching Assistant",
    org: "Indiana University Bloomington",
    period: "Aug 2025 - May2026",
    bullets: [
      "Coordinated 5 teaching assistants across the JavaScript and Python/Flask courses, owning grading rubrics and weekly syncs for 200 students.",
      "Reviewed semester-long projects end to end: architecture, async JavaScript, debugging, and Git/GitHub workflow.",
    ],
  },
  {
    role: "Software Development Engineer",
    org: "Fiverr / Independent consultant, remote",
    period: "Sep 2022 - May 2024",
    bullets: [
      "Delivered production software for 4 SME clients, owning architecture, development and deployment from requirements through release.",
      "Built and shipped a full-stack booking platform for HealthCity Sports Center on Next.js, Node.js and PostgreSQL with authentication and payments, then rebuilt the booking flow around how customers were actually booking offline.",
      "Raised inbound inquiries 20% for Sumptuous Building Systems with a production Next.js/React/TypeScript build: 20% faster loads and a 25% smaller JavaScript bundle.",
      "Standardized reusable components, shared application patterns and deployment-ready configs across all 4 client codebases, cutting duplicated implementation.",
    ],
    links: [
      { label: "HealthCity", href: "https://healthcitymysuru.com/" },
      { label: "Sumptuous", href: "https://www.sumptuousindia.com/" },
    ],
  },
  {
    role: "Application Development Associate",
    org: "Accenture, India",
    period: "Aug 2021 - Aug 2022",
    bullets: [
      "Cut load latency 60% across 5 internal dashboards serving 200+ stakeholders, replacing synchronous polling with async API calls from SPFx React web parts into Node.js services.",
      "Built Node.js REST endpoints handling routing, JSON parsing and error handling for enterprise data pipelines supporting 7M+ users, reducing latency 40%.",
      "Implemented OAuth 2.0 token acquisition in SPFx against Microsoft identity endpoints, enforcing role-based access control across internal applications.",
      "Configured Docker container builds and Azure DevOps CI/CD stages with automated test gates, contributing to zero-downtime releases.",
      "Traced a high-priority Node.js API failure in an org-wide release calendar to a malformed SharePoint data extraction through network payload inspection, restoring stable delivery.",
    ],
  },
];

/* -------------------------------------------------------------------------
 *  6. STACK
 *  Plain lists, no badges. Add, remove or rename groups freely.
 * ---------------------------------------------------------------------- */
export const stack = [
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Jetpack Compose",
    ],
  },
  {
    group: "Backend",
    items: ["Node.js", "Spring Boot", "Java", "Kotlin", "Python", "REST APIs", "Auth.js", "Zod"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Neo4j", "Room"],
  },
  {
    group: "Infrastructure",
    items: ["AWS", "Azure DevOps", "Docker", "CI/CD", "VMware", "SharePoint"],
  },
  {
    group: "Mobile",
    items: ["Android", "Kotlin", "MVVM", "Coroutines", "Flow", "Hilt", "Retrofit"],
  },
  {
    group: "Tooling",
    items: ["Git", "GitHub", "VS Code", "PyCharm", "Android Studio", "Power BI", "Power Apps"],
  },
];

/* -------------------------------------------------------------------------
 *  7. CONTACT
 *  The email is the headline. There is nothing else to say here.
 * ---------------------------------------------------------------------- */
export const contact = {
  label: "Get in touch",
  body: "Open to new grad software engineering roles from May 2026. Full-stack, backend or mobile.",
};
