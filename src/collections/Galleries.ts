import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '@/lib/access'
import { deriveSlugFrom, ensureSlug } from '@/lib/slug'

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isActive', 'order'],
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
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [deriveSlugFrom('name')] },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Image shown on the gallery card and section header.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Show on the public site.' },
    },
  ],
}
