import { MetadataRoute } from "next";

/**
 * Robots.txt Configuration
 * Controls what search engines can crawl and index
 *
 * SEO Best Practices:
 * - By default, all pages are allowed unless explicitly disallowed
 * - Only use "disallow" to block private/internal pages
 * - Use "allow" only to override a broader disallow rule
 * - Point to sitemaps for better indexing
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

  return {
    rules: [
      {
        // Universal rules for all search engines
        // By default, everything is allowed - we only specify what to block
        userAgent: "*",
        // Allow root to ensure homepage is crawlable
        allow: "/",
        disallow: [
          // Private/User-specific pages
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart",
          "/auth/",

          // API and internal routes
          "/api/",
          "/studio/",
          // Test and development pages
          "/test-supabase/",
        ],
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/sitemap-images.xml`],
  };
}
