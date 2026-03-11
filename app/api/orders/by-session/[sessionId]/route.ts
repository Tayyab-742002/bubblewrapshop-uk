/**
 * Get Order by Stripe Session ID
 * Fetches order details after successful payment
 * Includes fallback: if webhook hasn't created the order yet, attempts to create it
 */

import { NextRequest, NextResponse } from "next/server";
import { getOrderByStripeSessionId } from "@/services/orders/order.service";
import { stripe } from "@/lib/stripe/config";
import { createOrderFromSession } from "@/services/orders/order-fallback.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // First attempt: fetch order from Supabase
    let order = await getOrderByStripeSessionId(sessionId);

    if (order) {
      return NextResponse.json(order);
    }

    // Order not found — check the "fallback" query param
    // The client sends ?fallback=true on the final retry to trigger order creation
    const url = new URL(request.url);
    const shouldFallback = url.searchParams.get("fallback") === "true";

    if (!shouldFallback) {
      // Normal 404 — client will retry
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Fallback: Verify with Stripe that payment was successful, then create order
    console.log("⚠️ Order not found after retries, attempting fallback creation for session:", sessionId);

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: [
          "line_items",
          "line_items.data.price",
          "customer_details",
          "payment_intent",
          "total_details",
        ],
      });

      if (session.payment_status !== "paid") {
        console.error("❌ Fallback: Session is not paid:", session.payment_status);
        return NextResponse.json(
          { error: "Payment not completed" },
          { status: 402 }
        );
      }

      // Create order from session (replicates webhook logic)
      const fallbackOrder = await createOrderFromSession(session);

      if (fallbackOrder) {
        console.log("✅ Fallback order created successfully:", fallbackOrder.id);
        return NextResponse.json(fallbackOrder);
      }

      // One more attempt to fetch — maybe it was created between our check and fallback
      order = await getOrderByStripeSessionId(sessionId);
      if (order) {
        return NextResponse.json(order);
      }

      console.error("❌ Fallback: Could not create or find order for session:", sessionId);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    } catch (fallbackError) {
      console.error("❌ Fallback order creation failed:", fallbackError);

      // Last-ditch: maybe the order was created by the webhook in the meantime
      order = await getOrderByStripeSessionId(sessionId);
      if (order) {
        return NextResponse.json(order);
      }

      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in order lookup:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
