"use server"

import { cookies } from "next/headers"

export const getMe = async()=>{
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;


    if(!accessToken){
        return {
            success: false,
            message: "User Not Logged In."
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers: {
            // Authorization: accessToken as unknown as string,
            // Authorization: `${accessToken}`,
            // Authorization: `Bearer ${accessToken}`,
            cookie: `accessToken=${accessToken}`
        },

        cache: "force-cache",
        next:{
            revalidate: 60 * 60 *24 , // 1 day
            tags: ["my-profile"]
        }

    });

    const result = res.json();

    return result;
}