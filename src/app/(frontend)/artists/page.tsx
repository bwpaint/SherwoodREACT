import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { ArtistSection } from '@/components/site/ArtistSection'
import { getAllArtists, getPaintingsByArtist } from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Our Artists',
  description:
    "Meet the acclaimed artists represented by Sherwood's Gallery, including Stacy Barter, Peggy Byars, Elio Camacho, and Boz Draka.",
  path: '/artists',
})

export default async function ArtistsPage() {
  const artists = await getAllArtists()
  const allPaintings = await Promise.all(artists.map((a) => getPaintingsByArtist(a.id, 6)))

  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="pt-16 pb-12">
          <EyebrowHeading eyebrow="Meet Our Talent" heading="Our Artists" tone="dark" />
          <p className="mt-6 max-w-prose font-body text-gallery-cream/85">
            We represent acclaimed Texas artists working in oil, watercolor, and mixed media —
            from celebrated landscape painters to masters of the figurative tradition.
          </p>
        </Container>
      </section>

      {artists.map((a, i) => (
        <ArtistSection
          key={a.id}
          artist={a}
          paintings={allPaintings[i] as Parameters<typeof ArtistSection>[0]['paintings']}
          reverse={i % 2 === 1}
          background={i % 2 === 0 ? 'ivory' : 'ivory-warm'}
        />
      ))}
    </>
  )
}
