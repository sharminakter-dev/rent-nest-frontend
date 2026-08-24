import { AdminUserRecord, getAllProperties, getAllRentals, getAllUsers } from '../_actions/adminActions'
import { AdminDashboard } from '../_components/admin/AdminDashboard'


import { IProperty, IRentalRequest } from '@/lib/types'

export default async function AdminDashboardPage() {
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getAllUsers(),
    getAllProperties(),
    getAllRentals(),
  ])

  const users: AdminUserRecord[] = usersRes?.data ?? []
  const properties: IProperty[] = propertiesRes?.data ?? []
  const rentals: IRentalRequest[] = rentalsRes?.data ?? []

  return <AdminDashboard users={users} properties={properties} rentals={rentals} />
}