import type { MetadataRoute } from "next";
import { getDesigns } from "@/lib/cms-content";
import { siteUrl } from "@/lib/site";

// Lead image for each page, so image search can associate the photography with its page.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pieces = await getDesigns();
  const pages = ["/", "/work", "/craftsmanship", "/process", "/maker", "/investment", "/contact"];
  return [
    ...pages.map(path => ({ url: `${siteUrl}${path === "/" ? "" : path}` })),
    ...pieces.map(piece => ({ url: `${siteUrl}/work/${piece.slug}`, lastModified: piece.updated_at, images: [`${siteUrl}${piece.image}`] })),
  ];
}
