"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/category";
import { Package, ArrowRight } from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [...categories, ...categories];

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="sticky top-0 z-30 w-full bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md sm:relative sm:top-auto sm:z-0">
      <div className="container mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 md:py-4 gap-4">

          {/* View All Categories Button (Desktop) */}
          <Link
            href="/categories"
            className="hidden md:inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-4 py-2 rounded-full hover:bg-emerald-50 transition-colors shadow-md shrink-0"
          >
            <Package className="w-4 h-4" />
            <span className="text-sm">View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Divider (Desktop) */}
          <div className="hidden md:block w-px h-8 bg-white/30" />

          {/* Animated Carousel */}
          <div
            className="flex-1 overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-emerald-600 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-teal-600 to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div
              className="flex items-center gap-3"
              style={{
                animation: 'marquee 25s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
                width: 'max-content',
              }}
            >
              {duplicatedCategories.map((category: Category, index) => (
                <Link
                  key={`${category.id}-${index}`}
                  href={`/categories/${category.slug}`}
                  className="group flex items-center gap-2.5 bg-white/10 hover:bg-white text-white hover:text-teal-700 px-1.5 pl-1.5 pr-4 py-1.5 rounded-full transition-all duration-300 ease-out border border-white/10 hover:border-white hover:shadow-lg active:scale-95 shrink-0"
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
              ))}
            </div>
          </div>

          {/* View All Categories Button (Mobile) */}
          <Link
            href="/categories"
            className="md:hidden inline-flex items-center justify-center bg-white text-emerald-700 p-2 rounded-full hover:bg-emerald-50 transition-colors shadow-md shrink-0"
            aria-label="View All Categories"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
