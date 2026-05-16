import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { GoldRule } from '@/components/ui/GoldRule'
import { RichText } from '@/components/ui/RichText'
import { cn } from '@/components/ui/cn'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

type Painting = {
  id: number | string
  title: string
  images?: Array<{ image?: MediaLike }> | null
}

type Artist = {
  id: number | string
  name: string
  slug?: string | null
  portrait?: MediaLike
  medium?: string | null
  specialty?: Array<{ tag?: string }> | null
  bio?: unknown
}

export function ArtistSection({
  artist,
  paintings,
  reverse = false,
  background = 'ivory',
}: {
  artist: Artist
  paintings: Painting[]
  reverse?: boolean
  background?: 'ivory' | 'ivory-warm'
}) {
  const portrait = artist.portrait && typeof artist.portrait === 'object' ? artist.portrait : null
  const specialtyTags = (artist.specialty || []).map((s) => s.tag).filter(Boolean) as string[]
  const inquireHref = `/contact?subject=${encodeURIComponent(`Artist inquiry: ${artist.name}`)}`

  const bgClass = background === 'ivory-warm' ? 'bg-gallery-ivory-warm' : 'bg-gallery-ivory'

  return (
    <section className={cn(bgClass, 'py-20')} id={artist.slug || undefined}>
      <Container>
        <div className={cn('grid gap-12 lg:gap-16 items-start', 'grid-cols-1 lg:grid-cols-2')}>
          {/* Portrait + Works column */}
          <div className={cn('flex flex-col', reverse && 'lg:order-2')}>
            <div className="relative max-w-[380px]">
              <div
                className="relative overflow-hidden"
                style={{
                  border: '4px solid #C9A84C',
                  boxShadow: '6px 6px 0 #A8893C, inset 0 0 0 1px #E8C97A',
                  aspectRatio: '1 / 1',
                }}
              >
                {portrait?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={portrait.url}
                    alt={portrait.alt || artist.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: 'sepia(8%) saturate(95%)' }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-gallery-brown-light/30 to-gallery-brown-mid/50 flex items-center justify-center">
                    <span className="font-display font-bold text-gallery-cream/60 text-5xl">
                      {artist.name
                        .split(' ')
                        .map((p) => p[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="h-1 bg-gallery-gold mt-1" />
            </div>

            {paintings.length > 0 && (
              <div className="mt-10 max-w-[380px]">
                <p className="font-body font-bold text-[0.7rem] uppercase tracking-[0.15em] text-gallery-teal-dark">
                  Selected Works
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {paintings.slice(0, 6).map((p) => {
                    const img = p.images?.[0]?.image
                    const thumb = img && typeof img === 'object' ? img : null
                    return (
                      <div
                        key={p.id}
                        className="relative overflow-hidden bg-gallery-brown-light/20 border-2 border-gallery-gold"
                        style={{ aspectRatio: '1 / 1' }}
                      >
                        {thumb?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb.url}
                            alt={thumb.alt || p.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[0.6rem] font-editorial italic text-gallery-brown-mid text-center px-1">
                            {p.title}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bio column */}
          <div className={cn(reverse && 'lg:order-1')}>
            {specialtyTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {specialtyTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gallery-teal-dark text-gallery-cream font-body font-bold text-[0.7rem] uppercase tracking-[0.1em] px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h2 className="mt-4 font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-gallery-espresso">
              {artist.name}
            </h2>
            {artist.medium && (
              <p className="mt-2 font-editorial italic text-base text-gallery-teal-dark">
                {artist.medium}
              </p>
            )}
            <div className="mt-5">
              <GoldRule width={50} />
            </div>

            <div className="mt-6 text-gallery-brown">
              <RichText value={artist.bio} />
            </div>

            <div className="mt-8">
              <Button href={inquireHref} variant="gold">
                Inquire About This Artist
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
