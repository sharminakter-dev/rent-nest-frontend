// app/dashboard/tenant/page.tsx
import { getMe } from '@/service/getMe'
import { getMyPayments, getMyRentals } from '../_actions/tenantActions'
import { TenantDashboard } from '../_components/tenant/TenantDashboard'
import { IRentalRequest } from '@/lib/types'

export default async function TenantDashboardPage() {
  const [rentalsRes, paymentsRes, userRes] = await Promise.all([
    getMyRentals(),
    getMyPayments(),
    getMe(),
  ])

  const requests: IRentalRequest[] = rentalsRes?.data ?? []
  const payments = paymentsRes?.data ?? []
  const userName: string | undefined = userRes?.data?.result?.name

  return <TenantDashboard requests={requests} payments={payments} userName={userName} />
}