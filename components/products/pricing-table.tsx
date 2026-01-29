import { PricingTier } from "@/types/product";

interface PricingTableProps {
  tiers: PricingTier[];
  basePrice: number;
  variantPriceAdjustment?: number;
}

export function PricingTable({ tiers, basePrice, variantPriceAdjustment = 0 }: PricingTableProps) {
  const adjustedBasePrice = basePrice + variantPriceAdjustment;

  const displayTiers =
    tiers && tiers.length > 0
      ? tiers
      : [];

  const getTierPrice = (tier: PricingTier): number => {
    if (tier.discount > 0) {
      return adjustedBasePrice * (1 - tier.discount / 100);
    }
    return adjustedBasePrice;
  };

  if (displayTiers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1.5">
      {/* Base price row */}
      <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-secondary/30">
        <span className="text-sm text-foreground">1+ units</span>
        <span className="text-sm font-semibold text-foreground">
          £{adjustedBasePrice.toFixed(2)}
        </span>
      </div>

      {/* Tier rows */}
      {displayTiers.map((tier, index) => {
        const quantityRange = tier.maxQuantity
          ? `${tier.minQuantity}–${tier.maxQuantity} units`
          : `${tier.minQuantity}+ units`;

        const tierPrice = getTierPrice(tier);

        return (
          <div
            key={index}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <span className="text-sm text-foreground">{quantityRange}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                £{tierPrice.toFixed(2)}
              </span>
              {tier.discount > 0 && (
                <span className="text-[10px] font-semibold text-destructive-foreground bg-destructive px-1.5 py-0.5 rounded">
                  -{tier.discount}%
                </span>
              )}
              {tier.label && (
                <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                  {tier.label}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
