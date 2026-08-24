"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { SubmitReviewState } from "@/lib/types"

export async function submitReview(
  rentalId: string,
  prevState: SubmitReviewState,
  formData: FormData
): Promise<SubmitReviewState> {
  const rating = Number(formData.get("rating"))
  const comment = String(formData.get("comment") || "").trim()

  const errors: Record<string, string> = {}

  if (!rating || rating < 1 || rating > 5) {
    errors.rating = "Please select a rating between 1 and 5"
  }

  if (!comment) {
    errors.comment = "Please write a short comment"
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      statusCode: 400,
      message: "Validation failed",
      data: null,
      errors,
    }
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rentalId, rating, comment }),
  })

  const result = await res.json()

  if (result.success) {
    revalidatePath("/dashboard/tenant")
  }

  return result
}