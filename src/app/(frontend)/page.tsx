import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Button } from '@/components/ui/Button'
import { RevealSection } from '@/components/ui/RevealSection'
import { HeroSection } from '@/components/site/HeroSection'
import { WelcomeBand } from '@/components/site/WelcomeBand'
import { GalleryCard } from '@/components/site/GalleryCard'
import { ArtistCard } from '@/components/site/ArtistCard'
import { VisitCTABand } from '@/components/site/VisitCTABand'
import {
  getPage,
  getActiveGalleries,
  getFeaturedArtists,
} from '@/lib/payload'

type HeroBlock = {
  blockType: 'hero'
  eyebrow?: string | null
  headlineLine1: string
  headlineLine2?: string | null
  subheadline?: string | null
  backgroundImage?: { url?: string | null; alt?: string | null } | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
}

type TextBlock = {
  blockType: 'textBlock'
  eyebrow?: string | null
  heading?: string | null
  body?: unknown
}

const WELCOME_FALLBACK =
  "At Sherwood's Gallery, we have been serving the discerning artist and collector since 1981. Located in Houston's Briargrove area near the famous Galleria district, we offer acclaimed artists widely celebrated in Texas, the United States, and around the world — alongside expert archival picture framing."

function findBlock<T extends { blockType: string }>(layout: unknown, type: string): T | null {
  if (!Array.isArray(layout)) return null
  const block = layout.find((b: { blockType?: string }) => b?.blockType === type)
  return (block as T) ?? null
}

export default async function HomePage() {
  const [homePage, galleries, featuredArtists] = await Promise.all([
    getPage('home'),
    getActiveGalleries(),
    getFeaturedArtists(4),
  ])

  const hero = findBlock<HeroBlock>(homePage?.layout, 'hero')
  const welcome = findBlock<TextBlock>(homePage?.layout, 'textBlock')

  return (
    <>
      {/* Section 1 — Hero */}
      {hero ? (
        <HeroSection
          eyebrow={hero.eyebrow}
          headlineLine1={hero.headlineLine1}
          headlineLine2={hero.headlineLine2}
          subheadline={hero.subheadline}
          backgroundImage={hero.backgroundImage}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
        />
      ) : (
        <HeroSection
          eyebrow="Houston, Texas · Est. 1981"
          headlineLine1="Original Fine Art"
          headlineLine2="for Discerning Collectors"
          primaryCta={{ label: 'Explore the Galleries', href: '/galleries' }}
          secondaryCta={{ label: 'Visit Us', href: '/contact' }}
        />
      )}

      {/* Section 2 — Welcome Band */}
      <WelcomeBand
        heading={welcome?.heading || "Welcome to Sherwood's Gallery"}
        body={WELCOME_FALLBACK}
      />

      {/* Section 3 — Gallery Previews */}
      <section className="bg-gallery-teal">
        <Container className="py-20">
          <EyebrowHeading
            eyebrow="Browse Our Collection"
            heading="Art Galleries"
            tone="dark"
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.slice(0, 6).map((g, i) => (
              <RevealSection key={g.id} delay={i * 80}>
                <GalleryCard
                  title={g.name}
                  description={g.description}
                  image={typeof g.heroImage === 'object' ? g.heroImage : null}
                  href={`/galleries#${g.slug}`}
                />
              </RevealSection>
            ))}
          </div>
          {galleries.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Button href="/galleries" variant="gold">
                View All Galleries
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Section 4 — Featured Artists */}
      <section className="bg-gallery-ivory">
        <Container className="py-20">
          <EyebrowHeading
            eyebrow="Meet Our Talent"
            heading="Featured Artists"
            tone="ivory"
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArtists.map((a, i) => {
              const specialty = Array.isArray(a.specialty)
                ? (a.specialty as Array<{ tag?: string }>)
                    .map((s) => s.tag)
                    .filter(Boolean)
                    .slice(0, 2)
                    .join(' · ')
                : undefined
              return (
                <RevealSection key={a.id} delay={i * 80}>
                  <ArtistCard
                    name={a.name}
                    specialty={specialty}
                    portrait={typeof a.portrait === 'object' ? a.portrait : null}
                    bioSnippet={a.medium ?? undefined}
                    href={
                      a.slug && (a as { hasDetailPage?: boolean }).hasDetailPage !== false
                        ? `/artists/${a.slug}`
                        : undefined
                    }
                  />
                </RevealSection>
              )
            })}
          </div>
          {featuredArtists.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Button href="/artists" variant="teal">
                Meet All Artists
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Section 5 — Visit CTA Band */}
      <VisitCTABand />
    </>
  )
}
