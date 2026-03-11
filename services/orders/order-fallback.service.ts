/**
 * Order Fallback Service
 * Creates an order from a Stripe session when the webhook fails or is delayed.
 * This replicates the logic from the webhook handler but is triggered
 * by the success page as a last resort.
 */

import Stripe from "stripe";
import { createOrder, getOrderByStripeSessionId, getOrderById } from "@/services/orders/order.service";
import type { CartItem, Order } from "@/types/cart";

/**
 * Create an order from a fully-expanded Stripe Checkout Session.
 * This is a fallback for when the webhook fails.
 * Returns the created Order, or null if creation fails.
 */
export async function createOrderFromSession(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fullSession: any
): Promise<Order | null> {
  try {
    // First, double-check that the order doesn't already exist (race condition guard)
    const existingOrder = await getOrderByStripeSessionId(fullSession.id);
    if (existingOrder) {
      console.log("✅ Order already exists (created by webhook):", existingOrder.id);
      return existingOrder;
    }

    console.log("🔄 Fallback: Creating order from session:", fullSession.id);

    // Extract metadata from session
    const userId = fullSession.metadata?.user_id;
    const userEmail =
      fullSession.customer_email ||
      fullSession.customer_details?.email ||
      fullSession.metadata?.user_email;

    // Get customer name from Stripe
    const customerName =
      fullSession.customer_details?.name ||
      fullSession.shipping_details?.name ||
      "Customer";

    // Get shipping address from Stripe
    let shippingAddress = null;
    if (fullSession.shipping_details?.address) {
      const stripeAddress = fullSession.shipping_details.address;
      shippingAddress = {
        fullName: fullSession.shipping_details.name || customerName,
        address: stripeAddress.line1 || "",
        address2: stripeAddress.line2 || "",
        city: stripeAddress.city || "",
        state: stripeAddress.state || "",
        zipCode: stripeAddress.postal_code || "",
        country: stripeAddress.country || "",
        phone: fullSession.customer_details?.phone || "",
      };
    } else if (fullSession.metadata?.shipping_address) {
      try {
        shippingAddress = JSON.parse(fullSession.metadata.shipping_address);
      } catch (e) {
        console.error("Failed to parse shipping address from metadata:", e);
      }
    }

    // Get billing address from Stripe
    let billingAddress = null;
    if (fullSession.customer_details?.address) {
      const billingAddr = fullSession.customer_details.address;
      billingAddress = {
        fullName: fullSession.customer_details.name || customerName,
        address: billingAddr.line1 || "",
        address2: billingAddr.line2 || "",
        city: billingAddr.city || "",
        state: billingAddr.state || "",
        zipCode: billingAddr.postal_code || "",
        country: billingAddr.country || "",
        phone: fullSession.customer_details?.phone || "",
      };
    } else if (fullSession.metadata?.billing_address) {
      try {
        billingAddress = JSON.parse(fullSession.metadata.billing_address);
      } catch (e) {
        console.error("Failed to parse billing address from metadata:", e);
      }
    } else {
      billingAddress = shippingAddress;
    }

    // Parse cart items from metadata
    let cartItems: CartItem[] = [];
    try {
      cartItems = fullSession.metadata?.cart_items
        ? JSON.parse(fullSession.metadata.cart_items)
        : [];
    } catch (e) {
      console.error("Failed to parse cart items from metadata:", e);
      cartItems = [];
    }

    // Transform line items to order items format
    const orderItems =
      fullSession.line_items?.data.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => {
          const quantity = item.quantity || 1;
          const pricePerUnit = item.amount_total
            ? item.amount_total / 100 / quantity
            : 0;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let cartItem: any = null;

          // Extract SKU from description
          const skuMatch = item.description?.match(/\(([^)]+)\)/);
          const extractedSku = skuMatch ? skuMatch[1] : null;

          if (extractedSku) {
            cartItem =
              cartItems.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ci: any) => ci.variantSku === extractedSku
              ) || null;
          }

          if (!cartItem && item.price?.metadata?.product_id) {
            cartItem =
              cartItems.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ci: any) => ci.id === item.price.metadata.product_id
              ) || null;
          }

          if (!cartItem && cartItems.length > 0) {
            cartItem = cartItems[0];
          }

          const productId =
            cartItem?.id ||
            item.price?.metadata?.product_id ||
            item.price?.product_data?.metadata?.product_id ||
            null;

          if (!productId) {
            console.error("❌ Fallback: Missing product ID for line item:", item);
            throw new Error("Cannot create order item without product ID");
          }

          const productCode =
            cartItem?.code ||
            item.price?.metadata?.product_code ||
            item.price?.product_data?.metadata?.product_code ||
            "";

          const hasVariant =
            cartItem &&
            cartItem.variantId &&
            cartItem.variantId !== "" &&
            cartItem.variantName &&
            cartItem.variantName !== "";

          const productSlug =
            cartItem?.product?.slug ||
            item.price?.metadata?.product_slug ||
            item.price?.product_data?.metadata?.product_slug ||
            (item.description || cartItem?.name || "Product")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

          const productImage =
            cartItem?.image ||
            cartItem?.product?.image ||
            item.price?.product_data?.images?.[0] ||
            "/placeholder-image.png";

          return {
            id: productId,
            code: productCode,
            product: {
              id: productId,
              product_code: productCode,
              name:
                item.description ||
                cartItem?.name ||
                cartItem?.product?.name ||
                "Product",
              slug: productSlug,
              image: productImage,
            },
            variant:
              hasVariant && cartItem
                ? {
                    id: cartItem.variantId || "",
                    name: cartItem.variantName || "Standard",
                    sku: cartItem.variantSku || "",
                    price_adjustment: cartItem.variantPriceAdjustment || 0,
                  }
                : null,
            quantity,
            pricePerUnit,
            totalPrice: pricePerUnit * quantity,
          };
        }
      ) || [];

    if (orderItems.length === 0) {
      console.error("❌ Fallback: No order items to create order");
      throw new Error("Cannot create order with no items");
    }

    // Calculate order totals
    const totalAmount = (fullSession.amount_total || 0) / 100;

    const discountAmount = fullSession.total_details?.amount_discount
      ? fullSession.total_details.amount_discount / 100
      : 0;

    const shippingMethodId = fullSession.metadata?.shipping_method || null;
    const shippingCost = fullSession.metadata?.shipping_cost
      ? parseFloat(fullSession.metadata.shipping_cost)
      : fullSession.total_details?.amount_shipping
        ? fullSession.total_details.amount_shipping / 100
        : 0;

    const specialOfferDelivery = fullSession.metadata?.special_offer_delivery
      ? parseFloat(fullSession.metadata.special_offer_delivery)
      : 0;

    const vatAmount = fullSession.metadata?.vat_amount
      ? parseFloat(fullSession.metadata.vat_amount)
      : 0;

    const taxAmount = fullSession.total_details?.amount_tax
      ? fullSession.total_details.amount_tax / 100
      : 0;

    const subtotal = fullSession.metadata?.subtotal
      ? parseFloat(fullSession.metadata.subtotal)
      : totalAmount - shippingCost - taxAmount - vatAmount + discountAmount;

    // Create order in Supabase
    const orderData = {
      userId: userId || undefined,
      email: userEmail || "guest@checkout.com",
      items: orderItems as unknown as CartItem[],
      shippingAddress: shippingAddress || {
        fullName: customerName,
        address: "Address will be collected",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      billingAddress: billingAddress ||
        shippingAddress || {
          fullName: customerName,
          address: "Same as shipping",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      specialOfferDelivery: specialOfferDelivery,
      shippingMethod: shippingMethodId || undefined,
      shippingCost: shippingCost,
      vatAmount: vatAmount,
      vatRate: 0.2,
      tax: taxAmount,
      total: totalAmount,
      status: "processing" as const,
      stripeSessionId: fullSession.id,
      paymentIntentId: fullSession.payment_intent as string,
    };

    const orderId = await createOrder(orderData);
    console.log("✅ Fallback order created with ID:", orderId);

    // Fetch and return the complete order
    const order = await getOrderById(orderId);

    // Try to send confirmation email (non-blocking)
    try {
      const { sendOrderConfirmationEmail } = await import(
        "@/services/emails/email.service"
      );

      if (order && userEmail) {
        const emailResult = await sendOrderConfirmationEmail(order, userEmail);
        if (!emailResult.success) {
          console.error(`⚠️ Fallback: Failed to send email: ${emailResult.error}`);
        }
      }
    } catch (emailError) {
      console.error("⚠️ Fallback: Error sending confirmation email:", emailError);
    }

    return order;
  } catch (error) {
    console.error("❌ Fallback: Failed to create order from session:", error);
    return null;
  }
}
