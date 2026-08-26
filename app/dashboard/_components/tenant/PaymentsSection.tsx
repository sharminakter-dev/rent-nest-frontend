import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IPayment, IRentalRequest } from '@/lib/types'
import { PaymentRow } from './PaymentRow'

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