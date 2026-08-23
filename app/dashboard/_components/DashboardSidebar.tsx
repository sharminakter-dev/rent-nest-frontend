'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  BarChart3,
  Building2,
  ClipboardList,
  Home,
  HousePlus,
  LayoutDashboard,
  Menu,
  Users,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { logout } from '@/service/logOut'
import { toast } from 'sonner'

export type UserRole = 'TENANT' | 'LANDLORD' | 'ADMIN'

const navigation: Record<UserRole, { label: string; href: string; icon: typeof Home }[]> = {
  TENANT: [
    { label: 'Overview', href: '/dashboard/tenant', icon: LayoutDashboard },
    { label: 'Browse properties', href: '/properties', icon: Home },
    { label: 'My requests', href: '/dashboard/tenant#requests', icon: ClipboardList },
    { label: 'My payments', href: '/dashboard/tenant#payments', icon: Wallet },
  ],
  LANDLORD: [
    { label: 'Overview', href: '/dashboard/landlord', icon: LayoutDashboard },
    { label: 'Add new property', href: '/dashboard/landlord/properties/new', icon: HousePlus },
    { label: 'Rental requests', href: '/dashboard/landlord/requests', icon: ClipboardList },
    { label: 'Earnings', href: '/dashboard/landlord#earnings', icon: BarChart3 },
  ],
  ADMIN: [
    { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Users', href: '/dashboard/admin#users', icon: Users },
    { label: 'Listings', href: '/dashboard/admin#listings', icon: Building2 },
    { label: 'Requests', href: '/dashboard/admin#requests', icon: ClipboardList },
  ],
}

const roleLabels: Record<UserRole, string> = {
  TENANT: 'Tenant workspace',
  LANDLORD: 'Landlord workspace',
  ADMIN: 'Admin console',
}

function isActive(pathname: string, currentHash: string, href: string) {
  const [hrefPath, hrefHash] = href.split('#')
  if (pathname !== hrefPath) return false
  if (!hrefHash) return currentHash === ''
  return currentHash === `#${hrefHash}`
}

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()
  const router = useRouter()
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''))
  const [mobileOpen, setMobileOpen] = useState(false)

 useEffect(() => {
  const onHashChange = () => setHash(window.location.hash)
  window.addEventListener('hashchange', onHashChange)
  window.addEventListener('popstate', onHashChange)
  return () => {
    window.removeEventListener('hashchange', onHashChange)
    window.removeEventListener('popstate', onHashChange)
  }
}, [])

  const handleNavClick = (href: string) => {
    const [, hrefHash] = href.split('#')
    setHash(hrefHash ? `#${hrefHash}` : '')
    setMobileOpen(false)
  }


  const content = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/" className="flex items-center gap-2 px-2" onClick={() => setMobileOpen(false)}>
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
          RN
        </span>
        <span className="font-semibold tracking-tight">RentNest</span>
      </Link>

      <div className="rounded-xl bg-muted/60 p-3">
        <p className="text-xs text-muted-foreground">Signed in as</p>
        <p className="mt-1 font-medium">{roleLabels[role]}</p>
      </div>

      <nav aria-label={`${role} navigation`} className="flex flex-col gap-1">
        {navigation[role].map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, hash, href)
          return (
            <Link
              key={label}
              href={href}
              onClick={() => handleNavClick(href)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop: fixed sidebar, always in the DOM at md+ */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background md:block">
        {content}
      </aside>

      {/* Mobile: top bar with menu trigger + slide-out Sheet, hidden at md+ */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <div className="flex h-14 items-center border-b bg-background px-4 md:hidden">
          <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
          {content}
        </SheetContent>
      </Sheet>
    </>
  )
}

export { roleLabels }