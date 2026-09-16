import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "J. K. Oliver Woodworks | Custom Heirloom Furniture in Texas",
  description: "Handcrafted solid-wood dining tables and custom furniture, built in Buda for homes across Austin and the Texas Hill Country.",
  keywords: ["custom dining tables Austin", "custom furniture Buda TX", "Texas Hill Country furniture maker", "heirloom wood furniture"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "FurnitureStore", name: "J. K. Oliver Woodworks", description: "Handcrafted, solid-wood custom furniture in Buda, Texas.", email: "jeremyoliver@att.net", address: { "@type": "PostalAddress", addressLocality: "Buda", addressRegion: "TX", addressCountry: "US" }, areaServed: ["Buda", "Austin", "Dripping Springs", "Wimberley", "Texas Hill Country"], founder: { "@type": "Person", name: "Jeremy Oliver" } };
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
