import Link from 'next/link'
import { cn } from '@/components/ui/cn'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

export function GalleryCard({
  title,
  description,
  image,
  href,
  className,
}: {
  title: string
  description?: string | null
  image?: MediaLike
  href: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group block bg-gallery-ivory transition-all duration-200 ease-gallery-out',
        'hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(44,24,16,0.15)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-gold focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        {image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt={image.alt || title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-gallery-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gallery-teal-deep via-gallery-teal-dark to-gallery-teal-deep transition-transform duration-500 ease-gallery-out group-hover:scale-105" />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-gallery-teal-dark/50 via-transparent to-transparent pointer-events-none"
        />
      </div>
      <div className="p-5 pb-6">
        <h3 className="font-display font-semibold text-lg text-gallery-espresso">{title}</h3>
        {description && (
          <p className="mt-2 font-body text-sm text-gallery-brown-mid leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 font-body font-bold text-xs uppercase tracking-[0.1em] text-gallery-teal-dark">
          View Gallery <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}
