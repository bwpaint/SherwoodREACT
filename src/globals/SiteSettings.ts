import type { GlobalConfig } from 'payload'

import { adminsOnly, anyone } from '@/lib/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Admin',
    description: 'Contact info, social links, and other global content.',
  },
  access: {
    read: anyone,
    update: adminsOnly,
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '(713) 974-3700' },
        { name: 'email', type: 'email', defaultValue: 'art@sherwoodsgallery.com' },
        {
          name: 'address',
          type: 'group',
          fields: [
            { name: 'street', type: 'text', defaultValue: '2618 Briar Ridge Drive' },
            { name: 'city', type: 'text', defaultValue: 'Houston' },
            { name: 'state', type: 'text', defaultValue: 'Texas' },
            { name: 'zip', type: 'text', defaultValue: '77057' },
            { name: 'area', type: 'text', defaultValue: 'Briargrove, near the Galleria' },
          ],
        },
        {
          name: 'hours',
          type: 'array',
          fields: [
            { name: 'days', type: 'text', required: true, admin: { description: 'e.g. "Mon–Fri"' } },
            { name: 'hours', type: 'text', required: true, admin: { description: 'e.g. "9am–5pm"' } },
          ],
          defaultValue: [
            { days: 'Mon–Fri', hours: '9am–5pm' },
            { days: 'Saturday', hours: '9am–3pm' },
            { days: 'Sunday', hours: 'Closed' },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'twitter', type: 'text' },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: "Serving Houston's Discerning Collectors Since 1981",
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: "Sherwood's Gallery, Inc. · Houston, Texas · All Rights Reserved",
      admin: { description: 'Year prefix is added automatically.' },
    },
  ],
}
