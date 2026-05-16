import React from 'react'
import { cn } from './cn'
import { GoldRule } from './GoldRule'

/**
 * Three-part heading pattern from handoff §5:
 * 1. Italic Cormorant eyebrow (gold on dark, teal on ivory)
 * 2. Playfair H2 in primary text color
 * 3. 50–60px gold rule, left-aligned
 */
export function EyebrowHeading({
  eyebrow,
  heading,
  tone = 'dark',
  align = 'left',
  className,
  as: Tag = 'h2',
}: {
  eyebrow: string
  heading: React.ReactNode
  tone?: 'dark' | 'ivory'
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const eyebrowColor = tone === 'dark' ? 'text-gallery-gold-light' : 'text-gallery-teal-dark'
  const headingColor = tone === 'dark' ? 'text-gallery-cream' : 'text-gallery-espresso'
  const items = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={cn('flex flex-col gap-4', items, className)}>
      <span className={cn('eyebrow', eyebrowColor)}>{eyebrow}</span>
      <Tag
        className={cn(
          'font-display font-bold leading-[1.1] text-[clamp(1.75rem,3.5vw,2.75rem)]',
          headingColor,
        )}
      >
        {heading}
      </Tag>
      <GoldRule />
    </div>
  )
}
