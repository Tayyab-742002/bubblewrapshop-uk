import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getAllGuides } from "@/sanity/lib";
import {
  getGuideCategoryLabel,
  formatGuideReadTime,
  type GuideListing,
  type StaticGuide,
} from "@/types/guide";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

export const metadata: Metadata = {
  title:
    "Packaging Buying Guides | Expert Advice for UK Businesses | Bubble Wrap Shop",
  description:
    "Comprehensive buying guides for packaging supplies. Learn how to choose the right bubble wrap, cardboard boxes, packing tape, and protective materials for your UK business.",
  keywords: [
    "packaging buying guides",
    "how to choose packaging",
    "bubble wrap buying guide",
    "cardboard box buying guide",
    "packaging guide UK",
    "packaging selection guide",
    "buying packaging supplies",
  ],
  openGraph: {
    title:
      "Packaging Buying Guides | Expert Advice for UK Businesses | Bubble Wrap Shop",
    description:
      "Comprehensive buying guides for packaging supplies. Learn how to choose the right packaging materials for your business.",
    url: `${siteUrl}/guides`,
  },
  alternates: {
    canonical: `${siteUrl}/guides`,
  },
};

// Static fallback guides (used when no Sanity data available)
const staticGuides: StaticGuide[] = [
  {
    slug: "packaging-boxes-guide",
    title: "Complete Guide to Buying Packaging Boxes",
    excerpt:
      "Everything you need to know about choosing the right cardboard boxes for your business. Size, strength, material, and cost considerations.",
    category: "Boxes",
    readTime: "10 min",
    featuredImage:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Box types and materials",
      "Size selection",
      "Strength ratings",
      "Cost optimization",
    ],
    content: "",
  },
  {
    slug: "bubble-wrap-guide",
    title: "Bubble Wrap Buying Guide",
    excerpt:
      "Complete guide to selecting bubble wrap for your shipping needs. Learn about bubble sizes, thickness, and when to use different types.",
    category: "Protective Materials",
    readTime: "8 min",
    featuredImage:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Bubble sizes explained",
      "Thickness options",
      "When to use bubble wrap",
      "Environmental alternatives",
    ],
    content: "",
  },
  {
    slug: "packing-tape-guide",
    title: "Packing Tape Buying Guide",
    excerpt:
      "How to choose the right packing tape for your boxes. Learn about tape types, strength, and application techniques for secure shipping.",
    category: "Sealing Materials",
    readTime: "6 min",
    featuredImage:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Tape types",
      "Strength ratings",
      "Application methods",
      "Cost efficiency",
    ],
    content: "",
  },
  {
    slug: "protective-packaging-guide",
    title: "Protective Packaging Guide",
    excerpt:
      "Comprehensive guide to protective packaging materials. Learn when to use different materials and how to protect fragile items effectively.",
    category: "Protective Materials",
    readTime: "9 min",
    featuredImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Material types",
      "Protection levels",
      "Cost vs protection",
      "Best practices",
    ],
    content: "",
  },
];

// Normalize static guide to match GuideListing interface
function normalizeStaticGuide(guide: StaticGuide): GuideListing {
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

export default async function GuidesPage() {
  // Fetch guides from Sanity, fall back to static data
  const sanityGuides = await getAllGuides();
  const guides: GuideListing[] =
    sanityGuides && sanityGuides.length > 0
      ? sanityGuides
      : staticGuides.map(normalizeStaticGuide);

  // Get unique categories
  const uniqueCategories = Array.from(new Set(guides.map((guide) => guide.category)));
  const categories = ["All", ...uniqueCategories.map(getGuideCategoryLabel)];

  // Featured guide (first one)
  const featuredGuide = guides[0];
  const otherGuides = guides.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-4">
          <Breadcrumbs items={[{ label: "Buying Guides", href: "/guides" }]} />
        </div>
      </div>

      {/* Header */}
      <header className="py-16 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-emerald-600 font-medium mb-4 tracking-wide uppercase text-sm">
              Expert Resources
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Buying Guides
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive guides to help you choose the right packaging
              supplies for your business. Expert advice backed by industry
              experience.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-10">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Guide */}
      {featuredGuide && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Link href={`/guides/${featuredGuide.slug}`} className="group block">
              <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={featuredGuide.featuredImage}
                    alt={featuredGuide.featuredImageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                      {getGuideCategoryLabel(featuredGuide.category)}
                    </span>
                    <span className="text-sm text-gray-500">Featured Guide</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                    {featuredGuide.title}
                  </h2>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredGuide.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatGuideReadTime(featuredGuide.readTime)} read</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span>{featuredGuide.topics.length} topics covered</span>
                  </div>

                  {/* Topics Preview */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredGuide.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                    Read guide
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <hr className="border-gray-100" />
      </div>

      {/* Other Guides */}
      {otherGuides.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              More Guides
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherGuides.map((guide, index) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="group"
                >
                  <article className="h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-5">
                      <Image
                        src={guide.featuredImage}
                        alt={guide.featuredImageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-emerald-600">
                        {getGuideCategoryLabel(guide.category)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {formatGuideReadTime(guide.readTime)} read
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
                      {guide.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {guide.excerpt}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5">
                      {guide.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need packaging advice?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team of experts is ready to help you find the perfect
              packaging solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Contact us
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Browse products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
