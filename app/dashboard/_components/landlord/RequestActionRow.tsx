'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EntityAvatar } from '@/components/entity-avatar'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { IRentalRequest } from '@/lib/types'
import { updateRequestStatus } from '../../_actions/landlordActions'

export function RequestActionRow({ request }: { request: IRentalRequest }) {
  const [status, setStatus] = useState(request.status)
  const [loading, setLoading] = useState<'APPROVED' | 'REJECTED' | null>(null)

  const handleAction = async (next: 'APPROVED' | 'REJECTED') => {
    setLoading(next)
    try {
      const result = await updateRequestStatus(request.id, next)
      if (result.success) {
        setStatus(next)
        toast.success(`Request ${next.toLowerCase()}`)
      } else {
        toast.error(result.message ?? 'Failed to update request')
      }
    } catch {
      toast.error('Network error — please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <EntityAvatar
            src={request.property?.image}
            fallbackSeed={request.property?.title ?? '?'}
            alt={request.property?.title ?? 'Property'}
            size={56}
          />
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{request.property.title}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {request.tenant.name} · {request.tenant.email}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {request.durationMonths} months
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RequestStatusBadge status={status} />
          {status === 'PENDING' && (
            <>
              <Button
                size="sm"
                onClick={() => handleAction('APPROVED')}
                disabled={loading !== null}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <Check data-icon="inline-start" />
                {loading === 'APPROVED' ? 'Approving...' : 'Approve'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction('REJECTED')}
                disabled={loading !== null}
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
              >
                <X data-icon="inline-start" />
                {loading === 'REJECTED' ? 'Rejecting...' : 'Reject'}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}