'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

const BASE = `${process.env.BACKEND_API_URL}/api/landlord`

async function authHeaders() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  return { cookie: `accessToken=${accessToken}`, 'Content-Type': 'application/json' }
}

export async function getMyProperties() {
  const res = await fetch(`${BASE}/properties`, {
    headers: await authHeaders(),
    cache: 'no-store',
  })
  return res.json()
}

export async function createProperty(payload: {
  title: string
  description: string
  location: string
  bedrooms: number
  bathrooms: number
  rent: number
  image?: string
  category: { name: string; slug: string; description?: string }
}) {
  const res = await fetch(`${BASE}/properties`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (data.success) revalidatePath('/dashboard/landlord')
  return data
}

export async function updateProperty(
  id: string,
  payload: Partial<{
    title: string
    description: string
    location: string
    bedrooms: number
    bathrooms: number
    rent: number
    image: string
    isAvailable: boolean
  }>
) {
  const res = await fetch(`${BASE}/properties/${id}`, {
    method: 'PATCH',
    headers: await authHeaders(),
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (data.success) revalidatePath('/dashboard/landlord')
  return data
}

export async function deleteProperty(id: string) {
  const res = await fetch(`${BASE}/properties/${id}`, {
    method: 'DELETE',
    headers: await authHeaders(),
  })
  const data = await res.json()
  if (data.success) revalidatePath('/dashboard/landlord')
  return data
}

export async function getMyRequests() {
  const res = await fetch(`${BASE}/requests`, {
    headers: await authHeaders(),
    cache: 'no-store',
  })
  return res.json()
}

export async function updateRequestStatus(id: string, status: 'ACTIVE' | 'REJECTED') {
  const res = await fetch(`${BASE}/requests/${id}`, {
    method: 'PATCH',
    headers: await authHeaders(),
    body: JSON.stringify({ status }),
  })
  const data = await res.json()
  if (data.success) revalidatePath('/dashboard/landlord')
  return data
}

export async function getMyReviews() {
  const res = await fetch(`${BASE}/reviews`, {
    headers: await authHeaders(),
    cache: 'no-store',
  })
  return res.json()
}