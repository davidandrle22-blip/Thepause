import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let priceBasic = "199";
  let pricePremium = "298";

  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["price_basic", "price_premium"] } },
    });
    for (const s of settings) {
      if (s.key === "price_basic") priceBasic = s.value;
      if (s.key === "price_premium") pricePremium = s.value;
    }
  } catch {
    // Use defaults if DB fails
  }

  return NextResponse.json({
    bypassStripe: process.env.BYPASS_STRIPE === "true" || process.env.NEXT_PUBLIC_BYPASS_STRIPE === "true",
    priceBasic,
    pricePremium,
  });
}
