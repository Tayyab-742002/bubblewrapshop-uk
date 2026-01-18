"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Banner {
  id: string;
  title?: string;
  description?: string;
  mediaType?: "image" | "video";
  image?: string;
  alt?: string;
  video?: string;
  videoPoster?: string;
  videoSettings?: {
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    showControls: boolean;
  };
}

interface HeroCarouselProps {
  banners: Banner[];
}

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners]);

  const prevSlide = () => {
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || !banners || banners.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, banners]);


  // If no banners, return empty state (after all hooks)
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Carousel */}
      <div
        className="relative z-10 mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-12"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative h-[280px] sm:h-[380px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
          {/* Slides */}
          {banners.map((banner, index) => {
            const isVideo = banner.mediaType === "video" && banner.video;

            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                {/* Background Media - Image or Video */}
                {isVideo ? (
                  <video
                    src={banner.video}
                    poster={banner.videoPoster}
                    autoPlay={banner.videoSettings?.autoplay !== false}
                    loop={banner.videoSettings?.loop !== false}
                    muted={banner.videoSettings?.muted !== false}
                    playsInline
                    controls={banner.videoSettings?.showControls === true}
                    className="w-full h-full object-cover"
                    preload={index === 0 ? "auto" : "none"}
                    // LCP optimization: fetchpriority="high" for first video
                    // @ts-expect-error - fetchPriority is valid HTML but not in React types yet
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                ) : (
                  <Image
                    src={banner.image || ""}
                    alt={banner.alt || `Banner ${index + 1}`}
                    fill
                    className="w-full h-full object-cover"
                    quality={90}
                    sizes="100vw"
                    priority={index === 0}
                    // LCP optimization: first image gets high fetch priority
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                )}

                {/* Dynamic Gradient Overlay - Eco colors */}
                <div className="absolute inset-0 bg-linear-to-br from-emerald-600/10 via-teal-600/10 to-transparent" />

                {/* Content - Only show if title or description exists */}
                {(banner.title || banner.description) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-3 sm:px-4 md:px-6">
                    <div className="text-center w-full max-w-4xl">
                      <div
                        className={`transform transition-all duration-1000 delay-300 ${
                          index === currentSlide
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                        }`}
                      >
                        {banner.title && (
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 lg:mb-6 drop-shadow-2xl tracking-tight leading-tight sm:leading-none">
                            {banner.title}
                          </h2>
                        )}
                        {banner.description && (
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white font-light drop-shadow-lg px-2 sm:px-0 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                            {banner.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <Link
                      href={"/products"}
                      className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 px-6 sm:px-7 md:px-8 lg:px-10 xl:px-12 py-2 sm:py-2 md:py-3 cursor-pointer bg-white text-emerald-600 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-emerald-50 active:bg-emerald-100 transform hover:scale-105 active:scale-95 transition-all shadow-xl sm:shadow-2xl border-2 border-emerald-700/50 min-h-[44px] min-w-[120px] touch-manipulation"
                    >
                      Shop Now
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {/* Navigation Arrows - Touch-friendly on mobile (min 44x44px) */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-3 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 active:bg-white/40 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10 group touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white group-active:scale-90 transition-transform" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-3 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 active:bg-white/40 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10 group touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white group-active:scale-90 transition-transform" />
              </button>

              {/* Dots Indicator - Touch-friendly */}
              <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 md:gap-3 z-10">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all rounded-full touch-manipulation ${
                      index === currentSlide
                        ? "w-10 sm:w-12 md:w-14 lg:w-16 h-2.5 sm:h-2.5 md:h-2.5 lg:h-2.5 bg-white shadow-lg"
                        : "w-2.5 sm:w-2.5 md:w-2.5 lg:w-2.5 h-2.5 sm:h-2.5 md:h-2.5 lg:h-2.5 bg-white/40 hover:bg-white/60 active:bg-white/70 min-h-[10px] min-w-[10px]"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      
    </div>
  );
}
