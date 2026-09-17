import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "J. K. Oliver",
    description: siteDescription,
    start_url: "/",
    display: "browser",
    background_color: "#f3efe7",
    theme_color: "#f3efe7",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
