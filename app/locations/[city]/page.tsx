import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export const revalidate = false;

const siteUrl = "https://bubblewrapshop.co.uk";

// Location-specific SEO data
const locationData: Record<string, {
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  areaServedPrimary: string;
}> = {
  blackburn: {
    city: "Blackburn",
    region: "Lancashire",
    metaTitle: "Packaging Supplies Blackburn | Bubble Wrap Shop HQ | Same-Day Collection",
    metaDescription: "Visit our Blackburn warehouse for wholesale packaging supplies. Same-day collection, trade counter open Mon-Fri, competitive bulk pricing. Bubble wrap, boxes & more.",
    keywords: [
      "packaging supplies Blackburn",
      "bubble wrap Blackburn",
      "packaging materials Lancashire",
      "wholesale packaging Blackburn",
      "cardboard boxes Blackburn",
      "packaging supplier BB1",
      "mailing bags Blackburn",
      "packaging warehouse Blackburn"
    ],
    ogTitle: "Packaging Supplies Blackburn | Bubble Wrap Shop HQ",
    ogDescription: "Visit our Blackburn warehouse for wholesale packaging. Same-day collection, trade counter, bulk pricing. Bubble wrap, boxes & mailing bags.",
    areaServedPrimary: "Blackburn"
  },
  manchester: {
    city: "Manchester",
    region: "Greater Manchester",
    metaTitle: "Packaging Supplies Manchester | Next-Day Delivery | Bubble Wrap Shop",
    metaDescription: "Fast packaging delivery to Manchester. Next-day service from Blackburn, free delivery over £50, bulk discounts. Bubble wrap, boxes, mailing bags & more.",
    keywords: [
      "packaging supplies Manchester",
      "bubble wrap Manchester",
      "cardboard boxes Manchester",
      "packaging delivery Greater Manchester",
      "wholesale packaging Manchester",
      "packaging materials M1",
      "mailing bags Manchester",
      "next day packaging Manchester"
    ],
    ogTitle: "Packaging Supplies Manchester | Next-Day Delivery",
    ogDescription: "Fast packaging delivery to Manchester & Greater Manchester. Next-day from Blackburn, free delivery over £50. Bubble wrap, boxes & mailing bags.",
    areaServedPrimary: "Manchester"
  },
  london: {
    city: "London",
    region: "Greater London",
    metaTitle: "Packaging Supplies London | Next-Day Delivery | Bubble Wrap Shop",
    metaDescription: "Packaging supplies delivered to London next-day. All postcodes covered, timed deliveries available, bulk discounts. Bubble wrap, boxes, tape & more.",
    keywords: [
      "packaging supplies London",
      "bubble wrap London",
      "cardboard boxes London",
      "packaging delivery London",
      "wholesale packaging London",
      "packaging supplier Central London",
      "mailing bags London",
      "next day packaging London"
    ],
    ogTitle: "Packaging Supplies London | Next-Day Delivery",
    ogDescription: "Packaging supplies delivered to all London postcodes next-day. Timed delivery options, bulk discounts. Bubble wrap, boxes & mailing bags.",
    areaServedPrimary: "London"
  }
};

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  return Object.keys(locationData).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = locationData[city];

  if (!location) {
    return {
      title: "Location Not Found | Bubble Wrap Shop UK",
    };
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: location.keywords,
    openGraph: {
      title: location.ogTitle,
      description: location.ogDescription,
      url: `${siteUrl}/locations/${city}`,
      siteName: "Bubble Wrap Shop",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Bubble Wrap Shop - Packaging Supplies ${location.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: location.ogTitle,
      description: location.ogDescription,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/locations/${city}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = locationData[city];

  if (!location) {
    notFound();
  }

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
    description: `Family-run packaging supplier serving ${location.city} and ${location.region}. Wholesale bubble wrap, mailing bags, and boxes with fast delivery.`,
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
      addressRegion: "England",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
  };

  // LocalBusiness Structured Data with location-specific areaServed
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
    // Location-specific area served (prioritize the target city)
    areaServed: [
      { "@type": "City", name: location.areaServedPrimary },
      { "@type": "AdministrativeArea", name: location.region },
      { "@type": "City", name: "Blackburn" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    description: `Packaging supplier serving ${location.city} and ${location.region}. Wholesale bubble wrap, mailing bags, and boxes with fast delivery from our Blackburn warehouse.`,
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
      {/* Structured Data (JSON-LD) - Location specific */}
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

      {/* Same components as home page */}
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
