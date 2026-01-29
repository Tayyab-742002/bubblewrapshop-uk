"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/common";
import { AnnouncementBannerClient } from "@/components/common/announcement-banner-client";
import type { Category } from "@/types/category";
import dynamic from "next/dynamic";

// PERFORMANCE: Use dynamic import for the Footer to reduce initial JS payload.
// This splits the footer into its own JS chunk.
const Footer = dynamic(() => import("@/components/common/footer").then((mod) => mod.Footer), {
  ssr: true, // Keep it true so search engines can still crawl your footer links.
});

// PERFORMANCE: Lazy load WhatsApp button - not critical for initial render
const WhatsAppButton = dynamic(
  () => import("@/components/common/whatsapp-button").then((mod) => mod.WhatsAppButton),
  { ssr: true }
);

interface WebsiteLayoutWrapperProps {
  children: React.ReactNode;
  categories: Category[];
}

export function WebsiteLayoutWrapper({
  children,
  categories,
}: WebsiteLayoutWrapperProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <AnnouncementBannerClient />
      <Header categories={categories} />
      <main className="flex-1">{children}</main>
      
      {/* Footer will now load as a separate, non-blocking chunk */}
      <Footer />

      <WhatsAppButton
        phoneNumber="+447728342335"
        message="Hi! I'm interested in your packaging products."
        position="left"
      />
    </>
  );
}