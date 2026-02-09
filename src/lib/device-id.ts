import { cookies } from "next/headers";

const COOKIE_NAME = "tp-device-id";
const FIVE_YEARS = 5 * 365 * 24 * 60 * 60;

export async function getOrCreateDeviceId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(COOKIE_NAME);

  if (existing?.value) {
    return existing.value;
  }

  const deviceId = crypto.randomUUID();
  cookieStore.set(COOKIE_NAME, deviceId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: FIVE_YEARS,
  });

  return deviceId;
}
