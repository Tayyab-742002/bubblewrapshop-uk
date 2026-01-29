import type { Metadata } from "next";

const siteUrl = "https://bubblewrapshop.co.uk";

// 2026 SEO: Contact page with Blackburn location and local SEO signals
export const metadata: Metadata = {
  title: "Contact Us | Packaging Supplier in Blackburn | Bubble Wrap Shop",
  description:
    "Contact Bubble Wrap Shop in Blackburn, Lancashire. Call 01254 916167 or email sales@bubblewrapshop.co.uk. Family-run packaging supplier with next-day UK delivery. Get a quote today.",
  keywords: [
    "contact bubble wrap shop",
    "packaging supplier Blackburn",
    "bubble wrap Blackburn contact",
    "packaging supplies Lancashire",
    "contact packaging supplier UK",
    "bubble wrap shop phone number",
    "packaging quote UK",
  ],
  openGraph: {
    title: "Contact Bubble Wrap Shop | Blackburn, Lancashire",
    description:
      "Get in touch with our Blackburn team. Call 01254 916167 or email us for packaging quotes. Next-day UK delivery available.",
    url: `${siteUrl}/contact`,
    siteName: "Bubble Wrap Shop",
    images: [`${siteUrl}/og-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Bubble Wrap Shop | Blackburn",
    description:
      "Contact our Blackburn team for packaging supplies. Call 01254 916167 or email sales@bubblewrapshop.co.uk.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // BreadcrumbList schema
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
        name: "Contact",
        item: `${siteUrl}/contact`,
      },
    ],
  };

  // LocalBusiness with ContactPoint schema
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Bubble Wrap Shop",
    legalName: "Bubble wrap shop (Blackburn) Limited",
    url: siteUrl,
    telephone: "+44-1254-916167",
    email: "sales@bubblewrapshop.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "Lancashire",
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
      closes: "18:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+44-1254-916167",
        contactType: "Customer Service",
        areaServed: "GB",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        email: "sales@bubblewrapshop.co.uk",
        contactType: "Sales",
        areaServed: "GB",
        availableLanguage: "English",
      },
    ],
    priceRange: "££",
  };

  // FAQ Schema for contact page
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are Bubble Wrap Shop's opening hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're open Monday to Friday, 9am to 6pm GMT. Orders placed before 2pm ship same-day from our Blackburn warehouse.",
        },
      },
      {
        "@type": "Question",
        name: "How can I get a quote for bulk packaging orders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can request a quote by calling 01254 916167, emailing sales@bubblewrapshop.co.uk, or using our online contact form. We typically respond within 1-2 business hours.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Bubble Wrap Shop located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're based at Unit BR16 Blakewater Road, Blackburn, Lancashire, BB1 5QF. We offer next-day delivery across the UK including Manchester, London, Birmingham, and Leeds.",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data (JSON-LD) - 2026 SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      {children}
    </>
  );
}
