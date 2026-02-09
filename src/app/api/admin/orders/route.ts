import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // PAID, PENDING, FAILED, REFUNDED

    const where = status ? { status: status as "PAID" | "PENDING" | "FAILED" | "REFUNDED" } : {};

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true, name: true } },
        discountCode: { select: { code: true } },
      },
    });

    return NextResponse.json(
      orders.map((o) => ({
        id: o.id,
        email: o.user?.email ?? o.email ?? "",
        name: o.user?.name ?? "",
        plan: o.plan,
        amount: o.amount / 100,
        status: o.status,
        discountCode: o.discountCode?.code ?? null,
        createdAt: o.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Admin orders error:", error);
    return NextResponse.json(
      { error: "Chyba při načítání objednávek" },
      { status: 500 }
    );
  }
}
