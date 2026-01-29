export default function LocationsLoading() {
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
              <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
            </div>
          </div>

          {/* Hero Content Skeleton */}
          <div className="py-10 md:py-16 lg:py-20 text-center">
            <div className="inline-flex h-10 w-56 bg-white/10 rounded-full mb-6 animate-pulse" />
            <div className="h-16 md:h-20 w-full max-w-lg bg-white/20 rounded-lg mb-4 mx-auto animate-pulse" />
            <div className="h-16 md:h-20 w-full max-w-md bg-white/20 rounded-lg mb-6 mx-auto animate-pulse" />
            <div className="h-6 w-full max-w-2xl bg-white/10 rounded mx-auto mb-8 animate-pulse" />

            {/* Quick Stats Skeleton */}
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-white/20 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Locations Grid Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-background rounded-2xl border border-border overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="aspect-[16/10] bg-muted animate-pulse" />

              {/* Content Skeleton */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="h-6 w-32 bg-muted rounded mb-2 animate-pulse" />
                    <div className="h-4 w-24 bg-muted/50 rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-5 bg-muted rounded animate-pulse" />
                </div>

                <div className="h-4 w-full bg-muted/50 rounded mb-2 animate-pulse" />
                <div className="h-4 w-3/4 bg-muted/50 rounded mb-4 animate-pulse" />

                {/* Features Skeleton */}
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Section Skeleton */}
      <div className="bg-secondary/30 border-y border-border py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded mx-auto mb-3 animate-pulse" />
            <div className="h-5 w-80 bg-muted/50 rounded mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 animate-pulse" />
                <div className="h-5 w-32 bg-muted rounded mx-auto mb-2 animate-pulse" />
                <div className="h-4 w-48 bg-muted/50 rounded mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="py-16 md:py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="h-8 w-48 bg-white/10 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-white/20 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-white/10 rounded mx-auto mb-8 animate-pulse" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-14 w-36 bg-white/20 rounded-xl animate-pulse" />
            <div className="h-14 w-36 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
