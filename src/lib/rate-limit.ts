/**
 * Simple in-memory rate limiter: max requests per IP-hash per window.
 * Good enough for a single-server dev/prod setup. If we scale to
 * multiple Node instances, swap for Redis (Upstash) — keep the same shape.
 */

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

const DEFAULT_MAX = 5
const DEFAULT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

export function rateLimit(
  key: string,
  max: number = DEFAULT_MAX,
  windowMs: number = DEFAULT_WINDOW_MS,
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs }
  }
  if (bucket.count >= max) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt }
  }
  bucket.count += 1
  return { allowed: true, remaining: max - bucket.count, resetAt: bucket.resetAt }
}

export async function hashIP(ip: string): Promise<string> {
  const { createHash } = await import('node:crypto')
  return createHash('sha256').update(ip + (process.env.PAYLOAD_SECRET || '')).digest('hex').slice(0, 32)
}
