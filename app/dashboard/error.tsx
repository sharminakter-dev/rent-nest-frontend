'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-7" />
      </div>
      <div>
        <h2 className="text-lg font-bold">Couldn&apos;t load this page</h2>
        <p className="mt-1 text-sm text-muted-foreground">{error.message || 'Please try again.'}</p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}