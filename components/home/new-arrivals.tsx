import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { getNewArrivalsList } from "@/services/products/product.service";

export async function NewArrivals() {
  const newArrivals = await getNewArrivalsList();

  return (
    <section className="relative py-16 md:py-24 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">

        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Fresh additions to our packaging line, engineered for protection and sustainability.
            </p>
          </div>

          <Button asChild variant="link" className="hidden md:inline-flex group p-0 text-foreground hover:text-primary transition-colors text-base font-medium h-auto hover:underline decoration-1 underline-offset-4">
            <Link href="/products?sort=newest">
              View Collection
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Clean Grid Layout */}
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-xl bg-muted/20">
            <p className="text-muted-foreground font-medium">
              New inventory arriving soon.
            </p>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <Button asChild variant="outline" className="rounded-full w-full sm:w-auto">
            <Link href="/products?sort=newest">
              View All New Arrivals
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}