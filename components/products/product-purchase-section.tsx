"use client";
import { useState, useMemo } from "react";
import { VariantSelector } from "./variant-selector";
import { PricingTable } from "./pricing-table";
import { QuantityPriceSelector } from "./quantity-price-selector";
import { QuantityOptionsSelector } from "./quantity-options-selector";
import { AddToCartButton } from "./add-to-cart-button";
import { Product, ProductVariant } from "@/types/product";
import { calculatePricePerUnit } from "@/services/pricing/pricing.service";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

interface ProductPurchaseSectionProps {
  product: Product;
}

// Helper function to get the first/lowest quantity option
function getFirstQuantityOption(
  quantityOptions?: ProductVariant["quantityOptions"]
): { quantity: number; pricePerUnit?: number } | null {
  if (!quantityOptions || quantityOptions.length === 0) {
    return null;
  }

  const activeOptions = quantityOptions
    .filter((opt) => opt.isActive && opt.quantity !== 1)
    .sort((a, b) => a.quantity - b.quantity);

  if (activeOptions.length > 0) {
    const firstOption = activeOptions[0];
    return {
      quantity: firstOption.quantity,
      pricePerUnit: firstOption.pricePerUnit,
    };
  }

  return null;
}

// Helper function to get the minimum quantity from visible options
function getMinimumQuantity(
  quantityOptions?: ProductVariant["quantityOptions"]
): number {
  if (!quantityOptions || quantityOptions.length === 0) {
    return 1;
  }

  const visibleOptions = quantityOptions
    .filter((opt) => opt.isActive && opt.quantity !== 1)
    .sort((a, b) => a.quantity - b.quantity);

  if (visibleOptions.length > 0) {
    return visibleOptions[0].quantity;
  }

  return 1;
}

export function ProductPurchaseSection({
  product,
}: ProductPurchaseSectionProps) {
  // Initialize with first variant
  const firstVariant = product.variants?.[0];

  // Initialize with first quantity option if first variant has options
  const initialQuantityOption = firstVariant
    ? getFirstQuantityOption(firstVariant.quantityOptions)
    : null;

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(firstVariant);
  const [quantity, setQuantity] = useState(1);
  const [selectedQuantityOption, setSelectedQuantityOption] = useState<{
    quantity: number;
    pricePerUnit?: number;
  } | null>(initialQuantityOption);

  // Helper to handle variant change with auto-selection of first quantity option
  const handleVariantChange = (variantId: string) => {
    const variant = product.variants?.find((v) => v.id === variantId);
    setSelectedVariant(variant);
    setQuantity(1);

    if (variant?.quantityOptions && variant.quantityOptions.length > 0) {
      const firstOption = getFirstQuantityOption(variant.quantityOptions);
      if (firstOption) {
        setSelectedQuantityOption(firstOption);
      } else {
        setSelectedQuantityOption(null);
      }
    } else {
      setSelectedQuantityOption(null);
    }
  };

  // Helper function to find the best matching quantity option
  const findMatchingQuantityOption = (
    inputQuantity: number,
    quantityOptions?: ProductVariant["quantityOptions"]
  ): { quantity: number; pricePerUnit?: number } | null => {
    if (!quantityOptions || quantityOptions.length === 0) {
      return null;
    }

    const activeOptions = quantityOptions
      .filter((opt) => opt.isActive && opt.quantity !== 1)
      .sort((a, b) => b.quantity - a.quantity);

    const matchingOption = activeOptions.find(
      (opt) => opt.quantity <= inputQuantity
    );

    if (matchingOption) {
      return {
        quantity: matchingOption.quantity,
        pricePerUnit: matchingOption.pricePerUnit,
      };
    }

    return null;
  };

  // Calculate total quantity
  const totalQuantity = useMemo(() => {
    if (selectedQuantityOption) {
      return selectedQuantityOption.quantity + (quantity - 1);
    }
    return quantity;
  }, [selectedQuantityOption, quantity]);

  // Calculate the final price per unit based on total quantity with pricing tiers
  const calculatedPricePerUnit = useMemo(() => {
    const adjustedBasePrice =
      product.basePrice + (selectedVariant?.price_adjustment || 0);

    if (
      selectedQuantityOption?.pricePerUnit !== undefined &&
      selectedQuantityOption.pricePerUnit > 0
    ) {
      return selectedQuantityOption.pricePerUnit;
    }

    if (product.pricingTiers && product.pricingTiers.length > 0) {
      return calculatePricePerUnit(
        totalQuantity,
        product.basePrice,
        product.pricingTiers,
        selectedVariant?.price_adjustment || 0
      );
    }

    return adjustedBasePrice;
  }, [
    product.basePrice,
    product.pricingTiers,
    selectedVariant,
    totalQuantity,
    selectedQuantityOption,
  ]);

  return (
    <div className="space-y-5">
      {/* Price Display */}
      <div className="pb-5 border-b border-border">
        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            £{calculatedPricePerUnit.toFixed(2)}
          </span>
          {product.discount && Number(product.discount) > 0 && (
            <span className="text-base text-muted-foreground/70 line-through">
              £{((product.basePrice * 100) / (100 - Number(product.discount))).toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 tracking-wide">
          Tax included. Shipping calculated at checkout.
        </p>
      </div>

      {/* Variant Selector - Using label prop, no duplicate h3 */}
      {product.variants && product.variants.length > 0 && (
        <VariantSelector
          variants={product.variants}
          label="Size"
          onVariantChange={handleVariantChange}
        />
      )}

      {/* Quantity Options Selector */}
      {selectedVariant?.quantityOptions &&
        selectedVariant.quantityOptions.length > 0 && (
          <div key={selectedVariant.id}>
            <QuantityOptionsSelector
              quantityOptions={selectedVariant.quantityOptions}
              selectedQuantity={selectedQuantityOption?.quantity}
              onQuantityOptionChange={(qty, pricePerUnit) => {
                setSelectedQuantityOption({ quantity: qty, pricePerUnit });
                setQuantity(1);
              }}
              allowCustomQuantity={false}
            />
          </div>
        )}

      {/* Pricing Table */}
      {product.pricingTiers && product.pricingTiers.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Volume Pricing
          </label>
          <PricingTable
            tiers={product.pricingTiers}
            basePrice={product.basePrice}
            variantPriceAdjustment={selectedVariant?.price_adjustment || 0}
          />
        </div>
      )}

      {/* Quantity Selector & Price Display */}
      <div>
        {selectedVariant?.quantityOptions &&
          selectedVariant.quantityOptions.length > 0 ? (
          (() => {
            const minQuantity = getMinimumQuantity(
              selectedVariant.quantityOptions
            );
            return (
              <QuantityPriceSelector
                key={`quantity-selector-${selectedVariant?.id || "no-variant"}-${selectedQuantityOption?.quantity || "no-option"}`}
                pricingTiers={product.pricingTiers || []}
                basePrice={product.basePrice}
                variantPriceAdjustment={selectedVariant?.price_adjustment || 0}
                initialQuantity={1}
                baseQuantity={selectedQuantityOption?.quantity || 0}
                quantityOptionPrice={selectedQuantityOption?.pricePerUnit}
                minQuantity={minQuantity}
                onQuantityChange={(newTotalQuantity) => {
                  const enforcedQuantity = Math.max(
                    minQuantity,
                    newTotalQuantity
                  );

                  const matchingOption = findMatchingQuantityOption(
                    enforcedQuantity,
                    selectedVariant.quantityOptions
                  );

                  if (matchingOption) {
                    setSelectedQuantityOption(matchingOption);
                    const additionalQuantity =
                      enforcedQuantity - matchingOption.quantity;
                    setQuantity(Math.max(1, additionalQuantity + 1));
                  } else {
                    setSelectedQuantityOption(null);
                    setQuantity(enforcedQuantity);
                  }
                }}
                showQuantityInput={true}
              />
            );
          })()
        ) : (
          <QuantityPriceSelector
            key={`quantity-selector-${selectedVariant?.id || "no-variant"}`}
            pricingTiers={product.pricingTiers || []}
            basePrice={product.basePrice}
            variantPriceAdjustment={selectedVariant?.price_adjustment || 0}
            initialQuantity={1}
            onQuantityChange={setQuantity}
          />
        )}
      </div>

      {/* Add to Cart Button */}
      <AddToCartButton
        product={product}
        variant={selectedVariant}
        quantity={totalQuantity}
        quantityOptionPrice={calculatedPricePerUnit}
      />

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border">
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center">
            <Truck className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium leading-tight">
            Fast Delivery
          </span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium leading-tight">
            Secure Payment
          </span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium leading-tight">
            Easy Returns
          </span>
        </div>
      </div>
    </div>
  );
}
