import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, ContentCarousel } from "@/components/common";
import { getAllBlogPosts, getAllGuides } from "@/sanity/lib";
import {
  ArrowRight,
  Leaf,
  Package,
  Users,
  Award,
  TrendingUp,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Store,
  Target,
  CheckCircle,
  Box,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

// 2026 SEO: About page with Blackburn location and EEAT signals
export const metadata: Metadata = {
  title: "About Us | Family-Run Packaging Supplier in Blackburn | Bubble Wrap Shop",
  description:
    "Family-run packaging supplier based in Blackburn, Lancashire since 2015. Bubble Wrap Shop provides wholesale bubble wrap, mailing bags & boxes with next-day UK delivery. 5-star rated.",
  keywords: [
    "about bubble wrap shop",
    "packaging supplier Blackburn",
    "family-run packaging UK",
    "wholesale bubble wrap supplier Lancashire",
    "packaging company Blackburn",
    "bubble wrap Blackburn",
    "UK packaging supplier",
    "eco-friendly packaging UK",
  ],
  openGraph: {
    title: "About Bubble Wrap Shop | Family-Run Packaging Supplier in Blackburn",
    description:
      "Family-run packaging supplier from Blackburn, Lancashire. Wholesale bubble wrap, boxes & mailing bags with next-day UK delivery since 2015.",
    url: `${siteUrl}/about`,
    siteName: "Bubble Wrap Shop",
    images: [`${siteUrl}/og-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Bubble Wrap Shop | Blackburn Packaging Supplier",
    description:
      "Family-run packaging supplier from Blackburn. Wholesale pricing, next-day UK delivery since 2015.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default async function AboutPage() {
  // Fetch blogs and guides for carousel
  const [blogPosts, guides] = await Promise.all([
    getAllBlogPosts(),
    getAllGuides(),
  ]);

  // Transform data for carousel
  const carouselBlogs = (blogPosts || []).slice(0, 3).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    category: post.category,
    readTime: post.readTime,
    type: "blog" as const,
  }));

  const carouselGuides = (guides || []).slice(0, 3).map((guide) => ({
    id: guide.id,
    title: guide.title,
    slug: guide.slug,
    excerpt: guide.excerpt,
    featuredImage: guide.featuredImage,
    category: typeof guide.category === "string" ? guide.category : "",
    readTime: guide.readTime,
    type: "guide" as const,
  }));

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
        name: "About",
        item: `${siteUrl}/about`,
      },
    ],
  };

  // Organization schema for EEAT
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bubble Wrap Shop",
    legalName: "Bubble wrap shop (Blackburn) Limited",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpg`,
    foundingDate: "2015",
    foundingLocation: {
      "@type": "Place",
      name: "Blackburn, Lancashire, UK",
    },
    description:
      "Family-run packaging supplier based in Blackburn, Lancashire. We provide wholesale bubble wrap, mailing bags, cardboard boxes, and protective packaging with next-day UK delivery.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "Lancashire",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-1254-916167",
      contactType: "Customer Service",
      areaServed: "GB",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/people/Bubble-Wrap-Shop/61568200401222/",
      "https://www.instagram.com/bubblewrapshop",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "City", name: "Blackburn" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "London" },
      { "@type": "City", name: "Birmingham" },
      { "@type": "City", name: "Leeds" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    knowsAbout: [
      "Bubble wrap packaging",
      "Protective packaging materials",
      "Wholesale packaging supplies",
      "Eco-friendly packaging",
      "E-commerce shipping solutions",
    ],
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
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
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-100/40 to-emerald-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Breadcrumbs */}
      <div className="relative z-10 border-b border-emerald-400 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-6">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden md:h-[600px] lg:h-[700px]">
        <Image
          src="https://images.unsplash.com/photo-1736979110904-d9d9efb35cf6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
          alt="Professional packaging workspace"
          fill
          quality={75}
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 750px"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-emerald-900/40 to-emerald-900/60" />
        <div className="container relative mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8 max-w-[1600px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">
              <Package className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Family-Run Since 2015</span>
            </div>
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
              About Bubble Wrap Shop
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              Family-Run Packaging Supplier from Blackburn, Lancashire
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/" aria-label="Back to Home">
            <Button
          
              variant="ghost"
              size="sm"
              className="mb-8 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
              Back to Home
            </Button>
          </Link>

          {/* Intro Section */}
          <div className="mb-20 relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-600 p-8 md:p-10 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative">
              <p className="text-base leading-relaxed text-white md:text-lg mb-4">
                At Bubble Wrap Shop, we focus on providing high-quality packaging supplies in the UK to keep products safe and facilitate smooth shipments, thereby enhancing sustainable business practices. Startups, e-commerce enterprises, warehouses, and logistics companies, we will pack, ship, and store with confidence.
              </p>
              <p className="text-base leading-relaxed text-white/90 md:text-lg">
                Being a trusted wholesale bubble wrap supplier UK, we have a mission that is easy, namely, to make it convenient to make purchases to buy bubble wrap online in the UK and to have professional protective packaging that can be purchased at affordable rates, at the cost of either quality or sustainability.
              </p>
            </div>
          </div>

          {/* Who We Are */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-400 rounded-full">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Our Story</span>
              </div>
              
              <h2 className="text-3xl uppercase sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Who We
                <span className="block bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Are
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-gray-700 md:text-lg bg-white rounded-2xl p-8 shadow-lg border border-gray-300">
              <p>
                Bubble Wrap Shop is a packaging supplier, a UK-based company which has been developed focusing on efficiency, reliability and value. We realize that packaging is not merely a case or a wrapping, but it is an important aspect of your supply chain.
              </p>
              <p>
                This is the reason why we provide an extensive list of protective packing to ship in the UK in the form of bubble wraps in rolls, foam wraps in rolls, mail bags, tapes, stretch film wrap, and edge wrap protection. Our products have all been chosen to suit the requirements of packing in a real-world setting.
              </p>
              <p>
                You may be moving delicate goods, you could have had large orders, or you could have day-to-day goods, and we supply cheap bubble wrap from a UK supplier that you can rely upon; you are not going to have to compromise on corners cut.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-300 text-center group hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Users className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-300 text-center group hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Package className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
              <div className="text-sm text-gray-600">Product Categories</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-300 text-center group hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-300 text-center group hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Award className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">99%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>

          {/* What We Supply */}
          <div className="mb-20 border-t border-emerald-400 pt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-400 rounded-full">
                <Box className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Our Products</span>
              </div>
              
              <h2 className="text-3xl uppercase sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What We
                <span className="block bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Supply
                </span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We have the full line of packaging materials that the UK businesses can depend on in order to protect, be durable, and easy to use.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Package className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Bubble Wrap & Protective Packaging
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>High-volume packing: Bubble wrap rolls, UK, in bulk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>Eco-bubble wrap UK products in recyclable materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>Electronic and sensitive anti-static bubble wrap UK</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Essential for e-commerce shipping, removals, and industrial purposes.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Foam & Edge Protection Solutions
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>Foam packaging rolls UK for polished or fragile items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>Edge protection packaging UK for furniture, glass, panels</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Superior shock absorption for manufacturing, warehousing, and logistics.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Box className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Stretch Film, Tapes & Mailing
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>Stretch film wrap UK for pallet wrapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>Fragile tape, UK packing tape and speciality adhesives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>Mailing bags wholesale UK for clothing shipments</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Source everything from one reliable supplier.
                </p>
              </div>
            </div>
          </div>

          {/* Sustainability */}
          <div className="mb-20 border-t border-emerald-400 pt-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-8 md:p-10 border border-emerald-300 shadow-lg">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Sustainable Packaging That Makes Sense
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700 mb-4">
                    We operate on the concept of sustainability. To stay afloat in the market, we keep adding to our selection of green bubble wrap UK and recyclable waste.
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 mb-4">
                    Sustainability is our method and involves:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Possible recyclable and less-plastic packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Accountable production and supply</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Awareness of waste and maximum protection in packaging design</span>
                    </li>
                  </ul>
                  <p className="text-base leading-relaxed text-gray-700 mt-4">
                    In our opinion, businesses should not be left with the task of making a decision between sustainability and performance. We protect your goods shipping in, and you do not have to decide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20 border-t border-emerald-400 pt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-400 rounded-full">
                <Target className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Our Advantages</span>
              </div>
              
              <h2 className="text-3xl uppercase sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose
                <span className="block bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Bubble Wrap Shop?
                </span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Packaging suppliers are numerous, but this is what makes us stand out
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Globe className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  UK-Based & Business-Focused
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  We have knowledge about UK logistics, delivery schedules and business requirements. Our products are tailored to the UK market.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Wholesale Pricing & Bulk Discounts
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  We are a wholesale bubble wrap in the UK, and therefore we provide automatic bulk pricing that best suits growing companies and bulk packers.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Store className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Easy Online Ordering
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Buy bubble wrap online UK cheaply and safely, with their product details and checkouts being easy.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Quality You Can Rely On
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Bubble wrap or stretch film, all these products are tested in terms of their durability, consistency, and performance.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300 md:col-span-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Truck className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Fast UK Delivery
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  The dependability of the delivery within the UK will ensure that your packaging resources will be delivered when you should receive them.
                </p>
              </div>
            </div>
          </div>

          {/* Industries We Serve */}
          <div className="mb-20 border-t border-emerald-400 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl uppercase sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Supporting Businesses
                <span className="block bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Across the UK
                </span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We have customers that are as small as online sellers and all the way to national distributors. When you require a single roll of bubble wrap or a continuous supply of bubbles, we are able to assist your business.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl p-8 border border-emerald-300 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Industries we serve include:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-300 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">E-commerce & retail</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-300 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Warehousing & logistics</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-300 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Manufacturing</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-300 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Office & commercial</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-300 shadow-sm md:col-span-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Removal and storage services</span>
                </div>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div className="mb-20 border-t border-emerald-400 pt-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-600 p-8 md:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
              
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Our Commitment to Quality & Value
                </h2>
                <p className="text-base leading-relaxed text-white/90 mb-4">
                  We are aware that packaging is an important issue. It is why we cater to providing cheap bubble wrap with one of the suppliers back in the UK without compromising on the strength and its ability to work.
                </p>
                <p className="text-base leading-relaxed text-white/90 mb-6">
                  Through collaboration with manufacturers and optimization of our supply chain, we will make sure:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-sm font-semibold text-white">Competitive pricing</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-sm font-semibold text-white">Consistent stock availability</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-sm font-semibold text-white">Professional-grade materials</span>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-white/90 mt-6">
                  Our goal is long-term partnerships, not one-time orders.
                </p>
              </div>
            </div>
          </div>

          {/* Pack Smarter Section */}
          <div className="mb-20 border-t border-emerald-400 pt-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl uppercase sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pack Smarter with
                <span className="block bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Bubble Wrap Shop
                </span>
              </h2>
              <p className="text-base leading-relaxed text-gray-700 md:text-lg mb-6">
                We are not only a supplier at the Bubble Wrap Shop, but we are also a packaging partner. Bubble wrap rolls wholesale UK to Specialist protective materials: It is easier, safer, and greener to make packaging smoother.
              </p>
              <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                You are in the correct place in the event that you are seeking a reliable warehouse to purchase your buy bubble wrap online in the UK, get your greenish packaging, and enjoy the advantages of wholesale costs.
              </p>
            </div>
          </div>

          {/* Resources Carousel */}
          {(carouselBlogs.length > 0 || carouselGuides.length > 0) && (
            <div className="mb-20 border-t border-emerald-400 pt-16">
              <ContentCarousel
                blogs={carouselBlogs}
                guides={carouselGuides}
                title="Packaging Resources"
                subtitle="Learn from our expert guides and tips"
              />
            </div>
          )}

          {/* CTA Section */}
          <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-600 py-20 md:py-28 lg:py-32 overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-white">Explore Our Complete</span>
                  <span className="block text-white/90 mt-2">Product Catalog</span>
                </h2>

                <p className="mb-10 text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed lg:mb-12">
                  Discover our full range of premium packaging solutions, from eco-friendly materials to custom packaging options. Bulk pricing available on all products.
                </p>

                <Button asChild variant="ghost" className="w-fit group p-0 h-auto hover:bg-transparent" >
                  <Link
                  aria-label="View All Products"
                    href="/products"
                    className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-emerald-700 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-100"
                  >
                    <span className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">View All Products</span>
                    <ArrowRight
                      className="relative h-5 w-5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}