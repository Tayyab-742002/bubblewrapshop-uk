"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Assuming a utility for class merging exists, otherwise will inline or use standard interpolation

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

const TRANSITION_DURATION = 700;

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isTransitioningRef = useRef(false);

  const nextSlide = useCallback(() => {
    if (!banners || banners.length === 0 || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, TRANSITION_DURATION);
  }, [banners]);

  const prevSlide = useCallback(() => {
    if (!banners || banners.length === 0 || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, TRANSITION_DURATION);
  }, [banners]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, TRANSITION_DURATION);
  }, []);

  // Touch/swipe support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();
  }, [nextSlide, prevSlide]);

  const pauseAutoPlay = useCallback(() => setIsAutoPlaying(false), []);
  const resumeAutoPlay = useCallback(() => setIsAutoPlaying(true), []);

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
    <section
      className="relative w-full overflow-hidden bg-background"
      aria-label="Hero Carousel"
    >
      <div
        className="relative w-full h-[60vh] min-h-[500px] max-h-[800px]"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
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
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full">
                {/* Media Layer */}
                {isVideo ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    preload="auto"
                    fetchPriority={index === 0 ? "high" : "auto"} // High priority only for first slide
                    {...(banner.videoPoster && { poster: banner.videoPoster })}
                  >
                    <source src={banner.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={banner.image || ""}
                    alt={banner.alt || `Hero banner ${index + 1}`}
                    fill
                    className="object-cover"
                    quality={90}
                    priority={index === 0}
                  />
                )}

                {/* Sophisticated Overlay */}
                <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

                {/* Content Layer */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
                    <div
                      className={`max-w-3xl transform transition-all duration-1000 ease-out ${isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                    >
                      {banner.title && (
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-6 leading-[1.1]">
                          {banner.title}
                        </h1>
                      )}

                      {banner.description && (
                        <p className="text-lg md:text-xl text-white/90 font-medium tracking-normal mb-10 max-w-xl leading-relaxed">
                          {banner.description}
                        </p>
                      )}

                      <Link
                        href="/products"
                        className="group inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/30 hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-2"
                      >
                        Shop Collection
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Minimalist Controls */}
        {banners.length > 1 && (
          <>
            {/* Arrows - Only visible on hover/large screens for cleanliness */}
            <div className="hidden md:block absolute bottom-12 right-12 z-20 flex gap-4">
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-transparent active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-transparent active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots - Centered bottom */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
