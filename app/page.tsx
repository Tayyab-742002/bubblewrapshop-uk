import type { Metadata } from "next";
import {
  HeroSection,
  CategoryGrid,
  FeaturedProducts,
  SustainabilityBlock,
  NewArrivals,
  FinalCTA,
  B2BBanner,
} from "@/components/home";

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
  title: "Packaging Supplies UK: Bubble Wrap, Boxes & Eco Packaging",
  description:
    "Create your bubble-wrapped purchase in the U.K. through a reputable wholesale bubble wrap distributor. Bubble wrap UK, packaging mailing bags wholesale UK.",
  keywords: [
    "Packaging supplies UK",
    "Buy bubble wrap online UK",
    "Wholesale bubble wrap supplier UK",
    "Eco-friendly bubble wrap UK",
    "Protective packaging for shipping UK",
    "Bubble wrap rolls wholesale UK",
    "Cheap bubble wrap UK supplier",
    "Anti-static bubble wrap UK",
    "Foam packaging rolls UK",
    "Stretch film wrap UK",
    "Edge protection packaging UK",
    "Fragile tape UK",
    "Mailing bags wholesale UK",
    "Bubble wrap UK",
  ],
  openGraph: {
    title: "Packaging Supplies UK | Bubble Wrap & Boxes | Bubble Wrap Shop",
    description:
      "UK's leading supplier of packaging supplies. Buy bubble wrap, cardboard boxes, and protective packaging. Wholesale pricing. Next day delivery.",
    url: siteUrl,
    siteName: "Bubble Wrap Shop",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bubble Wrap Shop - Packaging Supplies UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Supplies UK | Bubble Wrap & Boxes | Bubble Wrap Shop",
    description:
      "UK's leading supplier of packaging supplies. Wholesale pricing. Next day delivery across the UK.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  // Organization Structured Data (JSON-LD) for SEO
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bubble Wrap Shop",
    legalName: "Bubble wrap shop (Blackburn) Limited",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpg`,
    description:
      "Premium packaging supplies with automatic bulk pricing. Next day delivery. Eco-friendly options.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7882-851632",
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
      addressRegion: "England",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
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
    telephone: "+44-7882-851632",
    email: "sales@bubblewrapshop.co.uk",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "England",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
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
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description:
      "Premium packaging supplies with automatic bulk pricing. Next day delivery across the UK. Eco-friendly options available.",
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
      {/* <TrustBar /> */}
      <CategoryGrid />
      <FeaturedProducts />
      <SustainabilityBlock />
      <NewArrivals />
      <FinalCTA />
    </>
  );
}
