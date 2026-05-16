import React from 'react'
import type { Metadata } from 'next'
import { Playfair_Display, Lato, Cormorant_Garamond } from 'next/font/google'
import './styles.css'
import { getSiteSettings } from '@/lib/payload'
import { Navigation } from '@/components/site/Navigation'
import { Footer } from '@/components/site/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-body',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Sherwood's Gallery — Original Fine Art, Houston, Texas",
    template: "%s — Sherwood's Gallery",
  },
  description:
    "Houston's premier fine art gallery since 1981. Original oil paintings, watercolors, bluebonnet art, landscapes, and expert archival framing in the Briargrove area.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const hours = (settings.contact?.hours || []) as Array<{ days: string; hours: string }>

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Navigation
          tagline={settings.tagline}
          phone={settings.contact?.phone}
          email={settings.contact?.email}
        />
        <main className="flex-1">{children}</main>
        <Footer
          phone={settings.contact?.phone}
          email={settings.contact?.email}
          address={settings.contact?.address}
          hours={hours}
          copyright={settings.copyright}
        />
      </body>
    </html>
  )
}
