import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Button } from '@/components/ui/Button'
import { PaintingCard } from './PaintingCard'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

type Painting = Parameters<typeof PaintingCard>[0]['painting']

const TONE_BG: Record<string, string> = {
  teal: 'bg-gallery-teal',
  ivory: 'bg-gallery-ivory',
  'teal-dark': 'bg-gallery-teal-dark',
}

export function GallerySection({
  id,
  name,
  description,
  background = 'teal',
  paintings,
  inquiryNotice,
  showRecentAcquisitionsCTA = false,
}: {
  id: string
  name: string
  description?: string | null
  background?: 'teal' | 'ivory' | 'teal-dark'
  paintings: Painting[]
  inquiryNotice?: string
  showRecentAcquisitionsCTA?: boolean
}) {
  const tone: 'dark' | 'ivory' = background === 'ivory' ? 'ivory' : 'dark'
  const notice =
    inquiryNotice ??
    "All paintings are available for inquiry. Contact us for current pricing and availability."

  return (
    <section id={id} className={`scroll-mt-32 ${TONE_BG[background]}`}>
      <Container className="py-20">
        <EyebrowHeading eyebrow="Browse the Collection" heading={name} tone={tone} />
        {description && (
          <p
            className={`mt-6 font-body leading-relaxed max-w-prose ${
              tone === 'ivory' ? 'text-gallery-brown' : 'text-gallery-cream/85'
            }`}
          >
            {description}
          </p>
        )}

        {paintings.length === 0 ? (
          <div
            className={`mt-12 border-l-[3px] border-gallery-gold pl-6 py-4 max-w-prose ${
              tone === 'ivory' ? 'text-gallery-brown-mid' : 'text-gallery-cream/80'
            }`}
          >
            <p className="font-editorial italic">
              Paintings for this gallery will appear here as we add them to the catalogue.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paintings.map((p) => (
              <PaintingCard key={p.id} painting={p} />
            ))}
          </div>
        )}

        {paintings.length > 0 && (
          <div
            className={`mt-10 border-l-[3px] border-gallery-gold pl-6 py-3 max-w-prose ${
              tone === 'ivory' ? 'text-gallery-brown-mid' : 'text-gallery-cream/80'
            }`}
          >
            <p className="font-body text-sm">{notice}</p>
          </div>
        )}

        {showRecentAcquisitionsCTA && (
          <div className="mt-12 border border-gallery-gold/30 bg-gallery-teal-deep/30 p-8 text-center">
            <h3 className="font-display font-semibold text-xl text-gallery-cream">Stay Current</h3>
            <p className="mt-3 font-body text-gallery-cream/85 max-w-prose mx-auto">
              Be the first to know when we acquire new works — subscribe in the footer or contact us
              to join our collector list.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="gold">
                Get on the List
              </Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
