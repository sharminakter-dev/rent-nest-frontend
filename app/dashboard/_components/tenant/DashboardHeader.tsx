// app/dashboard/tenant/_components/DashboardHeader.tsx
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardHeader({ userName }: { userName?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-primary">Tenant dashboard</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Welcome back{userName ? `, ${userName}` : ''}
        </h1>
        <p className="mt-2 text-muted-foreground">Keep track of your rental journey in one place.</p>
      </div>
      <Button render={<Link href="/properties" />} nativeButton={false}>
        <Search data-icon="inline-start" />
        Find a property
      </Button>
    </div>
  )
}