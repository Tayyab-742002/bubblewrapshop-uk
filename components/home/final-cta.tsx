import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-10 max-w-4xl mx-auto">

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.1]">
            Ready to upgrade your <br className="hidden md:block" />
            <span className="text-primary-foreground/80">packaging solution?</span>
          </h2>

          {/* Description with SEO links */}
          <div className="max-w-2xl space-y-6">
            <p className="text-lg md:text-xl text-primary-foreground/70 leading-relaxed font-light">
              Explore our complete selection of wholesale packaging materials in the UK.
              From cost-effective bubble wrap to heavy-duty protective solutions, we deliver reliability at scale.
            </p>

            <p className="text-sm md:text-base text-primary-foreground/50">
              Not sure where to start? Browse our{" "}
              <Link href="/blog" className="underline underline-offset-4 hover:text-white transition-colors" title="Read our packaging buying guides">
                buying guides
              </Link>{" "}
              and{" "}
              <Link href="/guides" className="underline underline-offset-4 hover:text-white transition-colors" title="Browse our packaging resources">
                packaging resources
              </Link>{" "}
              to find the perfect fit.
            </p>
          </div>

          {/* Action Button */}
          <Button asChild size="lg" className="h-14 px-8 text-base rounded-full bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300">
            <Link href="/products" className="flex items-center gap-2" title="Explore our full product catalog">
              Explore Catalog
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>

        </div>
      </div>
    </section>
  );
}
