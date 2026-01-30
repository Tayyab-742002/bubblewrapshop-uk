import { defineType, defineField } from "sanity";
import { BookOpen } from "lucide-react";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: BookOpen,
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
      description: "The main title of the blog post (H1)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(10).max(100),
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
        "Short description shown in blog listings (150-200 chars for optimal display)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().min(50).max(250),
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "Main blog post content - use headings (H2, H3) for structure",
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
            ],
          },
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      description:
        "Main image for the blog post (recommended: 1200x630 for optimal social sharing)",
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
      description: "Blog post category for filtering and organization",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Packaging Tips", value: "packaging-tips" },
          { title: "Product Guides", value: "product-guides" },
          { title: "Buying Guides", value: "buying-guides" },
          { title: "Industry News", value: "industry-news" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Business", value: "business" },
          { title: "How-To Guides", value: "how-to-guides" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Tags for categorizing and internal linking (3-8 tags recommended)",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      description: "When the blog post was published",
      type: "datetime",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      description: "Estimated reading time in minutes (auto-calculate or set manually)",
      type: "number",
      group: "content",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      description: "Whether this blog post is published and visible",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),

    // === SEO GROUP ===
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      description:
        "Custom title for search engines (50-60 chars). Include PRIMARY keyword. Leave blank to use main title.",
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
        "2-3 sentence summary optimized for AI Overviews/SGE. Include: what the article covers, who it's for, key takeaway. Example: 'A comprehensive guide to choosing the right bubble wrap size for your packaging needs. Perfect for ecommerce sellers and businesses shipping fragile items. Learn the differences between small and large bubble wrap with expert recommendations.'",
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
      description: "Author of the blog post (for EEAT - expertise signal)",
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
        "Pro tip from packaging experts. Builds trust/authority. Example: 'Our packaging specialists recommend using two layers of small bubble wrap for electronics to prevent static damage during shipping.'",
      type: "text",
      rows: 2,
      group: "eeat",
    }),
    defineField({
      name: "faqs",
      title: "Article FAQs",
      description:
        "FAQs related to this article for rich snippets (FAQ Schema). Add 3-5 relevant questions.",
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
      description: "Link to related products mentioned in the article (internal linking)",
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
      name: "sources",
      title: "Sources & References",
      description:
        "External sources referenced in the article (builds credibility/EEAT)",
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
        "packaging-tips": "Packaging Tips",
        "product-guides": "Product Guides",
        "buying-guides": "Buying Guides",
        "industry-news": "Industry News",
        sustainability: "Sustainability",
        business: "Business",
        "how-to-guides": "How-To Guides",
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
      title: "Published Date, Oldest",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
