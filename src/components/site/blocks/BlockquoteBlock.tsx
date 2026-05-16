import { Container } from '@/components/ui/Container'

export function BlockquoteBlock({
  quote,
  attribution,
}: {
  quote: string
  attribution?: string | null
}) {
  return (
    <section className="bg-gallery-ivory">
      <Container className="py-16 max-w-[900px]">
        <blockquote className="border-l-4 border-gallery-gold pl-7">
          <p className="font-editorial italic text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.6] text-gallery-espresso">
            “{quote}”
          </p>
          {attribution && (
            <footer className="mt-5 font-body text-sm text-gallery-teal-dark not-italic">
              {attribution}
            </footer>
          )}
        </blockquote>
      </Container>
    </section>
  )
}
