"use client";

import { useMemo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { QuantityOption } from "@/types/product";

interface QuantityOptionsSelectorProps {
  quantityOptions: QuantityOption[];
  selectedQuantity?: number;
  onQuantityOptionChange?: (quantity: number, pricePerUnit?: number) => void;
  allowCustomQuantity?: boolean; // Deprecated: kept for backward compatibility but not used
}

export function QuantityOptionsSelector({
  quantityOptions,
  selectedQuantity,
  onQuantityOptionChange,
}: QuantityOptionsSelectorProps) {
  // Find the base price option (quantity = 1) to use for discount calculation
  const basePriceOption = useMemo(() => {
    if (!quantityOptions || quantityOptions.length === 0) {
      return null;
    }
    const singleItemOption = quantityOptions.find(
      (opt) =>
        opt.quantity === 1 && opt.isActive && opt.pricePerUnit !== undefined
    );

    if (singleItemOption) {
      return singleItemOption;
    }

    const sortedOptions = [...quantityOptions]
      .filter((opt) => opt.isActive && opt.pricePerUnit !== undefined)
      .sort((a, b) => a.quantity - b.quantity);

    return sortedOptions.length > 0 ? sortedOptions[0] : null;
  }, [quantityOptions]);

  const selectedOption =
    selectedQuantity &&
    quantityOptions?.find((opt) => opt.quantity === selectedQuantity)
      ? selectedQuantity
      : null;

  const getDiscountPercentage = (option: QuantityOption): number | null => {
    if (
      !basePriceOption ||
      !basePriceOption.pricePerUnit ||
      basePriceOption.pricePerUnit <= 0
    ) {
      return null;
    }

    if (!option.pricePerUnit || option.pricePerUnit <= 0) {
      return null;
    }

    if (option.quantity === basePriceOption.quantity) {
      return null;
    }

    const discount =
      ((basePriceOption.pricePerUnit - option.pricePerUnit) /
        basePriceOption.pricePerUnit) *
      100;

    return discount > 0 ? Math.round(discount) : null;
  };

  const handleOptionSelect = (quantity: number, pricePerUnit?: number) => {
    onQuantityOptionChange?.(quantity, pricePerUnit);
  };

  if (!quantityOptions || quantityOptions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Quantity
      </label>

      <ToggleGroup
        key={`quantity-options-${quantityOptions.map((opt) => opt.quantity).join("-")}`}
        type="single"
        value={selectedOption?.toString() || ""}
        onValueChange={(value) => {
          if (value) {
            const option = quantityOptions.find(
              (opt) => opt.quantity.toString() === value
            );
            if (option) {
              handleOptionSelect(option.quantity, option.pricePerUnit);
            }
          }
        }}
        className="flex flex-wrap gap-2"
      >
        {quantityOptions
          .filter((option) => option.quantity !== 1)
          .map((option) => {
            const discountPercent = getDiscountPercentage(option);

            return (
              <ToggleGroupItem
                key={option.quantity}
                value={option.quantity.toString()}
                aria-label={`Select ${option.label}`}
                className="relative h-10 min-w-20 px-3 text-sm font-medium border border-border/60 rounded-lg bg-background hover:bg-secondary/40 hover:border-foreground/20 data-[state=on]:border-foreground data-[state=on]:bg-secondary data-[state=on]:text-foreground transition-all duration-200"
              >
                {option.label}
                {discountPercent !== null && discountPercent > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center bg-foreground text-background rounded-full px-1.5 py-0.5 min-w-5">
                    <span className="text-[10px] font-semibold leading-none">
                      -{discountPercent}%
                    </span>
                  </span>
                )}
              </ToggleGroupItem>
            );
          })}
      </ToggleGroup>
    </div>
  );
}
