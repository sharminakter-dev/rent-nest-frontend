// app/dashboard/admin/page.tsx
import { getMe } from '@/service/getMe'
import { getAllUsers, getAllProperties, getAllRentals } from '../_actions/adminActions'
import { AdminDashboard } from '../_components/admin/AdminDashboard'


export default async function AdminDashboardPage() {
  const [usersRes, propertiesRes, rentalsRes, userRes] = await Promise.all([
    getAllUsers(),
    getAllProperties(),
    getAllRentals(),
    getMe(),
  ])

  return (
    <AdminDashboard
      users={usersRes?.data ?? []}
      properties={propertiesRes?.data ?? []}
      rentals={rentalsRes?.data ?? []}
      userName={userRes?.data?.result?.name}
    />
  )
}