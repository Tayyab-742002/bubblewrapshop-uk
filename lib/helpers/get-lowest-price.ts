import { Product } from "@/types/product";

/**
 * Gets the lowest possible price for a product across all pricing options.
 * 
 * This function handles the complex pricing structure where prices can be:
 * 1. Set at the product basePrice level
 * 2. Set at the variant level (via priceAdjustment)
 * 3. Set at the quantityOption level (via pricePerUnit)
 * 
 * @param product - The product to get the lowest price for
 * @returns The lowest price found, or 0 if no prices are available
 */
export function getLowestPrice(product: Product): number {
    const prices: number[] = [];

    // 1. Check base price (if not 0)
    if (product.basePrice > 0) {
        prices.push(product.basePrice);
    }

    // 2. Check variants
    if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
            // Calculate variant price (basePrice + priceAdjustment)
            const variantPrice = product.basePrice + variant.price_adjustment;

            // 3. Check if variant has quantityOptions
            if (variant.quantityOptions && variant.quantityOptions.length > 0) {
                // Check each quantity option for specific pricing
                for (const qtyOption of variant.quantityOptions) {
                    // If quantityOption has a specific pricePerUnit, use it
                    if (qtyOption.pricePerUnit !== undefined && qtyOption.pricePerUnit > 0 && qtyOption.isActive) {
                        const totalPrice = qtyOption.pricePerUnit * qtyOption.quantity;
                        prices.push(totalPrice);
                    } else if (qtyOption.isActive && variantPrice > 0) {
                        // Otherwise, use the variant price if it's positive
                        prices.push(variantPrice);
                    }
                }
            } else if (variantPrice > 0) {
                // No quantity options, just use the variant price if positive
                prices.push(variantPrice);
            }
        }
    }

    // Return the lowest price, or 0 if no valid prices found
    return prices.length > 0 ? Math.min(...prices) : 0;
}
