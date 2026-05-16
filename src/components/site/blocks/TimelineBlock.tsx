import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'

type Milestone = { year: string; title: string; body?: string | null }

export function TimelineBlock({
  eyebrow,
  heading,
  milestones,
}: {
  eyebrow?: string | null
  heading?: string | null
  milestones: Milestone[]
}) {
  return (
    <section className="bg-gallery-ivory">
      <Container className="py-16 max-w-[900px]">
        {(eyebrow || heading) && (
          <EyebrowHeading
            eyebrow={eyebrow || 'Milestones'}
            heading={heading || 'Our History'}
            tone="ivory"
          />
        )}

        <ol className="mt-12 relative">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[120px] w-[2px]"
            style={{
              background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.2))',
            }}
          />
          {milestones.map((m) => (
            <li key={`${m.year}-${m.title}`} className="relative grid grid-cols-[120px_1fr] gap-6 pb-10 last:pb-0">
              <div className="text-right pr-6 relative">
                <span className="font-display font-bold text-[1.1rem] text-gallery-gold">
                  {m.year}
                </span>
                <span
                  aria-hidden
                  className="absolute right-[-7px] top-2 w-3 h-3 rounded-full bg-gallery-gold ring-2 ring-gallery-ivory shadow-[0_0_0_1px_#C9A84C]"
                />
              </div>
              <div className="pl-6">
                <h3 className="font-display font-semibold text-[1.15rem] text-gallery-espresso">
                  {m.title}
                </h3>
                {m.body && (
                  <p className="mt-2 font-body text-[0.9rem] text-gallery-brown-mid leading-relaxed">
                    {m.body}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
