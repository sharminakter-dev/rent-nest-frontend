'use client'

import { useTransition } from 'react'
import { ShieldBan, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EntityAvatar } from '@/components/entity-avatar'
import { toast } from 'sonner'
import { AdminUserRecord, updateUserStatus } from '../../_actions/adminActions'

export function UsersSection({ users }: { users: AdminUserRecord[] }) {
  const [isPending, startTransition] = useTransition()

  function handleStatus(id: string, status: 'ACTIVE' | 'BANNED', name: string) {
    startTransition(async () => {
      const res = await updateUserStatus(id, status)
      if (res.success) toast.success(`${name} ${status === 'BANNED' ? 'banned' : 'reactivated'}`)
      else toast.error(res.message ?? 'Failed to update user')
    })
  }

  return (
    <Card id="users" className="mt-6 scroll-mt-24">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Ban or reactivate accounts.</CardDescription>
          </div>
          <Badge variant="secondary">{users.length} total</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col divide-y">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <EntityAvatar src={user.profile?.profilePhoto} fallbackSeed={user.name} alt={user.name} />
              <div className="min-w-0">
                <p className="truncate font-semibold">{user.name}</p>
                <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" className="font-normal">{user.role}</Badge>
                  <Badge
                    className={
                      user.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {user.status}
                  </Badge>
                  {user.phone && <span className="text-xs text-muted-foreground">{user.phone}</span>}
                </div>
              </div>
            </div>
            {user.role !== 'ADMIN' && (
              <div className="shrink-0">
                {user.status === 'ACTIVE' ? (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => handleStatus(user.id, 'BANNED', user.name)}
                    className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                  >
                    <ShieldBan data-icon="inline-start" />Ban
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleStatus(user.id, 'ACTIVE', user.name)}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    <ShieldCheck data-icon="inline-start" />Reactivate
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
        {users.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No users found.</p>}
      </CardContent>
    </Card>
  )
}