// PERFORMANCE: Dynamic import for heavy ProductGallery component
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
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

  // Use custom SEO fields if available, otherwise generate from product data
  const seoTitle =
    product.seoTitle || `${product.name} | Buy Online UK | Bubble Wrap Shop`;

  const seoDescription =
    product.seoDescription ||
    `Buy ${product.name} online. ${product.category || "Packaging supplies"} from £${productPrice}. Fast UK delivery, wholesale pricing, eco-friendly options. Order today!`;

  const productKeywords = product.seoKeywords?.length
    ? product.seoKeywords
    : [
      product.name,
      `${product.name} UK`,
      product.category || "packaging",
      `${product.category || "packaging"} UK`,
      "packaging supplies UK",
      "wholesale packaging",
      "bulk packaging UK",
      "buy online UK",
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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
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

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description || `${product.name} - Premium packaging supplies`,
    image: product.images || [product.image],
    sku: product.product_code,
    brand: {
      "@type": "Brand",
      name: "Bubble Wrap Shop",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "GBP",
      price: productPrice,
      priceValidUntil: new Date(
        new Date().getTime() + 365 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Bubble Wrap Shop",
      },
    },
    category: product.category || "Packaging Supplies",
  };

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
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
            />
          </div>
        </div>

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
