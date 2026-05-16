import { cn } from '@/components/ui/cn'

export function GalleryPills({
  pills,
  className,
}: {
  pills: Array<{ slug: string; name: string }>
  className?: string
}) {
  if (pills.length === 0) return null
  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {pills.map((p) => (
        <li key={p.slug}>
          <a
            href={`#${p.slug}`}
            className={cn(
              'inline-block bg-gallery-gold border border-gallery-gold-dark text-gallery-espresso',
              'font-body font-bold text-xs uppercase tracking-[0.1em] px-4 py-1.5',
              'transition-colors hover:bg-gallery-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-cream focus-visible:ring-offset-2',
            )}
          >
            {p.name}
          </a>
        </li>
      ))}
    </ul>
  )
}
