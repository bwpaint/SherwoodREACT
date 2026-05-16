import Link from 'next/link'
import { cn } from '@/components/ui/cn'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

type Painting = {
  id: number | string
  title: string
  slug?: string | null
  medium?: string | null
  dimensions?: string | null
  year?: number | null
  price?: number | null
  priceDisplay?: 'show' | 'inquire' | 'sold-price'
  status?: 'available' | 'sold' | 'on-hold' | 'reserved'
  artist?: { name?: string } | number | string | null
  images?: Array<{ image?: MediaLike }> | null
}

function formatPrice(price?: number | null): string | null {
  if (typeof price !== 'number') return null
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function PaintingCard({ painting }: { painting: Painting }) {
  const primary = painting.images?.[0]?.image
  const image: MediaLike = primary && typeof primary === 'object' ? primary : null
  const artistName =
    painting.artist && typeof painting.artist === 'object' && 'name' in painting.artist
      ? painting.artist.name
      : undefined
  const mediumLine = [painting.medium, painting.dimensions, painting.year ? String(painting.year) : null]
    .filter(Boolean)
    .join(' · ')
  const priceText =
    painting.priceDisplay === 'show' || painting.priceDisplay === 'sold-price'
      ? formatPrice(painting.price)
      : null
  const isSold = painting.status === 'sold'
  const inquireHref = `/contact?painting=${encodeURIComponent(painting.slug || String(painting.id))}&subject=${encodeURIComponent(`Inquiry: ${painting.title}`)}`

  return (
    <article
      className={cn(
        'group bg-gallery-ivory transition-all duration-200 ease-gallery-out',
        'hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(44,24,16,0.15)]',
      )}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        {image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt={image.alt || painting.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-gallery-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gallery-brown-light/30 via-gallery-brown-mid/40 to-gallery-brown/50 flex items-center justify-center">
            <span className="font-editorial italic text-gallery-cream/60 text-sm">Image coming soon</span>
          </div>
        )}
        {isSold && (
          <div className="absolute top-3 left-3 bg-gallery-espresso text-gallery-cream font-body font-bold text-[0.65rem] tracking-[0.18em] uppercase px-3 py-1">
            Sold
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-base text-gallery-espresso leading-snug">
          {painting.title}
        </h3>
        {artistName && (
          <p className="mt-1 font-editorial italic text-sm text-gallery-teal-dark">{artistName}</p>
        )}
        {mediumLine && (
          <p className="mt-2 font-body text-xs text-gallery-brown-light leading-relaxed">
            {mediumLine}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between gap-2">
          {priceText ? (
            <span className="font-body text-sm font-bold text-gallery-espresso">{priceText}</span>
          ) : (
            <span className="font-editorial italic text-sm text-gallery-brown-mid">
              {isSold ? 'Sold' : 'Price on request'}
            </span>
          )}
          {!isSold && (
            <Link
              href={inquireHref}
              className="font-body font-bold text-[0.7rem] tracking-[0.1em] uppercase text-gallery-teal-dark hover:text-gallery-gold-dark transition-colors"
            >
              Inquire →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
