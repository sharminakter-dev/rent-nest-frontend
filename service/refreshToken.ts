"use server"

import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers"

export const getNewAccessToken = async()=>{
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;


    if(!refreshToken){
        return {
            success: false,
            message: "Refresh Token Not Found"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            cookie: `refreshToken=${refreshToken}`
        },

        cache: "no-cache"
    });

    const result = await res.json();

    return result;
}

export const isAccessTokenExist = async()=>{

    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if(!accessToken && !refreshToken){

        throw new Error("User Not Logged In.");
        // return {
        //     success: false,
        //     message: "User Not Logged In."
        // }
    }

    const decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET! as string) as JwtPayload : null;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET! as string) as JwtPayload : null;

    
    if(!decodedAccessToken?.success && decodedRefreshToken?.success){
    
        // access Token is expired but refresh token is valid
        const result = await getNewAccessToken();
    
        if(result.success){
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax"
            });

            accessToken = newAccessToken;
            
        }
    }

    return accessToken
}