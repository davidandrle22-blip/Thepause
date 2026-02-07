import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });

    return NextResponse.json({
      priceBasic: map["price_basic"] ?? "199",
      pricePremium: map["price_premium"] ?? "298",
      seoTitle:
        map["seo_title"] ??
        "ThePause.cz — Chytrý průvodce 5denním vodním půstem",
      seoDescription:
        map["seo_description"] ??
        "Interaktivní průvodce vodním půstem, který vás provede hodinu po hodině.",
    });
  } catch (error) {
    console.error("Admin settings error:", error);
    return NextResponse.json(
      { error: "Chyba při načítání nastavení" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const entries = Object.entries(body) as [string, string][];

    const keyMap: Record<string, string> = {
      priceBasic: "price_basic",
      pricePremium: "price_premium",
      seoTitle: "seo_title",
      seoDescription: "seo_description",
    };

    await Promise.all(
      entries.map(([key, value]) => {
        const dbKey = keyMap[key];
        if (!dbKey) return Promise.resolve();
        return prisma.setting.upsert({
          where: { key: dbKey },
          create: { key: dbKey, value: String(value) },
          update: { value: String(value) },
        });
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin settings update error:", error);
    return NextResponse.json(
      { error: "Chyba při ukládání nastavení" },
      { status: 500 }
    );
  }
}
