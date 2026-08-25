"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

async function authHeaders() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  return { cookie: `accessToken=${accessToken}`, "Content-Type": "application/json" }
}

export async function getMyProperties() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord`, {
    headers: await authHeaders(),
    cache: "no-store",
  })
  return res.json()
}

export async function createProperty(prevState: any, formData: FormData) {
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    bedrooms: Number(formData.get("bedrooms")),
    bathrooms: Number(formData.get("bathrooms")),
    rent: Number(formData.get("rent")),
    category: {
      name: formData.get("categoryName"),
      slug: formData.get("categorySlug"),
      description: formData.get("categoryDescription"),
    },
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(payload),
  })
  const result = await res.json()
  if (result.success) revalidatePath("/dashboard/landlord/properties")
  return result
}

export async function updateProperty(propertyId: string, prevState: any, formData: FormData) {
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    rent: Number(formData.get("rent")),
    isAvailable: formData.get("isAvailable") === "on",
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify(payload),
  })
  const result = await res.json()
  if (result.success) revalidatePath("/dashboard/landlord/properties")
  return result
}

export async function deleteProperty(propertyId: string) {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`, {
    method: "DELETE",
    headers: await authHeaders(),
  })
  const result = await res.json()
  if (result.success) revalidatePath("/dashboard/landlord/properties")
  return result
}

export async function getMyRequests() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests`, {
    headers: await authHeaders(),
    cache: "no-store",
  })
  return res.json()
}

export async function updateRequestStatus(requestId: string, status: "APPROVED" | "REJECTED") {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify({ status }),
  })
  const result = await res.json()
  if (result.success) revalidatePath("/dashboard/landlord/requests")
  return result
}

export async function getMyReviews() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/reviews`, {
    headers: await authHeaders(),
    cache: "no-store",
  })
  return res.json()
}