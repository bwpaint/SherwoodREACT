/**
 * Renames any media files whose filename contains URL-encoded characters (%XX)
 * and updates the corresponding Payload media records to match.
 *
 * Run: node --env-file=.env --import tsx scripts/fix-encoded-filenames.ts
 */

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'

const MEDIA_DIR = path.resolve('media')

async function fixEncodedFilenames() {
  const payload = await getPayload({ config: payloadConfig })

  const files = fs.readdirSync(MEDIA_DIR)
  const encoded = files.filter((f) => f.includes('%'))

  if (encoded.length === 0) {
    console.log('No URL-encoded filenames found. Nothing to do.')
    process.exit(0)
  }

  console.log(`Found ${encoded.length} file(s) to fix:\n`)

  for (const filename of encoded) {
    const decoded = decodeURIComponent(filename)
    if (decoded === filename) continue // nothing changed

    const oldPath = path.join(MEDIA_DIR, filename)
    const newPath = path.join(MEDIA_DIR, decoded)

    // Rename on disk
    fs.renameSync(oldPath, newPath)
    console.log(`  renamed: ${filename}`)
    console.log(`       to: ${decoded}`)

    // Also rename any generated size variants (thumbnail, card, hero)
    for (const variant of ['-400x300', '-768x576', '-1920x1080']) {
      const ext = path.extname(filename)
      const base = filename.slice(0, -ext.length)
      const variantOld = path.join(MEDIA_DIR, base + variant + ext)
      const variantNew = path.join(MEDIA_DIR, decoded.slice(0, -ext.length) + variant + ext)
      if (fs.existsSync(variantOld)) {
        fs.renameSync(variantOld, variantNew)
        console.log(`  renamed variant: ${path.basename(variantOld)} → ${path.basename(variantNew)}`)
      }
    }

    // Find and update the Payload media record
    const results = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 5,
      depth: 0,
    })

    for (const doc of results.docs) {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: { filename: decoded } as any,
      })
      console.log(`  updated DB record id=${doc.id}: filename → ${decoded}`)
    }

    console.log()
  }

  console.log('Done.\n')
  process.exit(0)
}

fixEncodedFilenames().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
