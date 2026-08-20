export default function PropertyLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button placeholder */}
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />

        <section className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          <div className="flex flex-col gap-6">
            {/* Hero image */}
            <div className="min-h-80 animate-pulse rounded-xl bg-muted sm:min-h-[30rem]" />

            {/* Title block */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="h-9 w-72 animate-pulse rounded-md bg-muted" />
                  <div className="h-5 w-48 animate-pulse rounded-md bg-muted" />
                </div>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <div className="h-5 w-28 animate-pulse rounded-md bg-muted" />
                <div className="h-5 w-28 animate-pulse rounded-md bg-muted" />
              </div>
            </div>

            <div className="h-px w-full bg-border" />

            {/* About section */}
            <section className="flex flex-col gap-3">
              <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
              </div>
            </section>

            {/* Amenities section */}
            <section className="flex flex-col gap-4">
              <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-5 w-40 animate-pulse rounded-md bg-muted" />
                ))}
              </div>
            </section>

            {/* Reviews section */}
            <section className="flex flex-col gap-4">
              <div className="h-6 w-24 animate-pulse rounded-md bg-muted" />
              <div className="flex flex-col gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="mb-2 h-4 w-24 animate-pulse rounded-md bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar card */}
          <div className="rounded-xl border p-6 lg:sticky lg:top-24">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
                <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
              </div>
              <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="mb-5 h-16 w-full animate-pulse rounded-lg bg-muted" />
            <div className="mb-5 flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
                <div className="h-3 w-24 animate-pulse rounded-md bg-muted" />
              </div>
            </div>
            <div className="h-11 w-full animate-pulse rounded-md bg-muted" />
          </div>
        </section>
      </div>
    </main>
  )
}