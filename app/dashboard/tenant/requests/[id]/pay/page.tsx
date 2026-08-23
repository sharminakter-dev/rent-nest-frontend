import { notFound } from 'next/navigation'
import { getMyRentals } from '../../../../_actions/tenantActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { canPayRequest, RequestStatusBadge } from '@/components/request-status-badge'
import { PayRequestForm } from './PayRequestForm'

interface PayRequestPageProps {
  params: Promise<{ id: string }>
}

export default async function PayRequestPage({ params }: PayRequestPageProps) {
  const { id } = await params
  const rentalsRes = await getMyRentals()
  const requests = rentalsRes?.data ?? []
  const request = requests.find((r: { id: string }) => r.id === id)

  if (!request) notFound()

  const canPay = canPayRequest(request.status)

  return (
    <div className="mx-auto max-w-lg pt-6">
      <h1 className="text-2xl font-bold tracking-tight">Complete your payment</h1>
      <p className="mt-1 text-muted-foreground">Review your request before proceeding to secure checkout.</p>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg">{request.property.title}</CardTitle>
            <RequestStatusBadge status={request.status} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Start date</p>
              <p className="font-medium">{new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{request.durationMonths} month{request.durationMonths !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {canPay ? (
            <PayRequestForm rentalRequestId={request.id} />
          ) : (
            <p className="rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
              This request isn&apos;t ready for payment yet. Only approved requests can proceed to checkout.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}