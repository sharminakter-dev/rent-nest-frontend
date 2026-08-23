// app/dashboard/tenant/_components/RequestsSection.tsx
import Link from 'next/link'
import { ArrowUpRight, Home, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RequestStatusBadge, canPayRequest, canReviewRequest } from '@/components/request-status-badge'
import { IRentalRequest } from '@/lib/types'
import { computeEndDate, formatDate } from './utils'

function RequestRow({ request }: { request: IRentalRequest }) {
  const endDate = computeEndDate(request.startDate, request.durationMonths)

  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Home className="size-5" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{request.property.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(request.startDate)} – {formatDate(endDate)}</span>
            <span aria-hidden="true">•</span>
            <span>{request.durationMonths} month{request.durationMonths !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <RequestStatusBadge status={request.status} />
        {canPayRequest(request.status) && (
          <Button
            size="sm"
            render={<Link href={`/dashboard/tenant/requests/${request.id}/pay`} />}
            nativeButton={false}
          >
            Pay Now
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        )}
        {request.review ? (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            You rated {request.review.rating}/5
          </span>
        ) : (
          canReviewRequest(request.status, false) && (
            <Button size="sm" variant="outline">
              <Star data-icon="inline-start" />
              Leave Review
            </Button>
          )
        )}
      </div>
    </div>
  )
}

export function RequestsSection({ requests }: { requests: IRentalRequest[] }) {
  return (
    <Card id="requests" className="scroll-mt-24">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Rental requests</CardTitle>
            <CardDescription>Your applications and current rentals</CardDescription>
          </div>
          <Badge variant="secondary">{requests.length} total</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <div className="divide-y">
            {requests.map((request) => <RequestRow key={request.id} request={request} />)}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No rental requests yet. <Link href="/properties" className="text-primary underline">Browse properties</Link> to get started.
          </p>
        )}
      </CardContent>
    </Card>
  )
}