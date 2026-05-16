/**
 * Seed script — populates dev/prod DB with baseline content.
 *
 * Run:    node --import tsx scripts/seed.ts
 * Reset:  node --import tsx scripts/seed.ts --reset
 *
 * The seed is idempotent: re-running without --reset will skip existing rows
 * (matched by slug/email). With --reset, it deletes everything in the seeded
 * collections first.
 */

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'

const RESET = process.argv.includes('--reset')

const artistsSeed = [
  {
    name: 'Stacy Barter',
    specialty: [{ tag: 'Landscape' }, { tag: 'Bluebonnet' }, { tag: 'Texas Wildflowers' }],
    medium: 'Oil on Canvas & Linen',
    bio: 'Stacy Barter is celebrated for her luminous Texas landscapes that capture the spirit of the Hill Country and coastal prairies. Her work is characterized by a masterful use of natural light, with warm golden tones that seem to radiate from within the canvas.',
    isFeatured: true,
    order: 10,
  },
  {
    name: 'Peggy Byars',
    specialty: [{ tag: 'Landscape' }, { tag: 'Impressionist' }, { tag: 'Bluebonnet' }],
    medium: 'Oil on Canvas & Watercolor',
    bio: "Texas artist Peggy Byars has been a professional artist since 1976. She feels that a work of art should involve the total person. Peggy's illumination technique, or 'glow,' is the trademark of all her work.",
    isFeatured: true,
    order: 20,
  },
  {
    name: 'Elio Camacho',
    specialty: [{ tag: 'Figurative' }, { tag: 'Portrait' }, { tag: 'Still Life' }],
    medium: 'Oil on Canvas & Linen',
    bio: 'Elio Camacho explores the endless possibilities of the human form and figurative composition. His work is marked by a deep sensitivity to light and shadow, and a classical approach to the figure.',
    isFeatured: true,
    order: 30,
  },
  {
    name: 'Boz Draka',
    specialty: [{ tag: 'Landscape' }, { tag: 'Seascape' }, { tag: 'Western' }],
    medium: 'Oil on Canvas',
    bio: 'Boz Draka is celebrated for his dramatic use of light and atmospheric depth in sweeping Texas and coastal landscapes.',
    isFeatured: true,
    order: 40,
  },
]

const galleriesSeed = [
  {
    name: 'Bluebonnet Gallery',
    description: "Texas's beloved state flower captured in breathtaking oil and watercolor paintings by our finest artists.",
    order: 10,
  },
  {
    name: 'Figurative Gallery',
    description: 'Masterful portraits and figurative works exploring the human form with elegance and emotional depth.',
    order: 20,
  },
  {
    name: 'Landscape Gallery',
    description: 'Sweeping vistas of Texas Hill Country, coastal scenes, and open plains rendered in rich oils.',
    order: 30,
  },
  {
    name: 'Miniatures Gallery',
    description: "Exquisite small-format works of remarkable detail — a collector's treasure in every brushstroke.",
    order: 40,
  },
  {
    name: 'Recent Acquisitions',
    description: 'Newly arrived works fresh to the gallery — discover the latest additions to our collection.',
    order: 50,
  },
]

const pagesSeed = [
  {
    title: 'Home',
    slug: 'home',
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Houston, Texas · Est. 1981',
        headlineLine1: 'Original Fine Art',
        headlineLine2: 'for Discerning Collectors',
        subheadline:
          "Step into Sherwood's Gallery — a Houston institution since 1981, showcasing acclaimed Texas artists, evocative oil paintings, and a tradition of expert archival framing.",
        primaryCta: { label: 'Explore the Galleries', href: '/galleries' },
        secondaryCta: { label: 'Visit Us', href: '/contact' },
      },
      {
        blockType: 'textBlock',
        eyebrow: 'Welcome',
        heading: "Welcome to Sherwood's Gallery",
        background: 'teal-dark',
      },
    ],
  },
  {
    title: 'Our History',
    slug: 'history',
    layout: [
      {
        blockType: 'blockquote',
        quote:
          'We believe that art plays an important role in our lives and we are committed to helping those who enjoy and want to preserve its creation.',
        attribution: "— Sherwood P. McCall III, President, Sherwood's Gallery, Inc.",
      },
      {
        blockType: 'timeline',
        eyebrow: 'Five Decades',
        heading: 'Milestones',
        milestones: [
          { year: '1967', title: 'A Passion for Art Begins', body: 'Sherwood McCall begins collecting fine art and develops a deep appreciation for the Texas landscape tradition.' },
          { year: '1981', title: "Sherwood's Gallery is Founded", body: 'The gallery opens its doors in the Briargrove area of Houston, near the Galleria.' },
          { year: '1990s', title: 'Expanding the Collection', body: 'The gallery grows to represent dozens of Texas and Southwestern artists.' },
          { year: '2000s', title: 'Entering the Digital Age', body: 'The gallery launches its first website and begins serving collectors nationwide.' },
          { year: 'Today', title: 'A Houston Institution', body: 'After more than four decades, the gallery remains a destination for collectors of original Texas fine art.' },
        ],
      },
    ],
  },
  {
    title: 'Contact Us',
    slug: 'contact',
    layout: [
      {
        blockType: 'textBlock',
        eyebrow: 'Get in Touch',
        heading: "We'd love to hear from you",
        background: 'ivory',
      },
    ],
  },
]

async function seed() {
  console.log(`\nSeeding Sherwood's Gallery (${RESET ? 'reset mode' : 'idempotent mode'})...`)

  const payload = await getPayload({ config: payloadConfig })

  if (RESET) {
    console.log('  Resetting seeded collections...')
    for (const slug of ['paintings', 'pages', 'artists', 'galleries'] as const) {
      const existing = await payload.find({ collection: slug, limit: 1000, depth: 0 })
      for (const row of existing.docs) {
        await payload.delete({ collection: slug, id: row.id })
      }
    }
  }

  // --- Artists ---
  const artistIdsByName: Record<string, number | string> = {}
  for (const a of artistsSeed) {
    const existing = await payload.find({
      collection: 'artists',
      where: { name: { equals: a.name } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      artistIdsByName[a.name] = existing.docs[0].id
      console.log(`  · Artist exists: ${a.name}`)
      continue
    }
    const created = await payload.create({
      collection: 'artists',
      data: a,
    })
    artistIdsByName[a.name] = created.id
    console.log(`  + Artist created: ${a.name}`)
  }

  // --- Galleries ---
  const galleryIdsByName: Record<string, number | string> = {}
  for (const g of galleriesSeed) {
    const existing = await payload.find({
      collection: 'galleries',
      where: { name: { equals: g.name } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      galleryIdsByName[g.name] = existing.docs[0].id
      console.log(`  · Gallery exists: ${g.name}`)
      continue
    }
    const created = await payload.create({
      collection: 'galleries',
      data: g,
    })
    galleryIdsByName[g.name] = created.id
    console.log(`  + Gallery created: ${g.name}`)
  }

  // --- Pages ---
  for (const p of pagesSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: p.slug } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      console.log(`  · Page exists: ${p.slug}`)
      continue
    }
    await payload.create({
      collection: 'pages',
      // The blocks field requires a discriminator 'blockType'; cast through unknown to satisfy
      // generated types until tsx runs the script in dev.
      data: p as unknown as Parameters<typeof payload.create>[0]['data'],
    })
    console.log(`  + Page created: ${p.slug}`)
  }

  // --- SiteSettings global ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      tagline: "Serving Houston's Discerning Collectors Since 1981",
    },
  })
  console.log('  · SiteSettings ensured')

  console.log('\nSeed complete.\n')
  console.log('Next steps:')
  console.log('  1. Open http://localhost:3000/admin')
  console.log('  2. Upload portrait images to each artist')
  console.log('  3. Create paintings linking artists ↔ galleries (with images)\n')

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
