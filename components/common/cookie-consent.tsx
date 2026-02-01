"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "bubble-wrap-shop-cookie-consent";

type ConsentStatus = "pending" | "accepted" | "rejected";

export function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsentStatus(savedConsent as ConsentStatus);
      setIsVisible(false);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsentStatus("accepted");
    setIsVisible(false);
    // Enable analytics/tracking cookies here if needed
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "grant");
    }
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setConsentStatus("rejected");
    setIsVisible(false);
    // Disable analytics/tracking cookies here if needed
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "revoke");
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render if consent has been given or banner is not visible
  if (consentStatus !== "pending" || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="relative bg-white rounded-2xl shadow-2xl border border-neutral-200 p-5 md:p-6">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {/* Icon */}
            <div className="shrink-0 p-3 bg-emerald-100 rounded-xl">
              <Cookie className="w-6 h-6 text-emerald-600" />
            </div>

            {/* Content */}
            <div className="flex-1 pr-6 md:pr-0">
              <h2
                id="cookie-consent-title"
                className="text-base font-semibold text-neutral-900 mb-1"
              >
                We value your privacy
              </h2>
              <p
                id="cookie-consent-description"
                className="text-sm text-neutral-600 leading-relaxed"
              >
                We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic.
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                <Link
                  href="/privacy"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
                >
                  Read our Privacy Policy
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleReject}
                className="flex-1 md:flex-none px-5 py-2.5 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
