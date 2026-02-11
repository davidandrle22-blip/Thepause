import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRecoveryEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const abandonedOrders = await prisma.order.findMany({
    where: {
      status: { not: "PAID" },
      recoveryEmailSent: false,
      createdAt: { gt: oneDayAgo, lt: oneHourAgo },
    },
    include: { user: true },
  });

  let sent = 0;

  for (const order of abandonedOrders) {
    const email = order.user?.email || order.email;
    if (!email) continue;

    // Skip admin users
    if (order.user?.role === "ADMIN") {
      await prisma.order.update({
        where: { id: order.id },
        data: { recoveryEmailSent: true },
      });
      continue;
    }

    try {
      const plan = order.plan === "PREMIUM" ? "Průvodce + Odznak" : "Základní průvodce";
      await sendRecoveryEmail({
        customerName: order.user?.name || "",
        customerEmail: email,
        plan,
        checkoutUrl: `https://the-pulse.cz/objednavka`,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { recoveryEmailSent: true },
      });

      sent++;
    } catch (error) {
      console.error(`Failed to send recovery email for order ${order.id}:`, error);
    }
  }

  // Mark very old orders as sent to prevent future spam
  await prisma.order.updateMany({
    where: {
      status: { not: "PAID" },
      recoveryEmailSent: false,
      createdAt: { lt: oneDayAgo },
    },
    data: { recoveryEmailSent: true },
  });

  return NextResponse.json({ sent, total: abandonedOrders.length });
}
