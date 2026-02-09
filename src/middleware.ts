import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const bypass = process.env.BYPASS_STRIPE === "true" || process.env.NEXT_PUBLIC_BYPASS_STRIPE === "true";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // Protected routes — require authentication + paid order
  if (pathname.startsWith("/pruvodce") || pathname.startsWith("/odznak")) {
    if (!token && !bypass) {
      return NextResponse.redirect(new URL("/prihlaseni", request.url));
    }
    if (token && !token.hasPaid && token.role !== "ADMIN" && !bypass) {
      return NextResponse.redirect(new URL("/objednavka", request.url));
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
