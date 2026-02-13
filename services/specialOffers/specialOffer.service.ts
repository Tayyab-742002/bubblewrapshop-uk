import { SpecialOffer } from "@/types/specialOffer";
import {
  getActiveSpecialOffers as getSanityActiveSpecialOffers,
  getSpecialOfferBySlug as getSanitySpecialOfferBySlug,
  getSpecialOfferByProductId as getSanitySpecialOfferByProductId,
} from "@/sanity/lib/api";

/**
 * Special Offer Service
 * Handles all special offer-related data fetching with date filtering
 */

/**
 * Check if a special offer is currently active based on dates
 */
function isOfferActive(offer: SpecialOffer): boolean {
  const now = new Date();

  // Check start date
  if (offer.startDate && new Date(offer.startDate) > now) {
    return false;
  }

  // Check end date
  if (offer.endDate && new Date(offer.endDate) < now) {
    return false;
  }

  // Check active flag
  return offer.isActive;
}

/**
 * Get all active special offers (for homepage)
 * Filters by date range and active/featured flags
 */
export async function getActiveSpecialOffers(): Promise<SpecialOffer[]> {
  try {
    const offers = await getSanityActiveSpecialOffers();
    if (!offers) return [];

    // Filter offers that are within date range and active
    return offers.filter((offer) => isOfferActive(offer) && offer.isFeatured);
  } catch (error) {
    console.error("Error fetching active special offers:", error);
    return [];
  }
}

/**
 * Get special offer by slug
 */
export async function getSpecialOfferBySlug(
  slug: string
): Promise<SpecialOffer | null> {
  try {
    const offer = await getSanitySpecialOfferBySlug(slug);
    if (!offer) return null;

    // Check if offer is still active
    return isOfferActive(offer) ? offer : null;
  } catch (error) {
    console.error(`Error fetching special offer ${slug}:`, error);
    return null;
  }
}

/**
 * Get special offer for a specific product/variant
 * Used to check if a product is part of any active offer
 */
export async function getSpecialOfferForProduct(
  productId: string,
  variantSku?: string
): Promise<SpecialOffer | null> {
  try {
    const offer = await getSanitySpecialOfferByProductId(productId);
    if (!offer) return null;

    // Check if offer is still active
    if (!isOfferActive(offer)) return null;

    // If variant SKU is provided and offer targets specific variants,
    // check if this variant is included
    if (
      variantSku &&
      offer.targetedVariants &&
      offer.targetedVariants.length > 0
    ) {
      const isTargeted = offer.targetedVariants.includes(variantSku);
      return isTargeted ? offer : null;
    }

    // If no specific variants targeted, offer applies to all variants
    return offer;
  } catch (error) {
    console.error(
      `Error fetching special offer for product ${productId}:`,
      error
    );
    return null;
  }
}
