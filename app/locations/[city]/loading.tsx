export default function LocationLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="h-8 w-48 bg-white/20 rounded-full mb-6 animate-pulse" />
            <div className="h-16 md:h-20 w-full max-w-xl bg-white/20 rounded-lg mb-4 animate-pulse" />
            <div className="h-6 w-full max-w-md bg-white/10 rounded mb-8 animate-pulse" />
            <div className="flex gap-4">
              <div className="h-12 w-36 bg-white/20 rounded-xl animate-pulse" />
              <div className="h-12 w-36 bg-white/10 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar Skeleton */}
      <div className="bg-secondary/50 border-b border-border py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-5 w-5 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted/50 rounded animate-pulse hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Grid Skeleton */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="h-10 w-48 bg-white/20 rounded-full animate-pulse" />
            <div className="flex-1 flex gap-3 overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-32 bg-white/10 rounded-full animate-pulse shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="h-8 w-64 bg-muted rounded mx-auto mb-3 animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-muted/50 rounded mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-background rounded-2xl border border-border overflow-hidden"
            >
              <div className="aspect-square bg-muted animate-pulse" />
              <div className="p-4">
                <div className="h-5 w-3/4 bg-muted rounded mb-2 animate-pulse" />
                <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-10">
            <div className="h-8 w-56 bg-muted rounded mx-auto mb-3 animate-pulse" />
            <div className="h-5 w-80 bg-muted/50 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="h-10 w-64 bg-white/20 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-white/10 rounded mx-auto mb-8 animate-pulse" />
          <div className="flex justify-center gap-4">
            <div className="h-14 w-40 bg-white/20 rounded-xl animate-pulse" />
            <div className="h-14 w-40 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
