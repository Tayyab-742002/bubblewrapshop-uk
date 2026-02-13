import { Cart } from "@/types/cart";

interface OrderSummaryProps {
  summary: Cart & {
    baseShipping?: number;
    specialOfferDelivery?: number;
    totalShipping?: number;
  };
  showTitle?: boolean;
}

export function OrderSummary({ summary, showTitle = true }: OrderSummaryProps) {
  return (
    <div className="space-y-4">
      {showTitle && <h3 className="text-lg font-semibold">Order Summary</h3>}

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">£{summary.subtotal.toFixed(2)}</span>
        </div>

        {/* Discount */}
        {summary.discount > 0 && (
          <div className="flex justify-between text-primary">
            <span>Discount</span>
            <span>-£{summary.discount.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping Breakdown */}
        {summary.baseShipping !== undefined && summary.totalShipping !== undefined ? (
          <>
            {/* Base Shipping */}
            <div className="flex justify-between">
              <span className="text-muted-foreground text-xs">Base Shipping</span>
              <span className="font-medium text-sm">
                {summary.baseShipping === 0 ? (
                  <span className="text-primary">Free</span>
                ) : (
                  `£${summary.baseShipping.toFixed(2)}`
                )}
              </span>
            </div>

            {/* Special Offer Delivery */}
            {summary.specialOfferDelivery !== undefined && summary.specialOfferDelivery > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground text-xs">Special Offer Delivery</span>
                <span className="font-medium text-sm">£{summary.specialOfferDelivery.toFixed(2)}</span>
              </div>
            )}

            {/* Total Shipping */}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Delivery</span>
              <span className="font-medium">
                {summary.totalShipping === 0 ? (
                  <span className="text-primary">Free</span>
                ) : (
                  `£${summary.totalShipping.toFixed(2)}`
                )}
              </span>
            </div>
          </>
        ) : (
          /* Fallback for old Cart type without breakdown */
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {summary.shipping === 0 ? (
                <span className="text-primary">Free</span>
              ) : (
                `£${summary.shipping.toFixed(2)}`
              )}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t pt-3" />

        {/* Total */}
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>£{summary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
