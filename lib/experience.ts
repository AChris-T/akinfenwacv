// Experience content, sourced from the CVs. Current role first, then most recent.
export type Role = {
  period: string;
  type: string;
  location?: string;
  title: string;
  company: string;
  summary: string;
  highlights: string[];
  stack: string[];
  url?: string;
};

export const stats = [
  { value: "5+", label: "Years building web, backend and mobile products" },
  { value: "583+", label: "API endpoints built for platforms" },
  { value: "129+", label: "Database models designed" },
  { value: "186+", label: "Automated test files written" },
];

export const roles: Role[] = [
  {
    period: "Nov 2025 - Present",
    type: "AI SaaS · Frontend",
    location: "United Kingdom (Remote)",
    title: "Frontend Developer",
    company: "Viro",
    summary:
      "Building the AI assistant and meeting workflows at the heart of Viro, a revenue platform that follows up, updates records and moves deals forward after every meeting.",
    highlights: [
      "Replaced a demo chat that only gave pre-written replies with a real AI assistant that streams its answers live, connected to the backend through typed API calls.",
      "Added a new API endpoint that finds the right conversation for each meeting, so the assistant always answers with the correct context.",
      "Broke a 150-line chat component into small, focused pieces for sending messages, attachments, the message list and the text box, making the feature easier to maintain and test.",
      "Built file attachments with upload progress for every file, plus options to retry or remove each one.",
      "Added live streaming replies with a \"thinking\" indicator, inline source citations and error recovery, and fixed a bug that created duplicate messages when a retry failed.",
      "Designed and built an approval flow for tasks the AI creates from meetings: users can accept, edit or reject each one, with new tasks and tasks awaiting confirmation shown in two separate lanes.",
      "Created one shared system for task actions that is reused across features, removing duplicate code.",
      "Set up type-safe request and response types for every API call, and moved shared display logic such as colours and formatting into one place.",
      "Laid the groundwork for a new AI Activities tab inside the meeting view, ready for upcoming features.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "Streaming AI", "REST APIs"],
    url: "https://meetviro.com",
  },
  {
    period: "May 2026 - Present",
    type: "Independent · Full-stack",
    title: "Lead Full-Stack Engineer",
    company: "Everlasting Hills Church Platform",
    summary:
      "Designed, built and run a complete church management platform on my own: an installable web app that works offline, backed by a secure API that powers every ministry team.",
    highlights: [
      "Built the whole platform solo in five months: a Next.js web app and a NestJS backend with 583 API endpoints, 129 database models and 510 commits.",
      "Covered the full life of the church in 40+ feature areas, including membership, attendance, home cells, visitor follow-up, events, courses, reading plans, giving and reports.",
      "Designed one system that serves every department safely, with 9 levels of access so each leader and member only sees what they should, and a full audit log of who changed what.",
      "Kept sign-in secure by holding login tokens in protected server-side cookies instead of the browser, with rate limiting to block abuse.",
      "Automated the weekly workload with background jobs and 11 scheduled tasks, so follow-ups, reminders, notifications and email campaigns run on their own.",
      "Added online giving with Paystack, and used Google Gemini AI to turn YouTube sermons into written summaries for the congregation.",
      "Made it feel like a native app: installable, usable offline (including sermon playback), with push notifications and a built-in CMS so the team can update the public website themselves.",
      "Connected the services the church relies on, including email, file storage, Google Calendar, Telegram and error monitoring.",
      "Protected every release with automated checks: 186 test files, strict type checks and a safeguard that stops the app and API from drifting apart, before deploying to Google Cloud.",
    ],
    stack: ["Next.js 14", "NestJS", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Supabase Auth", "Paystack", "Gemini AI", "Google Cloud Run", "Sentry"],
    url: "http://everlastinghills.church",
  },
  {
    period: "2026",
    type: "Fintech · Mobile",
    title: "Mobile Engineer",
    company: "Vaultly",
    summary: "Built the mobile banking app for Vaultly, a Nigerian fintech, from sign-up to sending money.",
    highlights: [
      "Built sign-up with real-time identity checks to verify new users.",
      "Connected the app to banking APIs for transfers, deposits, wallets and savings.",
      "Built transfers with live balance updates, clear status messages and full transaction history.",
      "Set up custom app builds so native features could be developed and tested without delays.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Dojah KYC", "Anchor", "Next.js"],
  },
];

export const education = {
  school: "University of Ibadan",
  location: "Ibadan, Nigeria",
  degree: "Bachelor's Degree in Civil Engineering",
};

export const certifications = ["Dufuna Code Camp", "AltSchool Africa", "Code Evolution"];
