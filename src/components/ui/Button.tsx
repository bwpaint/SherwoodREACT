import React from 'react'
import Link from 'next/link'
import { cn } from './cn'

type Variant = 'gold' | 'teal' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 font-body font-bold uppercase ' +
  'tracking-[0.08em] text-xs px-6 py-2.5 border transition-all duration-200 ' +
  'active:scale-[0.97] active:transition-transform active:duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-gold focus-visible:ring-offset-2'

const variants: Record<Variant, string> = {
  // Primary on dark backgrounds (handoff §7.6)
  gold:
    'bg-gallery-gold border-gallery-gold-dark text-gallery-espresso ' +
    'hover:bg-[#B8944A]',
  // Primary on ivory backgrounds
  teal:
    'bg-gallery-teal-dark border-gallery-teal-deep text-gallery-cream ' +
    'hover:bg-gallery-teal-deep',
  // Secondary on dark backgrounds
  ghost:
    'bg-transparent border-gallery-cream/50 text-gallery-cream ' +
    'hover:bg-gallery-cream/10',
}

type ButtonOwnProps = {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string
  }

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'gold', className, children, ...rest } = props

  const cls = cn(base, variants[variant], className)

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
