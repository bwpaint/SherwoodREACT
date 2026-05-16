import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gallery-teal">
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
          The real home page is under construction (P4). For now you can preview the design
          system or go straight to the CMS.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/styleguide" variant="gold">
            View Style Guide
          </Button>
          <Button href="/admin" variant="ghost">
            Open Admin
          </Button>
        </div>
      </Container>
    </main>
  )
}
