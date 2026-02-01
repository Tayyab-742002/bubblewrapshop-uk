import { CartItem } from "@/types/cart";
import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Cart Service
 * Handles cart persistence and order management with Supabase
 * Reference: Architecture.md Section 4.3
 *
 * IMPORTANT: This service now handles errors gracefully.
 * If the carts table doesn't exist or is inaccessible, the app will
 * continue to work using localStorage for cart persistence.
 */

// Cache the table accessibility check result to avoid repeated queries
let cartsTableAccessible: boolean | null = null;
let lastAccessibilityCheck = 0;
const ACCESSIBILITY_CHECK_INTERVAL = 60000; // 1 minute

/**
 * Check if the carts table exists and is accessible
 * Results are cached for 1 minute to avoid repeated queries
 */
async function isCartsTableAccessible(
  supabase: SupabaseClient
): Promise<boolean> {
  const now = Date.now();

  // Return cached result if still valid
  if (
    cartsTableAccessible !== null &&
    now - lastAccessibilityCheck < ACCESSIBILITY_CHECK_INTERVAL
  ) {
    return cartsTableAccessible;
  }

  try {
    // Try a simple query to check if table is accessible
    const { error } = await supabase
      .from("carts")
      .select("id")
      .limit(1);

    // If no error or just "no rows" error, table is accessible
    if (!error || error.code === "PGRST116") {
      cartsTableAccessible = true;
      lastAccessibilityCheck = now;
      return true;
    }

    // Log the specific error for debugging
    if (process.env.NODE_ENV === "development") {
      console.warn("[Cart Service] Carts table not accessible:", error.message, error.code);
    }

    cartsTableAccessible = false;
    lastAccessibilityCheck = now;
    return false;
  } catch {
    cartsTableAccessible = false;
    lastAccessibilityCheck = now;
    return false;
  }
}

/**
 * Save cart to Supabase
 * Persists cart to Supabase database with proper RLS policies
 * Returns silently on errors to allow app to continue with localStorage fallback
 */
export async function saveCartToSupabase(
  cartItems: CartItem[],
  userId?: string,
  sessionId?: string
): Promise<void> {
  try {
    const supabase = createClient() as SupabaseClient;

    // Check if carts table is accessible first
    const tableAccessible = await isCartsTableAccessible(supabase);
    if (!tableAccessible) {
      // Don't log repeatedly - table check already logged
      return;
    }

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
        // Session might be temporarily invalid - don't throw
        return;
      }

      if (authUser.id !== userId) {
        // User ID mismatch - don't throw, just skip
        return;
      }

      // Check if cart exists
      const { data: existingCart, error: checkError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") {
        // Error checking cart - skip silently
        return;
      }

      if (existingCart) {
        // If no items, delete cart row instead of storing empty array
        if (cartItems.length === 0) {
          await supabase
            .from("carts")
            .delete()
            .eq("user_id", userId);
          return;
        }
        // Update existing cart
        await supabase
          .from("carts")
          .update({
            items: cartData.items,
            updated_at: cartData.updated_at,
          } as Record<string, unknown>)
          .eq("user_id", userId);
      } else {
        // If no items, nothing to persist
        if (cartItems.length === 0) {
          return;
        }
        // Insert new cart
        await supabase.from("carts").insert({
          user_id: userId,
          session_id: null,
          items: cartData.items,
          updated_at: cartData.updated_at,
        } as Record<string, unknown>);
      }
    } else if (sessionId) {
      // Guest cart - check if cart exists
      const { data: existingCart, error: checkError } = await supabase
        .from("carts")
        .select("id")
        .eq("session_id", sessionId)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") {
        return;
      }

      if (existingCart) {
        if (cartItems.length === 0) {
          await supabase
            .from("carts")
            .delete()
            .eq("session_id", sessionId);
          return;
        }
        await supabase
          .from("carts")
          .update({
            items: cartData.items,
            updated_at: cartData.updated_at,
          } as Record<string, unknown>)
          .eq("session_id", sessionId);
      } else {
        if (cartItems.length === 0) {
          return;
        }
        await supabase.from("carts").insert({
          user_id: null,
          session_id: sessionId,
          items: cartData.items,
          updated_at: cartData.updated_at,
        } as Record<string, unknown>);
      }
    }
  } catch (error) {
    // Log in development only - don't throw
    if (process.env.NODE_ENV === "development") {
      console.warn("[Cart Service] Failed to save cart:", error);
    }
  }
}

/**
 * Load cart from Supabase
 * Fetches cart from Supabase database
 * Returns empty array on errors to allow app to continue with localStorage fallback
 */
export async function loadCartFromSupabase(
  userId?: string,
  sessionId?: string
): Promise<CartItem[]> {
  try {
    const supabase = createClient() as SupabaseClient;

    // Check if carts table is accessible first
    const tableAccessible = await isCartsTableAccessible(supabase);
    if (!tableAccessible) {
      return [];
    }

    if (userId) {
      // Load authenticated user cart - verify session first
      const {
        data: { user: authUser },
        error: sessionError,
      } = await supabase.auth.getUser();

      if (sessionError || !authUser) {
        return [];
      }

      if (authUser.id !== userId) {
        return [];
      }

      const { data, error } = await supabase
        .from("carts")
        .select("items")
        .eq("user_id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        return [];
      }

      return data?.items || [];
    } else if (sessionId) {
      const { data, error } = await supabase
        .from("carts")
        .select("items")
        .eq("session_id", sessionId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        return [];
      }

      return data?.items || [];
    }

    return [];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Cart Service] Failed to load cart:", error);
    }
    return [];
  }
}
