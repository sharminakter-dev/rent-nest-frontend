import { IPayment, IRentalRequest } from '@/lib/types'
import { formatCurrency, formatDate } from './utils'
import { PaymentStatusBadge } from '@/components/payment-status-badge'
import { RequestThumbnail } from './RequestThumbnail'

// request.property may include `image` at runtime even though IRentalRequest
// doesn't declare it — read it optionally without touching lib/types.ts
type PropertyWithImage = IRentalRequest['property'] & { image?: string | null }

export function PaymentRow({ payment, requests }: { payment: IPayment; requests: IRentalRequest[] }) {
  const relatedRequest = requests.find((r) => r.id === payment.rentalRequestId)
  const property = relatedRequest?.property as PropertyWithImage | undefined

  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <RequestThumbnail
          src={property?.image}
          alt={property?.title ?? 'Rental payment'}
        />
        <div className="min-w-0">
          <p className="truncate font-medium">{relatedRequest?.property.title ?? 'Rental payment'}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(payment.paidAt)} · {payment.transactionId.slice(0, 18)}…
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold">{formatCurrency(payment.amount)}</span>
        <PaymentStatusBadge status={payment.status} />
      </div>
    </div>
  )
}