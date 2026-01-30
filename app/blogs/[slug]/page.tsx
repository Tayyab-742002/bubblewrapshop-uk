import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  User,
} from "lucide-react";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getBlogPostSlugs,
} from "@/sanity/lib";
import {
  getCategoryLabel,
  formatReadTime,
  type BlogPost,
  type StaticBlogPost,
} from "@/types/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://bubblewrapshop.co.uk";

// Static fallback blog posts (used when no Sanity data available)
const staticBlogPosts: Record<
  string,
  StaticBlogPost & {
    content: string;
    tags: string[];
    author: string;
    seoTitle?: string;
    seoDescription?: string;
  }
> = {
  "how-to-choose-the-right-packaging-box": {
    slug: "how-to-choose-the-right-packaging-box",
    title: "How to Choose the Right Packaging Box",
    excerpt:
      "Learn how to select the perfect cardboard box for your shipping needs. Size, strength, and material considerations for UK businesses.",
    category: "Buying Guides",
    publishedAt: "2024-12-15",
    readTime: "8 min",
    featuredImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    tags: ["packaging boxes", "shipping", "cardboard boxes", "buying guide"],
    author: "Bubble Wrap Shop Team",
    seoTitle:
      "How to Choose the Right Packaging Box UK | Complete Buying Guide 2024",
    seoDescription:
      "Complete guide to choosing the right packaging box in the UK. Learn about box sizes, strength ratings, materials, and cost considerations for your shipping needs.",
    content: `
Choosing the right packaging box is crucial for protecting your products during shipping and ensuring they arrive safely to your customers.

## Understanding Box Types

### Single-Wall Cardboard Boxes

Single-wall boxes are the most common type of packaging box. They consist of one layer of fluted cardboard between two flat liners. These boxes are ideal for:

- Lightweight items (under 20kg)
- Short-distance shipping
- Cost-effective packaging solutions
- Standard retail products

### Double-Wall Cardboard Boxes

Double-wall boxes have two layers of fluted cardboard, providing extra strength and protection. Choose these for:

- Heavy items (20-40kg)
- Fragile products requiring extra protection
- Long-distance shipping
- Valuable items

## Key Factors to Consider

### 1. Box Size

Selecting the correct box size is essential for both protection and cost efficiency. Leave 2-5cm on each dimension for padding.

### 2. Box Strength (ECT Rating)

Edge Crush Test (ECT) rating indicates box strength:

- **32 ECT**: Standard strength for lightweight items
- **44 ECT**: Medium strength for average weight items
- **48 ECT**: High strength for heavy items

## Conclusion

Choosing the right packaging box requires careful consideration of size, strength, material, and cost. By understanding your specific needs, you can select boxes that protect your products while keeping costs manageable.
    `,
  },
  "bubble-wrap-vs-foam-which-is-better": {
    slug: "bubble-wrap-vs-foam-which-is-better",
    title: "Bubble Wrap vs Foam: Which is Better?",
    excerpt:
      "Compare bubble wrap and foam packaging materials. Discover which option offers better protection and cost-effectiveness for your business.",
    category: "Product Guides",
    publishedAt: "2024-12-10",
    readTime: "6 min",
    featuredImage:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=1200&q=80",
    tags: ["bubble wrap", "protective packaging", "foam packaging", "comparison"],
    author: "Bubble Wrap Shop Team",
    seoTitle:
      "Bubble Wrap vs Foam Packaging: Which is Better for UK Businesses?",
    seoDescription:
      "Compare bubble wrap and foam packaging materials. Learn which offers better protection, cost-effectiveness, and environmental benefits for UK shipping needs.",
    content: `
When it comes to protecting fragile items during shipping, two of the most popular options are bubble wrap and foam packaging.

## Understanding Bubble Wrap

Bubble wrap is a flexible plastic material with air-filled bubbles that provide cushioning and shock absorption.

### Advantages of Bubble Wrap

- Lightweight: Reduces overall shipping weight and costs
- Flexible: Conforms to irregular shapes easily
- Reusable: Can be reused multiple times
- Cost-Effective: Generally more affordable than foam

## Understanding Foam Packaging

Foam packaging includes materials like expanded polystyrene (EPS) and polyurethane foam.

### Advantages of Foam Packaging

- Superior Protection: Excellent shock absorption for fragile items
- Moisture Resistance: Certain foams resist water damage
- Customizable: Can be cut to exact shapes

## Conclusion

Both bubble wrap and foam packaging have their place in protective packaging. For most UK businesses, bubble wrap offers an excellent balance of protection, cost, and ease of use.
    `,
  },
  "packaging-tips-for-fragile-items": {
    slug: "packaging-tips-for-fragile-items",
    title: "10 Tips for Packaging Fragile Items",
    excerpt:
      "Expert tips for packaging fragile items safely. Learn proper wrapping techniques and padding methods to prevent damage.",
    category: "Packaging Tips",
    publishedAt: "2024-12-05",
    readTime: "7 min",
    featuredImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    tags: ["fragile items", "packaging tips", "shipping safety", "protection"],
    author: "Bubble Wrap Shop Team",
    seoTitle: "10 Essential Packaging Tips for Fragile Items UK | Shipping Guide",
    seoDescription:
      "Expert tips for packaging fragile items safely in the UK. Learn proper wrapping techniques, box selection, and padding methods to prevent shipping damage.",
    content: `
Shipping fragile items requires careful planning and proper techniques to ensure they arrive safely.

## 1. Choose the Right Box Size

Selecting the correct box size is crucial for fragile items. Leave 5-8cm of space on all sides for padding.

## 2. Use Multiple Layers of Protection

Don't rely on a single layer of protection. Use inner, middle, and outer layers for maximum safety.

## 3. Wrap Items Individually

If shipping multiple fragile items, wrap each item separately and prevent items from touching each other.

## 4. Fill All Empty Spaces

Items should not move when the box is shaken. Fill all voids with appropriate padding materials.

## 5. Label Boxes Correctly

Mark "FRAGILE" on all sides and add "THIS SIDE UP" if applicable.

## Conclusion

Proper packaging of fragile items requires attention to detail and the right materials.
    `,
  },
  "eco-friendly-packaging-alternatives": {
    slug: "eco-friendly-packaging-alternatives",
    title: "Eco-Friendly Packaging Alternatives",
    excerpt:
      "Discover sustainable packaging materials that reduce environmental impact. Recyclable and biodegradable options for UK businesses.",
    category: "Sustainability",
    publishedAt: "2024-11-28",
    readTime: "9 min",
    featuredImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
    tags: ["eco-friendly", "sustainability", "green packaging", "environmental"],
    author: "Bubble Wrap Shop Team",
    seoTitle:
      "Eco-Friendly Packaging Alternatives UK | Sustainable Packaging Guide",
    seoDescription:
      "Discover sustainable packaging solutions for UK businesses. Learn about recyclable, biodegradable, and compostable packaging materials.",
    content: `
As environmental awareness grows, UK businesses are increasingly seeking sustainable packaging solutions.

## Why Choose Eco-Friendly Packaging?

### Environmental Benefits

- Reduced waste going to landfills
- Lower carbon footprint
- Resource conservation
- Biodegradability

### Business Benefits

- Growing customer demand for sustainable products
- Enhanced brand image
- Potential cost savings

## Types of Eco-Friendly Packaging

### Recycled Cardboard Boxes

Made from recycled paper and cardboard. Fully recyclable and widely available.

### Biodegradable Bubble Wrap

Alternative to traditional plastic bubble wrap that breaks down naturally.

## Conclusion

Eco-friendly packaging alternatives offer UK businesses an opportunity to reduce environmental impact while maintaining product protection.
    `,
  },
  "how-to-calculate-packaging-costs": {
    slug: "how-to-calculate-packaging-costs",
    title: "How to Calculate Packaging Costs",
    excerpt:
      "Learn how to calculate and reduce your packaging costs. Understand bulk pricing and strategies to optimize your budget.",
    category: "Business",
    publishedAt: "2024-11-20",
    readTime: "5 min",
    featuredImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    tags: ["packaging costs", "budget", "bulk pricing", "cost savings"],
    author: "Bubble Wrap Shop Team",
    seoTitle:
      "How to Calculate Packaging Costs UK | Save Money on Shipping Supplies",
    seoDescription:
      "Learn how to calculate and reduce packaging costs for UK businesses. Understand bulk pricing, material costs, and strategies to optimize your shipping budget.",
    content: `
Understanding and managing packaging costs is essential for UK businesses looking to optimize their shipping operations.

## Components of Packaging Costs

### Box Costs

- Single-Wall Boxes: £0.20-£1.50 per box
- Double-Wall Boxes: £0.50-£3.00 per box
- Custom Boxes: £1.00-£5.00+ per box

### Protective Materials

- Bubble Wrap: £0.50-£2.00 per square meter
- Foam Padding: £1.00-£3.00 per square meter

## Cost Optimization Strategies

### Bulk Ordering

Ordering in larger quantities reduces per-unit costs significantly.

### Right-Sizing Boxes

Using correctly sized boxes saves money on materials and shipping costs.

## Conclusion

Calculating and optimizing packaging costs requires understanding all components and finding the right balance.
    `,
  },
  "cardboard-box-sizes-guide": {
    slug: "cardboard-box-sizes-guide",
    title: "Complete Guide to Cardboard Box Sizes",
    excerpt:
      "Complete guide to UK cardboard box sizes. Learn standard dimensions and how to choose the right box for efficient shipping.",
    category: "Buying Guides",
    publishedAt: "2024-11-15",
    readTime: "6 min",
    featuredImage:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
    tags: ["cardboard boxes", "box sizes", "shipping boxes", "dimensions"],
    author: "Bubble Wrap Shop Team",
    seoTitle:
      "Cardboard Box Sizes Guide UK | Standard Dimensions & How to Choose",
    seoDescription:
      "Complete guide to UK cardboard box sizes. Learn standard dimensions, how to measure products, and choose the right box size for efficient shipping.",
    content: `
Choosing the right cardboard box size is essential for efficient shipping, cost management, and product protection.

## Understanding Box Dimensions

Cardboard boxes are measured in three dimensions:

- **Length (L)**: The longest side
- **Width (W)**: The shorter side
- **Height (H)**: The vertical dimension

## UK Standard Box Sizes

### Small Boxes

**20cm x 15cm x 10cm** - Best for books, small electronics, jewelry.

**25cm x 20cm x 15cm** - Best for clothing, accessories, small gifts.

### Medium Boxes

**30cm x 25cm x 20cm** - Best for multiple items, medium electronics.

### Large Boxes

**40cm x 35cm x 30cm** - Best for large items, multiple products.

## Conclusion

Selecting the right cardboard box size requires careful measurement and consideration of your product dimensions.
    `,
  },
};

// Custom Portable Text components for Sanity content
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { url?: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?.url) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={value.asset.url}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-bold text-gray-900 mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: { value?: { href?: string; openInNewTab?: boolean }; children?: React.ReactNode }) => {
      const target = value?.openInNewTab ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-emerald-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-4 list-disc pl-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-4 list-decimal pl-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-gray-600">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-gray-600">{children}</li>
    ),
  },
};

// Format static content to HTML
const formatStaticContent = (content: string) => {
  return content
    .trim()
    .split("\n")
    .map((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">${trimmedLine.substring(3)}</h2>`;
      }
      if (trimmedLine.startsWith("### ")) {
        return `<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">${trimmedLine.substring(4)}</h3>`;
      }
      if (trimmedLine.startsWith("- **")) {
        const match = trimmedLine.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return `<li class="text-gray-600 mb-2"><strong class="text-gray-900">${match[1]}</strong>${match[2] ? `: ${match[2]}` : ""}</li>`;
        }
      }
      if (trimmedLine.startsWith("- ")) {
        return `<li class="text-gray-600 mb-2">${trimmedLine.substring(2)}</li>`;
      }
      if (/^\d+\.\s/.test(trimmedLine)) {
        return `<li class="text-gray-600 mb-2">${trimmedLine.replace(/^\d+\.\s/, "")}</li>`;
      }
      if (trimmedLine === "") {
        return "";
      }
      return `<p class="text-gray-600 leading-relaxed mb-4">${trimmedLine}</p>`;
    })
    .filter(Boolean)
    .join("\n");
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try to fetch from Sanity first
  const sanityPost = await getBlogPostBySlug(slug);

  if (sanityPost) {
    const postTitle = sanityPost.seoTitle || sanityPost.title;
    const postDescription = sanityPost.seoDescription || sanityPost.excerpt;
    const postUrl = sanityPost.canonicalUrl || `${siteUrl}/blogs/${slug}`;

    return {
      title: `${postTitle} | Bubble Wrap Shop`,
      description: postDescription,
      keywords: sanityPost.seoKeywords || sanityPost.tags,
      openGraph: {
        title: postTitle,
        description: postDescription,
        url: postUrl,
        type: "article",
        publishedTime: sanityPost.publishedAt,
        authors: [sanityPost.author],
        tags: sanityPost.tags,
        images: sanityPost.featuredImage
          ? [{ url: sanityPost.featuredImage, width: 1200, height: 630, alt: sanityPost.title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: postTitle,
        description: postDescription,
        images: sanityPost.featuredImage ? [sanityPost.featuredImage] : undefined,
      },
      alternates: {
        canonical: postUrl,
      },
    };
  }

  // Fall back to static post
  const staticPost = staticBlogPosts[slug];
  if (!staticPost) {
    return {
      title: "Blog Post Not Found | Bubble Wrap Shop",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  const postTitle = staticPost.seoTitle || staticPost.title;
  const postDescription = staticPost.seoDescription || staticPost.excerpt;
  const postUrl = `${siteUrl}/blogs/${slug}`;

  return {
    title: `${postTitle} | Bubble Wrap Shop`,
    description: postDescription,
    keywords: [...staticPost.tags, "packaging blog", "packaging tips UK"],
    openGraph: {
      title: postTitle,
      description: postDescription,
      url: postUrl,
      type: "article",
      publishedTime: staticPost.publishedAt,
      authors: [staticPost.author],
      tags: staticPost.tags,
      images: [{ url: staticPost.featuredImage, width: 1200, height: 630, alt: staticPost.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
      images: [staticPost.featuredImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export async function generateStaticParams() {
  // Try to get slugs from Sanity
  const sanitySlugs = await getBlogPostSlugs();

  if (sanitySlugs && sanitySlugs.length > 0) {
    // Combine Sanity slugs with static slugs (for fallback)
    const allSlugs = new Set([
      ...sanitySlugs.map((s) => s.slug),
      ...Object.keys(staticBlogPosts),
    ]);
    return Array.from(allSlugs).map((slug) => ({ slug }));
  }

  // Fall back to static slugs only
  return Object.keys(staticBlogPosts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Try to fetch from Sanity first
  const sanityPost = await getBlogPostBySlug(slug);

  // Determine which post to use
  let post: BlogPost | null = sanityPost;
  let isStaticPost = false;
  let staticContent = "";

  if (!post) {
    // Fall back to static post
    const staticPost = staticBlogPosts[slug];
    if (!staticPost) {
      notFound();
    }

    isStaticPost = true;
    staticContent = staticPost.content;
    post = {
      id: slug,
      title: staticPost.title,
      slug: staticPost.slug,
      excerpt: staticPost.excerpt,
      featuredImage: staticPost.featuredImage,
      featuredImageAlt: `${staticPost.title} - packaging blog article`,
      category: staticPost.category.toLowerCase().replace(/ /g, "-"),
      tags: staticPost.tags,
      publishedAt: staticPost.publishedAt,
      readTime: parseInt(staticPost.readTime) || 5,
      isPublished: true,
      author: staticPost.author,
      seoTitle: staticPost.seoTitle,
      seoDescription: staticPost.seoDescription,
    };
  }

  // Get related posts
  const sanityRelatedPosts = await getRelatedBlogPosts(post.category, slug);
  const relatedPosts =
    sanityRelatedPosts && sanityRelatedPosts.length > 0
      ? sanityRelatedPosts
      : Object.entries(staticBlogPosts)
          .filter(
            ([s, p]) =>
              s !== slug &&
              p.category.toLowerCase().replace(/ /g, "-") === post!.category
          )
          .slice(0, 2)
          .map(([s, p]) => ({
            id: s,
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            featuredImage: p.featuredImage,
            featuredImageAlt: `${p.title} - packaging blog article`,
            category: p.category.toLowerCase().replace(/ /g, "-"),
            publishedAt: p.publishedAt,
            readTime: parseInt(p.readTime) || 5,
            author: p.author,
          }));

  // Article structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole || "Packaging Specialist",
    },
    publisher: {
      "@type": "Organization",
      name: "Bubble Wrap Shop",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blogs/${slug}` },
    keywords: post.tags?.join(", ") || post.seoKeywords?.join(", "),
    articleSection: getCategoryLabel(post.category),
  };

  // FAQ structured data (if FAQs exist)
  const faqStructuredData = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-4">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blogs" },
              { label: post.title, href: `/blogs/${slug}` },
            ]}
          />
        </div>
      </div>

      {/* Article */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Link */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                {getCategoryLabel(post.category)}
              </span>
              <span className="text-sm text-gray-500">
                {formatReadTime(post.readTime)} read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & Date */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                {post.authorImage ? (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span>
                  {post.author}
                  {post.authorRole && (
                    <span className="text-gray-400"> · {post.authorRole}</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatReadTime(post.readTime)} read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-gray-100 mb-12">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Expert Tip (EEAT) */}
          {post.expertTip && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-10">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-900 mb-1">
                    Expert Tip
                  </h3>
                  <p className="text-emerald-800 text-sm leading-relaxed">
                    {post.expertTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {isStaticPost ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatStaticContent(staticContent) }}
            />
          ) : post.content ? (
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.content as never} components={portableTextComponents} />
            </div>
          ) : null}

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {post.relatedProducts && post.relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Products
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    {product.image && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-emerald-600 font-semibold">
                        From £{product.basePrice.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          {post.sources && post.sources.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Sources & References
              </h3>
              <ul className="space-y-2">
                {post.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blogs/${relatedPost.slug}`}
                  className="group"
                >
                  <article>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.featuredImageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-emerald-600">
                        {getCategoryLabel(relatedPost.category)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {formatReadTime(relatedPost.readTime)} read
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our complete range of packaging supplies with bulk pricing and
            next-day delivery across the UK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Browse products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              More articles
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
