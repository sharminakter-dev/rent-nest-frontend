import { getMe } from '@/service/getMe'
import { DashboardSidebar } from './_components/DashboardSidebar'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardSidebar role={user.data.result.role} />
      <main  className="md:pl-64 md:ml-6">
        {children}
    </main>
    </div>
  )
}

export default DashboardLayout