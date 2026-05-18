/**
 * Migrate local /media files to Vercel Blob storage.
 *
 * Prerequisite — fetch the Vercel env vars locally:
 *   pnpm dlx vercel link            # one-time, links this folder to the Vercel project
 *   pnpm dlx vercel env pull .env.local
 *
 * Then run:
 *   node --env-file=.env.local --import tsx scripts/migrate-media-to-blob.ts
 *
 * Idempotent: skips files already in the bucket.
 */

import fs from 'fs'
import path from 'path'
import { put, list } from '@vercel/blob'

const MEDIA_DIR = path.resolve('./media')

async function migrate() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error('Missing BLOB_READ_WRITE_TOKEN env var.')
    console.error('Run: pnpm dlx vercel env pull .env.local')
    process.exit(1)
  }

  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`Directory not found: ${MEDIA_DIR}`)
    process.exit(1)
  }

  const allEntries = fs.readdirSync(MEDIA_DIR)
  const files = allEntries.filter((f) => {
    const fp = path.join(MEDIA_DIR, f)
    return fs.statSync(fp).isFile()
  })

  console.log(`Found ${files.length} files in ${MEDIA_DIR}\n`)

  // List existing blobs to skip duplicates
  console.log('Checking existing blobs...')
  let cursor: string | undefined
  const existingNames = new Set<string>()
  do {
    const page = await list({ token, cursor, limit: 1000 })
    page.blobs.forEach((b) => existingNames.add(b.pathname))
    cursor = page.cursor
  } while (cursor)
  console.log(`${existingNames.size} blobs already in store\n`)

  let success = 0
  let skipped = 0
  let failed = 0

  for (let i = 0; i < files.length; i++) {
    const filename = files[i]
    const tag = `[${(i + 1).toString().padStart(3)}/${files.length}]`

    if (existingNames.has(filename)) {
      console.log(`${tag} ⏭  skip   ${filename}`)
      skipped++
      continue
    }

    const fullPath = path.join(MEDIA_DIR, filename)
    const fileBuffer = fs.readFileSync(fullPath)

    try {
      await put(filename, fileBuffer, {
        access: 'public',
        addRandomSuffix: false,
        token,
        // Long cache; Blob URLs are content-addressed
        cacheControlMaxAge: 60 * 60 * 24 * 365,
      })
      const kb = Math.round(fileBuffer.length / 1024)
      console.log(`${tag} ✓ upload ${filename} (${kb} KB)`)
      success++
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`${tag} ✗ FAIL   ${filename}: ${msg}`)
      failed++
    }
  }

  console.log(
    `\nDone.  ✓ ${success} uploaded · ⏭ ${skipped} skipped · ✗ ${failed} failed`,
  )
  process.exit(failed > 0 ? 1 : 0)
}

migrate().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
