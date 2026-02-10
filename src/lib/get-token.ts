import { getToken as _getToken } from "next-auth/jwt";

/**
 * Wrapper around next-auth getToken that auto-detects secureCookie.
 * Without secureCookie: true on HTTPS, getToken looks for wrong cookie name
 * (authjs.session-token instead of __Secure-authjs.session-token).
 */
export async function getToken(req: Request) {
  const isSecure =
    req.headers.get("x-forwarded-proto") === "https" ||
    new URL(req.url).protocol === "https:";

  return _getToken({
    req: req as any,
    secret: process.env.AUTH_SECRET,
    secureCookie: isSecure,
  });
}
