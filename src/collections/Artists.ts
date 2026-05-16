import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '@/lib/access'
import { deriveSlugFrom, ensureSlug } from '@/lib/slug'

export const Artists: CollectionConfig = {
  slug: 'artists',
  labels: { singular: 'Artist', plural: 'Artists' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialty', 'isFeatured', 'order'],
    group: 'Gallery',
  },
  access: {
    read: anyone,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  hooks: {
    beforeChange: [ensureSlug('name')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'URL slug (auto-generated from name).' },
      hooks: { beforeValidate: [deriveSlugFrom('name')] },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square or near-square headshot.' },
    },
    {
      name: 'medium',
      type: 'text',
      admin: { description: 'e.g. "Oil on Canvas & Linen"' },
    },
    {
      name: 'specialty',
      type: 'array',
      labels: { singular: 'Specialty', plural: 'Specialties' },
      admin: { description: 'Tags shown beside the artist (e.g. Landscape, Bluebonnet).' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    { name: 'bio', type: 'richText' },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on the homepage featured artists strip.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
}
