import { NextResponse } from "next/server";
import { getToken } from "@/lib/get-token";
import { prisma } from "@/lib/prisma";
import { getOrCreateDeviceId } from "@/lib/device-id";

export const dynamic = "force-dynamic";

const MAX_DEVICES = 3;

function parseDeviceName(ua: string): string {
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/Android/i.test(ua)) return "Android";
  if (/Mac/i.test(ua)) return "Mac";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Linux/i.test(ua)) return "Linux";
  return "Neznámé zařízení";
}

export async function POST(request: Request) {
  try {
    const token = await getToken(request);

    if (!token?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.id as string;
    const deviceId = await getOrCreateDeviceId();
    const ua = request.headers.get("user-agent") || "";
    const deviceName = parseDeviceName(ua);

    // Check if this device is already registered
    const existingDevice = await prisma.userDevice.findUnique({
      where: { userId_deviceId: { userId, deviceId } },
    });

    if (existingDevice) {
      // Update lastUsedAt
      await prisma.userDevice.update({
        where: { id: existingDevice.id },
        data: { lastUsedAt: new Date() },
      });
      return NextResponse.json({ ok: true });
    }

    // Count current devices
    const deviceCount = await prisma.userDevice.count({ where: { userId } });

    if (deviceCount >= MAX_DEVICES) {
      const devices = await prisma.userDevice.findMany({
        where: { userId },
        orderBy: { lastUsedAt: "desc" },
        select: { id: true, deviceName: true, lastUsedAt: true, createdAt: true },
      });
      return NextResponse.json(
        { error: "DEVICE_LIMIT", devices, maxDevices: MAX_DEVICES },
        { status: 403 }
      );
    }

    // Register new device
    await prisma.userDevice.create({
      data: { userId, deviceId, deviceName },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Chyba" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const token = await getToken(request);

    if (!token?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.id as string;
    const { deviceRecordId } = await request.json();

    if (!deviceRecordId) {
      return NextResponse.json({ error: "Missing deviceRecordId" }, { status: 400 });
    }

    // Only delete devices belonging to this user
    await prisma.userDevice.deleteMany({
      where: { id: deviceRecordId, userId },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Chyba" }, { status: 500 });
  }
}
