"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Banner {
  id: string;
  title?: string;
  description?: string;
  ctaLink?: string | null;
  ctaText?: string | null;
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

const TRANSITION_DURATION = 700;
const AUTO_PLAY_INTERVAL = 6000;

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const nextSlide = useCallback(() => {
    if (!banners?.length || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, [banners?.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!banners?.length || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, [banners?.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, [isTransitioning, currentSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || !banners?.length || banners.length <= 1) return;
    const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, banners?.length]);

  // Video control
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentSlide) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Early return if no banners
  if (!banners || banners.length === 0) {
    return (
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-between py-8 sm:py-12 md:py-16">
        <div className="flex-1 flex items-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Premium Packaging Supplies
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Bubble wrap, mailing bags & boxes delivered next day
            </p>
          </div>
        </div>
        <Link
          href="/products"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors shadow-lg mb-10 sm:mb-12"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {banners.map((banner, index) => {
        const isVideo = banner.mediaType === "video" && banner.video;
        const isActive = index === currentSlide;

        return (
          <div
            key={banner.id || index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            {/* Background Media */}
            {isVideo ? (
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                autoPlay={isActive}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={banner.videoPoster}
              >
                <source src={banner.video} type="video/mp4" />
              </video>
            ) : banner.image ? (
              <Image
                src={banner.image}
                alt={banner.alt || banner.title || "Banner"}
                fill
                className="object-cover md:object-center"
                priority={index === 0}
                quality={95}
                sizes="100vw"
                unoptimized={banner.image.includes('.gif')}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            )}

            {/* Overlay - lighter for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-8 sm:py-12 md:py-16">
              <div className="flex-1 flex items-center">
                <div className="text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
                  {banner.title && (
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 drop-shadow-lg leading-tight">
                      {banner.title}
                    </h1>
                  )}
                  {banner.description && (
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-md text-gray-100 max-w-2xl mx-auto leading-relaxed">
                      {banner.description}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href={banner.ctaLink || "/products"}
                className="inline-block bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 mb-10 sm:mb-12"
              >
                {banner.ctaText || "Shop Now"}
              </Link>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
            aria-label="Previous slide"
            style={{ opacity: 0.7 }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
            aria-label="Next slide"
            style={{ opacity: 0.7 }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
