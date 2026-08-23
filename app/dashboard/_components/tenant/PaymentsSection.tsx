// app/dashboard/tenant/_components/PaymentsSection.tsx
import { CreditCard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IPayment, IRentalRequest } from '@/lib/types'
import { formatCurrency, formatDate } from './utils'
import { PaymentStatusBadge } from '@/components/payment-status-badge';

function PaymentRow({ payment, requests }: { payment: IPayment; requests: IRentalRequest[] }) {
  const relatedRequest = requests.find((r) => r.id === payment.rentalRequestId)

  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CreditCard className="size-4" />
        </div>
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

export function PaymentsSection({ payments, requests }: { payments: IPayment[]; requests: IRentalRequest[] }) {
  return (
    <Card id="payments" className="scroll-mt-24">
      <CardHeader>
        <CardTitle>Payment history</CardTitle>
        <CardDescription>{payments.length} payment{payments.length !== 1 ? 's' : ''} on record</CardDescription>
      </CardHeader>
      <CardContent>
        {payments.length > 0 ? (
          <div className="divide-y">
            {payments.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} requests={requests} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">No payments yet.</p>
        )}
      </CardContent>
    </Card>
  )
}