import { cn } from './cn'

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
  format?: number | string
  url?: string
}

type LexicalState = { root?: { children?: LexicalNode[] } } | null

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  if (node.type === 'text') {
    const f = typeof node.format === 'number' ? node.format : 0
    let el: React.ReactNode = node.text ?? ''
    if (f & 1) el = <strong key={key}>{el}</strong>
    if (f & 2) el = <em key={key}>{el}</em>
    if (f & 8) el = <u key={key}>{el}</u>
    return el
  }
  const children = (node.children || []).map((c, i) => renderNode(c, i))
  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{children}</p>
    case 'heading': {
      const tag = (node.tag as keyof React.JSX.IntrinsicElements) || 'h2'
      const Tag = tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return <Tag key={key}>{children}</Tag>
    }
    case 'list': {
      const Tag = (node.tag === 'ol' ? 'ol' : 'ul') as 'ul' | 'ol'
      return <Tag key={key}>{children}</Tag>
    }
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'link':
      return (
        <a key={key} href={node.url || '#'} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    case 'quote':
      return <blockquote key={key}>{children}</blockquote>
    default:
      return <>{children}</>
  }
}

/**
 * Renders Payload richText. Accepts either:
 * - a string (legacy / seeded plain text) → wrapped in <p>
 * - a Lexical JSON state → walked and rendered
 * - null/undefined → null
 */
export function RichText({
  value,
  className,
}: {
  value: unknown
  className?: string
}) {
  if (!value) return null
  if (typeof value === 'string') {
    // Split on double-newline → paragraphs
    const paras = value.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
    return (
      <div className={cn('prose-gallery', className)}>
        {paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    )
  }
  if (typeof value === 'object') {
    const state = value as LexicalState
    const children = state?.root?.children || []
    return (
      <div className={cn('prose-gallery', className)}>
        {children.map((c, i) => renderNode(c, i))}
      </div>
    )
  }
  return null
}
