import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="bg-gallery-teal min-h-[60vh] flex items-center">
      <Container className="py-20">
        <EyebrowHeading eyebrow="404" heading="Page Not Found" tone="dark" />
        <p className="mt-6 font-body text-gallery-cream/85 max-w-prose">
          The page you&apos;re looking for isn&apos;t here. It may have been moved or the link is
          incorrect.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="gold">
            Back to Home
          </Button>
          <Button href="/galleries" variant="ghost">
            Browse the Galleries
          </Button>
        </div>
      </Container>
    </section>
  )
}
