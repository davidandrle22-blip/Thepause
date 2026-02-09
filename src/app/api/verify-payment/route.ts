import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Chybí session_id" },
      { status: 400 }
    );
  }

  try {
    // Check our DB first
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
    });

    if (order && order.status === "PAID") {
      return NextResponse.json({
        paid: true,
        email: order.email,
        plan: order.plan,
        name: order.email, // metadata not stored in DB, fallback
      });
    }

    // If not yet PAID in DB, check Stripe directly (webhook may be delayed)
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Update order to PAID if webhook hasn't fired yet
      if (order && order.status !== "PAID") {
        await prisma.order.update({
          where: { stripeSessionId: sessionId },
          data: {
            status: "PAID",
            stripePaymentId: session.payment_intent as string,
          },
        });
      }

      return NextResponse.json({
        paid: true,
        email: session.customer_email || session.metadata?.email || "",
        plan: session.metadata?.plan || "BASIC",
        name: session.metadata?.name || "",
      });
    }

    return NextResponse.json({ paid: false });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se ověřit platbu" },
      { status: 500 }
    );
  }
}
