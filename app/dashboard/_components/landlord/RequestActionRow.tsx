// app/dashboard/landlord/requests/RequestActionRow.tsx
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IRentalRequest } from '@/lib/types'
import { updateRequestStatus } from '../../_actions/landlordActions'
import { RequestStatusBadge } from '@/components/request-status-badge'

export function RequestActionRow({ request }: { request: IRentalRequest }) {
  const [status, setStatus] = useState(request.status)
  const [loading, setLoading] = useState<'APPROVED' | 'REJECTED' | null>(null)

  const handleAction = async (next: 'APPROVED' | 'REJECTED') => {
    setLoading(next)
    const result = await updateRequestStatus(request.id, next)
    setLoading(null)

    if (result.success) {
      setStatus(next)
      toast.success(`Request ${next.toLowerCase()}`)
    } else {
      toast.error(result.message ?? 'Failed to update request')
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-semibold">{request.property.title}</h3>
          <p className="text-sm text-muted-foreground">
            {request.tenant.name} · {request.tenant.email}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(request.startDate).toLocaleDateString()} · {request.durationMonths} months
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RequestStatusBadge status={status} />
          {status === 'PENDING' && (
            <>
              <Button size="sm" onClick={() => handleAction('APPROVED')} disabled={loading !== null}>
                {loading === 'APPROVED' ? 'Approving...' : 'Approve'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleAction('REJECTED')} disabled={loading !== null}>
                {loading === 'REJECTED' ? 'Rejecting...' : 'Reject'}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}