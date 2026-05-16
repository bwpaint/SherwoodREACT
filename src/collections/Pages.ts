import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '@/lib/access'
import { deriveSlugFrom, ensureSlug } from '@/lib/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
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
      admin: {
        position: 'sidebar',
        description: 'URL slug. Special slugs: "home", "history", "contact".',
      },
      hooks: { beforeValidate: [deriveSlugFrom('title')] },
    },
    {
      name: 'seo',
      type: 'group',
      admin: { description: 'Search-engine metadata for this page.' },
      fields: [
        { name: 'title', type: 'text', admin: { description: 'Defaults to page title if empty.' } },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      admin: { description: 'Page content built from blocks.' },
      blocks: [
        {
          slug: 'hero',
          labels: { singular: 'Hero', plural: 'Heroes' },
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'headlineLine1', type: 'text', required: true },
            { name: 'headlineLine2', type: 'text' },
            { name: 'subheadline', type: 'textarea' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
            {
              name: 'primaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
            {
              name: 'secondaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'textBlock',
          labels: { singular: 'Text', plural: 'Text Blocks' },
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'body', type: 'richText' },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'ivory',
              options: [
                { label: 'Ivory', value: 'ivory' },
                { label: 'Ivory (warm)', value: 'ivory-warm' },
                { label: 'Teal', value: 'teal' },
                { label: 'Teal (dark)', value: 'teal-dark' },
              ],
            },
          ],
        },
        {
          slug: 'blockquote',
          labels: { singular: 'Blockquote', plural: 'Blockquotes' },
          fields: [
            { name: 'quote', type: 'textarea', required: true },
            { name: 'attribution', type: 'text' },
          ],
        },
        {
          slug: 'timeline',
          labels: { singular: 'Timeline', plural: 'Timelines' },
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            {
              name: 'milestones',
              type: 'array',
              minRows: 1,
              fields: [
                { name: 'year', type: 'text', required: true, admin: { description: 'e.g. "1981" or "1990s"' } },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          slug: 'imageBreak',
          labels: { singular: 'Image break', plural: 'Image breaks' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'overlayText', type: 'text' },
          ],
        },
        {
          slug: 'ctaBand',
          labels: { singular: 'CTA band', plural: 'CTA bands' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'body', type: 'textarea' },
            {
              name: 'primaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
            {
              name: 'secondaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
