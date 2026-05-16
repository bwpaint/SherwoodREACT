import type { CollectionConfig } from 'payload'

import { adminsOnly } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt'],
    group: 'Admin',
  },
  auth: true,
  access: {
    read: adminsOnly,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
  ],
}
