/**
 * GROQ Queries for Sanity CMS
 * These queries fetch products, categories, and related data
 */

// Base product query with all fields (including 2026 SEO fields)
const PRODUCT_QUERY = `
  _id,
  _type,
  name,
  slug,
  productCode,
  description,
  shortDescription,
  basePrice,
  discount,
  isActive,
  isFeatured,
  isNewArrival,
  tags,
  delivery,

  // Basic SEO fields
  seoTitle,
  seoDescription,
  seoKeywords,

  // 2026 AI & EEAT fields
  llmSummary,
  expertTip,
  materialFeel,
  useCases,
  faqs[] {
    question,
    answer
  },

  // Google Shopping / Merchant fields
  gtin,
  mpn,
  brand,
  weight,
  dimensions {
    length,
    width,
    height
  },

  category-> {
    _id,
    name,
    slug,
    image
  },
  mainImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  galleryImages[] {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  variants[] {
    name,
    sku,
    priceAdjustment,
    isActive,
    stockQuantity,
    quantityOptions[] {
      label,
      quantity,
      unit,
      pricePerUnit,
      isActive
    },
    pricingTiers[] {
      minQuantity,
      maxQuantity,
      discount,
      label
    }
  },
  pricingTiers[] {
    minQuantity,
    maxQuantity,
    discount,
    label
  },
  specifications[] {
    name,
    value
  }
`;

// Simplified product query for listings
const PRODUCT_LISTING_QUERY = `
  _id,
  _type,
  name,
  slug,
  productCode,
  shortDescription,
  basePrice,
  discount,
  isActive,
  isFeatured,
  isNewArrival,
  tags,
  category-> {
    _id,
    name,
    slug
  },
  mainImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  galleryImages[] {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  variants[] {
    name,
    sku,
    priceAdjustment,
    isActive,
    quantityOptions[] {
      label,
      quantity,
      unit,
      pricePerUnit,
      isActive
    },
    pricingTiers[] {
      minQuantity,
      maxQuantity,
      discount,
      label
    }
  }
`;

// Category query (including 2026 SEO fields)
const CATEGORY_QUERY = `
  _id,
  _type,
  name,
  slug,
  description,
  image {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  isActive,
  sortOrder,

  // Basic SEO fields
  seoTitle,
  seoDescription,
  seoKeywords,

  // 2026 AI & EEAT fields
  llmSummary,
  expertTip,
  faqs[] {
    question,
    answer
  },
  useCases
`;

// All products query
export const ALL_PRODUCTS_QUERY = `*[_type == "product" && isActive == true] | order(name asc) {
  ${PRODUCT_LISTING_QUERY}
}`;

// Featured products query
export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && isActive == true && isFeatured == true] | order(name asc) {
  ${PRODUCT_LISTING_QUERY}
}`;

// New arrivals query
export const NEW_ARRIVALS_QUERY = `*[_type == "product" && isActive == true && isNewArrival == true] | order(_createdAt desc) {
  ${PRODUCT_LISTING_QUERY}
}`;

// Single product by slug query
export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug && isActive == true][0] {
  ${PRODUCT_QUERY}
}`;

// Products by category query (by category ID)
export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && isActive == true && category._ref == $categoryId] | order(name asc) {
  ${PRODUCT_LISTING_QUERY}
}`;

// Products by category slug query (for related products)
export const PRODUCTS_BY_CATEGORY_SLUG_QUERY = `*[_type == "product" && isActive == true && category->slug.current == $categorySlug] | order(name asc) {
  ${PRODUCT_LISTING_QUERY}
}`;

// All categories query
export const ALL_CATEGORIES_QUERY = `*[_type == "category" && isActive == true] | order(sortOrder asc, name asc) {
  ${CATEGORY_QUERY}
}`;

// Categories with featured products for mega menu
export const CATEGORIES_WITH_FEATURED_PRODUCTS_QUERY = `*[_type == "category" && isActive == true] | order(sortOrder asc, name asc) {
  ${CATEGORY_QUERY},
  "featuredProducts": *[_type == "product" && isActive == true && isFeatured == true && category._ref == ^._id] | order(name asc) [0...3] {
    ${PRODUCT_LISTING_QUERY}
  }
}`;

// Search products query
export const SEARCH_PRODUCTS_QUERY = `*[_type == "product" && isActive == true && (
  name match $searchTerm ||
  description match $searchTerm ||
  productCode match $searchTerm ||
  tags[] match $searchTerm
)] | order(name asc) {
  ${PRODUCT_LISTING_QUERY}
}`;

// Filtered products query
export const FILTERED_PRODUCTS_QUERY = `*[_type == "product" && isActive == true $filters] | order($orderBy) {
  ${PRODUCT_LISTING_QUERY}
}`;

// Products by IDs query
export const PRODUCTS_BY_IDS_QUERY = `*[_type == "product" && _id in $ids && isActive == true] {
  ${PRODUCT_LISTING_QUERY}
}`;

// Category by slug query
export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug && isActive == true][0] {
  ${CATEGORY_QUERY}
}`;

// Product count by category
export const PRODUCT_COUNT_BY_CATEGORY_QUERY = `*[_type == "product" && isActive == true && category._ref == $categoryId] | length`;

// Banner query
const BANNER_QUERY = `
  _id,
  _type,
  title,
  description,
  ctaLink,
  ctaText,
  index,
  isActive,
  mediaType,
  backgroundImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  backgroundVideo {
    asset-> {
      _id,
      url
    }
  },
  videoUrl,
  videoPoster {
    asset-> {
      _id,
      url
    },
    alt
  },
  videoSettings {
    autoplay,
    loop,
    muted,
    showControls
  }
`;

// All banners query (ordered by index)
export const ALL_BANNERS_QUERY = `*[_type == "banner" && isActive == true] | order(index asc) {
  ${BANNER_QUERY}
}`;

// Announcement query
const ANNOUNCEMENT_QUERY = `
  _id,
  _type,
  message,
  link,
  linkText,
  isActive,
  dismissible
`;

// Active announcement query (get the first active one)
export const ACTIVE_ANNOUNCEMENT_QUERY = `*[_type == "announcement" && isActive == true] | order(_createdAt desc) [0] {
  ${ANNOUNCEMENT_QUERY}
}`;

// Homepage data query (categories + featured products)
export const HOMEPAGE_DATA_QUERY = `{
  "categories": *[_type == "category" && isActive == true] | order(sortOrder asc, name asc) [0...6] {
    ${CATEGORY_QUERY}
  },
  "featuredProducts": *[_type == "product" && isActive == true && isFeatured == true] | order(name asc) [0...8] {
    ${PRODUCT_LISTING_QUERY}
  },
  "newArrivals": *[_type == "product" && isActive == true && isNewArrival == true] | order(_createdAt desc) [0...8] {
    ${PRODUCT_LISTING_QUERY}
  }
}`;

// ==========================================
// BLOG POST QUERIES
// ==========================================

// Base blog post query with all fields (full content for detail page)
const BLOG_POST_QUERY = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  category,
  tags,
  publishedAt,
  readTime,
  isPublished,

  // Author (EEAT)
  author,
  authorRole,
  authorImage {
    asset-> {
      _id,
      url
    }
  },

  // Basic SEO fields
  seoTitle,
  seoDescription,
  seoKeywords,

  // 2026 AI & EEAT fields
  llmSummary,
  expertTip,
  faqs[] {
    question,
    answer
  },
  videoUrl,
  canonicalUrl,

  // Related content
  relatedProducts[]-> {
    _id,
    name,
    slug,
    basePrice,
    mainImage {
      asset-> {
        url
      }
    }
  },
  sources[] {
    title,
    url
  }
`;

// Simplified blog post query for listings
const BLOG_POST_LISTING_QUERY = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  featuredImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  category,
  publishedAt,
  readTime,
  author,
  authorRole
`;

// All published blog posts (for listing page)
export const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
  ${BLOG_POST_LISTING_QUERY}
}`;

// Single blog post by slug
export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
  ${BLOG_POST_QUERY}
}`;

// Blog posts by category
export const BLOG_POSTS_BY_CATEGORY_QUERY = `*[_type == "blogPost" && isPublished == true && category == $category] | order(publishedAt desc) {
  ${BLOG_POST_LISTING_QUERY}
}`;

// Related blog posts (same category, excluding current post)
export const RELATED_BLOG_POSTS_QUERY = `*[_type == "blogPost" && isPublished == true && category == $category && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
  ${BLOG_POST_LISTING_QUERY}
}`;

// Recent blog posts (for homepage or sidebar)
export const RECENT_BLOG_POSTS_QUERY = `*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) [0...$limit] {
  ${BLOG_POST_LISTING_QUERY}
}`;

// Blog post slugs (for static generation)
export const BLOG_POST_SLUGS_QUERY = `*[_type == "blogPost" && isPublished == true] {
  "slug": slug.current,
  publishedAt
}`;

// ==========================================
// BUYING GUIDE QUERIES
// ==========================================

// Base guide query with all fields (full content for detail page)
const GUIDE_QUERY = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  featuredImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  category,
  topics,
  readTime,
  isPublished,
  publishedAt,
  lastUpdated,

  // Author (EEAT)
  author,
  authorRole,
  authorImage {
    asset-> {
      _id,
      url
    }
  },

  // Basic SEO fields
  seoTitle,
  seoDescription,
  seoKeywords,

  // 2026 AI & EEAT fields
  llmSummary,
  expertTip,
  faqs[] {
    question,
    answer
  },
  videoUrl,
  canonicalUrl,

  // Related content
  relatedProducts[]-> {
    _id,
    name,
    slug,
    basePrice,
    mainImage {
      asset-> {
        url
      }
    }
  },
  relatedCategories[]-> {
    _id,
    name,
    slug
  },
  relatedGuides[]-> {
    _id,
    title,
    slug,
    category,
    readTime,
    excerpt,
    featuredImage {
      asset-> {
        url
      },
      alt
    }
  },
  sources[] {
    title,
    url
  }
`;

// Simplified guide query for listings
const GUIDE_LISTING_QUERY = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  featuredImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  category,
  topics,
  readTime,
  publishedAt,
  lastUpdated,
  author,
  authorRole
`;

// All published guides (for listing page)
export const ALL_GUIDES_QUERY = `*[_type == "guide" && isPublished == true] | order(publishedAt desc) {
  ${GUIDE_LISTING_QUERY}
}`;

// Single guide by slug
export const GUIDE_BY_SLUG_QUERY = `*[_type == "guide" && slug.current == $slug && isPublished == true][0] {
  ${GUIDE_QUERY}
}`;

// Guides by category
export const GUIDES_BY_CATEGORY_QUERY = `*[_type == "guide" && isPublished == true && category == $category] | order(publishedAt desc) {
  ${GUIDE_LISTING_QUERY}
}`;

// Related guides (same category, excluding current guide)
export const RELATED_GUIDES_QUERY = `*[_type == "guide" && isPublished == true && category == $category && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
  ${GUIDE_LISTING_QUERY}
}`;

// Guide slugs (for static generation)
export const GUIDE_SLUGS_QUERY = `*[_type == "guide" && isPublished == true] {
  "slug": slug.current,
  publishedAt,
  lastUpdated
}`;

// ==========================================
// SPECIAL OFFER QUERIES
// ==========================================

// Base special offer query with full product data
const SPECIAL_OFFER_QUERY = `
  _id,
  _type,
  title,
  "slug": slug.current,
  product-> {
    ${PRODUCT_LISTING_QUERY}
  },
  targetedVariants,
  deliveryCharge,
  badgeText,
  badgeColor,
  shortDescription,
  startDate,
  endDate,
  isActive,
  isFeatured,
  sortOrder
`;

// Active special offers (for homepage)
export const ACTIVE_SPECIAL_OFFERS_QUERY = `*[_type == "specialOffer" && isActive == true && isFeatured == true] | order(sortOrder asc, _createdAt desc) {
  ${SPECIAL_OFFER_QUERY}
}`;

// Single special offer by slug
export const SPECIAL_OFFER_BY_SLUG_QUERY = `*[_type == "specialOffer" && slug.current == $slug][0] {
  ${SPECIAL_OFFER_QUERY}
}`;

// Special offer by product ID (check if product has active offer)
export const SPECIAL_OFFER_BY_PRODUCT_QUERY = `*[_type == "specialOffer" && isActive == true && product._ref == $productId][0] {
  ${SPECIAL_OFFER_QUERY}
}`;
