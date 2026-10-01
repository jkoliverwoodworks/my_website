import type { MetadataRoute } from "next";
import { pieces } from "@/lib/pieces";
import { routes, siteUrl } from "@/lib/site";

// Lead image for each page, so image search can associate the photography with its page.
const images: Record<string, string[]> = {
  "/": [pieces[0].image, "/og-hero.jpg"],
  "/work": pieces.map(piece => piece.image),
  "/craftsmanship": ["/heritage-detail.jpg", pieces[0].image, pieces[1].image],
  "/process": [pieces[4].image, pieces[6].image],
  "/maker": ["/jeremy-oliver.jpeg", pieces[7].image],
  "/investment": [pieces[1].image],
  ...Object.fromEntries(pieces.map(piece => [`/work/${piece.slug}`, [piece.image]])),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    // Actual content revision; do not manufacture a new date for every crawl.
    lastModified: "2026-09-30",
    ...(images[path] ? { images: images[path].map(image => `${siteUrl}${image}`) } : {}),
  }));
}
