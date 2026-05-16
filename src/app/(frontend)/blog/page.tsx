import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Blog',
  description: "News, exhibitions, and stories from Sherwood's Gallery.",
  path: '/blog',
})

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="py-16">
          <EyebrowHeading eyebrow="News &amp; Stories" heading="From the Gallery" tone="dark" />
        </Container>
      </section>
      <section className="bg-gallery-ivory py-20">
        <Container>
          <p className="font-body text-gallery-brown max-w-prose">
            Blog index comes in P9. Post collection is ready — see <code>/api/posts</code>.
          </p>
        </Container>
      </section>
    </>
  )
}
