// Turns scripts/outreach/targets.json into personalised outreach drafts.
// It does NOT send anything: you review each draft and send it yourself, which keeps you
// compliant with LinkedIn's rules and anti-spam law, and keeps the personal touch that gets replies.
//
// Usage:  node scripts/outreach/generate.mjs
// Each target: { name, company, role, detail, channel: "linkedin" | "email", email? }
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// Edit these to match your live links before running.
const ME = {
  name: "Taiwo",
  hire: "https://YOUR-DOMAIN/hire",
  email: "taiwoakinfenwa2019@gmail.com",
};

const targets = JSON.parse(readFileSync(join(here, "targets.json"), "utf8"));

const required = ["name", "company", "role", "detail", "channel"];

function linkedinNote(t) {
  // LinkedIn connection notes cap at 300 characters.
  const note = `Hi ${t.name}, I'm a full-stack engineer (React, TypeScript, NestJS, Postgres). I saw ${t.company} is ${t.detail}. I recently shipped a production platform solo: a 583-endpoint API, live and in use. Keen to connect.`;
  return note.length <= 300
    ? note
    : `Hi ${t.name}, full-stack engineer (React, TS, NestJS, Postgres). Saw ${t.company} is ${t.detail}. Recently shipped a 583-endpoint platform solo. Keen to connect.`;
}

function emailDraft(t) {
  const subject = `Full-stack engineer for ${t.role} at ${t.company}`;
  const body = `Hi ${t.name},

I saw ${t.company} is ${t.detail}, and the ${t.role} role caught my eye.

I'm a full-stack engineer who ships end-to-end. Most recently I built a Next.js + NestJS platform on my own (583 endpoints, a 129-model PostgreSQL database), and I build AI features in production at Viro.

A 20-second overview is here: ${ME.hire}

Would a quick chat be worth your time?

Best,
${ME.name}
${ME.email}`;
  return { subject, body };
}

const out = [];
for (const [i, t] of targets.entries()) {
  const missing = required.filter((k) => !t[k]);
  if (missing.length) {
    out.push(`## ${i + 1}. SKIPPED (missing: ${missing.join(", ")})\n`);
    continue;
  }
  if (t.channel === "linkedin") {
    const note = linkedinNote(t);
    out.push(`## ${i + 1}. ${t.name} at ${t.company} - LinkedIn (${note.length}/300 chars)\n\n${note}\n`);
  } else if (t.channel === "email") {
    const { subject, body } = emailDraft(t);
    const mailto = t.email
      ? `\nmailto link: mailto:${t.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}\n`
      : "\n(no email on this target)\n";
    out.push(`## ${i + 1}. ${t.name} at ${t.company} - Email\n\nSubject: ${subject}\n\n${body}\n${mailto}`);
  } else {
    out.push(`## ${i + 1}. ${t.name} - unknown channel "${t.channel}"\n`);
  }
}

const header = `# Outreach drafts (${new Date().toISOString().slice(0, 10)})\n\nReview each one, personalise further if needed, then send it yourself.\nFor email targets, open the mailto link to start a pre-filled draft in your mail app.\n\n`;
const result = header + out.join("\n---\n\n");
const file = join(here, "drafts.md");
writeFileSync(file, result);
console.log(`Wrote ${targets.length} draft(s) to ${file}`);
console.log("\n" + result);
