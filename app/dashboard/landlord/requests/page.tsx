
import { IRentalRequest } from '@/lib/types'
import { getMyRequests } from '../../_actions/landlordActions'
import { RequestsPageContent } from '../../_components/landlord/RequestsPageContent'

export default async function LandlordRequestsPage() {
  const res = await getMyRequests()
  const requests: IRentalRequest[] = res?.data ?? []
  return <RequestsPageContent requests={requests} />
}