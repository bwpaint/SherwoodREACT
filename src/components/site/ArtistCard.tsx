import Link from 'next/link'
import { cn } from '@/components/ui/cn'

type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

export function ArtistCard({
  name,
  specialty,
  portrait,
  bioSnippet,
  href,
  aspect = 'aspect-[3/4]',
  className,
}: {
  name: string
  specialty?: string
  portrait?: MediaLike
  bioSnippet?: string
  /** If undefined, card renders as a non-clickable static element. */
  href?: string
  aspect?: string
  className?: string
}) {
  const interactive = !!href

  const containerClass = cn(
    'block bg-gallery-ivory transition-all duration-200 ease-gallery-out',
    interactive && [
      'group',
      'hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(44,24,16,0.15)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-gold focus-visible:ring-offset-2',
    ],
    className,
  )

  const inner = (
    <>
      <div className={cn('relative overflow-hidden border-b-[3px] border-gallery-gold', aspect)}>
        {portrait?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait.url}
            alt={portrait.alt || name}
            className={cn(
              'absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-gallery-out',
              interactive && 'group-hover:scale-105',
            )}
            style={{ filter: 'sepia(10%) saturate(90%)' }}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gallery-brown-light/40 to-gallery-brown-mid/60 flex items-center justify-center">
            <span className="font-display font-bold text-gallery-cream/60 text-3xl">
              {name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-gallery-espresso">{name}</h3>
        {specialty && (
          <p className="mt-1 font-editorial italic text-sm text-gallery-teal-dark">{specialty}</p>
        )}
        {bioSnippet && (
          <p className="mt-3 font-body text-[0.8rem] text-gallery-brown-mid leading-relaxed line-clamp-3">
            {bioSnippet}
          </p>
        )}
      </div>
    </>
  )

  if (interactive) {
    return (
      <Link href={href!} className={containerClass}>
        {inner}
      </Link>
    )
  }

  return <div className={containerClass}>{inner}</div>
}
