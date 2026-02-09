import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [totalUsers, totalOrders, paidOrders, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.order.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
    ]);

    const totalRevenue = (revenue._sum.amount ?? 0) / 100; // haléře → Kč
    const conversionRate =
      totalUsers > 0 ? Math.round((paidOrders / totalUsers) * 100) : 0;

    // Recent orders (last 10)
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true, name: true } },
        discountCode: { select: { code: true } },
      },
    });

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalOrders,
        totalUsers,
        conversionRate,
      },
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        email: o.user?.email ?? o.email ?? "",
        name: o.user?.name ?? "",
        plan: o.plan,
        amount: o.amount / 100,
        status: o.status,
        discountCode: o.discountCode?.code ?? null,
        createdAt: o.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Chyba při načítání dat" },
      { status: 500 }
    );
  }
}
