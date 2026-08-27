'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Loader2, Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  RequestStatusBadge,
  canPayRequest,
  canReviewRequest,
  canCancelRequest,
} from '@/components/request-status-badge'
import { IRentalRequest } from '@/lib/types'
import { computeEndDate, formatDate } from './utils'
import { ReviewDialog } from './ReviewDialog'
import { RequestThumbnail } from './RequestThumbnail'
import { toast } from 'sonner'
import { cancelRentalRequest } from '../../_actions/tenantActions'

type PropertyWithImage = IRentalRequest['property'] & { image?: string | null }

export function RequestRow({ request }: { request: IRentalRequest }) {
  const [isPending, startTransition] = useTransition()
  const endDate = computeEndDate(request.startDate, request.durationMonths)
  const property = request.property as PropertyWithImage

  function handleCancel() {
    startTransition(async () => {
      const res = await cancelRentalRequest(request.id)
      if (res.success) toast.success('Request cancelled')
      else toast.error(res.message ?? 'Failed to cancel request')
    })
  }

  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 gap-4">
        <RequestThumbnail src={property.image} alt={property.title} />
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{request.property.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(request.startDate)} – {formatDate(endDate)}</span>
            <span aria-hidden="true">•</span>
            <span>{request.durationMonths} month{request.durationMonths !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <RequestStatusBadge status={request.status} />
        {canCancelRequest(request.status) && (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={handleCancel}
            className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
            ) : (
              <X data-icon="inline-start" />
            )}
            {isPending ? 'Cancelling…' : 'Cancel'}
          </Button>
        )}
        {canPayRequest(request.status) && (
          <Button
            size="sm"
            render={<Link href={`/dashboard/tenant/requests/${request.id}/pay`} />}
            nativeButton={false}
            className="bg-green-600 text-white hover:bg-green-700"
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
            <ReviewDialog rentalId={request.id} propertyTitle={request.property.title} />
          )
        )}
      </div>
    </div>
  )
}