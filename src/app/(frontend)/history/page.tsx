import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { CtaBandBlock } from '@/components/site/blocks/CtaBandBlock'
import { ImageBreakBlock } from '@/components/site/blocks/ImageBreakBlock'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Our History',
  description:
    "Serving Houston's discerning collectors since 1981. The story of Sherwoods Gallery, founded by Sherwood P. McCall III and chronicled by Ron Crouch.",
  path: '/history',
})

export default function HistoryPage() {
  return (
    <>
      <section className="relative h-[400px] flex items-end isolate overflow-hidden border-b-[3px] border-gallery-gold">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-gallery-teal-deep via-gallery-teal-dark to-gallery-teal -z-10"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,107,107,0.7) 0%, rgba(10,107,107,0.85) 100%)',
          }}
        />
        <Container className="pb-12 pt-16">
          <EyebrowHeading eyebrow="Since 1981" heading="Our History" tone="dark" />
        </Container>
      </section>

      <section className="bg-gallery-ivory py-16">
        <Container className="max-w-3xl">
          <div className="prose prose-lg font-body text-gallery-espresso">
            <p className="text-center font-editorial italic text-base text-gallery-teal-dark mb-2">
              by Ron Crouch and S. P. McCall
            </p>

            <blockquote className="border-l-4 border-gallery-gold pl-6 my-10 font-editorial italic text-xl text-gallery-teal-dark leading-relaxed not-italic">
              &ldquo;We believe that art plays an important role in our lives, and we are committed to helping
              those who enjoy it — and those who would preserve its creation — find a home for both.&rdquo;
            </blockquote>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">
              A Houston Institution Since 1981
            </h2>
            <p>
              Sherwoods Gallery has stood in Houston&apos;s Briargrove neighborhood, just steps from the
              famous Galleria district, for more than forty years. What began in 1981 as a single storefront has
              become one of the city&apos;s enduring destinations for original fine art — a place where serious
              collectors and emerging artists alike know they will be treated with the seriousness their work
              deserves.
            </p>
            <p>
              The gallery&apos;s founder and president, <strong>Sherwood P. McCall III</strong>, has spent his
              entire working life in service of art. His career in the fine art trade began in 1967, well before
              Sherwoods Gallery itself was founded. Those fourteen years between his entry into the field
              and the gallery&apos;s opening were spent learning the craft of picture framing at a level that few
              practitioners ever reach — the kind of meticulous archival work that today&apos;s conservators
              consider standard practice but that was, in those years, the province of museums and rare specialty
              shops. By the time Sherwood opened the gallery&apos;s doors in 1981, his framing department was
              already among the most experienced in Texas.
            </p>
            <p>
              That same year, Sherwood co-authored <em>The Art of Picture Framing</em> with his late wife Connie
              McCall — published by Bobbs-Merrill in Indianapolis and New York City. The book, still cited in the
              trade, articulated a philosophy that would define the gallery for decades to come: that the frame
              and the artwork are inseparable parts of a single object, and that the way a painting is mounted,
              glazed, and presented matters as much to its preservation as the brushwork itself.
            </p>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">The Gallery&apos;s Approach</h2>
            <p>
              Sherwoods Gallery has evolved over four decades as both <strong>procurer of fine art</strong>
              {' '}and <strong>meticulous preserver</strong> of fine oils, watercolors, and multi-medium works
              collected from artists across Texas, the United States, and around the world. Our pursuit has always
              been the same: to provide artists with the opportunity to sell their work in a professional manner —
              within a setting that is itself a pleasing and informative presentation — and to provide collectors
              with a level of service and expertise that justifies the trust they place in us.
            </p>
            <p>
              We are deliberate about the artists we represent. Some are nationally celebrated names whose
              paintings hang in museums and significant private collections. Others are emerging Texas talents
              whose careers we have helped shape over years of patient collaboration. The common thread is craft —
              the kind of disciplined, traditional, original work that rewards close looking and stands the test
              of time.
            </p>
            <p>
              The gallery&apos;s collection is organized into nine genre-based galleries on our website and in our
              physical showroom:
            </p>
            <ul className="font-body list-disc pl-6 space-y-2">
              <li>
                <strong>Landscape Art</strong> — sweeping vistas of Texas Hill Country, the Gulf Coast, and the
                great American West, alongside European pastoral and impressionist landscapes.
              </li>
              <li>
                <strong>Figurative Art</strong> — portraits, narrative scenes, and the human form rendered with
                emotional depth and technical accomplishment.
              </li>
              <li>
                <strong>Still Life Art</strong> — flowers, antique vessels, fruit, and intimate domestic objects
                given quiet attention.
              </li>
              <li>
                <strong>Seascape Art</strong> — coastal and maritime works that capture the light, atmosphere, and
                movement of water.
              </li>
              <li>
                <strong>Texas Bluebonnet Art</strong> — the genre most closely identified with Texas painting, in
                its full breadth from early pioneers like Julian Onderdonk and Porfirio Salinas to contemporary
                masters.
              </li>
              <li>
                <strong>Sculpture Art</strong> — bronze, mixed media, and three-dimensional work from Texas and
                Southwestern sculptors.
              </li>
              <li>
                <strong>Watercolor Art</strong> — contemporary watercolorists alongside our growing collection of
                nineteenth- and early-twentieth-century European watercolors.
              </li>
              <li>
                <strong>Western Art</strong> — cowboys, cattle drives, working ranches, and the iconography of the
                American frontier, rendered in oil and bronze.
              </li>
              <li>
                <strong>Wildlife Art</strong> — birds and game, painted with the precise observation that the
                genre demands.
              </li>
            </ul>
            <p>
              Each piece is presented on our website by title, medium, and dimensions. Biographies of our
              represented artists can be read in a convenient, secure forum on the{' '}
              <strong>Our Artists</strong> page.
            </p>

            <h2 className="font-display text-3xl text-gallery-espresso mt-12 mb-4">Today</h2>
            <p>
              Sherwoods Gallery has emerged, in the decades since 1981, as the vanguard of its segment of the
              Houston art market — a small gallery in scale but one with an outsized reputation for both
              connoisseurship and conservation. We were among the first independent galleries in the region to
              couple traditional in-person viewing with a fully searchable online catalog, allowing collectors
              from across the country and abroad to browse our holdings before visiting the gallery in person.
            </p>
            <p>
              We continue, today, to do what we set out to do in 1981: to find good art, to protect it, to place
              it in the hands of people who will love it, and to do all of this with the kind of personal
              attention that has become rare in the art world.
            </p>
            <p className="font-editorial italic text-lg text-gallery-teal-dark">
              We invite you to visit us at <strong>2618 Briar Ridge Drive, Houston, Texas 77057</strong>, or to
              begin your visit online at sherwoodsgallery.com.
            </p>
          </div>
        </Container>
      </section>

      <ImageBreakBlock overlayText="Serving Houston's Collectors Since 1981" />

      <CtaBandBlock
        heading="Visit Sherwoods Gallery"
        body="Whether you're a long-time collector or just beginning to explore original fine art, we'd be glad to welcome you to our gallery in the heart of Houston's Briargrove district."
        primaryCta={{ label: 'Plan Your Visit', href: '/contact' }}
      />
    </>
  )
}
