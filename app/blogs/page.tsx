import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common";
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getAllBlogPosts } from "@/sanity/lib";
import {
  getCategoryLabel,
  formatReadTime,
  formatBlogDate,
  type BlogPostListing,
  type StaticBlogPost,
} from "@/types/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

export const metadata: Metadata = {
  title:
    "Packaging Blog & Guides | Tips, News & Buying Guides | Bubble Wrap Shop",
  description:
    "Expert packaging tips, buying guides, and industry news. Learn how to choose the right packaging supplies, protect your products, and save money. UK packaging advice from industry experts.",
  keywords: [
    "packaging blog",
    "packaging tips",
    "packaging guides",
    "buying guides packaging",
    "packaging advice UK",
    "packaging industry news",
    "how to choose packaging",
    "packaging best practices",
  ],
  openGraph: {
    title:
      "Packaging Blog & Guides | Tips, News & Buying Guides | Bubble Wrap Shop",
    description:
      "Expert packaging tips, buying guides, and industry news. Learn how to choose the right packaging supplies and protect your products.",
    url: `${siteUrl}/blogs`,
  },
  alternates: {
    canonical: `${siteUrl}/blogs`,
  },
};

// Static fallback blog posts (used when no Sanity data available)
const staticBlogPosts: StaticBlogPost[] = [
  {
    slug: "how-to-choose-the-right-packaging-box",
    title: "How to Choose the Right Packaging Box",
    excerpt:
      "Learn how to select the perfect cardboard box for your shipping needs. Size, strength, and material considerations for UK businesses.",
    category: "Buying Guides",
    publishedAt: "2024-12-15",
    readTime: "8 min",
    featuredImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    slug: "bubble-wrap-vs-foam-which-is-better",
    title: "Bubble Wrap vs Foam: Which is Better?",
    excerpt:
      "Compare bubble wrap and foam packaging materials. Discover which option offers better protection and cost-effectiveness.",
    category: "Product Guides",
    publishedAt: "2024-12-10",
    readTime: "6 min",
    featuredImage:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=800&q=80",
  },
  {
    slug: "packaging-tips-for-fragile-items",
    title: "10 Tips for Packaging Fragile Items",
    excerpt:
      "Expert tips for packaging fragile items safely. Learn proper wrapping techniques and padding methods to prevent damage.",
    category: "Packaging Tips",
    publishedAt: "2024-12-05",
    readTime: "7 min",
    featuredImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
  {
    slug: "eco-friendly-packaging-alternatives",
    title: "Eco-Friendly Packaging Alternatives",
    excerpt:
      "Discover sustainable packaging materials that reduce environmental impact. Recyclable and biodegradable options for UK businesses.",
    category: "Sustainability",
    publishedAt: "2024-11-28",
    readTime: "9 min",
    featuredImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
  {
    slug: "how-to-calculate-packaging-costs",
    title: "How to Calculate Packaging Costs",
    excerpt:
      "Learn how to calculate and reduce your packaging costs. Understand bulk pricing and strategies to optimize your budget.",
    category: "Business",
    publishedAt: "2024-11-20",
    readTime: "5 min",
    featuredImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    slug: "cardboard-box-sizes-guide",
    title: "Complete Guide to Cardboard Box Sizes",
    excerpt:
      "Complete guide to UK cardboard box sizes. Learn standard dimensions and how to choose the right box for efficient shipping.",
    category: "Buying Guides",
    publishedAt: "2024-11-15",
    readTime: "6 min",
    featuredImage:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
  },
];

// Normalize static posts to match BlogPostListing interface
function normalizeStaticPost(post: StaticBlogPost): BlogPostListing {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    featuredImageAlt: `${post.title} - packaging blog article`,
    category: post.category.toLowerCase().replace(/ /g, "-"),
    publishedAt: post.publishedAt,
    readTime: parseInt(post.readTime) || 5,
    author: "Bubble Wrap Shop Team",
  };
}

export default async function BlogPage() {
  // Fetch blog posts from Sanity, fall back to static data
  const sanityPosts = await getAllBlogPosts();
  const posts: BlogPostListing[] =
    sanityPosts && sanityPosts.length > 0
      ? sanityPosts
      : staticBlogPosts.map(normalizeStaticPost);

  // Get unique categories
  const uniqueCategories = Array.from(new Set(posts.map((post) => post.category)));
  const categories = ["All", ...uniqueCategories.map(getCategoryLabel)];

  // Featured post (first one)
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-4">
          <Breadcrumbs items={[{ label: "Blog", href: "/blogs" }]} />
        </div>
      </div>

      {/* Header */}
      <header className="py-16 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-emerald-600 font-medium mb-4 tracking-wide uppercase text-sm">
              Packaging Insights
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Blog & Guides
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Expert tips, buying guides, and industry insights to help you make
              better packaging decisions for your business.
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

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Link href={`/blogs/${featuredPost.slug}`} className="group block">
              <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.featuredImageAlt}
                    fill
                    title={featuredPost.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                      {getCategoryLabel(featuredPost.category)}
                    </span>
                    <span className="text-sm text-gray-500">Featured</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={featuredPost.publishedAt}>
                        {formatBlogDate(featuredPost.publishedAt)}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{formatReadTime(featuredPost.readTime)} read</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                    Read article
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

      {/* Blog Posts Grid */}
      {otherPosts.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              Latest Articles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group"
                >
                  <article className="h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-5">
                      <Image
                        src={post.featuredImage}
                        alt={post.featuredImageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-emerald-600">
                        {getCategoryLabel(post.category)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {formatReadTime(post.readTime)} read
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <time
                      dateTime={post.publishedAt}
                      className="text-xs text-gray-400"
                    >
                      {formatBlogDate(post.publishedAt)}
                    </time>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
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
