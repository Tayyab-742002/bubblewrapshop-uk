export interface QuantityOption {
  label: string; // e.g., "50 Pouches", "100 Pouches"
  quantity: number; // e.g., 50, 100, 500
  unit: string; // e.g., "Pouches", "Packets"
  pricePerUnit?: number; // Optional: specific price for this quantity option
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price_adjustment: number;
  quantityOptions?: QuantityOption[]; // Optional: only for products sold in packets/pouches
  pricingTiers?: PricingTier[]; // Optional: variant-specific pricing tiers (overrides product-level tiers)
}

export interface PricingTier {
  minQuantity: number;
  maxQuantity?: number;
  discount: number; // Required: Discount percentage (0-100)
  label?: string; // e.g., "Wholesale", "10% Off"
}

// Product FAQ for rich snippets
export interface ProductFaq {
  question: string;
  answer: string;
}

// Product dimensions for schema markup
export interface ProductDimensions {
  length?: number; // cm
  width?: number; // cm
  height?: number; // cm
}

export interface Product {
  id: string;
  product_code: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  imageAlt?: string; // Alt text for main image (SEO)
  images?: string[]; // Multiple images for gallery
  imagesAlt?: string[]; // Alt text for gallery images (SEO)
  basePrice: number;
  discount?: number;
  variants?: ProductVariant[];
  category?: string;
  categorySlug?: string; // Category slug for filtering
  pricingTiers?: PricingTier[]; // Tiered pricing for bulk orders
  specifications?: Record<string, string>; // Product specifications
  delivery?: string; // Delivery information

  // Basic SEO fields
  seoTitle?: string; // Custom SEO title
  seoDescription?: string; // Custom SEO description
  seoKeywords?: string[]; // Custom SEO keywords (PRIMARY first, then SECONDARY)

  // 2026 AI & EEAT fields
  llmSummary?: string; // AI-optimized summary for SGE/AI Overviews
  expertTip?: string; // EEAT expert advice
  materialFeel?: string; // "Squeeze test" sensory description
  useCases?: string[]; // Common use cases for entity saliency
  faqs?: ProductFaq[]; // Product FAQs for rich snippets

  // Google Shopping / Merchant fields
  gtin?: string; // Global Trade Item Number (EAN/UPC)
  mpn?: string; // Manufacturer Part Number
  brand?: string; // Brand name (defaults to "Bubble Wrap Shop")
  weight?: number; // Weight in kg
  dimensions?: ProductDimensions; // Length, width, height in cm
}
