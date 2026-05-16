import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Art Galleries',
  description:
    'Browse our galleries: Bluebonnet, Figurative, Landscape, Miniatures, and Recent Acquisitions. Original fine art in Houston, Texas.',
  path: '/galleries',
})

export default function GalleriesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="py-16">
          <EyebrowHeading
            eyebrow="Browse Our Collection"
            heading="Art Galleries"
            tone="dark"
          />
        </Container>
      </section>
      <section className="bg-gallery-teal py-20">
        <Container>
          <p className="font-body text-gallery-cream/85 max-w-prose">
            Gallery sections come in P5. Data is already in the CMS — see <code>/api/galleries</code>.
          </p>
        </Container>
      </section>
    </>
  )
}
