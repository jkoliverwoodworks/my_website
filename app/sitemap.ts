import type { MetadataRoute } from "next";
import { pieces } from "@/lib/pieces";
import { routes, siteUrl } from "@/lib/site";

// Lead image for each page, so image search can associate the photography with its page.
const images: Record<string, string[]> = {
  "/": ["/heritage-table.jpg", "/og-hero.jpg"],
  "/work": pieces.map(piece => piece.image),
  "/craftsmanship": ["/heritage-detail.jpg", "/elm-table.jpg", "/lineage-table.jpg"],
  "/process": ["/cypress-table.jpg", "/hearth-table.jpg"],
  "/maker": ["/jeremy-oliver.jpeg", "/hearth-table.jpg"],
  "/investment": ["/foundry-table.jpg"],
  ...Object.fromEntries(pieces.map(piece => [`/work/${piece.slug}`, [piece.image]])),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    // Actual content revision; do not manufacture a new date for every crawl.
    lastModified: "2026-09-17",
    ...(images[path] ? { images: images[path].map(image => `${siteUrl}${image}`) } : {}),
  }));
}
