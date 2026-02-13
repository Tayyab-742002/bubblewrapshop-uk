import { Product } from "./product";

export interface SpecialOffer {
  id: string;
  title: string;
  slug: string;
  product: Product; // Referenced product with all its data
  targetedVariants?: string[]; // SKUs of variants this offer applies to
  deliveryCharge: number; // Fixed delivery charge for this offer (e.g., 3.99)
  badgeText?: string;
  badgeColor: "red" | "orange" | "green" | "blue";
  shortDescription?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}
