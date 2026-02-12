import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail, sendAdminNewUserNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, gender, goal } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email a heslo jsou povinné" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Heslo musí mít alespoň 6 znaků" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Uživatel s tímto emailem již existuje" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        ...(gender && { gender }),
        ...(goal && { goal }),
      },
    });

    // Fire-and-forget: welcome email + admin notification
    Promise.all([
      sendWelcomeEmail({ name: user.name || "", email: user.email! }),
      sendAdminNewUserNotification({ name: user.name || "", email: user.email! }),
    ]).catch((err) => console.error("Registration email error:", err));

    return NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Došlo k chybě při registraci" },
      { status: 500 }
    );
  }
}
