import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

export const PLANS = {
  BASIC: {
    name: "Základní průvodce",
    price: 19900, // haléře = 199 Kč (default, overridden by DB)
    description: "Kompletní interaktivní průvodce 5denním vodním půstem",
  },
  PREMIUM: {
    name: "Průvodce + Odznak",
    price: 29800, // haléře = 298 Kč (default, overridden by DB)
    description:
      "Průvodce + personalizovaný odznak a vyhodnocení po dokončení",
  },
} as const;

/**
 * Get plan price from DB settings (in haléře). Falls back to PLANS defaults.
 */
export async function getPlanPrice(
  planKey: "BASIC" | "PREMIUM",
  prisma: { setting: { findUnique: (args: any) => Promise<{ value: string } | null> } }
): Promise<number> {
  const dbKey = planKey === "BASIC" ? "price_basic" : "price_premium";
  try {
    const setting = await prisma.setting.findUnique({ where: { key: dbKey } });
    if (setting?.value) {
      return Math.round(Number(setting.value) * 100); // Kč → haléře
    }
  } catch {
    // fallback to default
  }
  return PLANS[planKey].price;
}
