// Guide FAQ for rich snippets
export interface GuideFaq {
  question: string;
  answer: string;
}

// Guide source/reference
export interface GuideSource {
  title: string;
  url: string;
}

// Related product reference (simplified)
export interface GuideRelatedProduct {
  id: string;
  name: string;
  slug: string;
  image?: string;
  basePrice: number;
}

// Related category reference
export interface GuideRelatedCategory {
  id: string;
  name: string;
  slug: string;
}

// Related guide reference (for sidebar)
export interface GuideRelatedGuide {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: number;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
}

// Guide category type (value -> display label mapping)
export type GuideCategory =
  | "boxes"
  | "protective-materials"
  | "sealing-materials"
  | "shipping-supplies"
  | "eco-friendly"
  | "business-tips";

// Category labels for display
export const GUIDE_CATEGORY_LABELS: Record<GuideCategory, string> = {
  boxes: "Boxes",
  "protective-materials": "Protective Materials",
  "sealing-materials": "Sealing Materials",
  "shipping-supplies": "Shipping Supplies",
  "eco-friendly": "Eco-Friendly",
  "business-tips": "Business Tips",
};

// Main Guide interface (full content for detail page)
export interface Guide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: unknown[]; // Portable Text blocks
  featuredImage: string;
  featuredImageAlt: string;
  category: GuideCategory | string;
  topics: string[];
  readTime: number;
  isPublished: boolean;
  publishedAt?: string;
  lastUpdated?: string;

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
  faqs?: GuideFaq[];
  videoUrl?: string;
  canonicalUrl?: string;

  // Related content
  relatedProducts?: GuideRelatedProduct[];
  relatedCategories?: GuideRelatedCategory[];
  relatedGuides?: GuideRelatedGuide[];
  sources?: GuideSource[];
}

// Guide for listing (lighter version without full content)
export interface GuideListing {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: GuideCategory | string;
  topics: string[];
  readTime: number;
  publishedAt?: string;
  lastUpdated?: string;
  author: string;
  authorRole?: string;
}

// Static/fallback guide structure (matching current implementation)
export interface StaticGuide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  featuredImage: string;
  topics: string[];
  seoTitle?: string;
  seoDescription?: string;
  content: string; // Markdown content for static guides
}

// Helper function to get category label
export function getGuideCategoryLabel(category: string): string {
  return (
    GUIDE_CATEGORY_LABELS[category as GuideCategory] ||
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

// Helper function to format read time
export function formatGuideReadTime(minutes: number): string {
  return `${minutes} min`;
}

// Helper function to format date
export function formatGuideDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Normalize static guide to match GuideListing interface
export function normalizeStaticGuide(guide: StaticGuide): GuideListing {
  return {
    id: guide.slug,
    title: guide.title,
    slug: guide.slug,
    excerpt: guide.excerpt,
    featuredImage: guide.featuredImage,
    featuredImageAlt: `${guide.title} - packaging buying guide`,
    category: guide.category.toLowerCase().replace(/ /g, "-"),
    topics: guide.topics,
    readTime: parseInt(guide.readTime) || 8,
    author: "Bubble Wrap Shop Team",
  };
}
