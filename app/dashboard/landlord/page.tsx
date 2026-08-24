import { getMyProperties, getMyRequests } from '../_actions/landlordActions'
import { LandlordDashboard } from '../_components/landlord/LandlordDashboard'
import { IProperty, IRentalRequest } from '@/lib/types'

export default async function LandlordDashboardPage() {
  const [propertiesRes, requestsRes] = await Promise.all([
    getMyProperties(),
    getMyRequests(),
  ])

  const properties: IProperty[] = propertiesRes?.data ?? []
  const requests: IRentalRequest[] = requestsRes?.data ?? []

  return <LandlordDashboard properties={properties} requests={requests} />
}