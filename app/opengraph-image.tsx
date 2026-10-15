import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Social preview shown when the site is shared on LinkedIn, X, Slack, WhatsApp, etc.
export const alt = `${site.fullName}, Full-Stack & Mobile Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Montserrat (SIL Open Font License) is bundled in assets/fonts so the image renders at build time.
async function loadFont(weight: number) {
  "use cache";
  const file = await readFile(join(process.cwd(), `assets/fonts/Montserrat-${weight}.ttf`));
  return new Uint8Array(file).buffer;
}

export default async function OpengraphImage() {
  const [medium, semibold] = await Promise.all([loadFont(500), loadFont(600)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          color: "#ffffff",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a3a3a3" }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#b6d7a8" }} />
          Open to new roles and projects
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            {site.fullName}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", marginTop: 18, fontSize: 44, fontWeight: 500, color: "#737373" }}>
            Full-Stack &amp; Mobile Engineer
            <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#b6d7a8", marginLeft: 6, marginBottom: 12 }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#a3a3a3" }}>
          <div style={{ display: "flex" }}>React · Next.js · NestJS · React Native · TypeScript</div>
          <div style={{ display: "flex", color: "#b6d7a8" }}>5+ years</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: medium, weight: 500, style: "normal" },
        { name: "Montserrat", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
