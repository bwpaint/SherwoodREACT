import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

type CtaLike = { label?: string | null; href?: string | null } | null | undefined

export function CtaBandBlock({
  heading,
  body,
  primaryCta,
  secondaryCta,
}: {
  heading: string
  body?: string | null
  primaryCta?: CtaLike
  secondaryCta?: CtaLike
}) {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0E8B8B 0%, #1AAFB0 50%, #0A6B6B 100%)' }}
    >
      <Container className="py-20">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="font-display font-bold text-gallery-cream text-[clamp(1.75rem,3.5vw,2.75rem)]">
            {heading}
          </h2>
          {body && <p className="mt-6 font-body text-gallery-cream/90">{body}</p>}
          {(primaryCta?.href || secondaryCta?.href) && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {primaryCta?.href && primaryCta?.label && (
                <Button href={primaryCta.href} variant="gold">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta?.href && secondaryCta?.label && (
                <Button href={secondaryCta.href} variant="ghost">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
