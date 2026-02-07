import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    bypassStripe: process.env.BYPASS_STRIPE === "true" || process.env.NEXT_PUBLIC_BYPASS_STRIPE === "true",
  });
}
