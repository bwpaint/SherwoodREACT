import type { Metadata } from 'next'

export function pageMetadata(input: {
  title: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const url = input.path ? new URL(input.path, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString() : undefined
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: "Sherwood's Gallery",
      type: 'website',
      images: input.image ? [{ url: input.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: input.image ? [input.image] : undefined,
    },
  }
}
