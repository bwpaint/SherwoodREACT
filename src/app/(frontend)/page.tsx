import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <section className="bg-gallery-teal">
      <Container className="py-20">
        <EyebrowHeading
          eyebrow="Sherwood's Gallery"
          heading={
            <>
              Original Fine Art
              <br />
              <span className="text-gallery-gold-light">for Discerning Collectors</span>
            </>
          }
          tone="dark"
        />

        <p className="mt-8 max-w-prose text-gallery-cream/85 font-body text-lg">
          Full home page (hero, welcome band, gallery previews, featured artists, visit CTA)
          comes in P4. The shell, nav, and footer are wired live to the CMS.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/galleries" variant="gold">
            Explore the Galleries
          </Button>
          <Button href="/contact" variant="ghost">
            Visit Us
          </Button>
          <Button href="/styleguide" variant="ghost">
            Style Guide
          </Button>
        </div>
      </Container>
    </section>
  )
}
