// Blog FAQ for rich snippets
export interface BlogFaq {
  question: string;
  answer: string;
}

// Blog source/reference
export interface BlogSource {
  title: string;
  url: string;
}

// Related product reference (simplified)
export interface BlogRelatedProduct {
  id: string;
  name: string;
  slug: string;
  image?: string;
  basePrice: number;
}

// Blog category type (value -> display label mapping)
export type BlogCategory =
  | "packaging-tips"
  | "product-guides"
  | "buying-guides"
  | "industry-news"
  | "sustainability"
  | "business"
  | "how-to-guides";

// Category labels for display
export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  "packaging-tips": "Packaging Tips",
  "product-guides": "Product Guides",
  "buying-guides": "Buying Guides",
  "industry-news": "Industry News",
  sustainability: "Sustainability",
  business: "Business",
  "how-to-guides": "How-To Guides",
};

// Main Blog Post interface
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: unknown[]; // Portable Text blocks
  featuredImage: string;
  featuredImageAlt: string;
  category: BlogCategory | string;
  tags?: string[];
  publishedAt: string;
  readTime: number;
  isPublished: boolean;

  // Author info (EEAT)
  author: string;
  authorRole?: string;
  authorImage?: string;

  // Basic SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // 2026 AI & EEAT fields
  llmSummary?: string;
  expertTip?: string;
  faqs?: BlogFaq[];
  videoUrl?: string;
  canonicalUrl?: string;

  // Related content
  relatedProducts?: BlogRelatedProduct[];
  sources?: BlogSource[];
}

// Blog post for listing (lighter version without full content)
export interface BlogPostListing {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: BlogCategory | string;
  publishedAt: string;
  readTime: number;
  author: string;
  authorRole?: string;
}

// Static/fallback blog post structure (matching current implementation)
export interface StaticBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  featuredImage: string;
  content?: string; // HTML content for static posts
}

// Helper function to get category label
export function getCategoryLabel(category: string): string {
  return (
    BLOG_CATEGORY_LABELS[category as BlogCategory] ||
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

// Helper function to format read time
export function formatReadTime(minutes: number): string {
  return `${minutes} min`;
}

// Helper function to format date
export function formatBlogDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
