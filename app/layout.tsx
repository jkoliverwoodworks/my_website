import type { Metadata, Viewport } from "next";
import { businessSchema, pageMetadata, siteDescription, siteUrl, websiteSchema } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal";
import { RouteScrollManager } from "@/components/route-scroll-manager";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata("/", "Custom Dining Tables in Austin | J. K. Oliver Woodworks", siteDescription),
  applicationName: "J. K. Oliver Woodworks",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6f3ed" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" href="/inter.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /></head><body>{children}<RouteScrollManager /><ScrollReveal /><JsonLd data={[businessSchema, websiteSchema]} /></body></html>;
}
