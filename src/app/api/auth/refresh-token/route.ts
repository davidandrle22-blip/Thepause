import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { encode } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const paidOrder = await prisma.order.findFirst({
      where: { userId: token.id as string, status: "PAID" },
      select: { plan: true },
      orderBy: { createdAt: "desc" },
    });

    const isProduction = process.env.NODE_ENV === "production";
    const cookieName = isProduction
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

    const newToken = await encode({
      token: {
        ...token,
        hasPaid: !!paidOrder,
        paidPlan: paidOrder?.plan ?? null,
      },
      secret: process.env.AUTH_SECRET!,
      salt: cookieName,
    });

    const cookieStore = await cookies();
    cookieStore.set(cookieName, newToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return NextResponse.json({ ok: true, hasPaid: !!paidOrder });
  } catch {
    return NextResponse.json({ error: "Chyba" }, { status: 500 });
  }
}
