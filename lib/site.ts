// Personal details shared across the site.

/**
 * Absolute site origin, used for canonical URLs, the sitemap, social images and structured data.
 * Set NEXT_PUBLIC_SITE_URL to your live domain (e.g. https://yourname.com). On Vercel it falls
 * back to the project's production domain automatically.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  url: resolveSiteUrl(),
  name: "Akinfenwa",
  fullName: "Akinfenwa Taiwo Christopher",
  role: "Fullstack & Mobile Engineer",
  // Used for the page title, search snippets and social previews.
  title: "Akinfenwa Taiwo Christopher | Full-Stack & Mobile Engineer",
  description:
    "Akinfenwa Taiwo Christopher is a full-stack and mobile engineer with 5+ years building production web, backend and mobile apps with React, Next.js, NestJS and React Native.",
  keywords: [
    "Akinfenwa Taiwo Christopher",
    "Taiwo Akinfenwa",
    "full-stack engineer",
    "full-stack developer",
    "mobile engineer",
    "React developer",
    "Next.js developer",
    "React Native developer",
    "NestJS developer",
    "TypeScript",
    "frontend engineer",
    "Nigeria software engineer",
    "remote software engineer",
  ],
  available: true,
  email: "taiwoakinfenwa2019@gmail.com",
  github: "https://github.com/AChris-T?tab=repositories",
  githubProfile: "https://github.com/AChris-T",
  linkedin: "https://www.linkedin.com/in/akinfenwa-taiwo-christopher/",
  // Drop your CV into /public with this name.
  resume: "/resume.pdf",
} as const;

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
