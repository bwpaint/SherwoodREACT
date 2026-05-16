import type { CollectionBeforeChangeHook, FieldHook } from 'payload'

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Field-level hook: derive `slug` from the `sourceField` if slug is empty.
 * Use on a slug text field.
 */
export function deriveSlugFrom(sourceField: string): FieldHook {
  return ({ data, value }) => {
    if (typeof value === 'string' && value.trim().length > 0) return slugify(value)
    const source = (data as Record<string, unknown> | undefined)?.[sourceField]
    if (typeof source === 'string' && source.trim().length > 0) return slugify(source)
    return value
  }
}

/**
 * Collection-level hook: ensure slug is set before save (fallback for cases the field hook missed).
 */
export function ensureSlug(sourceField: string): CollectionBeforeChangeHook {
  return ({ data }) => {
    const d = data as Record<string, unknown>
    if (!d.slug && typeof d[sourceField] === 'string') {
      d.slug = slugify(d[sourceField] as string)
    }
    return data
  }
}
