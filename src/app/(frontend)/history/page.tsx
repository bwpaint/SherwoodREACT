import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Our History',
  description:
    "Serving Houston's discerning collectors since 1981. Learn the story of Sherwood's Gallery and our commitment to fine art and archival framing.",
  path: '/history',
})

export default function HistoryPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="py-16">
          <EyebrowHeading eyebrow="Established 1981" heading="Our History" tone="dark" />
        </Container>
      </section>
      <section className="bg-gallery-ivory py-20">
        <Container>
          <p className="font-body text-gallery-brown max-w-prose">
            History page comes in P7. Timeline data is already in the CMS — see <code>/api/pages?where[slug][equals]=history</code>.
          </p>
        </Container>
      </section>
    </>
  )
}
