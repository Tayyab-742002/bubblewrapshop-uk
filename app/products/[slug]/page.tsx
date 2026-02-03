// PERFORMANCE: Dynamic import for heavy ProductGallery component
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, Lightbulb, Tag, HelpCircle } from "lucide-react";
import { ProductGallerySkeleton } from "@/components/products/product-gallery-loader";
import { RelatedProducts } from "@/components/products";
import ProductPageContent from "@/components/products/product-page-content";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import {
  getProductBySlug,
  getProductsByCategorySlug,
} from "@/services/products/product.service";
import { getProductSlugs } from "@/sanity/lib/api";
import { notFound } from "next/navigation";

// PERFORMANCE: Code split ProductGallery (heavy image component)
const ProductGallery = dynamic(
  () =>
    import("@/components/products").then((mod) => ({
      default: mod.ProductGallery,
    })),
  {
    loading: () => <ProductGallerySkeleton />,
    ssr: true,
  }
);

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}

/**
 * Generate dynamic metadata for product pages
 * Includes SEO title, description, Open Graph tags, and structured data
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://bubblewrapshop.co.uk";
  const productUrl = `${siteUrl}/products/${slug}`;
  const productImage = product.images?.[0] || product.image;
  const productPrice = product.basePrice.toFixed(2);

  // 2026 SEO: Use LLM summary for AI Overviews, custom SEO fields, or generate optimized defaults
  const seoTitle =
    product.seoTitle ||
    `${product.name} | Buy Online from Blackburn | Bubble Wrap Shop`;

  // Use LLM summary if available (optimized for AI Overviews), then seoDescription, then generate
  const seoDescription =
    product.seoDescription ||
    product.llmSummary ||
    `Buy ${product.name} online from our Blackburn warehouse. ${product.category || "Packaging supplies"} from £${productPrice}. Next-day UK delivery, wholesale pricing. Family-run since 2015.`;

  const productKeywords = product.seoKeywords?.length
    ? product.seoKeywords
    : [
        product.name,
        `${product.name} UK`,
        `buy ${product.name?.toLowerCase()} online`,
        product.category || "packaging",
        `${product.category || "packaging"} Blackburn`,
        "packaging supplies UK",
        "wholesale packaging",
        "next day delivery packaging",
      ];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: productKeywords,
    openGraph: {
      type: "website",
      title: seoTitle,
      description: seoDescription,
      url: productUrl,
      siteName: "Bubble Wrap Shop",
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: `${product.name} - Packaging Supplies UK`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [productImage],
    },
    alternates: {
      canonical: productUrl,
    },
    other: {
      "product:price:amount": productPrice,
      "product:price:currency": "GBP",
      "product:availability": "in stock",
      "product:condition": "new",
      "product:brand": "Bubble Wrap Shop",
    },
  };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const { variant: initialVariantSku } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products from the same category
  const relatedProducts = product.categorySlug
    ? await getProductsByCategorySlug(product.categorySlug)
    : [];

  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://bubblewrapshop.co.uk";
  const productUrl = `${siteUrl}/products/${slug}`;
  const productPrice = product.basePrice.toFixed(2);
  const priceValidUntil = new Date(
    new Date().getTime() + 365 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  // BreadcrumbList Schema for rich snippets
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
      ...(product.category && product.categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: product.category,
              item: `${siteUrl}/categories/${product.categorySlug}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: product.name,
              item: productUrl,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: productUrl,
            },
          ]),
    ],
  };

  // 2026 Enhanced Product Schema with GTIN, dimensions, LocalBusiness seller
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    // Use LLM summary for description if available (better for AI understanding)
    description:
      product.llmSummary ||
      product.description ||
      `${product.name} - Premium packaging supplies from Blackburn`,
    image: product.images?.length ? product.images : [product.image],
    sku: product.product_code,
    // Google Shopping identifiers
    ...(product.gtin && { gtin: product.gtin }),
    ...(product.mpn && { mpn: product.mpn }),
    brand: {
      "@type": "Brand",
      name: product.brand || "Bubble Wrap Shop",
    },
    // Product dimensions for shipping calculations
    ...(product.weight && {
      weight: {
        "@type": "QuantitativeValue",
        value: product.weight,
        unitCode: "KGM",
      },
    }),
    ...(product.dimensions && {
      depth: product.dimensions.length
        ? {
            "@type": "QuantitativeValue",
            value: product.dimensions.length,
            unitCode: "CMT",
          }
        : undefined,
      width: product.dimensions.width
        ? {
            "@type": "QuantitativeValue",
            value: product.dimensions.width,
            unitCode: "CMT",
          }
        : undefined,
      height: product.dimensions.height
        ? {
            "@type": "QuantitativeValue",
            value: product.dimensions.height,
            unitCode: "CMT",
          }
        : undefined,
    }),
    // 2026: Material description for AI understanding ("squeeze test")
    ...(product.materialFeel && { material: product.materialFeel }),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "GBP",
      price: productPrice,
      priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      // LocalBusiness seller for local SEO boost
      seller: {
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
      // Shipping details
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "GB",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
        },
      },
      // Return policy
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "GB",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    category: product.category || "Packaging Supplies",
  };

  // FAQ Schema if product has FAQs (generates rich snippets)
  const faqStructuredData =
    product.faqs && product.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: product.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    ...(product.category && product.categorySlug
      ? [{ label: product.category, href: `/categories/${product.categorySlug}` }]
      : []),
    { label: product.name },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data (JSON-LD) - 2026 SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      {/* Breadcrumb Bar */}
      <div className="border-b border-border/30 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-3">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8 md:py-12">

        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to products
        </Link>

        {/* Product Layout: 2-Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left Column: Product Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              images={product.images || [product.image]}
              productName={product.name}
              imagesAlt={product.imagesAlt}
              mainImageAlt={product.imageAlt}
            />
          </div>

          {/* Right Column: Product Info & Purchase */}
          <div>
            {/* Product Title & SKU */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                SKU: <span className="font-medium text-foreground/80">{product.product_code}</span>
              </p>
            </div>

            {/* Purchase Section & Accordion */}
            <ProductPageContent
              product={product}
              description={product.description}
              specifications={product.specifications}
              delivery={product.delivery}
              initialVariantSku={initialVariantSku}
            />

            {/* 2026 EEAT: Expert Tip Section */}
            {product.expertTip && (
              <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                      Expert Tip from Our Packaging Team
                    </h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      {product.expertTip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2026 Entity Saliency: Use Cases */}
            {product.useCases && product.useCases.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  Ideal For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.useCases.map((useCase, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2026 EEAT: Product FAQs Section (also generates rich snippets via schema) */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="mt-12 md:mt-16 pt-8 border-t border-border/50">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl">
              {product.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 bg-secondary/30 rounded-lg border border-border/30"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            products={relatedProducts}
            categoryName={product.category}
            categorySlug={product.categorySlug}
            currentProductId={product.id}
          />
        )}
      </div>
    </div>
  );
}

// Revalidation strategy: On-demand revalidation via Sanity webhooks
export const revalidate = false;

export async function generateStaticParams() {
  const slugs = (await getProductSlugs()) || [];
  return slugs.slice(0, 200).map((slug) => ({ slug }));
}
