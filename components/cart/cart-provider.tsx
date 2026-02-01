"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCartStore, cartStorageHelpers } from "@/lib/stores/cart-store";
import { useAuth } from "@/components/auth/auth-provider";
import { saveCartToSupabase } from "@/services/cart/cart.service";
import { createClient } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

/**
 * Cart Provider Component
 * Handles cart initialization and authentication integration
 * - Guest users: localStorage (manual persistence)
 * - Authenticated users: Supabase database with Realtime subscriptions
 * - Auto-migrates localStorage cart to Supabase on login
 * - Clears localStorage for authenticated users
 *
 * IMPORTANT: Realtime subscription is managed carefully to avoid unnecessary
 * reconnections. The subscription persists through the session and is only
 * cleaned up on explicit logout or component unmount.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading } = useAuth();
  const { initializeCart } = useCartStore();

  // Use refs to track state without causing re-renders
  const prevUserIdRef = useRef<string | null>(null);
  const hasMigratedRef = useRef(false);
  const subscriptionRef = useRef<RealtimeChannel | null>(null);
  const subscriptionUserIdRef = useRef<string | null>(null);
  const isInitializingRef = useRef(false);

  // Stable reference to user ID
  const userId = user?.id || null;

  // Initialize cart when auth state changes
  const initializeCartWithAuth = useCallback(async () => {
    // Prevent concurrent initializations
    if (isInitializingRef.current) {
      return;
    }

    isInitializingRef.current = true;

    try {
      // Check if this is a login transition (different user than before)
      const isNewLogin = userId && userId !== prevUserIdRef.current;
      const isLogout = !userId && prevUserIdRef.current;

      if (userId) {
        // User is authenticated
        if (isNewLogin && !hasMigratedRef.current) {
          // First time logging in - check if localStorage cart has items
          const guestCartItems = cartStorageHelpers.loadGuestCart();

          if (guestCartItems.length > 0) {
            // Migrate localStorage cart to Supabase
            let retries = 0;
            const maxRetries = 3;

            while (retries < maxRetries) {
              try {
                if (process.env.NODE_ENV === "development") {
                  console.log(
                    `[Cart Provider] Migrating ${guestCartItems.length} items to Supabase (attempt ${retries + 1}/${maxRetries})`
                  );
                }
                await saveCartToSupabase(guestCartItems, userId);
                if (process.env.NODE_ENV === "development") {
                  console.log("[Cart Provider] Cart migrated successfully");
                }
                break;
              } catch (error) {
                retries++;
                if (retries < maxRetries) {
                  await new Promise((resolve) =>
                    setTimeout(resolve, 100 * Math.pow(2, retries - 1))
                  );
                } else if (process.env.NODE_ENV === "development") {
                  console.warn(
                    "[Cart Provider] Failed to migrate cart after all retries:",
                    error
                  );
                }
              }
            }
          }

          // Clear localStorage after migration attempt
          cartStorageHelpers.clearGuestCart();
          if (process.env.NODE_ENV === "development") {
            console.log("[Cart Provider] Guest cart cleared from localStorage");
          }
          hasMigratedRef.current = true;
        }

        // Initialize with user ID (loads from Supabase)
        await initializeCart(userId);
        prevUserIdRef.current = userId;
      } else if (isLogout) {
        // User logged out - reset state
        hasMigratedRef.current = false;
        useCartStore.setState({ isInitialized: false });
        await initializeCart();
        prevUserIdRef.current = null;

        if (process.env.NODE_ENV === "development") {
          console.log("[Cart Provider] User logged out, switched to guest cart");
        }
      } else if (!prevUserIdRef.current) {
        // Initial load as guest
        await initializeCart();
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Cart Provider] Failed to initialize cart:", error);
      }
    } finally {
      isInitializingRef.current = false;
    }
  }, [userId, initializeCart]);

  // Initialize cart when auth state settles
  useEffect(() => {
    if (!loading) {
      initializeCartWithAuth();
    }
  }, [loading, initializeCartWithAuth]);

  // Set up Supabase Realtime subscription for authenticated users
  useEffect(() => {
    // Case 1: User logged out - clean up subscription
    if (!userId && subscriptionRef.current) {
      if (process.env.NODE_ENV === "development") {
        console.log("[Cart Provider] Cleaning up Realtime subscription (user logged out)");
      }
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
      subscriptionUserIdRef.current = null;
      return;
    }

    // Case 2: No user - nothing to do
    if (!userId) {
      return;
    }

    // Case 3: Subscription already exists for this user - keep it
    if (subscriptionRef.current && subscriptionUserIdRef.current === userId) {
      return;
    }

    // Case 4: Different user - clean up old subscription first
    if (subscriptionRef.current && subscriptionUserIdRef.current !== userId) {
      if (process.env.NODE_ENV === "development") {
        console.log("[Cart Provider] User changed, cleaning up old subscription");
      }
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    // Case 5: Create new subscription for current user
    const supabase = createClient();

    if (process.env.NODE_ENV === "development") {
      console.log("[Cart Provider] Setting up Realtime subscription for user:", userId);
    }

    const channel = supabase
      .channel(`cart-changes-${userId}-${Date.now()}`) // Unique channel name
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "carts",
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          if (process.env.NODE_ENV === "development") {
            console.log("[Cart Provider] Cart changed via Realtime:", payload.eventType);
          }

          try {
            const { loadCartFromSupabase } = await import(
              "@/services/cart/cart.service"
            );
            const cartItems = await loadCartFromSupabase(userId);

            useCartStore.setState({
              items: cartItems,
            });

            if (process.env.NODE_ENV === "development") {
              console.log(
                "[Cart Provider] Cart reloaded from Realtime:",
                cartItems.length,
                "items"
              );
            }
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "[Cart Provider] Failed to reload cart after Realtime update:",
                error
              );
            }
          }
        }
      )
      .subscribe((status) => {
        if (process.env.NODE_ENV === "development") {
          console.log("[Cart Provider] Realtime subscription status:", status);
        }
      });

    subscriptionRef.current = channel;
    subscriptionUserIdRef.current = userId;

    // Cleanup only on component unmount
    return () => {
      if (process.env.NODE_ENV === "development") {
        console.log("[Cart Provider] Component unmounting, cleaning up subscription");
      }
      channel.unsubscribe();
      subscriptionRef.current = null;
      subscriptionUserIdRef.current = null;
    };
  }, [userId]);

  return <>{children}</>;
}
