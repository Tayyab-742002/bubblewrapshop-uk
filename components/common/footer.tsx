import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function aFooter() {
  return (
    <footer className="bg-neutral-100 text-neutral-800 border-t border-neutral-200">



      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand Column - Wider */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.jpg"
                alt="Bubble Wrap Shop"
                width={140}
                height={50}
                className="h-10 w-auto mix-blend-multiply"
              />
            </Link>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-sm">
              The UK's trusted source for wholesale packaging solutions. We provide businesses with high-quality, eco-conscious materials delivered next-day.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors text-neutral-600 hover:text-neutral-900">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors text-neutral-600 hover:text-neutral-900">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors text-neutral-600 hover:text-neutral-900">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors text-neutral-600 hover:text-neutral-900">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-6">Info</h4>
            <ul className="space-y-4 text-sm text-neutral-600">
              <li><Link href="/about" className="hover:text-neutral-900 transition-colors">About Company</Link></li>
              <li><Link href="/sustainability" className="hover:text-neutral-900 transition-colors">Our Sustainability</Link></li>
              <li><Link href="/blog" className="hover:text-neutral-900 transition-colors">Latest News</Link></li>
              <li><Link href="/careers" className="hover:text-neutral-900 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-6">Service</h4>
            <ul className="space-y-4 text-sm text-neutral-600">
              <li><Link href="/faq" className="hover:text-neutral-900 transition-colors">Help Center</Link></li>
              <li><Link href="/delivery" className="hover:text-neutral-900 transition-colors">Delivery Information</Link></li>
              <li><Link href="/refund-policy" className="hover:text-neutral-900 transition-colors">Returns Policy</Link></li>
              <li><Link href="/terms" className="hover:text-neutral-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-neutral-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <span>Unit BR16 Blakewater Rd,<br />Blackburn, BB1 5QF</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-neutral-400 shrink-0" />
                <a href="tel:+441254916167" className="hover:text-neutral-900 transition-colors">01254 916167</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-neutral-400 shrink-0" />
                <a href="mailto:sales@bubblewrapshop.co.uk" className="hover:text-neutral-900 transition-colors">Email Us</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Footer */}
        <div className="border-t border-neutral-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Bubble Wrap Shop Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-neutral-900 transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-neutral-900 transition-colors">Cookie Policy</Link>
            <span>VAT: GB 123456789</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
