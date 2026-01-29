import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/sanity/lib";
import type { Category } from "@/types/category";
import { ListFilter } from "lucide-react";

export async function CategoryGrid() {
  const categories = await getAllCategories();

  return (
    <section className="sticky top-0 z-30 w-full bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md sm:relative sm:top-auto sm:z-0">
      <div className="container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 md:py-4 gap-4">

          {/* Label (Desktop Only) */}
          <div className="hidden md:flex items-center gap-2 text-white/90 shrink-0 border-r border-white/20 pr-4 mr-1">
            <ListFilter className="w-5 h-5" />
            <span className="font-semibold text-sm tracking-wide uppercase">Shop By Category</span>
          </div>

          {/* Horizontal Scroll Ribbon */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3 pb-1 md:pb-0 min-w-max">
              {categories && categories.length > 0 ? (
                categories.map((category: Category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group flex items-center gap-2.5 bg-white/10 hover:bg-white text-white hover:text-teal-700 px-1.5 pl-1.5 pr-4 py-1.5 rounded-full transition-all duration-300 ease-out border border-white/10 hover:border-white hover:shadow-lg active:scale-95"
                  >
                    {/* Tiny Thumbnail */}
                    <div className="relative w-8 h-8 rounded-full bg-white overflow-hidden shrink-0 border border-white/20">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-slate-100 text-slate-400">
                          <div className="w-4 h-4 rounded-full bg-current opacity-20" />
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <span className="text-sm font-medium whitespace-nowrap">
                      {category.name}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="text-white/70 text-sm px-4">Loading categories...</div>
              )}

              {/* View All Categories Link */}
              <Link
                href="/categories"
                className="ml-2 text-xs font-semibold text-white/80 hover:text-white uppercase tracking-wider whitespace-nowrap transition-colors"
              >
                View All Categories →
              </Link>
            </div>
          </div>

          {/* Fade Mask for Scroll Hint (Mobile) */}
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-teal-600 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
