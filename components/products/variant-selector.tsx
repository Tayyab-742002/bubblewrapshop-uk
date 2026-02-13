"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductVariant } from "@/types/product";

interface VariantSelectorProps {
  variants: ProductVariant[];
  label?: string;
  initialVariantId?: string; // Pre-select variant by ID (from URL param)
  onVariantChange?: (variantId: string) => void;
  specialOfferVariantSkus?: string[]; // SKUs of variants that are part of special offers
}

export function VariantSelector({
  variants,
  label = "Size",
  initialVariantId,
  onVariantChange,
  specialOfferVariantSkus = [],
}: VariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    initialVariantId || variants[0]?.id || ""
  );

  const handleValueChange = (value: string) => {
    if (value) {
      setSelectedVariant(value);
      onVariantChange?.(value);
    }
  };

  const selectedVariantData = variants.find((v) => v.id === selectedVariant);

  // Helper to check if variant is part of special offer
  const isSpecialOfferVariant = (variant: ProductVariant) => {
    if (specialOfferVariantSkus.length === 0) return false;
    return specialOfferVariantSkus.includes(variant.sku);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <Select value={selectedVariant} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full h-11 bg-background border-border/60 hover:border-foreground/30 focus:border-foreground/50 focus:ring-1 focus:ring-foreground/20 transition-all duration-200 rounded-lg text-sm font-medium">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`}>
            <span className="flex items-center gap-2">
              {selectedVariantData?.name}
              {selectedVariantData && isSpecialOfferVariant(selectedVariantData) && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-red-600 text-white">
                  SALE
                </span>
              )}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="rounded-lg border-border/60 shadow-lg">
          {variants.map((variant) => {
            const isSpecialOffer = isSpecialOfferVariant(variant);
            return (
              <SelectItem
                key={variant.id}
                value={variant.id}
                className={`cursor-pointer py-2.5 px-3 text-sm font-medium rounded-md transition-colors ${
                  isSpecialOffer
                    ? "bg-red-50 border-2 border-red-300 hover:bg-red-100 focus:bg-red-100"
                    : "focus:bg-secondary/80"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{variant.name}</span>
                  {isSpecialOffer && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-red-600 text-white">
                      SALE
                    </span>
                  )}
                  {variant.price_adjustment !== 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({variant.price_adjustment > 0 ? "+" : ""}£
                      {variant.price_adjustment.toFixed(2)})
                    </span>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
