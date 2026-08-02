"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken"

type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    } | null;

  errors: {
    email?: string;
    password?: string;
    submit?: string;
  };
}
// redirectTo: string, 
export const loginAction = async(prevState: LoginState, formData: FormData)=>{

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email'
    }

    if (!password) {
      errors.password = 'Password is required'
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            statusCode: 400,
            message: "Validation failed",
            data: null,
            errors,
        };
    }


    const payload = {
        email, 
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
  
    if(result.success){
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        // if(redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")){
        //     redirect(redirectTo);
        // }

        if(decodedToken.role === "TENANT"){
            redirect("/tenant-dashboard", "replace");
        }else if(decodedToken.role === "LANDLORD"){
            redirect("/landload-dashboard", "replace");
        }else if(decodedToken.role === "ADMIN"){
            redirect("/admin-dashboard", "replace");
        }

    }

    return result;

}