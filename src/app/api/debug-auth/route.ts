import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Check what cookies exist
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map((c) => c.name);

  // Try auth()
  let authResult: unknown = null;
  let authError: string | null = null;
  try {
    const session = await auth();
    authResult = session;
  } catch (e) {
    authError = String(e);
  }

  // Try getToken()
  let tokenResult: unknown = null;
  let tokenError: string | null = null;
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });
    tokenResult = token;
  } catch (e) {
    tokenError = String(e);
  }

  return NextResponse.json({
    cookies: allCookies,
    auth: { result: authResult, error: authError },
    getToken: { result: tokenResult, error: tokenError },
    env: {
      hasAuthSecret: !!process.env.AUTH_SECRET,
      nodeEnv: process.env.NODE_ENV,
    },
  });
}
