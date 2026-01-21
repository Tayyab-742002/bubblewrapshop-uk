import { PricingTier } from "@/types/product";
import { VAT_RATE, type ShippingCalculation } from "@/types/shipping";

/**
 * Pricing Service
 * Handles all pricing calculations, tiered pricing logic, and VAT
 * TODO: Integrate with Sanity CMS for dynamic pricing tiers
 * Reference: Architecture.md Section 4.2
 */

/**
 * Calculate the active pricing tier based on quantity
 * TODO: Fetch pricing tiers from Sanity CMS
 */
 function getActivePricingTier(
  quantity: number,
  tiers: PricingTier[]
): PricingTier | null {
  if (!tiers || tiers.length === 0) {
    return null;
  }

  return (
    tiers.find((tier) => {
      const minMatch = quantity >= tier.minQuantity;
      const maxMatch = tier.maxQuantity ? quantity <= tier.maxQuantity : true;
      return minMatch && maxMatch;
    }) || null
  );
}

/**
 * Calculate price per unit based on quantity and tiers
 * Applies discount percentage from the active tier to the base price
 */
export function calculatePricePerUnit(
  quantity: number,
  basePrice: number,
  tiers: PricingTier[],
  variantAdjustment: number = 0
): number {
  const adjustedBasePrice = basePrice + variantAdjustment;

  if (!tiers || tiers.length === 0) {
    return adjustedBasePrice;
  }

  const activeTier = getActivePricingTier(quantity, tiers);
  
  if (!activeTier) {
    return adjustedBasePrice;
  }

  // Apply discount percentage to base price
  if (activeTier.discount > 0) {
    return adjustedBasePrice * (1 - activeTier.discount / 100);
  }

  // No discount, return base price
  return adjustedBasePrice;
}





/**
 * Calculate VAT amount
 * VAT is calculated on (subtotal + shipping cost)
 * Returns exact value - no rounding (round only for display)
 */
function calculateVAT(subtotal: number, shippingCost: number, vatRate: number = VAT_RATE): number {
  const taxableAmount = subtotal + shippingCost
  return taxableAmount * vatRate
}

/**
 * Calculate order total with shipping and VAT
 * Returns exact values - no rounding (round only for display)
 */
export function calculateOrderTotal(
  subtotal: number,
  shippingCost: number,
  vatRate: number = VAT_RATE
): ShippingCalculation {
  const vatAmount = calculateVAT(subtotal, shippingCost, vatRate)
  const total = subtotal + shippingCost + vatAmount

  return {
    subtotal, // Keep exact value
    shippingCost, // Keep exact value
    vatAmount, // Keep exact value
    total, // Keep exact value
    shippingMethod: '' // Will be set by caller
  }
}

