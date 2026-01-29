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
  onVariantChange?: (variantId: string) => void;
}

export function VariantSelector({
  variants,
  label = "Size",
  onVariantChange,
}: VariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    variants[0]?.id || ""
  );

  const handleValueChange = (value: string) => {
    if (value) {
      setSelectedVariant(value);
      onVariantChange?.(value);
    }
  };

  const selectedVariantData = variants.find((v) => v.id === selectedVariant);

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <Select value={selectedVariant} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full h-11 bg-background border-border/60 hover:border-foreground/30 focus:border-foreground/50 focus:ring-1 focus:ring-foreground/20 transition-all duration-200 rounded-lg text-sm font-medium">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`}>
            {selectedVariantData?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="rounded-lg border-border/60 shadow-lg">
          {variants.map((variant) => (
            <SelectItem
              key={variant.id}
              value={variant.id}
              className="cursor-pointer py-2.5 px-3 text-sm font-medium rounded-md focus:bg-secondary/80 transition-colors"
            >
              {variant.name}
              {variant.price_adjustment !== 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({variant.price_adjustment > 0 ? "+" : ""}£
                  {variant.price_adjustment.toFixed(2)})
                </span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
