import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { ArtistCard } from '@/components/site/ArtistCard'
import { getAllArtists } from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Our Artists',
  description:
    "Meet the acclaimed Texas artists represented by Sherwood's Gallery — oil painters, watercolorists, sculptors, and pastelists working in the great Texas tradition.",
  path: '/artists',
})

function lexicalSnippet(bio: unknown, max = 120): string {
  if (!bio || typeof bio !== 'object') return ''
  const root = (bio as any).root
  if (!root?.children) return ''
  let text = ''
  for (const node of root.children) {
    if (node.type === 'paragraph' && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (child.type === 'text' && child.text) text += child.text
      }
      text += ' '
    }
    if (text.length >= max) break
  }
  text = text.trim()
  return text.length > max ? text.slice(0, max).replace(/\s\S*$/, '') + '…' : text
}

// Mosaic pattern: 0 = portrait (3:4), 1 = square (1:1), 2 = tall (2:3)
// Repeats every 9 cards for visual rhythm
const ASPECT_PATTERN = [0, 1, 0, 2, 0, 0, 1, 0, 2]
const ASPECTS = ['aspect-[3/4]', 'aspect-square', 'aspect-[2/3]']

export default async function ArtistsPage() {
  const artists = await getAllArtists()

  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="pt-16 pb-12">
          <EyebrowHeading eyebrow="Meet Our Talent" heading="Our Artists" tone="dark" />
          <p className="mt-6 max-w-prose font-body text-gallery-cream/85">
            We represent acclaimed artists working in oil, watercolor, pastel, and sculpture —
            each with a distinct voice rooted in the Texas landscape tradition. Click any artist
            to read their full biography and view their works.
          </p>
        </Container>
      </section>

      <section className="bg-gallery-ivory py-16">
        <Container>
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {artists.map((artist, i) => {
              const portrait =
                artist.portrait && typeof artist.portrait === 'object'
                  ? (artist.portrait as { url?: string | null; alt?: string | null })
                  : undefined
              const specialty = (artist.specialty?.[0] as any)?.tag ?? undefined
              const aspect = ASPECTS[ASPECT_PATTERN[i % ASPECT_PATTERN.length]]
              const linkable = (artist as { hasDetailPage?: boolean }).hasDetailPage !== false
              return (
                <div key={artist.id} className="break-inside-avoid mb-4">
                  <ArtistCard
                    name={artist.name}
                    specialty={specialty}
                    portrait={portrait}
                    bioSnippet={lexicalSnippet(artist.bio)}
                    href={linkable ? `/artists/${artist.slug}` : undefined}
                    aspect={aspect}
                  />
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
