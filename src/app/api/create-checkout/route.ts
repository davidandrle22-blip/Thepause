import { NextResponse } from "next/server";
import { getStripe, PLANS, getPlanPrice } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, plan, name, gender, goal } = body;

    if (!email) {
      return NextResponse.json({ error: "Email je povinný" }, { status: 400 });
    }

    const planKey = plan?.toUpperCase() === "PREMIUM" ? "PREMIUM" : "BASIC";
    const planData = PLANS[planKey];
    const price = await getPlanPrice(planKey, prisma);

    const stripe = getStripe();
    const baseUrl = new URL(request.url).origin;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "czk",
            product_data: {
              name: planData.name,
              description: planData.description,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      locale: "cs",
      allow_promotion_codes: true,
      metadata: {
        email,
        plan: planKey,
        name: name || "",
        gender: gender || "",
        goal: goal || "",
      },
      success_url: `${baseUrl}/platba/uspech?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/platba/zruseno`,
    });

    // Create PENDING order (no userId yet — user registers after payment)
    await prisma.order.create({
      data: {
        email,
        plan: planKey,
        amount: price,
        stripeSessionId: checkoutSession.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Create checkout error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se vytvořit platební session" },
      { status: 500 }
    );
  }
}
