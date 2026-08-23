import { IPayment, IRentalRequest } from "@/lib/types"
import { DashboardHeader } from "./DashboardHeader"
import { PaymentsSection } from "./PaymentsSection"
import { RequestsSection } from "./RequestsSection"
import { StatsSection } from "./StatsSection"

export function TenantDashboard({
  requests,
  payments,
  userName,
}: {
  requests: IRentalRequest[]
  payments: IPayment[]
  userName?: string
}) {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader userName={userName} />
      <StatsSection requests={requests} />
      <RequestsSection requests={requests} />
      <PaymentsSection payments={payments} requests={requests} />
    </div>
  )
}