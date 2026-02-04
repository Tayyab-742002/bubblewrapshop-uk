import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common";
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Lightbulb,
  HelpCircle,
} from "lucide-react";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { getGuideBySlug, getGuideSlugs, getRelatedGuides } from "@/sanity/lib";
import {
  Guide,
  GuideListing,
  StaticGuide,
  getGuideCategoryLabel,
  formatGuideReadTime,
  formatGuideDate,
} from "@/types/guide";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

// Static buying guide content (fallback)
const buyingGuides: Record<string, StaticGuide> = {
  "packaging-boxes-guide": {
    slug: "packaging-boxes-guide",
    title: "Complete Guide to Buying Packaging Boxes in the UK",
    excerpt:
      "Everything you need to know about choosing the right cardboard boxes for your business. Size, strength, material, and cost considerations.",
    category: "Boxes",
    readTime: "10 min",
    featuredImage:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Box types and materials",
      "Size selection",
      "Strength ratings",
      "Cost optimization",
      "UK suppliers",
    ],
    seoTitle:
      "Packaging Boxes Buying Guide UK | How to Choose Cardboard Boxes",
    seoDescription:
      "Complete guide to buying packaging boxes in the UK. Learn about box types, sizes, strength ratings, materials, and cost optimization for your business.",
    content: `# Complete Guide to Buying Packaging Boxes in the UK

Choosing the right packaging boxes is essential for protecting your products and managing shipping costs. This comprehensive guide covers everything UK businesses need to know about buying cardboard boxes.

## Understanding Box Types

### Single-Wall Cardboard Boxes
The most common type of packaging box, suitable for most shipping needs.

**Best For:**
- Lightweight items (under 20kg)
- Standard retail products
- Cost-effective shipping
- Short to medium distance shipping

**Cost Range:** £0.20-£1.50 per box (depending on size)

### Double-Wall Cardboard Boxes
Extra strength for heavier or more fragile items.

**Best For:**
- Heavy items (20-40kg)
- Fragile products
- Long-distance shipping
- Valuable items

**Cost Range:** £0.50-£3.00 per box

### Triple-Wall Cardboard Boxes
Maximum protection for very heavy or extremely fragile items.

**Best For:**
- Very heavy items (over 40kg)
- Industrial equipment
- International shipping
- Extremely fragile items

**Cost Range:** £1.00-£5.00+ per box

## Box Size Selection

### How to Measure Your Product
1. Measure length (longest side)
2. Measure width (shorter side)
3. Measure height (vertical dimension)
4. Add 2-5cm to each dimension for padding

### UK Standard Box Sizes

**Small Boxes (20-25cm)**
- Best for: Books, small electronics, jewelry
- Weight capacity: Up to 5-8kg
- Cost: £0.20-£0.50

**Medium Boxes (30-35cm)**
- Best for: Clothing, multiple items, medium electronics
- Weight capacity: Up to 15-20kg
- Cost: £0.50-£1.50

**Large Boxes (40-50cm)**
- Best for: Large items, bulk orders, home goods
- Weight capacity: Up to 25-30kg
- Cost: £1.00-£3.00

**Extra Large Boxes (50cm+)**
- Best for: Very large items, furniture parts, bulk shipments
- Weight capacity: Up to 40kg+
- Cost: £2.00-£5.00+

## Understanding Box Strength (ECT Rating)

Edge Crush Test (ECT) rating indicates box strength:

- **32 ECT**: Standard strength for lightweight items
- **44 ECT**: Medium strength for average weight items
- **48 ECT**: High strength for heavy items
- **55+ ECT**: Maximum strength for very heavy items

**Matching Strength to Weight:**
- Items under 10kg: 32 ECT
- Items 10-20kg: 44 ECT
- Items 20-30kg: 48 ECT
- Items over 30kg: 55+ ECT

## Material Considerations

### Kraft Cardboard
- Brown cardboard (most common)
- Strong and durable
- Fully recyclable
- Best for most applications

### White Cardboard
- Clean, professional appearance
- Slightly less strong than kraft
- Good for retail packaging
- More expensive than kraft

### Recycled Cardboard
- Eco-friendly option
- Variable strength
- Cost-effective
- Good for standard shipping

## Cost Optimization Strategies

### 1. Bulk Ordering
Ordering in larger quantities significantly reduces costs:
- **10-20% discount**: Orders over 500 boxes
- **20-30% discount**: Orders over 1,000 boxes
- **30%+ discount**: Orders over 5,000 boxes

### 2. Right-Sizing
Using correctly sized boxes saves money:
- Reduces material waste
- Lowers shipping costs
- Improves protection
- Better space utilization

### 3. Standard Sizes
Choosing standard sizes over custom:
- Lower cost per box
- Faster delivery
- Easier to stock
- Better availability

## UK-Specific Considerations

### Royal Mail Size Limits
- **Small Parcel**: Up to 45cm × 35cm × 16cm
- **Medium Parcel**: Up to 61cm × 46cm × 46cm
- **Large Parcel**: Up to 100cm × 70cm × 50cm

### Courier Requirements
- Most couriers accept up to 120cm in any dimension
- Weight restrictions apply
- Check specific carrier guidelines

### VAT Considerations
- Most boxes subject to 20% VAT
- B2B customers can reclaim VAT
- Factor VAT into cost calculations

## Where to Buy Packaging Boxes in the UK

### Online Suppliers
- **Advantages**: Convenient, bulk pricing, wide selection
- **Best For**: Regular orders, bulk purchases
- **Delivery**: Usually 1-3 business days

### Local Suppliers
- **Advantages**: Faster delivery, local support
- **Best For**: Urgent orders, local businesses
- **Delivery**: Often same or next day

### Wholesale Suppliers
- **Advantages**: Best prices for large quantities
- **Best For**: High-volume businesses
- **Delivery**: Varies by supplier

## Quality Checklist

When buying packaging boxes, check:
- [ ] Correct size for your products
- [ ] Appropriate strength rating (ECT)
- [ ] Good quality material
- [ ] Proper construction (no gaps, strong corners)
- [ ] Recyclable material
- [ ] Competitive pricing
- [ ] Reliable supplier
- [ ] Fast delivery options

## Best Practices

1. **Stock Multiple Sizes**: Keep 3-5 different sizes in stock
2. **Match Strength to Weight**: Don't over or under-specify
3. **Consider Shipping Costs**: Larger boxes cost more to ship
4. **Plan for Growth**: Order boxes that scale with your business
5. **Test Before Bulk Ordering**: Try sample sizes first

## Conclusion

Choosing the right packaging boxes requires understanding your product needs, shipping requirements, and budget constraints. By following this guide, UK businesses can make informed decisions that protect products while managing costs effectively.

Remember: The right box size and strength not only protects your products but also optimizes shipping costs and improves customer satisfaction.`,
  },
  "bubble-wrap-guide": {
    slug: "bubble-wrap-guide",
    title: "Bubble Wrap Buying Guide: Choose the Right Protection",
    excerpt:
      "Complete guide to selecting bubble wrap for your shipping needs. Learn about bubble sizes, thickness, and when to use different types.",
    category: "Protective Materials",
    readTime: "8 min",
    featuredImage:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Bubble sizes explained",
      "Thickness options",
      "When to use bubble wrap",
      "Cost considerations",
      "Environmental alternatives",
    ],
    seoTitle: "Bubble Wrap Buying Guide UK | How to Choose Bubble Wrap",
    seoDescription:
      "Complete guide to buying bubble wrap in the UK. Learn about bubble sizes, thickness, types, and when to use different bubble wrap for optimal protection.",
    content: `# Bubble Wrap Buying Guide: Choose the Right Protection

Bubble wrap is one of the most popular protective packaging materials. This guide helps UK businesses choose the right bubble wrap for their shipping needs.

## Understanding Bubble Sizes

### Small Bubbles (6mm)
- **Best For**: Lightweight, small items
- **Protection Level**: Standard
- **Cost**: Lower
- **Use Cases**: Electronics, glassware, small ceramics

### Medium Bubbles (10mm)
- **Best For**: Most standard items
- **Protection Level**: Good
- **Cost**: Moderate
- **Use Cases**: General fragile items, most shipping needs

### Large Bubbles (25mm)
- **Best For**: Heavy, large items
- **Protection Level**: Excellent
- **Cost**: Higher
- **Use Cases**: Large electronics, furniture parts, heavy items

## Thickness Options

### Standard Thickness (80-100 microns)
- Suitable for most items
- Good balance of protection and cost
- Most common choice

### Heavy-Duty Thickness (150+ microns)
- Extra protection for fragile items
- Better for heavy items
- Higher cost but better protection

## Types of Bubble Wrap

### Standard Bubble Wrap
- Clear plastic bubbles
- Most common type
- Good for general use
- Cost-effective

### Anti-Static Bubble Wrap
- Prevents static electricity
- Essential for electronics
- Slightly more expensive
- Protects sensitive components

### Perforated Bubble Wrap
- Easy to tear to size
- Reduces waste
- Convenient for packing
- Slightly higher cost

### Colored Bubble Wrap
- Branding opportunities
- Visual appeal
- Higher cost
- Less common

## When to Use Bubble Wrap

### Ideal For:
- Fragile items (glass, ceramics, electronics)
- Items with irregular shapes
- Light to medium weight items
- Standard shipping protection

### Not Ideal For:
- Very heavy items (may need foam)
- Items requiring moisture protection
- Temperature-sensitive items
- Items needing custom-fit protection

## Cost Considerations

### Standard Bubble Wrap
- **Cost**: £0.50-£2.00 per square meter
- **Best For**: Most shipping needs
- **Value**: Excellent protection-to-cost ratio

### Heavy-Duty Bubble Wrap
- **Cost**: £1.50-£3.50 per square meter
- **Best For**: Fragile or valuable items
- **Value**: Higher protection, higher cost

### Bulk Pricing
- Ordering in bulk reduces costs significantly
- 10-30% discount for large orders
- Consider annual needs when ordering

## How Much Bubble Wrap Do You Need?

### Calculation Method
1. Measure item dimensions
2. Calculate surface area
3. Add 20% for overlap and wrapping
4. Consider multiple layers for fragile items

### General Guidelines
- **Light Items**: 1-2 layers
- **Standard Items**: 2-3 layers
- **Fragile Items**: 3-4 layers
- **Very Fragile**: 4+ layers or double boxing

## Environmental Considerations

### Recyclability
- Bubble wrap is recyclable
- Check local recycling facilities
- Some areas have specific collection points
- Reusable if handled carefully

### Eco-Friendly Alternatives
- Biodegradable bubble wrap
- Paper-based alternatives
- Recycled bubble wrap
- Reusable packaging materials

## UK-Specific Information

### Availability
- Widely available from UK suppliers
- Next-day delivery options
- Bulk ordering available
- Various sizes and types stocked

### Recycling
- Accepted at most UK recycling centers
- Some councils collect separately
- Check local recycling guidelines
- Reuse when possible

## Best Practices

1. **Wrap Items Properly**: Cover all surfaces
2. **Use Appropriate Thickness**: Match to item fragility
3. **Don't Over-Wrap**: Balance protection with cost
4. **Store Correctly**: Keep in dry, cool place
5. **Reuse When Possible**: Extend material life

## Quality Checklist

When buying bubble wrap:
- [ ] Appropriate bubble size for your items
- [ ] Correct thickness for protection needs
- [ ] Good quality material (no weak spots)
- [ ] Perforated if needed for convenience
- [ ] Anti-static if shipping electronics
- [ ] Competitive pricing
- [ ] Reliable supplier
- [ ] Fast delivery options

## Conclusion

Choosing the right bubble wrap involves understanding your product protection needs, shipping requirements, and budget. By selecting the appropriate bubble size, thickness, and type, UK businesses can effectively protect their shipments while managing costs.

Remember: Proper wrapping technique is just as important as choosing the right bubble wrap. Take time to wrap items correctly for maximum protection.`,
  },
  "packing-tape-guide": {
    slug: "packing-tape-guide",
    title: "Packing Tape Buying Guide: Secure Your Shipments",
    excerpt:
      "How to choose the right packing tape for your boxes. Learn about tape types, strength, and application techniques for secure shipping.",
    category: "Sealing Materials",
    readTime: "6 min",
    featuredImage:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Tape types",
      "Strength ratings",
      "Application methods",
      "Cost efficiency",
      "UK standards",
    ],
    seoTitle: "Packing Tape Buying Guide UK | How to Choose Packing Tape",
    seoDescription:
      "Complete guide to buying packing tape in the UK. Learn about tape types, strength ratings, application methods, and cost efficiency for secure shipping.",
    content: `# Packing Tape Buying Guide: Secure Your Shipments

Choosing the right packing tape is crucial for ensuring your packages arrive safely. This comprehensive guide helps UK businesses select the best tape for their shipping needs.

## Understanding Tape Types

### Clear Packing Tape
The most common type of packing tape, suitable for most shipping needs.

**Best For:**
- General shipping
- Standard boxes
- Cost-effective sealing
- Most packaging applications

**Characteristics:**
- Clear appearance
- Good adhesion
- Cost-effective
- Widely available

### Brown Packing Tape
Matches brown cardboard boxes for a professional appearance.

**Best For:**
- Brown cardboard boxes
- Professional appearance
- Brand consistency
- Standard shipping

**Characteristics:**
- Matches box color
- Good adhesion
- Professional look
- Slightly more expensive

### Heavy-Duty Packing Tape
Extra strength for heavy or valuable shipments.

**Best For:**
- Heavy boxes
- Valuable items
- Long-distance shipping
- High-security needs

**Characteristics:**
- Superior strength
- Better adhesion
- More durable
- Higher cost

## Tape Strength Ratings

### Standard Strength (32-44 lbs)
- Suitable for most standard boxes
- Good for lightweight to medium items
- Cost-effective option
- Most common choice

### Heavy-Duty Strength (50-60 lbs)
- Better for heavy boxes
- Stronger adhesion
- More secure sealing
- Higher cost

### Extra Heavy-Duty (60+ lbs)
- Maximum strength
- For very heavy shipments
- Industrial applications
- Premium pricing

## Tape Width Options

### Narrow Tape (24-36mm)
- Best for small boxes
- Cost-effective
- Less material usage
- Good for standard parcels

### Standard Tape (48mm)
- Most common width
- Suitable for most boxes
- Good balance of coverage and cost
- Versatile option

### Wide Tape (72mm+)
- Best for large boxes
- Better coverage
- More secure sealing
- Higher material cost

## Application Methods

### Hand Dispensers
- Manual application
- Good for low volume
- Cost-effective
- Portable

### Desktop Dispensers
- Faster application
- Better for medium volume
- Consistent application
- Moderate cost

### Automatic Dispensers
- Fastest application
- Best for high volume
- Most efficient
- Higher initial cost

## Cost Considerations

### Standard Tape
- **Cost**: £2-£5 per roll
- **Best For**: Most shipping needs
- **Value**: Excellent cost-to-performance ratio

### Heavy-Duty Tape
- **Cost**: £4-£8 per roll
- **Best For**: Heavy or valuable shipments
- **Value**: Higher protection, higher cost

### Bulk Pricing
- Ordering in bulk reduces costs
- 10-25% discount for large orders
- Consider annual needs when ordering

## UK-Specific Information

### Royal Mail Requirements
- Tape must be strong enough to secure boxes
- Clear or brown tape preferred
- Avoid decorative tapes for shipping
- Ensure proper sealing

### Courier Requirements
- Most couriers accept standard packing tape
- Heavy-duty recommended for valuable items
- Check specific carrier guidelines
- Ensure boxes are properly sealed

## Best Practices

1. **Use Enough Tape**: Apply 2-3 strips per seam
2. **Seal All Edges**: Cover all box openings
3. **Apply Evenly**: Smooth application prevents bubbles
4. **Store Properly**: Keep tape in cool, dry place
5. **Check Expiry**: Old tape may lose adhesion

## Quality Checklist

When buying packing tape:
- [ ] Appropriate strength for your boxes
- [ ] Correct width for box size
- [ ] Good adhesion quality
- [ ] Competitive pricing
- [ ] Reliable supplier
- [ ] Fast delivery options
- [ ] Suitable for your volume

## Common Mistakes to Avoid

- **Using Insufficient Tape**: Weak seals lead to damage
- **Wrong Width**: Too narrow or too wide reduces effectiveness
- **Poor Application**: Uneven application weakens seals
- **Storing Incorrectly**: Heat and moisture affect tape quality
- **Using Old Tape**: Expired tape loses adhesion

## Conclusion

Choosing the right packing tape involves understanding your box sizes, shipping requirements, and volume needs. By selecting the appropriate tape type, strength, and width, UK businesses can ensure secure shipments while managing costs effectively.

Remember: Proper tape application is essential for package security. Take time to seal boxes correctly for maximum protection.`,
  },
  "protective-packaging-guide": {
    slug: "protective-packaging-guide",
    title: "Protective Packaging Guide: Keep Items Safe During Shipping",
    excerpt:
      "Comprehensive guide to protective packaging materials. Learn when to use different materials and how to protect fragile items effectively.",
    category: "Protective Materials",
    readTime: "9 min",
    featuredImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1200",
    topics: [
      "Material types",
      "Protection levels",
      "Cost vs protection",
      "Best practices",
      "UK availability",
    ],
    seoTitle:
      "Protective Packaging Guide UK | How to Protect Items During Shipping",
    seoDescription:
      "Complete guide to protective packaging materials in the UK. Learn about different material types, protection levels, and best practices for shipping fragile items.",
    content: `# Protective Packaging Guide: Keep Items Safe During Shipping

Protecting items during shipping is essential for customer satisfaction and reducing returns. This comprehensive guide covers all protective packaging materials available to UK businesses.

## Understanding Protection Levels

### Light Protection
Suitable for items that need minimal cushioning.

**Materials:**
- Thin bubble wrap
- Paper padding
- Light foam sheets

**Best For:**
- Non-fragile items
- Lightweight products
- Short-distance shipping
- Cost-sensitive applications

### Standard Protection
Most common level of protection for general shipping.

**Materials:**
- Standard bubble wrap
- Medium foam padding
- Air pillows
- Paper void fill

**Best For:**
- Most standard items
- General retail products
- Medium-distance shipping
- Balanced protection and cost

### Heavy Protection
Maximum protection for fragile or valuable items.

**Materials:**
- Heavy-duty bubble wrap
- Thick foam padding
- Custom-fit foam
- Multiple layers

**Best For:**
- Fragile items
- Valuable products
- Long-distance shipping
- High-value shipments

## Material Types

### Bubble Wrap
Flexible plastic with air-filled bubbles providing cushioning.

**Advantages:**
- Excellent shock absorption
- Flexible and conforming
- Lightweight
- Cost-effective

**Best For:**
- Fragile items
- Irregular shapes
- General protection
- Most shipping needs

### Foam Padding
Various foam types providing different protection levels.

**Types:**
- Polyethylene foam
- Polyurethane foam
- Expanded polystyrene (EPS)
- Custom-cut foam

**Best For:**
- Heavy items
- Custom protection
- Maximum cushioning
- Industrial applications

### Air Pillows
Inflatable plastic cushions for void fill.

**Advantages:**
- Lightweight
- Space-efficient
- Cost-effective
- Easy to use

**Best For:**
- Void fill
- Large boxes
- Lightweight protection
- Volume reduction

### Paper Padding
Eco-friendly paper-based protection.

**Types:**
- Kraft paper
- Shredded paper
- Paper honeycomb
- Corrugated paper

**Best For:**
- Eco-friendly shipping
- Lightweight items
- Void fill
- Sustainable packaging

### Void Fill Materials
Materials to fill empty space in boxes.

**Types:**
- Packing peanuts
- Air pillows
- Paper fill
- Foam chips

**Best For:**
- Preventing movement
- Filling gaps
- Reducing damage
- Stabilizing items

## Cost vs Protection Analysis

### Budget-Friendly Options
- Paper padding: £0.10-£0.50 per box
- Air pillows: £0.20-£0.80 per box
- Standard bubble wrap: £0.50-£2.00 per box

### Mid-Range Options
- Medium foam: £1.00-£3.00 per box
- Heavy bubble wrap: £1.50-£4.00 per box
- Custom foam inserts: £2.00-£5.00 per box

### Premium Options
- Custom-fit foam: £5.00-£15.00+ per box
- Multi-layer protection: £3.00-£10.00 per box
- Specialized materials: Varies

## When to Use Different Materials

### For Fragile Items
- Use: Heavy bubble wrap or thick foam
- Apply: Multiple layers
- Consider: Custom-fit protection
- Priority: Maximum protection

### For Heavy Items
- Use: Thick foam or EPS
- Apply: Bottom and side padding
- Consider: Double boxing
- Priority: Weight distribution

### For Lightweight Items
- Use: Light bubble wrap or paper
- Apply: Single layer sufficient
- Consider: Cost efficiency
- Priority: Basic protection

### For Irregular Shapes
- Use: Flexible bubble wrap
- Apply: Wrap completely
- Consider: Custom solutions
- Priority: Complete coverage

## UK-Specific Considerations

### Availability
- All materials widely available
- Next-day delivery options
- Bulk ordering available
- Various suppliers to choose from

### Environmental Options
- Recyclable materials
- Biodegradable alternatives
- Paper-based options
- Reusable materials

### Cost Factors
- VAT applies to most materials
- Bulk discounts available
- Shipping costs vary
- Consider total cost per shipment

## Best Practices

1. **Match Protection to Item**: Don't over or under-protect
2. **Use Multiple Layers**: Better protection for fragile items
3. **Fill All Voids**: Prevent movement during shipping
4. **Test Before Shipping**: Verify protection effectiveness
5. **Consider Environmental Impact**: Choose recyclable options

## Protection Checklist

When packaging items:
- [ ] Appropriate protection level selected
- [ ] All surfaces covered
- [ ] Voids filled
- [ ] Items secured in place
- [ ] Box properly sealed
- [ ] Protection tested
- [ ] Cost optimized

## Common Mistakes

- **Insufficient Protection**: Leads to damage
- **Over-Protection**: Wastes money
- **Wrong Material**: Ineffective protection
- **Poor Application**: Reduces effectiveness
- **Ignoring Voids**: Items move and damage

## Environmental Considerations

### Recyclable Materials
- Most bubble wrap is recyclable
- Paper options fully recyclable
- Foam recycling varies by type
- Check local recycling facilities

### Sustainable Alternatives
- Biodegradable bubble wrap
- Recycled paper padding
- Reusable packaging materials
- Minimal packaging approach

## Conclusion

Choosing the right protective packaging requires understanding your product needs, shipping requirements, and budget. By selecting appropriate materials and applying them correctly, UK businesses can protect shipments effectively while managing costs.

Remember: Proper protection prevents damage, reduces returns, and improves customer satisfaction. Invest in quality protective materials for long-term success.`,
  },
};

// PortableText components for Sanity content
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const id =
        value._key ||
        (typeof children === "string"
          ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-")
          : "");
      return (
        <h2
          id={id}
          className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ol>
    ),
    checklist: ({ children }) => (
      <ul className="space-y-2 mb-4">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
    checklist: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded border-2 border-gray-300 shrink-0"></span>
        <span className="text-gray-700">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? "_blank" : undefined}
        rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
        className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={value.asset?.url || "/images/placeholder.jpg"}
            alt={value.alt || "Guide image"}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-sm text-gray-500 text-center mt-2">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    comparisonTable: ({ value }) => (
      <div className="my-8 overflow-x-auto">
        {value.title && (
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            {value.title}
          </h4>
        )}
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          {value.headers && (
            <thead className="bg-gray-50">
              <tr>
                {value.headers.map((header: string, i: number) => (
                  <th
                    key={i}
                    className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {value.rows?.map((row: { cells: string[] }, i: number) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {row.cells?.map((cell: string, j: number) => (
                  <td
                    key={j}
                    className="border border-gray-200 px-4 py-2 text-gray-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    calloutBox: ({ value }) => {
      const styles = {
        tip: {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          icon: "text-emerald-600",
        },
        warning: {
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: "text-amber-600",
        },
        info: {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-600",
        },
        checklist: {
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: "text-gray-600",
        },
      };
      const style = styles[value.type as keyof typeof styles] || styles.info;

      return (
        <div
          className={`my-6 p-4 rounded-lg border ${style.bg} ${style.border}`}
        >
          {value.title && (
            <h4 className={`font-semibold mb-2 ${style.icon}`}>{value.title}</h4>
          )}
          <p className="text-gray-700">{value.content}</p>
        </div>
      );
    },
  },
};

// Format static markdown content to HTML
function formatStaticContent(content: string): string {
  return content
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) {
        return `<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">${line.substring(2)}</h1>`;
      }
      if (line.startsWith("## ")) {
        const title = line.substring(3).trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return `<h2 id="${id}" class="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24">${title}</h2>`;
      }
      if (line.startsWith("### ")) {
        return `<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-3">${line.substring(4)}</h3>`;
      }
      if (line.startsWith("- [ ]")) {
        return `<li class="flex items-start gap-3 mb-2"><span class="inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded border-2 border-gray-300 shrink-0"></span><span class="text-gray-700">${line.substring(6)}</span></li>`;
      }
      if (line.startsWith("- [x]")) {
        return `<li class="flex items-start gap-3 mb-2"><span class="inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded bg-emerald-600 text-white shrink-0"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span><span class="text-gray-700">${line.substring(6)}</span></li>`;
      }
      if (line.startsWith("- ")) {
        return `<li class="text-gray-700 ml-4 mb-2 list-disc">${line.substring(2)}</li>`;
      }
      if (line.match(/^\d+\.\s/)) {
        return `<li class="text-gray-700 ml-4 mb-2 list-decimal">${line.replace(/^\d+\.\s/, "")}</li>`;
      }
      if (line.trim() === "") {
        return "";
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return `<p class="text-gray-900 font-semibold mb-3">${line.replace(/\*\*/g, "")}</p>`;
      }
      const processedLine = line.replace(
        /\*\*([^*]+)\*\*/g,
        '<strong class="font-semibold text-gray-900">$1</strong>'
      );
      return `<p class="text-gray-700 leading-relaxed mb-4">${processedLine}</p>`;
    })
    .filter((line) => line !== "")
    .join("");
}

// Extract sections from content for TOC
function extractSections(
  content: unknown[] | string | undefined
): { title: string; id: string }[] {
  if (!content) return [];

  // For Sanity Portable Text
  if (Array.isArray(content)) {
    return content
      .filter(
        (block: unknown) =>
          (block as { _type?: string; style?: string })._type === "block" &&
          (block as { style?: string }).style === "h2"
      )
      .map((block: unknown) => {
        const typedBlock = block as {
          _key?: string;
          children?: { text?: string }[];
        };
        const text =
          typedBlock.children?.map((c) => c.text || "").join("") || "";
        return {
          title: text,
          id:
            typedBlock._key ||
            text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        };
      });
  }

  // For static markdown content
  if (typeof content === "string") {
    return content
      .split("\n")
      .filter((line) => line.startsWith("## "))
      .map((line) => {
        const title = line.substring(3).trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return { title, id };
      });
  }

  return [];
}

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try Sanity first
  const sanityGuide = await getGuideBySlug(slug);
  const staticGuide = buyingGuides[slug];

  if (!sanityGuide && !staticGuide) {
    return {
      title: "Buying Guide Not Found | Bubble Wrap Shop",
      description: "The buying guide you're looking for doesn't exist.",
    };
  }

  // Use Sanity data if available, otherwise static
  const guide = sanityGuide || staticGuide;
  const guideTitle =
    (sanityGuide?.seoTitle || staticGuide?.seoTitle) ||
    (sanityGuide?.title || staticGuide?.title);
  const guideDescription =
    (sanityGuide?.seoDescription || staticGuide?.seoDescription) ||
    (sanityGuide?.excerpt || staticGuide?.excerpt);
  const guideUrl = `${siteUrl}/guides/${slug}`;
  const guideImage = sanityGuide?.featuredImage || staticGuide?.featuredImage;
  const category =
    typeof sanityGuide?.category === "string"
      ? sanityGuide.category
      : staticGuide?.category || "";

  return {
    title: `${guideTitle} | Bubble Wrap Shop`,
    description: guideDescription,
    keywords: [
      "packaging buying guide",
      "how to choose packaging",
      "packaging guide UK",
      category.toLowerCase(),
      ...(sanityGuide?.seoKeywords || []),
    ],
    openGraph: {
      title: guideTitle,
      description: guideDescription,
      url: guideUrl,
      type: "article",
      images: guideImage
        ? [
            {
              url: guideImage,
              width: 1200,
              height: 630,
              alt: guide?.title || "Buying Guide",
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: sanityGuide?.canonicalUrl || guideUrl,
    },
  };
}

export async function generateStaticParams() {
  // Get slugs from Sanity
  const sanitySlugs = await getGuideSlugs();

  // Combine with static slugs
  const allSlugs = new Set([
    ...(sanitySlugs || []).map((s) => s.slug),
    ...Object.keys(buyingGuides),
  ]);

  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;

  // Try Sanity first
  const sanityGuide = await getGuideBySlug(slug);
  const staticGuide = buyingGuides[slug];

  if (!sanityGuide && !staticGuide) {
    notFound();
  }

  // Use Sanity data if available
  const isSanityGuide = !!sanityGuide;
  const guide = sanityGuide || staticGuide;

  // Get related guides
  let relatedGuides: (Guide | GuideListing)[] = [];
  if (sanityGuide) {
    // Use Sanity related guides if available
    if (sanityGuide.relatedGuides && sanityGuide.relatedGuides.length > 0) {
      relatedGuides = sanityGuide.relatedGuides as unknown as Guide[];
    } else {
      // Fetch related guides from same category
      const fetchedRelatedGuides = await getRelatedGuides(
        typeof sanityGuide.category === "string" ? sanityGuide.category : "",
        slug
      );
      relatedGuides = fetchedRelatedGuides || [];
    }
  } else if (staticGuide) {
    // For static guides, get other static guides
    const otherSlugs = Object.keys(buyingGuides).filter((s) => s !== slug);
    relatedGuides = otherSlugs.slice(0, 2).map((s) => ({
      id: s,
      title: buyingGuides[s].title,
      slug: s,
      excerpt: buyingGuides[s].excerpt,
      featuredImage: buyingGuides[s].featuredImage,
      featuredImageAlt: `${buyingGuides[s].title} - packaging buying guide`,
      category: buyingGuides[s].category.toLowerCase().replace(/ /g, "-"),
      topics: buyingGuides[s].topics,
      readTime: parseInt(buyingGuides[s].readTime) || 8,
      author: "Bubble Wrap Shop Team",
    }));
  }

  // Extract sections for TOC
  const sections = isSanityGuide
    ? extractSections((sanityGuide as Guide).content)
    : extractSections(staticGuide?.content);

  // Format content
  const formattedStaticContent = staticGuide
    ? formatStaticContent(staticGuide.content)
    : "";

  // Prepare display values
  const title = sanityGuide?.title || staticGuide?.title || "";
  const excerpt = sanityGuide?.excerpt || staticGuide?.excerpt || "";
  const featuredImage =
    sanityGuide?.featuredImage || staticGuide?.featuredImage || "";
  const featuredImageAlt =
    sanityGuide?.featuredImageAlt || `${title} - packaging buying guide`;
  const category = sanityGuide?.category || staticGuide?.category || "";
  const categoryLabel = getGuideCategoryLabel(
    typeof category === "string" ? category : ""
  );
  const readTime = sanityGuide?.readTime
    ? formatGuideReadTime(sanityGuide.readTime)
    : staticGuide?.readTime || "8 min";
  const topics = sanityGuide?.topics || staticGuide?.topics || [];
  const author = sanityGuide?.author || "Bubble Wrap Shop Team";
  const authorRole = sanityGuide?.authorRole || "Packaging Specialist";
  const publishedAt = sanityGuide?.publishedAt;
  const lastUpdated = sanityGuide?.lastUpdated;
  const expertTip = sanityGuide?.expertTip;
  const faqs = sanityGuide?.faqs || [];
  const guideUrl = `${siteUrl}/guides/${slug}`;

  // JSON-LD structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: featuredImage,
    author: {
      "@type": "Person",
      name: author,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Bubble Wrap Shop",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: lastUpdated || publishedAt || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": guideUrl,
    },
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-4">
          <Breadcrumbs
            items={[
              { label: "Buying Guides", href: "/guides" },
              { label: title, href: `/guides/${slug}` },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <header className="py-12 md:py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Back Link */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Guides
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  {categoryLabel}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} read</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {excerpt}
              </p>

              {/* Author & Date */}
              {(author || publishedAt) && (
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  {author && (
                    <span>
                      By <span className="text-gray-900 font-medium">{author}</span>
                      {authorRole && `, ${authorRole}`}
                    </span>
                  )}
                  {publishedAt && (
                    <>
                      <span>•</span>
                      <span>{formatGuideDate(publishedAt)}</span>
                    </>
                  )}
                  {lastUpdated && (
                    <>
                      <span>•</span>
                      <span>Updated {formatGuideDate(lastUpdated)}</span>
                    </>
                  )}
                </div>
              )}

              {/* Topics */}
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={featuredImage}
                alt={featuredImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Article Content */}
          <article className="min-w-0">
            {/* Expert Tip */}
            {expertTip && (
              <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">
                      Expert Tip
                    </h3>
                    <p className="text-amber-800">{expertTip}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            {isSanityGuide && sanityGuide?.content ? (
              <div className="prose prose-lg max-w-none">
                <PortableText
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={sanityGuide.content as any}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formattedStaticContent }}
              />
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shop CTA */}
            <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ready to shop?
                  </h3>
                  <p className="text-gray-600">
                    Browse our range of {categoryLabel.toLowerCase()} with
                    next-day delivery.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Shop now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            <div className="sticky top-8">
              {sections.length > 0 && (
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    In this guide
                  </h4>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-gray-600 hover:text-emerald-600 transition-colors py-1"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Related Guides */}
              {relatedGuides.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Related guides
                  </h4>
                  <div className="space-y-4">
                    {relatedGuides.slice(0, 2).map((relatedGuide) => (
                      <Link
                        key={relatedGuide.id || relatedGuide.slug}
                        href={`/guides/${relatedGuide.slug}`}
                        className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                      >
                        <span className="text-xs text-emerald-600 font-medium">
                          {getGuideCategoryLabel(
                            typeof relatedGuide.category === "string"
                              ? relatedGuide.category
                              : ""
                          )}
                        </span>
                        <h5 className="text-sm font-medium text-gray-900 mt-1 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {relatedGuide.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need packaging advice?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team of experts is ready to help you find the perfect
              packaging solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Contact us
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                More guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
