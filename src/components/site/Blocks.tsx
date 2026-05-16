import { HeroSection } from './HeroSection'
import { TextBlock } from './blocks/TextBlock'
import { BlockquoteBlock } from './blocks/BlockquoteBlock'
import { TimelineBlock } from './blocks/TimelineBlock'
import { ImageBreakBlock } from './blocks/ImageBreakBlock'
import { CtaBandBlock } from './blocks/CtaBandBlock'

type AnyBlock = { id?: string; blockType: string; [key: string]: unknown }

export function Blocks({ layout }: { layout: unknown }) {
  if (!Array.isArray(layout)) return null
  return (
    <>
      {(layout as AnyBlock[]).map((block, i) => {
        const key = block.id || `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':
            return (
              <HeroSection
                key={key}
                eyebrow={block.eyebrow as string}
                headlineLine1={block.headlineLine1 as string}
                headlineLine2={block.headlineLine2 as string}
                subheadline={block.subheadline as string}
                backgroundImage={block.backgroundImage as Parameters<typeof HeroSection>[0]['backgroundImage']}
                primaryCta={block.primaryCta as Parameters<typeof HeroSection>[0]['primaryCta']}
                secondaryCta={block.secondaryCta as Parameters<typeof HeroSection>[0]['secondaryCta']}
              />
            )
          case 'textBlock':
            return (
              <TextBlock
                key={key}
                eyebrow={block.eyebrow as string}
                heading={block.heading as string}
                body={block.body}
                background={block.background as Parameters<typeof TextBlock>[0]['background']}
              />
            )
          case 'blockquote':
            return (
              <BlockquoteBlock
                key={key}
                quote={block.quote as string}
                attribution={block.attribution as string}
              />
            )
          case 'timeline':
            return (
              <TimelineBlock
                key={key}
                eyebrow={block.eyebrow as string}
                heading={block.heading as string}
                milestones={(block.milestones as Parameters<typeof TimelineBlock>[0]['milestones']) || []}
              />
            )
          case 'imageBreak':
            return (
              <ImageBreakBlock
                key={key}
                image={block.image as Parameters<typeof ImageBreakBlock>[0]['image']}
                overlayText={block.overlayText as string}
              />
            )
          case 'ctaBand':
            return (
              <CtaBandBlock
                key={key}
                heading={block.heading as string}
                body={block.body as string}
                primaryCta={block.primaryCta as Parameters<typeof CtaBandBlock>[0]['primaryCta']}
                secondaryCta={block.secondaryCta as Parameters<typeof CtaBandBlock>[0]['secondaryCta']}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
