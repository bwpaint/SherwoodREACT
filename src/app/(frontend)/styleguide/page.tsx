import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { Button } from '@/components/ui/Button'
import { GoldRule } from '@/components/ui/GoldRule'
import { RevealSection } from '@/components/ui/RevealSection'

const colors: Array<{ name: string; hex: string; usage: string; dark?: boolean }> = [
  { name: 'gallery-teal', hex: '#1AAFB0', usage: 'Primary background' },
  { name: 'gallery-teal-dark', hex: '#0E8B8B', usage: 'Section bands' },
  { name: 'gallery-teal-deep', hex: '#0A6B6B', usage: 'Footer, overlays' },
  { name: 'gallery-ivory', hex: '#FDF6EC', usage: 'Content bg', dark: true },
  { name: 'gallery-ivory-warm', hex: '#F5EDD8', usage: 'Alternate ivory', dark: true },
  { name: 'gallery-ivory-input', hex: '#FAF7F2', usage: 'Form inputs', dark: true },
  { name: 'gallery-gold', hex: '#C9A84C', usage: 'Accents, primary CTA', dark: true },
  { name: 'gallery-gold-dark', hex: '#A8893C', usage: 'Gold hover/border' },
  { name: 'gallery-gold-light', hex: '#E8C97A', usage: 'Gold text on dark' },
  { name: 'gallery-espresso', hex: '#2C1810', usage: 'Primary text on ivory' },
  { name: 'gallery-brown', hex: '#3D2B1A', usage: 'Body text on ivory' },
  { name: 'gallery-brown-mid', hex: '#5A3E2B', usage: 'Secondary text' },
  { name: 'gallery-brown-light', hex: '#7A5C44', usage: 'Tertiary text' },
  { name: 'gallery-cream', hex: '#FDF6EC', usage: 'Text on dark', dark: true },
]

export const metadata = {
  title: 'Style Guide',
  description: 'Internal design-system reference for Sherwood\'s Gallery.',
  robots: { index: false, follow: false },
}

export default function StyleguidePage() {
  return (
    <main className="bg-gallery-teal min-h-screen">
      {/* Page header */}
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="py-16">
          <EyebrowHeading eyebrow="Internal Reference" heading="Style Guide" tone="dark" />
          <p className="mt-6 max-w-prose text-gallery-cream/85 font-body">
            Design tokens and component primitives for Sherwood&apos;s Gallery. Verify here
            against the handoff PDF before building pages.
          </p>
        </Container>
      </section>

      {/* Colors */}
      <section className="bg-gallery-ivory py-20">
        <Container>
          <EyebrowHeading eyebrow="Section 4" heading="Color System" tone="ivory" />
          <RevealSection className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div key={c.name} className="border border-gallery-brown-light/20 bg-white">
                <div
                  className="h-24"
                  style={{ backgroundColor: c.hex }}
                  aria-label={`${c.name} swatch`}
                />
                <div className="p-3 font-body text-sm">
                  <div className="font-bold text-gallery-espresso">{c.name}</div>
                  <div className="text-gallery-brown-mid font-mono text-xs mt-1">{c.hex}</div>
                  <div className="text-gallery-brown-light text-xs mt-1">{c.usage}</div>
                </div>
              </div>
            ))}
          </RevealSection>
        </Container>
      </section>

      {/* Typography */}
      <section className="bg-gallery-teal-dark py-20">
        <Container>
          <EyebrowHeading eyebrow="Section 5" heading="Typography" tone="dark" />
          <div className="mt-10 space-y-8">
            <div>
              <div className="text-gallery-gold-light text-xs font-body uppercase tracking-widest mb-2">
                Hero H1 — Playfair Display 700
              </div>
              <h1 className="font-display font-bold text-gallery-cream text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
                Original Fine Art
              </h1>
            </div>

            <div>
              <div className="text-gallery-gold-light text-xs font-body uppercase tracking-widest mb-2">
                Section H2 — Playfair Display 700
              </div>
              <h2 className="font-display font-bold text-gallery-cream text-[clamp(1.75rem,3.5vw,2.75rem)]">
                Featured Artists
              </h2>
            </div>

            <div>
              <div className="text-gallery-gold-light text-xs font-body uppercase tracking-widest mb-2">
                Eyebrow — Cormorant Garamond italic
              </div>
              <span className="eyebrow text-gallery-gold-light">Houston, Texas · Est. 1981</span>
            </div>

            <div>
              <div className="text-gallery-gold-light text-xs font-body uppercase tracking-widest mb-2">
                Body — Lato 400
              </div>
              <p className="font-body text-gallery-cream/90 max-w-prose">
                At Sherwood&apos;s Gallery, we have been serving the discerning artist and
                collector since 1981. Located in Houston&apos;s Briargrove area near the famous
                Galleria district.
              </p>
            </div>

            <div>
              <div className="text-gallery-gold-light text-xs font-body uppercase tracking-widest mb-2">
                Caption — Cormorant Garamond italic small
              </div>
              <span className="font-editorial italic text-gallery-gold-light text-sm">
                Oil on canvas · 24" × 36"
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Buttons */}
      <section className="bg-gallery-ivory py-20">
        <Container>
          <EyebrowHeading eyebrow="Section 7.6" heading="Button Variants" tone="ivory" />
          <div className="mt-10 grid gap-8">
            <div>
              <div className="text-gallery-brown-mid text-xs font-body uppercase tracking-widest mb-3">
                Gold (primary on dark)
              </div>
              <div className="bg-gallery-teal-deep p-6 inline-block">
                <Button variant="gold">Explore the Galleries</Button>
              </div>
            </div>

            <div>
              <div className="text-gallery-brown-mid text-xs font-body uppercase tracking-widest mb-3">
                Teal (primary on ivory)
              </div>
              <Button variant="teal">Send Us a Message</Button>
            </div>

            <div>
              <div className="text-gallery-brown-mid text-xs font-body uppercase tracking-widest mb-3">
                Ghost (secondary on dark)
              </div>
              <div className="bg-gallery-teal-deep p-6 inline-block">
                <Button variant="ghost">Our Story</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Gold Rule */}
      <section className="bg-gallery-ivory-warm py-20">
        <Container>
          <EyebrowHeading eyebrow="Detail" heading="Gold Rule" tone="ivory" />
          <div className="mt-10 space-y-4">
            <div>
              <span className="text-gallery-brown-mid text-xs font-body uppercase tracking-widest mb-2 block">
                Default 60px
              </span>
              <GoldRule />
            </div>
            <div>
              <span className="text-gallery-brown-mid text-xs font-body uppercase tracking-widest mb-2 block">
                40px
              </span>
              <GoldRule width={40} />
            </div>
            <div>
              <span className="text-gallery-brown-mid text-xs font-body uppercase tracking-widest mb-2 block">
                120px
              </span>
              <GoldRule width={120} />
            </div>
          </div>
        </Container>
      </section>

      {/* Eyebrow Heading variants */}
      <section className="bg-gallery-teal py-20">
        <Container>
          <EyebrowHeading
            eyebrow="Pattern"
            heading="Eyebrow Heading"
            tone="dark"
            align="left"
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="bg-gallery-ivory p-8">
              <EyebrowHeading
                eyebrow="On Ivory"
                heading="Featured Artists"
                tone="ivory"
                align="left"
              />
            </div>
            <div className="bg-gallery-teal-deep p-8">
              <EyebrowHeading
                eyebrow="Centered"
                heading="Welcome to Sherwood&rsquo;s"
                tone="dark"
                align="center"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Reveal demo */}
      <section className="bg-gallery-ivory py-20">
        <Container>
          <EyebrowHeading eyebrow="Animation" heading="Reveal On Scroll" tone="ivory" />
          <p className="mt-4 max-w-prose font-body text-gallery-brown">
            Each tile fades up with a staggered delay. Toggle &ldquo;reduce motion&rdquo; in your
            OS to verify the animations skip.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[0, 80, 160, 240].map((delay) => (
              <RevealSection
                key={delay}
                delay={delay}
                className="bg-gallery-teal-dark p-6 text-gallery-cream text-center font-body text-sm"
              >
                delay={delay}ms
              </RevealSection>
            ))}
          </div>
        </Container>
      </section>

      <footer className="bg-gallery-teal-deep border-t-[3px] border-gallery-gold py-8">
        <Container>
          <p className="text-gallery-cream/75 font-body text-xs">
            Internal style guide · not indexed by search engines.
          </p>
        </Container>
      </footer>
    </main>
  )
}
