import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebsiteLayoutWrapper } from "@/components/common/website-layout-wrapper";
import { SanityLiveWrapper } from "@/components/common/sanity-live-wrapper";
import { AuthProvider } from "@/components/auth/auth-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { getAllCategories } from "@/sanity/lib";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import FacebookPixel from "@/components/meta/FacebookPixel";
import { CookieConsent } from "@/components/common";
import { Suspense } from "react";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.bubblewrapshop.co.uk";

  export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates:{
    canonical: "./",
  },
  title: {
    default: "Bubble Wrap Shop - Premium Packaging Supplies",
    template: "%s | Bubble Wrap Shop",
  },
  description:
    "UK's leading supplier of packaging supplies. Buy bubble wrap, cardboard boxes, packing tape, and protective packaging. Wholesale pricing available. Next day delivery across the UK.",
  keywords: ["Bubble Wrap Shop", "Packaging Supplies UK", "Blackburn Packaging"],
  authors: [{ name: "Bubble Wrap Shop" }],
  creator: "Bubble Wrap Shop",
  publisher: "Bubble Wrap Shop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: baseUrl,
    siteName: "Bubble Wrap Shop",
    // OG Title: 50-60 chars optimal (currently 44 chars)
    title: "Bubble Wrap Shop | Packaging Supplies UK",
    // OG Description: 110-160 chars optimal (currently 118 chars)
    description:
      "UK packaging supplies with bulk pricing. Bubble wrap, boxes & protective packaging. Next day delivery available.",
    images: [
      {
        // Must be absolute URL for social sharing
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bubble Wrap Shop - Packaging Supplies UK",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bubble Wrap Shop | Packaging Supplies UK",
    description:
      "UK packaging supplies with bulk pricing. Bubble wrap, boxes & protective packaging. Next day delivery available.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bubble Wrap Shop - Packaging Supplies UK",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Domain verified via DNS - no meta tag needed
  // Bing can also be verified via DNS at https://www.bing.com/webmasters
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getAllCategories();

  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        {/* Only keep preconnect for critical LCP assets (Sanity Images) */}
        <link rel="preconnect" href="https://www.facebook.com"></link>
        <link rel="dns-prefetch" href="//cdn.sanity.io" />

        {/* Removed unused connections to r2.dev and unsplash to fix Lighthouse warnings */}
      </head>
      <body
        className="flex flex-col min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        {/* Console silencing script removed - was causing CSP violations
            and doesn't work in browser anyway (process.env is server-only).
            Production console.logs should be removed at build time via 
            compiler options or eslint rules instead. */}
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}> <FacebookPixel /></Suspense>
            <WebsiteLayoutWrapper categories={categories || []}>
              {children}
            </WebsiteLayoutWrapper>

            {/* Cookie Consent Banner - GDPR Compliance */}
            <CookieConsent />

            {/* Optimized Wrapper: Only loads listener in Draft Mode */}
            <SanityLiveWrapper />
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
