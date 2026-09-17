import type { Metadata } from "next";
import { pieces } from "@/lib/pieces";

// Keep all public SEO URLs on one explicitly configured origin.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    "https://jk-oliver-woodworks.andres-urreg-3756.chatgpt.site",
).origin;

export const siteName = "J. K. Oliver Woodworks";
export const siteDescription =
  "Custom solid-wood dining tables and furniture, handcrafted in Buda for homes across Austin and the Texas Hill Country. Start a conversation with maker Jeremy Oliver.";
export const routes = [
  "/", "/work", "/craftsmanship", "/process", "/maker", "/investment", "/contact",
  ...pieces.map(piece => `/work/${piece.slug}`),
] as const;

const socialImage = {
  url: `${siteUrl}/og.png`,
  width: 1734,
  height: 907,
  alt: "J. K. Oliver Woodworks — Made for the moments that matter. Custom furniture. Buda, Texas.",
};

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_US", siteName, title, description, url, images: [socialImage] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: socialImage.url, alt: socialImage.alt }] },
  };
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${siteUrl}/#business`,
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  image: `${siteUrl}/heritage-table.jpg`,
  email: "jeremyoliver@att.net",
  address: { "@type": "PostalAddress", addressLocality: "Buda", addressRegion: "TX", addressCountry: "US" },
  areaServed: ["Buda", "Austin", "Dripping Springs", "Wimberley", "Texas Hill Country"],
  founder: { "@type": "Person", name: "Jeremy Oliver" },
};
