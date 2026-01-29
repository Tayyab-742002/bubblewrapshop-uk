import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { getFeaturedProductsList } from "@/services/products/product.service";

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProductsList();

  return (
    <section className="w-full py-16 md:py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        {/* Minimalist Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-foreground">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
              Our most popular packaging essentials, curated for quality and reliability.
            </p>
          </div>

          <Button asChild variant="ghost" className="hidden sm:inline-flex items-center gap-2 text-foreground hover:text-primary hover:bg-transparent px-0 group">
            <Link href="/products" className="text-sm font-medium border-b border-transparent hover:border-primary pb-0.5 transition-all">
              View All
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Grid Layout - Clean & Breathable */}
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-y border-dashed border-border/50">
            <div className="p-4 rounded-full bg-muted/50 mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>

            <h3 className="text-lg font-medium text-foreground mb-1">
              Collection updating
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Our curated selection is currently being refreshed.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}