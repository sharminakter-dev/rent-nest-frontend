import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/properties"];

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken
        ? (jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload)
        : null;
    const decodedRefreshToken = refreshToken
        ? (jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload)
        : null;

    // Build the response up front so cookie mutations actually persist
    const response = NextResponse.next();

    if (!decodedAccessToken?.success && decodedRefreshToken) {
        // access token expired but refresh token is valid
        const result = await getNewAccessToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            response.cookies.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(
                newAccessToken,
                process.env.JWT_ACCESS_SECRET as string
            ) as JwtPayload;
        }
    }

    let userRole: string | null = null;

    if (!decodedAccessToken?.success) {
        // token expired/invalid and couldn't be refreshed — clear it
        response.cookies.delete("accessToken");
        accessToken = undefined;
    }

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    // Already logged in, trying to hit /login or /register — bounce to their dashboard
    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        if (userRole === 'TENANT') {
            return NextResponse.redirect(new URL('/tenant-dashboard', request.url));
        } else if (userRole === 'LANDLORD') {
            return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
        } else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));

    // Not logged in and hitting a protected page — send to login
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectTo", pathName);
        return NextResponse.redirect(loginUrl);
    }

    // Role-based page protection (matches your actual roles: TENANT / LANDLORD / ADMIN)
    if (pathName.startsWith("/tenant-dashboard") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    } else if (pathName.startsWith("/landlord-dashboard") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    } else if (pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }

    return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
  ],
}