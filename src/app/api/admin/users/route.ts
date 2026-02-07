import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        gender: true,
        goal: true,
        createdAt: true,
        orders: {
          where: { status: "PAID" },
          select: { plan: true },
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json(
      users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        gender: u.gender,
        goal: u.goal,
        plan: u.orders[0]?.plan ?? null,
        createdAt: u.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Admin users error:", error);
    return NextResponse.json(
      { error: "Chyba při načítání uživatelů" },
      { status: 500 }
    );
  }
}
