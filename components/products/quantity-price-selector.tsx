"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PricingTier } from "@/types/product";
import { Minus, Plus } from "lucide-react";

interface QuantityPriceSelectorProps {
  pricingTiers: PricingTier[];
  basePrice: number;
  variantPriceAdjustment?: number;
  onQuantityChange?: (quantity: number) => void;
  initialQuantity?: number;
  baseQuantity?: number;
  quantityOptionPrice?: number;
  showQuantityInput?: boolean;
  minQuantity?: number;
}

export function QuantityPriceSelector({
  pricingTiers,
  basePrice,
  variantPriceAdjustment = 0,
  onQuantityChange,
  initialQuantity = 1,
  baseQuantity = 0,
  quantityOptionPrice,
  showQuantityInput = true,
  minQuantity = 1,
}: QuantityPriceSelectorProps) {
  const displayQuantity = Math.max(
    minQuantity,
    baseQuantity > 0 ? baseQuantity + (initialQuantity - 1) : initialQuantity
  );

  const [quantity, setQuantity] = useState(displayQuantity);
  const [quantityInput, setQuantityInput] = useState<string>(displayQuantity.toString());

  useEffect(() => {
    const newDisplayQuantity = Math.max(
      minQuantity,
      baseQuantity > 0 ? baseQuantity + (initialQuantity - 1) : initialQuantity
    );
    setQuantity(newDisplayQuantity);
    setQuantityInput(newDisplayQuantity.toString());
  }, [initialQuantity, baseQuantity, minQuantity]);

  const { activeTier, pricePerUnit, totalPrice, savings } = useMemo(() => {
    const adjustedBasePrice = basePrice + variantPriceAdjustment;

    if (quantityOptionPrice !== undefined && quantityOptionPrice > 0) {
      const total = quantityOptionPrice * quantity;
      const baseTotal = adjustedBasePrice * quantity;
      const savingsAmount = Math.max(0, baseTotal - total);

      return {
        activeTier: null,
        pricePerUnit: quantityOptionPrice,
        totalPrice: total,
        savings: savingsAmount,
      };
    }

    if (!pricingTiers || pricingTiers.length === 0) {
      return {
        activeTier: null,
        pricePerUnit: adjustedBasePrice,
        totalPrice: adjustedBasePrice * quantity,
        savings: 0,
      };
    }

    const sortedTiers = [...pricingTiers].sort((a, b) => b.minQuantity - a.minQuantity);
    const tier = sortedTiers.find((t) => {
      const minMatch = quantity >= t.minQuantity;
      const maxMatch = t.maxQuantity ? quantity <= t.maxQuantity : true;
      return minMatch && maxMatch;
    });

    if (!tier) {
      return {
        activeTier: null,
        pricePerUnit: adjustedBasePrice,
        totalPrice: adjustedBasePrice * quantity,
        savings: 0,
      };
    }

    const unitPrice = tier.discount > 0
      ? adjustedBasePrice * (1 - tier.discount / 100)
      : adjustedBasePrice;

    const total = unitPrice * quantity;
    const baseTotal = adjustedBasePrice * quantity;
    const savingsAmount = Math.max(0, baseTotal - total);

    return {
      activeTier: tier,
      pricePerUnit: unitPrice,
      totalPrice: total,
      savings: savingsAmount,
    };
  }, [quantity, pricingTiers, basePrice, variantPriceAdjustment, quantityOptionPrice]);

  useEffect(() => {
    setQuantityInput(quantity.toString());
  }, [quantity]);

  const updateQuantity = (newQuantity: number) => {
    const validQuantity = Math.max(minQuantity, newQuantity);
    setQuantity(validQuantity);
    setQuantityInput(validQuantity.toString());
    onQuantityChange?.(validQuantity);
  };

  const handleIncrement = () => {
    updateQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      updateQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (value: string) => {
    setQuantityInput(value);

    if (value === "") {
      return;
    }

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= minQuantity) {
      setQuantity(numValue);
      onQuantityChange?.(numValue);
    }
  };

  const handleQuantityBlur = () => {
    const numValue = parseInt(quantityInput, 10);
    if (isNaN(numValue) || numValue < minQuantity) {
      const enforcedQuantity = minQuantity;
      setQuantityInput(enforcedQuantity.toString());
      setQuantity(enforcedQuantity);
      onQuantityChange?.(enforcedQuantity);
    } else {
      setQuantityInput(numValue.toString());
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Input with +/- buttons */}
      {showQuantityInput && (
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Quantity
          </label>
          <div className="flex items-center p-x-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={quantity < minQuantity}
              className="h-11 w-11 rounded-r-none border-r-0 border-border hover:bg-secondary/60"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="quantity"
              type="text"
              inputMode="numeric"
              min={minQuantity.toString()}
              value={quantityInput}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d+$/.test(value)) {
                  handleQuantityChange(value);
                }
              }}
              onBlur={handleQuantityBlur}
              className="h-11 w-16 rounded-none border-x-0 text-center font-medium focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
              aria-label={`Quantity (minimum ${minQuantity})`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              className="h-11 w-11 rounded-l-none border-l-0 border-border hover:bg-secondary/60"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dynamic Price Display */}
      <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/40 border border-border">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-foreground">
              £{pricePerUnit.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">/unit</span>
          </div>
          {quantity > 1 && (
            <span className="text-xs text-muted-foreground">
              Total: <span className="font-medium text-foreground">£{totalPrice.toFixed(2)}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeTier?.label && (
            <span className="text-[10px] font-medium text-primary-foreground bg-primary px-2 py-1 rounded">
              {activeTier.label}
            </span>
          )}
          {savings > 0 && (
            <span className="text-xs font-medium text-primary">
              Save £{savings.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
