"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  readTime?: number | string;
  type: "blog" | "guide";
}

interface ContentCarouselProps {
  blogs?: ContentItem[];
  guides?: ContentItem[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export function ContentCarousel({
  blogs = [],
  guides = [],
  title = "Resources & Insights",
  subtitle = "Expert tips and guides to help with your packaging needs",
  showViewAll = true,
  autoScroll = true,
  autoScrollInterval = 4000,
}: ContentCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Combine and interleave blogs and guides
  const items: ContentItem[] = [];
  const maxLength = Math.max(blogs.length, guides.length);
  for (let i = 0; i < maxLength; i++) {
    if (guides[i]) items.push({ ...guides[i], type: "guide" });
    if (blogs[i]) items.push({ ...blogs[i], type: "blog" });
  }

  const updateScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || isPaused || items.length <= 3) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

        // If at the end, scroll back to start
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, isPaused, autoScrollInterval, items.length, scroll]);

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [updateScrollButtons]);

  if (items.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {subtitle}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {/* Navigation Arrows */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <Link
              key={`${item.type}-${item.id}-${index}`}
              href={item.type === "blog" ? `/blogs/${item.slug}` : `/guides/${item.slug}`}
              className="group flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
            >
              <article className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 h-full">
                {/* Image */}
                <div className="relative h-36 overflow-hidden bg-gray-100">
                  <Image
                    src={item.featuredImage || "/images/placeholder.jpg"}
                    alt={item.title}
                    fill
                    title={item.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="300px"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.type === "guide"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {item.type === "guide" ? (
                        <BookOpen className="w-3 h-3" />
                      ) : (
                        <Newspaper className="w-3 h-3" />
                      )}
                      {item.type === "guide" ? "Guide" : "Blog"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                    {item.readTime && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {typeof item.readTime === "number" ? `${item.readTime} min` : item.readTime}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {item.excerpt}
                  </p>

                  <span className="inline-flex items-center text-xs font-medium text-emerald-600 group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Links */}
        {showViewAll && (
          <div className="flex justify-center gap-4 mt-8">
            {guides.length > 0 && (
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                All Guides
              </Link>
            )}
            {blogs.length > 0 && (
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <Newspaper className="w-4 h-4" />
                All Blogs
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
