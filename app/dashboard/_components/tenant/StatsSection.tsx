// app/dashboard/tenant/_components/StatsSection.tsx
import { CheckCircle2, Clock3, CreditCard, Home } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { IRentalRequest } from '@/lib/types'

export function StatsSection({ requests }: { requests: IRentalRequest[] }) {
  const pendingCount = requests.filter((r) => r.status === 'PENDING').length
  const activeCount = requests.filter((r) => r.status === 'ACTIVE').length
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length
  const completedCount = requests.filter((r) => r.status === 'COMPLETED').length

  const stats = [
    { label: 'Active rentals', value: activeCount, icon: Home },
    { label: 'Pending requests', value: pendingCount, icon: Clock3 },
    { label: 'Approved — ready to pay', value: approvedCount, icon: CheckCircle2 },
    { label: 'Completed rentals', value: completedCount, icon: CreditCard },
  ]

  return (
    <section aria-label="Tenant summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between gap-3 p-5">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}