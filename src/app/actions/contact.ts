'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import { getPayloadClient } from '@/lib/payload'
import { rateLimit, hashIP } from '@/lib/rate-limit'
import { sendMail } from '@/lib/mailgun'
import { verifyTurnstile } from '@/lib/turnstile'

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.email('Please enter a valid email').max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10, 'Please write at least a sentence').max(5000),
  // Honeypot — must be empty (bots fill it in).
  website: z.string().max(0).optional().or(z.literal('')),
  // Hidden context from URL params.
  paintingSlug: z.string().max(200).optional().or(z.literal('')),
  type: z.enum(['contact', 'inquire', 'framing']).default('contact'),
  // Turnstile token (may be empty in dev if no key configured).
  turnstileToken: z.string().optional().or(z.literal('')),
})

export type ContactState = {
  ok?: boolean
  error?: string
  fieldErrors?: Partial<Record<keyof z.input<typeof ContactSchema>, string>>
}

export async function submitContact(
  _prev: ContactState | undefined,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = ContactSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: ContactState['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const path = issue.path[0] as keyof z.input<typeof ContactSchema>
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message
    }
    return { ok: false, error: 'Please correct the highlighted fields.', fieldErrors }
  }
  const data = parsed.data

  // Honeypot
  if (data.website && data.website.length > 0) {
    return { ok: true } // Pretend it worked; silently drop.
  }

  // IP + rate limit
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || '0.0.0.0'
  const ipHash = await hashIP(ip)
  const limit = rateLimit(`contact:${ipHash}`, 5, 60 * 60 * 1000)
  if (!limit.allowed) {
    return { ok: false, error: 'Too many submissions — please try again later.' }
  }

  // Turnstile
  const tr = await verifyTurnstile(data.turnstileToken, ip)
  if (!tr.ok) {
    return { ok: false, error: 'Could not verify you are human. Please reload and try again.' }
  }

  // Resolve painting reference if a slug was passed
  const payload = await getPayloadClient()
  let paintingRef: number | string | undefined
  if (data.paintingSlug) {
    const found = await payload.find({
      collection: 'paintings',
      where: { slug: { equals: data.paintingSlug } },
      limit: 1,
      depth: 0,
    })
    paintingRef = found.docs[0]?.id
  }

  // Persist submission
  let submissionId: number | string | undefined
  try {
    const created = await payload.create({
      collection: 'form-submissions',
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        subject: data.subject,
        message: data.message,
        paintingRef: paintingRef as number | undefined,
        ipHash,
        status: 'new',
      },
    })
    submissionId = created.id
  } catch (err) {
    console.error('FormSubmission create failed:', err)
    return { ok: false, error: 'We could not save your message. Please try again.' }
  }

  // Send notification email (silently skips if no Mailgun key)
  const notifyTo = process.env.MAILGUN_NOTIFY_TO || 'art@sherwoodsgallery.com'
  const mailResult = await sendMail({
    to: notifyTo,
    subject: `[Sherwoods] ${data.subject}`,
    replyTo: data.email,
    text: [
      `Type: ${data.type}`,
      `From: ${data.name} <${data.email}>`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.paintingSlug ? `Painting: ${data.paintingSlug}` : null,
      `Submission ID: ${submissionId}`,
      '',
      data.message,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  if ('skipped' in mailResult && mailResult.skipped) {
    console.warn('Mailgun skipped:', mailResult.reason, '(submission still saved)')
  } else if (!mailResult.ok) {
    console.warn('Mailgun failed:', mailResult)
  }

  return { ok: true }
}
