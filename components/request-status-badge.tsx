// components/request-status-badge.tsx
import { Badge } from '@/components/ui/badge'
import { PaymentStatus, RentalStatus } from '@/lib/types'

const statusConfig: Record<RentalStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-800 hover:bg-amber-100' },
  APPROVED: { label: 'Approved', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
  REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
  ACTIVE: { label: 'Active', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  COMPLETED: { label: 'Completed', className: 'bg-gray-100 text-gray-700 hover:bg-gray-100' },
}

export function RequestStatusBadge({ status }: { status: RentalStatus }) {
  const config = statusConfig[status]
  return <Badge className={config.className}>{config.label}</Badge>
}

export function canPayRequest(status: RentalStatus) {
  return status === 'APPROVED'
}

export function canReviewRequest(status: RentalStatus, hasReview: boolean) {
  return (status === 'ACTIVE' || status === 'COMPLETED') && !hasReview
}

const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-800 hover:bg-amber-100' },
  SUCCESS: { label: 'Paid', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  FAILED: { label: 'Failed', className: 'bg-red-100 text-red-800 hover:bg-red-100' }
}