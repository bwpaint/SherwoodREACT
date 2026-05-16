'use client'

import { useActionState } from 'react'
import { subscribeNewsletter, type SubscribeState } from '@/app/actions/newsletter'

export function NewsletterSignup() {
  const [state, action, pending] = useActionState<SubscribeState | undefined, FormData>(
    subscribeNewsletter,
    undefined,
  )

  return (
    <div>
      <h4 className="font-body font-bold text-gallery-gold-light text-xs uppercase tracking-[0.15em]">
        Stay Current
      </h4>
      <p className="mt-3 font-body text-sm text-gallery-cream/75 leading-relaxed">
        Get news of new acquisitions and exhibitions in your inbox.
      </p>

      {state?.ok ? (
        <p className="mt-4 font-editorial italic text-gallery-gold-light">
          Thanks — you&apos;re on the list.
        </p>
      ) : (
        <form action={action} className="mt-4 flex gap-2">
          <input type="hidden" name="source" value="footer" />
          {/* Honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[10000px]" aria-hidden />

          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="min-w-0 flex-1 bg-gallery-teal-dark border border-gallery-cream/25 text-gallery-cream placeholder:text-gallery-cream/40 px-3 py-2 font-body text-sm focus:outline-none focus:border-gallery-gold"
          />
          <button
            type="submit"
            disabled={pending}
            className="bg-gallery-gold border border-gallery-gold-dark text-gallery-espresso font-body font-bold text-[0.7rem] uppercase tracking-[0.1em] px-4 hover:bg-[#B8944A] active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? '…' : 'Join'}
          </button>
        </form>
      )}
      {state?.error && (
        <p className="mt-3 text-xs text-red-300">{state.error}</p>
      )}
    </div>
  )
}
