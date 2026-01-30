"use client";

import { useEffect, useRef } from "react";
import * as pixel from "@/lib/meta/fpixel";

interface CategoryPixelTrackerProps {
  categoryName: string;
  categorySlug: string;
}

/**
 * Client component to track ViewCategory pixel event for category pages
 * Used in server-rendered category pages
 */
export function CategoryPixelTracker({
  categoryName,
  categorySlug,
}: CategoryPixelTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      pixel.viewCategory({
        content_name: categoryName,
        content_category: categorySlug,
      });
    }
  }, [categoryName, categorySlug]);

  // This component doesn't render anything visible
  return null;
}
