export default function PropertiesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  )
}