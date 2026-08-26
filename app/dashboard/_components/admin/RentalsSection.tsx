import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { IRentalRequest } from '@/lib/types'

const propertyImg =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export function RentalsSection({ rentals }: { rentals: IRentalRequest[] }) {
  return (
    <Card id="requests" className="mt-6">
      <CardHeader>
        <CardTitle>Rentals</CardTitle>
        <CardDescription>All rental requests across the platform.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {rentals.map((rental) => (
          <div key={rental.id} className="flex items-center justify-between gap-3 rounded-lg border p-4">
            <div className="flex min-w-0 items-center gap-3">
              {rental.property.image ? (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                  <Image
                    src={rental.property.image ?? propertyImg}
                    alt={rental.property.title}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                  {rental.property.title?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-semibold">Owner : {rental.property?.title}</p>
                <p className="text-sm text-muted-foreground">Requested By : {rental.tenant?.name}</p>
              </div>
            </div>
            <RequestStatusBadge status={rental.status} />
          </div>
        ))}
        {rentals.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No rentals found.</p>}
      </CardContent>
    </Card>
  )
}