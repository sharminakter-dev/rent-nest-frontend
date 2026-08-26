'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import { ShieldBan, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { AdminUserRecord, updateUserStatus } from '../../_actions/adminActions'

const userProfile =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

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
    <Card id="users" className="mt-6">
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Ban or reactivate accounts.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              {user.profile?.profilePhoto ? (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                  <Image
                    src={user.profile?.profilePhoto ?? userProfile}
                    alt={user.name}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.phone && <p className="text-xs text-muted-foreground">{user.phone}</p>}
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge
                    className={
                      user.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
            {user.role !== 'ADMIN' && (
              user.status === 'ACTIVE' ? (
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
              )
            )}
          </div>
        ))}
        {users.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No users found.</p>}
      </CardContent>
    </Card>
  )
}