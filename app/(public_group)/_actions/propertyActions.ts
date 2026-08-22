"use server"

import { RequestPropertyState } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";


export const getAllProperties = async({
  query,
  }: {
    query?: { [key: string]: string | string[] | undefined };
  }
)=>{

  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });
  }


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    { cache: "no-store" }
  );
  const result = await res.json();

  return result.data;
}

export const getPropertyById = async(propertyId : string)=>{
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${propertyId}`);

  const result = await res.json();

  // console.log(result);
  return result.data;
}

export const getAllCategories = async()=>{
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`,
    { cache: "no-store" }
  );
  const result = await res.json();

  return result.data.map((category: { slug: string }) => category.slug);
  
}

export const requestProperty = async (
    propertyId: string,
    prevState: RequestPropertyState,
    formData: FormData
): Promise<RequestPropertyState> => {

    const startDate = String(formData.get("startDate") || "")
    const durationMonths = Number(formData.get("durationMonths"))
    const message = String(formData.get("message") || "")

    const errors: Record<string, string> = {}

    if (!startDate) {
        errors.startDate = "Move-in date is required"
    }

    if (!durationMonths || durationMonths < 1) {
        errors.durationMonths = "Duration must be at least 1 month"
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

    const payload = {
        propertyId,
        startDate,
        durationMonths,
        message,
    }

    const accessToken = await isAccessTokenExist()

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
        method: "POST",
        headers: {
            cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    const result = await res.json()

    if (result.success) {
        revalidateTag("my-rentals", { expire: 0 }) 
    }

    return result
}