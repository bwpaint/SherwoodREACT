import { cn } from './cn'

export function GoldRule({
  width = 60,
  className,
}: {
  width?: number
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('block h-[2px] bg-gallery-gold', className)}
      style={{ width: `${width}px` }}
    />
  )
}
