import type { NextConfig } from "next";

// PERFORMANCE: Bundle analyzer for tracking bundle sizes
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    // Disable image optimization in development to avoid CDN timeout issues
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-20f982007aa54df4849bcd969b89a1bf.r2.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
    // Production image optimization settings
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // PERFORMANCE: Experimental features for better performance
  experimental: {
    // Optimize CSS loading to reduce render-blocking
    optimizeCss: false,
    // Optimize imports for large packages - tree-shakes unused exports
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "@sanity/icons",
    ],
  },
};

// PERFORMANCE: Wrap config with bundle analyzer
export default withBundleAnalyzer(nextConfig);
