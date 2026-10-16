import type { Metadata, Viewport } from "next";
import { businessSchema, pageMetadata, siteDescription, siteUrl, websiteSchema } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal";
import { RouteScrollManager } from "@/components/route-scroll-manager";
import { PromotionBar } from "@/components/promotion-bar";
import { getSiteContent } from "@/lib/cms-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata("/", "Custom Dining Tables in Central Texas | J. K. Oliver Woodworks", siteDescription),
  applicationName: "J. K. Oliver Woodworks",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6f3ed" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { promotion } = await getSiteContent();
  return <html lang="en"><head><link rel="preload" href="/inter.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /></head><body><PromotionBar promotion={promotion} />{children}<RouteScrollManager /><ScrollReveal /><JsonLd data={[businessSchema, websiteSchema]} /></body></html>;
}
