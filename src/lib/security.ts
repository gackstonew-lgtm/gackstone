import { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Simple in-memory sliding-window rate limiter for API routes.
 */
export function checkRateLimit(
  key: string,
  limit: number = 30,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/**
 * Extracts a safe client identifier from request headers without logging PII.
 */
export function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim().slice(0, 64);
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim().slice(0, 64);
  }
  return "anonymous-client";
}

/**
 * Sanitizes plain-text user input and bounds its length.
 */
export function sanitizeInput(input: unknown, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Verifies admin authorization via server-side ADMIN_ACCESS_TOKEN.
 * Never exposes the expected secret in responses.
 */
export function verifyAdminAuthorization(req: NextRequest): {
  authorized: boolean;
  configured: boolean;
  reason?: string;
} {
  const configuredToken = process.env.ADMIN_ACCESS_TOKEN;
  if (!configuredToken || configuredToken.trim().length < 8) {
    return {
      authorized: false,
      configured: false,
      reason: "ADMIN_ACCESS_TOKEN is not configured on the server.",
    };
  }

  const authHeader = req.headers.get("authorization") || "";
  const tokenHeader = req.headers.get("x-admin-token") || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : tokenHeader.trim();

  if (!bearerToken || bearerToken !== configuredToken.trim()) {
    return {
      authorized: false,
      configured: true,
      reason: "Invalid or missing administrator credentials.",
    };
  }

  return { authorized: true, configured: true };
}
