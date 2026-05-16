import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Our Artists',
  description:
    "Meet the acclaimed artists represented by Sherwood's Gallery, including Stacy Barter, Peggy Byars, Elio Camacho, and Boz Draka.",
  path: '/artists',
})

export default function ArtistsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="py-16">
          <EyebrowHeading eyebrow="Meet Our Talent" heading="Our Artists" tone="dark" />
        </Container>
      </section>
      <section className="bg-gallery-ivory py-20">
        <Container>
          <p className="font-body text-gallery-brown max-w-prose">
            Artist sections come in P6. Data is already in the CMS — see <code>/api/artists</code>.
          </p>
        </Container>
      </section>
    </>
  )
}
