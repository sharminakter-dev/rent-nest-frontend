// components/payment-status-badge.tsx
import { Badge } from '@/components/ui/badge'
import { PaymentStatus } from '@/lib/types';


const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  SUCCESS: { label: 'Paid', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  FAILED: { label: 'Failed', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-800 hover:bg-amber-100' },
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = paymentStatusConfig[status] ?? { label: status, className: '' }
  return <Badge className={config.className}>{config.label}</Badge>
}