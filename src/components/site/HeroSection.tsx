import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined
type CtaLike = { label?: string | null; href?: string | null } | null | undefined

export function HeroSection({
  eyebrow,
  headlineLine1,
  headlineLine2,
  subheadline,
  backgroundImage,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string | null
  headlineLine1: string
  headlineLine2?: string | null
  subheadline?: string | null
  backgroundImage?: MediaLike
  primaryCta?: CtaLike
  secondaryCta?: CtaLike
}) {
  return (
    <section
      className="relative isolate min-h-[88vh] flex items-center"
      style={{ minHeight: 'max(560px, 88vh)' }}
    >
      {backgroundImage?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={backgroundImage.url}
          alt={backgroundImage.alt || ''}
          className="absolute inset-0 w-full h-full object-cover -z-10"
          style={{ objectPosition: 'center 40%' }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gallery-teal-deep via-gallery-teal-dark to-gallery-teal -z-10" />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to right, rgba(10,80,80,0.88) 0%, rgba(10,80,80,0.55) 45%, rgba(10,80,80,0.2) 100%)',
        }}
      />

      <Container className="py-20">
        <div className="max-w-[600px]">
          {eyebrow && <p className="eyebrow text-gallery-gold-light">{eyebrow}</p>}
          <h1 className="mt-6 font-display font-bold leading-[1.05] text-gallery-cream text-[clamp(2.5rem,6vw,4.5rem)]">
            <span className="whitespace-nowrap">{headlineLine1}</span>
            {headlineLine2 && (
              <>
                <br />
                <span className="text-gallery-gold-light">{headlineLine2}</span>
              </>
            )}
          </h1>
          {subheadline && (
            <p className="mt-6 font-body text-gallery-cream/85 text-lg leading-relaxed max-w-[480px]">
              {subheadline}
            </p>
          )}
          {(primaryCta?.href || secondaryCta?.href) && (
            <div className="mt-10 flex flex-wrap gap-4">
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

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body font-bold text-[0.65rem] tracking-[0.3em] uppercase text-gallery-gold-light">
          Scroll
        </span>
        <span className="block w-px h-10 bg-gradient-to-b from-gallery-gold-light to-transparent" />
      </div>
    </section>
  )
}
