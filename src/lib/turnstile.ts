import 'server-only'

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstile(
  token: string | null | undefined,
  ip?: string,
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    // No secret configured — skip verification (dev mode). Production must set this.
    return { ok: true, reason: 'turnstile disabled (no secret key)' }
  }
  if (!token) return { ok: false, reason: 'missing token' }

  const body = new URLSearchParams()
  body.append('secret', secret)
  body.append('response', token)
  if (ip) body.append('remoteip', ip)

  const res = await fetch(VERIFY_URL, { method: 'POST', body })
  if (!res.ok) return { ok: false, reason: `verify endpoint ${res.status}` }
  const json = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
  if (!json.success) {
    return { ok: false, reason: (json['error-codes'] || []).join(', ') || 'verification failed' }
  }
  return { ok: true }
}
