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

// A capture of the live homepage hero, so shared links look like the site itself.
export const socialImage = {
  url: `${siteUrl}/og-hero.jpg`,
  width: 1200,
  height: 630,
  alt: "J. K. Oliver Woodworks — Made to be kept. Bespoke furniture, Buda, Texas.",
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
  image: [`${siteUrl}/heritage-table.jpg`, socialImage.url],
  email: "jeremyoliver@att.net",
  address: { "@type": "PostalAddress", addressLocality: "Buda", addressRegion: "TX", addressCountry: "US" },
  areaServed: [
    ...["Buda", "Austin", "Dripping Springs", "Wimberley"].map(name => ({ "@type": "City", name })),
    { "@type": "Place", name: "Texas Hill Country" },
  ],
  founder: { "@id": `${siteUrl}/maker#jeremy-oliver` },
  knowsAbout: ["Custom dining tables", "Solid hardwood furniture", "White oak furniture", "Walnut furniture", "Bespoke furniture design"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  inLanguage: "en-US",
  publisher: { "@id": `${siteUrl}/#business` },
};

export const makerSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/maker#jeremy-oliver`,
  name: "Jeremy Oliver",
  jobTitle: "Owner & craftsman",
  url: `${siteUrl}/maker`,
  image: `${siteUrl}/jeremy-oliver.jpeg`,
  worksFor: { "@id": `${siteUrl}/#business` },
  homeLocation: { "@type": "Place", name: "Buda, Texas" },
  knowsAbout: ["Woodworking", "Custom furniture", "Dining tables"],
};

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function faqSchema(faqs: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };
}
