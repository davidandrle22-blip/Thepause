import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STARTING_NUMBER = 2847; // Base number for social proof

export async function GET() {
  try {
    const count = await prisma.order.count({
      where: { status: "PAID" },
    });

    return NextResponse.json({ count: STARTING_NUMBER + count });
  } catch {
    return NextResponse.json({ count: STARTING_NUMBER });
  }
}
