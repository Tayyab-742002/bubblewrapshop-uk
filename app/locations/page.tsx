import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import {
  MapPin,
  Truck,
  Clock,
  Phone,
  ArrowRight,
  Building2,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery Locations | Bubble Wrap Shop UK",
  description: "We deliver packaging supplies across the UK from our Blackburn warehouse. Next-day delivery to Manchester, London, and nationwide. Trade accounts available.",
  keywords: [
    "packaging supplies delivery UK",
    "bubble wrap delivery Manchester",
    "packaging materials London",
    "wholesale packaging Blackburn",
    "next day packaging delivery"
  ],
  openGraph: {
    title: "Delivery Locations | Bubble Wrap Shop UK",
    description: "We deliver packaging supplies across the UK from our Blackburn warehouse. Next-day delivery to Manchester, London, and nationwide.",
    type: "website",
  },
  alternates: {
    canonical: "/locations",
  },
};

const locations = [
  {
    city: "Blackburn",
    slug: "blackburn",
    region: "Lancashire",
    tagline: "Our Headquarters",
    description: "Visit our warehouse in Blackburn for trade collection or same-day local delivery across Lancashire.",
    deliveryTime: "Same Day",
    postcodes: ["BB1", "BB2", "BB3", "BB4", "BB5", "BB6"],
    isPrimary: true,
    features: [
      "Trade counter open Mon-Fri",
      "Same-day collection available",
      "Wholesale pricing",
      "Free parking"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
  },
  {
    city: "Manchester",
    slug: "manchester",
    region: "Greater Manchester",
    tagline: "Next-Day Delivery Hub",
    description: "Fast delivery to Manchester and Greater Manchester. Just 30 minutes from our Blackburn warehouse.",
    deliveryTime: "Next Day",
    postcodes: ["M1-M90", "OL", "SK", "WN", "BL"],
    isPrimary: false,
    features: [
      "Next-day delivery guaranteed",
      "Free delivery over £50",
      "Morning delivery slots",
      "Business accounts"
    ],
    image: "https://images.unsplash.com/photo-1515168985652-eb699d264ca7?w=800&q=80"
  },
  {
    city: "London",
    slug: "london",
    region: "Greater London & Southeast",
    tagline: "Capital Coverage",
    description: "Comprehensive delivery across London and the Southeast. Next-day service for all postcodes.",
    deliveryTime: "Next Day",
    postcodes: ["All London postcodes", "SE", "SW", "E", "W", "N", "NW"],
    isPrimary: false,
    features: [
      "All London zones covered",
      "Timed delivery options",
      "Bulk order discounts",
      "Same-day courier available"
    ],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
  }
];

// Schema markup for the locations page
const locationsSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bubble Wrap Shop UK",
  description: "Wholesale packaging supplies delivered across the UK from Blackburn, Lancashire",
  url: "https://bubblewrapshop.co.uk",
  areaServed: [
    {
      "@type": "City",
      name: "Blackburn",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lancashire"
      }
    },
    {
      "@type": "City",
      name: "Manchester",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    {
      "@type": "City",
      name: "London",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    }
  ]
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsSchema) }}
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
              items={[{ label: "Delivery Locations" }]}
              variant="light"
            />
          </div>

          {/* Hero Content */}
          <div className="py-10 md:py-16 lg:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
              <Truck className="w-4 h-4" />
              <span>UK-Wide Delivery from Blackburn</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Packaging Supplies<br />Delivered Nationwide
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              From our Blackburn warehouse to your door. Same-day local delivery,
              next-day service across the UK, and competitive trade pricing.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>3 Key Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Next-Day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>Trade Accounts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={location.image}
                  alt={`${location.city} delivery coverage`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {location.isPrimary && (
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    HQ
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-emerald-700">
                  {location.deliveryTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {location.city}
                    </h2>
                    <p className="text-sm text-muted-foreground">{location.region}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {location.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {location.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Coverage Map Section */}
      <div className="bg-secondary/30 border-y border-border py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              UK-Wide Coverage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver to all UK postcodes. Orders placed before 2pm ship same-day
              for next-day delivery to most mainland addresses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Same-Day Dispatch</h3>
              <p className="text-sm text-muted-foreground">
                Orders before 2pm dispatched same day from our Blackburn warehouse
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over £50 to mainland UK addresses
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Trade Accounts</h3>
              <p className="text-sm text-muted-foreground">
                Regular customers enjoy credit terms and priority dispatch
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-4">
            <Phone className="w-4 h-4" />
            <span>Questions About Delivery?</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Packaging Supplies?
          </h2>

          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Get in touch for trade pricing, bulk orders, or to discuss your packaging requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wholesale"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Trade Accounts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
