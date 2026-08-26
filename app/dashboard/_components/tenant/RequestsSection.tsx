import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IRentalRequest } from '@/lib/types'
import { RequestRow } from './RequestRow'


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