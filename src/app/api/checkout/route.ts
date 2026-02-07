import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe, PLANS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/prihlaseni", request.url));
  }

  const { searchParams } = new URL(request.url);
  const planKey = searchParams.get("plan")?.toUpperCase() === "PREMIUM" ? "PREMIUM" : "BASIC";
  const plan = PLANS[planKey];

  // Check if user already has a paid order for this plan
  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: session.user.id,
      plan: planKey,
      status: "PAID",
    },
  });

  if (existingOrder) {
    return NextResponse.redirect(new URL("/pruvodce", request.url));
  }

  // Test mode — skip Stripe, mark order as paid immediately
  if (process.env.BYPASS_STRIPE === "true") {
    await prisma.order.create({
      data: {
        userId: session.user.id,
        plan: planKey,
        amount: plan.price,
        stripeSessionId: `test_${Date.now()}`,
        status: "PAID",
      },
    });

    return NextResponse.redirect(
      new URL("/platba/uspech", request.url)
    );
  }

  const stripe = getStripe();
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "czk",
          product_data: {
            name: plan.name,
            description: plan.description,
          },
          unit_amount: plan.price,
        },
        quantity: 1,
      },
    ],
    customer_email: session.user.email!,
    metadata: {
      userId: session.user.id,
      plan: planKey,
    },
    success_url: `${new URL("/platba/uspech", request.url).toString()}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: new URL("/platba/zruseno", request.url).toString(),
  });

  // Create pending order
  await prisma.order.create({
    data: {
      userId: session.user.id,
      plan: planKey,
      amount: plan.price,
      stripeSessionId: checkoutSession.id,
    },
  });

  return NextResponse.redirect(checkoutSession.url!);
}
