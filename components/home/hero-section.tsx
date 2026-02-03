import { HeroCarousel } from "./hero-carousel";
import { getBanners } from "@/services/banners/banner.service";
import { BicepsFlexed, Sprout, Truck } from "lucide-react";

export default async function HeroSection() {
  // Fetch banners from Sanity CMS
  const banners = await getBanners();

  // Debug: Log banner data in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[HeroSection] Fetched banners:', JSON.stringify(banners, null, 2));
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Component - fetchpriority="high" applied in hero-carousel.tsx */}
      <HeroCarousel banners={banners} />

    </div>
  );
}
