import type { CollectionConfig } from 'payload'

import { adminsOnly } from '@/lib/access'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Form Submission', plural: 'Form Submissions' },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'name', 'email', 'type', 'status', 'createdAt'],
    group: 'Inbox',
    listSearchableFields: ['name', 'email', 'subject', 'message'],
  },
  access: {
    read: adminsOnly,
    // Anonymous can submit; we always create via server actions, not direct REST.
    create: () => true,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Painting inquiry', value: 'inquire' },
        { label: 'Framing inquiry', value: 'framing' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'paintingRef',
      type: 'relationship',
      relationTo: 'paintings',
      admin: { description: 'Set when the submission came from a painting "Inquire" button.' },
    },
    {
      name: 'ipHash',
      type: 'text',
      admin: { readOnly: true, description: 'Hashed IP for rate-limiting; not personally identifiable.' },
    },
    {
      name: 'adminNotes',
      type: 'richText',
      admin: { description: 'Internal notes (only visible in admin).' },
    },
  ],
}
