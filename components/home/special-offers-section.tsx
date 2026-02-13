import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpecialOfferCard } from "@/components/products/special-offer-card";
import { getActiveSpecialOffers } from "@/services/specialOffers/specialOffer.service";

export async function SpecialOffersSection() {
  const offers = await getActiveSpecialOffers();

  // Don't show section if no active offers
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        {/* Section Header with Urgency */}
        <div className="mb-10 md:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              🔥 Limited Time
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-foreground">
              Special Offers
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
              Exclusive discounts on our most popular packaging supplies. Don&apos;t miss out!
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
          {offers.map((offer) => (
            <SpecialOfferCard key={offer.id} offer={offer} />
          ))}
        </div>

      </div>
    </section>
  );
}
