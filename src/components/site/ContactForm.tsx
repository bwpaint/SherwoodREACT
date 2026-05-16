'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'

import { submitContact, type ContactState } from '@/app/actions/contact'
import { SUBJECT_OPTIONS } from '@/lib/contact-options'
import { GoldRule } from '@/components/ui/GoldRule'

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

const inputClasses =
  'w-full bg-gallery-ivory-input border border-gallery-gold/40 px-3 py-2.5 font-body text-[0.95rem] text-gallery-espresso focus:outline-none focus:border-gallery-teal-dark transition-colors'

const labelClasses =
  'block font-body font-bold text-[0.7rem] uppercase tracking-[0.15em] text-gallery-brown mb-1.5'

export function ContactForm({
  turnstileSiteKey,
}: {
  turnstileSiteKey?: string
}) {
  const params = useSearchParams()
  const presetSubject = params.get('subject') || ''
  const paintingSlug = params.get('painting') || ''
  const formType = paintingSlug ? 'inquire' : presetSubject.toLowerCase().includes('framing') ? 'framing' : 'contact'

  const [state, action, pending] = useActionState<ContactState | undefined, FormData>(
    submitContact,
    undefined,
  )

  const [turnstileToken, setTurnstileToken] = useState('')
  const tsRef = useRef<HTMLDivElement | null>(null)

  // Re-mount the Turnstile widget when the script loads
  useEffect(() => {
    if (!turnstileSiteKey) return
    const w = window as unknown as { turnstile?: { render: (el: Element, opts: Record<string, unknown>) => string } }
    function tryRender() {
      if (w.turnstile && tsRef.current && tsRef.current.children.length === 0) {
        w.turnstile.render(tsRef.current, {
          sitekey: turnstileSiteKey,
          theme: 'light',
          callback: (t: string) => setTurnstileToken(t),
          'error-callback': () => setTurnstileToken(''),
          'expired-callback': () => setTurnstileToken(''),
        })
      }
    }
    const t = setInterval(tryRender, 200)
    return () => clearInterval(t)
  }, [turnstileSiteKey])

  if (state?.ok) {
    return (
      <div className="bg-gallery-ivory p-12 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-gallery-teal-dark flex items-center justify-center text-gallery-cream text-2xl">
          ✓
        </div>
        <h2 className="mt-6 font-display font-bold text-2xl text-gallery-espresso">Thank you</h2>
        <p className="mt-4 font-body text-gallery-brown max-w-prose mx-auto">
          We&apos;ve received your message and will be in touch shortly. If you don&apos;t hear from
          us within 24 hours during business days, please call (713) 974-3700.
        </p>
      </div>
    )
  }

  return (
    <>
      {turnstileSiteKey && <Script src={TURNSTILE_SCRIPT} strategy="afterInteractive" defer />}
      <form action={action} className="bg-gallery-ivory p-8 sm:p-12">
        <h2 className="font-display font-bold text-2xl text-gallery-espresso">Send Us a Message</h2>
        <div className="mt-4">
          <GoldRule width={40} />
        </div>

        {state?.error && (
          <div className="mt-6 border-l-[3px] border-red-700 bg-red-50 text-red-900 px-4 py-3 font-body text-sm">
            {state.error}
          </div>
        )}

        <input type="hidden" name="paintingSlug" value={paintingSlug} />
        <input type="hidden" name="type" value={formType} />

        {/* Honeypot — hidden from real users */}
        <div className="absolute -left-[10000px]" aria-hidden>
          <label>
            Leave this field empty
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClasses} htmlFor="name">
              Name *
            </label>
            <input id="name" name="name" type="text" required className={inputClasses} />
            {state?.fieldErrors?.name && (
              <p className="mt-1 text-xs text-red-700">{state.fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label className={labelClasses} htmlFor="email">
              Email *
            </label>
            <input id="email" name="email" type="email" required className={inputClasses} />
            {state?.fieldErrors?.email && (
              <p className="mt-1 text-xs text-red-700">{state.fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className={labelClasses} htmlFor="phone">
              Phone
            </label>
            <input id="phone" name="phone" type="tel" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses} htmlFor="subject">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              defaultValue={presetSubject}
              className={inputClasses}
            >
              <option value="" disabled>
                Select a topic…
              </option>
              {presetSubject && !SUBJECT_OPTIONS.includes(presetSubject as (typeof SUBJECT_OPTIONS)[number]) && (
                <option value={presetSubject}>{presetSubject}</option>
              )}
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasses} htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              defaultValue={paintingSlug ? `I'm interested in learning more about "${paintingSlug}".\n\n` : ''}
              className={inputClasses}
            />
            {state?.fieldErrors?.message && (
              <p className="mt-1 text-xs text-red-700">{state.fieldErrors.message}</p>
            )}
          </div>
        </div>

        {turnstileSiteKey ? (
          <div className="mt-6">
            <div ref={tsRef} />
            <input type="hidden" name="turnstileToken" value={turnstileToken} />
          </div>
        ) : (
          <p className="mt-6 font-editorial italic text-xs text-gallery-brown-light">
            Spam protection will be enabled in production (Cloudflare Turnstile).
          </p>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 bg-gallery-teal-dark border border-gallery-teal-deep text-gallery-cream font-body font-bold text-xs uppercase tracking-[0.08em] px-6 py-2.5 hover:bg-gallery-teal-deep active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? 'Sending…' : 'Send Message →'}
          </button>
        </div>
      </form>
    </>
  )
}
