import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification, sendRecoveryEmail } from "@/lib/email";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.order.updateMany({
        where: { stripeSessionId: session.id },
        data: {
          status: "PAID",
          stripePaymentId: session.payment_intent as string,
        },
      });

      // Send admin + customer notification emails (with 5s timeout)
      const order = await prisma.order.findFirst({
        where: { stripeSessionId: session.id },
        include: { user: true },
      });
      if (order) {
        try {
          await Promise.race([
            sendOrderNotification({
              customerName: order.user?.name || session.customer_details?.name || session.metadata?.name || "Neznámý",
              customerEmail: order.user?.email || order.email || session.customer_details?.email || "",
              plan: order.plan === "PREMIUM" ? "Průvodce + Odznak" : "Základní průvodce",
              amount: order.amount / 100,
              orderId: order.id,
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Email timeout")), 5000)),
          ]);
        } catch (emailError) {
          console.error("Failed to send order notification email:", emailError);
        }
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.order.updateMany({
        where: { stripeSessionId: session.id },
        data: { status: "FAILED" },
      });

      // Send abandoned checkout email to customer
      try {
        const order = await prisma.order.findFirst({
          where: { stripeSessionId: session.id },
          include: { user: true },
        });

        if (order && !order.recoveryEmailSent) {
          const email = order.user?.email || order.email;
          if (email) {
            const plan = order.plan === "PREMIUM" ? "Průvodce + Odznak" : "Základní průvodce";
            await sendRecoveryEmail({
              customerName: order.user?.name || "",
              customerEmail: email,
              plan,
              checkoutUrl: "https://the-pulse.cz/objednavka",
            });

            await prisma.order.update({
              where: { id: order.id },
              data: { recoveryEmailSent: true },
            });
          }
        }
      } catch (emailError) {
        console.error("Failed to send abandoned checkout email:", emailError);
      }

      break;
    }
  }

  return NextResponse.json({ received: true });
}
