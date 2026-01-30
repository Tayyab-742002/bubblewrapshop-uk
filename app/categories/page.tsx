import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories, getAllBlogPosts, getAllGuides } from "@/sanity/lib";
import { Breadcrumbs, ContentCarousel } from "@/components/common";
import { Category } from "@/types/category";
import { ChevronRight, Truck, BadgePercent, Package, MapPin } from "lucide-react";

export const revalidate = false;

const siteUrl = "https://bubblewrapshop.co.uk";

// 2026 SEO: Include Blackburn location, transactional intent, and trust signals
export const metadata: Metadata = {
  title: "Packaging Categories UK | Buy from Blackburn | Bubble Wrap Shop",
  description:
    "Browse all packaging supply categories from our Blackburn warehouse. Bubble wrap, mailing bags, boxes, tape & more. Wholesale pricing, next-day UK delivery. Family-run since 2015.",
  keywords: [
    "packaging categories UK",
    "packaging supplies Blackburn",
    "bubble wrap categories",
    "wholesale packaging UK",
    "buy packaging online",
    "packaging materials UK",
    "next day packaging delivery",
  ],
  openGraph: {
    title: "Packaging Categories | Wholesale from Blackburn | Bubble Wrap Shop",
    description:
      "Browse all packaging categories. Bubble wrap, boxes, mailing bags & more from our Blackburn warehouse. Wholesale pricing, next-day UK delivery.",
    url: `${siteUrl}/categories`,
    siteName: "Bubble Wrap Shop",
    images: [`${siteUrl}/og-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Categories | Wholesale from Blackburn | Bubble Wrap Shop",
    description:
      "Browse all packaging categories from Blackburn. Wholesale pricing with next-day UK delivery.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/categories`,
  },
};

export default async function CategoriesPage() {
  const [categories, blogPosts, guides] = await Promise.all([
    getAllCategories(),
    getAllBlogPosts(),
    getAllGuides(),
  ]);

  // Transform data for carousel
  const carouselBlogs = (blogPosts || []).slice(0, 3).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    category: post.category,
    readTime: post.readTime,
    type: "blog" as const,
  }));

  const carouselGuides = (guides || []).slice(0, 3).map((guide) => ({
    id: guide.id,
    title: guide.title,
    slug: guide.slug,
    excerpt: guide.excerpt,
    featuredImage: guide.featuredImage,
    category: typeof guide.category === "string" ? guide.category : "",
    readTime: guide.readTime,
    type: "guide" as const,
  }));

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
        name: "Categories",
        item: `${siteUrl}/categories`,
      },
    ],
  };

  // ItemList structured data with LocalBusiness provider
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Packaging Supply Categories - Wholesale UK",
    description:
      "Browse all packaging supply categories from Bubble Wrap Shop. Wholesale pricing from our Blackburn warehouse with next-day UK delivery.",
    url: `${siteUrl}/categories`,
    numberOfItems: categories?.length || 0,
    // 2026 SEO: Add LocalBusiness provider for local SEO boost
    provider: {
      "@type": "LocalBusiness",
      name: "Bubble Wrap Shop",
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
    },
    itemListElement:
      categories?.map((category: Category, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `${siteUrl}/categories/${category.slug}`,
        description: category.description || category.llmSummary,
        image: category.image,
      })) || [],
  };

  // Trust signals for EEAT
  const trustSignals = [
    { icon: MapPin, text: "Ships from Blackburn" },
    { icon: Truck, text: "Next-Day UK Delivery" },
    { icon: BadgePercent, text: "Wholesale Prices" },
    { icon: Package, text: `${categories?.length || 0} Categories` },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data (JSON-LD) - 2026 SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListStructuredData),
        }}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3">
          <Breadcrumbs items={[{ label: "Categories", href: "/categories" }]} />
        </div>
      </div>

      {/* Header - 2026 SEO: Keyword-optimized H1 with location context */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 md:py-14">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Packaging Categories - Wholesale UK
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Browse our complete range of packaging supplies from our Blackburn warehouse.
            Wholesale pricing for businesses, next-day delivery UK-wide. Family-run since 2015.
          </p>

          {/* Trust Signals Bar */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6">
            {trustSignals.map((signal, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <signal.icon className="w-4 h-4 text-emerald-600" />
                <span>{signal.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                {/* Category Image */}
                <div className="aspect-[4/3] relative overflow-hidden bg-secondary/50">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.imageAlt || category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                      <span className="text-4xl text-muted-foreground/30">
                        📦
                      </span>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Category Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-sm text-white/80 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-sm font-medium text-white/90 mt-3 group-hover:text-primary-foreground transition-colors">
                    <span>Browse Products</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No categories found.</p>
          </div>
        )}
      </div>

      {/* Resources Carousel */}
      {(carouselBlogs.length > 0 || carouselGuides.length > 0) && (
        <ContentCarousel
          blogs={carouselBlogs}
          guides={carouselGuides}
          title="Packaging Resources"
          subtitle="Expert guides and tips to help choose the right packaging"
        />
      )}
    </div>
  );
}
