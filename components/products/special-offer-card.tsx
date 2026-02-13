"use client";

import Image from "next/image";
import Link from "next/link";
import { SpecialOffer } from "@/types/specialOffer";
import { Clock, Plus } from "lucide-react";
import { calculateTimeRemaining } from "@/lib/helpers/time-remaining";

interface SpecialOfferCardProps {
  offer: SpecialOffer;
}

export function SpecialOfferCard({ offer }: SpecialOfferCardProps) {
  const product = offer.product;
  const timeRemaining = offer.endDate
    ? calculateTimeRemaining(offer.endDate)
    : null;

  // Calculate original and discounted prices for targeted variant(s)
  const getPricing = () => {
    const variants = product.variants || [];

    // Find the targeted variant, or use first variant
    const targetedVariant = offer.targetedVariants?.length
      ? variants.find((v) => offer.targetedVariants!.includes(v.sku))
      : variants[0];

    if (!targetedVariant) {
      return { originalPrice: product.basePrice, discountedPrice: product.basePrice, discountPercent: 0 };
    }

    const variantBasePrice = product.basePrice + targetedVariant.price_adjustment;

    // Check variant-level pricing tiers for discount (special offer deals)
    if (targetedVariant.pricingTiers && targetedVariant.pricingTiers.length > 0) {
      const tier = targetedVariant.pricingTiers.find((t) => t.minQuantity <= 1) || targetedVariant.pricingTiers[0];
      if (tier && tier.discount > 0) {
        const discounted = variantBasePrice * (1 - tier.discount / 100);
        return { originalPrice: variantBasePrice, discountedPrice: discounted, discountPercent: tier.discount };
      }
    }

    // Check product-level pricing tiers as fallback
    if (product.pricingTiers && product.pricingTiers.length > 0) {
      const tier = product.pricingTiers.find((t) => t.minQuantity <= 1) || product.pricingTiers[0];
      if (tier && tier.discount > 0) {
        const discounted = variantBasePrice * (1 - tier.discount / 100);
        return { originalPrice: variantBasePrice, discountedPrice: discounted, discountPercent: tier.discount };
      }
    }

    return { originalPrice: variantBasePrice, discountedPrice: variantBasePrice, discountPercent: 0 };
  };

  const { originalPrice, discountedPrice, discountPercent } = getPricing();
  const hasDiscount = discountPercent > 0 && originalPrice !== discountedPrice;

  // Badge color mapping
  const badgeColors = {
    red: "bg-red-500 text-white",
    orange: "bg-orange-500 text-white",
    green: "bg-green-600 text-white",
    blue: "bg-blue-500 text-white",
  };

  // Build URL with offerId and variant query params
  // If offer targets specific variants, pre-select the first one
  let offerUrl = `/products/${product.slug}?offerId=${offer.slug}`;

  if (offer.targetedVariants && offer.targetedVariants.length > 0) {
    // Add the first targeted variant to the URL
    offerUrl += `&variant=${offer.targetedVariants[0]}`;
  }

  return (
    <Link
      href={offerUrl}
      className="group flex flex-col gap-3 group-hover:cursor-pointer"
      title={offer.title}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white transition-colors duration-500 hover:bg-gray-50 border-2 border-red-200">
        <Image
          src={product.image}
          alt={product.imageAlt || product.name}
          title={offer.title}
          width={500}
          height={500}
          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Offer Badge - Top Left */}
        {offer.badgeText && (
          <div className="absolute left-2 sm:left-3 top-2 sm:top-3 z-20">
            <span
              className={`inline-flex px-2 py-0.5 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-lg ${badgeColors[offer.badgeColor] || badgeColors.red}`}
            >
              {offer.badgeText}
            </span>
          </div>
        )}

        {/* Time Remaining - Below special badge */}
        {timeRemaining && (
          <div className="absolute left-2 sm:left-3 top-10 sm:top-12 z-20">
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[10px] font-semibold bg-white/95 text-red-600 backdrop-blur-md rounded-full shadow-sm">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {timeRemaining}
            </div>
          </div>
        )}

        {/* Quick Action Button */}
        <div className="absolute bottom-3 right-3 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 hover:bg-red-700">
            <Plus className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1 pl-1">
        <h3 className="line-clamp-1 text-sm font-medium text-foreground tracking-tight group-hover:text-red-600 transition-colors">
          {offer.title}
        </h3>

        {offer.shortDescription && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {offer.shortDescription}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 pt-1">
          {hasDiscount ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  £{originalPrice.toFixed(2)}
                </span>
                <span className="text-xl font-bold text-red-600 tracking-tight">
                  £{discountedPrice.toFixed(2)}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-red-600 text-white rounded w-fit">
                {discountPercent}% OFF
              </span>
            </>
          ) : (
            <>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                From
              </span>
              <span className="text-xl font-bold text-red-600 tracking-tight">
                £{originalPrice.toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
