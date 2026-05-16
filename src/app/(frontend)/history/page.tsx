import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Blocks } from '@/components/site/Blocks'
import { CtaBandBlock } from '@/components/site/blocks/CtaBandBlock'
import { ImageBreakBlock } from '@/components/site/blocks/ImageBreakBlock'
import { getPage } from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Our History',
  description:
    "Serving Houston's discerning collectors since 1981. Learn the story of Sherwood's Gallery and our commitment to fine art and archival framing.",
  path: '/history',
})

export default async function HistoryPage() {
  const page = await getPage('history')

  return (
    <>
      <section className="relative h-[400px] flex items-end isolate overflow-hidden border-b-[3px] border-gallery-gold">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-gallery-teal-deep via-gallery-teal-dark to-gallery-teal -z-10"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,107,107,0.7) 0%, rgba(10,107,107,0.85) 100%)',
          }}
        />
        <Container className="pb-12 pt-16">
          <EyebrowHeading
            eyebrow="Since 1981"
            heading="Our History"
            tone="dark"
          />
        </Container>
      </section>

      {/* Render all blocks from Pages.history */}
      <Blocks layout={page?.layout} />

      {/* Mid-page image break (static for now; can move into Pages blocks later) */}
      <ImageBreakBlock overlayText="Serving Houston's Collectors Since 1981" />

      {/* Framing section — static narrative + CTA */}
      <CtaBandBlock
        heading="Expert Archival Picture Framing"
        body="Our framing department has earned a reputation across Houston for archival-quality picture framing — preserving paintings, photographs, documents, and family heirlooms for the long term."
        primaryCta={{ label: 'Inquire About Framing', href: '/contact?subject=Picture+Framing' }}
      />
    </>
  )
}
