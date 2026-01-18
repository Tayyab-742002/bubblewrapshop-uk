import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasVariants = product.variants && product.variants.length > 1;
  const shouldShowPrice = product.basePrice !== 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full bg-white rounded-xl border border-gray-300 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all duration-200"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl ">
        <Image
          src={product.image}
          alt={product.imageAlt || product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          loading="lazy"
        />

        {/* Discount Badge */}
        {Number(product.discount) !== 0 && (
          <div className="absolute right-2 top-2">
            <span className="bg-red-500 px-2 py-1 rounded-md text-xs font-bold text-white">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-3">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>

        {/* Price & Variants */}
        <div className="mt-auto">
          {shouldShowPrice ? (
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-gray-900">
                £{product.basePrice.toFixed(2)}
              </span>
              {hasVariants && (
                <span className="text-xs text-gray-500">+</span>
              )}
            </div>
          ) : (
            <span className="text-sm text-emerald-600 font-medium">
              View prices
            </span>
          )}

          {/* Variants Count */}
          {hasVariants && product.variants && (
            <p className="text-xs text-gray-500 mt-1">
              {product.variants.length} options
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
