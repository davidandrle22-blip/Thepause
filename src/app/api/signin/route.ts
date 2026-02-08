import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { encode } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email a heslo jsou povinné" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { ok: false, error: "Nesprávný email nebo heslo" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password as string, user.password);
    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Nesprávný email nebo heslo" },
        { status: 401 }
      );
    }

    // Create JWT token compatible with NextAuth v5
    const token = await encode({
      token: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        gender: user.gender,
        goal: user.goal,
        sub: user.id,
      },
      secret: process.env.AUTH_SECRET!,
      salt: "authjs.session-token",
    });

    const response = NextResponse.json({ ok: true });

    const isProduction = process.env.NODE_ENV === "production";
    const cookieName = isProduction
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Chyba při přihlášení" },
      { status: 500 }
    );
  }
}
