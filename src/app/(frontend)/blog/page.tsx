import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { PostCard } from '@/components/site/PostCard'
import { getPublishedPosts } from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Blog',
  description: "News, exhibitions, and stories from Sherwood's Gallery.",
  path: '/blog',
})

type SearchParams = Promise<{ page?: string }>

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const result = await getPublishedPosts(page, 9)

  return (
    <>
      <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
        <Container className="pt-16 pb-12">
          <EyebrowHeading
            eyebrow="News &amp; Stories"
            heading="From the Gallery"
            tone="dark"
          />
          <p className="mt-6 max-w-prose font-body text-gallery-cream/85">
            Exhibition announcements, artist features, and notes from the framing studio.
          </p>
        </Container>
      </section>

      <section className="bg-gallery-ivory py-20">
        <Container>
          {result.docs.length === 0 ? (
            <div className="max-w-prose">
              <p className="font-editorial italic text-gallery-brown-mid text-lg">
                No posts yet. Check back soon — we&apos;re writing about upcoming shows, new
                acquisitions, and the artists we represent.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.docs.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug as string}
                  excerpt={post.excerpt}
                  coverImage={
                    post.coverImage && typeof post.coverImage === 'object'
                      ? (post.coverImage as { url?: string; alt?: string })
                      : null
                  }
                  publishedAt={post.publishedAt}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {result.totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-16 flex items-center justify-center gap-3 font-body text-sm"
            >
              {result.hasPrevPage && (
                <Link
                  href={`/blog?page=${page - 1}`}
                  className="px-4 py-2 border border-gallery-teal-dark text-gallery-teal-dark hover:bg-gallery-teal-dark hover:text-gallery-cream transition-colors font-bold uppercase tracking-[0.1em] text-xs"
                >
                  ← Previous
                </Link>
              )}
              <span className="text-gallery-brown-mid">
                Page {result.page} of {result.totalPages}
              </span>
              {result.hasNextPage && (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="px-4 py-2 border border-gallery-teal-dark text-gallery-teal-dark hover:bg-gallery-teal-dark hover:text-gallery-cream transition-colors font-bold uppercase tracking-[0.1em] text-xs"
                >
                  Next →
                </Link>
              )}
            </nav>
          )}
        </Container>
      </section>
    </>
  )
}
