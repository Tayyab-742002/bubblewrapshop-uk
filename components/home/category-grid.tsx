import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/sanity/lib";
import type { Category } from "@/types/category";

export async function CategoryGrid() {
  const categories = await getAllCategories();

  return (
    <section className="relative mt-12 sm:mt-16 md:mt-20 bg-gradient-to-br from-emerald-600 to-teal-600 py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            SHOP BY
            <span className="block text-white mt-1">CATEGORY</span>
          </h2>
        </div>

        {/* Category Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 md:gap-8">
            {categories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group flex flex-col items-center"
              >
                {/* Circular Image Container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border-2 border-white/50 group-hover:border-white">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.imageAlt || category.name}
                        fill
                        className="object-cover p-3"
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-emerald-50">
                        <svg
                          className="w-8 h-8 text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="mt-3 text-sm sm:text-base font-semibold text-white text-center line-clamp-2 px-1 group-hover:text-emerald-100 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              No categories found
            </h3>
            <p className="text-sm text-white/70">
              Check back later for product categories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
