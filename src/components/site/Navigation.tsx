'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/components/ui/cn'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/galleries', label: 'Art Galleries' },
  { href: '/artists', label: 'Artists' },
  { href: '/picture-framing', label: 'Picture Framing' },
  { href: '/history', label: 'History' },
  { href: '/contact', label: 'Contact Us' },
]

type Props = {
  tagline?: string
  phone?: string
  email?: string
}

export function Navigation({ tagline, phone, email }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-shadow',
        scrolled && 'shadow-[0_2px_12px_rgba(0,0,0,0.15)]',
      )}
    >
      {/* Top bar */}
      <div className="bg-gallery-teal-dark">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gallery-cream font-body text-[0.8rem] py-1.5 gap-0.5 sm:gap-4">
            {tagline && <span className="opacity-95">{tagline}</span>}
            <div className="flex gap-4 opacity-95">
              {phone && (
                <span className="flex items-center gap-1.5">
                  <span aria-hidden>☎</span>
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-gallery-gold">
                    {phone}
                  </a>
                </span>
              )}
              {email && (
                <span className="hidden sm:flex items-center gap-1.5">
                  <span aria-hidden>✉</span>
                  <a href={`mailto:${email}`} className="hover:text-gallery-gold">
                    {email}
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <nav className="bg-gallery-teal">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-tight">
              <span className="font-display font-bold text-gallery-cream text-2xl">
                Sherwoods Gallery
              </span>
              <span className="font-body font-bold text-gallery-gold-light text-[0.6rem] tracking-[0.15em] uppercase">
                Original Fine Art · Houston, Texas
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'font-body font-bold text-xs uppercase tracking-[0.1em] transition-colors',
                      isActive(link.href)
                        ? 'text-gallery-gold'
                        : 'text-gallery-cream hover:text-gallery-gold',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
              className="lg:hidden text-gallery-cream w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-gold"
            >
              <span
                className={cn(
                  'block h-0.5 w-6 bg-current transition-transform',
                  open && 'translate-y-2 rotate-45',
                )}
              />
              <span
                className={cn('block h-0.5 w-6 bg-current transition-opacity', open && 'opacity-0')}
              />
              <span
                className={cn(
                  'block h-0.5 w-6 bg-current transition-transform',
                  open && '-translate-y-2 -rotate-45',
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav"
          hidden={!open}
          className="lg:hidden bg-gallery-teal-deep border-t border-gallery-teal-dark"
        >
          <ul className="mx-auto max-w-[1280px] px-4 sm:px-6 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block py-3 px-2 font-body font-bold text-sm uppercase tracking-[0.1em] transition-colors rounded-sm',
                    isActive(link.href)
                      ? 'text-gallery-gold'
                      : 'text-gallery-cream hover:bg-gallery-teal-dark hover:text-gallery-gold',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
