import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common";
import {
  Leaf,
  Recycle,
  Sprout,
  Earth,
  ArrowRight,
  ArrowLeft,
  Package,
  ShieldCheck,
  TrendingDown,
  Users,
  PackageCheck,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

export const metadata: Metadata = {
  title: "Sustainable Packaging Supplies UK: Eco-Friendly Bubble Wrap",
  description:
    "Discover eco-friendly packaging supplies in the UK. Buy bubble wrap online, wholesale protective packaging, and sustainable shipping at Bubblewrapshop.",
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
  ],
  openGraph: {
    title:
      "Sustainability - Eco-Friendly Packaging Solutions | Bubble Wrap Shop",
    description:
      "Learn about our commitment to sustainability and eco-friendly packaging solutions. Discover our range of recyclable and biodegradable packaging materials.",
    url: `${siteUrl}/sustainability`,
  },
  alternates: {
    canonical: `${siteUrl}/sustainability`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SustainabilityPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-emerald-100/40 to-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-emerald-100/40 to-emerald-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Breadcrumbs */}
      <div className="relative z-10 border-b border-emerald-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-6">
          <Breadcrumbs
            items={[{ label: "Sustainability", href: "/sustainability" }]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
              Back to Home
            </Button>
          </Link>

          {/* Page Header */}
          <div className="mb-16 md:mb-20 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-linear-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-full">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                Our Commitment
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-900">Sustainability &</span>
              <span className="block bg-linear-to-r from-emerald-600 via-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-2">
                Our Commitment to the Planet
              </span>
            </h1>

            <p className="text-lg text-gray-600 md:text-xl max-w-3xl mx-auto leading-relaxed">
              Protecting your products and our planet
            </p>
          </div>

          {/* Intro Section */}
          <div className="mb-20 relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-600 p-8 md:p-10 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative">
              <p className="text-base leading-relaxed text-white md:text-lg">
                We understand at Bubblewrapshop.co.uk that responsible business
                entails considering more than packaging - it entails
                consideration of the surroundings, communities and future of
                sustainable business. As a major supplier of packaging supplies
                UK, inclusive of a wholesale bubble wrap supplier UK, we have a
                natural urge to minimize our environmental effects as we keep on
                providing reliability, protection to our clients and value.
              </p>
              <p className="text-base leading-relaxed text-white/90 md:text-lg mt-4">
                What we intend to do is easy to understand, which is to provide
                eco-friendly bubble wrap UK, protective packaging for shipping
                UK with perfect performance or sustainability.
              </p>
            </div>
          </div>

          {/* Sustainability Principles */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Sustainability by Design
                <span className="block bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-2">
                  What It Means for Us
                </span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Sustainability is not just a buzzword at Bubblewrapshop, but it
                is in all that we do; in how we choose our products, the methods
                in which we do our packaging, our logistics and our corporate
                ethics.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Recycle className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Reduce Waste
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  We constantly strive to minimise the amount of packaging and
                  resource optimisation. We intend to minimize the waste and not
                  to violate the safety and security of your items, either
                  anti-static bubble wrap UK to protect electronics or foam
                  packaging rolls UK to protect fragile components.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Sprout className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Use Recyclable & Recycled Materials
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  We carefully select our packaging materials to consist of
                  products manufactured with recycled content and intended for
                  recycling. In eco-friendly bubble wrap UK, recyclable mailing
                  bags, stretch film, and boxes, we have selected partners, the
                  materials of which contribute to the circular supply chains.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Leaf className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Source Responsibly
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  We also assess our suppliers well to make sure that none of
                  them has been involved in unethical sourcing or environmental
                  degradation practices. This strategy would work with all the
                  categories, like stretch film wrap UK, edge protection
                  packaging UK and fragile tape UK.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Earth className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Educate and Empower Our Customers
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  It is not only the sustainable products we offer, but we also
                  assist your decision-making process to be sustainable.
                  Informative guides, clear product descriptions, and a glimpse
                  into how packaging materials affect the environment make us
                  give you the power to select packaging which supports your
                  values and business objectives.
                </p>
              </div>
            </div>
          </div>

          {/* Packaging Protection Section */}
          <div className="mb-20 border-t border-emerald-200 pt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-linear-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-full">
                <Package className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  Sustainable Solutions
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Packaging That Protects
                <span className="block bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Goods and the Planet
                </span>
              </h2>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-emerald-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Package className="w-6 h-6 text-emerald-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 pr-16">
                  Eco-Friendly Bubble Wrap
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  The eco-bubble wrap UK collection is made of the same
                  high-quality protective material as the conventional bubble
                  wrap, with a smaller environmental impact. We have the options
                  that save a lot of waste and can be used with reliability,
                  whether you need standard bubble wrap, high-tech anti-static
                  bubble wrap UK to use on delicate electronics or high-volume
                  requirements bottles to use rolls of bubble wrap wholesale.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-emerald-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Recycle className="w-6 h-6 text-emerald-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 pr-16">
                  Recyclable Protective Packaging
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 mb-4">
                  In addition to bubble wrap, we also have a lot of other
                  protective packaging materials that can be recycled easily by
                  the user in a responsible manner. These include:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>
                      Edge Protection Packaging UK was manufactured using
                      materials that could be recycled.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>
                      Stretch Film Wrap UK was designed to be used with minimal
                      waste.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Recyclable Mailing Bags Wholesale UK.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>
                      Fragile Tape UK and tapes produced using backing made
                      using recyclable materials.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative p-6 bg-linear-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl border border-emerald-100 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-500 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Our Commitment to Sustainability
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    We are constantly analyzing and increasing our products and
                    products which we consider to have a good balance of
                    protection and sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Sustainable Packaging Matters */}
          <div className="mb-20 border-t border-emerald-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Sustainable Packaging
                <span className="block bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Matters for Shipping
                </span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                In today&apos;s marketplace, where e-commerce is booming and
                delivery expectations are high, packaging plays a central role
                in both customer satisfaction and environmental impact.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <PackageCheck
                    className="h-7 w-7 text-white"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Protecting Your Products
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Proper packaging will make sure that you receive intact
                  products. The cost of damage is greatly reduced because of
                  such things as anti-static bubble wrap UK of electronic goods,
                  custom foam packaging rolls UK of delicate goods and good
                  quality boxes which are used to transport goods with care.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <TrendingDown
                    className="h-7 w-7 text-white"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Reducing Environmental Footprint
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Lighter, recyclable and responsibly sourced materials assist
                  in the reduction of carbon emissions through shipping. When
                  using sustainable packaging, your business will have a chance
                  to reduce transport energy consumption, minimize the
                  contribution to landfills, and earn brand recognition among
                  customers who care about the environment.
                </p>
              </div>
            </div>
          </div>

          {/* Working with Responsible Supplier */}
          <div className="mb-20 border-t border-emerald-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Working with a
                <span className="block bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Responsible Supplier
                </span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Being a wholesale bubble wrap manufacturer in the UK, we
                consider ourselves to go beyond of being a distributor but as a
                collaborator in your sustainability efforts.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Package className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Bulk & Wholesale Solutions
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 mb-3">
                  Our approach includes offering bubble wrap rolls wholesale UK
                  and other materials in bulk to:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Reduce per-unit packaging waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Minimise transportation emissions per product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Provide cost savings for your business</span>
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-gray-600 mt-3">
                  Placing an order in bulk also implies a reduction in the
                  number of shipments in general, which might lead to a smaller
                  size of your carbon footprint in the long run.
                </p>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <TrendingDown
                    className="h-7 w-7 text-white"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Affordable Sustainable Options
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Being a provider of cheap bubble wraps in the UK, we can
                  appreciate that sustainability does not need to be costly.
                  This is the reason why we strive to maintain competitive
                  prices with materials that meet the environmental requirements
                  without negative effects on performance.
                </p>
              </div>
            </div>
          </div>

          {/* Recycling & Reuse Support */}
          <div className="mb-20 border-t border-emerald-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How We Support
                <span className="block bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                  Recycling & Reuse
                </span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Recycling does not come to an end when the item is delivered to
                the warehouse, but begins there.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Recycle className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Smart Packaging Choices
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 mb-3">
                  We present straightforward details on the recycling or reuse
                  of each product where feasible. This includes:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Detecting recycling items on product pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Promoting the use of protective materials again</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>
                      Helping customers to dispose of packaging materials in the
                      most appropriate way
                    </span>
                  </li>
                </ul>
              </div>

              <div className="group relative space-y-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Users className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Recycling Partnerships
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  We are constantly building and reinforcing alliances with
                  recycling plants and initiatives that collect and recycle
                  packaging paper, plastic, and films.
                </p>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="mb-20 border-t border-emerald-200 pt-16">
            <div className="relative p-8 md:p-10 bg-linear-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl border border-emerald-200 shadow-lg">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Sustainability Resources & Guidance
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700 mb-4">
                    We think that knowledge is important in making better
                    decisions. That&apos;s why we provide:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Sustainable packaging instructional manuals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>How to be smarter in packing waste-free</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        Recycling advisory on the best practices in packaging
                        materials
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm leading-relaxed text-gray-700 mt-4">
                    New to sustainable packaging or just trying to polish your
                    operations, our resources should help improve the
                    environmental performance of your operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us Section */}
          <div className="mb-20 border-t border-emerald-200 pt-16">
            <div className="relative overflow-hidden p-8 md:p-12 bg-linear-to-br from-emerald-600 to-emerald-600 rounded-2xl shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

              <div className="relative text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  Join Us on the Sustainability Journey
                </h2>
                <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
                  At BubbleWrapShop.co.uk, sustainability isn&apos;t a trend;
                  it&apos;s a commitment. From eco-friendly bubble wrap UK to
                  protective packaging for shipping UK, from bubble wrap rolls
                  wholesale UK to recyclable mailing bags and foam packaging,
                  we&apos;re here to help your business thrive while protecting
                  the planet.
                </p>
                <p className="text-base text-white/90 leading-relaxed">
                  Whether you&apos;re here to buy bubble wrap online UK for your
                  business, find a wholesale bubble wrap supplier UK, or access
                  affordable sustainable packaging from a cheap bubble wrap UK
                  supplier, you&apos;ll find expert guidance, quality products,
                  and a partner dedicated to long-term sustainable impact.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">
                  <Leaf className="w-5 h-5 text-white" />
                  <span className="text-sm font-semibold text-white">
                    Let&apos;s protect what matters: your products, your
                    profits, and the planet.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <section className="relative bg-linear-to-br from-emerald-600 to-emerald-600 py-20 md:py-28 lg:py-32 overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-white">Shop Our</span>
                  <span className="block text-white/90 mt-2">
                    Eco-Friendly Products
                  </span>
                </h2>

                <p className="mb-10 text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed lg:mb-12">
                  Discover our selection of sustainable packaging solutions
                </p>

                <Button
                  asChild
                  variant="ghost"
                  className="w-fit group p-0 h-auto hover:bg-transparent"
                >
                  <Link
                    href="/products"
                    className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-emerald-700 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-100"
                  >
                    <span className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">View Eco-Friendly Products</span>
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
