"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, TrendingUp, Package } from "lucide-react";
import Image from "next/image";

export default function B2BBanner() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-[1400px] mx-auto">
        <div
          className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:shadow-xl transition-shadow duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-5 sm:p-6 md:px-8 md:py-6">
            {/* Left Side */}
            <div className="flex items-center gap-4 md:gap-5 flex-1 w-full md:w-auto">
              {/* Icon */}
              <div className="shrink-0 relative">
                <div
                  className={`absolute inset-0 bg-white/30 rounded-full animate-ping ${isHovered ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                />
                <Image
                  src="https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/gift.jpg"
                  alt="B2B Wholesale Packaging"
                  width={74}
                  height={74}
                  className="rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-[74px] md:h-[74px] object-cover"
                  sizes="74px"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-white/90 font-semibold text-xs uppercase tracking-wider">
                    B2B Solutions
                  </span>
                  <div className="h-1 w-1 bg-white/50 rounded-full hidden sm:block" />
                  <span className="text-white/70 text-xs">Wholesale Pricing</span>
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  Need Bulk Packaging?
                </h2>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-purple-200 shrink-0" />
                    <span className="text-white/90">
                      Save up to <span className="font-bold text-white">40%</span> on bulk
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-white/80">
                    <Package className="w-4 h-4 text-purple-200 shrink-0" />
                    <span>500+ Trusted Businesses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - CTA Buttons */}
            <div className="shrink-0 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => router.push("/wholesale")}
                  className="group bg-white hover:bg-gray-50 active:bg-gray-100 font-semibold cursor-pointer w-full md:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-sm sm:text-base">
                    Learn More
                  </span>
                  <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => router.push("/b2b-request")}
                  className="group bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-semibold cursor-pointer w-full md:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-white/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="text-sm sm:text-base">Get Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <p className="text-center text-white/70 text-xs mt-2">
                Min. order: <span className="font-semibold text-white">£500</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
