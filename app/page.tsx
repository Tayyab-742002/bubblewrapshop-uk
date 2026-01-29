import type { Metadata } from "next";
import {
  HeroSection,
  CategoryGrid,
  FeaturedProducts,
  SustainabilityBlock,
  NewArrivals,
  FinalCTA,
  B2BBanner,
  GalleryShowcase,
  TrustBar,
} from "@/components/home";
import { getAllCategories } from "@/sanity/lib";

// Revalidation strategy: On-demand revalidation via Sanity webhooks
// Pages will only revalidate when content changes in Sanity CMS
// For development, use `npm run dev` which has hot reloading
export const revalidate = false;

// Hardcoded to ensure consistency across all pages
const siteUrl = "https://bubblewrapshop.co.uk";

/**
 * Homepage Metadata
 * SEO optimization for the homepage with comprehensive UK-focused keywords
 * Targeting both B2C and B2B customers
 */
export const metadata: Metadata = {
  title: "Bubble Wrap & Packaging Supplies UK | Next-Day from Blackburn",
  description:
    "Family-run packaging supplier in Blackburn. Buy bubble wrap, mailing bags & boxes wholesale. Next-day delivery to Manchester, London & UK-wide. 5-star rated.",
  keywords: [
    "bubble wrap",
    "bubble wrap rolls",
    "packaging supplies UK",
    "bubble wrap Blackburn",
    "packaging materials",
    "mailing bags",
    "cardboard boxes",
    "wholesale packaging",
    "next day delivery packaging",
    "packing supplies",
    "protective packaging",
    "shipping supplies UK",
    "bubble wrap wholesale",
    "packaging supplier Lancashire",
  ],
  openGraph: {
    title: "Bubble Wrap & Packaging Supplies | Next-Day Delivery UK",
    description:
      "Blackburn's trusted packaging supplier. Wholesale bubble wrap, boxes & mailing bags. Next-day delivery to Manchester, London & nationwide.",
    url: siteUrl,
    siteName: "Bubble Wrap Shop",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bubble Wrap Shop - Packaging Supplies from Blackburn, UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bubble Wrap & Packaging Supplies | Next-Day Delivery UK",
    description:
      "Blackburn's trusted packaging supplier. Wholesale bubble wrap, boxes & mailing bags. Next-day delivery UK-wide.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function Home() {
  // Fetch categories for the CategoryGrid
  const categories = await getAllCategories();
  // Organization Structured Data (JSON-LD) for SEO
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bubble Wrap Shop",
    legalName: "Bubble wrap shop (Blackburn) Limited",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpg`,
    description:
      "Family-run packaging supplier based in Blackburn, Lancashire. Wholesale bubble wrap, mailing bags, and boxes with next-day delivery across the UK.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7728-342335",
      contactType: "Customer Service",
      areaServed: "GB",
      availableLanguage: "English",
      email: "sales@bubblewrapshop.co.uk",
    },
    sameAs: [
      "https://www.facebook.com/bubblewrapshop",
      "https://www.instagram.com/bubblewrapshop",
      "https://www.linkedin.com/company/bubblewrapshop",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "Lancashire",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
    foundingDate: "2015",
  };

  // LocalBusiness Structured Data (JSON-LD) for Local SEO
  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#organization`,
    name: "Bubble Wrap Shop",
    legalName: "Bubble wrap shop (Blackburn) Limited",
    image: `${siteUrl}/logo.jpg`,
    url: siteUrl,
    telephone: "+44-7728-342335",
    email: "sales@bubblewrapshop.co.uk",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "Lancashire",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "53.7488",
      longitude: "-2.4883",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: [
      { "@type": "City", name: "Blackburn" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "London" },
      { "@type": "City", name: "Birmingham" },
      { "@type": "City", name: "Leeds" },
      { "@type": "City", name: "Liverpool" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    description:
      "Family-run packaging supplier in Blackburn, Lancashire. Wholesale bubble wrap, mailing bags, and boxes with next-day delivery to Manchester, London, and UK-wide.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Packaging Supplies",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bubble Wrap Rolls" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mailing Bags" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cardboard Boxes" } },
      ],
    },
  };

  // Website Structured Data (JSON-LD) for SEO
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bubble Wrap Shop",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />

      <B2BBanner />
      <HeroSection />
      <TrustBar />
      <CategoryGrid categories={categories || []} />
      <FeaturedProducts />
      <GalleryShowcase />
      <SustainabilityBlock />
      <NewArrivals />
      <FinalCTA />
    </>
  );
}
