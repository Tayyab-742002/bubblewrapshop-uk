import { type SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { product } from "./product";
import { productVariant } from "./productVariant";
import { pricingTier } from "./pricingTier";
import { banner } from "./banner";
import { announcement } from "./announcement";
import { blogPost } from "./blog-post";
import { guide } from "./guide";
import { specialOffer } from "./specialOffer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core content types
    category,
    product,
    specialOffer,
    banner,
    announcement,
    blogPost,
    guide,

    // Embedded types
    productVariant,
    pricingTier,
  ],
};
