export { Header } from "./header";
export { Breadcrumbs } from "./breadcrumbs";
export { ContentCarousel } from "./ContentCarousel";
export { CookieConsent } from "./cookie-consent";
// Note: AnnouncementBannerWrapper and SanityLiveWrapper are NOT exported here
// to prevent client components from importing them (which would pull in server-only code).
// Import them directly in server components (like app/layout.tsx) instead.
