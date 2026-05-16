import Link from 'next/link'
import { cn } from '@/components/ui/cn'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

export function PostCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  className,
}: {
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: MediaLike
  publishedAt?: string | Date | null
  className?: string
}) {
  const date = publishedAt ? new Date(publishedAt) : null
  const dateLabel = date
    ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'group block bg-gallery-ivory transition-all duration-200 ease-gallery-out',
        'hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(44,24,16,0.15)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-gold focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="relative overflow-hidden aspect-[3/2]">
        {coverImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage.url}
            alt={coverImage.alt || title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-gallery-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gallery-teal-deep via-gallery-teal-dark to-gallery-teal" />
        )}
      </div>
      <div className="p-5 pb-6">
        {dateLabel && (
          <p className="font-body font-bold text-[0.65rem] uppercase tracking-[0.15em] text-gallery-teal-dark">
            {dateLabel}
          </p>
        )}
        <h3 className="mt-2 font-display font-semibold text-xl text-gallery-espresso leading-snug">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-3 font-body text-sm text-gallery-brown-mid leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 font-body font-bold text-[0.7rem] uppercase tracking-[0.1em] text-gallery-teal-dark">
          Read More <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}
