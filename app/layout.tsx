import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "J. K. Oliver Woodworks | Custom Heirloom Furniture in Texas",
  description: "Handcrafted solid-wood dining tables and custom furniture, built in Buda for homes across Austin and the Texas Hill Country.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
