import { NextResponse } from "next/server";
import { getToken } from "@/lib/get-token";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken(request);
    if (!token?.sub) {
      return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
    }

    const entries = await prisma.diaryEntry.findMany({
      where: { userId: token.sub },
      orderBy: { day: "asc" },
    });

    const map: Record<number, { content: string; mood: number | null }> = {};
    entries.forEach((e) => {
      map[e.day] = { content: e.content, mood: e.mood };
    });

    return NextResponse.json(map);
  } catch (error) {
    console.error("Diary GET error:", error);
    return NextResponse.json(
      { error: "Chyba při načítání deníku" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken(request);
    if (!token?.sub) {
      return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
    }

    const body = await request.json();
    const { day, content, mood } = body;

    if (!day || day < 1 || day > 5) {
      return NextResponse.json({ error: "Neplatný den" }, { status: 400 });
    }

    const entry = await prisma.diaryEntry.upsert({
      where: {
        userId_day: { userId: token.sub, day: Number(day) },
      },
      create: {
        userId: token.sub,
        day: Number(day),
        content: content ?? "",
        mood: mood ? Number(mood) : null,
      },
      update: {
        content: content ?? "",
        mood: mood ? Number(mood) : null,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Diary POST error:", error);
    return NextResponse.json(
      { error: "Chyba při ukládání záznamu" },
      { status: 500 }
    );
  }
}
