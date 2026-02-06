"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Package,
  Settings,
  MapPin,
  ShieldCheck,
  ChevronDown,
  Phone,
  Truck,
  BookOpen,
  FileText,
  Building2,
  ChevronRight,
} from "lucide-react";
import { MiniCart } from "@/components/cart/mini-cart";
import { useCartStore } from "@/lib/stores/cart-store";
import { useAuth } from "@/components/auth/auth-provider";
import Image from "next/image";
import { Category } from "@/types/category";
import * as pixel from "@/lib/meta/fpixel";

interface HeaderProps {
  categories?: Category[];
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Bubble Wrap",
    slug: "bubble-wrap",
    image:
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Mailing Bags",
    slug: "mailing-bags",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Cardboard Boxes",
    slug: "cardboard-boxes",
  },
  {
    id: "4",
    name: "Packing Tape",
    slug: "packing-tape",
  },
];

// Quick links for the mega menu
const quickLinks = [
  { name: "New Arrivals", href: "/products?sort=newest", icon: Package },
  { name: "Wholesale Deals", href: "/wholesale", icon: Building2 },
];

const resourceLinks = [
  { name: "Buying Guides", href: "/guides", icon: BookOpen },
  { name: "Blog Articles", href: "/blogs", icon: FileText },
  { name: "FAQ", href: "/faq", icon: FileText },
];

export function Header({ categories = MOCK_CATEGORIES }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isActiveLink = useCallback(
    (href: string) => {
      if (href === "/products") return pathname?.startsWith("/products");
      if (href === "/categories") return pathname?.startsWith("/categories");
      return pathname === href;
    },
    [pathname],
  );

  const { getItemCount } = useCartStore();
  const { user, isAuthenticated, signOut, loading: authLoading } = useAuth();
  const cartItemCount = getItemCount();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
      if (megaMenuTimeoutRef.current) {
        clearTimeout(megaMenuTimeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = useCallback(async () => {
    const result = await signOut();
    if (result.success) {
      router.push("/");
    }
  }, [signOut, router]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        pixel.search({
          search_string: searchQuery.trim(),
          content_type: "product",
        });
        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      }
    },
    [searchQuery],
  );

  const handleMegaMenuEnter = useCallback(() => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  // --- SEO: Generate Schema for Sitelinks ---
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Shop Products",
      "Categories",
      "Buying Guides",
      "Blog",
      "About",
      ...categories.slice(0, 4).map((c) => c.name),
    ],
    url: [
      "https://www.bubblewrapshop.co.uk/products",
      "https://www.bubblewrapshop.co.uk/categories",
      "https://www.bubblewrapshop.co.uk/guides",
      "https://www.bubblewrapshop.co.uk/blogs",
      "https://www.bubblewrapshop.co.uk/about",
      ...categories
        .slice(0, 4)
        .map((c) => `https://www.bubblewrapshop.co.uk/categories/${c.slug}`),
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      {/* Top Bar - Contact & Utility */}
      <div className="hidden lg:block bg-neutral-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex h-10 items-center justify-between text-sm">
            {/* Left - Contact & Delivery */}
            <div className="flex items-center gap-6">
              <a
                href="tel:+447728342335"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                title="Call us now"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>07728 342335</span>
              </a>
              <div className="flex items-center gap-2 text-emerald-400">
                <Truck className="h-3.5 w-3.5" />
                <span>Next-Day Delivery Available</span>
              </div>
            </div>
            {/* Right - Utility Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/wholesale"
                className="hover:text-emerald-400 transition-colors"
                title="Learn about our Wholesale options"
              >
                Wholesale
              </Link>
              <Link
                href="/b2b-request"
                className="hover:text-emerald-400 transition-colors"
                title="Request a B2B account"
              >
                B2B Enquiries
              </Link>
              <Link
                href="/contact"
                className="hover:text-emerald-400 transition-colors"
                title="Contact Us"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-neutral-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 lg:h-18 items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0 group">
              <Image
                src="/logo.jpg"
                alt="Bubble Wrap Shop"
                width={120} // Intrinsic width
                height={40} // Intrinsic height
                priority
                title="Bubble Wrap Shop Logo"
                // Added: aspect-[120/40] so the browser knows the ratio immediately
                className="h-9 lg:h-11 w-auto aspect-[120/40] object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
            </Link>

            {/* Desktop Navigation */}
       
            <nav className="hidden lg:block" aria-label="Main navigation">
              <ul className="flex items-center gap-1 list-none m-0 p-0">
                {/* Shop Dropdown */}
                <li>
                  <div
                    onMouseEnter={handleMegaMenuEnter}
                    onMouseLeave={handleMegaMenuLeave}
                    className="relative"
                  >
                    <Link
                      href="/products"
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActiveLink("/products") || isMegaMenuOpen
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isMegaMenuOpen}
                      title="Shop our Products"
                    >
                      Shop
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isMegaMenuOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </li>

                <li>
                  <Link
                    href="/categories"
                    className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActiveLink("/categories")
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50"
                    }`}
                    title="Browse our Packaging Categories"
                  >
                    Categories
                  </Link>
                </li>

                <li>
                  <Link
                    href="/guides"
                    className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActiveLink("/guides")
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50"
                    }`}
                    title="Browse our Buying Guides"
                  >
                    Guides
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blogs"
                    className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActiveLink("/blogs")
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50"
                    }`}
                    title="Read our Blog"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActiveLink("/about")
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50"
                    }`}
                    title="Learn more about Bubble Wrap Shop" 
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Search Bar - Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:block flex-1 max-w-md"
            >
              {/* Removed 'transition-transform' and 'scale' to prevent layout shift */}
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors duration-200"
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Account - Desktop */}
              {authLoading && !user ? (
                <div className="hidden lg:block">
                  <div className="p-2.5 text-neutral-300 rounded-lg">
                    <User className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>
              ) : isAuthenticated && user ? (
                <div className="hidden lg:block relative group">
                  <button className="p-2.5 text-neutral-600 hover:text-emerald-700 hover:bg-neutral-50 rounded-lg transition-all duration-200">
                    <User className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <div className="absolute right-0 top-full pt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-xl overflow-hidden">
                      <div className="p-4 border-b border-neutral-100 bg-gradient-to-br from-emerald-50 to-teal-50">
                        <p className="text-sm font-semibold text-neutral-900 truncate">
                          {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-neutral-600 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        {user?.role === "admin" && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all font-medium mb-1"
                            title="Go to Admin Dashboard"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/account"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          title="Go to My Account"
                        >
                          <Settings className="h-4 w-4 text-neutral-400" />
                          My Account
                        </Link>
                        <Link
                          href="/account?tab=orders"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          title="View your Orders"
                        >
                          <Package className="h-4 w-4 text-neutral-400" />
                          Orders
                        </Link>
                        <Link
                          href="/account?tab=addresses"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          title="Manage your Addresses"
                        >
                          <MapPin className="h-4 w-4 text-neutral-400" />
                          Addresses
                        </Link>
                      </div>
                      <div className="border-t border-neutral-100 p-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : !authLoading ? (
                <Link
                  href="/auth/login"
                  className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-emerald-700 hover:bg-neutral-50 rounded-lg transition-all duration-200"
                  title="Sign in to your account"
                >
                  <User className="h-4 w-4" strokeWidth={1.5} />
                  Sign In
                </Link>
              ) : null}

              {/* Cart */}
              <MiniCart>
                <button
                  aria-label="View shopping cart"
                  className="relative p-2.5 text-neutral-600 hover:text-emerald-700 hover:bg-neutral-50 rounded-lg transition-all duration-200"
                >
                  <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                  {mounted && cartItemCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                </button>
              </MiniCart>

              {/* Mobile Menu Toggle */}
              <button
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 lg:hidden text-neutral-600 hover:text-emerald-700 hover:bg-neutral-50 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <div
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
          className={`hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-neutral-200 shadow-xl transition-all duration-300 ${
            isMegaMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
        >
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Categories Grid */}
              <div className="col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                    Shop by Category
                  </h3>
                  <Link
                    href="/categories"
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                    title="Browse all Categories"
                  >
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      title={category.name}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="group flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-200"
                    >
                      {category.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                          <Image
                            src={category.image}
                            alt={category.name}
                            title={category.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shrink-0">
                          <Package className="h-5 w-5 text-emerald-600" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-900 group-hover:text-emerald-700 transition-colors truncate">
                          {category.name}
                        </p>
                        {category.description && (
                          <p className="text-xs text-neutral-500 truncate mt-0.5">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links & Resources */}
              <div className="col-span-5 grid grid-cols-2 gap-8 pl-8 border-l border-neutral-100">
                {/* Quick Links */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-1">
                    <Link
                      href="/products"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-lg text-neutral-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200"
                      title="Browse All Products"
                    >
                      <Package className="h-4 w-4 text-neutral-400" />
                      <span className="text-sm font-medium">All Products</span>
                    </Link>
                    {quickLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        title={link.name}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-lg text-neutral-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200"
                      >
                        <link.icon className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm font-medium">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                    Resources
                  </h3>
                  <div className="space-y-1">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-lg text-neutral-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200"
                        title={link.name}
                      >
                        <link.icon className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm font-medium">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      Free UK Delivery on Orders Over £75
                    </p>
                    <p className="text-sm text-white/80">
                      Next-day delivery available on most items
                    </p>
                  </div>
                </div>
                <Link
                  href="/wholesale"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="px-5 py-2.5 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors text-sm"
                  
                  title="Get Wholesale Prices"
                >
                  Get Wholesale Prices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-100">
              <Link href="/" onClick={closeMobileMenu} title="Return to Homepage">
                <Image
                  src="/logo.jpg"
                  alt="Bubble Wrap Shop"
                  title="Bubble Wrap Shop Logo"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-neutral-100">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-full border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </form>
            </div>

            {/* User Section */}
            {authLoading && !user ? (
              <div className="p-4 border-b border-neutral-100">
                <div className="h-12 bg-neutral-100 rounded-lg animate-pulse" />
              </div>
            ) : isAuthenticated && user ? (
              <div className="p-4 border-b border-neutral-100">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-neutral-900 truncate">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-neutral-600 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b border-neutral-100">
                <Link
                  href="/auth/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
                  title="Sign in to your account"
                >
                  <User className="h-5 w-5" />
                  Sign In
                </Link>
              </div>
            )}

            {/* Navigation */}
           {/* Navigation */}
            <nav
              className="flex-1 overflow-y-auto p-4"
              aria-label="Mobile navigation"
            >
              {/* Main Links */}
              <ul className="space-y-1 list-none p-0 m-0">
                <li>
                  <Link
                    href="/products"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between p-3 rounded-xl text-neutral-900 hover:bg-neutral-50 transition-colors"
                    title="Shop all Products"
                  >
                    <span className="font-medium">Shop All Products</span>
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between p-3 rounded-xl text-neutral-900 hover:bg-neutral-50 transition-colors"
                    title="Browse all Categories"
                  >
                    <span className="font-medium">Categories</span>
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  </Link>
                </li>
              </ul>

              {/* Categories */}
              <div className="mt-6">
                <p className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Popular Categories
                </p>
                <ul className="grid grid-cols-2 gap-2 list-none p-0 m-0">
                  {categories.slice(0, 6).map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.slug}`}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 p-3 rounded-xl border border-neutral-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors"
                        title={`View products in the ${category.name} category`}
                      >
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.name}
                            title={category.name}
                            width={32}
                            height={32}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Package className="h-4 w-4 text-emerald-600" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-neutral-700 truncate">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business */}
              <div className="mt-6">
                <p className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Business
                </p>
                <ul className="space-y-1 list-none p-0 m-0">
                  <li>
                    <Link
                      href="/wholesale"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                      title="Explore our wholesale options"
                    >
                      <Building2 className="h-5 w-5 text-neutral-400" />
                      <span className="font-medium">Wholesale</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/b2b-request"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                      title="Submit a B2B enquiry"
                    >
                      <FileText className="h-5 w-5 text-neutral-400" />
                      <span className="font-medium">B2B Request</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="mt-6">
                <p className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Resources
                </p>
                <ul className="space-y-1 list-none p-0 m-0">
                  {resourceLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                        title={`Go to ${link.name}`}
                      >
                        <link.icon className="h-5 w-5 text-neutral-400" />
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="mt-6">
                <p className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Company
                </p>
                <ul className="space-y-1 list-none p-0 m-0">
                  <li>
                    <Link
                      href="/about"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                      title="Learn more about us"
                    >
                      <span className="font-medium">About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sustainability"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                      title="Read about our sustainability efforts"
                    >
                      <span className="font-medium">Sustainability</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                      title="Get in touch with us"
                    >
                      <span className="font-medium">Contact</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                      title="Frequently Asked Questions"
                    >
                      <span className="font-medium">FAQ</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Account Links */}
              {isAuthenticated && (
                <div className="mt-6">
                  <p className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Account
                  </p>
                  <ul className="space-y-1 list-none p-0 m-0">
                    {user?.role === "admin" && (
                      <li>
                        <Link
                          href="/admin"
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 p-3 rounded-xl text-white bg-gradient-to-r from-violet-600 to-indigo-600 transition-colors"
                          title="Go to Admin Dashboard"
                        >
                          <ShieldCheck className="h-5 w-5" />
                          <span className="font-semibold">Admin Dashboard</span>
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        href="/account"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                        title="View your account details"
                      >
                        <Settings className="h-5 w-5 text-neutral-400" />
                        <span className="font-medium">My Account</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/account?tab=orders"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 p-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
                        title="View your orders"
                      >
                        <Package className="h-5 w-5 text-neutral-400" />
                        <span className="font-medium">Orders</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleSignOut();
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50">
              <a
                href="tel:+447728342335"
                className="flex items-center justify-center gap-2 w-full p-3 text-emerald-700 font-medium"
              >
                <Phone className="h-4 w-4" />
                07728 342335
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
