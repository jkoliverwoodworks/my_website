import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    // Actual content revision; do not manufacture a new date for every crawl.
    lastModified: "2026-09-17",
  }));
}
