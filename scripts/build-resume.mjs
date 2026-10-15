// Renders scripts/resume/resume.html to public/resume.pdf using the Edge or Chrome on this machine.
// Edit the HTML, then run `npm run resume`.
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "scripts", "resume", "resume.html");
const output = join(root, "public", "resume.pdf");

let browser;
for (const channel of ["msedge", "chrome"]) {
  try {
    browser = await chromium.launch({ channel });
    break;
  } catch {
    // try the next installed browser
  }
}
if (!browser) {
  console.error("[resume] No Edge or Chrome found.");
  process.exit(1);
}

const page = await browser.newPage();
await page.goto(pathToFileURL(source).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: output, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`[resume] Saved ${output}`);
