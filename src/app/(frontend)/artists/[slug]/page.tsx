import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ArtistSection } from '@/components/site/ArtistSection'
import { getAllArtists, getArtistBySlug, getPaintingsByArtist } from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

export async function generateStaticParams() {
  const artists = await getAllArtists()
  return artists
    .filter((a) => !!a.slug && (a as { hasDetailPage?: boolean }).hasDetailPage !== false)
    .map((a) => ({ slug: a.slug as string }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)
  if (!artist) return {}
  const specialty = (artist.specialty?.[0] as any)?.tag
  return pageMetadata({
    title: artist.name,
    description: specialty
      ? `${artist.name} — ${specialty} represented by Sherwoods Gallery, Houston TX.`
      : `${artist.name}, a fine artist represented by Sherwoods Gallery in Houston, Texas.`,
    path: `/artists/${slug}`,
  })
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)
  if (!artist) notFound()
  if ((artist as { hasDetailPage?: boolean }).hasDetailPage === false) notFound()

  const paintings = await getPaintingsByArtist(artist.id, 6)

  return (
    <>
      {/* Breadcrumb header */}
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="pt-10 pb-8">
          <nav className="flex items-center gap-2 font-body text-sm text-gallery-cream/70">
            <Link href="/" className="hover:text-gallery-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/artists" className="hover:text-gallery-gold transition-colors">
              Our Artists
            </Link>
            <span>/</span>
            <span className="text-gallery-cream">{artist.name}</span>
          </nav>
        </Container>
      </section>

      {/* Artist detail */}
      <ArtistSection
        artist={artist as any}
        paintings={paintings as any}
        background="ivory"
      />
    </>
  )
}
