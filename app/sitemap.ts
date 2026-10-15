import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Single-page site: the home page is the only canonical URL (section anchors aren't separate pages).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}${site.resume}`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
