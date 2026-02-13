import { defineType, defineField } from "sanity";
import { VariantPickerInput } from "../components/inputs/VariantPickerInput";

export const specialOffer = defineType({
  name: "specialOffer",
  title: "Special Offer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Offer Title",
      type: "string",
      description: 'e.g., "Summer Clearance Sale", "20% Off Bubble Mailers"',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
      description: "The product this special offer applies to",
    }),
    defineField({
      name: "targetedVariants",
      title: "Targeted Variants (Optional)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Select which variants this offer applies to. Leave all unchecked to apply to ALL variants.",
      components: {
        input: VariantPickerInput,
      },
    }),
    defineField({
      name: "deliveryCharge",
      title: "Delivery Charge",
      type: "number",
      description:
        "Fixed delivery charge for this special offer (e.g., 3.99). This is charged once per order, not per item.",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      description: 'e.g., "SALE", "20% OFF", "SPECIAL", "LIMITED TIME"',
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: "badgeColor",
      title: "Badge Color",
      type: "string",
      options: {
        list: [
          { title: "Red (Urgent)", value: "red" },
          { title: "Orange (Hot Offer)", value: "orange" },
          { title: "Green (Eco/Value)", value: "green" },
          { title: "Blue (New)", value: "blue" },
        ],
      },
      initialValue: "red",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Brief description for offer card on homepage",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description:
        "When this offer becomes active (optional - leave empty for immediate)",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description:
        "When this offer expires (optional - leave empty for no expiry)",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Manually enable/disable this offer",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: true,
      description: "Show this offer in the Special Offers section on homepage",
    }),
    defineField({
      name: "sortOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1, 2, 3...)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      productName: "product.name",
      badgeText: "badgeText",
      deliveryCharge: "deliveryCharge",
      isActive: "isActive",
      isFeatured: "isFeatured",
      endDate: "endDate",
    },
    prepare({
      title,
      productName,
      badgeText,
      deliveryCharge,
      isActive,
      isFeatured,
      endDate,
    }) {
      const statusIcon = isActive ? "✅" : "❌";
      const featuredIcon = isFeatured ? "⭐" : "";
      const expiryText = endDate
        ? ` (expires ${new Date(endDate).toLocaleDateString()})`
        : "";
      const deliveryText = deliveryCharge
        ? ` • £${deliveryCharge.toFixed(2)} delivery`
        : " • Free delivery";
      return {
        title: `${statusIcon}${featuredIcon} ${title}`,
        subtitle: `${productName} • ${badgeText || "No badge"}${deliveryText}${expiryText}`,
      };
    },
  },
});
