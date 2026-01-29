export default function LocationDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          {/* Breadcrumbs Skeleton */}
          <div className="py-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-1 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-1 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-28 bg-white/20 rounded animate-pulse" />
            </div>
          </div>

          {/* Hero Content Skeleton */}
          <div className="py-10 md:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Text Content Skeleton */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex h-10 w-48 bg-white/10 rounded-full mb-6 animate-pulse" />
                <div className="h-14 md:h-16 lg:h-20 w-full max-w-md bg-white/20 rounded-lg mb-6 mx-auto lg:mx-0 animate-pulse" />
                <div className="h-6 w-full max-w-lg bg-white/10 rounded mb-2 mx-auto lg:mx-0 animate-pulse" />
                <div className="h-6 w-3/4 max-w-md bg-white/10 rounded mb-8 mx-auto lg:mx-0 animate-pulse" />

                {/* Quick Stats Skeleton */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-5 w-5 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 w-28 bg-white/20 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Image Skeleton */}
              <div className="w-full max-w-sm lg:max-w-md shrink-0">
                <div className="aspect-square relative rounded-3xl overflow-hidden bg-white/10 border-4 border-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar Skeleton */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-4 md:py-5 px-4 flex flex-col items-center">
                <div className="w-6 h-6 bg-muted rounded mb-2 animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded mb-1 animate-pulse" />
                <div className="h-3 w-32 bg-muted/50 rounded hidden md:block animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Coverage Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="bg-secondary/30 rounded-2xl p-6 md:p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-6 w-6 bg-muted rounded animate-pulse" />
                <div className="h-6 w-48 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-4 w-full bg-muted/50 rounded mb-2 animate-pulse" />
              <div className="h-4 w-3/4 bg-muted/50 rounded mb-6 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <div key={j} className="h-8 w-16 bg-muted rounded-full animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Content Section Skeleton */}
      <div className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-16 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="h-8 w-72 bg-muted rounded mx-auto mb-8 animate-pulse" />

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border">
                <div className="w-12 h-12 rounded-xl bg-muted mb-4 animate-pulse" />
                <div className="h-5 w-40 bg-muted rounded mb-2 animate-pulse" />
                <div className="h-4 w-full bg-muted/50 rounded mb-1 animate-pulse" />
                <div className="h-4 w-full bg-muted/50 rounded mb-1 animate-pulse" />
                <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        {/* Section Header Skeleton with View All link for desktop */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="text-center md:text-left">
            <div className="h-8 w-64 bg-muted rounded mb-3 mx-auto md:mx-0 animate-pulse" />
            <div className="h-5 w-80 bg-muted/50 rounded mx-auto md:mx-0 animate-pulse" />
          </div>
          <div className="hidden md:block h-5 w-36 bg-muted/50 rounded animate-pulse" />
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
                <div className="h-3 w-1/2 bg-muted/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button Skeleton - visible on all devices */}
        <div className="mt-10 text-center">
          <div className="h-12 w-48 sm:h-14 sm:w-56 bg-muted rounded-xl mx-auto animate-pulse" />
        </div>
      </div>

      {/* FAQ Section Skeleton */}
      <div className="py-12 md:py-16 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10">
            <div className="h-8 w-56 bg-muted rounded mx-auto mb-3 animate-pulse" />
            <div className="h-5 w-64 bg-muted/50 rounded mx-auto animate-pulse" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-background rounded-xl border border-border p-5"
              >
                <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Locations Skeleton */}
      <div className="py-12 md:py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-10">
            <div className="h-8 w-56 bg-muted rounded mx-auto mb-3 animate-pulse" />
            <div className="h-5 w-64 bg-muted/50 rounded mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-secondary/30 rounded-2xl p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="h-5 w-28 bg-muted rounded mb-2 animate-pulse" />
                    <div className="h-4 w-36 bg-muted/50 rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-5 bg-muted rounded animate-pulse" />
                </div>
                <div className="h-4 w-32 bg-muted/50 rounded mt-3 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="h-8 w-56 bg-white/10 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-48 bg-white/20 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-80 max-w-full bg-white/10 rounded mx-auto mb-8 animate-pulse" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-14 w-36 bg-white/20 rounded-xl animate-pulse" />
            <div className="h-14 w-36 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
