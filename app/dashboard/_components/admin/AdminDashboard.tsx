'use client'

import { useTransition } from 'react'
import { Building2, ClipboardList, ShieldBan, ShieldCheck, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { IProperty, IRentalRequest } from '@/lib/types'
import { toast } from 'sonner'
import { AdminUserRecord, updateUserStatus } from '../../_actions/adminActions'
import Image from 'next/image'

export function AdminDashboard({
  users,
  properties,
  rentals,
}: {
  users: AdminUserRecord[]
  properties: IProperty[]
  rentals: IRentalRequest[]
}) {
  const [isPending, startTransition] = useTransition()

  function handleStatus(id: string, status: 'ACTIVE' | 'BANNED', name: string) {
    startTransition(async () => {
      const res = await updateUserStatus(id, status)
      if (res.success) toast.success(`${name} ${status === 'BANNED' ? 'banned' : 'reactivated'}`)
      else toast.error(res.message ?? 'Failed to update user')
    })
  }

  const stats = [
    { label: 'Total users', value: users.length, detail: 'Tenants & landlords', icon: Users },
    { label: 'Total listings', value: properties.length, detail: 'Across all landlords', icon: Building2 },
    { label: 'Total rentals', value: rentals.length, detail: 'All requests to date', icon: ClipboardList },
  ]

  const userProfile= 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const propertyImg = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


  return (
    <main className="w-full p-4 py-8 sm:p-6 lg:p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Admin console</p>
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

      <Card id="users" className="mt-6">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Ban or reactivate accounts.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
               {user.profile?.profilePhoto ? (
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                      <Image
                        src={user.profile?.profilePhoto ?? userProfile} 
                        alt={user.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                <div className="min-w-0">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  {user.phone && <p className="text-xs text-muted-foreground">{user.phone}</p>}
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">{user.role}</Badge>
                    <Badge variant={user.status === 'ACTIVE' ? 'secondary' : 'destructive'}>{user.status}</Badge>
                  </div>
                </div>
              </div>
              {user.role !== 'ADMIN' && (
                user.status === 'ACTIVE' ? (
                  <Button size="sm" variant="outline" disabled={isPending} onClick={() => handleStatus(user.id, 'BANNED', user.name)}>
                    <ShieldBan data-icon="inline-start" />Ban
                  </Button>
                ) : (
                  <Button size="sm" disabled={isPending} onClick={() => handleStatus(user.id, 'ACTIVE', user.name)}>
                    <ShieldCheck data-icon="inline-start" />Reactivate
                  </Button>
                )
              )}
            </div>
          ))}
          {users.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No users found.</p>}
        </CardContent>
      </Card>

      <Card id="listings" className="mt-6">
        <CardHeader>
          <CardTitle>Listings</CardTitle>
          <CardDescription>Every property on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {properties.map((property) => (
            <div key={property.id} className="flex flex-col gap-1 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {property.image ? (
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                      <Image
                        src={property.image ?? propertyImg}
                        alt={property.title}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                      {property.title?.charAt(0).toUpperCase()}
                    </div>
                  )}
                <p className="font-semibold">{property.title}</p>
                <p className="text-sm text-muted-foreground">
                  {property.location} · ${property.rent}/mo · by {property.landlord?.name}
                </p>
              </div>
              <Badge variant={property.isAvailable ? 'secondary' : 'outline'}>
                {property.isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
            </div>
          ))}
          {properties.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No listings found.</p>}
        </CardContent>
      </Card>

      <Card id="requests" className="mt-6">
        <CardHeader>
          <CardTitle>Rentals</CardTitle>
          <CardDescription>All rental requests across the platform.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {rentals.map((rental) => (
            <div key={rental.id} className="flex items-start justify-between gap-3 rounded-lg border p-4">
              <div>
                 {rental.property.image ? (
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                      <Image
                        src={rental.property.image ?? propertyImg}
                        alt={rental.property.title}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                      {rental.property.title?.charAt(0).toUpperCase()}
                    </div>
                  )}
                <p className="font-semibold">Owner : {rental.property?.title}</p>
                <p className="text-sm text-muted-foreground">Requested By : {rental.tenant?.name}</p>
              </div>
              <RequestStatusBadge status={rental.status} />
            </div>
          ))}
          {rentals.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No rentals found.</p>}
        </CardContent>
      </Card>
    </main>
  )
}