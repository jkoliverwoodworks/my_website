import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Website Studio | J. K. Oliver", robots: { index: false, follow: false } };
export default function StudioLayout({ children }: { children: React.ReactNode }) { return children; }
