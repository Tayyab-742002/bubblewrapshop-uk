import type { Metadata } from "next";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSort } from "@/components/products/product-sort";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductGridWrapper } from "@/components/products/product-grid-wrapper";
import { getAllCategories, getCategoryBySlug } from "@/sanity/lib";
import { MapPin, Truck, BadgePercent, Star } from "lucide-react";

// Revalidation strategy: On-demand revalidation via Sanity webhooks
// Pages will only revalidate when content changes in Sanity CMS
// For development, use `npm run dev` which has hot reloading
export const revalidate = false;

const siteUrl = "https://www.bubblewrapshop.co.uk";

// Default metadata for /products page (no category filter)
// 2026 SEO: Include location (Blackburn), transactional intent, and trust signals
const defaultMetadata = {
  title: "Packaging Supplies UK | Wholesale from Blackburn | Bubble Wrap Shop",
  description:
    "Buy packaging supplies online from our Blackburn warehouse. Bubble wrap, cardboard boxes, mailing bags & tape. Wholesale pricing, next-day UK delivery. Family-run since 2015.",
  keywords: [
    "packaging supplies UK",
    "bubble wrap Blackburn",
    "wholesale packaging UK",
    "cardboard boxes UK",
    "mailing bags UK",
    "packing tape UK",
    "shipping supplies UK",
    "buy packaging online UK",
    "next day packaging delivery",
  ],
};

/**
 * Dynamic Metadata for Products Page
 * Generates unique SEO meta tags based on category filter
 * This helps each category URL (/products?category=bubble-wrap) rank separately
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const categorySlug = sp.category;

  // If no category, return default metadata
  if (!categorySlug) {
    return {
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      keywords: defaultMetadata.keywords,
      openGraph: {
        type: "website",
        title: defaultMetadata.title,
        description: defaultMetadata.description,
        url: `${siteUrl}/products`,
        siteName: "Bubble Wrap Shop",
        images: [`${siteUrl}/og-image.jpg`],
      },
      twitter: {
        card: "summary_large_image",
        title: defaultMetadata.title,
        description: defaultMetadata.description,
        images: [`${siteUrl}/og-image.jpg`],
      },
      alternates: {
        canonical: `${siteUrl}/products`,
      },
    };
  }

  // Fetch category data with SEO fields
  const category = await getCategoryBySlug(categorySlug);

  // Generate display name for fallback
  const categoryDisplayName = categorySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Use custom SEO fields from Sanity, or generate defaults
  const seoTitle =
    category?.seoTitle ||
    `${categoryDisplayName} UK | Buy Online | Bubble Wrap Shop`;

  const seoDescription =
    category?.seoDescription ||
    `Buy ${categoryDisplayName.toLowerCase()} online UK. Premium packaging supplies with wholesale pricing. Fast delivery across the UK. Order today!`;

  const seoKeywords = category?.seoKeywords?.length
    ? category.seoKeywords
    : [
        `${categoryDisplayName.toLowerCase()} UK`,
        `buy ${categoryDisplayName.toLowerCase()} online`,
        categoryDisplayName.toLowerCase(),
        "packaging supplies UK",
        "wholesale packaging",
      ];

  // Canonical should point to dedicated category page to avoid duplicate content
  const canonicalUrl = `${siteUrl}/categories/${categorySlug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      type: "website",
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: "Bubble Wrap Shop",
      images: category?.image
        ? [{ url: category.image, alt: category.imageAlt }]
        : [`${siteUrl}/og-image.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: category?.image ? [category.image] : [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    size?: string;
    material?: string;
    ecoFriendly?: string;
    priceMin?: string;
    priceMax?: string;
    sort?: string;
  }>;
}) {
  // Fetch categories in parallel with searchParams
  const [sp, categoriesList] = await Promise.all([
    searchParams,
    getAllCategories(),
  ]);

  // Build category options for client filters to ensure exact matching to slugs
  const categoryOptions = (categoriesList || []).map(
    (c: { slug: string; name: string }) => ({
      value: c.slug,
      label: c.name,
    }),
  );

  const category = sp.category;
  const categoryDisplayName = category
    ? category
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : null;

  const searchQuery = sp.search?.trim();
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";
  const pageUrl = `${siteUrl}/products`;

  // Trust signals for EEAT
  const trustSignals = [
    { icon: MapPin, text: "Ships from Blackburn" },
    { icon: Truck, text: "Next-Day UK Delivery" },
    { icon: BadgePercent, text: "Wholesale Prices" },
    { icon: Star, text: "5-Star Rated" },
  ];

  // BreadcrumbList schema for rich snippets
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteUrl}/products`,
      },
      ...(categoryDisplayName && category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: categoryDisplayName,
              item: `${siteUrl}/categories/${category}`,
            },
          ]
        : []),
    ],
  };

  // CollectionPage structured data with LocalBusiness seller context
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryDisplayName
      ? `${categoryDisplayName} - Packaging Supplies UK`
      : "All Packaging Supplies UK",
    description: category
      ? `Buy ${categoryDisplayName?.toLowerCase()} online from Blackburn. Wholesale pricing, next-day UK delivery. Trusted packaging supplier since 2015.`
      : "Browse our complete catalog of packaging supplies. Bubble wrap, cardboard boxes, mailing bags, and protective packaging shipped from Blackburn warehouse.",
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Bubble Wrap Shop",
      url: siteUrl,
    },
    // 2026 SEO: Add LocalBusiness seller context for local SEO boost
    provider: {
      "@type": "LocalBusiness",
      name: "Bubble Wrap Shop",
      image: [
        `${siteUrl}/logo.jpg`,
      ],
      url: siteUrl,
      telephone: "+44-7728-342335",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit BR16 Blakewater Road",
        addressLocality: "Blackburn",
        addressRegion: "Lancashire",
        postalCode: "BB1 5QF",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "53.7488",
        longitude: "-2.4883",
      },
      priceRange: "££",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
    },
    // Offer catalog for product discovery
    mainEntity: {
      "@type": "OfferCatalog",
      name: categoryDisplayName || "Packaging Supplies",
      itemListOrder: "https://schema.org/ItemListUnordered",
    },
  };

  // Count active filters for display
  const activeFilterCount = [
    sp.category,
    sp.size,
    sp.material,
    sp.ecoFriendly,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />

      {/* Breadcrumbs - Minimal */}
      <div className="border-b border-border/30 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-3">
          <Breadcrumbs
            items={[
              { label: "Products", href: "/products" },
              ...(categoryDisplayName && category
                ? [
                    {
                      label: categoryDisplayName,
                      href: `/categories/${category}`,
                    },
                  ]
                : []),
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-8 md:py-12">
        {/* Header Section - 2026 SEO: Descriptive H1 with location context */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : categoryDisplayName
                    ? `${categoryDisplayName} - Buy Online UK`
                    : "Packaging Supplies - Wholesale UK"}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
                {searchQuery
                  ? "Browse products matching your search from our Blackburn warehouse"
                  : categoryDisplayName
                    ? `Quality ${categoryDisplayName.toLowerCase()} shipped same-day from Blackburn. Wholesale pricing for businesses, next-day delivery UK-wide.`
                    : "Premium packaging materials from our Blackburn warehouse. Bubble wrap, boxes, mailing bags & more. Family-run business with next-day UK delivery."}
              </p>

              {/* Trust Signals Bar */}
              <div className="flex flex-wrap gap-4 md:gap-6 mt-4">
                {trustSignals.map((signal, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground"
                  >
                    <signal.icon className="w-4 h-4 text-emerald-600" />
                    <span>{signal.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort & Filter Summary */}
            <div className="flex items-center gap-4">
              {activeFilterCount > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}{" "}
                  active
                </span>
              )}
              <ProductSort currentSort={sp.sort || "newest"} />
            </div>
          </div>
        </div>

        {/* Filters and Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-[260px] shrink-0">
            <ProductFilters categories={categoryOptions} />
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <ProductGridWrapper searchParams={sp} />
          </div>
        </div>
      </div>
    </div>
  );
}
