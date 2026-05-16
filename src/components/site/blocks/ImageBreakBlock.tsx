type MediaLike = { url?: string | null; alt?: string | null } | null | undefined

export function ImageBreakBlock({
  image,
  overlayText,
}: {
  image?: MediaLike
  overlayText?: string | null
}) {
  return (
    <section
      className="relative h-[320px] flex items-center justify-center isolate"
      aria-label={overlayText || 'Image'}
    >
      {image?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.url}
          alt={image.alt || overlayText || ''}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gallery-teal-deep to-gallery-teal-dark -z-10" />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gallery-teal-deep/65 -z-10"
      />
      {overlayText && (
        <p className="text-center font-display font-medium text-[clamp(1.25rem,2.5vw,1.75rem)] text-gallery-cream leading-snug px-6">
          {overlayText}
        </p>
      )}
    </section>
  )
}
