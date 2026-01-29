import { Star, Truck, MapPin, ShieldCheck } from "lucide-react";

export function TrustBar() {
  return (
    <section className="bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          {/* Local Signal */}
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">Family-Run in Blackburn</span>
          </div>

          {/* Delivery Promise */}
          <div className="flex items-center gap-2 text-foreground">
            <Truck className="w-4 h-4 text-primary" />
            <span className="font-medium">Next-Day UK Delivery</span>
          </div>

          {/* Trust Rating */}
          <div className="flex items-center gap-2 text-foreground">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-medium">5-Star Rated</span>
          </div>

          {/* Secure */}
          <div className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
