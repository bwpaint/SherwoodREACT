import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { GalleryPills } from '@/components/site/GalleryPills'
import { GallerySection } from '@/components/site/GallerySection'
import {
  getActiveGalleries,
  getPaintingsByGallery,
  getRecentAcquisitions,
} from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Art Galleries',
  description:
    'Browse our galleries: Bluebonnet, Figurative, Landscape, Miniatures, and Recent Acquisitions. Original fine art in Houston, Texas.',
  path: '/galleries',
})

// Alternate teal / ivory backgrounds across sections (per handoff §8.2).
const BACKGROUND_ROTATION: Array<'teal' | 'ivory'> = ['teal', 'ivory', 'teal', 'ivory']

export default async function GalleriesPage() {
  const galleries = await getActiveGalleries()

  // Recent Acquisitions is special: pulled by flag, not by gallery membership.
  const recentSlug = 'recent-acquisitions'
  const standard = galleries.filter((g) => g.slug !== recentSlug)
  const recentGallery = galleries.find((g) => g.slug === recentSlug)

  const [standardPaintings, recentPaintings] = await Promise.all([
    Promise.all(standard.map((g) => getPaintingsByGallery(g.slug!))),
    getRecentAcquisitions(12),
  ])

  const pillNav = galleries.map((g) => ({ slug: g.slug!, name: g.name }))

  return (
    <>
      {/* Page header band */}
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="pt-16 pb-12">
          <EyebrowHeading
            eyebrow="Browse Our Collection"
            heading="Art Galleries"
            tone="dark"
          />
          <p className="mt-6 max-w-prose font-body text-gallery-cream/85">
            Five curated sections showcase original oil paintings, watercolors, and miniatures by
            our acclaimed Texas artists. Click any gallery to jump to that section.
          </p>
          <div className="mt-8">
            <GalleryPills pills={pillNav} />
          </div>
        </Container>
      </section>

      {/* Standard gallery sections (Bluebonnet / Figurative / Landscape / Miniatures) */}
      {standard.map((g, i) => (
        <GallerySection
          key={g.id}
          id={g.slug!}
          name={g.name}
          description={g.description}
          background={BACKGROUND_ROTATION[i % BACKGROUND_ROTATION.length]}
          paintings={standardPaintings[i] as Parameters<typeof GallerySection>[0]['paintings']}
        />
      ))}

      {/* Recent Acquisitions — always last, teal-dark */}
      {recentGallery && (
        <GallerySection
          id={recentSlug}
          name={recentGallery.name}
          description={recentGallery.description}
          background="teal-dark"
          paintings={recentPaintings as Parameters<typeof GallerySection>[0]['paintings']}
          showRecentAcquisitionsCTA
        />
      )}
    </>
  )
}
