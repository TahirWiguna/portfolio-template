import { useState } from 'react'
import { readColorToken } from '@/lib/color'

const TOKENS = {
  accent: '--color-accent',
  glacier: '--color-glacier',
  paper: '--color-paper',
  paper2: '--color-paper-2',
  paper3: '--color-paper-3',
  wash: '--color-accent-wash',
  rule: '--color-rule',
  muted: '--color-muted',
  ink: '--color-ink',
} as const

export type Palette = Record<keyof typeof TOKENS, string>

export function usePalette(): Palette {
  const [palette] = useState(
    () =>
      Object.fromEntries(
        Object.entries(TOKENS).map(([key, token]) => [key, readColorToken(token) ?? '']),
      ) as Palette,
  )
  return palette
}
