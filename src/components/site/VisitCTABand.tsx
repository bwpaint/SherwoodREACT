import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export function VisitCTABand({
  heading = 'Come See the Gallery in Person',
  body = 'A visit to Sherwoods is the best way to experience the work. We’re in the Briargrove area near the Galleria — walk-ins always welcome.',
  primaryHref = '/contact',
  primaryLabel = 'Get Directions',
  secondaryHref = '/history',
  secondaryLabel = 'Our Story',
}: {
  heading?: string
  body?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #0E8B8B 0%, #1AAFB0 50%, #0A6B6B 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border"
        style={{ borderColor: 'rgba(201,168,76,0.15)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full border"
        style={{ borderColor: 'rgba(201,168,76,0.15)' }}
      />

      <Container className="relative py-20">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="font-display font-bold text-gallery-cream text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight">
            {heading}
          </h2>
          <p className="mt-6 font-body text-gallery-cream/90 leading-relaxed">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={primaryHref} variant="gold">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
