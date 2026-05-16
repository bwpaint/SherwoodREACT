export const SUBJECT_OPTIONS = [
  'Artwork Inquiry',
  'Picture Framing',
  'Planning a Visit',
  'Artist Information',
  'Other',
] as const

export type SubjectOption = (typeof SUBJECT_OPTIONS)[number]
