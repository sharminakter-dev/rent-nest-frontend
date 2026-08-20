import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"

const verifyToken = (token: string, secret: string )=>{
    try{
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err: any){
        console.log("token verification failed", err);
        return {
            success: false,
            error: err.message
        }
    }
}

export const jwtUtils = {
    verifyToken
}