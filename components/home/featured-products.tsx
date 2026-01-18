import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { getFeaturedProductsList } from "@/services/products/product.service";

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProductsList();

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-linear-to-b from-white via-gray-50/30 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-br from-emerald-100/40 to-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-emerald-100/40 to-emerald-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              FEATURED
              <span className="block bg-linear-to-r from-emerald-600 via-emerald-600 to-emerald-600 bg-clip-text text-transparent mt-1">
                PRODUCTS
              </span>
            </h2>
          </div>
          
          <Button asChild variant="ghost" className="w-fit group p-0 h-auto hover:bg-transparent">
            <Link
              href="/products"
              className="relative overflow-hidden flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-linear-to-r from-emerald-600 to-emerald-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200 hover:scale-105 active:scale-100"
            >
              <span className="absolute inset-0 bg-linear-to-r from-emerald-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">View All Products</span>
              <ArrowRight
                className="relative h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
          </Button>
        </div>

        {/* Grid Layout */}
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-emerald-100 to-emerald-100 flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-linear-to-br from-emerald-400 to-emerald-400 rounded-full animate-pulse" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No featured products yet
            </h3>
            <p className="text-base text-gray-600 max-w-md">
              Check back soon for our curated selection of premium packaging supplies.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}