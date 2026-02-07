import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const discounts = await prisma.discountCode.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { orders: true } } },
    });

    return NextResponse.json(
      discounts.map((d) => ({
        id: d.id,
        code: d.code,
        discountType: d.discountType,
        discountValue: d.discountValue,
        maxUses: d.maxUses,
        currentUses: d._count.orders,
        isActive: d.isActive,
        validUntil: d.validUntil?.toISOString() ?? null,
        createdAt: d.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Admin discounts error:", error);
    return NextResponse.json(
      { error: "Chyba při načítání slevových kódů" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, discountType, discountValue, maxUses } = body;

    if (!code || !discountType || !discountValue) {
      return NextResponse.json(
        { error: "Vyplňte všechna povinná pole" },
        { status: 400 }
      );
    }

    const discount = await prisma.discountCode.create({
      data: {
        code: code.toUpperCase(),
        discountType,
        discountValue: Number(discountValue),
        maxUses: maxUses ? Number(maxUses) : null,
      },
    });

    return NextResponse.json(discount, { status: 201 });
  } catch (error) {
    console.error("Admin discount create error:", error);
    return NextResponse.json(
      { error: "Chyba při vytváření slevového kódu" },
      { status: 500 }
    );
  }
}
