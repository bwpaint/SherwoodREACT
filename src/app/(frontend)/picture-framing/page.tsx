import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { CtaBandBlock } from '@/components/site/blocks/CtaBandBlock'
import { ImageBreakBlock } from '@/components/site/blocks/ImageBreakBlock'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Picture Framing',
  description:
    "Sherwoods Gallery offers archival, museum-grade custom picture framing in Houston's Briargrove district. Acid-free mats, UV-filtering glass, hand-restored antique frames — since 1967.",
  path: '/picture-framing',
})

export default function PictureFramingPage() {
  return (
    <>
      <section className="relative h-[400px] flex items-end isolate overflow-hidden border-b-[3px] border-gallery-gold">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-gallery-teal-deep via-gallery-teal-dark to-gallery-teal -z-10"
        />
        <Container className="pb-12 pt-16">
          <EyebrowHeading eyebrow="In the Briargrove District" heading="Picture Framing" tone="dark" />
        </Container>
      </section>

      <section className="bg-gallery-ivory py-16">
        <Container className="max-w-3xl">
          <div className="prose prose-lg font-body text-gallery-espresso">
            <p className="font-editorial italic text-xl text-gallery-teal-dark leading-relaxed mb-10">
              For more than four decades, Sherwoods Gallery has been the trusted destination for serious art
              collectors in Houston&apos;s Briargrove neighborhood. What sets us apart isn&apos;t just the calibre of
              original fine art on our walls — it&apos;s that every piece we sell, and every piece our clients bring
              to us, can be framed with the same level of care and craftsmanship right here under one roof.
            </p>

            <p>
              Our Picture Framing Department was established in 1981, the same year Sherwoods Gallery first
              opened its doors. The roots of our framing practice, however, run even deeper. <strong>Sherwood P.
              McCall III</strong> has worked in the world of fine art and picture framing since 1967 — more than
              fifty years of hands-on experience selecting moldings, conserving surfaces, mounting watercolors,
              restoring antique frames, and protecting one-of-a-kind paintings from the wear of time.
            </p>
            <p>
              In 1981, Sherwood and his wife Connie McCall co-authored <em>The Art of Picture Framing</em>,
              published by Bobbs-Merrill Co., Inc. in Indianapolis and New York City. That book remains a reference
              in the trade today and is a testament to the depth of knowledge that informs every piece of work that
              leaves our shop.
            </p>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">Why custom framing matters</h2>
            <p>
              A treasured painting is a one-of-a-kind object. So is the frame that surrounds it. The choice of
              molding, mat board, glazing, and mounting technique should be made to preserve and celebrate the
              specific artwork — not pulled from a row of pre-cut sizes on a discount-store shelf.
            </p>
            <p>
              Big-box retailers serve a useful purpose for everyday prints and posters. But the materials and
              methods used in those operations are not designed for original oil paintings, watercolors that may be
              a century old, important photographs, family heirlooms, military medals and shadow boxes, or fine-art
              prints intended to be held in a collection for generations. Acidic mats, low-grade backing boards,
              ordinary glass, and pressure-mount adhesives can — and do — cause permanent damage over years of
              exposure.
            </p>
            <p className="font-editorial italic text-lg text-gallery-teal-dark">
              At Sherwoods, we frame the way museums frame.
            </p>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">
              What &ldquo;archival&rdquo; really means
            </h2>
            <p>
              Every job that leaves our shop uses <strong>acid-free, lignin-free 100% rag and conservation-grade
              matting</strong> so that nothing in contact with your artwork can chemically degrade it over time. We
              use <strong>archival hinging tapes and corner mounts</strong> — never pressure-sensitive adhesives —
              so the work can be removed from its frame later without damage. We offer <strong>UV-filtering glass
              and acrylic glazing</strong> to block the wavelengths of light most responsible for fading pigments,
              watercolors, and photographic prints.
            </p>
            <p>
              For valuable or vintage work, we offer <strong>conservation-grade backing boards</strong>,
              <strong> sealed-package framing</strong> to keep dust and humidity at bay, and <strong>shadow-box and
              floater-frame construction</strong> for three-dimensional and unconventional pieces. Where appropriate
              we use <strong>spacer bars</strong> to keep glass from touching pastel, gouache, or photographic
              surfaces.
            </p>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">The consultation</h2>
            <p>
              Custom framing is a conversation. When you bring a piece into the gallery, we sit with you and the
              artwork itself. We look at:
            </p>
            <ul className="font-body list-disc pl-6 space-y-1.5">
              <li>the medium, age, and condition of the piece,</li>
              <li>where it will live in your home or office (lighting, humidity, sight lines),</li>
              <li>the visual context — surrounding art, wall color, period,</li>
              <li>and the budget you&apos;ve set.</li>
            </ul>
            <p>
              Then we pull samples of moldings, mats, and glass and lay them physically against the work. Hardwood,
              metal, ornate gilt, simple modern profiles — we&apos;ll show you the options in front of the painting
              so the decision is informed, not theoretical. This is the part of our craft that no algorithm or
              online configurator can replicate.
            </p>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">Services we offer</h2>
            <ul className="font-body list-disc pl-6 space-y-2">
              <li>
                <strong>Archival picture framing</strong> for original paintings, watercolors, pastels, and prints
              </li>
              <li>
                <strong>Conservation framing</strong> for vintage, fragile, or valuable works
              </li>
              <li>
                <strong>Custom shadow boxes</strong> for medals, sports memorabilia, christening gowns, instruments,
                and three-dimensional keepsakes
              </li>
              <li>
                <strong>Mat cutting</strong> in single, double, and multiple-window configurations, including
                hand-decorated French mats
              </li>
              <li>
                <strong>Antique frame restoration</strong> — re-gilding, repair of broken gesso and ornament
              </li>
              <li>
                <strong>Re-glazing and re-fitting</strong> of older frames to bring family pieces back to museum
                standards
              </li>
              <li>
                <strong>Art recovery and consultation</strong> following fire, water, smoke, or other damage
              </li>
            </ul>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">Visit us</h2>
            <p>
              We invite you to bring your artwork — whether it came from our gallery, was passed down through your
              family, or was acquired on your travels — to <strong>2618 Briar Ridge Drive, Houston, TX 77057</strong>,
              in the heart of the Briargrove district near the Galleria. Our hours are Monday through Friday, 9am to
              5pm, and Saturday, 9am to 3pm Central Time. Estimates are always free.
            </p>
            <p className="font-editorial italic text-lg text-gallery-teal-dark">
              Your art deserves to be enjoyed for generations. We&apos;re here to make sure it is.
            </p>
          </div>
        </Container>
      </section>

      <ImageBreakBlock overlayText="Archival Picture Framing Since 1967" />

      <CtaBandBlock
        heading="Schedule a Framing Consultation"
        body="Bring your piece by the gallery for a free estimate, or call us to discuss your project. We frame originals, vintage works, photographs, medals, and family heirlooms with the same museum-grade care."
        primaryCta={{ label: 'Contact Us About Framing', href: '/contact?subject=Picture+Framing' }}
      />
    </>
  )
}
