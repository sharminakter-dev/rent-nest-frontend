export default function PaymentSuccessLoading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4">
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border p-8 text-center">
        <div className="size-12 animate-pulse rounded-full bg-muted" />
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  )
}