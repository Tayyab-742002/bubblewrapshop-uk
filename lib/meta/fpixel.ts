// Meta Pixel ID from environment variables
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Type declarations for Facebook Pixel
declare global {
  interface Window {
    fbq: (
      action: string,
      eventOrPixelId: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq: unknown;
  }
}

// Check if pixel is available
const isBrowser = typeof window !== "undefined";
const isPixelAvailable = () => isBrowser && typeof window.fbq === "function";

/**
 * Track PageView event
 * Called on every page navigation
 */
export const pageview = (): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "PageView");
};

/**
 * Track custom event
 * @param name - Event name (e.g., "Lead", "Contact")
 * @param options - Event parameters
 */
export const event = (name: string, options: Record<string, unknown> = {}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", name, options);
};

// ============================================
// E-COMMERCE EVENTS FOR META ADS
// ============================================

/**
 * Track ViewContent event
 * Fire when a user views a product page
 */
export const viewContent = (params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "ViewContent", params);
};

/**
 * Track AddToCart event
 * Fire when a user adds an item to cart
 */
export const addToCart = (params: {
  content_name: string;
  content_ids: string[];
  content_type: string;
  value: number;
  currency: string;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "AddToCart", params);
};

/**
 * Track InitiateCheckout event
 * Fire when a user starts checkout
 */
export const initiateCheckout = (params: {
  content_ids: string[];
  contents: Array<{ id: string; quantity: number }>;
  num_items: number;
  value: number;
  currency: string;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "InitiateCheckout", params);
};

/**
 * Track Purchase event
 * Fire when a user completes a purchase
 */
export const purchase = (params: {
  content_ids: string[];
  contents: Array<{ id: string; quantity: number }>;
  content_type: string;
  num_items: number;
  value: number;
  currency: string;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "Purchase", params);
};

/**
 * Track Search event
 * Fire when a user searches for products
 */
export const search = (params: {
  search_string: string;
  content_ids?: string[];
  content_type?: string;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "Search", params);
};

/**
 * Track Lead event
 * Fire when a user submits a lead form (e.g., B2B request)
 */
export const lead = (params: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "Lead", params);
};

/**
 * Track Contact event
 * Fire when a user submits a contact form
 */
export const contact = (): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "Contact");
};

/**
 * Track ViewCategory event (Custom)
 * Fire when a user views a category page
 * Uses trackCustom for non-standard events as per Meta's documentation
 */
export const viewCategory = (params: {
  content_name: string;
  content_category: string;
  content_ids?: string[];
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("trackCustom", "ViewCategory", params);
};

/**
 * Track CompleteRegistration event
 * Fire when a user completes account registration
 */
export const completeRegistration = (params?: {
  content_name?: string;
  currency?: string;
  value?: number;
  status?: string;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "CompleteRegistration", params || {});
};

/**
 * Track AddPaymentInfo event
 * Fire when a user adds payment info during checkout
 */
export const addPaymentInfo = (params: {
  content_ids?: string[];
  contents?: Array<{ id: string; quantity: number }>;
  currency: string;
  value: number;
}): void => {
  if (!isPixelAvailable()) return;
  window.fbq("track", "AddPaymentInfo", params);
};
