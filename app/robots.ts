import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/admin", "/api/admin"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
