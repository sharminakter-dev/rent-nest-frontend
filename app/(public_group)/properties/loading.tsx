export default function PropertiesLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-muted" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border">
            <div className="h-48 animate-pulse bg-muted" />
            <div className="flex flex-col gap-2 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-8 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}