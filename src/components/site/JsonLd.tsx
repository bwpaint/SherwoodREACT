type Address = {
  street?: string
  city?: string
  state?: string
  zip?: string
}

/** Renders a JSON-LD <script> tag. Server-rendered so search engines see it on first load. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Helper to build a sensible ArtGallery / LocalBusiness schema. */
export function buildOrganizationSchema(input: {
  name: string
  url: string
  phone?: string
  email?: string
  address?: Address
  description?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    name: input.name,
    url: input.url,
    description: input.description,
    telephone: input.phone,
    email: input.email,
    address: input.address && {
      '@type': 'PostalAddress',
      streetAddress: input.address.street,
      addressLocality: input.address.city,
      addressRegion: input.address.state,
      postalCode: input.address.zip,
      addressCountry: 'US',
    },
  }
}
