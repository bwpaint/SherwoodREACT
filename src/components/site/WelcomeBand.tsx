import { Container } from '@/components/ui/Container'

export function WelcomeBand({
  heading,
  body,
}: {
  heading: string
  body?: string
}) {
  return (
    <section className="bg-gallery-teal-dark">
      <Container className="py-12">
        <div className="max-w-[720px] mx-auto text-center">
          <span aria-hidden className="text-gallery-gold inline-block">
            ★
          </span>
          <h2 className="mt-4 font-display font-medium text-gallery-cream text-[clamp(1.5rem,3vw,2.25rem)]">
            {heading}
          </h2>
          <span aria-hidden className="mt-4 text-gallery-gold inline-block">
            ★
          </span>
          {body && (
            <p className="mt-6 font-body text-gallery-cream/85 leading-[1.8] text-base">{body}</p>
          )}
        </div>
      </Container>
    </section>
  )
}
