import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "@/lib/get-token";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function generateCertId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `PULSE-${year}-${random}`;
}

export async function POST(request: NextRequest) {
  const token = await getToken(request);
  if (!token?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, startDate, endDate } = await request.json();

    if (!name || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays !== 5) {
      return NextResponse.json({ error: "Datum dokončení musí být 5 dní po zahájení" }, { status: 400 });
    }

    const certificateId = generateCertId();

    const certificate = await prisma.certificate.create({
      data: {
        userId: token.sub,
        name,
        startDate: start,
        endDate: end,
        certificateId,
      },
    });

    return NextResponse.json({ certificate });
  } catch (error) {
    console.error("Certificate creation error:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const certificate = await prisma.certificate.findUnique({
      where: { certificateId: id },
    });

    if (!certificate) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ certificate });
  } catch {
    return NextResponse.json({ error: "Failed to fetch certificate" }, { status: 500 });
  }
}
