'use client'

import Link from 'next/link'
import { Building2, DollarSign, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EntityAvatar } from '@/components/entity-avatar'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { IProperty, IRentalRequest } from '@/lib/types'

export function LandlordDashboard({
  properties,
  requests,
}: {
  properties: IProperty[]
  requests: IRentalRequest[]
}) {
  const pendingCount = requests.filter((r) => r.status === 'PENDING').length

  const monthlyEarnings = requests
    .filter((r) => r.status === 'ACTIVE')
    .reduce((sum, r) => {
      const matched = properties.find((p) => p.id === r.propertyId)
      return sum + Number(matched?.rent ?? 0)
    }, 0)

  const stats = [
    { label: 'Total properties', value: properties.length, detail: 'Your active listings', icon: Building2 },
    { label: 'Incoming requests', value: pendingCount, detail: 'Awaiting your response', icon: Users },
    { label: 'Monthly earnings', value: `৳${monthlyEarnings.toLocaleString()}`, detail: 'From active rentals', icon: DollarSign },
  ]

  const recentProperties = properties.slice(0, 3)
  const recentRequests = requests.slice(0, 3)

  return (
    <main className="w-full p-4 py-8 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Landlord workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Manage your rentals</h1>
          <p className="mt-2 text-muted-foreground">Create listings, manage availability, and respond to tenants.</p>
        </div>
        <Button render={<Link href="/dashboard/landlord/properties/new" />} nativeButton={false}>
          Add Property
        </Button>
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
                  <Icon className="size-5" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Recent properties</CardTitle>
                <CardDescription>Your latest listings</CardDescription>
              </div>
              <Button size="sm" variant="ghost" render={<Link href="/dashboard/landlord/properties" />} nativeButton={false}>
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {recentProperties.map((property) => (
              <div key={property.id} className="flex items-center gap-3">
                <EntityAvatar src={property.image} fallbackSeed={property.title} alt={property.title} size={40} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{property.title}</p>
                  <p className="text-xs text-muted-foreground">৳{Number(property.rent).toLocaleString()}/mo</p>
                </div>
              </div>
            ))}
            {properties.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No properties yet.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Recent requests</CardTitle>
                <CardDescription>Latest tenant applications</CardDescription>
              </div>
              <Button size="sm" variant="ghost" render={<Link href="/dashboard/landlord/requests" />} nativeButton={false}>
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <EntityAvatar src={request.property?.image} fallbackSeed={request.property?.title ?? '?'} alt={request.property?.title ?? ''} size={40} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{request.property?.title}</p>
                    <p className="text-xs text-muted-foreground">{request.tenant?.name}</p>
                  </div>
                </div>
                <RequestStatusBadge status={request.status} />
              </div>
            ))}
            {requests.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No requests yet.</p>}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}