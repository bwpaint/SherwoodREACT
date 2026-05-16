import { Suspense } from 'react'
import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { GoldRule } from '@/components/ui/GoldRule'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/site/ContactForm'
import { getSiteSettings } from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: "Contact Sherwood's Gallery",
  description:
    "Visit Sherwood's Gallery at 2618 Briar Ridge Drive, Houston, TX 77057. Call (713) 974-3700 or email art@sherwoodsgallery.com.",
  path: '/contact',
})

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const contact = settings.contact
  const address = contact?.address
  const hours = (contact?.hours || []) as Array<{ days: string; hours: string }>
  const fullAddress = address
    ? [address.street, `${address.city}, ${address.state} ${address.zip}`]
        .filter(Boolean)
        .join(', ')
    : '2618 Briar Ridge Drive, Houston, Texas 77057'
  const mapsQuery = encodeURIComponent(fullAddress)
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="pt-16 pb-12">
          <EyebrowHeading eyebrow="Get in Touch" heading="Contact Us" tone="dark" />
          <p className="mt-6 max-w-prose font-body text-gallery-cream/85">
            Send a message, ask about a painting, or plan a visit. We typically respond within one
            business day.
          </p>
        </Container>
      </section>

      {/* Two-column card: info panel + form */}
      <section className="bg-gallery-ivory py-20">
        <Container>
          <div className="grid lg:grid-cols-5 shadow-[0_4px_32px_rgba(44,24,16,0.12)]">
            {/* Info panel — 2/5 */}
            <aside
              className="lg:col-span-2 p-8 sm:p-12 text-gallery-cream"
              style={{ background: 'linear-gradient(160deg, #0E8B8B 0%, #0A6B6B 100%)' }}
            >
              <h2 className="font-display font-semibold text-2xl text-gallery-gold-light">
                Gallery Information
              </h2>
              <div className="mt-4">
                <GoldRule width={40} />
              </div>

              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="shrink-0 mt-0.5 w-9 h-9 flex items-center justify-center text-gallery-gold-light"
                    style={{
                      background: 'rgba(201,168,76,0.2)',
                      border: '1px solid rgba(201,168,76,0.4)',
                    }}
                  >
                    ⌖
                  </span>
                  <div>
                    <p className="font-body text-sm leading-relaxed text-gallery-cream/95">
                      {fullAddress}
                    </p>
                    {address?.area && (
                      <p className="font-editorial italic text-xs text-gallery-gold-light/80 mt-1">
                        {address.area}
                      </p>
                    )}
                  </div>
                </li>

                {contact?.phone && (
                  <li className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="shrink-0 mt-0.5 w-9 h-9 flex items-center justify-center text-gallery-gold-light"
                      style={{
                        background: 'rgba(201,168,76,0.2)',
                        border: '1px solid rgba(201,168,76,0.4)',
                      }}
                    >
                      ☎
                    </span>
                    <a
                      href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                      className="font-body text-sm hover:text-gallery-gold transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </li>
                )}

                {contact?.email && (
                  <li className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="shrink-0 mt-0.5 w-9 h-9 flex items-center justify-center text-gallery-gold-light"
                      style={{
                        background: 'rgba(201,168,76,0.2)',
                        border: '1px solid rgba(201,168,76,0.4)',
                      }}
                    >
                      ✉
                    </span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-body text-sm hover:text-gallery-gold transition-colors break-all"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}

                {hours.length > 0 && (
                  <li className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="shrink-0 mt-0.5 w-9 h-9 flex items-center justify-center text-gallery-gold-light"
                      style={{
                        background: 'rgba(201,168,76,0.2)',
                        border: '1px solid rgba(201,168,76,0.4)',
                      }}
                    >
                      ⌚
                    </span>
                    <div className="font-body text-sm space-y-0.5">
                      {hours.map((h, i) => (
                        <p key={i}>
                          <span className="text-gallery-cream/75">{h.days}: </span>
                          <span className="text-gallery-cream">{h.hours}</span>
                        </p>
                      ))}
                    </div>
                  </li>
                )}
              </ul>

              <div className="mt-10">
                <Button href={directionsUrl} variant="gold" rel="noopener noreferrer" target="_blank">
                  Get Directions
                </Button>
              </div>

              <p className="mt-10 font-editorial italic text-sm text-gallery-gold-light/80">
                “We believe that art plays an important role in our lives.”
              </p>
            </aside>

            {/* Form — 3/5 */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="bg-gallery-ivory p-12">Loading…</div>}>
                <ContactForm turnstileSiteKey={turnstileSiteKey} />
              </Suspense>
            </div>
          </div>
        </Container>

        {/* Map */}
        <Container className="mt-12">
          <div
            className="overflow-hidden"
            style={{ border: '3px solid #C9A84C', boxShadow: '0 4px 24px rgba(44,24,16,0.2)' }}
          >
            <iframe
              src={mapsEmbed}
              title="Map to Sherwood's Gallery"
              width="100%"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  )
}
