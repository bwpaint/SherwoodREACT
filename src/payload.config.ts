import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Artists } from './collections/Artists'
import { Galleries } from './collections/Galleries'
import { Paintings } from './collections/Paintings'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { FormSubmissions } from './collections/FormSubmissions'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — Sherwoods Gallery",
    },
  },
  collections: [
    Users,
    Media,
    Artists,
    Galleries,
    Paintings,
    Pages,
    Posts,
    FormSubmissions,
    NewsletterSubscribers,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // When BLOB_READ_WRITE_TOKEN is set (i.e., deployed on Vercel with Blob storage),
    // Payload serves and uploads media via Vercel Blob.
    // Locally without the token, falls back to Media collection's staticDir (./media).
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
