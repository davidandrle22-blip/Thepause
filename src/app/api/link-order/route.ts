import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

/**
 * Links orphaned orders (no userId) to the currently authenticated user.
 * Called after registration/sign-in on the success page.
 */
export async function POST(request: Request) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
    });

    if (!token?.id || !token?.email) {
      return NextResponse.json(
        { error: "Nepřihlášen" },
        { status: 401 }
      );
    }

    const userId = token.id as string;
    const email = token.email as string;

    // Find orders by email that don't have a userId yet
    const result = await prisma.order.updateMany({
      where: {
        email,
        userId: null,
        status: "PAID",
      },
      data: {
        userId,
      },
    });

    // Also update user gender/goal from order metadata if not set
    if (result.count > 0) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { gender: true, goal: true },
      });

      // Try to get metadata from the latest linked order's Stripe session
      if (!user?.gender || !user?.goal) {
        const latestOrder = await prisma.order.findFirst({
          where: { userId, status: "PAID" },
          orderBy: { createdAt: "desc" },
        });

        if (latestOrder?.stripeSessionId) {
          try {
            const { getStripe } = await import("@/lib/stripe");
            const stripe = getStripe();
            const session = await stripe.checkout.sessions.retrieve(
              latestOrder.stripeSessionId
            );
            const meta = session.metadata;
            if (meta) {
              const updateData: Record<string, string> = {};
              if (!user?.gender && meta.gender) updateData.gender = meta.gender;
              if (!user?.goal && meta.goal) updateData.goal = meta.goal;
              if (Object.keys(updateData).length > 0) {
                await prisma.user.update({
                  where: { id: userId },
                  data: updateData,
                });
              }
            }
          } catch {
            // Non-critical, ignore
          }
        }
      }
    }

    return NextResponse.json({ linked: result.count });
  } catch (error) {
    console.error("Link order error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se propojit objednávku" },
      { status: 500 }
    );
  }
}
