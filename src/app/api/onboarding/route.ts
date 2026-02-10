import { NextResponse } from "next/server";
import { getToken } from "@/lib/get-token";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = await getToken(request);

  if (!token?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { displayName, gender, goal } = await request.json();

    const data: Record<string, unknown> = {
      onboardingCompleted: true,
    };

    if (displayName) data.name = displayName;
    if (gender && (gender === "MALE" || gender === "FEMALE")) data.gender = gender;
    if (
      goal &&
      (goal === "WEIGHT_LOSS" || goal === "MENTAL_RESET" || goal === "PHYSICAL_REGENERATION")
    ) {
      data.goal = goal;
    }

    await prisma.user.update({
      where: { id: token.id as string },
      data,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se uložit data" },
      { status: 500 }
    );
  }
}
