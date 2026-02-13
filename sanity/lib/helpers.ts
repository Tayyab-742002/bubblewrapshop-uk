import { urlFor } from "./image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Types for our data
export interface SanityProduct {
  _id: string;
  _type: string;
  name: string;
  slug: { current: string };
  productCode: string;
  description?: string;
  shortDescription?: string;
  basePrice: number;
  discount?: number;
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  tags?: string[];
  delivery?: string;

  // Basic SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // 2026 AI & EEAT fields
  llmSummary?: string;
  expertTip?: string;
  materialFeel?: string;
  useCases?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;

  // Google Shopping / Merchant fields
  gtin?: string;
  mpn?: string;
  brand?: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };

  category?: {
    _id: string;
    name: string;
    slug: { current: string };
    image?: SanityImageSource;
  };
  mainImage?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  galleryImages?: Array<{
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  }>;
  variants?: Array<{
    name: string;
    sku: string;
    priceAdjustment: number;
    isActive: boolean;
    stockQuantity?: number;
    quantityOptions?: Array<{
      label: string;
      quantity: number;
      unit: string;
      pricePerUnit?: number;
      isActive: boolean;
    }>;
    pricingTiers?: Array<{
      minQuantity: number;
      maxQuantity?: number;
      discount: number;
      label?: string;
    }>;
  }>;
  pricingTiers?: Array<{
    minQuantity: number;
    maxQuantity?: number;
    discount: number; // Required: Discount percentage (0-100)
    label?: string;
  }>;
  specifications?: Array<{
    name: string;
    value: string;
  }>;
}

export interface SanityCategory {
  _id: string;
  _type: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  isActive: boolean;
  sortOrder: number;

  // Basic SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // 2026 AI & EEAT fields
  llmSummary?: string;
  expertTip?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  useCases?: string[];
}

export interface SanityBanner {
  _id: string;
  _type: string;
  title?: string;
  description?: string;
  ctaLink?: string;
  ctaText?: string;
  index: number;
  isActive: boolean;
  mediaType: "image" | "video";
  backgroundImage?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  backgroundVideo?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  videoUrl?: string;
  videoPoster?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  videoSettings?: {
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    showControls: boolean;
  };
}

export interface SanityAnnouncement {
  _id: string;
  _type: string;
  message: string;
  link?: string;
  linkText?: string;
  isActive: boolean;
  dismissible: boolean;
}

export interface SanityBlogPost {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content?: unknown[];
  featuredImage?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  category: string;
  tags?: string[];
  publishedAt: string;
  readTime?: number;
  isPublished: boolean;

  // Author (EEAT)
  author?: string;
  authorRole?: string;
  authorImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };

  // Basic SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // 2026 AI & EEAT fields
  llmSummary?: string;
  expertTip?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  videoUrl?: string;
  canonicalUrl?: string;

  // Related content
  relatedProducts?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
    basePrice: number;
    mainImage?: {
      asset: {
        url: string;
      };
    };
  }>;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

export interface SanityGuide {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content?: unknown[];
  featuredImage?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  category: string;
  topics?: string[];
  readTime?: number;
  isPublished: boolean;
  publishedAt?: string;
  lastUpdated?: string;

  // Author (EEAT)
  author?: string;
  authorRole?: string;
  authorImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };

  // Basic SEO fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // 2026 AI & EEAT fields
  llmSummary?: string;
  expertTip?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  videoUrl?: string;
  canonicalUrl?: string;

  // Related content
  relatedProducts?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
    basePrice: number;
    mainImage?: {
      asset: {
        url: string;
      };
    };
  }>;
  relatedCategories?: Array<{
    _id: string;
    name: string;
    slug: { current: string };
  }>;
  relatedGuides?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    readTime?: number;
    excerpt: string;
    featuredImage?: {
      asset: {
        url: string;
      };
      alt?: string;
    };
  }>;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

// Transform Sanity product to our Product type
/**
 * Generate descriptive alt text for product images
 * Falls back to product name with context if alt text is not provided
 */
function generateImageAlt(
  alt: string | undefined,
  productName: string,
  category?: string,
  imageIndex?: number
): string {
  if (alt && alt.trim()) {
    return alt;
  }

  const categoryContext = category ? ` ${category}` : "";
  const imageContext =
    imageIndex !== undefined && imageIndex > 0
      ? ` - View ${imageIndex + 1}`
      : "";

  return `${productName}${categoryContext} packaging supplies${imageContext}`;
}

export function transformSanityProduct(sanityProduct: SanityProduct) {
  const productName = sanityProduct.name;
  const category = sanityProduct.category?.name;

  // Generate alt text for main image
  const mainImageAlt = generateImageAlt(
    sanityProduct.mainImage?.alt,
    productName,
    category
  );

  // Generate alt text for gallery images
  const galleryImagesAlt =
    sanityProduct.galleryImages?.map((img, index) =>
      generateImageAlt(img.alt, productName, category, index + 1)
    ) || [];

  return {
    id: sanityProduct._id,
    product_code: sanityProduct.productCode,
    name: productName,
    slug: sanityProduct.slug.current,
    description: sanityProduct.description,
    image: sanityProduct.mainImage?.asset?.url || "",
    imageAlt: mainImageAlt,
    images: sanityProduct.galleryImages?.map((img) => img.asset.url) || [],
    imagesAlt: galleryImagesAlt,
    basePrice: sanityProduct.basePrice,
    discount: sanityProduct.discount,
    category: category,
    categorySlug: sanityProduct.category?.slug?.current,
    variants:
      sanityProduct.variants
        ?.filter((variant) => variant.isActive)
        .map((variant) => ({
          id: `${sanityProduct._id}-${variant.sku}`,
          name: variant.name,
          sku: variant.sku,
          price_adjustment: variant.priceAdjustment,
          quantityOptions: variant.quantityOptions
            ?.filter((qty) => qty.isActive)
            .map((qty) => ({
              label: qty.label,
              quantity: qty.quantity,
              unit: qty.unit,
              pricePerUnit: qty.pricePerUnit,
              isActive: qty.isActive,
            })),
          pricingTiers: variant.pricingTiers?.map((tier) => ({
            minQuantity: tier.minQuantity,
            maxQuantity: tier.maxQuantity,
            discount: tier.discount || 0,
            label: tier.label,
          })),
        })) || [],
    pricingTiers:
      sanityProduct.pricingTiers?.map((tier) => ({
        minQuantity: tier.minQuantity,
        maxQuantity: tier.maxQuantity,
        discount: tier.discount || 0, // Required field, default to 0 if missing
        label: tier.label,
      })) || [],
    specifications:
      sanityProduct.specifications?.reduce(
        (acc, spec) => {
          acc[spec.name] = spec.value;
          return acc;
        },
        {} as Record<string, string>
      ) || {},
    delivery: sanityProduct.delivery,

    // Basic SEO fields
    seoTitle: sanityProduct.seoTitle,
    seoDescription: sanityProduct.seoDescription,
    seoKeywords: sanityProduct.seoKeywords,

    // 2026 AI & EEAT fields
    llmSummary: sanityProduct.llmSummary,
    expertTip: sanityProduct.expertTip,
    materialFeel: sanityProduct.materialFeel,
    useCases: sanityProduct.useCases,
    faqs: sanityProduct.faqs,

    // Google Shopping / Merchant fields
    gtin: sanityProduct.gtin,
    mpn: sanityProduct.mpn,
    brand: sanityProduct.brand || "Bubble Wrap Shop",
    weight: sanityProduct.weight,
    dimensions: sanityProduct.dimensions,
  };
}

// Transform Sanity category to our Category type
export function transformSanityCategory(sanityCategory: SanityCategory) {
  // Generate descriptive alt text for category images
  const categoryImageAlt = sanityCategory.image?.alt
    ? sanityCategory.image.alt
    : `${sanityCategory.name} packaging supplies category`;

  return {
    id: sanityCategory._id,
    name: sanityCategory.name,
    slug: sanityCategory.slug.current,
    description: sanityCategory.description,
    image: sanityCategory.image?.asset?.url || "",
    imageAlt: categoryImageAlt,
    isActive: sanityCategory.isActive,
    sortOrder: sanityCategory.sortOrder,

    // Basic SEO fields
    seoTitle: sanityCategory.seoTitle,
    seoDescription: sanityCategory.seoDescription,
    seoKeywords: sanityCategory.seoKeywords,

    // 2026 AI & EEAT fields
    llmSummary: sanityCategory.llmSummary,
    expertTip: sanityCategory.expertTip,
    faqs: sanityCategory.faqs,
    useCases: sanityCategory.useCases,
  };
}

// Transform Sanity banner to our Banner type
export function transformSanityBanner(sanityBanner: SanityBanner) {
  return {
    id: sanityBanner._id,
    title: sanityBanner.title || "",
    description: sanityBanner.description || "",
    ctaLink: sanityBanner.ctaLink || null,
    ctaText: sanityBanner.ctaText || null,
    index: sanityBanner.index,
    mediaType: sanityBanner.mediaType || "image",
    image: sanityBanner.backgroundImage?.asset?.url || "",
    alt:
      sanityBanner.backgroundImage?.alt ||
      sanityBanner.title ||
      `Banner ${sanityBanner.index}`,
    video:
      sanityBanner.backgroundVideo?.asset?.url || sanityBanner.videoUrl || "",
    videoPoster: sanityBanner.videoPoster?.asset?.url || "",
    videoSettings: sanityBanner.videoSettings || {
      autoplay: true,
      loop: true,
      muted: true,
      showControls: false,
    },
  };
}

// Transform Sanity announcement to our Announcement type
export function transformSanityAnnouncement(
  sanityAnnouncement: SanityAnnouncement
) {
  return {
    id: sanityAnnouncement._id,
    message: sanityAnnouncement.message,
    link: sanityAnnouncement.link || null,
    linkText: sanityAnnouncement.linkText || null,
    dismissible: sanityAnnouncement.dismissible,
  };
}

// Transform Sanity blog post to our BlogPost type
export function transformSanityBlogPost(sanityBlogPost: SanityBlogPost) {
  // Generate descriptive alt text for featured image
  const featuredImageAlt = sanityBlogPost.featuredImage?.alt
    ? sanityBlogPost.featuredImage.alt
    : `${sanityBlogPost.title} - packaging blog article`;

  return {
    id: sanityBlogPost._id,
    title: sanityBlogPost.title,
    slug: sanityBlogPost.slug.current,
    excerpt: sanityBlogPost.excerpt,
    content: sanityBlogPost.content,
    featuredImage: sanityBlogPost.featuredImage?.asset?.url || "",
    featuredImageAlt,
    category: sanityBlogPost.category,
    tags: sanityBlogPost.tags,
    publishedAt: sanityBlogPost.publishedAt,
    readTime: sanityBlogPost.readTime || 5,
    isPublished: sanityBlogPost.isPublished,

    // Author (EEAT)
    author: sanityBlogPost.author || "Bubble Wrap Shop Team",
    authorRole: sanityBlogPost.authorRole,
    authorImage: sanityBlogPost.authorImage?.asset?.url,

    // Basic SEO fields
    seoTitle: sanityBlogPost.seoTitle,
    seoDescription: sanityBlogPost.seoDescription,
    seoKeywords: sanityBlogPost.seoKeywords,

    // 2026 AI & EEAT fields
    llmSummary: sanityBlogPost.llmSummary,
    expertTip: sanityBlogPost.expertTip,
    faqs: sanityBlogPost.faqs,
    videoUrl: sanityBlogPost.videoUrl,
    canonicalUrl: sanityBlogPost.canonicalUrl,

    // Related content
    relatedProducts: sanityBlogPost.relatedProducts?.map((product) => ({
      id: product._id,
      name: product.name,
      slug: product.slug.current,
      image: product.mainImage?.asset?.url,
      basePrice: product.basePrice,
    })),
    sources: sanityBlogPost.sources,
  };
}

// Transform Sanity blog post listing (lighter version)
export function transformSanityBlogPostListing(sanityBlogPost: SanityBlogPost) {
  const featuredImageAlt = sanityBlogPost.featuredImage?.alt
    ? sanityBlogPost.featuredImage.alt
    : `${sanityBlogPost.title} - packaging blog article`;

  return {
    id: sanityBlogPost._id,
    title: sanityBlogPost.title,
    slug: sanityBlogPost.slug.current,
    excerpt: sanityBlogPost.excerpt,
    featuredImage: sanityBlogPost.featuredImage?.asset?.url || "",
    featuredImageAlt,
    category: sanityBlogPost.category,
    publishedAt: sanityBlogPost.publishedAt,
    readTime: sanityBlogPost.readTime || 5,
    author: sanityBlogPost.author || "Bubble Wrap Shop Team",
    authorRole: sanityBlogPost.authorRole,
  };
}

// Transform Sanity guide to our Guide type (full content for detail page)
export function transformSanityGuide(sanityGuide: SanityGuide) {
  // Generate descriptive alt text for featured image
  const featuredImageAlt = sanityGuide.featuredImage?.alt
    ? sanityGuide.featuredImage.alt
    : `${sanityGuide.title} - packaging buying guide`;

  return {
    id: sanityGuide._id,
    title: sanityGuide.title,
    slug: sanityGuide.slug.current,
    excerpt: sanityGuide.excerpt,
    content: sanityGuide.content,
    featuredImage: sanityGuide.featuredImage?.asset?.url || "",
    featuredImageAlt,
    category: sanityGuide.category,
    topics: sanityGuide.topics || [],
    readTime: sanityGuide.readTime || 8,
    isPublished: sanityGuide.isPublished,
    publishedAt: sanityGuide.publishedAt,
    lastUpdated: sanityGuide.lastUpdated,

    // Author (EEAT)
    author: sanityGuide.author || "Bubble Wrap Shop Team",
    authorRole: sanityGuide.authorRole,
    authorImage: sanityGuide.authorImage?.asset?.url,

    // Basic SEO fields
    seoTitle: sanityGuide.seoTitle,
    seoDescription: sanityGuide.seoDescription,
    seoKeywords: sanityGuide.seoKeywords,

    // 2026 AI & EEAT fields
    llmSummary: sanityGuide.llmSummary,
    expertTip: sanityGuide.expertTip,
    faqs: sanityGuide.faqs,
    videoUrl: sanityGuide.videoUrl,
    canonicalUrl: sanityGuide.canonicalUrl,

    // Related content
    relatedProducts: sanityGuide.relatedProducts?.map((product) => ({
      id: product._id,
      name: product.name,
      slug: product.slug.current,
      image: product.mainImage?.asset?.url,
      basePrice: product.basePrice,
    })),
    relatedCategories: sanityGuide.relatedCategories?.map((category) => ({
      id: category._id,
      name: category.name,
      slug: category.slug.current,
    })),
    relatedGuides: sanityGuide.relatedGuides?.map((guide) => ({
      id: guide._id,
      title: guide.title,
      slug: guide.slug.current,
      category: guide.category,
      readTime: guide.readTime || 8,
      excerpt: guide.excerpt,
      featuredImage: guide.featuredImage?.asset?.url || "",
      featuredImageAlt: guide.featuredImage?.alt || `${guide.title} - buying guide`,
    })),
    sources: sanityGuide.sources,
  };
}

// Transform Sanity guide listing (lighter version)
export function transformSanityGuideListing(sanityGuide: SanityGuide) {
  const featuredImageAlt = sanityGuide.featuredImage?.alt
    ? sanityGuide.featuredImage.alt
    : `${sanityGuide.title} - packaging buying guide`;

  return {
    id: sanityGuide._id,
    title: sanityGuide.title,
    slug: sanityGuide.slug.current,
    excerpt: sanityGuide.excerpt,
    featuredImage: sanityGuide.featuredImage?.asset?.url || "",
    featuredImageAlt,
    category: sanityGuide.category,
    topics: sanityGuide.topics || [],
    readTime: sanityGuide.readTime || 8,
    publishedAt: sanityGuide.publishedAt,
    lastUpdated: sanityGuide.lastUpdated,
    author: sanityGuide.author || "Bubble Wrap Shop Team",
    authorRole: sanityGuide.authorRole,
  };
}

// ==========================================
// SPECIAL OFFER TYPES & TRANSFORMERS
// ==========================================

export interface SanitySpecialOffer {
  _id: string;
  _type: "specialOffer";
  title: string;
  slug: string;
  product: SanityProduct;
  targetedVariants?: string[];
  deliveryCharge: number;
  badgeText?: string;
  badgeColor: "red" | "orange" | "green" | "blue";
  shortDescription?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export function transformSanitySpecialOffer(sanityOffer: SanitySpecialOffer) {
  return {
    id: sanityOffer._id,
    title: sanityOffer.title,
    slug: sanityOffer.slug,
    product: transformSanityProduct(sanityOffer.product),
    targetedVariants: sanityOffer.targetedVariants,
    deliveryCharge: sanityOffer.deliveryCharge,
    badgeText: sanityOffer.badgeText,
    badgeColor: sanityOffer.badgeColor,
    shortDescription: sanityOffer.shortDescription,
    startDate: sanityOffer.startDate,
    endDate: sanityOffer.endDate,
    isActive: sanityOffer.isActive,
    isFeatured: sanityOffer.isFeatured,
    sortOrder: sanityOffer.sortOrder,
  };
}

// Helper function to build filter string for GROQ
export function buildFilterString(filters: {
  category?: string;
  size?: string[];
  material?: string[];
  color?: string[];
  ecoFriendly?: string[];
  priceMin?: number;
  priceMax?: number;
}) {
  const filterParts: string[] = [];

  if (filters.category) {
    // Match by category slug (preferred) and fall back to name match
    filterParts.push(
      `(category->slug.current == "${filters.category}" || category->name match "${filters.category}")`
    );
  }

  if (filters.size && filters.size.length > 0) {
    const sizeFilter = filters.size
      .map((size) => `variants[].name match "${size}"`)
      .join(" || ");
    filterParts.push(`(${sizeFilter})`);
  }

  if (filters.material && filters.material.length > 0) {
    const materialFilter = filters.material
      .map((material) => `tags[] match "${material}"`)
      .join(" || ");
    filterParts.push(`(${materialFilter})`);
  }

  if (filters.color && filters.color.length > 0) {
    const colorFilter = filters.color
      .map((color) => `tags[] match "${color}"`)
      .join(" || ");
    filterParts.push(`(${colorFilter})`);
  }

  if (filters.ecoFriendly && filters.ecoFriendly.length > 0) {
    const ecoFilter = filters.ecoFriendly
      .map((eco) => `tags[] match "${eco}"`)
      .join(" || ");
    filterParts.push(`(${ecoFilter})`);
  }

  if (filters.priceMin !== undefined) {
    filterParts.push(`basePrice >= ${filters.priceMin}`);
  }

  if (filters.priceMax !== undefined) {
    filterParts.push(`basePrice <= ${filters.priceMax}`);
  }

  return filterParts.length > 0 ? `&& ${filterParts.join(" && ")}` : "";
}

// Helper function to build order string for GROQ
export function buildOrderString(sortBy: string) {
  switch (sortBy) {
    case "newest":
      return "_createdAt desc";
    case "oldest":
      return "_createdAt asc";
    case "price-low":
      return "basePrice asc";
    case "price-high":
      return "basePrice desc";
    case "name-asc":
      return "name asc";
    case "name-desc":
      return "name desc";
    case "featured":
      return "isFeatured desc, name asc";
    default:
      return "name asc";
  }
}

// Error handling wrapper
export async function safeQuery<T>(
  queryFn: () => Promise<T>
): Promise<T | null> {
  try {
    return await queryFn();
  } catch (error) {
    console.error("Sanity query error:", error);
    return null;
  }
}
