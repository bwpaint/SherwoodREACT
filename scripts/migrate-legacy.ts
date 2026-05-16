/**
 * Legacy content migration — sherwoodsgallery.com (Dreamweaver) → Payload CMS
 *
 * Scrapes the live site, downloads images, and imports into the local Payload DB.
 *
 * Run:      node --env-file=.env --import tsx scripts/migrate-legacy.ts
 * Dry run:  node --env-file=.env --import tsx scripts/migrate-legacy.ts --dry-run
 */

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'

const DRY_RUN = process.argv.includes('--dry-run')
const BASE = 'https://www.sherwoodsgallery.com'
const DELAY_MS = 400 // polite crawl delay between requests

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface PaintingScrape {
  title: string
  artistName: string
  dimensions: string
  medium: string
  thumbUrl: string
  fullUrl: string
  altText: string
  galleries: string[] // populated after gallery scrape
}

interface ArtistScrape {
  name: string
  bioUrl: string
  portraitUrl: string
  bio: string
  medium: string
  paintings: PaintingScrape[]
}

interface GalleryScrape {
  name: string
  imageKeys: string[] // normalised image path keys (no size suffix)
}

// ─────────────────────────────────────────────────────────────
// FETCH HELPERS
// ─────────────────────────────────────────────────────────────

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'content-migrator/1.0 (sherwoodsgallery.com)' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`)
  return res.text()
}

async function fetchBinary(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'content-migrator/1.0 (sherwoodsgallery.com)' },
    })
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  } catch {
    return null
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─────────────────────────────────────────────────────────────
// HTML UTILITIES
// ─────────────────────────────────────────────────────────────

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function decode(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/gi, ' ')
    .trim()
}

/** artists/barter/copteaworandros@150.jpg → artists/barter/copteaworandros */
function imageKey(url: string): string {
  return url
    .replace(/^https?:\/\/[^/]+\//, '')
    .replace(/@\d+w?\.jpg$/i, '')
    .toLowerCase()
}

function mimeType(url: string): string {
  if (/\.png$/i.test(url)) return 'image/png'
  if (/\.gif$/i.test(url)) return 'image/gif'
  if (/\.webp$/i.test(url)) return 'image/webp'
  return 'image/jpeg'
}

function basename(url: string): string {
  return url.split('/').pop()?.split('?')[0] ?? 'image.jpg'
}

// ─────────────────────────────────────────────────────────────
// SCRAPING
// ─────────────────────────────────────────────────────────────

async function scrapeArtistList(): Promise<Array<{ name: string; bioUrl: string }>> {
  const html = await fetchHtml(`${BASE}/artists.html`)
  const found = new Map<string, string>() // name → url

  // Match bio page links with visible text (artist names)
  const re = /href="([^"]*bio[^"]*\.html?)"[^>]*>([A-Z][^<]{2,40})</gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const href = m[1].trim()
    const name = decode(m[2].trim())
    // Skip image alt text false-positives and navigation links
    if (!name || name.toLowerCase().includes('gallery') || name.toLowerCase().includes('sherwood')) continue
    if (!found.has(name)) {
      found.set(name, `${BASE}/${href}`)
    }
  }

  return Array.from(found.entries()).map(([name, bioUrl]) => ({ name, bioUrl }))
}

async function scrapeArtistBio(info: { name: string; bioUrl: string }): Promise<ArtistScrape> {
  const html = await fetchHtml(info.bioUrl)

  // Portrait — look for [folder]portrait@NNN.jpg
  const portraitM = html.match(/src="(artists\/[^/]+\/[^"]*portrait[^"]*\.jpg)"/i)
  const portraitUrl = portraitM ? `${BASE}/${portraitM[1]}` : ''

  // Bio text — find the longest <td> text block that reads like a bio
  let bio = ''
  const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi
  let tdM: RegExpExecArray | null
  while ((tdM = tdRe.exec(html)) !== null) {
    const cellHtml2 = tdM[1].replace(/<br\s*\/?>/gi, ' ').replace(/<p[^>]*>/gi, ' ')
    const text = decode(stripTags(cellHtml2)).replace(/\s+/g, ' ')
    if (
      text.length > bio.length &&
      text.length > 200 &&
      !text.startsWith('"') &&
      !/^\s*our artists/i.test(text) &&
      !/^\s*home\s*\|/i.test(text) &&
      !/^art@/i.test(text)
    ) {
      bio = text
    }
  }

  // Paintings — each painting is: <a href="...@450.jpg"><img src="...@150.jpg" alt="Title"></a>
  // followed immediately by a sibling <td> with "Title\nArtist\nDimensions\nMedium"
  const paintings: PaintingScrape[] = []

  const paintingRe =
    /<a\s+href="(artists\/[^"]*@\d+\w*\.jpg)"[^>]*>\s*<img\s+src="(artists\/[^"]*@\d+\w*\.jpg)"\s+alt="([^"]*)"[^>]*>\s*<\/a>/gi
  let p: RegExpExecArray | null

  while ((p = paintingRe.exec(html)) !== null) {
    const fullUrl = `${BASE}/${p[1]}`
    const thumbUrl = `${BASE}/${p[2]}`
    const altText = decode(p[3])

    // The <a><img></a> block sits inside the first <td> (image cell).
    // We need to skip past the closing </td> of that cell to reach the sibling text <td>.
    const after = html.slice(p.index + p[0].length, p.index + p[0].length + 1400)
    const firstTdClose = after.indexOf('</td>')
    const afterImageCell = firstTdClose >= 0 ? after.slice(firstTdClose + 5) : after
    const cellM = afterImageCell.match(/<td[^>]*>([\s\S]*?)<\/td>/i)
    // Split on <br> first, then strip tags per line — preserves newlines that stripTags would collapse
    const cellHtml = cellM ? cellM[1] : ''
    const lines = cellHtml
      .split(/<br\s*\/?>/gi)
      .map(chunk => decode(chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()))
      .filter(Boolean)

    // First line is title (may be in quotes)
    const title = (lines[0] ?? altText).replace(/^["""'']+|["""'']+$/g, '').trim() || altText

    let dimensions = ''
    let medium = ''
    let artistName = info.name

    for (let i = 1; i < lines.length; i++) {
      const ln = lines[i]
      if (!dimensions && /\d+["''x×]/.test(ln)) {
        dimensions = ln
      } else if (!medium && /(oil|watercolor|acrylic|pastel|canvas|linen|panel|board|bronze|print)/i.test(ln)) {
        medium = ln
      } else if (!artistName && /^[A-Z][a-z]+ [A-Z]/.test(ln)) {
        artistName = ln
      }
    }

    // Deduplicate by fullUrl
    if (!paintings.find(x => x.fullUrl === fullUrl)) {
      paintings.push({ title, artistName, dimensions, medium, thumbUrl, fullUrl, altText, galleries: [] })
    }
  }

  // Infer medium from the collection of paintings on this page
  const mediumFreq: Record<string, number> = {}
  for (const pt of paintings) {
    if (pt.medium) mediumFreq[pt.medium] = (mediumFreq[pt.medium] ?? 0) + 1
  }
  const topMedium = Object.entries(mediumFreq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? ''

  return { name: info.name, bioUrl: info.bioUrl, portraitUrl, bio, medium: topMedium, paintings }
}

async function scrapeGallery(name: string, filename: string): Promise<GalleryScrape> {
  const html = await fetchHtml(`${BASE}/${filename}`)
  const keys: string[] = []
  const seenKeys = new Set<string>()

  const re = /src="(artists\/[^"]*@\d+\w*\.jpg)"/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const key = imageKey(m[1])
    if (!seenKeys.has(key)) {
      seenKeys.add(key)
      keys.push(key)
    }
  }

  return { name, imageKeys: keys }
}

// ─────────────────────────────────────────────────────────────
// RICH TEXT (Payload Lexical)
// ─────────────────────────────────────────────────────────────

function makeLexical(text: string): unknown {
  const paragraphs = text
    .split(/\n\n+|\.\s{2,}(?=[A-Z])/)
    .map(p => p.trim())
    .filter(p => p.length > 20)
    .slice(0, 20) // guard against run-on bio text

  if (paragraphs.length === 0) paragraphs.push(text.slice(0, 2000))

  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: paragraphs.map(p => ({
        type: 'paragraph',
        version: 1,
        direction: 'ltr',
        format: '',
        indent: 0,
        children: [{ type: 'text', version: 1, text: p, detail: 0, format: 0, mode: 'normal', style: '' }],
      })),
    },
  }
}

// ─────────────────────────────────────────────────────────────
// GALLERY METADATA
// ─────────────────────────────────────────────────────────────

const GALLERY_PAGES = [
  { name: 'Bluebonnet Gallery',  file: 'bluebonnet.html' },
  { name: 'Figurative Gallery',  file: 'figurative.html' },
  { name: 'Landscape Gallery',   file: 'landscapes.html' },
  { name: 'Miniatures Gallery',  file: 'miniatures.html' },
  { name: 'Sculpture Gallery',   file: 'sculpture.html' },
  { name: 'Seascape Gallery',    file: 'seascape.html' },
  { name: 'Still Life Gallery',  file: 'stilllifes.html' },
  { name: 'Watercolor Gallery',  file: 'watercolor.html' },
  { name: 'Western Gallery',     file: 'western.html' },
  { name: 'Recent Acquisitions', file: 'recent.html' },
]

const GALLERY_DESCRIPTIONS: Record<string, string> = {
  'Bluebonnet Gallery':  "Texas's beloved state flower captured in breathtaking oil and watercolor paintings by our finest artists.",
  'Figurative Gallery':  'Masterful portraits and figurative works exploring the human form with elegance and emotional depth.',
  'Landscape Gallery':   'Sweeping vistas of Texas Hill Country, coastal scenes, and open plains rendered in rich oils.',
  'Miniatures Gallery':  "Exquisite small-format works of remarkable detail — a collector's treasure in every brushstroke.",
  'Sculpture Gallery':   'Bronze and mixed-media three-dimensional works from celebrated Texas and Southwestern artists.',
  'Seascape Gallery':    'Coastal scenes and maritime paintings capturing the power and tranquility of the open sea.',
  'Still Life Gallery':  'Timeless arrangements of flowers, fruit, and everyday objects rendered with extraordinary technique.',
  'Watercolor Gallery':  "Luminous watercolor works showcasing the medium's unique transparency and spontaneity.",
  'Western Gallery':     'The American West brought to life — cowboys, horses, and wide-open skies.',
  'Recent Acquisitions': 'Newly arrived works fresh to the gallery — discover the latest additions to our collection.',
}

const GALLERY_ORDER: Record<string, number> = {
  'Bluebonnet Gallery': 10,  'Figurative Gallery': 20,  'Landscape Gallery': 30,
  'Miniatures Gallery': 40,  'Sculpture Gallery': 50,   'Seascape Gallery': 60,
  'Still Life Gallery': 70,  'Watercolor Gallery': 80,  'Western Gallery': 90,
  'Recent Acquisitions': 100,
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

async function migrate() {
  console.log("\n╔═══════════════════════════════════════════╗")
  console.log("║  Sherwood's Gallery — Legacy Migration    ║")
  console.log("╚═══════════════════════════════════════════╝")
  console.log(DRY_RUN ? '  Mode: DRY RUN (no DB writes)\n' : '  Mode: LIVE\n')

  // ── 1. Artist list ──────────────────────────────────────────
  console.log('[1] Scraping artist list from artists.html...')
  const artistList = await scrapeArtistList()
  console.log(`    Found ${artistList.length} artists: ${artistList.map(a => a.name).join(', ')}\n`)

  // ── 2. Artist bio pages ─────────────────────────────────────
  console.log('[2] Scraping artist bio pages...')
  const artistData: ArtistScrape[] = []
  for (const info of artistList) {
    try {
      const data = await scrapeArtistBio(info)
      artistData.push(data)
      console.log(
        `    ✓ ${data.name}: ${data.paintings.length} paintings` +
        (data.portraitUrl ? ', portrait ✓' : ', NO portrait')
      )
    } catch (err) {
      console.warn(`    ✗ ${info.name}: ${err}`)
    }
    await sleep(DELAY_MS)
  }

  const totalPaintings = artistData.reduce((s, a) => s + a.paintings.length, 0)
  console.log(`\n    Total paintings found: ${totalPaintings}\n`)

  // ── 3. Gallery pages ────────────────────────────────────────
  console.log('[3] Scraping gallery pages...')
  const galleryData: GalleryScrape[] = []
  for (const gp of GALLERY_PAGES) {
    try {
      const data = await scrapeGallery(gp.name, gp.file)
      galleryData.push(data)
      console.log(`    ✓ ${gp.name}: ${data.imageKeys.length} images`)
    } catch (err) {
      console.warn(`    ✗ ${gp.name}: ${err}`)
    }
    await sleep(DELAY_MS)
  }

  // ── 4. Build painting → gallery map ─────────────────────────
  console.log('\n[4] Cross-referencing paintings with galleries...')
  const keyToGalleries = new Map<string, string[]>()
  for (const gallery of galleryData) {
    for (const key of gallery.imageKeys) {
      if (!keyToGalleries.has(key)) keyToGalleries.set(key, [])
      keyToGalleries.get(key)!.push(gallery.name)
    }
  }

  let mapped = 0
  for (const artist of artistData) {
    for (const painting of artist.paintings) {
      const key = imageKey(painting.fullUrl)
      const thumbKey = imageKey(painting.thumbUrl)
      const galleries = keyToGalleries.get(key) ?? keyToGalleries.get(thumbKey) ?? []
      painting.galleries = galleries
      if (galleries.length > 0) mapped++
    }
  }
  console.log(`    ${mapped}/${totalPaintings} paintings mapped to galleries\n`)

  if (DRY_RUN) {
    console.log('═══ DRY RUN SUMMARY ════════════════════════')
    for (const a of artistData) {
      console.log(`  ${a.name} (${a.paintings.length} paintings)`)
      for (const p of a.paintings) {
        console.log(`    · "${p.title}" — ${p.medium || '?'} ${p.dimensions || ''} → [${p.galleries.join(', ') || 'unmapped'}]`)
      }
    }
    console.log('\nDry run complete. No DB writes performed.')
    return
  }

  // ── 5. Connect to Payload ───────────────────────────────────
  console.log('[5] Connecting to Payload CMS...')
  const payload = await getPayload({ config: payloadConfig })
  console.log('    Connected.\n')

  // ── 6. Galleries ────────────────────────────────────────────
  console.log('[6] Upserting galleries...')
  const galleryIdByName: Record<string, string | number> = {}

  for (const gp of GALLERY_PAGES) {
    const name = gp.name
    const existing = await payload.find({ collection: 'galleries', where: { name: { equals: name } }, limit: 1, depth: 0 })
    if (existing.docs[0]) {
      galleryIdByName[name] = existing.docs[0].id
      console.log(`    · exists: ${name}`)
      continue
    }
    const created = await payload.create({
      collection: 'galleries',
      data: {
        name,
        description: GALLERY_DESCRIPTIONS[name] ?? name,
        order: GALLERY_ORDER[name] ?? 99,
      },
    })
    galleryIdByName[name] = created.id
    console.log(`    + created: ${name}`)
  }

  // ── 7. Artists ──────────────────────────────────────────────
  console.log('\n[7] Importing artists...')
  const artistIdByName: Record<string, string | number> = {}

  for (const [idx, artist] of artistData.entries()) {
    const existing = await payload.find({
      collection: 'artists',
      where: { name: { equals: artist.name } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      artistIdByName[artist.name] = existing.docs[0].id
      console.log(`    · exists: ${artist.name}`)
      continue
    }

    // Upload portrait
    let portraitId: string | number | undefined
    if (artist.portraitUrl) {
      try {
        const buf = await fetchBinary(artist.portraitUrl)
        if (buf) {
          const doc = await payload.create({
            collection: 'media',
            data: { alt: `Portrait of ${artist.name}` },
            file: { data: buf, mimetype: mimeType(artist.portraitUrl), name: basename(artist.portraitUrl), size: buf.byteLength },
          })
          portraitId = doc.id
          console.log(`      ↑ portrait: ${basename(artist.portraitUrl)}`)
        }
      } catch (err) {
        console.warn(`      ✗ portrait upload failed: ${err}`)
      }
      await sleep(300)
    }

    const created = await payload.create({
      collection: 'artists',
      data: {
        name: artist.name,
        portrait: portraitId,
        medium: artist.medium || undefined,
        bio: artist.bio ? makeLexical(artist.bio) : undefined,
        isFeatured: true,
        order: (idx + 1) * 10,
      } as any,
    })
    artistIdByName[artist.name] = created.id
    console.log(`    + created: ${artist.name}`)
  }

  // ── 8. Paintings ────────────────────────────────────────────
  console.log('\n[8] Importing paintings...')
  let paintingCount = 0

  for (const artist of artistData) {
    const artistId = artistIdByName[artist.name]
    if (!artistId) {
      console.warn(`    ✗ No artist ID for ${artist.name} — skipping their paintings`)
      continue
    }

    for (const painting of artist.paintings) {
      const existing = await payload.find({
        collection: 'paintings',
        where: { title: { equals: painting.title } },
        limit: 1,
        depth: 0,
      })
      if (existing.docs[0]) {
        console.log(`    · exists: "${painting.title}"`)
        continue
      }

      // Download painting image — prefer full size, fall back to thumb
      let imageId: string | number | undefined
      for (const imgUrl of [painting.fullUrl, painting.thumbUrl]) {
        try {
          const buf = await fetchBinary(imgUrl)
          if (buf && buf.byteLength > 1000) {
            const doc = await payload.create({
              collection: 'media',
              data: { alt: painting.altText || painting.title },
              file: { data: buf, mimetype: mimeType(imgUrl), name: basename(imgUrl), size: buf.byteLength },
            })
            imageId = doc.id
            break
          }
        } catch {
          // try next URL
        }
        await sleep(200)
      }

      const galleryIds = painting.galleries
        .map(name => galleryIdByName[name])
        .filter(Boolean)

      const isRecentAcquisition = painting.galleries.includes('Recent Acquisitions')

      await payload.create({
        collection: 'paintings',
        data: {
          title: painting.title,
          artist: artistId,
          galleries: galleryIds,
          images: imageId ? [{ image: imageId }] : [],
          medium: painting.medium || undefined,
          dimensions: painting.dimensions || undefined,
          status: 'available',
          priceDisplay: 'inquire',
          isRecentAcquisition,
        } as any,
      })

      paintingCount++
      const galleryNames = painting.galleries.join(', ') || 'no gallery'
      console.log(`    + "${painting.title}" by ${artist.name} → [${galleryNames}]`)
      await sleep(DELAY_MS)
    }
  }

  // ── 9. SiteSettings ─────────────────────────────────────────
  console.log('\n[9] Updating SiteSettings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      contact: {
        phone: '(713) 974-3700',
        email: 'art@sherwoodsgallery.com',
        address: {
          street: '2618 Briar Ridge Drive',
          city: 'Houston',
          state: 'Texas',
          zip: '77057',
          area: 'Briargrove, near the Galleria',
        },
        hours: [
          { days: 'Mon–Fri', hours: '9am–5pm' },
          { days: 'Saturday', hours: '9am–3pm' },
          { days: 'Sunday', hours: 'Closed' },
        ],
      },
      tagline: "Serving Houston's Discerning Collectors Since 1981",
    } as any,
  })
  console.log('    ✓ SiteSettings updated')

  // ── Done ─────────────────────────────────────────────────────
  console.log('\n╔═══════════════════════════════════════════╗')
  console.log('║  Migration complete!                      ║')
  console.log('╚═══════════════════════════════════════════╝')
  console.log(`  Artists imported : ${Object.keys(artistIdByName).length}`)
  console.log(`  Paintings imported: ${paintingCount}`)
  console.log(`  Galleries created : ${Object.keys(galleryIdByName).length}`)
  console.log('\n  → Open http://localhost:3000/admin to review.\n')

  process.exit(0)
}

migrate().catch(err => {
  console.error('\nMigration failed:', err)
  process.exit(1)
})
