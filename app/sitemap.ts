import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
export const revalidate = 3600; // Regenerate every hour
/**
 * Dynamic Sitemap Generation
 * Generates sitemap.xml for all products, categories, and static pages
 * Helps search engines discover and index all pages
 *
 * SEO Best Practices:
 * - Homepage: Priority 1.0, Daily updates
 * - Product pages: Priority 0.8, Weekly updates
 * - Category pages: Priority 0.7, Weekly updates
 * - Static pages: Priority 0.3-0.7, Monthly/Yearly updates
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";
  const baseDate = new Date();

  // Static pages with optimized priorities and change frequencies
  // Priority hierarchy: Homepage (1.0) > Product/Category listings (0.9) > Individual pages (0.8-0.6) > Legal (0.3)
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: siteUrl,
      lastModified: baseDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Main shopping pages - very high priority (revenue-generating)
    {
      url: `${siteUrl}/products`,
      lastModified: baseDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Business/conversion pages - high priority
    {
      url: `${siteUrl}/wholesale`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/b2b-request`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Location pages - good for local SEO
    {
      url: `${siteUrl}/locations/blackburn`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.8, // HQ location
    },
    {
      url: `${siteUrl}/locations/manchester`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/locations/london`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/locations`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Content pages - medium priority
    {
      url: `${siteUrl}/blogs`,
      lastModified: baseDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Support/info pages
    {
      url: `${siteUrl}/about`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/sustainability`,
      lastModified: baseDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Legal pages - low priority
    {
      url: `${siteUrl}/terms`,
      lastModified: baseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: baseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/refund-policy`,
      lastModified: baseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Fetch all products with _updatedAt from Sanity
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await client.fetch<
      Array<{ slug: { current: string }; _updatedAt: string }>
    >(
      groq`*[_type == "product" && isActive == true] | order(name asc) {
        "slug": slug.current,
        _updatedAt
      }`
    );
    productPages = products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: product._updatedAt
        ? new Date(product._updatedAt)
        : baseDate,
      changeFrequency: "weekly" as const,
      priority: 0.9, // Very high priority - revenue-generating pages
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    // Continue without products - don't break the sitemap
  }

  // Fetch all categories with _updatedAt from Sanity
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await client.fetch<
      Array<{ slug: { current: string }; _updatedAt: string }>
    >(
      groq`*[_type == "category" && isActive == true] | order(sortOrder asc, name asc) {
        "slug": slug.current,
        _updatedAt
      }`
    );
    if (categories) {
      categoryPages = categories.map((category) => ({
        url: `${siteUrl}/categories/${category.slug}`,
        lastModified: category._updatedAt
          ? new Date(category._updatedAt)
          : baseDate,
        changeFrequency: "weekly" as const,
        priority: 0.85, // High priority - category pages drive product discovery
      }));
    }
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
    // Continue without categories - don't break the sitemap
  }

  // Fetch buying guides from Sanity
  let guidePages: MetadataRoute.Sitemap = [];
  try {
    const guides = await client.fetch<
      Array<{ slug: { current: string }; publishedAt: string; lastUpdated: string; _updatedAt: string }>
    >(
      groq`*[_type == "guide" && isPublished == true] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt,
        lastUpdated,
        _updatedAt
      }`
    );
    if (guides && guides.length > 0) {
      guidePages = guides.map((guide) => ({
        url: `${siteUrl}/guides/${guide.slug}`,
        lastModified: guide.lastUpdated
          ? new Date(guide.lastUpdated)
          : guide._updatedAt
            ? new Date(guide._updatedAt)
            : guide.publishedAt
              ? new Date(guide.publishedAt)
              : baseDate,
        changeFrequency: "monthly" as const,
        priority: 0.65, // Content pages - support SEO but not revenue-direct
      }));
    }
  } catch (error) {
    console.error("Error fetching guides for sitemap:", error);
    // Continue with static fallback
  }

  // Static guide fallback pages (in case Sanity is empty)
  const staticGuidePages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/guides/packaging-boxes-guide`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${siteUrl}/guides/bubble-wrap-guide`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${siteUrl}/guides/packing-tape-guide`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${siteUrl}/guides/protective-packaging-guide`,
      lastModified: baseDate,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
  ];

  // Merge guide pages, avoiding duplicates (Sanity takes precedence)
  const sanityGuideSlugs = new Set(guidePages.map((p) => p.url));
  const mergedGuidePages = [
    ...guidePages,
    ...staticGuidePages.filter((p) => !sanityGuideSlugs.has(p.url)),
  ];

  // Static blog fallback pages
  const staticBlogPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/blogs/how-to-choose-the-right-packaging-box`,
      lastModified: new Date("2024-12-15"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blogs/bubble-wrap-vs-foam-which-is-better`,
      lastModified: new Date("2024-12-10"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blogs/packaging-tips-for-fragile-items`,
      lastModified: new Date("2024-12-05"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blogs/eco-friendly-packaging-alternatives`,
      lastModified: new Date("2024-11-28"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blogs/how-to-calculate-packaging-costs`,
      lastModified: new Date("2024-11-20"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blogs/cardboard-box-sizes-guide`,
      lastModified: new Date("2024-11-15"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Fetch blog posts from Sanity
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogPosts = await client.fetch<
      Array<{ slug: { current: string }; publishedAt: string; _updatedAt: string }>
    >(
      groq`*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt,
        _updatedAt
      }`
    );
    if (blogPosts && blogPosts.length > 0) {
      blogPages = blogPosts.map((post) => ({
        url: `${siteUrl}/blogs/${post.slug}`,
        lastModified: post._updatedAt
          ? new Date(post._updatedAt)
          : post.publishedAt
            ? new Date(post.publishedAt)
            : baseDate,
        changeFrequency: "monthly" as const,
        priority: 0.6, // Content pages - support SEO
      }));
    }
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    // Continue with static fallback
  }

  // Merge blog pages, avoiding duplicates (Sanity takes precedence)
  const sanityBlogSlugs = new Set(blogPages.map((p) => p.url));
  const mergedBlogPages = [
    ...blogPages,
    ...staticBlogPages.filter((p) => !sanityBlogSlugs.has(p.url)),
  ];

  // Combine all pages
  // Sort by priority (highest first) for better SEO
  const allPages = [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...mergedBlogPages,
    ...mergedGuidePages,
  ];

  // Sort by priority (descending) - helps search engines prioritize important pages
  allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return allPages;
}
