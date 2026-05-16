import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { GoldRule } from '@/components/ui/GoldRule'
import { RichText } from '@/components/ui/RichText'
import { Button } from '@/components/ui/Button'
import { getPostBySlug } from '@/lib/payload'
import { pageMetadata } from '@/lib/seo'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return pageMetadata({ title: 'Post Not Found', path: `/blog/${slug}` })
  const cover =
    post.coverImage && typeof post.coverImage === 'object'
      ? (post.coverImage as { url?: string })?.url
      : undefined
  return pageMetadata({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/blog/${slug}`,
    image: cover,
  })
}

export default async function PostDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const cover =
    post.coverImage && typeof post.coverImage === 'object'
      ? (post.coverImage as { url?: string; alt?: string })
      : null
  const date = post.publishedAt ? new Date(post.publishedAt) : null
  const dateLabel = date
    ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null
  const authorName =
    post.author && typeof post.author === 'object' && 'firstName' in post.author
      ? [
          (post.author as { firstName?: string; lastName?: string }).firstName,
          (post.author as { lastName?: string }).lastName,
        ]
          .filter(Boolean)
          .join(' ')
      : null

  return (
    <>
      <article className="bg-gallery-ivory pb-20">
        {cover?.url ? (
          <div className="relative h-[360px] sm:h-[440px] overflow-hidden border-b-[3px] border-gallery-gold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.url}
              alt={cover.alt || post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(10,107,107,0.45) 0%, rgba(10,107,107,0.85) 100%)',
              }}
            />
            <Container className="relative h-full flex items-end pb-10">
              <div>
                {dateLabel && (
                  <p className="font-body font-bold text-[0.7rem] uppercase tracking-[0.18em] text-gallery-gold-light">
                    {dateLabel}
                  </p>
                )}
                <h1 className="mt-3 font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-gallery-cream leading-[1.1] max-w-[820px]">
                  {post.title}
                </h1>
              </div>
            </Container>
          </div>
        ) : (
          <section className="bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark border-b-[3px] border-gallery-gold">
            <Container className="pt-16 pb-12">
              {dateLabel && (
                <p className="font-body font-bold text-[0.7rem] uppercase tracking-[0.18em] text-gallery-gold-light">
                  {dateLabel}
                </p>
              )}
              <h1 className="mt-3 font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-gallery-cream leading-[1.1]">
                {post.title}
              </h1>
              <div className="mt-6">
                <GoldRule />
              </div>
            </Container>
          </section>
        )}

        <Container className="py-16 max-w-[760px]">
          {(authorName || dateLabel) && (
            <p className="font-editorial italic text-gallery-brown-mid">
              {authorName && <>By {authorName}</>}
              {authorName && dateLabel && ' · '}
              {dateLabel}
            </p>
          )}
          {post.excerpt && (
            <p className="mt-6 font-body text-lg text-gallery-brown leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="mt-8 text-gallery-brown">
            <RichText value={post.body} />
          </div>

          <div className="mt-16 pt-8 border-t border-gallery-gold/30 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="font-body font-bold text-xs uppercase tracking-[0.1em] text-gallery-teal-dark hover:text-gallery-gold-dark transition-colors"
            >
              ← All Posts
            </Link>
            <Button href="/contact" variant="teal">
              Contact the Gallery
            </Button>
          </div>
        </Container>
      </article>
    </>
  )
}
