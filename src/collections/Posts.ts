import type { CollectionConfig } from 'payload'

import { adminsOnly } from '@/lib/access'
import { deriveSlugFrom, ensureSlug } from '@/lib/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  hooks: {
    beforeChange: [ensureSlug('title')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [deriveSlugFrom('title')] },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Set automatically when status flips to Published.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData?.status === 'published' && !value) return new Date()
            return value
          },
        ],
      },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Shown on the blog index card.' } },
    { name: 'body', type: 'richText' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
  ],
}
