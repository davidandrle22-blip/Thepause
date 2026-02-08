import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getToken } from "next-auth/jwt";
import { getStripe, PLANS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Get user ID from session — tries auth() first, then getToken() as fallback.
 * This ensures compatibility with both NextAuth-created sessions and our
 * custom /api/signin JWT.
 */
async function getUserFromRequest(request: Request) {
  // Try auth() first (works for NextAuth native sessions like Google OAuth)
  try {
    const session = await auth();
    if (session?.user?.id) {
      return { id: session.user.id, email: session.user.email };
    }
  } catch {
    // auth() failed, try fallback
  }

  // Fallback: decode JWT directly (works for our custom /api/signin tokens)
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
    });
    if (token?.id) {
      return { id: token.id as string, email: token.email as string };
    }
    if (token?.sub) {
      return { id: token.sub, email: token.email as string };
    }
  } catch {
    // getToken() also failed
  }

  return null;
}

export async function GET(request: Request) {
  const user = await getUserFromRequest(request);

  if (!user?.id) {
    return NextResponse.redirect(new URL("/prihlaseni", request.url));
  }

  const { searchParams } = new URL(request.url);
  const planKey = searchParams.get("plan")?.toUpperCase() === "PREMIUM" ? "PREMIUM" : "BASIC";
  const plan = PLANS[planKey];

  // Check if user already has a paid order for this plan
  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
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
        userId: user.id,
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

  try {
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
      customer_email: user.email!,
      metadata: {
        userId: user.id,
        plan: planKey,
      },
      success_url: `${new URL("/platba/uspech", request.url).toString()}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: new URL("/platba/zruseno", request.url).toString(),
    });

    // Create pending order
    await prisma.order.create({
      data: {
        userId: user.id,
        plan: planKey,
        amount: plan.price,
        stripeSessionId: checkoutSession.id,
      },
    });

    return NextResponse.redirect(checkoutSession.url!);
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.redirect(
      new URL("/platba/zruseno?error=stripe", request.url)
    );
  }
}
