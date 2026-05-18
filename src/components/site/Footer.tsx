import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { NewsletterSignup } from './NewsletterSignup'

type Hours = { days: string; hours: string }

type Props = {
  phone?: string
  email?: string
  address?: { street?: string; city?: string; state?: string; zip?: string; area?: string }
  hours?: Hours[]
  copyright?: string
}

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/galleries', label: 'Art Galleries' },
  { href: '/artists', label: 'Artists' },
  { href: '/picture-framing', label: 'Picture Framing' },
  { href: '/history', label: 'History' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
]

export function Footer({ phone, email, address, hours, copyright }: Props) {
  const year = new Date().getFullYear()
  const fullAddress = address
    ? [address.street, [address.city, address.state, address.zip].filter(Boolean).join(', ')]
        .filter(Boolean)
        .join(' · ')
    : ''

  return (
    <footer className="bg-gallery-teal-deep border-t-[3px] border-gallery-gold mt-12">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-display font-bold text-2xl text-gallery-cream">
              Sherwood&apos;s Gallery
            </h3>
            <p className="font-editorial italic text-gallery-gold-light text-sm tracking-[0.1em] mt-2">
              Original Fine Art · Houston, Texas
            </p>
            <p className="font-body text-gallery-cream/75 text-sm mt-4 max-w-prose">
              Serving Houston&apos;s discerning artists and collectors since 1981. Original oil
              paintings, watercolors, and expert archival picture framing in the Briargrove area.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="font-body font-bold text-gallery-gold-light text-xs uppercase tracking-[0.15em]">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-gallery-cream/85 hover:text-gallery-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <NewsletterSignup />

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-body font-bold text-gallery-gold-light text-xs uppercase tracking-[0.15em]">
              Visit · Contact
            </h4>
            <address className="not-italic mt-4 space-y-2 font-body text-sm text-gallery-cream/85">
              {fullAddress && <p>{fullAddress}</p>}
              {phone && (
                <p>
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-gallery-gold">
                    {phone}
                  </a>
                </p>
              )}
              {email && (
                <p>
                  <a href={`mailto:${email}`} className="hover:text-gallery-gold">
                    {email}
                  </a>
                </p>
              )}
              {hours && hours.length > 0 && (
                <div className="pt-2">
                  <span className="block text-gallery-gold-light text-[0.7rem] font-bold uppercase tracking-[0.15em] mb-1">
                    Hours
                  </span>
                  {hours.map((h, i) => (
                    <p key={i}>
                      <span className="text-gallery-cream/85">{h.days}: </span>
                      <span className="text-gallery-cream">{h.hours}</span>
                    </p>
                  ))}
                </div>
              )}
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gallery-cream/15 text-center font-body text-xs text-gallery-cream/65">
          © {year} {copyright || "Sherwood's Gallery, Inc. · All Rights Reserved"}
        </div>
      </Container>
    </footer>
  )
}
