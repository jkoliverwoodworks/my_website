import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jk-oliver-woodworks.andres-urreg-3756.chatgpt.site";
  return ["", "/work", "/craftsmanship", "/process", "/maker", "/investment", "/contact"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : .8 }));
}
