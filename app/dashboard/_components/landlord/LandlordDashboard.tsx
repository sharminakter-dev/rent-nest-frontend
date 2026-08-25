'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { Building2, Check, DollarSign, Pencil, Plus, Users, X, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { IProperty, IRentalRequest } from '@/lib/types'
import { toast } from 'sonner'
import { deleteProperty, updateRequestStatus } from '../../_actions/landlordActions'

export function LandlordDashboard({
  properties,
  requests,
}: {
  properties: IProperty[]
  requests: IRentalRequest[]
}) {
  const [isPending, startTransition] = useTransition()
  const pendingCount = requests.filter((r) => r.status === 'PENDING').length

  // IRentalRequest.property has no `rent` field — cross-reference the
  // full properties list by propertyId to get the actual figure.
  const monthlyEarnings = requests
    .filter((r) => r.status === 'ACTIVE')
    .reduce((sum, r) => {
      const matched = properties.find((p) => p.id === r.propertyId)
      return sum + Number(matched?.rent ?? 0)
    }, 0)

  function handleRequest(id: string, status: 'ACTIVE' | 'REJECTED') {
    startTransition(async () => {
      const res = await updateRequestStatus(id, status)
      if (res.success) toast.success(`Request ${status === 'ACTIVE' ? 'approved' : 'rejected'}`)
      else toast.error(res.message ?? 'Failed to update request')
    })
  }

  function handleDelete(id: string, title: string) {
    startTransition(async () => {
      const res = await deleteProperty(id)
      if (res.success) toast.success(`${title} deleted`)
      else toast.error(res.message ?? 'Failed to delete property')
    })
  }

  const stats = [
    { label: 'Total properties', value: properties.length, detail: 'Your active listings', icon: Building2 },
    { label: 'Incoming requests', value: pendingCount, detail: 'Awaiting your response', icon: Users },
    { label: 'Monthly earnings', value: `$${monthlyEarnings.toLocaleString()}`, detail: 'From active rentals', icon: DollarSign },
  ]

  return (
    <main className="w-full p-4 py-8 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Landlord workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Manage your rentals</h1>
          <p className="mt-2 text-muted-foreground">Create listings, manage availability, and respond to tenants.</p>
        </div>
        <Button
          render={<Link href="/dashboard/landlord/properties/new" />}
          nativeButton={false}
        >
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
                  <Icon />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Card id="properties">
          <CardHeader>
            <CardTitle>Your properties</CardTitle>
            <CardDescription>Edit listing details or remove a property.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {properties.map((property) => (
              <div key={property.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  {property.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={property.image} alt="" className="size-14 shrink-0 rounded-md object-cover" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{property.title}</p>
                    <p className="text-sm text-muted-foreground">{property.location} · ${property.rent}/mo</p>
                    <div className="mt-2 flex gap-2">
                      <Badge variant={property.isAvailable ? 'secondary' : 'outline'}>
                        {property.isAvailable ? 'Available' : 'Unavailable'}
                      </Badge>
                      {property.isFeatured && <Badge variant="default">Featured</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" render={<Link href={`/dashboard/landlord/properties/${property.id}/edit`} />}>
                    <Pencil data-icon="inline-start" />Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={isPending}
                    onClick={() => handleDelete(property.id, property.title)}
                    aria-label={`Delete ${property.title}`}
                  >
                    <Trash2 data-icon="inline-start" />Delete
                  </Button>
                </div>
              </div>
            ))}
            {properties.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No properties yet.</p>
            )}
          </CardContent>
        </Card>

        <Card id="requests">
          <CardHeader>
            <CardTitle>Incoming requests</CardTitle>
            <CardDescription>Approve or reject tenant applications.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {requests.map((request) => (
              <div key={request.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{request.property?.title}</p>
                    <p className="text-sm text-muted-foreground">{request.tenant?.name ?? 'Tenant'}</p>
                  </div>
                  <RequestStatusBadge status={request.status} />
                </div>
                {request.status === 'PENDING' && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" disabled={isPending} onClick={() => handleRequest(request.id, 'ACTIVE')}>
                      <Check data-icon="inline-start" />Approve
                    </Button>
                    <Button size="sm" variant="outline" disabled={isPending} onClick={() => handleRequest(request.id, 'REJECTED')}>
                      <X data-icon="inline-start" />Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {requests.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No requests yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}