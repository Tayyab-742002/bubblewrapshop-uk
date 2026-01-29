import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductGrid } from "@/components/products/product-grid";
import { Category } from "@/types/category";
import {
  ChevronRight,
  Truck,
  BadgePercent,
  ShieldCheck,
  Package,
  Phone,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const revalidate = false;

const siteUrl = "https://bubblewrapshop.co.uk";

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return (
    categories?.map((category: Category) => ({
      slug: category.slug,
    })) || []
  );
}

// Dynamic metadata based on category
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Bubble Wrap Shop",
    };
  }

  // Generate display name for fallback
  const displayName = category.name;

  // Use custom SEO fields from Sanity, or generate defaults
  const seoTitle =
    category.seoTitle ||
    `${displayName} UK | Buy Online | Bubble Wrap Shop`;

  const seoDescription =
    category.seoDescription ||
    `Buy ${displayName.toLowerCase()} online UK. Premium packaging supplies with wholesale pricing. Next-day delivery from Blackburn to Manchester, London & UK-wide.`;

  const pageUrl = `${siteUrl}/categories/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      type: "website",
      title: seoTitle,
      description: seoDescription,
      url: pageUrl,
      siteName: "Bubble Wrap Shop",
      images: category.image
        ? [{ url: category.image, alt: category.imageAlt || displayName }]
        : [`${siteUrl}/og-image.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: category.image ? [category.image] : [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch category, products, and all categories in parallel
  const [category, products, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
    getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  // Get other categories for "Explore More" section (exclude current)
  const otherCategories = allCategories?.filter(
    (c: Category) => c.slug !== slug
  ).slice(0, 4) || [];

  // CollectionPage structured data
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description:
      category.description ||
      `Browse our range of ${category.name} packaging supplies. Wholesale pricing available. Next day delivery across the UK.`,
    url: `${siteUrl}/categories/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Bubble Wrap Shop",
      url: siteUrl,
    },
    provider: {
      "@type": "Organization",
      name: "Bubble Wrap Shop",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products?.length || 0,
      itemListElement:
        products?.slice(0, 10).map((product: { name: string; slug: string; image?: string; basePrice: number }, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            url: `${siteUrl}/products/${product.slug}`,
            image: product.image,
            offers: {
              "@type": "Offer",
              priceCurrency: "GBP",
              price: product.basePrice,
              availability: "https://schema.org/InStock",
            },
          },
        })) || [],
    },
  };

  // BreadcrumbList structured data
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
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${siteUrl}/categories/${slug}`,
      },
    ],
  };

  // Category-specific benefits
  const categoryBenefits = [
    {
      icon: Truck,
      title: "Next-Day Delivery",
      description: "Order before 2pm for next-day UK delivery",
    },
    {
      icon: BadgePercent,
      title: "Wholesale Pricing",
      description: "Bulk discounts automatically applied",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description: "Premium materials, rigorously tested",
    },
    {
      icon: Package,
      title: "Trade Accounts",
      description: "Special rates for business customers",
    },
  ];

  // FAQ items (can be made dynamic per category later)
  const faqItems = [
    {
      question: `What ${category.name.toLowerCase()} sizes do you offer?`,
      answer: `We stock a comprehensive range of ${category.name.toLowerCase()} in various sizes to suit all packaging needs. Browse our selection above to find the perfect fit for your requirements.`,
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! Volume discounts are automatically applied at checkout. The more you order, the more you save. Trade accounts get additional discounts.",
    },
    {
      question: "How quickly can I receive my order?",
      answer: "Orders placed before 2pm Monday-Friday are dispatched same day for next-day delivery across mainland UK. Express and Saturday delivery options available.",
    },
    {
      question: "Can I get samples before ordering?",
      answer: "Yes, we offer sample packs for most products. Contact our team to request samples or discuss your specific requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          {/* Breadcrumbs */}
          <div className="py-4">
            <Breadcrumbs
              items={[
                { label: "Categories", href: "/categories" },
                { label: category.name, href: `/categories/${slug}` },
              ]}
              variant="light"
            />
          </div>

          {/* Hero Content */}
          <div className="py-10 md:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                  <Package className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{products?.length || 0} Products Available</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                  {category.name}
                </h1>

                {category.description && (
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
                    {category.description}
                  </p>
                )}

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    <span className="text-sm font-medium">Next-Day Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgePercent className="w-5 h-5" />
                    <span className="text-sm font-medium">Wholesale Prices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm font-medium">Quality Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Category Image */}
              {category.image && (
                <div className="w-full max-w-sm lg:max-w-md shrink-0">
                  <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <Image
                      src={category.image}
                      alt={category.imageAlt || category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {categoryBenefits.map((benefit, index) => (
              <div key={index} className="py-4 md:py-5 px-4 text-center">
                <benefit.icon className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <p className="font-semibold text-sm text-foreground">{benefit.title}</p>
                <p className="text-xs text-muted-foreground hidden md:block mt-0.5">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 scroll-mt-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Shop {category.name}
            </h2>
            <p className="text-muted-foreground mt-1">
              Premium quality products with wholesale pricing
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-16 bg-secondary/30 rounded-2xl">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-4">
              No products found in this category.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Browse all products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Choose Bubble Wrap Shop?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Family-run packaging supplier in Blackburn, delivering quality products across the UK since day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fast UK Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Next-day delivery on orders placed before 2pm. We ship from Blackburn to all UK postcodes.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <BadgePercent className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Wholesale Prices</h3>
              <p className="text-sm text-muted-foreground">
                Competitive trade pricing with automatic bulk discounts. The more you buy, the more you save.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Premium packaging materials tested for durability. Not satisfied? We&apos;ll make it right.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Expert Support</h3>
              <p className="text-sm text-muted-foreground">
                Friendly UK-based team ready to help. Call us for advice on the best products for your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers about our {category.name.toLowerCase()} products
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <details
                key={index}
                className="group bg-secondary/30 rounded-xl border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground hover:bg-secondary/50 transition-colors">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Explore More Categories */}
      {otherCategories.length > 0 && (
        <div className="py-16 md:py-20 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header with View All link for desktop */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Explore More Categories
                </h2>
                <p className="text-muted-foreground">
                  Discover our full range of packaging solutions
                </p>
              </div>
              <Link
                href="/categories"
                className="hidden md:inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors shrink-0"
              >
                View All Categories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {otherCategories.map((cat: Category) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border hover:border-emerald-300 transition-all hover:shadow-lg"
                >
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.imageAlt || cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg group-hover:text-emerald-200 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-white/80 text-sm mt-1 group-hover:text-white transition-colors">
                      Browse Products
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Categories CTA Button - visible on all devices */}
            <div className="mt-10 text-center">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                View All Categories
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Order before 2pm for next-day delivery</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need {category.name} in Bulk?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get special wholesale rates for large orders. Our team is ready to help you find the perfect packaging solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/b2b-request"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Request Trade Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>No minimum order</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Volume discounts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Dedicated account manager</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
