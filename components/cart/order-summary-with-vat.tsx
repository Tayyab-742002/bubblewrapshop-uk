"use client"

import { CartItem } from "@/types/cart";
import { getShippingOptionById } from "@/types/shipping"
import type { ShippingCalculation } from "@/types/shipping"

interface OrderSummaryWithVATProps {
  summary: ShippingCalculation & {
    items: CartItem[];
    discount: number;
    baseShipping?: number;
    specialOfferDelivery?: number;
    totalShipping?: number;
  }
  showTitle?: boolean
}

export function OrderSummaryWithVAT({
  summary,
  showTitle = true
}: OrderSummaryWithVATProps) {
  const shippingOption = getShippingOptionById(summary.shippingMethod)

  return (
    <div className="space-y-4">
      {showTitle && (
        <h3 className="text-lg font-semibold text-gray-900">Basket Totals</h3>
      )}

      <div className="space-y-3 text-sm bg-white rounded-lg border border-gray-200 p-6">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            £{summary.subtotal.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        {summary.discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span>-£{summary.discount.toFixed(2)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Shipping Section */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Shipping</h4>
          {shippingOption && (
            <>
              {/* Base Shipping */}
              <div className="flex justify-between text-gray-600">
                <span className="text-xs">Base Shipping ({shippingOption.name})</span>
                <span className="font-medium text-gray-900 text-sm">
                  {shippingOption.price === 0
                    ? "Free"
                    : `£${shippingOption.price.toFixed(2)}`}
                </span>
              </div>

              {/* Special Offer Delivery */}
              {summary.specialOfferDelivery && summary.specialOfferDelivery > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span className="text-xs">Special Offer Delivery</span>
                  <span className="font-medium text-gray-900 text-sm">
                    £{summary.specialOfferDelivery.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Total Shipping */}
              {summary.totalShipping !== undefined && (
                <div className="flex justify-between text-gray-900 font-medium pt-1 border-t border-gray-100">
                  <span>Total Delivery</span>
                  <span>
                    {summary.totalShipping === 0
                      ? "Free"
                      : `£${summary.totalShipping.toFixed(2)}`}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* VAT */}
        <div className="flex justify-between pt-3 border-t border-gray-200">
          <span className="text-gray-600">VAT 20%</span>
          <span className="font-medium text-gray-900">
            £{summary.vatAmount.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 my-4" />

        {/* Total */}
        <div className="flex justify-between text-base font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900 text-lg">
            £{summary.total.toFixed(2)}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        * Prices include VAT. Delivery charges are calculated based on your
        selected shipping method.
      </p>
    </div>
  )
}

