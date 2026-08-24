'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { IUser } from '@/lib/types'

const BASE = `${process.env.BACKEND_API_URL}/api/admin`


export type AdminUserRecord = NonNullable<IUser['data']>['result']

async function authHeaders() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  return { cookie: `accessToken=${accessToken}`, 'Content-Type': 'application/json' }
}

export async function getAllUsers() {
  const res = await fetch(`${BASE}/users`, { headers: await authHeaders(), cache: 'no-store' })
  return res.json()
}

export async function updateUserStatus(id: string, status: 'ACTIVE' | 'BANNED') {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'PATCH',
    headers: await authHeaders(),
    body: JSON.stringify({ status }),
  })
  const data = await res.json()
  if (data.success) revalidatePath('/dashboard/admin')
  return data
}

export async function getAllProperties() {
  const res = await fetch(`${BASE}/properties`, { headers: await authHeaders(), cache: 'no-store' })
  return res.json()
}

export async function getAllRentals() {
  const res = await fetch(`${BASE}/rentals`, { headers: await authHeaders(), cache: 'no-store' })
  return res.json()
}