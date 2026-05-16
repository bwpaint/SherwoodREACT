/**
 * Assign heroImage to each gallery from its first painting.
 * Run: node --env-file=.env --import tsx scripts/assign-gallery-heroes.ts
 */

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'

async function assignGalleryHeroes() {
  console.log("\nAssigning gallery hero images from first painting in each gallery...\n")

  const payload = await getPayload({ config: payloadConfig })

  const galleries = await payload.find({
    collection: 'galleries',
    limit: 50,
    depth: 0,
  })

  for (const gallery of galleries.docs) {
    // Skip if already has a hero image
    if (gallery.heroImage) {
      console.log(`  · ${gallery.name}: already has hero image — skipping`)
      continue
    }

    // Find the first painting in this gallery that has at least one image
    const paintings = await payload.find({
      collection: 'paintings',
      where: {
        galleries: { contains: gallery.id },
      },
      limit: 20,
      depth: 1,
    })

    // Pick the first painting that has an image
    let imageId: string | number | undefined
    let imageName = ''
    for (const painting of paintings.docs) {
      const firstImage = (painting.images as any[])?.[0]?.image
      if (firstImage) {
        imageId = typeof firstImage === 'object' ? firstImage.id : firstImage
        imageName = typeof firstImage === 'object' ? (firstImage.filename ?? '') : ''
        break
      }
    }

    if (!imageId) {
      console.log(`  ✗ ${gallery.name}: no paintings with images found`)
      continue
    }

    await payload.update({
      collection: 'galleries',
      id: gallery.id,
      data: { heroImage: imageId } as any,
    })

    console.log(`  ✓ ${gallery.name}: hero set to ${imageName || imageId}`)
  }

  console.log('\nDone.\n')
  process.exit(0)
}

assignGalleryHeroes().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
