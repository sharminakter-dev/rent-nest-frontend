import { IRentalRequest } from '@/lib/types'
import { getMyRequests } from '../_actions/landlordActions'
import { RequestActionRow } from '../_components/landlord/RequestActionRow'


export default async function LandlordRequestsPage() {
  const res = await getMyRequests()
  const requests: IRentalRequest[] = res?.data ?? []

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Rental requests</h1>
      {requests.length > 0 ? (
        <div className="flex flex-col gap-3">
          {requests.map((request) => (
            <RequestActionRow key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No incoming requests yet.</p>
      )}
    </div>
  )
}