import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // Protected routes — require authentication (skip in test mode)
  if (pathname.startsWith("/pruvodce") || pathname.startsWith("/odznak")) {
    const bypass = process.env.BYPASS_STRIPE === "true" || process.env.NEXT_PUBLIC_BYPASS_STRIPE === "true";
    if (!token && !bypass) {
      return NextResponse.redirect(new URL("/prihlaseni", request.url));
    }
  }

  // Admin routes — require ADMIN role
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pruvodce/:path*", "/odznak/:path*", "/admin/:path*"],
};
