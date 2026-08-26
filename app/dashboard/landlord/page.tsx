import { IRentalRequest } from '@/lib/types'
import { getMyRequests } from '../_actions/landlordActions'
import { RequestActionRow } from '../_components/landlord/RequestActionRow'
import { getMe } from '@/service/getMe'


export default async function LandlordRequestsPage() {
  const res = await getMyRequests()
  const requests: IRentalRequest[] = res?.data ?? []

  const user = await getMe();
  const userName =  user.data.result.name;

  return (
    <div className="flex flex-col gap-6 mt-8">
      <div>
        <p className="text-sm font-medium text-primary">Landlord dashboard</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Welcome back{userName ? `, ${userName}` : ''}
        </h1>
        <p className="mt-2 text-muted-foreground">Keep track of your rental journey in one place.</p>
      </div>
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