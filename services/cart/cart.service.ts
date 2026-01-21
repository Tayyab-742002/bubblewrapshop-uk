import { CartItem, Order, ShippingAddress, BillingAddress } from "@/types/cart";
import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

// Database response types from Supabase (snake_case)
interface SupabaseOrderData {
  id: string;
  user_id: string | null;
  items: CartItem[];
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  total_amount: number;
  shipping?: number | null;
  status: string;
  created_at: string;
  stripe_payment_intent_id?: string | null;
}

/**
 * Cart Service
 * Handles cart persistence and order management with Supabase
 * Reference: Architecture.md Section 4.3
 */

/**
 * Save cart to Supabase
 * Persists cart to Supabase database with proper RLS policies
 */
export async function saveCartToSupabase(
  cartItems: CartItem[],
  userId?: string,
  sessionId?: string
): Promise<void> {
  try {
    const supabase = createClient() as SupabaseClient;

    // Prepare cart data
    const cartData = {
      items: cartItems,
      updated_at: new Date().toISOString(),
    };

    if (userId) {
      // Authenticated user cart - verify session first

      const {
        data: { user: authUser },
        error: sessionError,
      } = await supabase.auth.getUser();

      if (sessionError || !authUser) {
        console.error("Session verification failed:", sessionError?.message);
        throw new Error(`Authentication required: ${sessionError?.message}`);
      }

      if (authUser.id !== userId) {
        console.error("User ID mismatch:", {
          authUserId: authUser.id,
          providedUserId: userId,
        });
        throw new Error("User ID mismatch - authentication error");
      }

      // Authenticated user cart - check if cart exists

      const { data: existingCart, error: checkError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking for existing cart:", checkError);
        throw checkError;
      }

      if (existingCart) {
        // If no items, delete cart row instead of storing empty array
        if (cartItems.length === 0) {
          const { error } = await supabase
            .from("carts")
            .delete()
            .eq("user_id", userId);

          if (error) {
            throw error;
          }

          return;
        }
        // Update existing cart

        const { error } = await supabase
          .from("carts")
          .update({
            items: cartData.items,
            updated_at: cartData.updated_at,
          } as Record<string, unknown>)
          .eq("user_id", userId);

        if (error) {
          console.error("Error updating authenticated cart:", error);
          throw error;
        }
      } else {
        // If no items, nothing to persist
        if (cartItems.length === 0) {
          return;
        }
        // Insert new car
        const { error } = await supabase.from("carts").insert({
          user_id: userId,
          session_id: null,
          items: cartData.items,
          updated_at: cartData.updated_at,
        } as Record<string, unknown>);

        if (error) {
          console.error("Error creating authenticated cart:", error);
          throw error;
        }
      }
    } else if (sessionId) {
      // Guest cart - check if cart exists
      const { data: existingCart, error: checkError } = await supabase
        .from("carts")
        .select("id")
        .eq("session_id", sessionId)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking for existing guest cart:", checkError);
        throw checkError;
      }

      if (existingCart) {
        // If no items, delete cart row instead of storing empty array
        if (cartItems.length === 0) {
          const { error } = await supabase
            .from("carts")
            .delete()
            .eq("session_id", sessionId);

          if (error) {
            console.error("Error deleting guest cart:", error);
            throw error;
          }
          return;
        }
        // Update existing guest cart
        const { error } = await supabase
          .from("carts")
          .update({
            items: cartData.items,
            updated_at: cartData.updated_at,
          } as Record<string, unknown>)
          .eq("session_id", sessionId);

        if (error) {
          console.error("Error updating guest cart:", error);
          throw error;
        }
      } else {
        // If no items, nothing to persist
        if (cartItems.length === 0) {
          return;
        }
        // Insert new guest cart
        const { error } = await supabase.from("carts").insert({
          user_id: null,
          session_id: sessionId,
          items: cartData.items,
          updated_at: cartData.updated_at,
        } as Record<string, unknown>);

        if (error) {
          console.error("Error creating guest cart:", error);
          throw error;
        }
      }
    } else {
      throw new Error("Either userId or sessionId must be provided");
    }
  } catch (error) {
    console.error("Failed to save cart to Supabase:", error);
    throw error;
  }
}

/**
 * Load cart from Supabase
 * Fetches cart from Supabase database
 */
export async function loadCartFromSupabase(
  userId?: string,
  sessionId?: string
): Promise<CartItem[]> {
  try {
    const supabase = createClient() as SupabaseClient;

    if (userId) {
      // Load authenticated user cart - verify session first
      const {
        data: { user: authUser },
        error: sessionError,
      } = await supabase.auth.getUser();

      if (sessionError || !authUser) {
        console.error(
          "Session verification failed for loadCart:",
          sessionError?.message
        );
        throw new Error(`Authentication required: ${sessionError?.message}`);
      }

      if (authUser.id !== userId) {
        console.error("User ID mismatch for loadCart:", {
          authUserId: authUser.id,
          providedUserId: userId,
        });
        throw new Error("User ID mismatch - authentication error");
      }

      const { data, error } = await supabase
        .from("carts")
        .select("items")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        console.error("Error loading authenticated cart:", error);
        throw error;
      }

      return data?.items || [];
    } else if (sessionId) {
      // Load guest cart
      const { data, error } = await supabase
        .from("carts")
        .select("items")
        .eq("session_id", sessionId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        console.error("Error loading guest cart:", error);
        throw error;
      }

      return data?.items || [];
    } else {
      throw new Error("Either userId or sessionId must be provided");
    }
  } catch (error) {
    console.error("Failed to load cart from Supabase:", error);
    throw error;
  }
}




