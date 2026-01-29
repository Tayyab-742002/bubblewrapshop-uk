import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { getAllCategories } from "@/sanity/lib";
import {
  MapPin,
  Truck,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  CheckCircle2,
  Shield,
  Package,
  Star,
  ChevronDown,
  Warehouse,
  Users,
  Zap
} from "lucide-react";

// Location data with full SEO content
const locationData: Record<string, {
  city: string;
  region: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  deliveryTime: string;
  deliveryDescription: string;
  postcodes: string[];
  features: string[];
  isPrimary: boolean;
  address?: {
    street: string;
    city: string;
    postcode: string;
    phone: string;
    email: string;
  };
  faqs: { question: string; answer: string }[];
  localContent: {
    businessesServed: string;
    deliveryDetails: string;
    whyChoose: string;
  };
  image: string;
  keywords: string[];
}> = {
  blackburn: {
    city: "Blackburn",
    region: "Lancashire",
    tagline: "Our Headquarters & Trade Counter",
    metaTitle: "Packaging Supplies Blackburn | Bubble Wrap Shop HQ | Same-Day Collection",
    metaDescription: "Visit our Blackburn warehouse for wholesale packaging supplies. Same-day collection, trade counter open Mon-Fri, competitive bulk pricing. BB1-BB6 same-day delivery.",
    h1: "Packaging Supplies in Blackburn",
    heroDescription: "Visit our headquarters in Blackburn for trade collection, same-day local delivery, and wholesale pricing on all packaging materials.",
    deliveryTime: "Same Day",
    deliveryDescription: "Same-day delivery available for BB postcodes. Order by 12pm for delivery today.",
    postcodes: ["BB1", "BB2", "BB3", "BB4", "BB5", "BB6", "BB7", "BB8", "BB9", "BB10", "BB11", "BB12"],
    features: [
      "Trade counter open Mon-Fri 8am-5pm",
      "Same-day collection available",
      "Wholesale pricing for trade customers",
      "Free parking at warehouse",
      "Expert advice on packaging solutions",
      "Bulk order discounts"
    ],
    isPrimary: true,
    address: {
      street: "Unit 5, Blackburn Industrial Estate",
      city: "Blackburn",
      postcode: "BB1 3HT",
      phone: "01onal 254 123456",
      email: "trade@bubblewrapshop.co.uk"
    },
    faqs: [
      {
        question: "Can I collect orders from Blackburn?",
        answer: "Yes! Our trade counter is open Monday to Friday, 8am to 5pm. Orders can be collected same-day if placed before 12pm. We have free parking available for customers."
      },
      {
        question: "Do you offer same-day delivery in Blackburn?",
        answer: "Yes, we offer same-day delivery to all BB postcodes for orders placed before 12pm. This includes Blackburn, Darwen, Accrington, and surrounding areas."
      },
      {
        question: "What are your trade account benefits?",
        answer: "Trade customers receive wholesale pricing, credit terms (subject to approval), priority dispatch, and a dedicated account manager. Apply online or visit our trade counter."
      },
      {
        question: "Do you supply packaging to businesses in Lancashire?",
        answer: "Absolutely! We supply hundreds of businesses across Lancashire including retailers, e-commerce sellers, manufacturers, and moving companies. Contact us for a custom quote."
      }
    ],
    localContent: {
      businessesServed: "We proudly serve businesses throughout Blackburn and Lancashire, from local retailers on Darwen Street to e-commerce brands in the business parks. Our central location makes us the ideal packaging partner for the region.",
      deliveryDetails: "Local deliveries to Blackburn, Darwen, Accrington, and surrounding BB postcodes are dispatched from our warehouse daily. Order by 12pm for same-day delivery, or collect from our trade counter.",
      whyChoose: "As Blackburn's leading packaging supplier, we combine wholesale pricing with local service. Visit our warehouse to see our full range, or let our team recommend the perfect packaging solution for your needs."
    },
    image: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.07%20PM%20(2).jpeg",
    keywords: [
      "packaging supplies Blackburn",
      "bubble wrap Blackburn",
      "packaging materials Lancashire",
      "wholesale packaging Blackburn",
      "cardboard boxes Blackburn",
      "packaging supplier BB1"
    ]
  },
  manchester: {
    city: "Manchester",
    region: "Greater Manchester",
    tagline: "Next-Day Delivery Hub",
    metaTitle: "Packaging Supplies Manchester | Next-Day Delivery | Bubble Wrap Shop",
    metaDescription: "Fast packaging delivery to Manchester and Greater Manchester. Next-day service, free delivery over £50, bulk discounts. Bubble wrap, boxes, and more from Blackburn.",
    h1: "Packaging Supplies in Manchester",
    heroDescription: "Next-day delivery on packaging supplies across Manchester and Greater Manchester. Just 30 minutes from our Blackburn warehouse for fast, reliable service.",
    deliveryTime: "Next Day",
    deliveryDescription: "Next-day delivery to all Manchester postcodes. Order by 2pm for delivery tomorrow.",
    postcodes: ["M1-M90", "OL1-OL16", "SK1-SK14", "WN1-WN8", "BL1-BL9", "WA1-WA16"],
    features: [
      "Guaranteed next-day delivery",
      "Free delivery on orders over £50",
      "Morning delivery slots available",
      "Business accounts with credit terms",
      "Bulk order discounts",
      "Same-day courier option"
    ],
    isPrimary: false,
    faqs: [
      {
        question: "How quickly can you deliver to Manchester?",
        answer: "We offer guaranteed next-day delivery to all Manchester postcodes. Orders placed before 2pm are dispatched same-day from our Blackburn warehouse, just 30 minutes away."
      },
      {
        question: "Do you deliver to the whole of Greater Manchester?",
        answer: "Yes! We cover all of Greater Manchester including Manchester city centre, Salford, Stockport, Oldham, Bolton, Wigan, Rochdale, Bury, Tameside, and Trafford."
      },
      {
        question: "Is there free delivery to Manchester?",
        answer: "Yes, we offer free delivery on all orders over £50 to Manchester and Greater Manchester addresses. Smaller orders have a flat delivery fee of £5.99."
      },
      {
        question: "Can I get same-day delivery to Manchester?",
        answer: "We offer a same-day courier service for urgent orders to Manchester at an additional cost. Contact us before 10am to arrange same-day delivery."
      }
    ],
    localContent: {
      businessesServed: "We supply packaging to businesses throughout Greater Manchester, from Northern Quarter boutiques to Trafford Park warehouses. Our fast delivery keeps Manchester's e-commerce and retail sectors moving.",
      deliveryDetails: "Manchester deliveries are dispatched from our Blackburn warehouse, just 30 minutes away. Our proximity means reliable next-day service without the premium city-centre prices.",
      whyChoose: "Manchester businesses choose us for our combination of competitive wholesale pricing and dependable next-day delivery. No minimum orders, trade accounts available, and a full range of packaging supplies."
    },
    image: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.07%20PM%20(2).jpeg",
    keywords: [
      "packaging supplies Manchester",
      "bubble wrap Manchester",
      "cardboard boxes Manchester",
      "packaging delivery Greater Manchester",
      "wholesale packaging Manchester",
      "packaging materials M1"
    ]
  },
  london: {
    city: "London",
    region: "Greater London & Southeast",
    tagline: "Capital Coverage",
    metaTitle: "Packaging Supplies London | Next-Day Delivery | Bubble Wrap Shop",
    metaDescription: "Packaging supplies delivered to London next-day. All postcodes covered, timed deliveries available, bulk discounts for businesses. Bubble wrap, boxes, tape & more.",
    h1: "Packaging Supplies in London",
    heroDescription: "Comprehensive packaging delivery across London and the Southeast. Next-day service to all postcodes, timed delivery options, and competitive pricing.",
    deliveryTime: "Next Day",
    deliveryDescription: "Next-day delivery to all London postcodes. Timed delivery slots available for business addresses.",
    postcodes: ["E", "EC", "N", "NW", "SE", "SW", "W", "WC", "BR", "CR", "DA", "EN", "HA", "IG", "KT", "RM", "SM", "TW", "UB"],
    features: [
      "All London zones covered",
      "Timed delivery options",
      "Bulk order discounts",
      "Same-day courier available",
      "Business accounts",
      "Secure packaging for fragile items"
    ],
    isPrimary: false,
    faqs: [
      {
        question: "Do you deliver to Central London?",
        answer: "Yes! We deliver to all Central London postcodes including EC, WC, W, E, SE, SW, N, and NW. Next-day delivery is standard, with timed slots available for business addresses."
      },
      {
        question: "What are your London delivery charges?",
        answer: "Standard next-day delivery to London is free on orders over £50. Orders under £50 have a delivery fee of £7.99. Same-day courier service is available at additional cost."
      },
      {
        question: "Can you deliver to my London business address at a specific time?",
        answer: "Yes, we offer timed delivery slots for London business addresses including before 10:30am, before 12pm, and afternoon deliveries. Additional charges may apply."
      },
      {
        question: "How do you ensure packaging arrives safely in London?",
        answer: "All orders are professionally packed at our warehouse. We use tracked delivery services and can provide signature on delivery for valuable orders. Our carriers have excellent delivery success rates in London."
      }
    ],
    localContent: {
      businessesServed: "From Shoreditch startups to Canary Wharf corporations, we supply packaging to businesses across London. Our e-commerce customers particularly value our reliable next-day service for their fulfilment operations.",
      deliveryDetails: "London deliveries are fulfilled via our national courier network, dispatched same-day from Blackburn for next-day arrival. Timed deliveries available for businesses needing guaranteed morning delivery.",
      whyChoose: "London businesses choose us for competitive pricing without the premium of city suppliers. We offer the same wholesale rates as local customers, with reliable next-day delivery to all London postcodes."
    },
    image: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.07%20PM%20(2).jpeg",
    keywords: [
      "packaging supplies London",
      "bubble wrap London",
      "cardboard boxes London",
      "packaging delivery London",
      "wholesale packaging London",
      "packaging supplier Central London"
    ]
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
      title: location.metaTitle,
      description: location.metaDescription,
      type: "website",
      images: [{ url: location.image }],
    },
    alternates: {
      canonical: `/locations/${city}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = locationData[city];

  if (!location) {
    notFound();
  }

  // Fetch categories for the products section
  const categories = await getAllCategories();

  // LocalBusiness schema for Blackburn HQ
  const localBusinessSchema = location.isPrimary && location.address ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bubblewrapshop.co.uk/#organization",
    name: "Bubble Wrap Shop UK",
    description: "Wholesale packaging supplies including bubble wrap, cardboard boxes, tape, and protective materials",
    url: "https://bubblewrapshop.co.uk",
    telephone: location.address.phone,
    email: location.address.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      postalCode: location.address.postcode,
      addressCountry: "GB"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "53.7500",
      longitude: "-2.4833"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00"
      }
    ],
    areaServed: [
      { "@type": "City", name: "Blackburn" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "London" },
      { "@type": "Country", name: "United Kingdom" }
    ],
    priceRange: "££"
  } : null;

  // Service area schema for non-HQ locations
  const serviceAreaSchema = !location.isPrimary ? {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Packaging Supplies Delivery",
    provider: {
      "@type": "Organization",
      name: "Bubble Wrap Shop UK",
      url: "https://bubblewrapshop.co.uk"
    },
    areaServed: {
      "@type": "City",
      name: location.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.region
      }
    },
    description: location.heroDescription
  } : null;

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Schema Markup */}
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      {serviceAreaSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          {/* Breadcrumbs */}
          <div className="py-4">
            <Breadcrumbs
              items={[
                { label: "Locations", href: "/locations" },
                { label: location.city }
              ]}
              variant="light"
            />
          </div>

          {/* Hero Content */}
          <div className="py-10 md:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{location.tagline}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  {location.h1}
                </h1>

                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                  {location.heroDescription}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{location.deliveryTime} Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    <span>Free over £50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Trade Accounts</span>
                  </div>
                </div>
              </div>

              {/* Location Image */}
              <div className="w-full max-w-sm lg:max-w-md shrink-0">
                <div className="aspect-square relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <Image
                    src={location.image}
                    alt={`Packaging delivery to ${location.city}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{location.deliveryTime} Delivery</p>
                          <p className="text-xs text-muted-foreground">{location.deliveryDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-4 md:py-5 px-4 flex flex-col items-center text-center">
              <Truck className="w-6 h-6 text-emerald-600 mb-2" />
              <span className="font-medium text-foreground text-sm">Fast Delivery</span>
              <span className="text-xs text-muted-foreground hidden md:block">{location.deliveryTime} to {location.city}</span>
            </div>
            <div className="py-4 md:py-5 px-4 flex flex-col items-center text-center">
              <Shield className="w-6 h-6 text-emerald-600 mb-2" />
              <span className="font-medium text-foreground text-sm">Quality Assured</span>
              <span className="text-xs text-muted-foreground hidden md:block">Premium materials</span>
            </div>
            <div className="py-4 md:py-5 px-4 flex flex-col items-center text-center">
              <Star className="w-6 h-6 text-emerald-600 mb-2" />
              <span className="font-medium text-foreground text-sm">Trusted Supplier</span>
              <span className="text-xs text-muted-foreground hidden md:block">1000+ businesses served</span>
            </div>
            <div className="py-4 md:py-5 px-4 flex flex-col items-center text-center">
              <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
              <span className="font-medium text-foreground text-sm">Trade Accounts</span>
              <span className="text-xs text-muted-foreground hidden md:block">Credit terms available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Coverage */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Postcodes Covered */}
          <div className="bg-secondary/30 rounded-2xl p-6 md:p-8 border border-border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-emerald-600" />
              Postcodes We Cover
            </h2>
            <p className="text-muted-foreground mb-6">
              {location.deliveryDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {location.postcodes.map((postcode, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                >
                  {postcode}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-secondary/30 rounded-2xl p-6 md:p-8 border border-border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              {location.city} Delivery Features
            </h2>
            <div className="grid gap-3">
              {location.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Local Content Section */}
      <div className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-16 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Why {location.city} Businesses Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Local Businesses Served</h3>
              <p className="text-sm text-muted-foreground">{location.localContent.businessesServed}</p>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Delivery Details</h3>
              <p className="text-sm text-muted-foreground">{location.localContent.deliveryDetails}</p>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Why Choose Us</h3>
              <p className="text-sm text-muted-foreground">{location.localContent.whyChoose}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        {/* Section Header with View All link for desktop */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Popular Products for {location.city}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Browse our range of packaging supplies with {location.deliveryTime.toLowerCase()} delivery to {location.city}
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden md:inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors shrink-0"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories?.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-emerald-500/50 hover:shadow-lg transition-all"
            >
              <div className="aspect-square relative overflow-hidden bg-secondary/30">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {location.deliveryTime} to {location.city}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Prominent CTA Button - visible on all devices */}
        <div className="mt-10 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            View All Categories
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 md:py-16 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {location.city} Delivery FAQs
            </h2>
            <p className="text-muted-foreground">
              Common questions about our {location.city} delivery service
            </p>
          </div>

          <div className="space-y-4">
            {location.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-background rounded-xl border border-border overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Other Locations */}
      <div className="py-12 md:py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Other Delivery Locations
            </h2>
            <p className="text-muted-foreground">
              We deliver packaging supplies across the UK
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(locationData)
              .filter(([slug]) => slug !== city)
              .map(([slug, loc]) => (
                <Link
                  key={slug}
                  href={`/locations/${slug}`}
                  className="group bg-secondary/30 rounded-2xl p-6 border border-border hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                        {loc.city}
                      </h3>
                      <p className="text-sm text-muted-foreground">{loc.region}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{loc.deliveryTime} delivery</p>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-4">
            <Warehouse className="w-4 h-4" />
            <span>Packaging Supplies for {location.city}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Order?
          </h2>

          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Get {location.deliveryTime.toLowerCase()} delivery on packaging supplies to {location.city}.
            Trade accounts available with credit terms.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Trade Accounts
            </Link>
          </div>

          {location.address && (
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm mb-2">Visit our warehouse</p>
              <p className="text-white font-medium">
                {location.address.street}, {location.address.city}, {location.address.postcode}
              </p>
              <div className="flex items-center justify-center gap-6 mt-4 text-white/80">
                <a href={`tel:${location.address.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" />
                  {location.address.phone}
                </a>
                <a href={`mailto:${location.address.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" />
                  {location.address.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
