'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import { getPayloadClient } from '@/lib/payload'
import { rateLimit, hashIP } from '@/lib/rate-limit'

const SubscribeSchema = z.object({
  email: z.email('Please enter a valid email').max(160),
  source: z.string().max(40).optional().or(z.literal('')),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
})

export type SubscribeState = { ok?: boolean; error?: string }

export async function subscribeNewsletter(
  _prev: SubscribeState | undefined,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = SubscribeSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message || 'Invalid input' }
  }
  const { email, source, website } = parsed.data

  // Honeypot — silently drop bots
  if (website && website.length > 0) return { ok: true }

  // Rate limit
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || '0.0.0.0'
  const ipHash = await hashIP(ip)
  const limit = rateLimit(`newsletter:${ipHash}`, 10, 60 * 60 * 1000)
  if (!limit.allowed) {
    return { ok: false, error: 'Too many attempts — try again later.' }
  }

  const payload = await getPayloadClient()
  try {
    // Upsert by email (unique index on email handles dedup)
    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      // Already subscribed — un-unsubscribe if needed, success either way
      if (existing.docs[0].unsubscribed) {
        await payload.update({
          collection: 'newsletter-subscribers',
          id: existing.docs[0].id,
          data: { unsubscribed: false },
        })
      }
    } else {
      await payload.create({
        collection: 'newsletter-subscribers',
        data: { email, source: source || 'footer' },
      })
    }
  } catch (err) {
    console.error('Newsletter subscribe failed:', err)
    return { ok: false, error: 'Could not subscribe. Please try again.' }
  }

  return { ok: true }
}
