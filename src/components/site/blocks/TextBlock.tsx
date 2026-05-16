import { Container } from '@/components/ui/Container'
import { EyebrowHeading } from '@/components/ui/EyebrowHeading'
import { RichText } from '@/components/ui/RichText'
import { cn } from '@/components/ui/cn'

const BG: Record<string, string> = {
  ivory: 'bg-gallery-ivory text-gallery-brown',
  'ivory-warm': 'bg-gallery-ivory-warm text-gallery-brown',
  teal: 'bg-gallery-teal text-gallery-cream',
  'teal-dark': 'bg-gallery-teal-dark text-gallery-cream',
}

export function TextBlock({
  eyebrow,
  heading,
  body,
  background = 'ivory',
}: {
  eyebrow?: string | null
  heading?: string | null
  body?: unknown
  background?: 'ivory' | 'ivory-warm' | 'teal' | 'teal-dark'
}) {
  const tone: 'dark' | 'ivory' = background.startsWith('teal') ? 'dark' : 'ivory'

  return (
    <section className={cn(BG[background] || BG.ivory)}>
      <Container className="py-16 max-w-[900px]">
        {(eyebrow || heading) && (
          <EyebrowHeading
            eyebrow={eyebrow || ''}
            heading={heading || ''}
            tone={tone}
          />
        )}
        {body && (
          <div className="mt-6">
            <RichText value={body} />
          </div>
        )}
      </Container>
    </section>
  )
}
