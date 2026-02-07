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
    price: 19900, // haléře = 199 Kč
    description: "Kompletní interaktivní průvodce 5denním vodním půstem",
  },
  PREMIUM: {
    name: "Průvodce + Odznak",
    price: 29800, // haléře = 298 Kč
    description:
      "Průvodce + personalizovaný odznak a vyhodnocení po dokončení",
  },
} as const;
