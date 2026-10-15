// Captures a full-page screenshot plus title/description for every project in lib/projects.ts.
// Only new projects are captured; pass --force to recapture everything.
// Uses the Edge or Chrome already installed on this machine, so no browser download is needed.
// If no browser is available (e.g. on a CI server) it warns and exits cleanly, keeping existing screenshots.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { projects, projectSlug } from "../lib/projects.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "projects");
const metaFile = join(root, "lib", "projects.generated.json");
const force = process.argv.includes("--force");

const WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;
const MAX_HEIGHT = 8000;

const meta = existsSync(metaFile) ? JSON.parse(readFileSync(metaFile, "utf8")) : {};
const todo = projects.filter((p) => {
  const slug = projectSlug(p.url);
  return force || !meta[slug] || !existsSync(join(outDir, `${slug}.jpg`));
});

if (todo.length === 0) process.exit(0);

async function launch() {
  for (const channel of ["msedge", "chrome"]) {
    try {
      return await chromium.launch({ channel });
    } catch {
      // try the next installed browser
    }
  }
  return null;
}

const browser = await launch();
if (!browser) {
  console.warn("[shots] No Edge or Chrome found; skipping project screenshots.");
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });
const context = await browser.newContext({
  viewport: { width: WIDTH, height: VIEWPORT_HEIGHT },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});

for (const project of todo) {
  const slug = projectSlug(project.url);
  const page = await context.newPage();
  try {
    console.log(`[shots] Capturing ${project.url}`);
    // Apps with open connections (websockets, polling, analytics) may never fire "load" or go idle,
    // so wait for the DOM, then give the network a bounded chance to settle before capturing anyway.
    await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(1500);

    // Scroll through the page so lazy-loaded images and scroll animations render.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    const info = await page.evaluate(() => {
      const content = (sel) => document.querySelector(sel)?.getAttribute("content")?.trim();
      return {
        title: content('meta[property="og:title"]') || document.title.trim(),
        description:
          content('meta[name="description"]') || content('meta[property="og:description"]') || "",
        height: document.documentElement.scrollHeight,
      };
    });

    const height = Math.max(VIEWPORT_HEIGHT, Math.min(info.height, MAX_HEIGHT));
    await page.screenshot({
      path: join(outDir, `${slug}.jpg`),
      type: "jpeg",
      quality: 72,
      fullPage: true,
      clip: { x: 0, y: 0, width: WIDTH, height },
    });

    meta[slug] = { title: info.title, description: info.description, width: WIDTH, height };
    console.log(`[shots] Saved ${slug}.jpg (${WIDTH}x${height})`);
  } catch (error) {
    console.warn(`[shots] Failed ${project.url}: ${error.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
writeFileSync(metaFile, `${JSON.stringify(meta, null, 2)}\n`);
