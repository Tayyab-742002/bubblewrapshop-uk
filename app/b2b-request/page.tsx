import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Briefcase,
  Package,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { B2BRequestForm } from "@/components/b2b/b2b-request-form";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

export const metadata: Metadata = {
  title: "B2B Packaging Supplies UK: Wholesale Bubble Wrap Supplier",
  description:
    "Get a B2B account to access wholesale packaging supplies UK. Buy bubble wrap online UK, eco-friendly packaging, bulk pricing & fast business delivery.",
  keywords: [
    "wholesale packaging UK",
    "B2B packaging",
    "bulk packaging supplies",
    "corporate packaging",
    "business packaging supplies",
    "wholesale bubble wrap",
    "bulk cardboard boxes",
    "packaging wholesale UK",
    "B2B packaging supplier",
    "corporate packaging UK",
    "bulk order packaging",
    "wholesale packaging prices",
    "business packaging solutions",
    "buy bubble wrap online UK",
    "bubble wrap rolls bulk",
    "eco-friendly packaging UK",
  ],
  openGraph: {
    title: "B2B Packaging Supplies UK: Wholesale Bubble Wrap Supplier",
    description:
      "Get a B2B account to access wholesale packaging supplies UK. Buy bubble wrap online UK, eco-friendly packaging, bulk pricing & fast business delivery.",
    url: `${siteUrl}/b2b-request`,
  },
  alternates: {
    canonical: `${siteUrl}/b2b-request`,
  },
};

export default function B2BRequestPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Breadcrumbs */}
      <div className="relative z-10 border-b-2 border-emerald-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "B2B Request", href: "/b2b-request" },
            ]}
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
          <div className="mb-12 md:mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-400 rounded-full">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                B2B Solutions
              </span>
            </div>
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Request a Custom Quote
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Need bulk packaging supplies? Get competitive wholesale pricing
              for your business. Fill out the form below and our team will
              provide a custom quote within 1-2 business days.
            </p>
          </div>

          {/* Why a B2B Account Matters Section */}
          <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-600 p-8 md:p-10 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Why a B2B Account Matters?
              </h2>
              <p className="text-base leading-relaxed text-white md:text-lg mb-4">
                A B2B account with Bubble Wrap Shop provides businesses with easy
                access to high-quality, affordable packaging solutions in the UK
                for use when volume and repeat purchases are needed. Whatever your
                regular group of purchasing bubble wraps on the internet in the
                UK, or would like to have bubble wrap rolls in bulk, or need to
                make sure you can always have access to the protective wrapping
                when shipping UK, a specific B2B arrangement will give you
                improved pricing, first-dry access to bubble wrap, and easier
                order management.
              </p>
              <p className="text-base leading-relaxed text-white/90 md:text-lg">
                We are a professional wholesale bubble wrap
                supplier in the UK and offer scalable solutions, eco-friendly and
                reliable UK delivery, and a solution that helps you cut packaging
                costs while maintaining quality and efficiency throughout your
                operations.
              </p>
            </div>
          </div>

          {/* Link to Wholesale Page */}
          <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-8 border border-emerald-300 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  New to Wholesale?
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Learn more about our bulk pricing, benefits, and how our wholesale program works for your business.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button asChild variant="ghost" aria-label="Wholesale Information" className="group p-0 h-auto hover:bg-transparent">
                  <Link
                    href="/wholesale"
                    className="relative overflow-hidden inline-flex items-center gap-3 px-6 py-3 text-white font-semibold text-white bg-emerald-600 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-100"
                  >
                    <span className="absolute inset-0 bg-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">Visit Wholesale Page</span>
                    <ArrowRight
                      className="relative h-5 w-5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid gap-4 md:grid-cols-3 mb-12">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  Save Up to 40%
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Competitive bulk pricing for large orders
              </p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  Custom Solutions
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Tailored packaging solutions for your needs
              </p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  Fast Response
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Get a quote within 1-2 business days
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border border-gray-300">
            <B2BRequestForm />
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              Have questions?{" "}
              <Link
                href="/contact"
                className="text-emerald-800 hover:text-emerald-700 font-semibold underline"
              >
                Contact our sales team
              </Link>{" "}
              or call us at{" "}
              <a
                href="tel:01254916167"
                className="text-emerald-800 hover:text-emerald-700 font-semibold"
              >
                01254 916167
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
