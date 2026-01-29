"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Send } from "lucide-react";

export default function B2BBanner() {
  const router = useRouter();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-2">
      <div className="container mx-auto max-w-[1200px]">
        <div
          className="relative overflow-hidden rounded-lg border border-white/20 bg-red-600/95 backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-red-500/25 group"
        >
          {/* Glassmorphism Shine Effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-white/10 to-transparent rotate-12 blur-2xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-6">
            {/* Left Content */}
            <div className="flex items-center gap-3 w-full sm:w-auto text-center sm:text-left justify-center sm:justify-start">
              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white shadow-inner backdrop-blur-sm shrink-0 border border-white/10">
                <Building2 className="w-4 h-4" />
              </div>

              <div>
                <h2 className="text-sm font-bold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                  <span className="sm:hidden text-white"><Building2 className="w-4 h-4" /></span>
                  Partner with Bubble Wrap Shop
                </h2>
                <p className="text-red-50 text-[10px] sm:text-xs font-medium">
                  Businesses save up to <span className="text-white font-bold underline decoration-white/30 underline-offset-2">40% on packaging</span>.
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <button
                onClick={() => router.push("/wholesale")}
                className="inline-flex items-center justify-center px-3 py-1.5 text-[10px] sm:text-xs font-medium text-white bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-colors duration-200 backdrop-blur-md"
              >
                Learn More
              </button>

              <button
                onClick={() => router.push("/wholesale")}
                className="inline-flex items-center justify-center px-3 py-1.5 text-[10px] sm:text-xs font-bold text-red-950 bg-white rounded-md hover:bg-white/90 transition-all duration-200 shadow-md shadow-red-900/20 group/btn"
              >
                Submit Request
                <Send className="ml-1.5 w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
