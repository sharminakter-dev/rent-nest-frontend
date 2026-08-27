export default function AdminDashboardLoading() {
  return (
    <div className="flex flex-col gap-6 p-4 py-8 sm:p-6 lg:p-8">
      <div className="h-20 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-56 animate-pulse rounded-lg bg-muted" />
      ))}
    </div>
  )
}