import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ["elm", "lineage", "foundry", "cypress", "hearth", "gathering"].map((slug) => ({
      source: `/work/${slug}`,
      destination: "/work#collection",
      permanent: true,
    }));
  },
};

export default nextConfig;
