import { Building2, ClipboardList, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { IProperty, IRentalRequest } from '@/lib/types'
import { UsersSection } from './UsersSection'
import { RentalsSection } from './RentalsSection'
import { AdminUserRecord } from '../../_actions/adminActions'
import { getMe } from '@/service/getMe'
import { ListingsSection } from './ListingsSection'

export async function AdminDashboard({
 users,
  properties,
  rentals,
  userName,
}: {
  users: AdminUserRecord[]
  properties: IProperty[]
  rentals: IRentalRequest[]
  userName?: string
}) {
  const stats = [
    { label: 'Total users', value: users.length, detail: 'Tenants & landlords', icon: Users },
    { label: 'Total listings', value: properties.length, detail: 'Across all landlords', icon: Building2 },
    { label: 'Total rentals', value: rentals.length, detail: 'All requests to date', icon: ClipboardList },
  ]

  return (
    <main className="w-full p-4 py-8 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm font-medium text-primary">Admin console</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Welcome back{userName ? `, ${userName}` : ''}
        </h1>
        <p className="mt-2 text-muted-foreground">Keep track of your rental journey in one place.</p>
      </div>

      <div className="mb-8">
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Platform overview</h1>
        <p className="mt-2 text-muted-foreground">Monitor users, listings, and rental activity.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-start justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <UsersSection users={users} />
      <ListingsSection properties={properties} />
      <RentalsSection rentals={rentals} />
    </main>
  )
}