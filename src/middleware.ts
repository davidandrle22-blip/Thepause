import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthenticated(request: NextRequest): boolean {
  // NextAuth v5 uses __Secure- prefix on HTTPS, no prefix on HTTP
  const secureCookie = request.cookies.get("__Secure-authjs.session-token");
  const devCookie = request.cookies.get("authjs.session-token");
  return !!(secureCookie?.value || devCookie?.value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = isAuthenticated(request);
  const bypass = process.env.BYPASS_STRIPE === "true" || process.env.NEXT_PUBLIC_BYPASS_STRIPE === "true";

  // Protected routes — require authentication (skip in test mode)
  if (pathname.startsWith("/pruvodce") || pathname.startsWith("/odznak")) {
    if (!hasSession && !bypass) {
      return NextResponse.redirect(new URL("/prihlaseni", request.url));
    }
  }

  // Admin routes — require ADMIN role (check via token claim later, for now just require auth)
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pruvodce/:path*", "/odznak/:path*", "/admin/:path*"],
};
