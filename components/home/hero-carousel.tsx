"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    if (!banners || banners.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [banners, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!banners || banners.length === 0 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [banners, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    if (!isAutoPlaying || !banners || banners.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Carousel */}
      <div
        className="relative z-10 mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-10"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] xl:h-[650px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
          {/* Slides */}
          {banners.map((banner, index) => {
            const isVideo = banner.mediaType === "video" && banner.video;
            const isActive = index === currentSlide;

            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                aria-hidden={!isActive}
              >
                {/* Background Media */}
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
                    // @ts-expect-error - fetchPriority is valid HTML but not in React types yet
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                ) : (
                  <Image
                    src={banner.image || ""}
                    alt={banner.alt || `Banner ${index + 1}`}
                    fill
                    className="w-full h-full object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 1600px"
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                )}

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Content */}
                {(banner.title || banner.description) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
                    <div className="text-center w-full max-w-4xl">
                      <div
                        className={`transform transition-all duration-700 ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }`}
                      >
                        {banner.title && (
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-3 md:mb-4 tracking-tight">
                            {banner.title}
                          </h2>
                        )}
                        {banner.description && (
                          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-2xl mx-auto mb-6 md:mb-8">
                            {banner.description}
                          </p>
                        )}
                        <Link
                          href="/products"
                          className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-emerald-600 rounded-full font-semibold text-sm sm:text-base hover:bg-emerald-50 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Navigation Arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20 disabled:opacity-50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
              </button>

              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-20 disabled:opacity-50"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-8 sm:w-10 h-2 bg-white"
                        : "w-2 h-2 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentSlide ? "true" : "false"}
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
