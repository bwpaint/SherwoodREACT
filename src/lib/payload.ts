import 'server-only'
import { getPayload, type Payload } from 'payload'
import payloadConfig from '@/payload.config'

let cached: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached
  cached = await getPayload({ config: payloadConfig })
  return cached
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function getPage(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
}

export async function getActiveGalleries() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'galleries',
    where: { isActive: { equals: true } },
    sort: 'order',
    depth: 1,
  })
  return res.docs
}

export async function getFeaturedArtists(limit = 4) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'artists',
    where: { isFeatured: { equals: true } },
    sort: 'order',
    limit,
    depth: 1,
  })
  return res.docs
}

export async function getAllArtists() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'artists',
    sort: 'order',
    depth: 1,
    limit: 200,
  })
  return res.docs
}

export async function getPaintingsByGallery(gallerySlug: string, limit = 24) {
  const payload = await getPayloadClient()
  const galleries = await payload.find({
    collection: 'galleries',
    where: { slug: { equals: gallerySlug } },
    limit: 1,
    depth: 0,
  })
  const gallery = galleries.docs[0]
  if (!gallery) return []
  const res = await payload.find({
    collection: 'paintings',
    where: { galleries: { in: [gallery.id] } },
    limit,
    depth: 1,
  })
  return res.docs
}

export async function getRecentAcquisitions(limit = 12) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'paintings',
    where: { isRecentAcquisition: { equals: true } },
    sort: '-acquiredDate',
    limit,
    depth: 1,
  })
  return res.docs
}

export async function getPaintingsByArtist(artistId: number | string, limit = 6) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'paintings',
    where: { artist: { equals: artistId } },
    limit,
    depth: 1,
  })
  return res.docs
}
