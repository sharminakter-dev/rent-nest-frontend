// app/dashboard/tenant/_actions/tenantActions.ts
"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function getMyRentals() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: { cookie: `accessToken=${accessToken}` },
    cache: "no-store", 
  })

  return res.json()
}

export async function getMyPayments() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
    headers: { cookie: `accessToken=${accessToken}` },
    cache: "no-store",
  })

  return res.json()
}

export async function cancelRentalRequest(id: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
    method: 'DELETE',
    headers: { cookie: `accessToken=${accessToken}` },
  })

  const data = await res.json()
  if (data.success) revalidatePath('/dashboard/tenant')
  return data
}