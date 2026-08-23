    // app/dashboard/_actions/paymentActions.ts
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type InitiatePaymentState = { success: false; message: string } | null

export async function initiatePayment(
  rentalRequestId: string,
  prevState: InitiatePaymentState,
  formData: FormData
): Promise<InitiatePaymentState> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
    method: "POST",
    headers: {
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rentalRequestId }),
  })

  const result = await res.json()

  if (!result.success) {
    return { success: false, message: result.message ?? "Failed to initiate payment." }
  }
  
  redirect(result.data)
}