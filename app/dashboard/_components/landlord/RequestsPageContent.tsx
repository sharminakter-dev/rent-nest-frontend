'use client'

import { useTransition } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { IRentalRequest } from '@/lib/types'
import { toast } from 'sonner'
import { updateRequestStatus } from '../../_actions/landlordActions'
import Image from 'next/image'

export function RequestsPageContent({ requests }: { requests: IRentalRequest[] }) {
  const [isPending, startTransition] = useTransition()

  function handleRequest(id: string, status: 'APPROVED' | 'REJECTED') {
    startTransition(async () => {
      const res = await updateRequestStatus(id, status)
      if (res.success) toast.success(`Request ${status === 'APPROVED' ? 'approved' : 'rejected'}`)
      else toast.error(res.message ?? 'Failed to update request')
    })
  }

  const propertyImg =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


  return (
    <main className="w-full p-4 py-8 sm:p-6 lg:p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">Landlord workspace</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Rental requests</h1>
        <p className="mt-2 text-muted-foreground">Review and respond to every tenant application.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All requests</CardTitle>
          <CardDescription>{requests.length} total</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {requests.map((request) => (
            <div key={request.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-3">
                 <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                    <Image
                      src={request.property.image ?? propertyImg}
                      alt={request.property.title}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                <div>
                  <p className="font-semibold">{request.property?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.tenant?.name} · {request.durationMonths} months from{' '}
                    {new Date(request.startDate).toLocaleDateString()}
                  </p>
                  {request.message && <p className="mt-1 text-sm">{request.message}</p>}
                </div>
                <RequestStatusBadge status={request.status} />
              </div>
              {request.status === 'PENDING' && (
                <div className="mt-4 flex gap-2">
                  <Button size="sm" disabled={isPending} onClick={() => handleRequest(request.id, 'APPROVED')}>
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
    </main>
  )
}