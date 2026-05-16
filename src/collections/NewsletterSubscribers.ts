import type { CollectionConfig } from 'payload'

import { adminsOnly } from '@/lib/access'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Newsletter Subscriber', plural: 'Newsletter Subscribers' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'unsubscribed', 'createdAt'],
    group: 'Inbox',
  },
  access: {
    read: adminsOnly,
    create: () => true,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'footer',
      admin: { description: 'Where the signup came from (footer, inline form, etc.).' },
    },
    {
      name: 'unsubscribed',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark true to exclude from CSV export.' },
    },
  ],
}
