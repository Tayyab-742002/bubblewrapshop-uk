import { defineType, defineField } from "sanity";
import { FileText } from "lucide-react";

export const guide = defineType({
  name: "guide",
  title: "Buying Guide",
  type: "document",
  icon: FileText,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "seo",
      title: "SEO & AI Optimization",
    },
    {
      name: "eeat",
      title: "EEAT & Authority",
    },
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: "title",
      title: "Title",
      description: "The main title of the buying guide (H1)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL-friendly version of the title",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "Short description shown in guide listings (150-200 chars for optimal display)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().min(50).max(300),
    }),
    defineField({
      name: "content",
      title: "Content",
      description:
        "Main guide content - use headings (H2, H3) for structure. Include detailed sections for each topic.",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                  {
                    name: "openInNewTab",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: false,
                  },
                ],
              },
              {
                name: "internalLink",
                type: "object",
                title: "Internal Link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [{ type: "product" }, { type: "category" }],
                  },
                ],
              },
            ],
          },
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
            { title: "Checklist", value: "checklist" },
          ],
        },
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description:
                "Important for SEO and accessibility. Describe what's in the image.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption to display below the image",
            }),
          ],
        },
        {
          type: "object",
          name: "comparisonTable",
          title: "Comparison Table",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Table Title",
            },
            {
              name: "headers",
              type: "array",
              title: "Column Headers",
              of: [{ type: "string" }],
            },
            {
              name: "rows",
              type: "array",
              title: "Rows",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "cells",
                      type: "array",
                      of: [{ type: "string" }],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title: title || "Comparison Table",
              };
            },
          },
        },
        {
          type: "object",
          name: "calloutBox",
          title: "Callout Box",
          fields: [
            {
              name: "type",
              type: "string",
              title: "Callout Type",
              options: {
                list: [
                  { title: "Tip", value: "tip" },
                  { title: "Warning", value: "warning" },
                  { title: "Info", value: "info" },
                  { title: "Checklist", value: "checklist" },
                ],
              },
            },
            {
              name: "title",
              type: "string",
              title: "Callout Title",
            },
            {
              name: "content",
              type: "text",
              title: "Callout Content",
            },
          ],
          preview: {
            select: {
              title: "title",
              type: "type",
            },
            prepare({ title, type }) {
              const typeLabels: Record<string, string> = {
                tip: "Tip",
                warning: "Warning",
                info: "Info",
                checklist: "Checklist",
              };
              return {
                title: title || `${typeLabels[type] || "Callout"} Box`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      description:
        "Main image for the guide (recommended: 1200x630 for optimal social sharing)",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Important for SEO and accessibility. Describe what's in the image.",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Guide category for filtering and organization",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Boxes", value: "boxes" },
          { title: "Protective Materials", value: "protective-materials" },
          { title: "Sealing Materials", value: "sealing-materials" },
          { title: "Shipping Supplies", value: "shipping-supplies" },
          { title: "Eco-Friendly", value: "eco-friendly" },
          { title: "Business Tips", value: "business-tips" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Topics Covered",
      description: "Key topics covered in this guide (shown as tags)",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required().min(3).max(8),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      description: "Estimated reading time in minutes",
      type: "number",
      group: "content",
      initialValue: 8,
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      description: "Whether this guide is published and visible",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      description: "When the guide was published",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      description: "When the guide was last significantly updated (for freshness signals)",
      type: "datetime",
      group: "content",
    }),

    // === SEO GROUP ===
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      description:
        "Custom title for search engines (50-60 chars). Include PRIMARY keyword + 'UK'. Leave blank to use main title.",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      description:
        "Meta description for search engines (150-160 chars). Include PRIMARY + SECONDARY keywords naturally.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      description:
        "Add 5-10 keywords. First 1-2 should be PRIMARY keywords, rest are SECONDARY/long-tail.",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "llmSummary",
      title: "AI Summary (LLM Optimized)",
      description:
        "2-3 sentence summary optimized for AI Overviews/SGE. Include: what the guide covers, who it's for, key takeaway. Example: 'A comprehensive guide to choosing the right bubble wrap for UK businesses. Covers bubble sizes, thickness options, and cost considerations. Perfect for ecommerce sellers and warehouse managers.'",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      description:
        "Only set if this content exists elsewhere. Leave blank for default canonical.",
      type: "url",
      group: "seo",
    }),

    // === EEAT GROUP ===
    defineField({
      name: "author",
      title: "Author Name",
      description: "Author of the guide (for EEAT - expertise signal)",
      type: "string",
      group: "eeat",
      initialValue: "Bubble Wrap Shop Team",
    }),
    defineField({
      name: "authorRole",
      title: "Author Role/Title",
      description:
        "Author's expertise/role (e.g., 'Packaging Specialist', 'Industry Expert')",
      type: "string",
      group: "eeat",
      initialValue: "Packaging Specialist",
    }),
    defineField({
      name: "authorImage",
      title: "Author Image",
      description: "Author photo for EEAT (shows expertise/trust)",
      type: "image",
      group: "eeat",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "expertTip",
      title: "Expert Tip (EEAT)",
      description:
        "Pro tip from packaging experts. Builds trust/authority. Shown prominently in the guide.",
      type: "text",
      rows: 2,
      group: "eeat",
    }),
    defineField({
      name: "faqs",
      title: "Guide FAQs",
      description:
        "FAQs related to this guide for rich snippets (FAQ Schema). Add 3-5 relevant questions.",
      type: "array",
      group: "eeat",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Question",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              type: "text",
              title: "Answer",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "question",
            },
          },
        },
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      description:
        "YouTube or Vimeo URL for video content (2026 SEO: video content ranks higher)",
      type: "url",
      group: "eeat",
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      description: "Link to products mentioned in the guide (internal linking & shopping intent)",
      type: "array",
      group: "eeat",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    }),
    defineField({
      name: "relatedCategories",
      title: "Related Categories",
      description: "Link to relevant product categories",
      type: "array",
      group: "eeat",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    }),
    defineField({
      name: "relatedGuides",
      title: "Related Guides",
      description: "Link to other related buying guides",
      type: "array",
      group: "eeat",
      of: [
        {
          type: "reference",
          to: [{ type: "guide" }],
        },
      ],
    }),
    defineField({
      name: "sources",
      title: "Sources & References",
      description:
        "External sources referenced in the guide (builds credibility/EEAT)",
      type: "array",
      group: "eeat",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Source Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "url",
              title: "Source URL",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "url",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "featuredImage",
      isPublished: "isPublished",
    },
    prepare({ title, subtitle, media, isPublished }) {
      const categoryLabels: Record<string, string> = {
        boxes: "Boxes",
        "protective-materials": "Protective Materials",
        "sealing-materials": "Sealing Materials",
        "shipping-supplies": "Shipping Supplies",
        "eco-friendly": "Eco-Friendly",
        "business-tips": "Business Tips",
      };

      return {
        title: `${isPublished ? "" : "📝 "}${title}`,
        subtitle: categoryLabels[subtitle] || subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
});
