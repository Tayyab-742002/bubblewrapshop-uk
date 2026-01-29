import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Sprout } from "lucide-react";
import Image from "next/image";

export function SustainabilityBlock() {
  return (
    <section className="relative w-full py-12 md:py-16 bg-gradient-to-r from-emerald-700 to-teal-700 overflow-hidden">
      {/* Subtle texture overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/noise.png')] opacity-10 mix-blend-overlay" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* Left: Headline & Badge */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-semibold text-emerald-100 uppercase tracking-widest">Eco-First Promise</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Pack Responsibly. <br className="hidden md:block" />
              <span className="text-emerald-200">Ship Sustainably.</span>
            </h2>

            <p className="text-emerald-100/90 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join us in minimizing environmental impact with our 100% recyclable and ethically sourced packaging solutions.
            </p>
          </div>

          {/* Right: Stats Grid & CTA */}
          <div className="flex-1 w-full max-w-2xl bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
                <div className="p-2 rounded-lg bg-emerald-500/20 w-fit">
                  <Recycle className="w-5 h-5 text-emerald-300" />
                </div>
                <h4 className="font-semibold text-white">100% Recyclable</h4>
                <p className="text-xs text-emerald-200/70">Circular economy ready materials.</p>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
                <div className="p-2 rounded-lg bg-emerald-500/20 w-fit">
                  <Sprout className="w-5 h-5 text-emerald-300" />
                </div>
                <h4 className="font-semibold text-white">Bio-Based options</h4>
                <p className="text-xs text-emerald-200/70">Reduced dependency on fossil fuels.</p>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
                <div className="p-2 rounded-lg bg-emerald-500/20 w-fit">
                  <Leaf className="w-5 h-5 text-emerald-300" />
                </div>
                <h4 className="font-semibold text-white">Carbon Neutral</h4>
                <p className="text-xs text-emerald-200/70">Offsetting our logistics footprint.</p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/sustainability"
                className="group inline-flex items-center gap-2 text-white font-medium hover:text-emerald-200 transition-colors"
              >
                View Impact Report
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
