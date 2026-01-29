import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  BadgePercent,
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Building2,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";
import { getAllCategories, getFeaturedProducts } from "@/sanity/lib";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductGrid } from "@/components/products/product-grid";
import { Category } from "@/types/category";

export const revalidate = false;

const siteUrl = "https://bubblewrapshop.co.uk";

// 2026 SEO: Comprehensive location-specific data with delivery hooks and local content
interface LocationData {
  city: string;
  region: string;
  isHQ: boolean; // True for Blackburn (physical location)
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  // 2026 Content Hook: Delivery speed with specific areas
  deliveryHook: string;
  deliveryAreas: string[]; // Specific neighborhoods/postcodes
  deliveryTime: string;
  courierPartner: string;
  // Local trust signals
  orderVolume: string; // e.g., "500+ orders weekly"
  businessTypes: string[]; // e.g., "removal companies", "eBay sellers"
  // Location-specific expert tip (EEAT)
  expertTip: string;
  // Location-specific FAQs
  faqs: Array<{ question: string; answer: string }>;
  // Use cases for local businesses
  useCases: string[];
  // H1 and hero content
  heroTitle: string;
  heroSubtitle: string;
}

const locationData: Record<string, LocationData> = {
  blackburn: {
    city: "Blackburn",
    region: "Lancashire",
    isHQ: true,
    metaTitle: "Packaging Supplies Blackburn | Visit Our Warehouse | Same-Day Collection",
    metaDescription: "Visit Bubble Wrap Shop HQ in Blackburn. Same-day collection from Unit BR16 Blakewater Road. Trade counter open Mon-Fri 9am-5pm. Wholesale bubble wrap, boxes & mailing bags.",
    keywords: [
      "packaging supplies Blackburn",
      "bubble wrap Blackburn",
      "packaging warehouse Blackburn",
      "same day collection packaging",
      "trade counter Blackburn",
      "wholesale packaging BB1",
      "cardboard boxes Blackburn",
      "mailing bags Lancashire",
    ],
    deliveryHook: "Same-day collection or next-day local delivery",
    deliveryAreas: ["Blackburn town centre", "Darwen", "Accrington", "Burnley", "Preston", "Clitheroe"],
    deliveryTime: "Same-day collection available",
    courierPartner: "Our own delivery vans + DPD",
    orderVolume: "1,000+ local pickups monthly",
    businessTypes: ["Removal companies", "eBay sellers", "Local retailers", "Manufacturing businesses"],
    expertTip: "Blackburn customers: Call ahead on 07728 342335 to have your order ready for collection. We can load directly into your van for bulk orders over 10 boxes.",
    faqs: [
      {
        question: "Can I visit your Blackburn warehouse?",
        answer: "Yes! Our trade counter at Unit BR16, Blakewater Road, Blackburn BB1 5QF is open Monday-Friday 9am-5pm. No appointment needed for collections.",
      },
      {
        question: "Do you offer same-day collection in Blackburn?",
        answer: "Orders placed before 2pm can be collected same-day. Call us on 07728 342335 to confirm stock availability for urgent orders.",
      },
      {
        question: "Is there parking at your Blackburn warehouse?",
        answer: "Yes, free parking available directly outside our unit. We can help load bulk orders into your vehicle.",
      },
      {
        question: "Do you offer trade accounts for Blackburn businesses?",
        answer: "Absolutely! Local Blackburn businesses can apply for 30-day trade credit. Visit our warehouse or call to set up an account.",
      },
    ],
    useCases: ["Warehouse collection", "Trade counter visits", "Bulk loading service", "Local delivery"],
    heroTitle: "Packaging Supplies Blackburn",
    heroSubtitle: "Visit our warehouse at Unit BR16 Blakewater Road. Same-day collection, trade counter, and bulk loading service. Family-run since 2015.",
  },
  manchester: {
    city: "Manchester",
    region: "Greater Manchester",
    isHQ: false,
    metaTitle: "Packaging Supplies Manchester | Next-Day Delivery from Blackburn | Bubble Wrap Shop",
    metaDescription: "Fast packaging delivery to Manchester & Greater Manchester. Next-day service via DPD from our Blackburn warehouse. Bubble wrap, boxes, mailing bags. Wholesale pricing.",
    keywords: [
      "packaging supplies Manchester",
      "bubble wrap Manchester",
      "next day packaging Manchester",
      "cardboard boxes Manchester",
      "mailing bags Manchester",
      "packaging delivery M1",
      "wholesale packaging Greater Manchester",
      "packaging supplier Salford",
    ],
    deliveryHook: "Order before 2pm for next-day delivery to Manchester",
    deliveryAreas: ["Manchester City Centre", "Salford", "Trafford", "Stockport", "Oldham", "Bolton", "Bury", "Rochdale"],
    deliveryTime: "Next-day delivery (order by 2pm)",
    courierPartner: "DPD Next-Day Service",
    orderVolume: "500+ orders to Manchester weekly",
    businessTypes: ["eBay & Etsy sellers", "Removal companies", "E-commerce businesses", "Salford Quays offices"],
    expertTip: "Manchester businesses: Order before 2pm Monday-Thursday for guaranteed next-day delivery. Friday orders arrive Monday. We ship via DPD with full tracking.",
    faqs: [
      {
        question: "How quickly can I get packaging delivered to Manchester?",
        answer: "Next-day delivery to all Manchester postcodes when you order before 2pm. We dispatch from our Blackburn warehouse (just 25 miles away) via DPD.",
      },
      {
        question: "Do you deliver to Salford and Trafford?",
        answer: "Yes! We deliver to all Greater Manchester areas including Salford Quays, Trafford Park, Stockport, and the Northern Quarter. Same next-day service applies.",
      },
      {
        question: "What courier do you use for Manchester deliveries?",
        answer: "We use DPD for Manchester deliveries. You'll receive tracking and a 1-hour delivery window via text/email on the day of delivery.",
      },
      {
        question: "Is there a minimum order for Manchester delivery?",
        answer: "No minimum order required. Free delivery available on qualifying orders. Bulk orders get automatic volume discounts.",
      },
    ],
    useCases: ["E-commerce packaging", "Office relocations", "Warehouse supplies", "Retail packaging"],
    heroTitle: "Packaging Supplies Manchester",
    heroSubtitle: "Next-day delivery from our Blackburn warehouse to Deansgate, Salford, Trafford & all Greater Manchester. Trusted by 500+ Manchester businesses.",
  },
  london: {
    city: "London",
    region: "Greater London",
    isHQ: false,
    metaTitle: "Packaging Supplies London | Next-Day Delivery | Bubble Wrap Shop",
    metaDescription: "Packaging supplies delivered to London next-day. All postcodes covered, timed delivery options. Bubble wrap, boxes, mailing bags from £2.99. Wholesale pricing.",
    keywords: [
      "packaging supplies London",
      "bubble wrap London",
      "next day packaging London",
      "cardboard boxes London",
      "mailing bags London",
      "packaging supplier Central London",
      "wholesale packaging London",
      "packaging delivery EC1",
    ],
    deliveryHook: "Next-day delivery to all London postcodes, timed slots available",
    deliveryAreas: ["Central London (EC, WC)", "East London (E)", "North London (N, NW)", "South London (SE, SW)", "West London (W)", "Outer London"],
    deliveryTime: "Next-day delivery (timed slots available)",
    courierPartner: "DPD + Timed Delivery Options",
    orderVolume: "300+ orders to London weekly",
    businessTypes: ["E-commerce brands", "Startups", "Creative agencies", "Fulfilment centres"],
    expertTip: "London customers: We offer timed delivery slots for Central London. Need packaging for a specific time? Add delivery notes at checkout or call us to arrange.",
    faqs: [
      {
        question: "Do you deliver to Central London?",
        answer: "Yes! We deliver to all London postcodes including EC, WC, E, SE, SW, N, NW, and W. Next-day delivery when you order before 2pm.",
      },
      {
        question: "Can I get timed delivery in London?",
        answer: "Timed delivery slots are available for London. Select your preferred time at checkout or contact us for before-9am or specific time requirements.",
      },
      {
        question: "How long does delivery to London take from Blackburn?",
        answer: "Despite being based in Blackburn, we guarantee next-day delivery to London via our DPD partnership. Order by 2pm for delivery tomorrow.",
      },
      {
        question: "Do you deliver to London fulfilment centres?",
        answer: "Yes, we regularly deliver to fulfilment centres across London. Bulk orders qualify for wholesale pricing and can be scheduled for specific dates.",
      },
    ],
    useCases: ["Startup packaging", "Agency supplies", "Fulfilment centre stock", "Market stall supplies"],
    heroTitle: "Packaging Supplies London",
    heroSubtitle: "Next-day delivery to all London postcodes. Timed delivery slots for Central London. Trusted by e-commerce brands and creative agencies.",
  },
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

  const pageUrl = `${siteUrl}/locations/${city}`;

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: location.keywords,
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: pageUrl,
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
      title: location.metaTitle,
      description: location.metaDescription,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = locationData[city];

  if (!location) {
    notFound();
  }

  // Fetch categories and featured products
  const [categories, featuredProducts] = await Promise.all([
    getAllCategories(),
    getFeaturedProducts(),
  ]);

  const pageUrl = `${siteUrl}/locations/${city}`;

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
        name: "Locations",
        item: `${siteUrl}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.city,
        item: pageUrl,
      },
    ],
  };

  // LocalBusiness structured data with location-specific areaServed
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
      { "@type": "City", name: location.city },
      { "@type": "AdministrativeArea", name: location.region },
      { "@type": "Country", name: "United Kingdom" },
    ],
    description: `Packaging supplier serving ${location.city} and ${location.region}. ${location.deliveryHook}. Wholesale bubble wrap, mailing bags, and boxes.`,
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

  // FAQPage structured data for rich snippets
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Trust signals with icons
  const trustSignals = location.isHQ
    ? [
        { icon: MapPin, text: "Visit Our Warehouse", highlight: true },
        { icon: Clock, text: "Same-Day Collection" },
        { icon: BadgePercent, text: "Trade Prices" },
        { icon: Users, text: location.orderVolume },
      ]
    : [
        { icon: Truck, text: location.deliveryTime, highlight: true },
        { icon: Package, text: `Serving ${location.city}` },
        { icon: BadgePercent, text: "Wholesale Prices" },
        { icon: Users, text: location.orderVolume },
      ];

  return (
    <div className="min-h-screen bg-background">
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
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3">
          <Breadcrumbs
            items={[
              { label: "Locations", href: "/locations" },
              { label: location.city },
            ]}
          />
        </div>
      </div>

      {/* Hero Section - Location-specific H1 and content */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative py-12 md:py-20">
          <div className="max-w-3xl">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                {location.isHQ ? "Our Headquarters" : `Delivering to ${location.city}`}
              </span>
            </div>

            {/* H1 - Location-specific, keyword-optimized */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {location.heroTitle}
            </h1>

            {/* Hero Subtitle - The "2026 Content Hook" */}
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
              {location.heroSubtitle}
            </p>

            {/* Delivery Hook - Key differentiator */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 max-w-xl">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{location.deliveryHook}</p>
                <p className="text-white/80 text-sm">via {location.courierPartner}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              {location.isHQ ? (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Phone className="w-5 h-5" />
                  Call for Collection
                </Link>
              ) : (
                <Link
                  href="/b2b-request"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Building2 className="w-5 h-5" />
                  Request Trade Quote
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Signals Bar */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {trustSignals.map((signal, index) => (
              <div key={index} className="py-4 md:py-5 px-4 text-center">
                <signal.icon
                  className={`w-6 h-6 mx-auto mb-2 ${
                    signal.highlight ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                />
                <p
                  className={`font-semibold text-sm ${
                    signal.highlight ? "text-emerald-600" : "text-foreground"
                  }`}
                >
                  {signal.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Areas Section - 2026 Content Hook */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Delivery Areas */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {location.isHQ
                ? `Local Delivery & Collection Areas`
                : `Fast Delivery to ${location.city}`}
            </h2>
            <p className="text-muted-foreground mb-6">
              {location.isHQ
                ? `We deliver directly to businesses across Lancashire and offer same-day collection from our Blackburn warehouse.`
                : `We ship from our Blackburn warehouse via ${location.courierPartner} for reliable ${location.deliveryTime.toLowerCase()} to all ${location.region} areas.`}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {location.deliveryAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg border border-border"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-sm font-medium text-foreground">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Trust Signals */}
          <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl p-6 md:p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Trusted by {location.city} Businesses
            </h3>
            <p className="text-muted-foreground mb-6">
              We regularly supply packaging to:
            </p>
            <div className="space-y-3">
              {location.businessTypes.map((business, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{business}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{location.orderVolume}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Tip Section - EEAT */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border-y border-amber-200 dark:border-amber-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-10">
          <div className="flex gap-4 md:gap-6 items-start max-w-4xl mx-auto">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Expert Tip for {location.city} Customers
              </h3>
              <p className="text-amber-800 dark:text-amber-200">{location.expertTip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {location.useCases.map((useCase, index) => (
            <span
              key={index}
              className="inline-flex items-center px-4 py-2 bg-secondary text-foreground text-sm font-medium rounded-full border border-border"
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 border-t border-border">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Popular Products in {location.city}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our best-selling packaging supplies delivered to {location.city} businesses
          </p>
        </div>

        {featuredProducts && featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts.slice(0, 8)} />
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              All available for delivery to {location.city}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories?.slice(0, 8).map((category: Category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border hover:border-emerald-300 transition-all hover:shadow-lg"
              >
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.imageAlt || category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-base group-hover:text-emerald-200 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              View All Categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {location.city} Delivery FAQs
            </h2>
            <p className="text-muted-foreground">
              Common questions about packaging delivery to {location.city}
            </p>
          </div>

          <div className="space-y-4">
            {location.faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-secondary/30 rounded-xl border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-foreground hover:bg-secondary/50 transition-colors">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-muted-foreground">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">
              {location.isHQ ? "Trade Counter Open Mon-Fri 9am-5pm" : "Order before 2pm for next-day delivery"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Order Packaging to {location.city}?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {location.isHQ
              ? "Visit our warehouse for same-day collection or order online for local delivery."
              : `Get wholesale packaging delivered to ${location.city} with our reliable ${location.deliveryTime.toLowerCase()} service.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Shop Now
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
              <ShieldCheck className="w-4 h-4" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4" />
              <span>Wholesale Prices</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Free Delivery Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
