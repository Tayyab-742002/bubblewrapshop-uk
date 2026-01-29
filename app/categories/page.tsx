import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/sanity/lib";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Category } from "@/types/category";
import { ChevronRight } from "lucide-react";

export const revalidate = false;

const siteUrl = "https://bubblewrapshop.co.uk";

export const metadata: Metadata = {
  title: "Packaging Categories UK | Browse All Products | Bubble Wrap Shop",
  description:
    "Browse all packaging supply categories. Bubble wrap, mailing bags, cardboard boxes, packing tape & more. Wholesale pricing with next-day delivery from Blackburn to UK-wide.",
  openGraph: {
    title: "Packaging Categories | Bubble Wrap Shop",
    description:
      "Browse all packaging supply categories. Wholesale pricing with next-day UK delivery.",
    url: `${siteUrl}/categories`,
    siteName: "Bubble Wrap Shop",
    images: [`${siteUrl}/og-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Categories | Bubble Wrap Shop",
    description:
      "Browse all packaging supply categories. Wholesale pricing with next-day UK delivery.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/categories`,
  },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  // ItemList structured data for category listing
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Packaging Supply Categories",
    description: "Browse all packaging supply categories at Bubble Wrap Shop",
    url: `${siteUrl}/categories`,
    numberOfItems: categories?.length || 0,
    itemListElement:
      categories?.map((category: Category, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `${siteUrl}/categories/${category.slug}`,
        description: category.description,
        image: category.image,
      })) || [],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
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

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 md:py-14">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Shop by Category
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Browse our complete range of packaging supplies. Wholesale pricing
            available with next-day delivery across the UK.
          </p>
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
    </div>
  );
}
