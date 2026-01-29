import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasVariants = product.variants && product.variants.length > 1;
  const shouldShowPrice = product.basePrice !== 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-3 group-hover:cursor-pointer"
    >
      {/* Image Container - Framer/Shopify Style */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary/50 transition-colors duration-500 hover:bg-secondary/70">
        <Image
          src={product.image}
          alt={product.imageAlt || product.name}
          width={500}
          height={500}
          className="h-full w-full object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Badge - Clean & Minimal */}
        {Number(product.discount) > 0 && (
          <div className="absolute left-3 top-3">
            <span className="flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-black backdrop-blur-md rounded-full shadow-sm">
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Floating Quick Action Button */}
        <div className="absolute bottom-3 right-3 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:scale-110 hover:bg-black hover:text-white">
            <Plus className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Product Info - Clean Typography */}
      <div className="space-y-1 pl-1">
        <h3 className="line-clamp-1 text-sm font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          {shouldShowPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-foreground">
                £{product.basePrice.toFixed(2)}
              </span>
              {Number(product.discount) > 0 && (
                <span className="text-xs text-muted-foreground line-through decoration-destructive/30">
                  £{((product.basePrice * 100) / (100 - Number(product.discount))).toFixed(2)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">View Options</span>
          )}
        </div>

        {hasVariants && (
          <p className="text-[10px] text-muted-foreground font-medium tracking-wide">
            {product.variants!.length} variants
          </p>
        )}
      </div>
    </Link>
  );
}
