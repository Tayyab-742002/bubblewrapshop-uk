import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Product, ProductVariant, PricingTier, QuantityOption } from "@/types/product";

interface VariantPricingTableProps {
  product: Product;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getTierLabel(tier: PricingTier): string {
  if (tier.label) return tier.label;
  if (tier.maxQuantity) return `${tier.minQuantity}–${tier.maxQuantity}`;
  return `${tier.minQuantity}+`;
}

/** Price for a variant at a given pricing tier index */
function getTierPrice(product: Product, variant: ProductVariant, tierIndex: number): number {
  const effectiveTiers =
    variant.pricingTiers && variant.pricingTiers.length > 0
      ? variant.pricingTiers
      : product.pricingTiers || [];

  const tier = effectiveTiers[tierIndex];
  const base = product.basePrice + variant.price_adjustment;
  if (!tier || tier.discount <= 0) return base;
  return base * (1 - tier.discount / 100);
}

/** Collect all unique quantity values across all variants, sorted ascending */
function collectAllQuantities(variants: ProductVariant[]): number[] {
  const seen = new Set<number>();
  for (const v of variants) {
    for (const o of v.quantityOptions ?? []) {
      if (o.isActive && o.quantity !== 1) seen.add(o.quantity);
    }
  }
  return [...seen].sort((a, b) => a - b);
}

/** Get a variant's option for a specific quantity */
function getOption(variant: ProductVariant, qty: number): QuantityOption | undefined {
  return variant.quantityOptions?.find((o) => o.isActive && o.quantity === qty);
}

/** Discount % of an option relative to the base (smallest) option of a variant */
function getDiscount(variant: ProductVariant, qty: number): number | null {
  const opts = (variant.quantityOptions ?? [])
    .filter((o) => o.isActive && o.quantity !== 1)
    .sort((a, b) => a.quantity - b.quantity);
  const base = opts[0];
  if (!base?.pricePerUnit || base.pricePerUnit <= 0) return null;
  const opt = opts.find((o) => o.quantity === qty);
  if (!opt?.pricePerUnit || opt.quantity === base.quantity) return null;
  const pct = ((base.pricePerUnit - opt.pricePerUnit) / base.pricePerUnit) * 100;
  return pct > 0 ? Math.round(pct) : null;
}

// ─── Thumbnail ───────────────────────────────────────────────────────────────

function Thumbnail({ src, alt }: { src: string | null; alt: string }) {
  if (!src) return <div className="w-11 h-11 rounded-lg bg-secondary/30 border border-border/30" />;
  return (
    <div className="w-11 h-11 rounded-lg overflow-hidden bg-white border border-border/30 flex items-center justify-center">
      <Image src={src} alt={alt} width={44} height={44} className="object-contain p-1" />
    </div>
  );
}

// ─── Quantity-Options Table (mailing bags, pouches, etc.) ────────────────────

function QuantityOptionsTable({ product, variants, imageUrl }: {
  product: Product;
  variants: ProductVariant[];
  imageUrl: string | null;
}) {
  const allQtys = collectAllQuantities(variants);
  if (allQtys.length === 0) return null;

  // Grab label from first variant that has the option
  const getLabel = (qty: number) => {
    for (const v of variants) {
      const o = getOption(v, qty);
      if (o) return o.label;
    }
    return `${qty} units`;
  };

  // Discount % relative to smallest qty column (first column)
  const firstQty = allQtys[0];
  const getColDiscount = (qty: number): number | null => {
    if (qty === firstQty) return null;
    // Average discount across variants that have both options
    const discounts: number[] = [];
    for (const v of variants) {
      const base = getOption(v, firstQty);
      const opt = getOption(v, qty);
      if (base?.pricePerUnit && opt?.pricePerUnit && base.pricePerUnit > 0) {
        const pct = ((base.pricePerUnit - opt.pricePerUnit) / base.pricePerUnit) * 100;
        if (pct > 0) discounts.push(Math.round(pct));
      }
    }
    if (discounts.length === 0) return null;
    return Math.round(discounts.reduce((a, b) => a + b, 0) / discounts.length);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 shadow-sm">
      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr className="bg-orange-50 dark:bg-orange-950/30 border-b border-border/50">
            <th className="py-3 px-4 text-left font-semibold text-foreground/80 w-14">Image</th>
            <th className="py-3 px-4 text-left font-semibold text-foreground/80 whitespace-nowrap">SKU</th>
            <th className="py-3 px-4 text-left font-semibold text-foreground/80">Description</th>
            {allQtys.map((qty) => {
              const discount = getColDiscount(qty);
              return (
                <th key={qty} className="py-3 px-4 text-center font-semibold text-foreground/80 whitespace-nowrap">
                  {getLabel(qty)}
                  {discount !== null && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white">
                      -{discount}%
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, rowIndex) => (
            <tr
              key={variant.sku}
              className={`border-b border-border/30 transition-colors hover:bg-secondary/30 ${
                rowIndex % 2 === 0 ? "bg-background" : "bg-secondary/10"
              }`}
            >
              <td className="py-3 px-4">
                <Thumbnail src={imageUrl} alt={product.imageAlt || product.name} />
              </td>
              <td className="py-3 px-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                {variant.sku}
              </td>
              <td className="py-3 px-4 font-medium text-foreground">{variant.name}</td>
              {allQtys.map((qty) => {
                const opt = getOption(variant, qty);
                const discount = getDiscount(variant, qty);
                const totalPrice = opt?.pricePerUnit !== undefined ? opt.pricePerUnit * qty : undefined;
                return (
                  <td key={qty} className="py-3 px-4 text-center whitespace-nowrap">
                    {totalPrice !== undefined ? (
                      <span className={`font-semibold ${discount !== null && discount > 0 ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>
                        £{totalPrice.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Pricing-Tiers Table (bubble wrap rolls, boxes, etc.) ────────────────────

function PricingTiersTable({ product, variants, imageUrl }: {
  product: Product;
  variants: ProductVariant[];
  imageUrl: string | null;
}) {
  const tiers = product.pricingTiers || [];

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 shadow-sm">
      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr className="bg-orange-50 dark:bg-orange-950/30 border-b border-border/50">
            <th className="py-3 px-4 text-left font-semibold text-foreground/80 w-14">Image</th>
            <th className="py-3 px-4 text-left font-semibold text-foreground/80 whitespace-nowrap">SKU</th>
            <th className="py-3 px-4 text-left font-semibold text-foreground/80">Description</th>
            {tiers.length > 0 ? (
              tiers.map((tier, i) => (
                <th key={i} className="py-3 px-4 text-center font-semibold text-foreground/80 whitespace-nowrap">
                  {getTierLabel(tier)}
                  {tier.discount > 0 && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white">
                      -{tier.discount}%
                    </span>
                  )}
                </th>
              ))
            ) : (
              <th className="py-3 px-4 text-center font-semibold text-foreground/80">Price</th>
            )}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, rowIndex) => {
            const adjustedBase = product.basePrice + variant.price_adjustment;
            return (
              <tr
                key={variant.sku}
                className={`border-b border-border/30 transition-colors hover:bg-secondary/30 ${
                  rowIndex % 2 === 0 ? "bg-background" : "bg-secondary/10"
                }`}
              >
                <td className="py-3 px-4">
                  <Thumbnail src={imageUrl} alt={product.imageAlt || product.name} />
                </td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {variant.sku}
                </td>
                <td className="py-3 px-4 font-medium text-foreground">{variant.name}</td>
                {tiers.length > 0 ? (
                  tiers.map((tier, colIndex) => {
                    const price = getTierPrice(product, variant, colIndex);
                    return (
                      <td key={colIndex} className="py-3 px-4 text-center whitespace-nowrap">
                        <span className={`font-semibold ${tier.discount > 0 ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>
                          £{price.toFixed(2)}
                        </span>
                      </td>
                    );
                  })
                ) : (
                  <td className="py-3 px-4 text-center">
                    <span className="font-semibold text-foreground">£{adjustedBase.toFixed(2)}</span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function VariantPricingTable({ product }: VariantPricingTableProps) {
  const variants = product.variants || [];
  if (!variants.length) return null;

  const imageUrl = product.image
    ? urlFor(product.image).width(80).height(80).url()
    : null;

  // Detect pricing mode: if any active variant has quantity options, use that table
  const usesQuantityOptions = variants.some(
    (v) => (v.quantityOptions ?? []).filter((o) => o.isActive && o.quantity !== 1).length > 0
  );

  return (
    <section className="mt-12 md:mt-16 pt-8 border-t border-border/50">
      <h2 className="text-xl font-bold text-foreground mb-1">
        Pricing by Size &amp; Quantity
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        All prices shown are per unit, excluding VAT. Discounts apply
        automatically at checkout.
      </p>

      {usesQuantityOptions ? (
        <QuantityOptionsTable product={product} variants={variants} imageUrl={imageUrl} />
      ) : (
        <PricingTiersTable product={product} variants={variants} imageUrl={imageUrl} />
      )}

      <p className="text-xs text-muted-foreground mt-3">
        * Prices are per unit, excluding VAT. Discounts apply to the selected
        quantity at checkout.
      </p>
    </section>
  );
}
