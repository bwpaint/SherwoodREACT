import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: "Contact Sherwood's Gallery",
  description:
    "Visit Sherwood's Gallery at 2618 Briar Ridge Drive, Houston, TX 77057. Call (713) 974-3700 or email art@sherwoodsgallery.com.",
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="py-16">
          <EyebrowHeading eyebrow="Get in Touch" heading="Contact Us" tone="dark" />
        </Container>
      </section>
      <section className="bg-gallery-ivory py-20">
        <Container>
          <p className="font-body text-gallery-brown max-w-prose">
            Contact form + map come in P8 (with Mailgun + Turnstile wired up).
          </p>
        </Container>
      </section>
    </>
  )
}
