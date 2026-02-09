export const CONVERSION_CONFIG = {
  socialProof: {
    baseCount: 2847,
    rating: 4.9,
    totalReviews: 847,
  },
  urgency: {
    originalPriceBasic: 399,
    currentPriceBasic: 199,
    originalPricePremium: 599,
    currentPricePremium: 298,
  },
  fomo: {
    intervalMin: 25000,
    intervalMax: 45000,
    displayDuration: 4000,
  },
  savings: {
    defaultDailyFood: 250,
    fastingDays: 5,
  },
  valueBreakdown: [
    { item: "Kompletní 5denní průvodce", value: 500 },
    { item: "Interaktivní denní checklist", value: 200 },
    { item: "Barometr pocitů a tracking", value: 150 },
    { item: "Bezpečnostní protokol a varovné signály", value: 300 },
    { item: "Tipy od zkušených postících", value: 200 },
    { item: "Ekonomická kalkulačka úspor", value: 100 },
  ],
  trustBadges: [
    { icon: "🔒", text: "Bezpečná platba přes Stripe" },
    { icon: "✅", text: "Ověřeno 2 847+ zákazníky" },
    { icon: "💯", text: "14denní garance vrácení peněz" },
    { icon: "🇨🇿", text: "Český produkt" },
    { icon: "📱", text: "Okamžitý přístup po zaplacení" },
  ],
  seasonalMessages: {
    "01": "Začněte nový rok očistou těla — ideální čas pro vodní půst!",
    "02": "Začněte nový rok očistou těla — ideální čas pro vodní půst!",
    "03": "Připravte tělo na léto — jarní detox vodním půstem",
    "04": "Připravte tělo na léto — jarní detox vodním půstem",
    "05": "Letní restart — očistěte tělo před dovolenou",
    "06": "Letní restart — očistěte tělo před dovolenou",
    "07": "Lehkost a energie na léto — zkuste vodní půst",
    "08": "Lehkost a energie na léto — zkuste vodní půst",
    "09": "Podzimní reset — nabijte se energií před zimou",
    "10": "Podzimní reset — nabijte se energií před zimou",
    "11": "Očistěte tělo před svátky — poslední šance tento rok!",
    "12": "Očistěte tělo před svátky — poslední šance tento rok!",
  } as Record<string, string>,
};

export function getSeasonalMessage(): string {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  return CONVERSION_CONFIG.seasonalMessages[month] || "";
}
