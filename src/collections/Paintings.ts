import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '@/lib/access'
import { deriveSlugFrom, ensureSlug } from '@/lib/slug'

export const Paintings: CollectionConfig = {
  slug: 'paintings',
  labels: { singular: 'Painting', plural: 'Paintings' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'artist', 'status', 'isRecentAcquisition', 'price'],
    group: 'Gallery',
    listSearchableFields: ['title'],
  },
  access: {
    read: anyone,
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
      name: 'artist',
      type: 'relationship',
      relationTo: 'artists',
      required: true,
      admin: { description: 'The artist who created this work.' },
    },
    {
      name: 'galleries',
      type: 'relationship',
      relationTo: 'galleries',
      hasMany: true,
      admin: { description: 'Which gallery sections this painting appears in.' },
    },
    {
      name: 'images',
      type: 'array',
      labels: { singular: 'Image', plural: 'Images' },
      minRows: 1,
      admin: { description: 'First image is the primary card image. Add detail shots as additional images.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'medium',
      type: 'text',
      admin: { description: 'e.g. "Oil on Canvas"' },
    },
    {
      name: 'dimensions',
      type: 'text',
      admin: { description: 'e.g. \'24" × 36"\' — exact format shown publicly.' },
    },
    {
      name: 'year',
      type: 'number',
      admin: { description: 'Year the work was created.' },
    },
    {
      name: 'price',
      type: 'number',
      admin: { description: 'Listing price in USD. Required if Price Display is "Show price".' },
    },
    {
      name: 'priceDisplay',
      type: 'select',
      defaultValue: 'inquire',
      required: true,
      options: [
        { label: 'Inquire only (recommended)', value: 'inquire' },
        { label: 'Show price', value: 'show' },
        { label: 'Sold (show last price)', value: 'sold-price' },
      ],
      admin: { description: 'How pricing appears on the painting card and detail page.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      required: true,
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Sold', value: 'sold' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Reserved', value: 'reserved' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'isRecentAcquisition',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Tick to feature this painting in the Recent Acquisitions section.',
      },
    },
    {
      name: 'acquiredDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Date acquired. Used to order the Recent Acquisitions section.',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    { name: 'description', type: 'richText' },
  ],
}
